import * as THREE from 'three';

// Comet Lyric V1 — a single luminous traveler crosses the ocean; particles
// stream continuously from its wake; some of those particles are singled out
// to bend into a lyric letterform, hold briefly, then detach and drift away
// while the head keeps flying, always ahead of the text. This deliberately
// avoids Lyric Particles V1's "particles gather into a stationary phrase"
// read — nothing here ever assembles a cloud and then holds it in place;
// every particle's position is a pure, closed-form function of one clock
// (this.localTime) plus fixed per-particle constants derived once at
// construction (mulberry32, same convention as Birds.js / LyricParticles.js).
// No Math.random() at runtime, no accumulating state.

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

// ---------------------------------------------------------------------------
//  Head path — a fixed Catmull-Rom spline in world space, parameterised by
//  SECONDS (not arc length), so specific story beats (write window, hold,
//  dissolve) line up with specific control points. Past the last defined
//  time, position extrapolates linearly along the final tangent — the head
//  is never allowed to stop (spec: "the head must not stop").
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
    if (t <= this.total) return this.curve.getPoint(this._u(t), out);
    // Linear extrapolation using the tangent of the final segment.
    const pEnd = this.curve.getPoint(1);
    const pNear = this.curve.getPoint(this._u(this.total - 0.5));
    const dt = 0.5;
    out.copy(pEnd).addScaledVector(pEnd.clone().sub(pNear).divideScalar(dt), t - this.total);
    return out;
  }

  tangentAt(t, out = new THREE.Vector3()) {
    const a = this.positionAt(t - 0.05);
    const b = this.positionAt(t + 0.05);
    out.copy(b).sub(a);
    if (out.lengthSq() < 1e-8) out.set(0, 0, -1);
    return out.normalize();
  }
}

// ---------------------------------------------------------------------------
//  Text -> ordered target offsets. Same canvas-raster + fractional-decimation
//  technique as LyricParticles.js (kept independent here per the brief), but
//  additionally sorted by natural reading order (raw canvas px, ascending) so
//  the write sequence is always "F, Fo, For..." regardless of how the letter
//  SHAPE itself is mirrored for a given camera convention.
// ---------------------------------------------------------------------------
function sampleTextTargetsOrdered(text, { fontWeight = 700, fontFamily = 'Georgia, "Times New Roman", serif', targetCount = 650, worldWidth = 30, depthJitter = 0.4, seed = 99 } = {}) {
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
      // Raw canvas px kept for write ORDER (natural reading sequence).
      px,
      // Unlike LyricParticles.js, this scene's head travels toward -Z and
      // both the follow camera and the wake anchor look back along that
      // same direction — three.js's own default forward — so world +X is
      // already screen-right here and needs no negation.
      x: (px - width / 2) * worldScale,
      y: (height / 2 - py) * worldScale,
      z: (rand() - 0.5) * depthJitter,
    });
  }
  targets.sort((a, b) => a.px - b.px);
  return targets;
}

// ---------------------------------------------------------------------------
//  Phase timing (seconds) — matches the spec's suggested breakdown. The head
//  keeps moving on its spline for as long as localTime advances, regardless
//  of these — they only govern the trail's writing/hold/dissolve narrative.
// ---------------------------------------------------------------------------
const WRITE_START = 5, WRITE_END = 10;
const HOLD_END = 13;
const DISSOLVE_END = 17;
const BEND_DURATION = 1.2;
const PRE_TRAIL_DURATION = 1.4;
const DISSOLVE_STAGGER_SPAN = 2.0;
const DISSOLVE_PARTICLE_DURATION = 2.3;

const DECOR_LIFETIME = 3.2;
const DECOR_COUNT = 380;

// V1.1 tail shape (spec B/C/D): distance-behind-head follows u^TAIL_POWER —
// with TAIL_POWER=3, about two-thirds of every particle's life is spent
// within the first ~12 world units behind the head (a dense, near-continuous
// ribbon — spec B's "5-15 world units"), before it spreads sparsely across
// the remaining reach out to FAR_TAIL_LEN (spec C).
const FAR_TAIL_LEN = 50;
const TAIL_POWER = 3.0;

const PHASE_NAMES = ['approach', 'writing', 'hold', 'dissolve', 'continuing'];

