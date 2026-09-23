import * as THREE from 'three';

// Auto Director V1 — an opt-in cinematic camera system layered on top of the
// accepted Head Particle Trail traveler. Eight curated presets, each a pure
// function of the traveler's LIVE state (head position, travel direction,
// world up) rather than fixed world coordinates, plus a deterministic
// seeded scheduler that switches between them. Entirely independent of
// HeadParticleTrail.js/TrailLyrics.js internals: it only reads their public
// surfaces (getHeadPosition()/travelDir, getPhase()) each frame, following
// this project's "zero shared runtime state between cinematic modules"
// convention (see TrailLyrics.js's own header comment for the same rule).
//
// Ownership model: when `enabled`, this module fully owns camera.position/
// camera.quaternion for the frame (main.js disables OrbitControls exactly
// like the existing Head Particle Trail follow camera already does). When
// `enabled` is false, main.js's existing camera code runs completely
// unchanged — this module touches nothing.

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(e0, e1, x) {
  const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
  return t * t * (3 - 2 * t);
}

const WORLD_UP = new THREE.Vector3(0, 1, 0);

// ---------------------------------------------------------------------------
//  The six presets. Each `compute(ctx, out)` fills out.pos/out.look from the
//  live basis in `ctx` (head, forward, right, up, ocean, time, director —
//  the director instance, for presets that need small persistent state like
//  Side Follow's chosen side or Low Skim's height smoothing). All distances
//  in world units, matching the scale HeadParticleTrail's own path/camera
//  offsets already use (e.g. the existing diagonal follow camera's -22/+18
//  offsets) so framing feels consistent with the accepted look.
// ---------------------------------------------------------------------------
const PRESETS = [
  {
    key: 'directRear',
    label: 'Direct Rear',
    weight: 1.4,
    lyricSafe: true,
    // Spec 5: a TRUE direct-behind shot — almost exactly on the inverse
    // travel axis, not the diagonal chase angle. Only a tiny stabilizing
    // right-offset (kept at 0 — the basis is already stable enough without
    // one; see _basis()) so it reads as "directly behind", not diagonal.
    compute(ctx, out) {
      const { head, forward, up } = ctx;
      out.pos.copy(head).addScaledVector(forward, -26).addScaledVector(up, 7);
      out.look.copy(head).addScaledVector(forward, 6);
    },
  },
  {
    key: 'rearThreeQuarter',
    label: 'Rear Three-Quarter',
    weight: 1.5,
    lyricSafe: true,
    // The cinematic diagonal chase angle (spec 6) — deliberately similar in
    // character to the existing Follow Camera, but computed independently
    // here rather than reusing/importing it, per this project's convention.
    compute(ctx, out) {
      const { head, forward, right, up } = ctx;
      out.pos.copy(head).addScaledVector(forward, -24).addScaledVector(right, 17).addScaledVector(up, 9);
      out.look.copy(head).addScaledVector(forward, 8).addScaledVector(right, -4);
    },
  },
  {
    key: 'sideFollow',
    label: 'Side Follow',
    weight: 1.2,
    lyricSafe: true,
    // Spec 7: travels beside the traveler. Side (left/right) is chosen once
    // per shot instance (director._sideSign), not re-randomized every frame,
    // so the shot doesn't flip sides mid-hold.
    compute(ctx, out) {
      const { head, forward, right, up, director } = ctx;
      const side = director._sideSign || 1;
      out.pos.copy(head).addScaledVector(right, side * 30).addScaledVector(forward, -6).addScaledVector(up, 8);
      out.look.copy(head).addScaledVector(forward, 5);
    },
  },
  {
    key: 'wideChase',
    label: 'Wide Chase',
    weight: 1.0,
    lyricSafe: true,
    // Spec 8: a distant establishing shot — environment matters, traveler
    // reads small but must stay clearly visible (not so far it disappears).
    compute(ctx, out) {
      const { head, forward, right, up } = ctx;
      out.pos.copy(head).addScaledVector(forward, -55).addScaledVector(right, 14).addScaledVector(up, 24);
      out.look.copy(head).addScaledVector(forward, 16);
    },
  },
  {
    key: 'lowSkim',
    label: 'Low Skim',
    weight: 0.8,
    lyricSafe: false,
    // Spec 9: low rear-quarter camera near the surface. Height is derived
    // from ocean.heightAt() at the CAMERA's own column each frame (same
    // pattern main.js already uses for the free camera's own underwater
    // test), smoothed (never jumped) and hard-floored at a safe clearance
    // above the instantaneous wave height so the camera can visibly settle
    // toward wave-following motion without ever being able to dip below
    // the safety floor — see the comment on director._lowSkimY below.
    compute(ctx, out) {
      const { head, forward, right, ocean, time, dt, director } = ctx;
      const SAFE_CLEARANCE = 2.2;
      const camX = head.x + forward.x * -14 + right.x * 5;
      const camZ = head.z + forward.z * -14 + right.z * 5;
      const rawSurfaceY = ocean ? ocean.heightAt(camX, camZ, time) : 0;
      const targetY = rawSurfaceY + SAFE_CLEARANCE;
      if (director._lowSkimY == null) director._lowSkimY = targetY;
      // Fast smoothing (removes per-frame wave-sample jitter) but the FINAL
      // value is hard-floored at the instantaneous safe target every frame
      // — smoothing can only soften an upward move, never let the camera
      // linger below the current safe height (no underwater flicker).
      const smooth = 1 - Math.pow(0.0008, dt * 4);
      director._lowSkimY = THREE.MathUtils.lerp(director._lowSkimY, targetY, smooth);
      const finalY = Math.max(director._lowSkimY, targetY);
      out.pos.set(camX, finalY, camZ);
      out.look.copy(head).addScaledVector(forward, 5);
    },
  },
  {
    key: 'frontThreeQuarter',
    label: 'Front Three-Quarter',
    weight: 0.6,
    lyricSafe: false,
    // Spec 10: ahead of the traveler, offset to one side, looking back.
    // The side offset (20 units) keeps the camera well off the travel axis
    // so the head cannot fly through it (spec 17/27).
    compute(ctx, out) {
      const { head, forward, right, up } = ctx;
      out.pos.copy(head).addScaledVector(forward, 20).addScaledVector(right, 20).addScaledVector(up, 8);
      out.look.copy(head).addScaledVector(forward, -4);
    },
  },
  {
    key: 'highOrbit',
    label: 'High Orbit',
    weight: 0.7,
    // Continuously rotating relative to the traveler (every other preset
    // holds a FIXED head-relative offset) — unclear whether the
    // screen-locked lyric billboard's own per-frame plane orientation
    // stays comfortable to read while the camera sweeps, so start
    // conservative; promote to true once verified on screen.
    lyricSafe: false,
    // A slow overhead arc around the head. Uses its own dedicated angle
    // counter (director._orbitAngle, reset in setMode() whenever this
    // preset is freshly picked) rather than director._shotElapsed —
    // _shotElapsed only advances while `auto` is on, so it sits frozen the
    // entire time this preset is held via the C-key manual override
    // (auto: false), which made the shot look completely static instead of
    // orbiting. _orbitAngle instead accumulates every frame this preset is
    // actually being computed, auto or manual alike, and is never clamped —
    // held long enough (manually or via repeated auto picks) it keeps
    // sweeping all the way around rather than stopping partway.
    compute(ctx, out) {
      const { head, forward, right, up, dt, director } = ctx;
      const ORBIT_RADIUS = 32;
      const ORBIT_HEIGHT = 20;
      const ORBIT_SPEED = 0.5; // rad/s
      director._orbitAngle += dt * ORBIT_SPEED;
      const angle = director._orbitAngle;
      out.pos.copy(head)
        .addScaledVector(forward, -Math.cos(angle) * ORBIT_RADIUS)
        .addScaledVector(right, Math.sin(angle) * ORBIT_RADIUS)
        .addScaledVector(up, ORBIT_HEIGHT);
      out.look.copy(head).addScaledVector(up, 2);
    },
  },
  {
    key: 'bellySkim',
    label: 'Belly Skim',
    weight: 0.6,
    // Same rationale as Low Skim: sitting right at the water surface risks
    // obscuring lyric text.
    lyricSafe: false,
    // The inverse of Low Skim: planted low and just ahead of the traveler,
    // off to one side (so the head cannot fly through it, spec 17/27's
    // rule applied to this new angle too), so the head glides close
    // overhead as it catches up to and passes the camera. Shares Low
    // Skim's exact safe-clearance-above-the-wave pattern, with its own
    // smoothed height kept separately on the director (director._bellySkimY)
    // so the two presets never fight over the same state.
    compute(ctx, out) {
      const { head, forward, right, ocean, time, dt, director, up } = ctx;
      const SAFE_CLEARANCE = 2.0;
      const camX = head.x + forward.x * 16 + right.x * 9;
      const camZ = head.z + forward.z * 16 + right.z * 9;
      const rawSurfaceY = ocean ? ocean.heightAt(camX, camZ, time) : 0;
      const targetY = rawSurfaceY + SAFE_CLEARANCE;
      if (director._bellySkimY == null) director._bellySkimY = targetY;
      const smooth = 1 - Math.pow(0.0008, dt * 4);
      director._bellySkimY = THREE.MathUtils.lerp(director._bellySkimY, targetY, smooth);
      const finalY = Math.max(director._bellySkimY, targetY);
      out.pos.set(camX, finalY, camZ);
      out.look.copy(head).addScaledVector(up, 1.5);
    },
  },
];

