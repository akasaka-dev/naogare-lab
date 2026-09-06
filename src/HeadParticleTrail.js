import * as THREE from 'three';

// Head Particle Trail V1 — replaces the Light Ribbon's mesh-based tail with
// a fundamentally different architecture: THE HEAD IS THE EMITTER. Particles
// are born at the head's exact current world position, then become fully
// independent — each owns its own world-space position from that moment on
// and is NEVER recomputed from where the head currently is. The tail is not
// built, drawn, or connected to the head in any way; it is simply the
// accumulation of particles that were born a few seconds ago and haven't
// faded out yet. This directly answers the Light Ribbon's rejected flaw (a
// ribbon mesh that could visibly detach/misalign from the head) by removing
// the very idea of head-to-tail geometry: there is no geometry to misalign.
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
//  Head path — a seconds-parameterised Catmull-Rom spline with linear
//  extrapolation past the last control point (the traveler never stops) plus
//  a broad, low-frequency flow-curvature term baked directly into the path
//  itself, so the head's own motion already flows/curves gently and every
//  consumer (head, particles) reads from the exact same curved line. Owned
//  entirely by this module — no shared import — matching the project-wide
//  convention that every cinematic module owns its own path.
// ---------------------------------------------------------------------------
class HeadPath {
  constructor(points, times) {
    this.curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);
    this.times = times;
    this.total = times[times.length - 1];
    this._n = points.length;
  }

  _u(t) {
    const times = this.times;
    const n = this._n;
    if (t <= times[0]) return 0;
    if (t >= this.total) return 1;
    for (let i = 0; i < n - 1; i++) {
      if (t >= times[i] && t <= times[i + 1]) {
        const localT = (t - times[i]) / (times[i + 1] - times[i]);
        return (i + localT) / (n - 1);
      }
    }
    return 1;
  }

  positionAt(t, out = new THREE.Vector3()) {
    if (t <= this.total) {
      this.curve.getPoint(this._u(t), out);
    } else {
      const pEnd = this.curve.getPoint(1);
      const pNear = this.curve.getPoint(this._u(this.total - 0.5));
      out.copy(pEnd).addScaledVector(pEnd.clone().sub(pNear).divideScalar(0.5), t - this.total);
    }
    // Broad, low-frequency lateral drift baked into the path itself (same
    // technique as Light Ribbon V1.3) so the head's own motion already
    // flows/curves gently — the trail then records that curvature for free.
    out.x += Math.sin(t * 0.5 + 0.6) * 6.0 + Math.sin(t * 0.19 + 2.3) * 4.0;
    return out;
  }

  tangentAt(t, out = new THREE.Vector3()) {
    const a = this.positionAt(Math.max(t - 0.05, 0), this._tmpA || (this._tmpA = new THREE.Vector3()));
    const b = this.positionAt(t + 0.05, this._tmpB || (this._tmpB = new THREE.Vector3()));
    out.copy(b).sub(a);
    if (out.lengthSq() < 1e-8) out.set(0, 0, -1);
    return out.normalize();
  }
}

// ---------------------------------------------------------------------------
//  Tunables
// ---------------------------------------------------------------------------
const POOL_SIZE = 600; // preallocated particle pool (spec 7: 400-900, start 600)
const MAX_LIFETIME = 4.0; // hard upper bound across the lifetime distribution (spec 9)
const SPAWN_JITTER = 0.22; // world units — much smaller than the head's visible halo (spec 11)

// Warm gold/ivory palette (lessons from Light Ribbon V1.3: keep the base
// colours meaningfully saturated and the environment-tint lerp weight low,
// or ACES tonemapping + additive bloom will wash everything back to white).
const COLOR_HEAD_CORE = new THREE.Color(0xfffaf5); // near-white
const COLOR_HEAD_INNER = new THREE.Color(0xffe0a3); // white-gold
const COLOR_HEAD_OUTER = new THREE.Color(0xffcf85); // pale amber-gold
const COLOR_WATER_GLINT = new THREE.Color(0xe9c98a); // muted pale gold, darker than the head

