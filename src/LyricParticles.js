import * as THREE from 'three';

// Lyric Particles V1 — a loose flock of small luminous wandering lights that
// travels over open water, gathers, and momentarily becomes a phrase of text
// before drifting apart again. Everything here is additive and self-contained:
// this file never touches Ocean/Sky/Post shaders, only reads the ocean's
// existing heightAt() API for wave-riding, and adds a single THREE.Points
// object to the scene it's given. No Math.random() at runtime — every
// per-particle variation is derived once, at construction, from a seeded PRNG
// (mulberry32), and the whole cycle is a pure, wrap-safe function of one
// deterministic clock (this.localTime).

// ---------------------------------------------------------------------------
//  Small deterministic helpers (project-wide convention)
// ---------------------------------------------------------------------------
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

// A 0 -> 1 -> 0 plateau: rises smoothly over [riseStart,riseEnd], stays at 1
// until fallStart, falls smoothly over [fallStart,fallEnd]. Used for every
// phase envelope below (approach/settle, assemble/hold/dissolve) so each is
// built from the same continuous, flat-derivative-at-the-ends primitive —
// which is exactly what makes the whole cycle loop with no visible seam.
function trapezoid(x, riseStart, riseEnd, fallStart, fallEnd) {
  return Math.min(smoothstep(riseStart, riseEnd, x), 1 - smoothstep(fallStart, fallEnd, x));
}

// ---------------------------------------------------------------------------
//  Text -> target positions. An offscreen canvas rasterises the phrase, then
//  visible pixels are decimated (in scanline order, via a fractional
//  accumulator) down to roughly `targetCount` samples — this keeps letter
//  shape and roughly-even density without simply filling every pixel, and
//  without needing any external image or font asset.
// ---------------------------------------------------------------------------
function sampleTextTargets(text, { fontWeight = 700, fontFamily = 'Georgia, "Times New Roman", serif', targetCount = 900, worldWidth = 30, depthJitter = 0.6, seed = 99 } = {}) {
  // Kept deliberately small relative to targetCount: at a large font size the
  // lit-pixel area vastly outnumbers the particle budget, so decimating down
  // to ~900 samples leaves gaps far wider than a stroke — the phrase reads as
  // scattered noise instead of letters. A smaller raster means fewer total
  // candidate pixels, so the same particle budget samples each stroke far
  // more densely (this is a sampling-resolution choice, not a display size —
  // worldWidth below controls the on-screen size independently).
  const fontSize = 120;
  const probe = document.createElement('canvas').getContext('2d');
  probe.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const metrics = probe.measureText(text);

  const padding = fontSize * 0.18;
  const width = Math.ceil(metrics.width + padding * 2);
  const height = Math.ceil(fontSize * 1.3);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  const img = ctx.getImageData(0, 0, width, height).data;
  const candidates = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (img[(y * width + x) * 4 + 3] > 80) candidates.push(x, y);
    }
  }

  const totalCandidates = candidates.length / 2;
  const keepRatio = targetCount / Math.max(totalCandidates, 1);
  const rand = mulberry32(seed);
  const worldScale = worldWidth / width;

  const targets = [];
  let acc = 0;
  for (let i = 0; i < totalCandidates; i++) {
    acc += keepRatio;
    if (acc < 1) continue;
    acc -= 1;
    const px = candidates[i * 2] + (rand() - 0.5) * 0.7;
    const py = candidates[i * 2 + 1] + (rand() - 0.5) * 0.7;
    targets.push({
      // Negated: main.js's lyrics camera looks down +Z (matching the Bird
      // Demo convention), not three.js's default -Z, so world +X reads as
      // screen-LEFT from that camera — flip here or the phrase mirrors.
      x: -(px - width / 2) * worldScale,
      y: (height / 2 - py) * worldScale, // canvas Y grows downward; world Y is up
      z: (rand() - 0.5) * depthJitter,
    });
  }
  return targets;
}

