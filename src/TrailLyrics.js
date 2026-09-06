import * as THREE from 'three';

// Trail Lyrics V1 — an isolated prototype answering one question: can part
// of the Head Particle Trail's wake visually condense into a readable lyric
// phrase, hold long enough to read, then be left behind in world space as
// the head/camera continue forward? This is NOT a lyric-sync system — one
// looping test phrase ("Forever More"), no external timeline, no multiple
// events. Deliberately kept isolated from HeadParticleTrail.js: this module
// only READS the head's position/travel direction and the live camera each
// frame, it never modifies HeadParticleTrail's own state.
//
// Architecture: a small dedicated particle pool (visually matching Head
// Particle Trail's warm-gold sprite language) plus one CanvasTexture glyph
// plane for a crisp readable hold. Both are ordinary THREE.Object3Ds placed
// with a shared world-space "plane frame" — a centre point that is fixed
// ONCE per cycle (the instant the phrase starts assembling, from wherever
// the head/wake is at that moment) plus an orientation quaternion that
// slerps toward the live follow camera while camera-influence is nonzero,
// then simply stops being touched. Freezing the QUATERNION (the centre was
// already fixed at formation) is what turns a readable, camera-facing
// phrase into a genuinely world-anchored object once the camera moves on —
// this is the entire "leave it behind" trick, and it needs no per-frame
// tracking logic once influence reaches zero.
//
// Reused from LyricParticles.js: only sampleTextTargets() below — the
// canvas-rasterise-then-decimate technique for turning a text string into a
// set of local 2D sample points. Everything else about that experiment (the
// long flight/approach toward a stationary sign, particles arriving from far
// away) is deliberately NOT reused — that "drone show" visual language was
// explicitly rejected for this prototype.

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
//  Text -> local plane-space target positions. Adapted from LyricParticles.js
//  — same canvas-rasterise-then-decimate technique. Two differences from the
//  original: (1) no x-negation (that flip existed only because LyricParticles
//  hard-codes a scene camera that looks down +Z; here we build our own
//  right/up basis fresh from the live camera each cycle, so canvas-x maps
//  directly onto +right with no special-casing), and (2) it also returns the
//  rasterising canvas itself, reused as-is for the smooth glyph texture
//  layer below instead of rendering the text a second time.
// ---------------------------------------------------------------------------
function sampleTextTargets(text, { fontWeight = 600, fontFamily = 'Georgia, "Times New Roman", serif', targetCount = 650, worldWidth = 26, depthJitter = 0.4, seed = 99 } = {}) {
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
  const worldHeight = height * worldScale;

  const targets = [];
  let acc = 0;
  for (let i = 0; i < totalCandidates; i++) {
    acc += keepRatio;
    if (acc < 1) continue;
    acc -= 1;
    const px = candidates[i * 2] + (rand() - 0.5) * 0.7;
    const py = candidates[i * 2 + 1] + (rand() - 0.5) * 0.7;
    targets.push({
      x: (px - width / 2) * worldScale,
      y: (height / 2 - py) * worldScale, // canvas Y grows downward; local +Y is up
      z: (rand() - 0.5) * depthJitter,
    });
  }
  return { targets, canvas, worldWidth, worldHeight };
}

// ---------------------------------------------------------------------------
//  Phase timing (seconds) — starting values from the spec; all exposed as
//  mutable instance fields so the GUI can retune them live without rebuilding
//  anything (the phase boundaries are recomputed from these every frame).
// ---------------------------------------------------------------------------
const DEFAULT_TIMING = { travel: 3.0, assemble: 1.5, hold: 2.0, leave: 2.5, dissolve: 2.5 };
const PARTICLE_COUNT = 650;
const WORLD_UP = new THREE.Vector3(0, 1, 0);