const PRESET_BY_KEY = new Map(PRESETS.map((p) => [p.key, p]));
const DEFAULT_MODE = 'rearThreeQuarter';

// ---------------------------------------------------------------------------
//  Transition-type bias (spec 15) — a SMOOTH probability per (from,to) pair,
//  drawn from the director's own seeded RNG (deterministic, not
//  Math.random()). Order-independent (keyed by the unordered pair).
// ---------------------------------------------------------------------------
function transitionSmoothProbability(fromKey, toKey) {
  const pair = [fromKey, toKey].sort().join('|');
  if (pair === 'directRear|rearThreeQuarter') return 0.85;
  if (pair === 'rearThreeQuarter|sideFollow') return 0.5;
  if (fromKey === 'wideChase' || toKey === 'wideChase') return 0.25;
  if (fromKey === 'lowSkim' || toKey === 'lowSkim') return 0.2;
  if (fromKey === 'frontThreeQuarter' || toKey === 'frontThreeQuarter') return 0.2;
  if (fromKey === 'bellySkim' || toKey === 'bellySkim') return 0.2; // close pass reads best as a hard cut in
  if (fromKey === 'highOrbit' || toKey === 'highOrbit') return 0.4;
  return 0.55; // default: mildly prefer smooth for everything else
}

export class AutoDirector {
  constructor(opts = {}) {
    this.enabled = false;
    this.auto = true;
    this.paused = false;
    this.allowCuts = false;
    this.cameraMode = opts.mode || DEFAULT_MODE;
    this.seed = opts.seed >>> 0 || 1234;
    this.minShotDuration = 9.0;
    this.maxShotDuration = 16.0;
    this.transitionTime = 2.6;

    this._rand = mulberry32(this.seed);
    this._shotElapsed = 0;
    this._shotDuration = this.minShotDuration;
    this._lyricLocked = false;
    this._sideSign = this._rand() < 0.5 ? -1 : 1;
    this._lowSkimY = null;
    this._bellySkimY = null;
    this._orbitAngle = 0;

    // Transition state: when non-null, we're blending from a frozen
    // (pos,look) snapshot toward the current mode's LIVE (moving) target —
    // see update()'s comment for why the target itself must stay live.
    this._transition = null; // { fromPos, fromLook, duration, elapsed }
    this._transFromPos = new THREE.Vector3();
    this._transFromLook = new THREE.Vector3();

    this.lastAutoShots = []; // debug/report aid: {mode, duration, transition}

    // Scratch (reused every frame — no per-frame allocation).
    this._forward = new THREE.Vector3();
    this._right = new THREE.Vector3();
    this._toPos = new THREE.Vector3();
    this._toLook = new THREE.Vector3();
    this._lookBlend = new THREE.Vector3();
    this._out = { pos: this._toPos, look: this._toLook }; // reused every call — compute() only ever writes into these
    this._ctx = { head: new THREE.Vector3(), forward: this._forward, right: this._right, up: WORLD_UP, ocean: null, time: 0, dt: 0, director: this };
  }