// ---------------------------------------------------------------------------
//  Phase timing (seconds) — tuned for a lyrical, unhurried read, not speed.
// ---------------------------------------------------------------------------
const TIMING = { flight: 7, approach: 2, assemble: 2.5, hold: 3, dissolve: 2.5, return: 5 };
const T1 = TIMING.flight;
const T2 = T1 + TIMING.approach;
const T3 = T2 + TIMING.assemble;
const T4 = T3 + TIMING.hold;
const T5 = T4 + TIMING.dissolve;
const CYCLE = T5 + TIMING.return;

const PHASE_NAMES = ['flight', 'approach', 'assemble', 'hold', 'dissolve', 'return'];

export class LyricParticles {
  constructor(scene, opts = {}) {
    const {
      text = 'Forever More',
      count = 1100,
      seed = 4242,
      // World-space anchor the phrase assembles at (plane is axis-aligned:
      // +X right, +Y up — see main.js's camera framing for why no per-frame
      // camera-facing rotation is needed here).
      textAnchor = new THREE.Vector3(0, 13, 110),
      textWorldWidth = 30,
      // Flight travels from far Z (deep in the scene) toward the anchor.
      farZ = 260,
      driftX = 10,
    } = opts;

    this.text = text;
    this.textAnchor = textAnchor.clone();
    this.farZ = farZ;
    this.driftX = driftX;
    this.speed = 1.0;
    this.paused = false;
    this.localTime = 0;
    this.phase = 'flight';

    const targets = sampleTextTargets(text, { targetCount: count, worldWidth: textWorldWidth, seed: seed ^ 0x9e3779b9 });
    this.count = targets.length;

    const rand = mulberry32(seed);

    // Per-particle constant data (built once).
    this._target = new Float32Array(this.count * 3);
    this._role = new Float32Array(this.count * 3); // lateral, vertical bias, longitudinal (lead/trail)
    this._wander = new Float32Array(this.count * 4); // freqA, phaseA, freqB, phaseB
    this._timing = new Float32Array(this.count * 3); // approachStagger, dissolveDelay, orbitDir
    this._hover = new Float32Array(this.count * 3); // hoverBase, hoverFreq, hoverPhase

    let minX = Infinity, maxX = -Infinity;
    for (const t of targets) { if (t.x < minX) minX = t.x; if (t.x > maxX) maxX = t.x; }
    const xSpan = Math.max(maxX - minX, 1e-3);

    for (let i = 0; i < this.count; i++) {
      const tgt = targets[i];
      this._target[i * 3 + 0] = tgt.x;
      this._target[i * 3 + 1] = tgt.y;
      this._target[i * 3 + 2] = tgt.z;

      this._role[i * 3 + 0] = (rand() - 0.5) * 16; // lateral spread within the flock
      this._role[i * 3 + 1] = (rand() - 0.5) * 3.0; // some arc higher, some skim low
      this._role[i * 3 + 2] = (rand() - 0.5) * 14; // lead / trail along the travel axis

      this._wander[i * 4 + 0] = 0.12 + rand() * 0.18;
      this._wander[i * 4 + 1] = rand() * Math.PI * 2;
      this._wander[i * 4 + 2] = 0.18 + rand() * 0.22;
      this._wander[i * 4 + 3] = rand() * Math.PI * 2;

      this._timing[i * 3 + 0] = (rand() - 0.5) * 0.8; // approach lead/lag
      // Dissolve order: rightmost letters (max target X) release first, so
      // the phrase visibly peels apart right -> left (spec section 25).
      const normX = 1 - (tgt.x - minX) / xSpan; // 1 = leftmost (releases last)
      this._timing[i * 3 + 1] = normX * 1.4; // dissolve delay, seconds
      this._timing[i * 3 + 2] = rand() < 0.5 ? -1 : 1; // orbit curl direction

      this._hover[i * 3 + 0] = 0.6 + rand() * 3.0; // 0.6m - 3.6m above the wave
      this._hover[i * 3 + 1] = 0.25 + rand() * 0.35;
      this._hover[i * 3 + 2] = rand() * Math.PI * 2;
    }

    // Rendering: THREE.Points + ShaderMaterial, one shared geometry/material
    // for the whole flock — no per-particle Mesh objects.
    const positions = new Float32Array(this.count * 3);
    const aSeed = new Float32Array(this.count);
    const aSize = new Float32Array(this.count);
    const aBrightness = new Float32Array(this.count);
    const aAssemble = new Float32Array(this.count);
    for (let i = 0; i < this.count; i++) {
      aSeed[i] = rand() * Math.PI * 2;
      aSize[i] = 0.7 + rand() * 0.6;
      aBrightness[i] = 0.75 + rand() * 0.4;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute('aBrightness', new THREE.BufferAttribute(aBrightness, 1));
    geo.setAttribute('aAssemble', new THREE.BufferAttribute(aAssemble, 1).setUsage(THREE.DynamicDrawUsage));

    this.uniforms = {
      uTime: { value: 0 },
      // Scaled for the actual viewing distances in this scene (tens to
      // hundreds of units, not the few-unit range typical of a point-sprite
      // demo) — at 34 the sprites were sub-pixel by the time particles
      // reached the text-formation distance and read as noise, not dots.
      uPixelSize: { value: 140.0 },
      uGlow: { value: 1.0 },
      // Cool white / pale blue-white default — suits the twilight/night test
      // environment this mode boots into (see main.js). Overwritten per-frame
      // by setTimeOfDay() when ?time=1 is also active.
      uColor: { value: new THREE.Color(0.82, 0.9, 1.0) },
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      toneMapped: false,
      blending: THREE.AdditiveBlending,
      uniforms: this.uniforms,
      vertexShader: /* glsl */ `
        precision highp float;
        attribute float aSeed;
        attribute float aSize;
        attribute float aBrightness;
        attribute float aAssemble;
        uniform float uTime;
        uniform float uPixelSize;
        varying float vBrightness;
        varying float vTwinkle;
        varying float vCore;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          // Settled particles read a touch larger/brighter for readability —
          // the emissive core stands out from the flock without changing the
          // texel-level shape of the sprite.
          float settle = 1.0 + 0.22 * aAssemble;
          gl_PointSize = uPixelSize * aSize * settle / max(-mv.z, 1.0);
          vTwinkle = 0.78 + 0.22 * sin(uTime * 1.6 + aSeed * 6.2831853);
          vBrightness = aBrightness * (0.88 + 0.3 * aAssemble);
          vCore = aAssemble;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColor;
        uniform float uGlow;
        varying float vBrightness;
        varying float vTwinkle;
        varying float vCore;
        void main(){
          vec2 d = gl_PointCoord - 0.5;
          float r2 = dot(d, d);
          if (r2 > 0.25) discard;
          float r = sqrt(r2) * 2.0; // 0 at centre .. 1 at edge
          float core = smoothstep(0.3, 0.0, r);
          float glow = smoothstep(1.0, 0.18, r);
          float alpha = (core * 1.0 + glow * 0.4) * vBrightness * vTwinkle * uGlow;
          vec3 col = uColor * (1.0 + core * (0.5 + 0.3 * vCore));
          gl_FragColor = vec4(col, alpha);
        }
      `,
    });

    this.points = new THREE.Points(geo, material);
    this.points.frustumCulled = false;
    scene.add(this.points);

    this._positions = positions;
    this._aAssemble = aAssemble;
    this._tmpWorldY = 0;
  }

