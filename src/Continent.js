import * as THREE from 'three';
import { NOISE, ATMOSPHERE } from './shaders/common.js';

// Distant Continent V1 — a far-off mountain coastline sitting on the horizon,
// as a cheap backdrop rather than real terrain: one polar-grid strip
// (~10k vertices, built once on the CPU) spanning an arc of azimuth around
// the camera, re-centred under the camera every frame (translation only, so
// it stays fixed in WORLD DIRECTION while the camera turns, but can never be
// reached however far the traveler flies — the ocean grid itself only
// reaches ~3000 out, so a world-anchored landmass would end up floating on
// sky haze once the traveler drifted away from it).
//
// Haze: fades toward the exact colour the ocean's own distance fog and the
// sky dome resolve to at the horizon — atmosphere() evaluated along the same
// near-horizontal view direction Ocean.js's fog uses — via the Sky's
// uniform objects shared BY REFERENCE (time of day, night, moon, clouds all
// follow automatically, nothing to sync per frame).
//
// Too far for Ocean.js's screen-space reflection march (~200 units max), so
// it does not mirror on the water — at this distance and haze that's
// barely perceptible anyway.

const ARC_SEGMENTS = 384;
const RADIAL_SEGMENTS = 24;

function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// 1D value-noise fbm over a precomputed random lattice — ridge profiles
// only need one dimension (azimuth), so no need to port the 2D GLSL noise.
function makeNoise1D(rand, size = 512) {
  const lattice = new Float32Array(size);
  for (let i = 0; i < size; i++) lattice[i] = rand();
  const noise = (x) => {
    const i = Math.floor(x);
    const f = x - i;
    const u = f * f * (3 - 2 * f);
    const a = lattice[((i % size) + size) % size];
    const b = lattice[(((i + 1) % size) + size) % size];
    return a + (b - a) * u;
  };
  return (x, octaves = 5) => {
    let sum = 0, amp = 0.5, norm = 0;
    for (let o = 0; o < octaves; o++) {
      sum += amp * noise(x);
      norm += amp;
      x *= 2.03;
      amp *= 0.5;
    }
    return sum / norm;
  };
}