  static get presetLabels() {
    const map = {};
    for (const p of PRESETS) map[p.label] = p.key;
    return map;
  }

  // Declaration order (not weight) — for the C-key manual cycle in main.js,
  // which steps through them one at a time rather than picking randomly.
  static get presetKeys() {
    return PRESETS.map((p) => p.key);
  }

  _isLyricSafe(key) {
    const p = PRESET_BY_KEY.get(key);
    return !p || p.lyricSafe;
  }

  _pickWeighted(candidates) {
    let total = 0;
    for (const p of candidates) total += p.weight;
    let r = this._rand() * total;
    for (const p of candidates) {
      r -= p.weight;
      if (r <= 0) return p.key;
    }
    return candidates[candidates.length - 1].key;
  }

  // Weighted seeded pick excluding the current mode (spec 13: never repeat),
  // and softly discouraging A-B-A-B alternation by halving the weight of
  // whatever mode was active two shots ago (spec 13: "preferably avoid
  // alternating only between two similar modes").
  _pickNextMode(lyricSafeOnly) {
    const pool = PRESETS.filter((p) => p.key !== this.cameraMode && (!lyricSafeOnly || p.lyricSafe));
    if (pool.length === 0) return this.cameraMode;
    const twoAgo = this._prevMode;
    const weighted = pool.map((p) => ({ key: p.key, weight: p.key === twoAgo ? p.weight * 0.5 : p.weight }));
    return this._pickWeighted(weighted);
  }

