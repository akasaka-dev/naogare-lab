import * as THREE from 'three';

// Fireworks V1 — a lightweight, GPU-driven firework burst system for the
// real-time-of-day ambient mode (see main.js's 19:00 trigger). Deliberately
// mobile-cheap: a single fixed-size THREE.Points buffer shared by every
// concurrent burst ("shell"), with all per-particle motion computed in the
// vertex shader from each shell's own birth time/origin/color (three small
// uniform arrays), so triggering a burst is just writing three values —
// no CPU-side per-particle work, no geometry rebuild, ever.
//
// Each shell plays two phases from one continuous age, both derived from
// the SAME shared particle set (no separate launch-trail system):
//   - Rise (0 -> uRiseTime): particles trail behind a rising "head" point by
//     an amount based on their own seed (TRAIL_FRACTION of uRiseTime),
//     reading as a single thin rising line/spark trail rather than a single
//     dot — a real launch, not a blob popping upward. The whole trail fades
//     to black over the last uBlackoutTime seconds of the rise (see
//     uBlackoutTime's own comment) — a real shell's fuse burning down dark
//     for a moment before it bursts.
//   - Burst (uRiseTime -> shell lifetime): particles diverge outward along
//     their own per-particle direction/speed, pulled down by gravity, with
//     a long, gradual fade at the end — the particles visibly fall and
//     drift before softly disappearing — plus a per-particle "glitter"
//     flicker (distinct from the constant gentle twinkle) so falling embers
//     sparkle on and off the way a real glitter/crackle firework does.
//
// Tuning V2 — everything an artistic pass is likely to want to adjust
// (launch speed, gravity, how long a burst lingers, brightness, the
// hot/glitter looks) lives in `this.uniforms` and has a `setXxx()` on the
// class, the same one-property-per-setter convention HeadParticleTrail.js
// uses for its own GUI-facing controls — see main.js's "Fireworks" GUI
// folder for where these are actually wired up to sliders.

// Capacity/shape constants — not exposed for live tuning since they affect
// buffer sizes (MAX_SHELLS/PARTICLES_PER_SHELL) or are pure geometry
// (TRAIL_FRACTION), not "look and feel" in the way the uniforms above are.
// Sized to comfortably fit main.js's "Salvo Size" GUI slider (1-30) firing
// entirely within one salvo, with no separate concurrency headroom needed —
// salvos are spaced far enough apart (15-25s) that one salvo's shells are
// always long finished before the next fires.
const MAX_SHELLS = 30;
const PARTICLES_PER_SHELL = 260;
// Exported as a sane fallback only — main.js now solves each shell's actual
// rise height dynamically (see its own salvoFireworkOrigins()) from where
// the true horizon sits on screen for the CURRENT camera, so a burst always
// sits a consistent distance above the horizon regardless of camera tilt,
// rather than a fixed world-space height that reads differently (or clips
// off-screen, or reads as barely-above-the-horizon) depending on the shot.
export const DEFAULT_RISE_HEIGHT = 200;
// How much of the rise the trailing line spans behind the rising head — see
// the per-particle rise-phase comment in the vertex shader below.
const TRAIL_FRACTION = 0.4;
// Sentinel birth time far enough in the past that `age` is always well past
// any shell lifetime for a shell that has never fired — no separate
// "active" flag needed anywhere, including in the shader. Also what a
// shell with a future (staggered) birth briefly reads as before its turn.
const NEVER_FIRED = -1e6;