export class CometLyrics {
  constructor(scene, opts = {}) {
    const { text = 'Forever More', lyricCount = 650, seed = 777 } = opts;
    this.text = text;
    this.speed = 1.0;
    this.paused = false;
    this.localTime = 0;
    this.phase = 'approach';

    // ---- Head path -------------------------------------------------------
    this.path = new HeadPath(
      [
        new THREE.Vector3(-60, 17, 400),
        new THREE.Vector3(-20, 15, 300),
        new THREE.Vector3(15, 14, 220),
        new THREE.Vector3(50, 15, 165),
        new THREE.Vector3(85, 17, 130),
        new THREE.Vector3(120, 19, 100),
      ],
      [0, 5, 9, 13, 17, 20]
    );

    // Fixed spatial anchor for the whole phrase, taken once at the write
    // window's midpoint. All letters place their local offset relative to
    // THIS single point (never re-derived per letter) — the head travels
    // ~100 world units over the write window, and anchoring each letter to
    // "where the head was at ITS OWN write time" would smear a 30-unit-wide
    // phrase across that whole distance instead of leaving it readable.
    // writeTime_j (below) still staggers WHEN each particle bends into
    // place, so the progressive-writing feel is unaffected by this fix.
    const writeMid = (WRITE_START + WRITE_END) / 2;
    const anchorPos = this.path.positionAt(writeMid);
    const anchorTan = this.path.tangentAt(writeMid);
    this._wakeAnchor = new THREE.Vector3(anchorPos.x - anchorTan.x * 12.0, anchorPos.y, anchorPos.z - anchorTan.z * 12.0);

    const targets = sampleTextTargetsOrdered(text, { targetCount: lyricCount, seed: seed ^ 0x9e3779b9 });
    this.lyricCount = targets.length;
    this.count = this.lyricCount + DECOR_COUNT;

    const rand = mulberry32(seed);

    // Per-particle constant data.
    this._role = new Uint8Array(this.count); // 0 = decorative, 1 = lyric
    this._birth = new Float32Array(this.count); // decorative: slot birth-in-cycle; lyric: preTrailBirth
    this._writeTime = new Float32Array(this.count); // lyric only
    this._dissolveStart = new Float32Array(this.count); // lyric only
    this._localTarget = new Float32Array(this.count * 3); // lyric only (mirrored canvas offset)
    this._seed = new Float32Array(this.count * 6); // freqA,phaseA,freqB,phaseB,lateral,riseSpeed
    this._detach = new Float32Array(this.count * 3); // lyric dissolve drift direction

    // Decorative trail particles: evenly staggered across one lifetime,
    // recycled forever via modulo — an endless stream behind the head.
    for (let i = 0; i < DECOR_COUNT; i++) {
      this._role[i] = 0;
      this._birth[i] = (i / DECOR_COUNT) * DECOR_LIFETIME;
      this._seed[i * 6 + 0] = 0.3 + rand() * 0.5;
      this._seed[i * 6 + 1] = rand() * Math.PI * 2;
      this._seed[i * 6 + 2] = 0.25 + rand() * 0.4;
      this._seed[i * 6 + 3] = rand() * Math.PI * 2;
      this._seed[i * 6 + 4] = (rand() - 0.5) * 3.0;
      this._seed[i * 6 + 5] = 0.35 + rand() * 0.5;
    }

    // Lyric-writing particles: one per sampled text pixel, in reading order.
    for (let j = 0; j < this.lyricCount; j++) {
      const idx = DECOR_COUNT + j;
      const frac = this.lyricCount > 1 ? j / (this.lyricCount - 1) : 0;
      const writeTime = WRITE_START + frac * (WRITE_END - WRITE_START);
      this._role[idx] = 1;
      this._writeTime[idx] = writeTime;
      this._birth[idx] = writeTime - PRE_TRAIL_DURATION;
      this._dissolveStart[idx] = HOLD_END + frac * DISSOLVE_STAGGER_SPAN;
      const tgt = targets[j];
      this._localTarget[idx * 3 + 0] = tgt.x;
      this._localTarget[idx * 3 + 1] = tgt.y;
      this._localTarget[idx * 3 + 2] = tgt.z;
      this._seed[idx * 6 + 0] = 0.3 + rand() * 0.5;
      this._seed[idx * 6 + 1] = rand() * Math.PI * 2;
      this._seed[idx * 6 + 2] = 0.25 + rand() * 0.4;
      this._seed[idx * 6 + 3] = rand() * Math.PI * 2;
      this._seed[idx * 6 + 4] = (rand() - 0.5) * 2.0;
      this._seed[idx * 6 + 5] = 0.3 + rand() * 0.4;
      // Detach drift once dissolved: mostly upward, gentle sideways breeze.
      const ang = rand() * Math.PI * 2;
      this._detach[idx * 3 + 0] = Math.cos(ang) * 1.4;
      this._detach[idx * 3 + 1] = 1.6 + rand() * 1.2;
      this._detach[idx * 3 + 2] = Math.sin(ang) * 1.4;
    }

    // ---- Rendering: one Points/ShaderMaterial for every trail particle ----
    const positions = new Float32Array(this.count * 3);
    const aSeed = new Float32Array(this.count);
    const aSize = new Float32Array(this.count);
    const aBrightness = new Float32Array(this.count);
    const aAlpha = new Float32Array(this.count);
    const aGlow = new Float32Array(this.count);
    for (let i = 0; i < this.count; i++) {
      aSeed[i] = rand() * Math.PI * 2;
      aSize[i] = 0.75 + rand() * 0.55;
      aBrightness[i] = 0.75 + rand() * 0.4;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute('aBrightness', new THREE.BufferAttribute(aBrightness, 1));
    geo.setAttribute('aAlpha', new THREE.BufferAttribute(aAlpha, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aGlow', new THREE.BufferAttribute(aGlow, 1).setUsage(THREE.DynamicDrawUsage));

    this.uniforms = {
      uTime: { value: 0 },
      // Tuned for the follow camera's typical ~20-30 unit distance to the
      // head (and, by extension, the trail just behind it) — the static
      // test camera sits much farther out, so particles read smaller but
      // correctly-scaled there, which is the desired distance cue anyway.
      uPixelSize: { value: 170.0 },
      uGlow: { value: 1.0 },
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
        attribute float aSeed, aSize, aBrightness, aAlpha, aGlow;
        uniform float uTime, uPixelSize;
        varying float vBrightness, vTwinkle, vAlpha, vGlow;
        void main(){
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          float settle = 1.0 + 0.2 * aGlow;
          gl_PointSize = uPixelSize * aSize * settle / max(-mv.z, 1.0);
          vTwinkle = 0.8 + 0.2 * sin(uTime * 1.6 + aSeed * 6.2831853);
          vBrightness = aBrightness * (0.88 + 0.25 * aGlow);
          vAlpha = aAlpha;
          vGlow = aGlow;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColor;
        uniform float uGlow;
        varying float vBrightness, vTwinkle, vAlpha, vGlow;
        void main(){
          vec2 d = gl_PointCoord - 0.5;
          float r2 = dot(d, d);
          if (r2 > 0.25) discard;
          float r = sqrt(r2) * 2.0;
          float core = smoothstep(0.3, 0.0, r);
          float glow = smoothstep(1.0, 0.18, r);
          // V1.1 bloom fix (see the head shader comment for the full
          // reasoning): shape/coverage alpha is uGlow-free and stays 0..1;
          // uGlow instead scales the emissive colour, which is unclamped
          // and can cross Post.js's bloom threshold at higher settings.
          float shapeAlpha = clamp(core * 1.0 + glow * 0.4, 0.0, 1.0) * vBrightness * vTwinkle * vAlpha;
          vec3 emissive = uColor * (1.0 + core * (0.5 + 0.5 * vGlow)) * uGlow;
          gl_FragColor = vec4(emissive, shapeAlpha);
        }
      `,
    });

    this.points = new THREE.Points(geo, material);
    this.points.frustumCulled = false;
    scene.add(this.points);

    // ---- Head: one big bright sprite, layered radial glow in-shader ------
    this.headUniforms = {
      uColor: { value: new THREE.Color(1.0, 1.0, 1.0) },
      uGlow: { value: 1.0 },
      uTime: { value: 0 },
      // V1.1: bigger base footprint — the head must read as a dominant
      // object, not a point sprite, even before any Glow boost.
      uPixelSize: { value: 950.0 },
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
        uniform vec3 uColor;
        uniform float uGlow, uTime;
        void main(){
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d) * 2.0;
          float core   = smoothstep(0.16, 0.0, r);
          float inner  = smoothstep(0.46, 0.05, r);
          float outer  = smoothstep(1.0, 0.22, r);
          float twinkle = 0.94 + 0.06 * sin(uTime * 4.0);
          // V1.1 bloom fix: alpha stays a plain 0..1 shape/coverage mask —
          // it must NOT carry uGlow, because additive blending's src-alpha
          // blend FACTOR is hardware-clamped to 1.0 regardless of what the
          // shader outputs, so multiplying alpha by uGlow past that point
          // (the old behaviour) had literally zero further visual effect.
          // The emissive colour is what needs to scale with uGlow instead —
          // it's unclamped in the half-float HDR buffer, so raising it can
          // genuinely push luminance past Post.js's bloom threshold (1.15).
          // The core alone already sits at ~2.6x that threshold at uGlow=1,
          // so the head blooms visibly by default, not just at max Glow.
          float shapeAlpha = clamp(core * 1.0 + inner * 0.6 + outer * 0.24, 0.0, 1.0) * twinkle;
          vec3 emissive = mix(uColor, vec3(1.0), core * 0.85) * (core * 3.0 + inner * 1.15 + outer * 0.4) * uGlow * twinkle;
          gl_FragColor = vec4(emissive, shapeAlpha);
        }
      `,
    });
    this.headMesh = new THREE.Points(headGeo, headMat);
    this.headMesh.frustumCulled = false;
    scene.add(this.headMesh);

    this._positions = positions;
    this._aAlpha = aAlpha;
    this._aGlow = aGlow;
    this._headPos = new THREE.Vector3();
    this._tangent = new THREE.Vector3();
    this._tmp = new THREE.Vector3();
    // Public, updated every _recompute() — for main.js's follow camera.
    this.travelDir = new THREE.Vector3(0, 0, -1);
    // Perpendicular tail basis (right/up relative to travel direction),
    // rebuilt once per frame in _recompute() — see the tail-placement note
    // there for why the whole trail is positioned relative to these instead
    // of each particle's own historical path position.
    this._worldUp = new THREE.Vector3(0, 1, 0);
    this._right = new THREE.Vector3(1, 0, 0);
    this._up2 = new THREE.Vector3(0, 1, 0);
    // V1.1 debug toggle (?cometOnly=1 or GUI "Show Lyrics") — when false,
    // lyric-writing particles behave exactly like decorative trail particles
    // (never bend toward a letter) so the comet's visual can be judged alone
    // without the lyric system. Lyric code itself is untouched, just bypassed.
    this.showLyrics = true;
    this._driftTmp3 = new Float32Array(3);
  }

  setTint(color) {
    this.uniforms.uColor.value.copy(color);
    this.headUniforms.uColor.value.copy(color).lerp(new THREE.Color(1, 1, 1), 0.6);
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

  getHeadPosition(out = new THREE.Vector3()) {
    return out.copy(this._headPos);
  }

  getWriteProgress() {
    const t = this.localTime;
    return Math.min(Math.max((t - WRITE_START) / (WRITE_END - WRITE_START), 0), 1);
  }

  update(dt, sceneTime, ocean) {
    if (!this.paused) this.localTime += dt * this.speed;
    this._recompute(ocean);
  }

  // Places trail-particle `idx` in `pos`, u world units "old" (0 = at the
  // head, 1 = about to recycle/dissolve) along the head's CURRENT position
  // and travel basis. Shared by decorative particles and, when showLyrics is
  // off, lyric particles too — see the _recompute() comment above the basis
  // computation for why this is keyed off the current head, not history.
  _placeTail(idx, u, dir, right, up2, fA, pA, fB, pB, lateral, t, pos) {
    const head = this._headPos;
    const distBehind = FAR_TAIL_LEN * Math.pow(u, TAIL_POWER);
    const lateralScale = 0.4 + 2.6 * u;
    const wobbleR = Math.sin(t * fA + pA) * lateralScale + lateral * 0.3 * lateralScale;
    const wobbleU = Math.cos(t * fB + pB) * lateralScale * 0.7;
    const alongJitter = Math.sin(t * fA * 0.6 + pB) * 0.6 * (0.3 + u);
    const back = distBehind + alongJitter;
    pos[idx * 3 + 0] = head.x - dir.x * back + right.x * wobbleR + up2.x * wobbleU;
    pos[idx * 3 + 1] = head.y - dir.y * back + right.y * wobbleR + up2.y * wobbleU;
    pos[idx * 3 + 2] = head.z - dir.z * back + right.z * wobbleR + up2.z * wobbleU;
  }

  _recompute(ocean) {
    const t = this.localTime;

    if (t < WRITE_START) this.phase = 'approach';
    else if (t < WRITE_END) this.phase = 'writing';
    else if (t < HOLD_END) this.phase = 'hold';
    else if (t < DISSOLVE_END) this.phase = 'dissolve';
    else this.phase = 'continuing';

    this.path.positionAt(t, this._headPos);
    this.path.tangentAt(t, this._tangent);
    this.travelDir.copy(this._tangent);

    // Deterministic wave-riding: uses OUR clock, not wall time, so the same
    // t always gives the same head altitude (spec 29). The rendered ocean
    // MESH still animates on the shared scene clock — a small, documented
    // mismatch between "how high the head sits" and "where the visible wave
    // crest is" at any instant, unavoidable without forking the ocean's own
    // time uniform per-effect.
    const waterY = ocean ? ocean.heightAt(this._headPos.x, this._headPos.z, t) : 0;
    this._headPos.y = waterY + 3.0 + Math.sin(t * 0.35) * 1.6; // 1.4m - 4.6m hover band
    this.points.geometry.attributes.position; // (no-op keep JIT happy)
    this.headMesh.geometry.attributes.position.array[0] = this._headPos.x;
    this.headMesh.geometry.attributes.position.array[1] = this._headPos.y;
    this.headMesh.geometry.attributes.position.array[2] = this._headPos.z;
    this.headMesh.geometry.attributes.position.needsUpdate = true;
    this.headUniforms.uTime.value = t;

    const pos = this._positions;
    const aAlpha = this._aAlpha;
    const aGlow = this._aGlow;

    // V1.1 tail redesign: every trail particle (decorative, and — while
    // showLyrics is off — lyric ones too) is now placed relative to the
    // CURRENT head position and travel direction, not each particle's own
    // historical path position. This is the standard "comet tail" technique
    // (spec D: "use the actual flight-path tangent/velocity vector") and is
    // what makes the tail read as one continuous, directional streak instead
    // of a loose, roughly circular cloud of independently-drifting motes.
    // A perpendicular (right/up) basis off the travel direction gives the
    // tail's lateral spread axes; distance-behind-head follows u^TAIL_POWER
    // so more of a particle's life is spent in the short, dense NEAR_TAIL_LEN
    // band (a near-continuous ribbon) before spreading out sparsely across
    // the remaining FAR_TAIL_LEN (spec B/C).
    const dir = this.travelDir;
    const right = this._right.crossVectors(dir, this._worldUp);
    if (right.lengthSq() < 1e-6) right.set(1, 0, 0); else right.normalize();
    const up2 = this._up2.crossVectors(right, dir).normalize();

    // -- Decorative trail (recycled forever via modulo) --------------------
    for (let i = 0; i < DECOR_COUNT; i++) {
      const rawAge = t - this._birth[i];
      if (rawAge < 0) {
        // Before this slot's very first birth — hide it rather than folding
        // negative time into t=0 (that collapse otherwise piles every
        // not-yet-born slot onto the path's starting point for the first
        // DECOR_LIFETIME seconds, reading as one dense static clump instead
        // of a trail that builds up naturally as the head starts moving).
        aAlpha[i] = 0;
        aGlow[i] = 0;
        continue;
      }
      const cyclePos = rawAge % DECOR_LIFETIME;
      const u = cyclePos / DECOR_LIFETIME;
      const fA = this._seed[i * 6 + 0], pA = this._seed[i * 6 + 1];
      const fB = this._seed[i * 6 + 2], pB = this._seed[i * 6 + 3];
      const lateral = this._seed[i * 6 + 4];
      this._placeTail(i, u, dir, right, up2, fA, pA, fB, pB, lateral, t, pos);
      const fadeIn = smoothstep(0, 0.08, u);
      const fadeOut = 1 - smoothstep(0.75, 1.0, u);
      aAlpha[i] = fadeIn * fadeOut;
      aGlow[i] = 1 - u; // near-head boost: bigger + brighter close in, per spec B.
    }

    // -- Lyric-writing particles --------------------------------------------
    // All letters share ONE anchor (this._wakeAnchor, fixed at construction)
    // so the water sample under it only needs computing once per frame.
    const anchor = this._wakeAnchor;
    const waterYAnchor = ocean ? ocean.heightAt(anchor.x, anchor.z, t) : 0;
    for (let j = 0; j < this.lyricCount; j++) {
      const idx = DECOR_COUNT + j;
      const writeTime = this._writeTime[idx];
      const preBirth = this._birth[idx];
      const dissolveStart = this._dissolveStart[idx];
      const dissolveEnd = dissolveStart + DISSOLVE_PARTICLE_DURATION;
      const bendEnd = writeTime + BEND_DURATION;

      const fA = this._seed[idx * 6 + 0], pA = this._seed[idx * 6 + 1];
      const fB = this._seed[idx * 6 + 2], pB = this._seed[idx * 6 + 3];
      const lateral = this._seed[idx * 6 + 4];

      if (!this.showLyrics) {
        // Comet-only debug mode (?cometOnly=1 / GUI "Show Lyrics" off):
        // never assemble — behave exactly like a decorative trail particle,
        // reusing the same recycling + tail placement for a consistent look.
        const rawAgeL = t - preBirth;
        if (rawAgeL < 0) { aAlpha[idx] = 0; aGlow[idx] = 0; continue; }
        const cyclePosL = rawAgeL % DECOR_LIFETIME;
        const uL = cyclePosL / DECOR_LIFETIME;
        this._placeTail(idx, uL, dir, right, up2, fA, pA, fB, pB, lateral, t, pos);
        aAlpha[idx] = smoothstep(0, 0.08, uL) * (1 - smoothstep(0.75, 1.0, uL));
        aGlow[idx] = 1 - uL;
        continue;
      }

      // Drift reference (pre-bend phase): placed in the tail relative to the
      // CURRENT head, same as decorative particles — capped to the first
      // 40% of the tail's u-range since these are only ~PRE_TRAIL_DURATION
      // seconds old and should read as freshly-emitted, not far-drifted.
      const driftU = Math.min(Math.max((t - preBirth) / PRE_TRAIL_DURATION, 0), 1) * 0.4;
      this._placeTail(idx, driftU, dir, right, up2, fA, pA, fB, pB, lateral, t, this._driftTmp3);
      const driftX = this._driftTmp3[0], driftY = this._driftTmp3[1], driftZ = this._driftTmp3[2];

      // Target: the shared wake anchor plus this letter's own mirrored
      // local offset — a coherent, readable ribbon embedded at one point
      // along the path (see the constructor comment by _wakeAnchor).
      const tgtX = anchor.x + this._localTarget[idx * 3 + 0];
      const tgtY = waterYAnchor + 4.5 + this._localTarget[idx * 3 + 1];
      const tgtZ = anchor.z + this._localTarget[idx * 3 + 2];

      const bendT = smoothstep(writeTime, bendEnd, t);
      // Curved settle: perpendicular arc peaking mid-bend, vanishing at ends.
      const orbit = 4 * bendT * (1 - bendT) * 1.6;
      let px = THREE.MathUtils.lerp(driftX, tgtX, bendT);
      let py = THREE.MathUtils.lerp(driftY, tgtY, bendT);
      let pz = THREE.MathUtils.lerp(driftZ, tgtZ, bendT);
      px += -(tgtY - driftY) * 0.04 * orbit;
      py += (tgtX - driftX) * 0.04 * orbit;

      // Hold shimmer: tiny, only reads once (nearly) settled.
      const shimmerEnv = bendT * (1 - smoothstep(dissolveStart, dissolveStart + 0.6, t));
      px += Math.sin(t * 3.1 + pA) * 0.05 * shimmerEnv;
      py += Math.cos(t * 2.7 + pB) * 0.05 * shimmerEnv;

      // Dissolve: detach along a fixed seeded direction, drifting away as it fades.
      const dissolveT = smoothstep(dissolveStart, dissolveEnd, t);
      px += this._detach[idx * 3 + 0] * dissolveT * dissolveT * 3.0;
      py += this._detach[idx * 3 + 1] * dissolveT * dissolveT * 3.0;
      pz += this._detach[idx * 3 + 2] * dissolveT * dissolveT * 3.0;

      pos[idx * 3 + 0] = px;
      pos[idx * 3 + 1] = py;
      pos[idx * 3 + 2] = pz;

      const fadeIn = smoothstep(preBirth, preBirth + 0.3, t);
      const fadeOutDissolve = 1 - smoothstep(dissolveStart + DISSOLVE_PARTICLE_DURATION * 0.35, dissolveEnd, t);
      aAlpha[idx] = fadeIn * fadeOutDissolve;
      aGlow[idx] = bendT * (1 - dissolveT);
    }

    this.points.geometry.attributes.position.needsUpdate = true;
    this.points.geometry.attributes.aAlpha.needsUpdate = true;
    this.points.geometry.attributes.aGlow.needsUpdate = true;
    this.uniforms.uTime.value = t;
  }
}