  _pickDuration() {
    return this.minShotDuration + this._rand() * Math.max(0.001, this.maxShotDuration - this.minShotDuration);
  }

  _pickTransition(fromKey, toKey) {
    if (!this.allowCuts) return 'smooth';
    const p = transitionSmoothProbability(fromKey, toKey);
    return this._rand() < p ? 'smooth' : 'cut';
  }

  // Begins a switch to `mode`. `transition` is 'smooth' | 'cut'; if omitted
  // it is drawn deterministically from the seeded RNG based on the
  // (from,to) pair (spec 15's transition-tendency table).
  setMode(mode, transition, currentPos, currentLook) {
    if (!PRESET_BY_KEY.has(mode)) return;
    const fromKey = this.cameraMode;
    const t = transition || this._pickTransition(fromKey, mode);
    this._prevMode = fromKey;
    this.cameraMode = mode;
    if (mode === 'sideFollow') this._sideSign = this._rand() < 0.5 ? -1 : 1;
    if (mode === 'highOrbit') this._orbitAngle = 0;
    if (t === 'smooth' && currentPos && currentLook) {
      this._transFromPos.copy(currentPos);
      this._transFromLook.copy(currentLook);
      this._transition = { duration: Math.max(0.05, this.transitionTime), elapsed: 0 };
    } else {
      this._transition = null; // CUT — next compute() output is used as-is
    }
    return t;
  }

  // Forces the next shot to begin immediately (debug "Next Shot" / spec 23's
  // nextDirectorShot()). Respects the current lyric-safety restriction.
  requestNextShot(currentPos, currentLook) {
    if (!this.auto) return;
    const lyricSafeOnly = this._lyricLocked;
    const mode = this._pickNextMode(lyricSafeOnly);
    const duration = this._pickDuration();
    const transition = this.setMode(mode, undefined, currentPos, currentLook);
    this._shotElapsed = 0;
    this._shotDuration = duration;
    this._recordShot(mode, duration, transition);
  }

  _recordShot(mode, duration, transition) {
    this.lastAutoShots.push({ mode, duration: +duration.toFixed(2), transition });
    if (this.lastAutoShots.length > 10) this.lastAutoShots.shift();
  }

