import * as THREE from 'three';

// Reading-Order Layout + Lightweight Particle Dissolve V2 — one SHARED,
// budget-capped THREE.Points system used by every TrailLyrics phrase's
// endTime departure, instead of each phrase paying for its own dissolve
// particle pool. One BufferGeometry, one ShaderMaterial, ONE draw call
// covers every currently-dissolving phrase combined. Deliberately separate
// from TrailLyrics' own per-phrase ~650-particle ASSEMBLE pool (untouched)
// and from HeadParticleTrail (never referenced here) — see the module doc
// on TrailLyricsManager for why a lyric-specific pool exists at all.
//
// Determinism (ticket spec 17): every particle's position/alpha/size at
// time `t` is a pure, CLOSED-FORM function of (origin, seeded jitter,
// seeded velocity, seeded lifeOffset, t - dissolveStart) — never obtained
// by integrating a velocity frame-by-frame. Calling update(t) after a raw
// seek reproduces exactly the same particle field a continuous playthrough
// would show at that instant; no accumulated frame history is ever read.

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

// Ticket-specified budgets: ~32-64 glint particles per phrase (start ~48),
// ~4-8 mist particles per phrase, ~192-256 total shared across every
// simultaneously-dissolving phrase.
const DEFAULT_MAX_PARTICLES = 224;
const DEFAULT_GLINT_PER_PHRASE = 48;
const DEFAULT_MIST_PER_PHRASE = 6;

// Same warm-gold identity as TrailLyrics/HeadParticleTrail's palette.
const COLOR_DISSOLVE = new THREE.Color(0xffe0a3);

export class LyricDissolveParticles {
  constructor(scene, opts = {}) {
    this.scene = scene;
    this.maxParticles = opts.maxParticles || DEFAULT_MAX_PARTICLES;
    this.glintPerPhrase = opts.glintPerPhrase || DEFAULT_GLINT_PER_PHRASE;
    this.mistPerPhrase = opts.mistPerPhrase || DEFAULT_MIST_PER_PHRASE;

    // Fixed-size buffers allocated ONCE — no per-dissolve geometry,
    // material, or texture is ever created (mobile-perf requirement).
    const geo = new THREE.BufferGeometry();
    const position = new Float32Array(this.maxParticles * 3);
    const aAlpha = new Float32Array(this.maxParticles);
    const aSize = new Float32Array(this.maxParticles);
    const aSeed = new Float32Array(this.maxParticles);
    geo.setAttribute('position', new THREE.BufferAttribute(position, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(aAlpha, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 1).setUsage(THREE.DynamicDrawUsage));
    this._geo = geo;
    this._posAttr = geo.attributes.position;
    this._alphaAttr = geo.attributes.aAlpha;
    this._sizeAttr = geo.attributes.aSize;
    this._seedAttr = geo.attributes.aSeed;

    // Trivial shader: JS already computed the final position/alpha/size
    // analytically each frame (see update()) — the GPU side just needs to
    // draw a soft additive point sprite, no per-vertex animation logic.
    this._uniforms = { uColor: { value: COLOR_DISSOLVE.clone() }, uPixelSize: { value: 90.0 } };
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      toneMapped: false,
      blending: THREE.AdditiveBlending,
      uniforms: this._uniforms,
      vertexShader: /* glsl */ `
        precision highp float;
        attribute float aAlpha, aSize, aSeed;
        uniform float uPixelSize;
        varying float vAlpha, vSeed;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uPixelSize * aSize / max(-mv.z, 1.0);
          vAlpha = aAlpha;
          vSeed = aSeed;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColor;
        varying float vAlpha, vSeed;
        void main(){
          if (vAlpha <= 0.001) discard;
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d) * 2.0;
          if (r > 1.0) discard;
          float core = smoothstep(0.5, 0.0, r);
          float halo = smoothstep(1.0, 0.2, r);
          float twinkle = 0.85 + 0.15 * sin(vSeed * 41.0);
          float shapeAlpha = clamp(core * 0.8 + halo * 0.6, 0.0, 1.0) * vAlpha * twinkle;
          gl_FragColor = vec4(uColor * (0.4 + core), shapeAlpha);
        }
      `,
    });
    this._points = new THREE.Points(geo, material);
    this._points.frustumCulled = false;
    scene.add(this._points);

    this._slotOwner = new Array(this.maxParticles).fill(null);
    this._freeSlots = [];
    for (let i = this.maxParticles - 1; i >= 0; i--) this._freeSlots.push(i);

    // phraseId -> per-particle seeded state (see beginDissolve()).
    this._phrases = new Map();