export class HeadParticleTrail {
  constructor(scene, opts = {}) {
    const { seed = 4242 } = opts;
    this._seedBase = seed >>> 0;
    this.speed = 1.0;
    this.paused = false;
    this.localTime = 0;
    this.emissionRate = 150; // particles/second (spec 8: 120-180 suggested)
    this.phase = 'flight';

    // ---- Head path: identical control points/timing to Light Ribbon's, so
    // the two experiments move through the same world for a fair comparison
    // (spec 22). ----
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

    // ---- Head sprite: reused appearance from Light Ribbon V1.3 (spec 4) —
    // three spatially EXCLUSIVE colour bands (never summed at the same
    // pixel) so the near-white core never dilutes the visibly gold halo,
    // and vice versa. This is an independent copy, not a shared class, per
    // the project's convention of zero cross-module runtime dependencies. ----
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
      uHeadBloom: { value: 1.0 },
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
          // Exclusive bands (Light Ribbon V1.3 fix): a ring never also
          // carries the core's contribution, so the halo survives ACES
          // tonemapping instead of being summed into near-white.
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
      uBrightness: { value: 1.0 },
      uParticleBloom: { value: 1.0 },
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

    // Scratch (reused every frame — no per-frame allocation).
    this._headPos = new THREE.Vector3();
    this._tangent = new THREE.Vector3();
    this._worldUp = new THREE.Vector3(0, 1, 0);
    this._side = new THREE.Vector3();
    this._up = new THREE.Vector3();
    this._reconHead = new THREE.Vector3();
    this._reconTan = new THREE.Vector3();
    this.travelDir = new THREE.Vector3(0, 0, -1);

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
  // nearest-neighbor check against the live trail pool. ----
  getHeadPositionAtTime(t, out = new THREE.Vector3()) {
    this.path.positionAt(t, out);
    const waterY = this._ocean ? this._ocean.heightAt(out.x, out.z, t) : 0;
    out.y = waterY + 3.0 + Math.sin(t * 0.35) * 1.5;
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
    if (!this.paused) this.localTime += dt * this.speed;
    const t = this.localTime;
    this.phase = t < 2 ? 'approach' : 'flight';

    this.path.positionAt(t, this._headPos);
    this.path.tangentAt(t, this._tangent);
    this.travelDir.copy(this._tangent);

    // ONE ocean sample per frame (spec 39) — the head's own hover height;
    // newly-emitted particles simply inherit this already-correct head
    // position, so no per-particle ocean sampling ever happens.
    const waterY = ocean ? ocean.heightAt(this._headPos.x, this._headPos.z, t) : 0;
    this._headPos.y = waterY + 3.0 + Math.sin(t * 0.35) * 1.5;

    this.headMesh.geometry.attributes.position.array[0] = this._headPos.x;
    this.headMesh.geometry.attributes.position.array[1] = this._headPos.y;
    this.headMesh.geometry.attributes.position.array[2] = this._headPos.z;
    this.headMesh.geometry.attributes.position.needsUpdate = true;
    this.headUniforms.uTime.value = t;

    if (!this.paused) {
      // Exact analytic emission schedule (spec 8/24): emission index N is
      // always born at N/emissionRate, so "how many particles have been
      // emitted by time t" is simply floor(t*emissionRate) — equivalent to
      // an accumulator integrated over any step size, but without any
      // per-frame floating-point drift.
      const targetCount = Math.floor(t * this.emissionRate);
      let emitted = false;
      while (this._emitCount < targetCount) {
        const idx = this._emitCount;
        const birthTimeVal = idx / this.emissionRate;
        const rand = emissionRand(this._seedBase, idx);
        const slot = this._writeCursor;
        // Spec 5: emission position is the SAME Vector3 already computed
        // for the visible head this frame — never a second path formula.
        this._emitOneInto(slot, birthTimeVal, this._headPos, this._tangent, rand);
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
      this._reconHead.y = waterY + 3.0 + Math.sin(birthTimeVal * 0.35) * 1.5;
      const slot = writeIndex % POOL_SIZE;
      this._emitOneInto(slot, birthTimeVal, this._reconHead, this._reconTan, rand);
      writeIndex++;
    }
    this._emitCount = lastIndex + 1;
    this._writeCursor = writeIndex % POOL_SIZE;

    // Recompute the visible head at T itself.
    this.path.positionAt(T, this._headPos);
    this.path.tangentAt(T, this._tangent);
    this.travelDir.copy(this._tangent);
    const waterYHead = ocean ? ocean.heightAt(this._headPos.x, this._headPos.z, T) : 0;
    this._headPos.y = waterYHead + 3.0 + Math.sin(T * 0.35) * 1.5;
    this.headMesh.geometry.attributes.position.array[0] = this._headPos.x;
    this.headMesh.geometry.attributes.position.array[1] = this._headPos.y;
    this.headMesh.geometry.attributes.position.array[2] = this._headPos.z;
    this.headMesh.geometry.attributes.position.needsUpdate = true;
    this.headUniforms.uTime.value = T;
    this.trailUniforms.uTime.value = T;

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