  restart() {
    this._rand = mulberry32(this.seed);
    this._shotElapsed = 0;
    this._prevMode = null;
    this._sideSign = this._rand() < 0.5 ? -1 : 1;
    this.lastAutoShots.length = 0;
    this._transition = null;
    if (this.auto) {
      // First shot has no "previous" to exclude — pick from the full
      // weighted pool so the sequence depends only on the seed, never on
      // whatever cameraMode happened to be set before restart() was called.
      this.cameraMode = this._pickWeighted(PRESETS);
      this._shotDuration = this._pickDuration();
      this._recordShot(this.cameraMode, this._shotDuration, 'cut');
    }
  }

  _basis(headParticleTrail) {
    this._forward.copy(headParticleTrail.travelDir);
    if (this._forward.lengthSq() < 1e-8) this._forward.set(0, 0, -1);
    this._right.crossVectors(this._forward, WORLD_UP);
    if (this._right.lengthSq() < 1e-6) this._right.set(1, 0, 0);
    else this._right.normalize();
  }

  update(dt, headParticleTrail, trailLyrics, camera, ocean, time) {
    if (!this.enabled || !headParticleTrail) return;
    if (this.paused) return; // frame frozen exactly as last rendered

    this._basis(headParticleTrail);
    const ctx = this._ctx;
    headParticleTrail.getHeadPosition(ctx.head);
    ctx.ocean = ocean;
    ctx.time = time;
    ctx.dt = dt;

    // Lyric-safety (spec 18/19, revised): during ASSEMBLE/HOLD, restrict
    // picks to the lyric-safe presets — if the ALREADY active shot happens
    // not to be lyric-safe the moment ASSEMBLE starts, force one immediate
    // CUT to a lyric-safe shot. The original spec then froze the shot
    // timer for the rest of ASSEMBLE/HOLD too ("never switch away from
    // whichever shot is active once the readable window begins"), on the
    // assumption that a lock only ever spans one phrase's brief few-second
    // hold. Measured against this song's actual lyric density, though,
    // getNewestActivePhrase() is in ASSEMBLE/HOLD for ~74% of the total
    // runtime (phrases run near back-to-back), so freezing meant whichever
    // shot happened to be active when a long locked stretch began just sat
    // there for most of the song — two angles alone measured out to 84% of
    // total screen time. The timer now keeps running through a lock too;
    // it only restricts which pool an expiring shot is redrawn from
    // (lyric-safe-only while locked, exactly like the forced-cut case
    // above), so the camera still varies during heavily-lyriced sections
    // instead of parking on one shot for most of the song.
    const phase = trailLyrics ? trailLyrics.getPhase() : null;
    const lyricLockNow = phase === 'assemble' || phase === 'hold';
    if (this.auto && lyricLockNow && !this._lyricLocked && !this._isLyricSafe(this.cameraMode)) {
      PRESET_BY_KEY.get(this.cameraMode).compute(ctx, this._out);
      this.setMode(this._pickNextMode(true), 'cut', this._toPos, this._toLook);
    }
    this._lyricLocked = lyricLockNow;

    if (this.auto) {
      this._shotElapsed += dt;
      if (this._shotElapsed >= this._shotDuration) {
        const mode = this._pickNextMode(lyricLockNow);
        const duration = this._pickDuration();
        PRESET_BY_KEY.get(this.cameraMode).compute(ctx, this._out);
        const transition = this.setMode(mode, undefined, this._toPos, this._toLook);
        this._shotElapsed = 0;
        this._shotDuration = duration;
        this._recordShot(mode, duration, transition);
      }
    }

    const active = PRESET_BY_KEY.get(this.cameraMode) || PRESET_BY_KEY.get(DEFAULT_MODE);
    active.compute(ctx, this._out);

    if (this._transition) {
      this._transition.elapsed += dt;
      const e = smoothstep(0, 1, Math.min(1, this._transition.elapsed / this._transition.duration));
      camera.position.lerpVectors(this._transFromPos, this._toPos, e);
      this._lookBlend.copy(this._transFromLook).lerp(this._toLook, e);
      camera.lookAt(this._lookBlend);
      if (e >= 1) this._transition = null;
    } else {
      camera.position.copy(this._toPos);
      camera.lookAt(this._toLook);
    }
  }
}