export class Continent {
  constructor(skyUniforms, opts = {}) {
    this.enabled = true;
    this.params = {
      distance: opts.distance ?? 2600, // shoreline radius from the camera
      depth: opts.depth ?? 700,        // shoreline -> back ridge
      height: opts.height ?? 230,      // tallest peak
      azimuthDeg: opts.azimuthDeg ?? 35, // arc centre, degrees from -Z toward +X
      arcDeg: opts.arcDeg ?? 110,      // angular width of the landmass
      seed: opts.seed ?? 7,
    };

    this.uniforms = {
      // Shared by reference with the Sky so atmosphere() matches it exactly.
      uSunDir: skyUniforms.uSunDir,
      uTime: skyUniforms.uTime,
      uCloudCover: skyUniforms.uCloudCover,
      uNightAmount: skyUniforms.uNightAmount,
      uMoonDir: skyUniforms.uMoonDir,
      uMoonColor: skyUniforms.uMoonColor,
      uMoonIntensity: skyUniforms.uMoonIntensity,
      uStarVisibility: skyUniforms.uStarVisibility,
      uHaze: { value: opts.haze ?? 0.00034 },
      uRockColor: { value: new THREE.Color(0.20, 0.23, 0.21) },
      uGreenColor: { value: new THREE.Color(0.13, 0.20, 0.12) },
    };

    const material = new THREE.ShaderMaterial({
      toneMapped: false,
      uniforms: this.uniforms,
      vertexShader: /* glsl */ `
        attribute float aRidge;
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying float vRidge;
        void main(){
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          vNormal = normalize(mat3(modelMatrix) * normal);
          vRidge = aRidge;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3  uSunDir;
        uniform float uTime;
        uniform float uCloudCover;
        uniform float uNightAmount;
        uniform vec3  uMoonDir;
        uniform vec3  uMoonColor;
        uniform float uMoonIntensity;
        uniform float uStarVisibility;
        uniform float uHaze;
        uniform vec3  uRockColor;
        uniform vec3  uGreenColor;
        varying vec3 vWorldPos;
        varying vec3 vNormal;
        varying float vRidge;
        ${NOISE}
        ${ATMOSPHERE}
        void main(){
          vec3 sunDir = normalize(uSunDir);
          vec3 N = normalize(vNormal);
          vec3 toFrag = vWorldPos - cameraPosition;
          float dist = length(toFrag);

          // Greener lowlands, barer rock toward the ridgeline and on steep faces.
          float rocky = clamp(vRidge * 1.2 + (1.0 - N.y) * 0.8, 0.0, 1.0);
          vec3 albedo = mix(uGreenColor, uRockColor, rocky);

          float ndl = clamp(dot(N, sunDir), 0.0, 1.0);
          vec3 color = albedo * (0.45 * vec3(0.35, 0.5, 0.7) + 1.0 * ndl);
          float moonNdl = clamp(dot(N, uMoonDir), 0.0, 1.0);
          vec3 nightColor = albedo * (0.5 * vec3(0.07, 0.10, 0.21) + uMoonColor * moonNdl * uMoonIntensity * 0.25);
          color = mix(color, nightColor, uNightAmount);

          // Same haze colour as Ocean.js's distance fog (capped the same way
          // so the bright sun disk can't leak in), slightly thinner with
          // altitude so peaks read through a touch more than the shoreline.
          vec3 horizonDir = normalize(vec3(toFrag.x, 0.02 * dist, toFrag.z));
          vec3 fogCol = min(atmosphere(horizonDir, sunDir), vec3(1.6));
          float heightThin = mix(1.0, 0.8, clamp(vWorldPos.y / 300.0, 0.0, 1.0));
          float fogAmt = 1.0 - exp(-dist * uHaze * heightThin);
          color = mix(color, fogCol, clamp(fogAmt, 0.0, 1.0));

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    this.mesh = new THREE.Mesh(this._buildGeometry(), material);
    this.mesh.frustumCulled = false;
  }

  _buildGeometry() {
    const { distance, depth, height, azimuthDeg, arcDeg, seed } = this.params;
    const rand = mulberry32(seed);
    const ridgeNoise = makeNoise1D(rand);
    const detailNoise = makeNoise1D(rand);
    const coastNoise = makeNoise1D(rand);
    const center = THREE.MathUtils.degToRad(azimuthDeg);
    const arc = THREE.MathUtils.degToRad(arcDeg);

    const cols = ARC_SEGMENTS + 1;
    const rows = RADIAL_SEGMENTS + 1;
    const positions = new Float32Array(cols * rows * 3);
    const ridgeAttr = new Float32Array(cols * rows);
    for (let i = 0; i < cols; i++) {
      const u = i / ARC_SEGMENTS;               // 0..1 along the arc
      const theta = center + (u - 0.5) * arc;
      // Taper both ends down into the sea so the landmass has natural capes
      // instead of a cut-off edge.
      const envelope = Math.pow(Math.sin(Math.PI * u), 0.6);
      const ridge = Math.pow(ridgeNoise(u * 9.0, 5), 1.6) * 1.9;
      const peak = height * envelope * Math.min(ridge, 1.0);
      // Wobbly coastline (bays/headlands), in world units of radius.
      const coast = (coastNoise(u * 14.0, 4) - 0.5) * 260;
      for (let j = 0; j < rows; j++) {
        const v = j / RADIAL_SEGMENTS;          // 0 = shoreline, 1 = back
        const r = distance + coast * (1 - v) + depth * v;
        // Rises off the beach, crests around 60% back, falls slightly behind.
        const profile = Math.pow(Math.sin(Math.min(v / 0.6, 1) * Math.PI / 2), 1.4) * (v > 0.6 ? 1 - (v - 0.6) * 0.5 : 1);
        const roughness = (detailNoise(u * 60.0 + v * 7.0, 4) - 0.5) * 0.35;
        const y = -6 + Math.max(0, peak * profile * (1 + roughness));
        const k = i * rows + j;
        positions[k * 3 + 0] = Math.sin(theta) * r;
        positions[k * 3 + 1] = y;
        positions[k * 3 + 2] = -Math.cos(theta) * r;
        ridgeAttr[k] = height > 0 ? y / height : 0;
      }
    }

    const indices = [];
    for (let i = 0; i < ARC_SEGMENTS; i++) {
      for (let j = 0; j < RADIAL_SEGMENTS; j++) {
        const a = i * rows + j;
        const b = (i + 1) * rows + j;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aRidge', new THREE.BufferAttribute(ridgeAttr, 1));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }

  // Rebuilds the strip after a shape parameter change (GUI) — a one-off
  // CPU rebuild of ~10k vertices, never per frame.
  setParams(params) {
    Object.assign(this.params, params);
    const old = this.mesh.geometry;
    this.mesh.geometry = this._buildGeometry();
    old.dispose();
  }

  update(camera, underwater) {
    this.mesh.position.set(camera.position.x, 0, camera.position.z);
    // Seen from below the surface it would hang in the water haze beyond the
    // ocean grid's edge — simply hide it there.
    // Width 0 (reachable via Random mode) means "no continent this time" —
    // also avoids drawing a degenerate zero-area strip.
    this.mesh.visible = this.enabled && !underwater && this.params.arcDeg >= 1;
  }
}