    // Scratch (reused every frame — no per-frame allocation).
    this._tmp = new THREE.Vector3();
  }

  activeCount() { return this._phrases.size; }
  particlesInUse() { return this.maxParticles - this._freeSlots.length; }

  // Called once, right when a phrase's LEAVE phase begins.
  //   origins: array of THREE.Vector3, WORLD space (see
  //     TrailLyrics.sampleDissolveOrigins) — one per requested glint/mist
  //     particle; only origins.length particles can ever be allocated.
  //   dissolveStart: absolute LyricTimeline-clock seconds this phrase's
  //     endTime/holdEnd occurred at (== when LEAVE began).
  //   totalDuration: seconds the visual dissolve should take (this
  //     phrase's leaveDuration + dissolveDuration — unchanged from the
  //     existing plain-fade timing, per spec 15).
  //   seed: uint32, stable per phrase id (same family as every other
  //     seeded PRNG in this codebase) — NOT Math.random, ever.
  //   backwardDir / upDir: THREE.Vector3, world space, already normalized —
  //     the "away from the traveler's direction of travel" and "up" drift
  //     axes, read ONCE at dissolve start (frozen, like the phrase's own
  //     left-behind pose already is by this point).
  beginDissolve(phraseId, { origins, dissolveStart, totalDuration, seed, backwardDir, upDir }) {
    if (this._phrases.has(phraseId)) return; // never re-register the same phrase twice

    let glintCount = this.glintPerPhrase;
    let mistCount = this.mistPerPhrase;
    const wanted = glintCount + mistCount;
    if (this._freeSlots.length < wanted) {
      // Budget pressure (spec 12: "share/reduce the budget rather than
      // multiplying without limit") — scale this phrase's own share down
      // to whatever is actually free, keeping a sensible glint:mist mix,
      // rather than refusing the effect outright or exceeding the budget.
      const scale = this._freeSlots.length / wanted;
      glintCount = Math.max(0, Math.floor(glintCount * scale));
      mistCount = Math.max(0, Math.floor(mistCount * scale));
    }
    const total = Math.min(glintCount + mistCount, this._freeSlots.length, origins.length);
    if (total <= 0) return; // budget fully exhausted right now — simply no particles this time, never an error

    const rand = mulberry32(seed);
    const glintTotal = Math.min(glintCount, total);
    const slots = new Int32Array(total);
    const kind = new Uint8Array(total); // 0 = glint, 1 = mist
    const origin = new Float32Array(total * 3);
    const jitter = new Float32Array(total * 3);
    const velocity = new Float32Array(total * 3);
    const lifeOffset = new Float32Array(total);
    const sizeBase = new Float32Array(total);

    for (let i = 0; i < total; i++) {
      const slot = this._freeSlots.pop();
      slots[i] = slot;
      this._slotOwner[slot] = phraseId;

      const isMist = i >= glintTotal;
      kind[i] = isMist ? 1 : 0;

      const o = origins[i];
      origin[i * 3 + 0] = o.x;
      origin[i * 3 + 1] = o.y;
      origin[i * 3 + 2] = o.z;

      // Small seeded jitter around the origin (dust suspended near the
      // glyph, not a wide cloud) plus a per-particle staggered "detach"
      // moment across the first ~35% of the dissolve — letters lose
      // cohesion progressively rather than every particle leaving at once.
      const jScale = isMist ? 1.4 : 0.6;
      jitter[i * 3 + 0] = (rand() - 0.5) * jScale;
      jitter[i * 3 + 1] = (rand() - 0.5) * jScale * 0.6;
      jitter[i * 3 + 2] = (rand() - 0.5) * jScale;
      lifeOffset[i] = rand() * 0.35 * totalDuration;

      // Velocity: gentle upward + backward-relative-to-travel drift with a
      // small lateral seeded component — dust/mist carried by the wake,
      // never an explosion/burst (spec 11).
      const lateralSeed = rand() * Math.PI * 2;
      const upSpeed = (isMist ? 0.35 : 0.7) + rand() * 0.4;
      const backSpeed = (isMist ? 0.25 : 0.55) + rand() * 0.35;
      const lateralSpeed = (isMist ? 0.5 : 0.3) + rand() * 0.3;
      velocity[i * 3 + 0] = upDir.x * upSpeed + backwardDir.x * backSpeed + Math.cos(lateralSeed) * lateralSpeed;
      velocity[i * 3 + 1] = upDir.y * upSpeed + backwardDir.y * backSpeed;
      velocity[i * 3 + 2] = upDir.z * upSpeed + backwardDir.z * backSpeed + Math.sin(lateralSeed) * lateralSpeed;

      sizeBase[i] = isMist ? 2.6 + rand() * 1.2 : 0.55 + rand() * 0.35;
      this._seedAttr.array[slot] = rand();
    }
    this._seedAttr.needsUpdate = true;

    this._phrases.set(phraseId, {
      slots, kind, origin, jitter, velocity, lifeOffset, sizeBase,
      dissolveStart, totalDuration: Math.max(0.1, totalDuration),
    });
  }

  // Per-frame recompute for every currently-registered dissolve, from
  // `currentTime` (the SAME absolute LyricTimeline clock `dissolveStart`
  // was recorded in) — a pure function of elapsed time, never of dt or
  // accumulated state, so seeking is exact (see class doc).
  update(currentTime) {
    if (this._phrases.size === 0) return;
    const pos = this._posAttr.array;
    const alpha = this._alphaAttr.array;
    const size = this._sizeAttr.array;
    let dirty = false;

    for (const [phraseId, p] of this._phrases) {
      const elapsed = currentTime - p.dissolveStart;
      if (elapsed >= p.totalDuration) {
        this._releaseEntry(phraseId, p);
        dirty = true;
        continue;
      }
      dirty = true;
      const n = p.slots.length;
      for (let i = 0; i < n; i++) {
        const slot = p.slots[i];
        const local = Math.max(0, elapsed < 0 ? 0 : elapsed - p.lifeOffset[i]);
        const span = Math.max(0.05, p.totalDuration - p.lifeOffset[i]);
        const nt = Math.min(1, local / span); // 0..1 normalized progress for THIS particle

        // Position: origin + small eased jitter reveal + linear drift —
        // closed-form in `local`, never integrated.
        const jitterAmt = smoothstep(0, 0.3, nt);
        pos[slot * 3 + 0] = p.origin[i * 3 + 0] + p.jitter[i * 3 + 0] * jitterAmt + p.velocity[i * 3 + 0] * local;
        pos[slot * 3 + 1] = p.origin[i * 3 + 1] + p.jitter[i * 3 + 1] * jitterAmt + p.velocity[i * 3 + 1] * local;
        pos[slot * 3 + 2] = p.origin[i * 3 + 2] + p.jitter[i * 3 + 2] * jitterAmt + p.velocity[i * 3 + 2] * local;

        if (p.kind[i] === 1) {
          // Mist: fades in slower, holds a low peak, fades out gradually,
          // and slowly grows — "a few large low-alpha soft particles that
          // expand slowly and fade" (spec 14).
          const fadeIn = smoothstep(0, 0.3, nt);
          const fadeOut = 1 - smoothstep(0.45, 1.0, nt);
          alpha[slot] = fadeIn * fadeOut * 0.32;
          size[slot] = p.sizeBase[i] * (1 + nt * 1.6);
        } else {
          // Glint: quick detach, brighter, fades out across the back half
          // — "tiny luminous particles appear from the glyph area".
          const fadeIn = smoothstep(0, 0.12, nt);
          const fadeOut = 1 - smoothstep(0.55, 1.0, nt);
          alpha[slot] = fadeIn * fadeOut;
          size[slot] = p.sizeBase[i] * (1 + nt * 0.5);
        }
      }
    }

    if (dirty) {
      this._posAttr.needsUpdate = true;
      this._alphaAttr.needsUpdate = true;
      this._sizeAttr.needsUpdate = true;
      // The position buffer starts all-zero at construction and Three.js
      // never recomputes a geometry's bounding sphere on its own just
      // because an attribute's `needsUpdate` flag was set — left stale, it
      // stays degenerate (radius 0 at the origin) forever. frustumCulled
      // is false on this object specifically so a stale bounding sphere
      // can't cause it to vanish via culling, but leaving it degenerate is
      // still wrong (raycasting and any future frustum-culling use would
      // silently misbehave), so it's kept correct here regardless.
      this._geo.computeBoundingSphere();
    }
  }

  _releaseEntry(phraseId, p) {
    for (let i = 0; i < p.slots.length; i++) {
      const slot = p.slots[i];
      this._alphaAttr.array[slot] = 0;
      this._sizeAttr.array[slot] = 0;
      this._slotOwner[slot] = null;
      this._freeSlots.push(slot);
    }
    this._phrases.delete(phraseId);
  }

  // Immediate release — used defensively by TrailLyricsManager on
  // despawn()/clear() so a phrase can never leak particle slots even if
  // it's torn down before its dissolve would naturally finish (e.g. the
  // manager's active-phrase eviction cap). Idempotent.
  releasePhrase(phraseId) {
    const p = this._phrases.get(phraseId);
    if (!p) return;
    this._releaseEntry(phraseId, p);
    this._alphaAttr.needsUpdate = true;
    this._sizeAttr.needsUpdate = true;
  }

  // Releases every currently-registered dissolve at once — used by
  // TrailLyricsManager.clear() (LyricTimeline.restart() / teardown) so no
  // particles from before a restart linger into the fresh run.
  clear() {
    for (const id of [...this._phrases.keys()]) this.releasePhrase(id);
  }

  dispose() {
    if (this._disposed) return;
    this._disposed = true;
    this.scene.remove(this._points);
    this._geo.dispose();
    this._points.material.dispose();
    this._phrases.clear();
  }
}