export const FIREWORK_PALETTE = [
  0xff5a3c, // red-orange
  0xffd23b, // gold
  0x3bd6ff, // cyan
  0xff3bd0, // magenta
  0x5bff6b, // green
  0xffffff, // white
  0x9b6bff, // violet
];

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class Fireworks {
  constructor(scene, opts = {}) {
    const seed = (opts.seed ?? 9001) >>> 0;
    const rand = mulberry32(seed);
    this._time = 0;
    this._nextSlot = 0;
    // Seconds between each shell of a salvo's launch — a real salvo's shells
    // never fire in perfect lockstep. Plain JS property (not a shader
    // uniform): main.js's fireFireworkSalvo() reads this once per salvo to
    // decide each shell's trigger() birthOffset, it isn't needed on the GPU.
    this.launchStagger = 0.32;

    const count = MAX_SHELLS * PARTICLES_PER_SHELL;
    const position = new Float32Array(count * 3); // unused by the shader; required by BufferGeometry/Points
    const aSlot = new Float32Array(count);
    const aDir = new Float32Array(count * 3);
    const aSpeed = new Float32Array(count);
    const aSize = new Float32Array(count);
    const aSeed = new Float32Array(count);

    for (let s = 0; s < MAX_SHELLS; s++) {
      for (let i = 0; i < PARTICLES_PER_SHELL; i++) {
        const idx = s * PARTICLES_PER_SHELL + i;
        aSlot[idx] = s;
        // Direction on a sphere, biased upward for a rounded "dome" burst
        // rather than a flat sphere half of which is wasted below origin.
        const u = rand() * 2 - 1;
        const theta = rand() * Math.PI * 2;
        const ringR = Math.sqrt(Math.max(0, 1 - u * u));
        const dx = Math.cos(theta) * ringR;
        const dz = Math.sin(theta) * ringR;
        const dy = u * 0.55 + 0.45;
        const len = Math.hypot(dx, dy, dz) || 1;
        aDir[idx * 3 + 0] = dx / len;
        aDir[idx * 3 + 1] = dy / len;
        aDir[idx * 3 + 2] = dz / len;
        aSpeed[idx] = 34 + rand() * 44;
        aSize[idx] = 1.1 + rand() * 1.0;
        aSeed[idx] = rand();
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(position, 3));
    geo.setAttribute('aSlot', new THREE.BufferAttribute(aSlot, 1));
    geo.setAttribute('aDir', new THREE.BufferAttribute(aDir, 3));
    geo.setAttribute('aSpeed', new THREE.BufferAttribute(aSpeed, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(aSize, 1));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(aSeed, 1));

    this.uniforms = {
      uTime: { value: 0 },
      uPixelSize: { value: 200.0 },
      // Slower than the original 0.6 — a real rocket's climb reads as
      // noticeably more leisurely than that.
      uRiseTime: { value: 2.15 },
      // Gentler than a real-world 9.8+ — a slower fall over a long lifetime
      // is what makes the embers look like they're drifting down, not just
      // falling for longer at the same speed.
      uGravity: { value: 40.0 },
      // Long on purpose: real firework embers hang, drift, and fade
      // gradually rather than popping and vanishing.
      uBurstLifetime: { value: 3.5 },
      // Fraction of uBurstLifetime where the fade-to-transparent begins —
      // particles stay bright for the first slice, then spend the rest
      // gradually dimming out, instead of a short pop-then-fade.
      uFadeStart: { value: 0.09 },
      // Overall body-colour multiplier (hue-preserving) — same role as
      // HeadParticleTrail's own uBrightness.
      uBrightness: { value: 3.0 },
      // Strength of the brief white-hot HDR flash right as a shell bursts,
      // on top of uBrightness — 0 disables it entirely (plain saturated
      // colour from the moment of burst).
      uHotIntensity: { value: 2.85 },
      // 0 = the old constant gentle shimmer only; 1 = full on/off glitter —
      // see the fragment shader for how the two combine. This is the
      // "falling embers sparkle/flicker" effect specifically.
      uGlitterIntensity: { value: 0.6 },
      // How many times per second the glitter flicker can change state.
      uGlitterSpeed: { value: 31.5 },
      // Real shells briefly go dark — the fuse burning down inside the
      // shell casing — between the visible rising trail and the burst
      // itself. This is how many seconds of that "blackout" happen right
      // before uRiseTime, fading the WHOLE trail (not just its tail) to
      // nothing so the burst's hot flash reads as a genuine sudden bloom
      // out of darkness rather than a continuous glow. 0 disables it
      // (the trail simply stays lit until the instant it bursts).
      uBlackoutTime: { value: 0.5 },
      uShellBirth: { value: new Array(MAX_SHELLS).fill(NEVER_FIRED) },
      uShellOrigin: { value: Array.from({ length: MAX_SHELLS }, () => new THREE.Vector3()) },
      uShellColor: { value: Array.from({ length: MAX_SHELLS }, () => new THREE.Color()) },
      // Per-shell, not a shared constant — see trigger()'s own riseHeight
      // parameter and DEFAULT_RISE_HEIGHT's comment above for why.
      uShellRiseHeight: { value: new Array(MAX_SHELLS).fill(DEFAULT_RISE_HEIGHT) },
    };

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      toneMapped: false,
      blending: THREE.AdditiveBlending,
      uniforms: this.uniforms,
      defines: { MAX_SHELLS: String(MAX_SHELLS) },
      vertexShader: /* glsl */ `
        precision highp float;
        attribute float aSlot, aSpeed, aSize, aSeed;
        attribute vec3 aDir;
        uniform float uTime, uPixelSize;
        uniform float uRiseTime, uGravity, uBurstLifetime, uFadeStart;
        uniform float uGlitterIntensity, uGlitterSpeed, uBlackoutTime;
        uniform float uShellBirth[MAX_SHELLS];
        uniform vec3 uShellOrigin[MAX_SHELLS];
        uniform vec3 uShellColor[MAX_SHELLS];
        uniform float uShellRiseHeight[MAX_SHELLS];
        varying float vAlpha, vBurstAge;
        varying vec3 vColor;

        const float TRAIL_FRACTION = ${TRAIL_FRACTION.toFixed(4)};

        // Cheap deterministic pseudo-random hash — used only to decide the
        // glitter flicker's on/off state per particle per time-step, never
        // for anything that needs to look uniform or high quality.
        float hash(float n) { return fract(sin(n) * 43758.5453123); }

        void main() {
          int slot = int(aSlot);
          float birth = uShellBirth[slot];
          vec3 origin = uShellOrigin[slot];
          float riseHeight = uShellRiseHeight[slot];
          vColor = uShellColor[slot];
          float age = uTime - birth;
          float shellLifetime = uRiseTime + uBurstLifetime;
          float alive = step(0.0, age) * step(age, shellLifetime);

          vec3 pos;
          float sizeMul;
          float trailFade = 1.0;
          float glitter = 1.0;
          if (age < uRiseTime) {
            // Rise: a thin trailing LINE, not a single converging dot.
            // headT is how far the rising point itself has climbed; each
            // particle lags behind it by up to TRAIL_FRACTION of the rise
            // (scaled by its own aSeed, so particles are spread continuously
            // along the trail rather than clumped) — aSeed=0 rides right at
            // the bright head, aSeed=1 sits at the fading tail. Clamped to
            // 0 so nothing is ever placed below the actual launch point.
            float headT = clamp(age / uRiseTime, 0.0, 1.0);
            float particleT = clamp(headT - aSeed * TRAIL_FRACTION, 0.0, headT);
            pos = origin + vec3(0.0, -riseHeight * (1.0 - particleT), 0.0);
            float behindHead = headT - particleT; // 0 at the head, up to TRAIL_FRACTION at the tail
            trailFade = 1.0 - clamp(behindHead / TRAIL_FRACTION, 0.0, 1.0);
            sizeMul = mix(0.75, 0.35, 1.0 - trailFade); // thin throughout; head a little fuller than the tail
            // Blackout before the bloom — real shells go dark QUICKLY (the
            // fuse burning down out of view inside the casing), STAY dark
            // for a beat, then the burst is a sudden reveal — not a slow
            // fade that's already dim well before the burst. uBlackoutTime
            // is the DARK duration; the snap-to-dark transition itself is
            // always this same short, fixed length regardless of
            // uBlackoutTime, so a bigger uBlackoutTime means "dark for
            // longer", never "fades out more slowly".
            const float BLACKOUT_SNAP = 0.12;
            float blackoutStart = uRiseTime - uBlackoutTime - BLACKOUT_SNAP;
            float blackout = uBlackoutTime > 0.0001
              ? 1.0 - smoothstep(blackoutStart, blackoutStart + BLACKOUT_SNAP, age)
              : 1.0;
            trailFade *= blackout;
            sizeMul *= blackout;
            vBurstAge = 0.0;
          } else {
            float burstAge = age - uRiseTime;
            float bn = clamp(burstAge / uBurstLifetime, 0.0, 1.0);
            pos = origin + aDir * aSpeed * burstAge;
            pos.y -= 0.5 * uGravity * burstAge * burstAge;
            sizeMul = mix(1.1, 0.4, bn);
            vBurstAge = bn;

            // Glitter/crackle — a per-particle flicker that steps between
            // dim and bright a few times a second, distinct from (and on
            // top of) the smooth constant twinkle below: that alone reads
            // as a gentle shimmer, not the flickering sparkle of real
            // falling embers. Ramps in over the first bit of the burst
            // (smoothstep below) so the initial flash isn't itself
            // flickering — it's specifically a "while falling" effect.
            float glitterPhase = floor(uTime * uGlitterSpeed + aSeed * 97.0);
            float glitterOn = step(0.5, hash(glitterPhase * 12.9898 + aSeed * 78.233));
            float glitterAmount = uGlitterIntensity * smoothstep(0.08, 0.3, bn);
            glitter = mix(1.0, mix(0.15, 1.5, glitterOn), glitterAmount);
          }

          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = uPixelSize * aSize * sizeMul / max(-mv.z, 1.0);

          float fadeOut = age < uRiseTime ? trailFade : (1.0 - smoothstep(uFadeStart, 1.0, vBurstAge));
          float twinkle = 0.85 + 0.15 * sin(aSeed * 41.0 + uTime * 9.0);
          vAlpha = alive * fadeOut * twinkle * glitter;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform float uBrightness, uHotIntensity;
        varying float vAlpha, vBurstAge;
        varying vec3 vColor;
        void main() {
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d) * 2.0;
          if (r > 1.0) discard;
          float core = smoothstep(0.4, 0.0, r);
          float halo = smoothstep(1.0, 0.3, r);
          float shapeAlpha = clamp(core + halo * 0.5, 0.0, 1.0) * vAlpha;
          // Flashy HDR pop early in the burst, settling to the plain
          // saturated colour as it ages and fades — same "highlight energy
          // only while young" trick used by HeadParticleTrail's particles.
          float hot = (1.0 - smoothstep(0.0, 0.35, vBurstAge)) * step(0.0001, uHotIntensity);
          vec3 color = mix(vColor, vec3(1.0), 0.55 * hot) * uBrightness * (1.0 + hot * uHotIntensity);
          gl_FragColor = vec4(color, shapeAlpha);
        }
      `,
    });

    this.points = new THREE.Points(geo, mat);
    this.points.frustumCulled = false; // shader-driven positions can be anywhere; a static bounding sphere would be wrong
    scene.add(this.points);
  }

  // Fires the next shell (round-robin over MAX_SHELLS — the oldest shell,
  // if still mid-burst, is simply cut off, which is inaudible/invisible in
  // practice since triggers are spaced far apart relative to a shell's own
  // lifetime). `birthOffset` (seconds, default 0) delays this shell's start
  // — main.js's fireFireworkSalvo() staggers a salvo's shells with this
  // rather than firing all of them in perfect lockstep. `riseHeight`
  // (world units, default DEFAULT_RISE_HEIGHT) is how far above `origin`'s
  // launch point (origin.y - riseHeight) this specific shell's rise starts
  // — main.js solves this per shell from the current camera/horizon so the
  // burst always sits a consistent distance above the horizon on screen.
  trigger(origin, colorHex, birthOffset = 0, riseHeight = DEFAULT_RISE_HEIGHT) {
    const slot = this._nextSlot;
    this._nextSlot = (this._nextSlot + 1) % MAX_SHELLS;
    this.uniforms.uShellBirth.value[slot] = this._time + birthOffset;
    this.uniforms.uShellOrigin.value[slot].copy(origin);
    this.uniforms.uShellColor.value[slot].set(colorHex);
    this.uniforms.uShellRiseHeight.value[slot] = riseHeight;
  }

  update(dt) {
    this._time += dt;
    this.uniforms.uTime.value = this._time;
  }

  // GUI-facing setters — one property each, matching HeadParticleTrail.js's
  // own convention for the same reason: simple 1:1 binding from a lil-gui
  // slider's onChange to a single uniform.
  setPixelSize(v) { this.uniforms.uPixelSize.value = v; }
  setRiseTime(v) { this.uniforms.uRiseTime.value = v; }
  setGravity(v) { this.uniforms.uGravity.value = v; }
  setBurstLifetime(v) { this.uniforms.uBurstLifetime.value = v; }
  setFadeStart(v) { this.uniforms.uFadeStart.value = v; }
  setBrightness(v) { this.uniforms.uBrightness.value = v; }
  setHotIntensity(v) { this.uniforms.uHotIntensity.value = v; }
  setGlitterIntensity(v) { this.uniforms.uGlitterIntensity.value = v; }
  setGlitterSpeed(v) { this.uniforms.uGlitterSpeed.value = v; }
  setBlackoutTime(v) { this.uniforms.uBlackoutTime.value = v; }
  setLaunchStagger(v) { this.launchStagger = v; }

  dispose() {
    this.points.geometry.dispose();
    this.points.material.dispose();
    this.points.parent?.remove(this.points);
  }
}