// Warm-gold palette matched to Head Particle Trail's own Gold identity
// (spec 9: "Gold compatibility is the priority") — same hex values as
// HeadParticleTrail's COLOR_HEAD_INNER/COLOR_HEAD_OUTER.
const COLOR_PARTICLE = new THREE.Color(0xffe0a3);
const COLOR_GLYPH = new THREE.Color(0xffcf85);

export class TrailLyrics {
  constructor(scene, opts = {}) {
    const { text = 'Forever More', seed = 777 } = opts;
    this._seed = seed >>> 0;

    this.enabled = true;
    this.paused = false;
    this.localTime = 0;
    this.phase = 'travel';

    // GUI-tunable (spec 12).
    this.textScale = 1.0;
    // Fraction of the camera-to-head distance, measured along the CAMERA's
    // own forward axis (not a head-relative offset — see _prepareFormation's
    // comment for why: the follow camera's chase geometry sits diagonally
    // behind-and-beside the head and looks diagonally ahead-and-past it, so
    // a naive "N units behind the head" offset does not reliably land inside
    // the camera's actual view cone). 0.65 puts it noticeably closer to the
    // camera than the head — "in the wake, between camera and head".
    this.formationDistance = 0.65;
    this.formationHeightOffset = 2; // nudged below the direct camera-head line, world units
    this.travelDuration = DEFAULT_TIMING.travel;
    this.assembleDuration = DEFAULT_TIMING.assemble;
    this.holdDuration = DEFAULT_TIMING.hold;
    this.leaveDuration = DEFAULT_TIMING.leave;
    this.dissolveDuration = DEFAULT_TIMING.dissolve;
    this.textGlow = 1.0;
    this.particleContribution = 1.0;
    this.billboardRelease = 0.4; // fraction of HOLD spent still camera-locked before releasing (orientation)
    // V1.1 — soft position release (spec: "Soft Position Release"). Orientation
    // tracking alone cannot keep a fixed world point inside the follow camera's
    // view, because the camera continuously re-aims at the ever-advancing head,
    // not at the lyric plane — a purely frozen _planeCenter goes off-axis in
    // well under a second (measured: dot 0.988 -> 0.283 in ~0.8s). Fix: let
    // _planeCenter itself keep following a live "desired centre" (same
    // camera-forward formation point, recomputed every frame) while
    // positionInfluence > 0, then simply stop updating it — exactly the same
    // freeze-by-ceasing-updates trick already used for orientation, applied to
    // position instead.
    this.positionRelease = 0.4; // fraction of HOLD spent still position-following before releasing
    this.followSmoothing = 6.0; // exponential follow rate (1/s) at full positionInfluence; scales down with influence so the lyric loses momentum rather than snapping

    // V1.2 — source region for the lyric particles' pre-assemble positions:
    // a recent WINDOW of the head's own path (spec 5), not an arbitrary
    // local cloud. Seconds behind the live head-trail clock at the moment
    // formation runs; see _computeWakeScatter().
    //
    // Spec 5 suggested ~1.5-3.0s as a starting range, but measured against
    // THIS project's actual head speed (~23 world units/sec along its
    // path) that window sampled points 35-69 units behind the current
    // head — many times the 15-unit-wide phrase, producing exactly the
    // long-travel "drone show" convergence spec 8 rules out (measured
    // avg/max travel ~46/~57 units before this fix). Recalibrated to the
    // head's real speed so the window instead spans roughly 7-20 units
    // behind the head — comparable to the text width, i.e. "modest".
    this.trailWindowMin = 0.3;
    this.trailWindowMax = 0.9;
    // How far (world units) the ASSEMBLE motion continues along the wake's
    // own flow direction before curving into the glyph shape (spec 7's
    // "early ASSEMBLE: continue roughly along the wake direction" — a
    // quadratic-Bezier control-point offset, not a straight lerp).
    this.flowAmount = 1.8;
    // Debug metrics (spec 15), refreshed every _computeWakeScatter() call.
    this._lastTravelStats = { avgDistance: 0, maxDistance: 0, sourceWidth: 0, textWidth: 0 };

    const { targets, canvas, worldWidth, worldHeight } = sampleTextTargets(text, { targetCount: PARTICLE_COUNT, worldWidth: 15, seed });
    // Sort glyph targets by local X once, at construction (pure text-shape
    // preprocessing, independent of any wake data) — this is the "sorted
    // glyph targets" half of spec 8's low-travel mapping: wake source
    // particles are sorted by local X too, each cycle, in
    // _computeWakeScatter(), and paired index-for-index so the assignment
    // is monotonic (left source -> left letter, right source -> right
    // letter) instead of arbitrary/crossing.
    targets.sort((a, b) => a.x - b.x);
    this.count = targets.length;
    this._textWorldWidth = worldWidth;
    this._textWorldHeight = worldHeight;

    const rand = mulberry32(seed ^ 0x9e3779b9);

    // ---- Per-particle constant attributes (built once; no per-frame CPU
    // work over the particle set — the vertex shader does the scatter ->
    // glyph -> dissolve blend entirely from a handful of uniforms).
    // aScatter is intentionally left ZERO here: V1 baked a static random
    // local cloud in at construction, but V1.2 derives it fresh every cycle
    // from the live wake trajectory (_computeWakeScatter, called from
    // _prepareFormation) — construction happens before any HeadParticleTrail
    // reference exists, so there is nothing meaningful to sample yet. The
    // buffer is harmless zero-filled until then because this.points stays
    // invisible for the whole of TRAVEL. ----
    const scatter = new Float32Array(this.count * 3);
    const glyphTarget = new Float32Array(this.count * 3);
    const stagger = new Float32Array(this.count);
    const seedAttr = new Float32Array(this.count);
    const sizeAttr = new Float32Array(this.count);
    for (let i = 0; i < this.count; i++) {
      const t = targets[i];
      glyphTarget[i * 3 + 0] = t.x * this.textScale;
      glyphTarget[i * 3 + 1] = t.y * this.textScale;
      glyphTarget[i * 3 + 2] = t.z;
      stagger[i] = rand() * 0.6;
      seedAttr[i] = rand() * Math.PI * 2;
      // Size distribution matched to HeadParticleTrail's own (mostly tiny,
      // a few brighter highlights) so the lyric particles read as part of
      // the same population before ASSEMBLE, not a visually distinct set.
      const sizeRoll = rand();
      sizeAttr[i] = sizeRoll < 0.7 ? 0.4 + rand() * 0.25 : sizeRoll < 0.95 ? 0.65 + rand() * 0.3 : 1.0 + rand() * 0.35;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.count * 3), 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aScatter', new THREE.BufferAttribute(scatter, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aGlyphTarget', new THREE.BufferAttribute(glyphTarget, 3));
    geo.setAttribute('aStagger', new THREE.BufferAttribute(stagger, 1));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seedAttr, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizeAttr, 1));
    this._aScatterAttr = geo.attributes.aScatter;

    this.particleUniforms = {
      uAssembleProgress: { value: 0 },
      uDissolveProgress: { value: 0 },
      uParticleContribution: { value: 1.0 },
      uColor: { value: COLOR_PARTICLE.clone() },
      uGlow: { value: 1.0 },
      uPixelSize: { value: 120.0 },
      // V1.2 (spec 7): local-space wake-flow direction + how far the
      // ASSEMBLE motion continues along it before curving into the glyph —
      // the quadratic-Bezier control-point offset that turns a straight
      // scatter->glyph lerp into a flowing condensation.
      uLocalFlowDir: { value: new THREE.Vector3(0, 0, 1) },
      uFlowAmount: { value: this.flowAmount },
    };
    const particleMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      toneMapped: false,
      blending: THREE.AdditiveBlending,
      uniforms: this.particleUniforms,
      vertexShader: /* glsl */ `
        precision highp float;
        attribute vec3 aScatter, aGlyphTarget;
        attribute float aStagger, aSeed, aSize;
        uniform float uAssembleProgress, uDissolveProgress, uPixelSize;
        uniform vec3 uLocalFlowDir;
        uniform float uFlowAmount;
        varying float vAlpha, vSeed;
        void main(){
          // Per-particle staggered assemble (spec 5B: gentle, organic, not
          // lockstep) — each particle starts converging once the shared
          // progress passes its own small stagger offset.
          float localT = clamp((uAssembleProgress - aStagger) / max(1.0 - aStagger, 0.0001), 0.0, 1.0);
          float s = smoothstep(0.0, 1.0, localT);
          // V1.2 (spec 7): a quadratic Bezier from the wake-sampled start
          // position to the glyph target, via a control point offset along
          // the wake's own flow direction — NOT a straight lerp. The
          // tangent at s=0 points toward the control point, so early
          // ASSEMBLE reads as "continuing along the wake" (spec 7's early
          // phase); lateral attraction toward the letter only dominates
          // once s is well underway (mid/late ASSEMBLE), avoiding the
          // straight point-cloud-to-text "drone show" convergence.
          vec3 control = aScatter + uLocalFlowDir * uFlowAmount;
          vec3 local = mix(mix(aScatter, control, s), mix(control, aGlyphTarget, s), s);
          // Dissolve (phase F): gentle upward drift + mild lateral
          // separation layered on top of the fully-formed glyph position —
          // never an explosion or burst.
          float dp = uDissolveProgress;
          vec3 driftDir = vec3(sin(aSeed * 6.2831853), 1.4, cos(aSeed * 6.2831853));
          local += driftDir * dp * dp * 2.2;
          // Local space only — modelViewMatrix already carries this
          // object's own position/quaternion (the shared plane frame, set
          // directly on the THREE.Points object each frame in JS), so no
          // manual right/up/forward transform is needed here.
          vec4 mv = modelViewMatrix * vec4(local, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uPixelSize * aSize / max(-mv.z, 1.0);
          vAlpha = smoothstep(0.0, 0.15, localT) * (1.0 - dp);
          vSeed = aSeed;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColor;
        uniform float uGlow, uParticleContribution;
        varying float vAlpha, vSeed;
        void main(){
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d) * 2.0;
          if (r > 1.0) discard;
          float core = smoothstep(0.35, 0.0, r);
          float halo = smoothstep(1.0, 0.25, r);
          float twinkle = 0.85 + 0.15 * sin(vSeed * 37.0);
          float shapeAlpha = clamp(core + halo * 0.5, 0.0, 1.0) * vAlpha * twinkle * uParticleContribution;
          vec3 emissive = uColor * (0.3 + core * 1.0) * uGlow;
          gl_FragColor = vec4(emissive, shapeAlpha);
        }
      `,
    });
    this.points = new THREE.Points(geo, particleMat);
    this.points.frustumCulled = false;
    this.points.visible = false;
    scene.add(this.points);

    // ---- Smooth glyph plane (spec 8's hybrid layer): the SAME rasterised
    // canvas as a texture on an ordinary plane, additively blended with an
    // HDR-capable colour (component values may exceed 1.0 — this renderer
    // uses NoToneMapping + a custom HDR post pipeline, same convention as
    // every other glowing object in this project) so it can bloom like the
    // rest of the traveler's light. ----
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    this.glyphUniforms = { uOpacity: { value: 0 } };
    this.glyphMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      toneMapped: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      color: COLOR_GLYPH.clone(),
      opacity: 0,
    });
    const glyphGeo = new THREE.PlaneGeometry(worldWidth * this.textScale, worldHeight * this.textScale);
    this.glyphMesh = new THREE.Mesh(glyphGeo, this.glyphMaterial);
    this.glyphMesh.frustumCulled = false;
    this.glyphMesh.visible = false;
    scene.add(this.glyphMesh);
    this._glyphBaseWidth = worldWidth;
    this._glyphBaseHeight = worldHeight;

    // Shared plane frame (spec 6/7) — a world-space centre fixed once per
    // cycle at formation time, plus an orientation quaternion that tracks
    // the live camera while influence > 0 and is simply left untouched
    // (frozen) once influence reaches 0. Both this.points and this.glyphMesh
    // are positioned/oriented directly from these every frame.
    this._planeCenter = new THREE.Vector3();
    this._planeQuat = new THREE.Quaternion();
    this._cyclePrepared = false;

    // Scratch (reused every frame — no per-frame allocation).
    this._tmpOffset = new THREE.Vector3();
    this._tmpTangent = new THREE.Vector3();
    this._tmpDesired = new THREE.Vector3();

    // Scratch for _computeWakeScatter (reused once per CYCLE, not per
    // frame — formation only runs once every ~travel+assemble+hold+leave+
    // dissolve seconds — but still preallocated to keep that call
    // allocation-free).
    this._tmpInvQuat = new THREE.Quaternion();
    this._tmpWakePos = new THREE.Vector3();
    this._wakeLocalX = new Float32Array(this.count);
    this._wakeLocalPos = new Float32Array(this.count * 3);
    this._wakeSortIndices = new Int32Array(this.count);

    this._ocean = null;
    this._headParticleTrail = null;
    this._camera = null;
  }

  setTint(color) {
    this.particleUniforms.uColor.value.copy(COLOR_PARTICLE).lerp(color, 0.10);
    this.glyphMaterial.color.copy(COLOR_GLYPH).lerp(color, 0.10);
  }

  setPaused(p) { this.paused = !!p; }
  restart() { this.localTime = 0; this._cyclePrepared = false; }

  setTime(t) {
    this.localTime = Math.max(0, t);
    // Re-derive phase state immediately so a debug time-jump shows correctly
    // even one frame before the next update() call.
    if (this._headParticleTrail && this._camera) this._recompute(this._headParticleTrail, this._camera);
  }

  _bounds() {
    const t1 = this.travelDuration;
    const t2 = t1 + this.assembleDuration;
    const t3 = t2 + this.holdDuration;
    const t4 = t3 + this.leaveDuration;
    const cycle = t4 + this.dissolveDuration;
    return { t1, t2, t3, t4, cycle };
  }

  getCycleLength() { return this._bounds().cycle; }

  // Minimal read-only phase query (V1.2 Auto Director compatibility, spec
  // 18) — 'travel' | 'assemble' | 'hold' | 'leave' | 'dissolve'. Exposed as
  // a method rather than encouraging direct `.phase` access so external
  // consumers have one clean, stable surface even if the internal field
  // representation ever changes.
  getPhase() { return this.phase; }

  // ---- The "readable centre" formula (spec 4/6): a world-space point
  // built along the live follow camera's OWN forward axis, scaled by a
  // FRACTION of the live camera-to-head distance, nudged down slightly.
  //
  // Deliberately placed along the CAMERA's forward axis rather than as a
  // fixed offset "behind the head" along travelDir. The follow camera's
  // chase geometry sits diagonally behind-and-beside the head and looks
  // diagonally ahead-and-past it (see main.js's headParticleFollowCam) — a
  // head-relative offset computed independently of that geometry is not
  // guaranteed to land inside the camera's actual view cone. Building the
  // point directly from the camera's own gaze guarantees it starts centred
  // in view; placing it at a FRACTION of the camera-to-head distance (< 1.0)
  // puts it closer to the camera than the head — reading as "in the wake,
  // between camera and head" — per spec 10's composition.
  //
  // Also deliberately uses LIVE camera/head state rather than querying
  // HeadParticleTrail's deterministic path at a historical time — see V1's
  // postmortem: TrailLyrics' clock and HeadParticleTrail's clock are two
  // independent timers that only happen to start together, and a historical
  // path query desyncs the moment either is scrubbed via its own setTime().
  //
  // V1.1: this is no longer read only once per cycle. It is now also the
  // "desiredCenter" that _planeCenter chases every frame while
  // positionInfluence > 0 (see _recompute) — the fix for V1's plane going
  // off-axis almost immediately after a one-shot formation. ----
  _computeDesiredCenter(headParticleTrail, camera, out) {
    const headPos = headParticleTrail.getHeadPosition(this._tmpOffset);
    const camForward = camera.getWorldDirection(this._tmpTangent);
    const distToHead = camera.position.distanceTo(headPos);
    out.copy(camera.position).addScaledVector(camForward, distToHead * this.formationDistance);
    out.y -= this.formationHeightOffset;
    return out;
  }

  // Runs once per cycle, the instant the phrase starts assembling: seeds
  // _planeCenter/_planeQuat from the live desired centre and camera
  // orientation so the very first assemble frame is already well-composed,
  // then derives this cycle's particle source positions from the live wake
  // (spec 3/4) now that the local frame they need to be expressed in exists.
  _prepareFormation(headParticleTrail, camera) {
    this._computeDesiredCenter(headParticleTrail, camera, this._planeCenter);
    this._planeQuat.copy(camera.quaternion);
    this._computeWakeScatter(headParticleTrail);
  }

  // ---- V1.2 (spec 3/4): derive this cycle's pre-assemble particle
  // positions from the SAME historical head trajectory that produced the
  // currently-visible wake (via HeadParticleTrail.getHeadPositionAtTime),
  // instead of an arbitrary local random cloud — so that at the instant
  // ASSEMBLE begins, the particles are sitting directly inside the trail
  // the viewer has been watching, not appearing from empty space.
  //
  // Source window (spec 5): each particle samples a deterministic point
  // `trailWindowMin`-`trailWindowMax` seconds behind the LIVE head-trail
  // clock (read once, here, at formation time — never TrailLyrics' own
  // clock arithmetic; see getHeadPositionAtTime's doc comment and V1's
  // clock-desync postmortem for why that distinction matters).
  //
  // Low-travel mapping (spec 8): both the wake samples and aGlyphTarget
  // (sorted once at construction) are ordered by local X and paired
  // index-for-index — a monotonic, non-crossing assignment that keeps each
  // particle's ASSEMBLE journey short and roughly left-to-right, instead of
  // an arbitrary pairing that could send a left-side wake particle flying
  // across the whole phrase to a right-side letter.
  _computeWakeScatter(headParticleTrail) {
    const count = this.count;
    this._tmpInvQuat.copy(this._planeQuat).invert();

    // Live read of the OTHER module's own clock, once, at the moment of
    // use — not TrailLyrics' own localTime.
    const headTime = headParticleTrail.localTime;
    const rand = mulberry32((this._seed ^ 0x5bd1e995) >>> 0);

    let minX = Infinity, maxX = -Infinity;
    for (let i = 0; i < count; i++) {
      const birthTimeOffset = this.trailWindowMin + rand() * (this.trailWindowMax - this.trailWindowMin);
      const sampleTime = Math.max(0, headTime - birthTimeOffset);
      headParticleTrail.getHeadPositionAtTime(sampleTime, this._tmpWakePos);

      // Small deterministic jitter matching the trail's own SPAWN_JITTER /
      // drift-sway scale (spec 6) — dust suspended around that point on the
      // wake, never a wide scatter cloud.
      this._tmpWakePos.x += (rand() - 0.5) * 0.6;
      this._tmpWakePos.y += (rand() - 0.5) * 0.5;
      this._tmpWakePos.z += (rand() - 0.5) * 0.6;

      // World -> this cycle's local plane frame (same space aGlyphTarget
      // already lives in): local = invQuat * (world - centre).
      this._tmpWakePos.sub(this._planeCenter).applyQuaternion(this._tmpInvQuat);

      this._wakeLocalPos[i * 3 + 0] = this._tmpWakePos.x;
      this._wakeLocalPos[i * 3 + 1] = this._tmpWakePos.y;
      this._wakeLocalPos[i * 3 + 2] = this._tmpWakePos.z;
      this._wakeLocalX[i] = this._tmpWakePos.x;
      this._wakeSortIndices[i] = i;
      if (this._tmpWakePos.x < minX) minX = this._tmpWakePos.x;
      if (this._tmpWakePos.x > maxX) maxX = this._tmpWakePos.x;
    }

    // Sort wake sample INDICES by local X in place (typed arrays support a
    // comparator, no extra allocation) — paired below against aGlyphTarget,
    // already X-sorted once at construction.
    this._wakeSortIndices.sort((a, b) => this._wakeLocalX[a] - this._wakeLocalX[b]);

    const scatterArr = this._aScatterAttr.array;
    const glyphArr = this.points.geometry.attributes.aGlyphTarget.array;
    let sumDist = 0, maxDist = 0;
    for (let i = 0; i < count; i++) {
      const srcIdx = this._wakeSortIndices[i];
      const sx = this._wakeLocalPos[srcIdx * 3 + 0];
      const sy = this._wakeLocalPos[srcIdx * 3 + 1];
      const sz = this._wakeLocalPos[srcIdx * 3 + 2];
      scatterArr[i * 3 + 0] = sx;
      scatterArr[i * 3 + 1] = sy;
      scatterArr[i * 3 + 2] = sz;

      const gx = glyphArr[i * 3 + 0], gy = glyphArr[i * 3 + 1], gz = glyphArr[i * 3 + 2];
      const dist = Math.hypot(gx - sx, gy - sy, gz - sz);
      sumDist += dist;
      if (dist > maxDist) maxDist = dist;
    }
    this._aScatterAttr.needsUpdate = true;

    this._lastTravelStats = {
      avgDistance: sumDist / count,
      maxDistance: maxDist,
      sourceWidth: maxX - minX,
      textWidth: this._textWorldWidth,
    };

    // Wake flow direction (spec 7): the head's CURRENT travel direction,
    // rotated into this cycle's local frame. A single shared direction
    // (rather than a per-particle historical tangent) is enough for a
    // believable "continuing along the wake" early-ASSEMBLE cue — this is
    // a local, gentle motion hint, not a precision requirement.
    this.particleUniforms.uLocalFlowDir.value
      .copy(headParticleTrail.travelDir)
      .applyQuaternion(this._tmpInvQuat)
      .normalize();
    this.particleUniforms.uFlowAmount.value = this.flowAmount;
  }

  update(dt, sceneTime, headParticleTrail, camera) {
    this._headParticleTrail = headParticleTrail;
    this._camera = camera;
    if (!this.paused && this.enabled) this.localTime += dt;
    this._recompute(headParticleTrail, camera, dt);
  }

  _recompute(headParticleTrail, camera, dt = 1 / 60) {
    if (!this.enabled || !headParticleTrail || !camera) {
      this.points.visible = false;
      this.glyphMesh.visible = false;
      return;
    }

    const { t1, t2, t3, t4, cycle } = this._bounds();
    const lt = this.localTime % cycle;

    if (lt < t1) {
      this.phase = 'travel';
      this._cyclePrepared = false;
      this.points.visible = false;
      this.glyphMesh.visible = false;
      return;
    }

    if (!this._cyclePrepared) {
      this._prepareFormation(headParticleTrail, camera);
      this._cyclePrepared = true;
    }

    if (lt < t2) this.phase = 'assemble';
    else if (lt < t3) this.phase = 'hold';
    else if (lt < t4) this.phase = 'leave';
    else this.phase = 'dissolve';

    // Orientation-influence envelope (spec 7): fully locked through ASSEMBLE
    // and the first `billboardRelease` fraction of HOLD, then a smooth
    // release across the remainder of HOLD, reaching exactly 0 by the start
    // of LEAVE — so LEAVE/DISSOLVE are always already fully world-locked.
    const orientLockEnd = t2 + (t3 - t2) * THREE.MathUtils.clamp(this.billboardRelease, 0, 1);
    let orientationInfluence;
    if (lt <= orientLockEnd) orientationInfluence = 1.0;
    else if (lt <= t3) orientationInfluence = 1.0 - smoothstep(orientLockEnd, t3, lt);
    else orientationInfluence = 0.0;

    if (orientationInfluence > 0.001) {
      const damp = 1 - Math.pow(0.0008, dt * Math.max(orientationInfluence, 0.05));
      this._planeQuat.slerp(camera.quaternion, Math.min(1, damp));
    }
    // orientationInfluence === 0 -> plane quaternion is simply left untouched (frozen).

    // Position-influence envelope (V1.1, spec 5/8) — same shape as the
    // orientation envelope by default (both tunable independently via
    // positionRelease/billboardRelease), so ASSEMBLE and early HOLD both
    // stay fully locked before releasing across the remainder of HOLD.
    const posLockEnd = t2 + (t3 - t2) * THREE.MathUtils.clamp(this.positionRelease, 0, 1);
    let positionInfluence;
    if (lt <= posLockEnd) positionInfluence = 1.0;
    else if (lt <= t3) positionInfluence = 1.0 - smoothstep(posLockEnd, t3, lt);
    else positionInfluence = 0.0;

    if (positionInfluence > 0.001) {
      // The follow RATE itself scales with positionInfluence (not just
      // gated on/off by it), so as influence ramps 1 -> 0 across late HOLD
      // the plane visibly loses momentum relative to the live desired
      // centre rather than following at full speed until an abrupt cutoff
      // (spec 6/7: "the phrase appears to lose momentum ... no snapping").
      this._computeDesiredCenter(headParticleTrail, camera, this._tmpDesired);
      const followRate = this.followSmoothing * positionInfluence;
      const posDamp = 1 - Math.pow(0.0008, dt * Math.max(followRate, 0.0001));
      this._planeCenter.lerp(this._tmpDesired, Math.min(1, posDamp));
    }
    // positionInfluence === 0 -> _planeCenter is simply left untouched
    // (frozen) — its last followed value becomes the permanent world-space
    // point the phrase is left behind at.

    this.points.position.copy(this._planeCenter);
    this.points.quaternion.copy(this._planeQuat);
    this.glyphMesh.position.copy(this._planeCenter);
    this.glyphMesh.quaternion.copy(this._planeQuat);
    this.points.visible = true;
    this.glyphMesh.visible = true;

    const assembleProgress = smoothstep(t1, t2, lt);
    const dissolveProgress = smoothstep(t4, cycle, lt);
    this.particleUniforms.uAssembleProgress.value = assembleProgress;
    this.particleUniforms.uDissolveProgress.value = dissolveProgress;

    // Glyph fades in near the very end of ASSEMBLE, once the particle
    // letter structure already reads (V1.2 spec 9: reduce the sense of a
    // finished sign suddenly fading in — tightened from V1's 0.6s window)
    // and fades out across DISSOLVE.
    const glyphFadeIn = smoothstep(t2 - Math.min(0.4, this.assembleDuration), t2, lt);
    const glyphFadeOut = 1 - dissolveProgress;
    const glyphOpacity = glyphFadeIn * glyphFadeOut;
    this.glyphMaterial.opacity = glyphOpacity * this.textGlow;

    // Particle contribution dims automatically as the glyph layer takes
    // over (never to zero — a residual sparkle stays visible around/through
    // the readable text) on top of the GUI's own manual control.
    const autoParticleFade = 1.0 - glyphOpacity * 0.5;
    this.particleUniforms.uParticleContribution.value = this.particleContribution * autoParticleFade;
  }
}
