import * as THREE from 'three';

// Head Particle Trail V1 — THE HEAD IS THE EMITTER. Particles are born at
// the head's exact current world position, then become fully independent —
// each owns its own world-space position from that moment on and is NEVER
// recomputed from where the head currently is. The tail is not built,
// drawn, or connected to the head in any way; it is simply the accumulation
// of particles that were born a few seconds ago and haven't faded out yet.
// Deliberately avoids any head-to-tail geometry (e.g. a ribbon mesh), which
// can visibly detach/misalign from the head — there is no geometry to
// misalign.
//
// Determinism: every particle's properties are a pure function of its own
// global EMISSION INDEX (birth order number), via emissionRand() below — not
// of wall-clock Math.random(), and not of how many frames have elapsed.
// Because emission happens at an exact, constant rate, emission index i was
// always born at time i/emissionRate; this lets setTime(T) jump to any T and
// deterministically rebuild exactly the particles that would exist at T,
// without needing to have "played through" every frame in between.

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

// Deterministic per-emission-index PRNG: emission index N always produces
// the identical sequence of rand() calls whether reached by live sequential
// playback or by jumping straight to it during a setTime() reconstruction.
function emissionRand(baseSeed, emitIndex) {
  return mulberry32((baseSeed ^ Math.imul(emitIndex + 1, 0x9e3779b9)) >>> 0);
}

function smoothstep(e0, e1, x) {
  const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
  return t * t * (3 - 2 * t);
}

// ---------------------------------------------------------------------------
//  Smooth Horizontal Steering V1 — replaces the earlier "Organic Meander"
//  design, which displaced the traveler SIDEWAYS from the base Catmull-Rom
//  path using a basis rebuilt every call from that base path's own
//  (changing) tangent. Because the sideways basis itself rotated as the
//  base path curved, the effective direction the traveler appeared to move
//  in could visibly snap frame-to-frame — most noticeable exactly where the
//  base path curved fastest. There is no such basis here to rotate: the
//  traveler's horizontal motion is its own persistent heading/turnRate
//  state, closer to steering a boat than sliding a point sideways off a
//  fixed rail — the same "current + smooth change = next" shape as the
//  existing Space-key altitude control (see main.js), just applied to X/Z
//  instead of Y, and fully independent of it (see
//  HeadParticleTrail.setAltitudeOffset() / setMeanderStrength()).
// ---------------------------------------------------------------------------
const STEER_BASE_SPEED = 19.0; // world units/sec — matches the old authored path's own average pace (~396 units of control-point-to-control-point distance over its 21s span)
const STEER_DT = 0.05; // seconds — fixed simulation step for HeadPath._simulate() below (never the render frame's own dt). V1 used 0.5s; that was fine for the desired TURN-RATE curve (its own periods are >>10s) but too coarse once fed through cos/sin into POSITION — visible as an occasional faceted "kaku" step. 0.05s removes that at a still-modest cost (see STEER_CHECKPOINT_DT below for how that cost is kept bounded).
const STEER_CHECKPOINT_DT = 1.0; // seconds — see HeadPath's checkpoint cache in _simulate(): reconstructing from t=0 on every call got 10x more expensive when STEER_DT dropped from 0.5 to 0.05, and TrailLyrics samples HeadParticleTrail.getHeadPositionAtTime() up to PARTICLE_COUNT times per phrase — this bounds that to "at most STEER_CHECKPOINT_DT/STEER_DT fresh steps" per call instead of "t/STEER_DT".
const STEER_TURN_SMOOTHING = 0.35; // 1/seconds — rate turnRate chases desiredTurnRate (see damp() below); ~2.9s time constant, tuned only for "no twitching", not physically meaningful
const MANUAL_TURN_SPEED = 0.55; // rad/sec — A/D manual turn-rate contribution (see "Manual A/D Steering V1" below); a named, live-input-only constant, entirely separate from the automatic turnRate above
// Two non-commensurate, very-low-frequency sine terms (periods ~31s and
// ~90s) summed into one desired turn rate — deterministic (a pure function
// of t), never Math.random(), and with no small-integer ratio between them
// so their sum drifts rather than visibly repeating within a practical
// viewing window.
const STEER_TURN_AMP_LARGE = 0.08; // rad/sec
const STEER_TURN_FREQ_LARGE = 0.20;
const STEER_TURN_PHASE_LARGE = 0.8;
const STEER_TURN_AMP_SMALL = 0.03; // rad/sec — keeps the broad turn from reading as one clean sine
const STEER_TURN_FREQ_SMALL = 0.07;
const STEER_TURN_PHASE_SMALL = 2.1;

// The desired (pre-smoothing) turn rate at time t — scaled by `strength`
// (GUI: Meander Strength, 0..2): 0 yields a desired turn rate of exactly 0
// everywhere, i.e. no automatic turning at all (a straight line from the
// traveler's starting heading); 1 is the intended gentle-wander feel; 2 an
// exaggerated, more sharply curving diagnostic.
function desiredTurnRate(t, strength) {
  const large = Math.sin(t * STEER_TURN_FREQ_LARGE + STEER_TURN_PHASE_LARGE) * STEER_TURN_AMP_LARGE;
  const small = Math.sin(t * STEER_TURN_FREQ_SMALL + STEER_TURN_PHASE_SMALL) * STEER_TURN_AMP_SMALL;
  return (large + small) * strength;
}

// ---------------------------------------------------------------------------
//  Head path — the base Catmull-Rom spline is kept only to seed the
//  traveler's starting position/heading (constructor below) so the journey
//  still begins exactly where and facing the same way it always has; from
//  t=0 onward the base curve is never consulted again — the persistent
//  heading/turnRate simulation (_simulate()) is the sole source of the
//  traveler's horizontal position. Owned entirely by this module — no
//  shared import — matching the project-wide convention that every
//  cinematic module owns its own path.
// ---------------------------------------------------------------------------
class HeadPath {
  constructor(points, times) {
    this.curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
    this.times = times;
    this.total = times[times.length - 1];
    this._n = points.length;
    // Smooth Horizontal Steering V1 strength multiplier — 0 disables
    // automatic turning entirely (straight line from the start heading), 1
    // is the intended feel, 2 an exaggerated diagnostic. See
    // HeadParticleTrail.setMeanderStrength(). Renaming this GUI-facing
    // field would touch main.js's existing "Meander Strength" control for
    // no benefit, so it keeps its original name.
    this.meanderStrength = 0.0;

    // Seed state, read once here from the raw Catmull-Rom curve's own
    // start point/tangent — never touched again after this.
    const p0 = this.curve.getPoint(0);
    const tan0 = this.curve.getTangent(0);
    this._startX = p0.x;
    this._startZ = p0.z;
    this._startHeading = Math.atan2(tan0.z, tan0.x);

    // Checkpoint cache for _simulate() below — one entry per
    // STEER_CHECKPOINT_DT of song time reached so far, append-only (never
    // trimmed), seeded with the t=0 start state itself so index 0 always
    // exists. Invalidated (see _invalidateCheckpoints()) whenever
    // meanderStrength changes, since a cached checkpoint's state is only
    // valid for the strength it was computed under.
    this._checkpoints = [{ t: 0, x: this._startX, z: this._startZ, heading: this._startHeading, turnRate: 0 }];

    // `_simulate(t)` always fully re-derives its result from the nearest
    // checkpoint (see its own comment) — this just avoids paying even that
    // reduced cost twice for the extremely common same-frame pattern of
    // positionAt(t) immediately followed by tangentAt(t) for the SAME t.
    this._lastSimT = null;
    this._lastSimResult = null;
  }