  setTint(color) {
    this.uniforms.uColor.value.copy(color);
  }

  setTime(t) {
    this.localTime = Math.max(0, t);
  }

  setPaused(p) {
    this.paused = !!p;
  }

  restart() {
    this.localTime = 0;
  }

  // Jump straight to the middle of HOLD — a quick way to preview the fully
  // assembled phrase without waiting through FLIGHT/APPROACH.
  previewAssembled() {
    this.localTime = (T3 + T4) / 2;
  }

  update(dt, sceneTime, ocean) {
    if (!this.paused) this.localTime += dt * this.speed;
    this._recompute(sceneTime, ocean);
  }

  _recompute(sceneTime, ocean) {
    const lt = this.localTime % CYCLE;

    // Group-level envelopes (shared travel path — individual stagger is
    // layered on top, per particle, below).
    const approachAmount = trapezoid(lt, T1, T2, T5, CYCLE);
    const settleBase = approachAmount;

    // Which named phase are we nominally in? (debug/GUI display only — does
    // not affect the continuous math above.)
    if (lt < T1) this.phase = 'flight';
    else if (lt < T2) this.phase = 'approach';
    else if (lt < T3) this.phase = 'assemble';
    else if (lt < T4) this.phase = 'hold';
    else if (lt < T5) this.phase = 'dissolve';
    else this.phase = 'return';

    const cyc = (2 * Math.PI * lt) / CYCLE;
    const driftFade = 1 - approachAmount;
    const groupX = (this.driftX * Math.sin(cyc) + this.driftX * 0.4 * Math.sin(2 * cyc + 1.3)) * driftFade;
    const groupZ = THREE.MathUtils.lerp(this.farZ, this.textAnchor.z, approachAmount);

    const waterY = ocean ? ocean.heightAt(groupX, groupZ, sceneTime) : 0;
    const groupFlightY = waterY + 2.0;
    const groupY = THREE.MathUtils.lerp(groupFlightY, this.textAnchor.y, approachAmount);

    const pos = this._positions;
    const aAssemble = this._aAssemble;

    for (let i = 0; i < this.count; i++) {
      const roleX = this._role[i * 3 + 0];
      const roleY = this._role[i * 3 + 1];
      const roleZ = this._role[i * 3 + 2];

      const wFreqA = this._wander[i * 4 + 0], wPhaseA = this._wander[i * 4 + 1];
      const wFreqB = this._wander[i * 4 + 2], wPhaseB = this._wander[i * 4 + 3];

      const approachStagger = this._timing[i * 3 + 0];
      const dissolveDelay = this._timing[i * 3 + 1];
      const orbitDir = this._timing[i * 3 + 2];

      const settle = trapezoid(lt, T1 + approachStagger, T2 + approachStagger, T5 + dissolveDelay, CYCLE);
      const assembleT = trapezoid(lt, T2 + approachStagger * 0.5, T3 + approachStagger * 0.5, T4 + dissolveDelay, T5 + dissolveDelay);

      const spread = 1 - 0.85 * settle;
      const turbA = Math.sin(sceneTime * wFreqA + wPhaseA);
      const turbB = Math.cos(sceneTime * wFreqB + wPhaseB);

      const wanderX = roleX * spread + turbA * 1.4 * spread;
      const wanderY = roleY * spread + turbB * 0.7 * spread;
      const wanderZ = roleZ * spread + turbA * 1.1 * spread;

      const tgtX = this._target[i * 3 + 0];
      const tgtY = this._target[i * 3 + 1];
      const tgtZ = this._target[i * 3 + 2];

      let localX = THREE.MathUtils.lerp(wanderX, tgtX, assembleT);
      let localY = THREE.MathUtils.lerp(wanderY, tgtY, assembleT);
      const localZ = THREE.MathUtils.lerp(wanderZ, tgtZ, assembleT);

      // Curved settle: a small perpendicular arc that peaks mid-transition
      // and vanishes at both ends (assembleT = 0 or 1), so particles curve
      // inward rather than sliding in a straight line.
      const orbitEnvelope = 4 * assembleT * (1 - assembleT) * 2.0 * orbitDir;
      localX += -(tgtY - wanderY) * 0.05 * orbitEnvelope;
      localY += (tgtX - wanderX) * 0.05 * orbitEnvelope;

      // HOLD micro-shimmer: tiny, fades in/out with assembleT so it only
      // reads once the phrase is (nearly) formed, never during flight.
      const shimmer = Math.sin(sceneTime * 3.1 + wPhaseA) * 0.05 * assembleT;
      localX += shimmer;
      localY += Math.cos(sceneTime * 2.7 + wPhaseB) * 0.05 * assembleT;

      pos[i * 3 + 0] = groupX + localX;
      pos[i * 3 + 1] = groupY + localY;
      pos[i * 3 + 2] = groupZ + localZ;
      aAssemble[i] = assembleT;
    }

    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.aAssemble.needsUpdate = true;
    this.uniforms.uTime.value = sceneTime;
  }
}