  // GUI-facing strength setter — routed through here (rather than a plain
  // field write) so a mid-playback change correctly invalidates the
  // checkpoint cache below, which would otherwise keep serving
  // stale-strength state for any song time already reached.
  setMeanderStrength(value) {
    this.meanderStrength = value;
    this._invalidateCheckpoints();
  }

  _invalidateCheckpoints() {
    this._checkpoints.length = 1; // keep only the t=0 seed
    this._lastSimT = null;
  }

  // Deterministic re-simulation of the traveler's own heading + horizontal
  // position up to `t`, using a FIXED simulation step (STEER_DT) — never
  // the caller's/render frame's own dt, and no state carried over between
  // calls — so the exact same `t` always reproduces the exact same result
  // regardless of when, how often, or in what order it is queried (spec:
  // seeking must not create a different path; the same song time must
  // always reconstruct the same traveler position and heading). This is
  // the "fixed-step reconstruction from a known initial state" strategy —
  // simpler and more robust for this project than deriving a closed-form
  // analytic heading/position pair.
  //
  // Resumes from the nearest checkpoint at or before `t` instead of always
  // restarting at t=0: without this, dropping STEER_DT from 0.5s to 0.05s
  // (to remove the visible faceted "kaku" stepping the coarser step left in
  // POSITION — see STEER_DT's own comment) would have made every call 10x
  // more expensive, and this is called once per DISTINCT historical time a
  // caller asks for — up to PARTICLE_COUNT times in a single burst whenever
  // a TrailLyrics phrase samples the recent wake. Checkpoints are cached at
  // fixed STEER_CHECKPOINT_DT boundaries only (never at an arbitrary
  // requested `t`), so resuming from one is exactly as deterministic as
  // restarting from t=0 — it's the same fixed sequence of steps, just not
  // recomputed from scratch every time.
  _simulate(t) {
    if (t === this._lastSimT) return this._lastSimResult;
    const target = Math.max(0, t);
    const strength = this.meanderStrength;
    const checkpoints = this._checkpoints;
    const startIdx = Math.min(Math.floor(target / STEER_CHECKPOINT_DT), checkpoints.length - 1);
    const start = checkpoints[startIdx];
    let simTime = start.t;
    let heading = start.heading;
    let turnRate = start.turnRate;
    let x = start.x;
    let z = start.z;
    while (simTime < target) {
      // Advance to whichever comes first: the next checkpoint boundary, or
      // the final target — so a freshly-crossed checkpoint is exactly
      // grid-aligned (never mid-step) before it's cached.
      const nextBoundary = (Math.floor(simTime / STEER_CHECKPOINT_DT) + 1) * STEER_CHECKPOINT_DT;
      const segmentEnd = Math.min(target, nextBoundary);
      while (simTime < segmentEnd) {
        const step = Math.min(STEER_DT, segmentEnd - simTime);
        const desired = desiredTurnRate(simTime, strength);
        // Frame-rate-independent exponential damp toward `desired` — the
        // same "current + smooth change = next" shape as the Space-key
        // altitude control, just approached asymptotically instead of
        // linearly so turnRate itself never jumps.
        const k = 1 - Math.exp(-STEER_TURN_SMOOTHING * step);
        turnRate += (desired - turnRate) * k;
        heading += turnRate * step;
        x += Math.cos(heading) * STEER_BASE_SPEED * step;
        z += Math.sin(heading) * STEER_BASE_SPEED * step;
        simTime += step;
      }
      simTime = segmentEnd; // discard any float drift from the inner loop before the boundary check below
      if (simTime === nextBoundary) {
        const idx = Math.round(simTime / STEER_CHECKPOINT_DT);
        if (idx === checkpoints.length) checkpoints.push({ t: simTime, x, z, heading, turnRate });
      }
    }
    this._lastSimT = t;
    this._lastSimResult = { x, z, heading, turnRate };
    return this._lastSimResult;
  }

  // Horizontal position only — Y is irrelevant here regardless, since every
  // caller (HeadParticleTrail) immediately overwrites it with a live
  // water-height sample, exactly as before this ticket.
  positionAt(t, out = new THREE.Vector3()) {
    const s = this._simulate(t);
    out.set(s.x, 0, s.z);
    return out;
  }

  // Derived DIRECTLY from the simulated heading — no finite-difference
  // needed (unlike the old meander design, which had to re-sample
  // positionAt() twice per tangent query): heading already IS the
  // traveler's exact direction of travel at `t`.
  tangentAt(t, out = new THREE.Vector3()) {
    const s = this._simulate(t);
    out.set(Math.cos(s.heading), 0, Math.sin(s.heading));
    return out;
  }
}

// ---------------------------------------------------------------------------
//  Tunables
// ---------------------------------------------------------------------------
const POOL_SIZE = 600; // preallocated particle pool (spec 7: 400-900, start 600)
const MAX_LIFETIME = 4.0; // hard upper bound across the lifetime distribution (spec 9)
const SPAWN_JITTER = 0.22; // world units — much smaller than the head's visible halo (spec 11)

// Warm gold/ivory palette — keep the base colours meaningfully saturated and
// the environment-tint lerp weight low, or ACES tonemapping + additive
// bloom will wash everything back to white.
const COLOR_HEAD_CORE = new THREE.Color(0xfffaf5); // near-white
const COLOR_HEAD_INNER = new THREE.Color(0xffe0a3); // white-gold
const COLOR_HEAD_OUTER = new THREE.Color(0xffcf85); // pale amber-gold
const COLOR_WATER_GLINT = new THREE.Color(0xe9c98a); // muted pale gold, darker than the head

export class HeadParticleTrail {
  constructor(scene, opts = {}) {
    const { seed = 4242 } = opts;
    this._seedBase = seed >>> 0;
    this.speed = 0.3;
    this.paused = false;
    this.localTime = 0;
    // Distance actually travelled (world units) — the emission schedule
    // below is indexed by THIS, not localTime, so trail particle spacing
    // stays constant regardless of Travel Speed (this.speed).
    this.distanceTraveled = 0;
    // Bumped from 150: emission is per-distance (spacing along the trail is
    // independent of Travel Speed — see distanceTraveled above), so lowering
    // Travel Speed to match the song's pacing also lowers total particles
    // alive per second, reading as visually quieter even though spacing
    // itself never changed. Raising this restores denser sparkle along the
    // trail without touching speed.
    this.emissionRate = 220;
    this.phase = 'flight';

    // ---- Head path (spec 22). ----
    this.path = new HeadPath(
      [
        new THREE.Vector3(-70, 18, 420),
        new THREE.Vector3(-25, 15, 320),
        new THREE.Vector3(20, 14, 230),
        new THREE.Vector3(60, 16, 170),
        new THREE.Vector3(100, 18, 120),
        new THREE.Vector3(140, 20, 90),
      ],
      [0, 5, 9, 13, 17, 21]
    );

    // ---- Manual A/D Steering V1 — see setManualTurnInput()/update(). ----
    // Expected values: -1 (turn left), 0 (no input), +1 (turn right); set
    // every frame by main.js from the live KeyA/KeyD held state, exactly
    // like altitudeOffset is for Space. Purely a live input value — it is
    // NOT part of the deterministic automatic path (see update()'s own
    // comment on why) and is never itself reconstructed from song time.
    this.manualTurnInput = 0;

    // ---- Live horizontal steering state (spec: "current + smooth change =
    // next", same shape as the Space-key altitude control) — this is the
    // ACTUAL rendered head position/heading during live playback, advanced
    // every frame in update() using the real frame dt, combining the
    // automatic turnRate (see desiredTurnRate()) with any live manual A/D
    // input. This is DELIBERATELY separate from HeadPath._simulate(), which
    // stays a pure, automatic-only, deterministic function of t used for
    // reconstruction (setTime()/_reconstructAt(), and TrailLyrics' wake
    // sampling via getHeadPositionAtTime()) — manual A/D input has no
    // history to replay from song time alone (spec 7), so it can only ever
    // be layered onto the LIVE state, not the reconstructable one. Seeded
    // here, and re-seeded on every setTime()/restart() (see
    // _reconstructAt()), from HeadPath._simulate() at that same time, so
    // that absent any A/D input the live path exactly follows the
    // deterministic automatic one.
    const liveSeed = this.path._simulate(0);
    this._liveX = liveSeed.x;
    this._liveZ = liveSeed.z;
    this._liveHeading = liveSeed.heading;
    this._liveTurnRate = liveSeed.turnRate;

    // ---- Head sprite (spec 4) — three spatially EXCLUSIVE colour bands
    // (never summed at the same pixel) so the near-white core never dilutes
    // the visibly gold halo, and vice versa. This is an independent copy,
    // not a shared class, per the project's convention of zero cross-module
    // runtime dependencies. ----
    this.headUniforms = {
      uColorCore: { value: COLOR_HEAD_CORE.clone() },
      uColorInner: { value: COLOR_HEAD_INNER.clone() },
      uColorOuter: { value: COLOR_HEAD_OUTER.clone() },
      // V1.1: Custom/Rainbow modes drive the halo from a single selected
      // colour instead of the fixed gold inner/outer pair — the innermost
      // core (uColorCore) always stays available to run near-white.
      uHeadColor: { value: new THREE.Color(0x66e0ff) },
      uColorMode: { value: 0.0 }, // 0=gold, 1=custom, 2=rainbow
      uRainbowSpeed: { value: 0.15 },
      uRainbowSaturation: { value: 0.8 },
      // V1.1: Head Bloom replaces uGlow as the head's own HDR control,
      // kept separate from the trail's Brightness/Particle Bloom so the
      // head can be tuned to stay the brightest object independently.
      // Bumped from 1.0 alongside emissionRate/uBrightness/uParticleBloom
      // above/below to keep the trail feeling lively at the lower Travel
      // Speed now used to match the song's pacing.
      uHeadBloom: { value: 1.4 },
      uTime: { value: 0 },
      uPixelSize: { value: 900.0 },
    };
    const headGeo = new THREE.BufferGeometry();
    headGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(3), 3).setUsage(THREE.DynamicDrawUsage));
    const headMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      toneMapped: false,
      blending: THREE.AdditiveBlending,
      uniforms: this.headUniforms,
      vertexShader: /* glsl */ `
        precision highp float;
        uniform float uPixelSize;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uPixelSize / max(-mv.z, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColorCore, uColorInner, uColorOuter, uHeadColor;
        uniform float uHeadBloom, uTime;
        uniform float uColorMode, uRainbowSpeed, uRainbowSaturation;
        vec3 hsv2rgb(vec3 c){
          vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        void main(){
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d) * 2.0;
          float coreRaw  = smoothstep(0.15, 0.0, r);
          float innerRaw = smoothstep(0.46, 0.05, r);
          float outerRaw = smoothstep(1.0, 0.22, r);
          float twinkle = 0.94 + 0.06 * sin(uTime * 4.0);
          float shapeAlpha = clamp(coreRaw * 1.0 + innerRaw * 0.6 + outerRaw * 0.24, 0.0, 1.0) * twinkle;
          // Exclusive bands: a ring never also carries the core's
          // contribution, so the halo survives ACES tonemapping instead of
          // being summed into near-white.
          float core = coreRaw;
          float inner = clamp(innerRaw - coreRaw, 0.0, 1.0);
          float outer = clamp(outerRaw - innerRaw, 0.0, 1.0);
          // V1.1 (spec 7): the halo colour follows the selected Head Color
          // in Custom/Rainbow modes — only the innermost core is ever
          // allowed to run near-white, so e.g. a cyan Head Color reads as
          // "small white-hot centre + cyan luminous halo", not just white.
          vec3 haloInner, haloOuter;
          if (uColorMode < 0.5) {
            haloInner = uColorInner; haloOuter = uColorOuter;
          } else if (uColorMode < 1.5) {
            haloInner = uHeadColor; haloOuter = uHeadColor;
          } else {
            vec3 rc = hsv2rgb(vec3(fract(uTime * uRainbowSpeed), uRainbowSaturation, 1.0));
            haloInner = rc; haloOuter = rc;
          }
          vec3 emissive = (uColorCore * core * 2.1 + haloInner * inner * 1.1 + haloOuter * outer * 0.65) * uHeadBloom * twinkle;
          gl_FragColor = vec4(emissive, shapeAlpha);
        }
      `,
    });
    this.headMesh = new THREE.Points(headGeo, headMat);
    this.headMesh.frustumCulled = false;
    scene.add(this.headMesh);

    // ---- Trail: ONE preallocated THREE.Points pool. "position" here is the
    // particle's BIRTH position — an immutable anchor, never touched again
    // after emission (spec 3/6). The vertex shader computes each particle's
    // CURRENT position on the GPU every frame from birthPos + velocity*age
    // + a small deterministic drift, driven only by a single uTime uniform
    // — so ageing/drifting costs zero CPU work and zero attribute uploads;
    // only new emissions (a handful per frame) touch the typed arrays. ----
    const n = POOL_SIZE;
    const birthPos = new Float32Array(n * 3);
    const velocity = new Float32Array(n * 3);
    const birthTime = new Float32Array(n).fill(-1000); // far in the past -> already-dead by default
    const lifetime = new Float32Array(n).fill(1.0); // never 0, avoids divide-by-zero
    const seedAttr = new Float32Array(n);
    const sizeAttr = new Float32Array(n);
    const toneBias = new Float32Array(n);

    const trailGeo = new THREE.BufferGeometry();
    trailGeo.setAttribute('position', new THREE.BufferAttribute(birthPos, 3).setUsage(THREE.DynamicDrawUsage));
    trailGeo.setAttribute('aVelocity', new THREE.BufferAttribute(velocity, 3).setUsage(THREE.DynamicDrawUsage));
    trailGeo.setAttribute('aBirthTime', new THREE.BufferAttribute(birthTime, 1).setUsage(THREE.DynamicDrawUsage));
    trailGeo.setAttribute('aLifetime', new THREE.BufferAttribute(lifetime, 1).setUsage(THREE.DynamicDrawUsage));
    trailGeo.setAttribute('aSeed', new THREE.BufferAttribute(seedAttr, 1).setUsage(THREE.DynamicDrawUsage));
    trailGeo.setAttribute('aSize', new THREE.BufferAttribute(sizeAttr, 1).setUsage(THREE.DynamicDrawUsage));
    trailGeo.setAttribute('aToneBias', new THREE.BufferAttribute(toneBias, 1).setUsage(THREE.DynamicDrawUsage));

    this.trailUniforms = {
      uTime: { value: 0 },
      uPixelSize: { value: 130.0 },
      uColorTint: { value: new THREE.Color(1, 1, 1) },
      // V1.1: colour-mode system (spec 3-16) — 0=gold (existing accepted
      // age-gradient palette), 1=custom (Young/Mid/Old interpolation),
      // 2=rainbow (deterministic hue-vs-emission-time progression).
      uColorMode: { value: 0.0 },
      uYoungColor: { value: new THREE.Color(0x66e0ff) },
      uMidColor: { value: new THREE.Color(0x3366ff) },
      uOldColor: { value: new THREE.Color(0x8b5cf6) },
      uRainbowSpeed: { value: 0.15 },
      uRainbowSaturation: { value: 0.8 },
      // V1.1 (spec 13-16): Brightness controls the visible particle body
      // (hue-preserving); Particle Bloom controls only the extra HDR
      // highlight energy on young particles — replaces the old single
      // `hdrBoost` multiplier that scaled the WHOLE colour (including old,
      // already-dim particles) and made moderate values read as clipped
      // white regardless of the chosen hue.
      // Both bumped from 1.0 — see uHeadBloom's own comment above.
      uBrightness: { value: 1.15 },
      uParticleBloom: { value: 1.3 },
    };
    const trailMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      toneMapped: false,
      blending: THREE.AdditiveBlending,
      uniforms: this.trailUniforms,
      vertexShader: /* glsl */ `
        precision highp float;
        attribute vec3 aVelocity;
        attribute float aBirthTime, aLifetime, aSeed, aSize, aToneBias;
        uniform float uTime, uPixelSize;
        varying float vAlpha, vAge, vSeed, vToneBias, vBirthTime;
        void main(){
          float age = uTime - aBirthTime;
          float na = clamp(age / aLifetime, 0.0, 1.0);
          // Slow deterministic drift (spec 13): "luminous dust suspended in
          // air" — sideways/vertical spread that grows with age, built from
          // per-particle seed + two gentle frequencies, never violent.
          float phase = aSeed * 6.2831853;
          float sway = sin(uTime * 0.6 + phase) * (0.10 + na * 0.55);
          float bob  = cos(uTime * 0.5 + phase * 1.3) * (0.08 + na * 0.35);
          vec3 pos = position + aVelocity * age;
          pos.x += sway;
          pos.z += sway * 0.4;
          pos.y += bob + na * 0.22;
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          // Age/size profile (spec 10): small&dense near birth -> a touch
          // larger/softer mid-life -> shrinking again as it fades.
          float sizeCurve = mix(0.75, 1.15, smoothstep(0.0, 0.5, na)) * mix(1.15, 0.5, smoothstep(0.5, 1.0, na));
          gl_PointSize = uPixelSize * aSize * sizeCurve / max(-mv.z, 1.0);
          float fadeIn = smoothstep(0.0, 0.05, na);
          float fadeOut = 1.0 - smoothstep(0.55, 1.0, na);
          vAlpha = fadeIn * fadeOut * step(age, aLifetime) * step(0.0, age);
          vAge = na;
          vSeed = aSeed;
          vToneBias = aToneBias;
          vBirthTime = aBirthTime;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColorTint;
        uniform vec3 uYoungColor, uMidColor, uOldColor;
        uniform float uColorMode, uRainbowSpeed, uRainbowSaturation;
        uniform float uBrightness, uParticleBloom;
        varying float vAlpha, vAge, vSeed, vToneBias, vBirthTime;
        vec3 hsv2rgb(vec3 c){
          vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
          vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
          return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
        }
        void main(){
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d) * 2.0;
          if (r > 1.0) discard;
          float core = smoothstep(0.35, 0.0, r);
          float halo = smoothstep(1.0, 0.25, r);
          float twinkle = 0.85 + 0.15 * sin(vSeed * 37.0 + vAge * 8.0);
          float shapeAlpha = clamp(core * 1.0 + halo * 0.5, 0.0, 1.0) * vAlpha * twinkle;

          vec3 tone;
          if (uColorMode < 0.5) {
            // Gold (spec 4): colour ages with the particle — white-gold
            // when new, pale gold young, warm ivory/amber mid-life, faint
            // warm-white old — with a rare cool-white minority (aToneBias)
            // only showing once a particle is old.
            vec3 cNew   = vec3(1.0, 0.90, 0.68);
            vec3 cYoung = vec3(1.0, 0.85, 0.55);
            vec3 cMid   = vec3(1.0, 0.88, 0.72);
            vec3 cOldWarm = vec3(1.0, 0.93, 0.85);
            vec3 cOldCool = vec3(0.85, 0.90, 1.0);
            vec3 cOld = mix(cOldWarm, cOldCool, vToneBias);
            vec3 baseTone = mix(mix(mix(cNew, cYoung, smoothstep(0.0, 0.25, vAge)), cMid, smoothstep(0.25, 0.6, vAge)), cOld, smoothstep(0.6, 1.0, vAge));
            tone = mix(baseTone, uColorTint, 0.10);
          } else if (uColorMode < 1.5) {
            // Custom (spec 5/6): smooth Young -> Mid -> Old interpolation
            // by normalized age, breakpoints at 0.00/0.45/1.00.
            tone = mix(mix(uYoungColor, uMidColor, smoothstep(0.0, 0.45, vAge)), uOldColor, smoothstep(0.45, 1.0, vAge));
          } else {
            // Rainbow (spec 8/9): hue is a deterministic function of the
            // particle's own EMISSION TIME (vBirthTime) plus a small
            // per-particle seed variation — particles born around the same
            // moment share a hue, and as the head moves forward new hues
            // continuously enter the wake while old ones remain behind
            // until they die. Never a function of vAge/screen position, so
            // it reads as a flowing spectral wake, not static rainbow
            // stripes or per-particle confetti.
            float hue = fract(vBirthTime * uRainbowSpeed + vSeed * 0.05);
            tone = hsv2rgb(vec3(hue, uRainbowSaturation, 1.0));
          }

          // V1.1 (spec 13-16): visible body colour and HDR highlight energy
          // are now separate additive terms instead of one multiplicative
          // "hdrBoost" scaling the WHOLE colour — this is what previously
          // let ACES crush hue into white even at moderate settings. The
          // body term stays at a moderate, hue-preserving magnitude
          // (uBrightness); only a young-particle-gated highlight term
          // (uParticleBloom), itself pulled slightly toward white rather
          // than the full saturated hue, contributes extra HDR energy —
          // so only a MINORITY of the newest particles ever bloom hard,
          // and the visible body keeps its colour even when Bloom is high.
          vec3 visibleColor = tone * (0.25 + core * 0.9) * uBrightness;
          float youngMask = smoothstep(0.5, 0.0, vAge);
          vec3 highlightColor = mix(tone, vec3(1.0), 0.3);
          vec3 highlightEnergy = highlightColor * core * youngMask * uParticleBloom;
          vec3 emissive = visibleColor + highlightEnergy;
          gl_FragColor = vec4(emissive, shapeAlpha);
        }
      `,
    });
    this.trailPoints = new THREE.Points(trailGeo, trailMat);
    this.trailPoints.frustumCulled = false;
    scene.add(this.trailPoints);

    this._birthPos = birthPos;
    this._velocity = velocity;
    this._birthTime = birthTime;
    this._lifetime = lifetime;
    this._seedAttr = seedAttr;
    this._sizeAttr = sizeAttr;
    this._toneBias = toneBias;

    // Emission bookkeeping (spec 8/24): emission index N is always born at
    // time N/emissionRate — an exact analytic schedule (not an accumulator
    // that could drift), so live playback and setTime() reconstruction can
    // never disagree about which index was born when.
    this._emitCount = 0; // total particles ever emitted (monotonic)
    this._writeCursor = 0; // next pool slot to overwrite (ring buffer)

    // Traveler Altitude V1: a persistent vertical offset added on top of the
    // wave-relative hover height below, owned entirely by this class so
    // every consumer of _headPos (live update, seek reconstruction, and the
    // historical getHeadPositionAtTime() query) agrees on the same altitude.
    // Input handling lives in main.js; this class only stores the value.
    this.altitudeOffset = 0;

    // Scratch (reused every frame — no per-frame allocation).
    this._headPos = new THREE.Vector3();
    this._tangent = new THREE.Vector3();
    this._worldUp = new THREE.Vector3(0, 1, 0);
    this._side = new THREE.Vector3();
    this._up = new THREE.Vector3();
    this._reconHead = new THREE.Vector3();
    this._reconTan = new THREE.Vector3();
    this.travelDir = new THREE.Vector3(0, 0, -1);

    // Multi-emission-per-frame interpolation (see update()'s own comment):
    // last frame's head position/tangent/localTime, so a frame that crosses
    // several emission slots at once (common at high Travel Speed) can
    // place each particle along the path IT actually travelled this frame,
    // not all stacked on this frame's single final sample point.
    this._prevHeadPos = new THREE.Vector3();
    this._prevTangent = new THREE.Vector3(0, 0, -1);
    this._emitInterpPos = new THREE.Vector3();
    this._emitInterpTan = new THREE.Vector3();

    // The colour the Ocean shader's local water-glint uses — a muted pale
    // gold, deliberately darker/less bright than the head (spec 27/28),
    // kept in sync with time-of-day by setTint() below.
    this.waterGlintColor = COLOR_WATER_GLINT.clone();
  }

  setTint(color) {
    this.headUniforms.uColorCore.value.copy(COLOR_HEAD_CORE).lerp(color, 0.10);
    this.headUniforms.uColorInner.value.copy(COLOR_HEAD_INNER).lerp(color, 0.10);
    this.headUniforms.uColorOuter.value.copy(COLOR_HEAD_OUTER).lerp(color, 0.12);
    this.trailUniforms.uColorTint.value.copy(color);
    this.waterGlintColor.copy(COLOR_WATER_GLINT).lerp(color, 0.3);
  }

  // ---- V1.1 colour-mode / brightness / bloom API (spec 3-20). All of these
  // are plain uniform writes — live, immediate, no geometry rebuild, no
  // per-frame CPU work added. ----
  setColorMode(mode) {
    const m = mode === 'custom' ? 1.0 : mode === 'rainbow' ? 2.0 : 0.0;
    this.headUniforms.uColorMode.value = m;
    this.trailUniforms.uColorMode.value = m;
  }

  setHeadColor(hex) { this.headUniforms.uHeadColor.value.set(hex); }
  setYoungColor(hex) { this.trailUniforms.uYoungColor.value.set(hex); }
  setMidColor(hex) { this.trailUniforms.uMidColor.value.set(hex); }
  setOldColor(hex) { this.trailUniforms.uOldColor.value.set(hex); }

  setColors(opts = {}) {
    if (opts.head != null) this.setHeadColor(opts.head);
    if (opts.young != null) this.setYoungColor(opts.young);
    if (opts.mid != null) this.setMidColor(opts.mid);
    if (opts.old != null) this.setOldColor(opts.old);
  }

  setRainbowSpeed(v) {
    this.headUniforms.uRainbowSpeed.value = v;
    this.trailUniforms.uRainbowSpeed.value = v;
  }

  setRainbowSaturation(v) {
    this.headUniforms.uRainbowSaturation.value = v;
    this.trailUniforms.uRainbowSaturation.value = v;
  }

  setBrightness(v) { this.trailUniforms.uBrightness.value = v; }
  setParticleBloom(v) { this.trailUniforms.uParticleBloom.value = v; }
  setHeadBloom(v) { this.headUniforms.uHeadBloom.value = v; }

  setEmissionRate(r) {
    this.emissionRate = Math.max(1, r);
  }

  setAltitudeOffset(value) { this.altitudeOffset = value; }

  // Smooth Horizontal Steering V1 debug control — 0 disables automatic
  // turning entirely (straight line from the traveler's start heading), 1
  // is the intended gentle-wander feel, 2 an exaggerated, more sharply
  // curving diagnostic. Scales TURNING amount (desiredTurnRate), never a
  // direct positional offset, and never forward speed (see
  // STEER_BASE_SPEED, unaffected by this value). Delegates to the path
  // itself, which owns the steering math (and its own checkpoint-cache
  // invalidation, via HeadPath.setMeanderStrength()).
  setMeanderStrength(value) { this.path.setMeanderStrength(value); }

  // Manual A/D Steering V1 — expects -1 (KeyA held), 0 (neither/both), or
  // +1 (KeyD held); set every frame from main.js's own held-key state,
  // exactly like setAltitudeOffset() is for Space. See update()'s own
  // comment and this.manualTurnInput's doc in the constructor for how this
  // combines with the automatic turnRate and why it is live-only.
  setManualTurnInput(value) { this.manualTurnInput = value; }

  setPaused(p) { this.paused = !!p; }
  restart() { this.localTime = 0; this._reconstructAt(0, this._ocean); }
  getHeadPosition(out = new THREE.Vector3()) { return out.copy(this._headPos); }

  // ---- V1.2 (Trail Lyrics): minimal read-only historical-trajectory
  // sample, added so consumers outside this module (TrailLyrics) can place
  // things ON the same curve the visible wake was drawn from, without
  // reaching into `.path` directly or touching any trail state. Pure
  // function of `t` and this module's own fixed path/ocean reference —
  // deterministic, no mutation, no per-call allocation when `out` is
  // supplied. Callers should pass a single live-read `t` (e.g.
  // this.localTime at the moment of use) rather than maintaining their own
  // separate clock and computing "t minus some elapsed time" from it —
  // this trail's own clock and a caller's clock are independent timers
  // that only happen to start together, and drift apart the moment either
  // is scrubbed via setTime().
  //
  // Applies the SAME water-height Y correction as update()/_reconstructAt()
  // (path.positionAt() alone only returns the raw control-point curve's Y,
  // e.g. ~14-20 — a different value from the actual rendered wake, which
  // always sits just above the live ocean surface, e.g. ~3-5). Without
  // this correction, positions returned here sit ~10 world units away from
  // where the visible trail particles actually are — verified via a
  // nearest-neighbor check against the live trail pool.
  //
  // Free Navigation V1 / Manual A/D Steering V1 compatibility — this now
  // looks up the NEAREST actually-emitted trail particle's own recorded
  // birth position/time (this._birthPos/_birthTime, already written by
  // _emitOneInto every frame — no new state added) instead of always
  // recomputing from HeadPath's pure automatic-only path. Manual A/D input
  // (whether from a person or Free Navigation feeding the same input) has
  // no reconstructable history (see update()'s own comment on why), so once
  // any manual turning has happened, `this.path`'s deterministic curve can
  // sit arbitrarily far from where the visible wake actually is at the same
  // historical t. this._birthPos already holds the EXACT live position each
  // particle was emitted from, so this reproduces the real recent wake
  // instead of a possibly long-diverged phantom path. After a setTime()
  // seek, _reconstructAt() has already repopulated the whole pool from the
  // pure deterministic path anyway (seeking intentionally discards manual
  // detours), so both branches agree in that case too. Falls back to the
  // deterministic path only when no pool particle is close enough (e.g.
  // queried before the first particle has been emitted).
  getHeadPositionAtTime(t, out = new THREE.Vector3()) {
    let bestSlot = -1;
    let bestDiff = Infinity;
    for (let i = 0; i < POOL_SIZE; i++) {
      const bt = this._birthTime[i];
      if (bt < 0) continue; // never emitted / long dead
      const diff = Math.abs(bt - t);
      if (diff < bestDiff) { bestDiff = diff; bestSlot = i; }
    }
    if (bestSlot >= 0 && bestDiff < 1.0) {
      out.set(this._birthPos[bestSlot * 3], this._birthPos[bestSlot * 3 + 1], this._birthPos[bestSlot * 3 + 2]);
      return out;
    }
    this.path.positionAt(t, out);
    const waterY = this._ocean ? this._ocean.heightAt(out.x, out.z, t) : 0;
    out.y = waterY + 3.0 + Math.sin(t * 0.35) * 1.5 + this.altitudeOffset;
    return out;
  }

  // Note: setTime()/restart() don't take an `ocean` param (matching the
  // debug-API convention, e.g. `setHeadParticleTime(t)`), so reconstruction
  // reuses whichever `ocean` was last passed to update() — stored there
  // every frame. This is only used for the one-time reconstruction's
  // historical heightAt() samples (see _reconstructAt).
  setTime(t) {
    this.localTime = Math.max(0, t);
    this._reconstructAt(this.localTime, this._ocean);
  }

  // ---- Writes one particle's full state into pool slot `slot`, born at
  // `birthTime` at world position `headPos` (spec 5: the EXACT authoritative
  // head position at that moment — never a second/estimated path formula). ----
  _emitOneInto(slot, birthTimeVal, headPos, tangent, rand) {
    // Tiny 3D radial jitter (spec 11) — much smaller than the head's own
    // visible halo, so there is never a visible gap between the head and
    // its newest particles.
    const jr = rand() * SPAWN_JITTER;
    const ja = rand() * Math.PI * 2;
    const je = (rand() - 0.5) * Math.PI;
    const jx = Math.cos(ja) * Math.cos(je) * jr;
    const jy = Math.sin(je) * jr;
    const jz = Math.sin(ja) * Math.cos(je) * jr;
    this._birthPos[slot * 3 + 0] = headPos.x + jx;
    this._birthPos[slot * 3 + 1] = headPos.y + jy;
    this._birthPos[slot * 3 + 2] = headPos.z + jz;

    // Gentle local velocity (spec 12): mostly a small drift opposite the
    // head's own direction of travel, plus small sideways/vertical
    // components — never an explosion, firework, or ballistic streak. The
    // trail's LENGTH comes from the head moving on, not from particle speed.
    const backSpeed = 0.12 + rand() * 0.22;
    const sideSpeed = (rand() - 0.5) * 0.5;
    const upSpeed = (rand() - 0.5) * 0.35;
    const side = this._side.crossVectors(tangent, this._worldUp);
    if (side.lengthSq() < 1e-6) side.set(1, 0, 0); else side.normalize();
    const up = this._up.crossVectors(side, tangent).normalize();
    this._velocity[slot * 3 + 0] = -tangent.x * backSpeed + side.x * sideSpeed + up.x * upSpeed;
    this._velocity[slot * 3 + 1] = -tangent.y * backSpeed + side.y * sideSpeed + up.y * upSpeed + 0.05;
    this._velocity[slot * 3 + 2] = -tangent.z * backSpeed + side.z * sideSpeed + up.z * upSpeed;

    this._birthTime[slot] = birthTimeVal;
    // Lifetime distribution (spec 9): most 2.3-3.4s, some 3.5-4.0s.
    this._lifetime[slot] = rand() < 0.8 ? 2.3 + rand() * 1.1 : 3.5 + rand() * 0.5;
    this._seedAttr[slot] = rand() * Math.PI * 2;
    // Size distribution (spec 16): 70% tiny, 25% small/medium, 5% brighter
    // highlight particles — never uniform beads.
    const sizeRoll = rand();
    this._sizeAttr[slot] = sizeRoll < 0.70 ? 0.35 + rand() * 0.22 : sizeRoll < 0.95 ? 0.62 + rand() * 0.32 : 1.05 + rand() * 0.45;
    this._toneBias[slot] = rand() < 0.15 ? 1.0 : 0.0;
  }

  // ---- Live incremental update: advances the clock, positions the head,
  // and emits only the NEW particles due since last frame via a
  // floor()/remainder accumulator (spec 8) — never frame-count-dependent. ----
  update(dt, sceneTime, ocean, cameraPos) {
    this._ocean = ocean; // cached so setTime()/restart() can reconstruct historical heights
    // Snapshot BEFORE this frame overwrites _headPos/_tangent — the
    // emission loop below interpolates between this and the fresh values
    // computed further down, for any frame that crosses more than one
    // emission slot at once.
    this._prevHeadPos.copy(this._headPos);
    this._prevTangent.copy(this._tangent);
    const prevT = this.localTime;
    const prevDistance = this.distanceTraveled;
    if (!this.paused) this.localTime += dt * this.speed;
    const t = this.localTime;
    this.phase = t < 2 ? 'approach' : 'flight';

    // Live horizontal steering (Manual A/D Steering V1) — advances the
    // ACTUAL rendered head position/heading using the real frame `dt`,
    // never HeadPath's own fixed STEER_DT and never HeadPath._simulate()
    // itself. This is deliberately NOT "read the deterministic automatic
    // path at time t": manual A/D input has no reconstructable history, so
    // it can only ever be integrated live, frame by frame — exactly the
    // "current + smooth change = next" shape as the Space-key altitude
    // control, just for X/Z instead of Y. `this._liveTurnRate` mirrors the
    // SAME desiredTurnRate()-chasing automatic behaviour HeadPath._simulate()
    // uses for reconstruction (so absent any A/D input the two stay in
    // close visual agreement — both are the same continuous system, just
    // discretised at a different step size: real frame dt here, fixed
    // STEER_DT there), then the live, instant manual contribution is added
    // on top before integrating heading — a step change in turnRate only
    // changes the SLOPE of heading, never heading itself, so A/D produces
    // smooth broad turns with no snap, no extra damping required (spec 3).
    if (!this.paused) {
      // Scaled by this.speed, not raw dt: localTime (t) above already
      // advances at dt*speed, and HeadPath's own deterministic
      // reconstruction (positionAt(T)/_simulate(), used by setTime()/
      // _reconstructAt() for seeks and TrailLyrics sampling) treats every
      // unit of localTime as covering a FIXED span of STEER_BASE_SPEED
      // distance — so live playback has to advance position by the same
      // dt*speed to keep pace with (and stay consistent with) that
      // reconstruction. Previously this used raw dt, so Travel Speed only
      // ever sped up/slowed down the tail's own timing (particle emission
      // schedule, shader uTime) while the traveler's actual on-screen
      // speed never changed at all.
      const scaledDt = dt * this.speed;
      // Distance actually covered this frame — independent of heading,
      // since travel is uniform-speed motion in a (possibly turning)
      // direction. Tracked so Emission Rate can be indexed by distance
      // instead of localTime (see the emission loop below): otherwise the
      // trail's particle SPACING scales with Travel Speed too (localTime
      // itself already runs at dt*speed), so a slow Travel Speed made the
      // trail look sparse regardless of how high Emission Rate was set.
      this.distanceTraveled += STEER_BASE_SPEED * scaledDt;
      const desired = desiredTurnRate(t, this.path.meanderStrength);
      const k = 1 - Math.exp(-STEER_TURN_SMOOTHING * scaledDt);
      this._liveTurnRate += (desired - this._liveTurnRate) * k;
      const manualRate = this.manualTurnInput * MANUAL_TURN_SPEED;
      this._liveHeading += (this._liveTurnRate + manualRate) * scaledDt;
      this._liveX += Math.cos(this._liveHeading) * STEER_BASE_SPEED * scaledDt;
      this._liveZ += Math.sin(this._liveHeading) * STEER_BASE_SPEED * scaledDt;
    }
    this._headPos.set(this._liveX, 0, this._liveZ);
    this._tangent.set(Math.cos(this._liveHeading), 0, Math.sin(this._liveHeading));
    this.travelDir.copy(this._tangent);

    // ONE ocean sample per frame (spec 39) — the head's own hover height;
    // newly-emitted particles simply inherit this already-correct head
    // position, so no per-particle ocean sampling ever happens.
    const waterY = ocean ? ocean.heightAt(this._headPos.x, this._headPos.z, t) : 0;
    this._headPos.y = waterY + 3.0 + Math.sin(t * 0.35) * 1.5 + this.altitudeOffset;

    this.headMesh.geometry.attributes.position.array[0] = this._headPos.x;
    this.headMesh.geometry.attributes.position.array[1] = this._headPos.y;
    this.headMesh.geometry.attributes.position.array[2] = this._headPos.z;
    this.headMesh.geometry.attributes.position.needsUpdate = true;
    this.headUniforms.uTime.value = t;

    if (!this.paused) {
      // Distance-based emission schedule: emission index N is born once
      // distanceTraveled reaches N/particlesPerDistance, so trail particle
      // SPACING is a fixed number of world units regardless of Travel
      // Speed — a previous time-based version (particle N at t=N/rate)
      // coupled spacing to Travel Speed too (localTime already runs at
      // dt*speed), so slowing down made the trail look sparse no matter
      // how high Emission Rate was set, and speeding up made it denser.
      // particlesPerDistance divides by STEER_BASE_SPEED so Emission
      // Rate's numeric meaning/range is unchanged at the nominal Travel
      // Speed of 1 (distanceTraveled ≈ STEER_BASE_SPEED*t there, matching
      // the old floor(t*emissionRate) exactly).
      const particlesPerDistance = this.emissionRate / STEER_BASE_SPEED;
      const targetCount = Math.floor(this.distanceTraveled * particlesPerDistance);
      // At normal Travel Speed a frame crosses at most one emission slot,
      // so this is exactly spec 5's "the same Vector3 already computed for
      // the visible head this frame". At higher Travel Speed a single
      // frame can cross several slots — emitting every one of them at
      // this frame's single final head position used to stack them on top
      // of each other, leaving a visible gap back to the previous frame's
      // particles instead of a continuous trail. Each slot's fractional
      // position between last frame's and this frame's distance (and thus
      // head/tangent, since both advance together within one frame — see
      // distanceTraveled's own comment above) fixes that without changing
      // the emission schedule, particle count, or the normal (one-per-
      // frame) case; the same fraction gives that slot's localTime too
      // (birthTimeVal, needed for the shader's own age = uTime-aBirthTime),
      // by linear interpolation between this frame's prevT and t.
      const frameDistanceSpan = this.distanceTraveled - prevDistance;
      let emitted = false;
      while (this._emitCount < targetCount) {
        const idx = this._emitCount;
        const distanceThreshold = idx / particlesPerDistance;
        const rand = emissionRand(this._seedBase, idx);
        const slot = this._writeCursor;
        const alpha = frameDistanceSpan > 1e-9 ? Math.min(1, Math.max(0, (distanceThreshold - prevDistance) / frameDistanceSpan)) : 1;
        const birthTimeVal = prevT + alpha * (t - prevT);
        this._emitInterpPos.lerpVectors(this._prevHeadPos, this._headPos, alpha);
        this._emitInterpTan.lerpVectors(this._prevTangent, this._tangent, alpha);
        if (this._emitInterpTan.lengthSq() < 1e-8) this._emitInterpTan.copy(this._tangent);
        else this._emitInterpTan.normalize();
        this._emitOneInto(slot, birthTimeVal, this._emitInterpPos, this._emitInterpTan, rand);
        this._writeCursor = (this._writeCursor + 1) % POOL_SIZE;
        this._emitCount++;
        emitted = true;
      }
      if (emitted) {
        const g = this.trailPoints.geometry;
        g.attributes.position.needsUpdate = true;
        g.attributes.aVelocity.needsUpdate = true;
        g.attributes.aBirthTime.needsUpdate = true;
        g.attributes.aLifetime.needsUpdate = true;
        g.attributes.aSeed.needsUpdate = true;
        g.attributes.aSize.needsUpdate = true;
        g.attributes.aToneBias.needsUpdate = true;
      }
    }
    this.trailUniforms.uTime.value = t;
  }

  // ---- Deterministic reconstruction (spec 23): clears the pool and
  // re-simulates emission from max(0, T-maxLifetime) through T, keeping
  // only particles still alive at T. Uses the exact analytic emission
  // schedule (index i born at i/emissionRate) rather than a stepped
  // accumulator loop — mathematically equivalent to, and more precise than,
  // stepping at a fixed 1/60s interval, since it reproduces every individual
  // emission event exactly rather than approximating counts within a
  // coarser step. Only called on an explicit setTime()/restart() jump, never
  // every frame, so its cost (bounded by ~maxLifetime*emissionRate calls,
  // each with one ocean.heightAt() sample for that particle's own birth
  // moment) is a one-time scrub cost, not a steady-state one. ----
  _reconstructAt(T, ocean) {
    const rate = this.emissionRate;
    const t0 = Math.max(0, T - MAX_LIFETIME);
    const firstIndex = Math.ceil(t0 * rate);
    const lastIndex = Math.floor(T * rate);

    // Reset the whole pool to "already dead" before rebuilding.
    this._birthTime.fill(-1000);
    this._writeCursor = 0;

    let writeIndex = 0;
    for (let i = firstIndex; i <= lastIndex; i++) {
      const birthTimeVal = i / rate;
      if (birthTimeVal > T) break;
      const rand = emissionRand(this._seedBase, i);
      this.path.positionAt(birthTimeVal, this._reconHead);
      this.path.tangentAt(birthTimeVal, this._reconTan);
      const waterY = ocean ? ocean.heightAt(this._reconHead.x, this._reconHead.z, birthTimeVal) : 0;
      this._reconHead.y = waterY + 3.0 + Math.sin(birthTimeVal * 0.35) * 1.5 + this.altitudeOffset;
      const slot = writeIndex % POOL_SIZE;
      this._emitOneInto(slot, birthTimeVal, this._reconHead, this._reconTan, rand);
      writeIndex++;
    }
    this._emitCount = lastIndex + 1;
    this._writeCursor = writeIndex % POOL_SIZE;
    // Keep distanceTraveled (the live update()'s own emission-schedule
    // accumulator, see its own comment) consistent with the reconstructed
    // emitCount above: this reconstruction is itself nominal-speed
    // (HeadPath's own fixed pacing, independent of this.speed), so T maps
    // to distance via the same STEER_BASE_SPEED live playback assumes.
    this.distanceTraveled = T * STEER_BASE_SPEED;

    // Recompute the visible head at T itself, from the deterministic
    // automatic path.
    this.path.positionAt(T, this._headPos);
    this.path.tangentAt(T, this._tangent);
    this.travelDir.copy(this._tangent);
    const waterYHead = ocean ? ocean.heightAt(this._headPos.x, this._headPos.z, T) : 0;
    this._headPos.y = waterYHead + 3.0 + Math.sin(T * 0.35) * 1.5 + this.altitudeOffset;

    // Re-seed the LIVE steering state (see update()'s own comment) from
    // that same deterministic automatic reconstruction — any prior manual
    // A/D detour is intentionally discarded on a seek (spec 7: manual
    // steering has no history to reconstruct from song time alone), so
    // playback resumes exactly on the automatic path from here, until/
    // unless A/D is used again.
    const liveSeed = this.path._simulate(T);
    this._liveX = liveSeed.x;
    this._liveZ = liveSeed.z;
    this._liveHeading = liveSeed.heading;
    this._liveTurnRate = liveSeed.turnRate;
    this.headMesh.geometry.attributes.position.array[0] = this._headPos.x;
    this.headMesh.geometry.attributes.position.array[1] = this._headPos.y;
    this.headMesh.geometry.attributes.position.array[2] = this._headPos.z;
    this.headMesh.geometry.attributes.position.needsUpdate = true;
    this.headUniforms.uTime.value = T;
    this.trailUniforms.uTime.value = T;
    // Sync the multi-emission-per-frame interpolation snapshot (see
    // update()) to this freshly-reconstructed position/tangent — otherwise
    // the very next live update() frame would interpolate from wherever
    // the head was BEFORE this seek, producing one wrong-looking particle.
    this._prevHeadPos.copy(this._headPos);
    this._prevTangent.copy(this._tangent);

    const g = this.trailPoints.geometry;
    g.attributes.position.needsUpdate = true;
    g.attributes.aVelocity.needsUpdate = true;
    g.attributes.aBirthTime.needsUpdate = true;
    g.attributes.aLifetime.needsUpdate = true;
    g.attributes.aSeed.needsUpdate = true;
    g.attributes.aSize.needsUpdate = true;
    g.attributes.aToneBias.needsUpdate = true;
  }
}
