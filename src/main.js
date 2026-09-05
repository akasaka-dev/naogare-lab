import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

import { Sky } from './Sky.js';
import { Ocean, OCEAN_CONFIG, MAX_FOAM_BODIES } from './Ocean.js';
import { Floor } from './Floor.js';
import { Island } from './Island.js';
import { Particles } from './Particles.js';
import { Post } from './Post.js';
import { FloatingBodies } from './FloatingBodies.js';
import { Clouds } from './Clouds.js';
import { Birds } from './Birds.js';

// ---------------------------------------------------------------------------
//  Boot
// ---------------------------------------------------------------------------
const container = document.getElementById('app');
const bootEl = document.getElementById('boot');
const hintEl = document.getElementById('hint');
const depthEl = document.getElementById('depth');
const depthStateEl = document.getElementById('depth-state');
const depthValEl = document.getElementById('depth-val');

const sizeW = () => window.innerWidth;
const sizeH = () => window.innerHeight;

// Surface any runtime/GPU error onto the boot screen instead of hanging on it.
function showFatal(msg) {
  const small = bootEl && bootEl.querySelector('small');
  if (small) small.textContent = String(msg).slice(0, 220);
  const h1 = bootEl && bootEl.querySelector('h1');
  if (h1) h1.textContent = 'Error';
  if (bootEl) bootEl.classList.remove('hidden');
}
window.addEventListener('error', (e) => showFatal(e.message || e.error));
window.addEventListener('unhandledrejection', (e) => showFatal(e.reason));

// ---------------------------------------------------------------------------
//  Renderer  (linear HDR pipeline — tone-mapping happens in the post composite)
// ---------------------------------------------------------------------------
const renderer = new THREE.WebGLRenderer({
  antialias: true,
  powerPreference: 'high-performance',
  stencil: false,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizeW(), sizeH());
renderer.toneMapping = THREE.NoToneMapping;
renderer.autoClear = true;
container.appendChild(renderer.domElement);

// Report GLSL compile/link errors to the boot overlay + console.
renderer.debug.onShaderError = (gl, program, vs, fs) => {
  const log = (s, label) => {
    const info = gl.getShaderInfoLog(s) || '';
    if (info.trim()) console.error(`[${label}] ${info}`);
    return info;
  };
  const v = log(vs, 'vertex');
  const f = log(fs, 'fragment');
  showFatal('Shader error — see console. ' + (f || v));
};

// ---------------------------------------------------------------------------
//  Sun / time of day
// ---------------------------------------------------------------------------
const sunParams = { elevation: 22, azimuth: 108 };
const sunDir = new THREE.Vector3();
function updateSunDir() {
  const el = THREE.MathUtils.degToRad(sunParams.elevation);
  const az = THREE.MathUtils.degToRad(sunParams.azimuth);
  const h = Math.cos(el);
  sunDir.set(Math.cos(az) * h, Math.sin(el), Math.sin(az) * h).normalize();
}
updateSunDir();

// Night V1 (opt-in) — an independent celestial direction alongside the sun
// (not a replacement for it), so both can coexist. Same elevation/azimuth
// convention as the sun; no motion/astronomical simulation for V1.
const moonParams = { elevation: 20, azimuth: 255 };
const moonDir = new THREE.Vector3();
function updateMoonDir() {
  const el = THREE.MathUtils.degToRad(moonParams.elevation);
  const az = THREE.MathUtils.degToRad(moonParams.azimuth);
  const h = Math.cos(el);
  moonDir.set(Math.cos(az) * h, Math.sin(el), Math.sin(az) * h).normalize();
}
updateMoonDir();

// ---------------------------------------------------------------------------
//  Scene graph
// ---------------------------------------------------------------------------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(58, sizeW() / sizeH(), 0.1, 8000);
camera.position.set(0, 14, 48);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.target.set(0, 2, 0);
controls.minDistance = 3;
controls.maxDistance = 400;
controls.maxPolarAngle = Math.PI * 0.98;
controls.enablePan = true;
controls.screenSpacePanning = true; // let vertical pan carry the camera under
controls.autoRotateSpeed = 0.4;    // used by the cinematic-camera toggle

const FLOOR_DEPTH = 22;

const sky = new Sky(sunDir);
scene.add(sky.mesh);

const ocean = new Ocean(sunDir, new THREE.Vector2(sizeW(), sizeH()));
ocean.uniforms.uNear.value = camera.near;
ocean.uniforms.uFar.value = camera.far;
scene.add(ocean.mesh);

const floor = new Floor(sunDir, FLOOR_DEPTH);
scene.add(floor.mesh);

const island = new Island(sunDir, FLOOR_DEPTH, ocean.uniforms);
scene.add(island.mesh);

const particles = new Particles(5000, 160);
scene.add(particles.points);

// ---------------------------------------------------------------------------
//  Bird Demo V1 — opt-in via ?birds=1. When absent, none of this runs: no
//  birds, no bird GUI, no camera/preset override. See Birds.js.
// ---------------------------------------------------------------------------
const birdDemoEnabled = new URLSearchParams(window.location.search).get('birds') === '1';
const birds = birdDemoEnabled ? new Birds(scene, { seed: 1337, count: 3 }) : null;
let birdClock = 0;
let birdPaused = false;
const birdDemoState = { time: 0 };

// ---------------------------------------------------------------------------
//  Cinematic Sunset V1 — opt-in via ?cinematicSunset=1. When absent, ocean
//  uniforms default to a neutral uSunsetAmount = 0 (see Ocean.js) and none of
//  this runs: no GUI folder, no preset override, no other visual change.
// ---------------------------------------------------------------------------
const cinematicSunsetEnabled = new URLSearchParams(window.location.search).get('cinematicSunset') === '1';
const SUNSET_START_AMOUNT = 0.75; // moderate-strong — natural-cinematic, not an extreme red sea

// ---------------------------------------------------------------------------
//  Night V1 — opt-in via ?night=1. When absent, uNightAmount stays 0 (see
//  Ocean.js/Sky.js/Island.js/Floor.js) and none of this runs: no GUI folder,
//  no state change, no other visual change.
// ---------------------------------------------------------------------------
const nightEnabled = new URLSearchParams(window.location.search).get('night') === '1';
const NIGHT_SUN_ELEVATION = -35; // well below the horizon — sun contribution stays low but non-zero
const NIGHT_MOON_INTENSITY = 0.52;
const NIGHT_STAR_VISIBILITY = 0.55; // "high but not maximum"
const NIGHT_EXPOSURE = 0.85;
const NIGHT_BLOOM = 0.15; // dark backgrounds make bloom halos read much larger than in daylight
const NIGHT_CLOUD_MOONLIGHT = 0.6;

// Lights — only the dropped primitives (MeshStandardMaterial) use these; the
// ocean/island/sky are raw ShaderMaterials and ignore scene lights.
const sunLight = new THREE.DirectionalLight(0xfff2e0, 3.0);
scene.add(sunLight, sunLight.target);
const skyLight = new THREE.HemisphereLight(0xbfe4ff, 0x24424e, 1.1);
scene.add(skyLight);
// Night V1 (opt-in) — a separate, independent light so birds/dropped objects
// can catch a dim, cool moonlit edge; intensity is 0 until Night mode raises
// it, so normal/day/sunset lighting is unaffected.
const moonLight = new THREE.DirectionalLight(0xdfe6f0, 0.0);
scene.add(moonLight, moonLight.target);

// Dropped, buoyant primitives (spheres / cubes).
const bodies = new FloatingBodies(scene);
const terrainAt = (x, z) => island.heightAt(x, z);

function dropObject(type, x, z) {
  bodies.spawn(type, x, z, ocean.heightAt(x, z, time));
}
function dropAtTarget(type) {
  const t = controls.target;
  dropObject(type, t.x + (Math.random() - 0.5) * 10, t.z + (Math.random() - 0.5) * 10);
}

// ---------------------------------------------------------------------------
//  Render targets  (full-res, half-float, with depth textures)
// ---------------------------------------------------------------------------
function makeSceneRT(w, h) {
  const rt = new THREE.WebGLRenderTarget(w, h, {
    type: THREE.HalfFloatType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: true,
  });
  rt.depthTexture = new THREE.DepthTexture(w, h);
  rt.depthTexture.type = THREE.UnsignedIntType;
  return rt;
}
let refractionRT = makeSceneRT(sizeW(), sizeH());
let hdrRT = makeSceneRT(sizeW(), sizeH());

ocean.uniforms.uRefractionTex.value = refractionRT.texture;
ocean.uniforms.uDepthTex.value = refractionRT.depthTexture;

const post = new Post(renderer, sizeW(), sizeH(), sunDir, OCEAN_CONFIG.deepColor);

// Volumetric sky clouds (on by default; half-res + temporal reprojection keeps
// them cheap). When on, the flat procedural clouds in the atmosphere fade back
// so the sky isn't doubled, and they cast moving shadows on the sea.
const clouds = new Clouds(renderer, sizeW(), sizeH(), { scale: 0.5 });
const cloudShadowP = { strength: 0.5 };
function setCloudsEnabled(on) {
  clouds.enabled = on;
  const cover = on ? 0.25 : 1.0;
  sky.uniforms.uCloudCover.value = cover;
  ocean.uniforms.uCloudCover.value = cover;
  if (!on) ocean.uniforms.uCloudShadow.value = 0;
}

// ---------------------------------------------------------------------------
//  Sun propagation
// ---------------------------------------------------------------------------
function applySun() {
  updateSunDir();
  sky.setSun(sunDir);
  ocean.setSun(sunDir);
  floor.setSun(sunDir);
  island.setSun(sunDir);
  post.underwaterMat.uniforms.uSunDir.value.copy(sunDir);
  clouds.setSun(sunDir);
  // Point the primitives' key light along the sun; warmer & dimmer near sunset.
  sunLight.position.copy(sunDir).multiplyScalar(300);
  sunLight.target.position.set(0, 0, 0);
  sunLight.intensity = 0.6 + 3.0 * Math.max(sunDir.y, 0.0);
}

// Night V1 (opt-in) — independent of applySun(); moonLight.intensity stays 0
// (see its construction above) until Night mode raises it.
function applyMoon() {
  updateMoonDir();
  sky.setMoon(moonDir);
  ocean.setMoon(moonDir);
  floor.setMoon(moonDir);
  island.setMoon(moonDir);
  clouds.setMoon(moonDir);
  moonLight.position.copy(moonDir).multiplyScalar(300);
  moonLight.target.position.set(0, 0, 0);
}

// ---------------------------------------------------------------------------
//  Cinematic presets — curated sun + water + wave + post looks.
// ---------------------------------------------------------------------------
const PRESETS = {
  'Tropical Noon': {
    sun: { el: 60, az: 125 }, amplitude: 0.7, choppy: 0.5, speed: 1.0, waveCount: 26,
    exposure: 1.05, bloom: 0.5, clarity: 1.3, depthFalloff: 0.16, sunGlitter: 0, sss: 0.35,
    deep: '#063049', shallow: '#5fc6c2', foam: '#f6fdff', foamCoverage: 0.9, crestFoamStart: 1.4,
    fog: 1.0, shafts: 0.05,
    roughness: 0.06, cloudCoverage: 0.34, saturation: 1.08,
  },
  'Golden Hour': {
    sun: { el: 8, az: 205 }, amplitude: 0.9, choppy: 0.6, speed: 0.9, waveCount: 26,
    exposure: 1.15, bloom: 0.95, clarity: 1.0, depthFalloff: 0.18, sunGlitter: 0.55, sss: 0.55,
    deep: '#08283b', shallow: '#3f9f9a', foam: '#fff1df', foamCoverage: 0.85, crestFoamStart: 1.5,
    fog: 1.0, shafts: 0.06,
    roughness: 0.09, cloudCoverage: 0.45, saturation: 1.1,
  },
  'Crimson Sunset': {
    sun: { el: 1.5, az: 250 }, amplitude: 1.0, choppy: 0.7, speed: 0.95, waveCount: 24,
    exposure: 1.2, bloom: 1.15, clarity: 0.9, depthFalloff: 0.2, sunGlitter: 0.6, sss: 0.5,
    deep: '#0e1524', shallow: '#33707a', foam: '#ffe4cf', foamCoverage: 0.9, crestFoamStart: 1.4,
    fog: 1.1, shafts: 0.05,
    roughness: 0.11, cloudCoverage: 0.52, saturation: 1.12,
  },
  'Blue Hour': {
    sun: { el: 2.5, az: 292 }, amplitude: 0.6, choppy: 0.5, speed: 0.8, waveCount: 24,
    exposure: 0.9, bloom: 0.6, clarity: 1.0, depthFalloff: 0.2, sunGlitter: 0.4, sss: 0.3,
    deep: '#050f1e', shallow: '#295a72', foam: '#dbe8f2', foamCoverage: 0.9, crestFoamStart: 1.5,
    fog: 1.1, shafts: 0.04,
    roughness: 0.08, cloudCoverage: 0.42, saturation: 1.0,
  },
  'Clear Dawn': {
    sun: { el: 14, az: 95 }, amplitude: 0.55, choppy: 0.45, speed: 0.85, waveCount: 26,
    exposure: 1.05, bloom: 0.7, clarity: 1.4, depthFalloff: 0.15, sunGlitter: 0.45, sss: 0.4,
    deep: '#073246', shallow: '#63c7c0', foam: '#eefaff', foamCoverage: 0.85, crestFoamStart: 1.6,
    fog: 1.0, shafts: 0.06,
    roughness: 0.06, cloudCoverage: 0.28, saturation: 1.06,
  },
  'Stormy Seas': {
    sun: { el: 18, az: 100 }, amplitude: 1.8, choppy: 1.05, speed: 1.6, waveCount: 32,
    exposure: 0.95, bloom: 0.4, clarity: 0.7, depthFalloff: 0.22, sunGlitter: 0.2, sss: 0.25,
    deep: '#0a1a20', shallow: '#38666a', foam: '#eef3f5', foamCoverage: 1.05, crestFoamStart: 1.3,
    fog: 1.35, shafts: 0.05,
    roughness: 0.22, cloudCoverage: 0.7, cloudDensity: 1.5, saturation: 0.92,
  },
};

function applyPreset(name) {
  const P = PRESETS[name];
  if (!P) return;
  const u = ocean.uniforms;
  if (P.sun) { sunParams.elevation = P.sun.el; sunParams.azimuth = P.sun.az; }
  const set = (k, v) => { if (v !== undefined) u[k].value = v; };
  set('uAmplitude', P.amplitude); set('uChoppy', P.choppy); set('uSpeed', P.speed);
  set('uWaveCount', P.waveCount); set('uClarity', P.clarity); set('uDepthFalloff', P.depthFalloff);
  set('uSunGlitter', P.sunGlitter); set('uSSSStrength', P.sss); set('uRoughness', P.roughness);
  set('uFoamCoverage', P.foamCoverage); set('uCrestFoamStart', P.crestFoamStart);
  if (P.deep) u.uDeepColor.value.set(P.deep);
  if (P.shallow) u.uShallowColor.value.set(P.shallow);
  if (P.foam) u.uFoamColor.value.set(P.foam);
  if (P.exposure !== undefined) post.compositeMat.uniforms.uExposure.value = P.exposure;
  if (P.bloom !== undefined) post.compositeMat.uniforms.uBloom.value = P.bloom;
  if (P.saturation !== undefined) post.compositeMat.uniforms.uSaturation.value = P.saturation;
  if (P.fog !== undefined) post.underwaterMat.uniforms.uFogStrength.value = P.fog;
  if (P.shafts !== undefined) post.underwaterMat.uniforms.uShaftDensity.value = P.shafts;
  if (P.cloudCoverage !== undefined) clouds.uniforms.uCoverage.value = P.cloudCoverage;
  if (P.cloudDensity !== undefined) clouds.uniforms.uDensity.value = P.cloudDensity;
  applySun();
  presetProxy.preset = name;   // keep the dropdown in sync (incl. programmatic calls)
  refreshColorCtrls();
  gui.controllersRecursive().forEach((c) => c.updateDisplay());
}

// ---------------------------------------------------------------------------
//  GUI
// ---------------------------------------------------------------------------
const gui = new GUI({ title: 'Ocean' });

const colorCtrls = [];
function refreshColorCtrls() {
  for (const cc of colorCtrls) {
    cc.proxy.c = '#' + cc.uniform.value.getHexString();
    cc.ctrl.updateDisplay();
  }
}

const fPre = gui.addFolder('Cinematic').close();
const presetProxy = { preset: 'Tropical Noon' };
fPre.add(presetProxy, 'preset', Object.keys(PRESETS)).name('preset').onChange(applyPreset);
fPre.add({ cinema: false }, 'cinema').name('cinematic camera')
  .onChange((v) => (controls.autoRotate = v));

const fSun = gui.addFolder('Time of day').close();
fSun.add(sunParams, 'elevation', -3, 89, 0.5).name('sun elevation').onChange(applySun);
fSun.add(sunParams, 'azimuth', 0, 360, 1).name('sun azimuth').onChange(applySun);

const fWaves = gui.addFolder('Waves').close();
fWaves.add(ocean.uniforms.uAmplitude, 'value', 0.1, 3.5, 0.05).name('amplitude');
fWaves.add(ocean.uniforms.uChoppy, 'value', 0.0, 1.4, 0.02).name('choppiness');
fWaves.add(ocean.uniforms.uWaveCount, 'value', 4, 40, 1).name('wave count');
fWaves.add(ocean.uniforms.uSpeed, 'value', 0.0, 3.0, 0.05).name('speed');
fWaves.add(ocean.uniforms.uDirSpread, 'value', 0.0, 1.6, 0.02).name('direction spread');
fWaves
  .add({ wl: OCEAN_CONFIG.baseWavelength }, 'wl', 40, 320, 5)
  .name('swell length')
  .onChange((v) => (ocean.uniforms.uBaseFreq.value = (2 * Math.PI) / v));

// lil-gui colour control bound to a THREE.Color uniform (sRGB picker ⇄ linear).
function addColorCtrl(folder, uniform, name) {
  const proxy = { c: '#' + uniform.value.getHexString() };
  const ctrl = folder.addColor(proxy, 'c').name(name).onChange((v) => uniform.value.set(v));
  colorCtrls.push({ ctrl, proxy, uniform });
}

const fSurf = gui.addFolder('Surface').close();
fSurf.add(ocean.uniforms.uDetailStrength, 'value', 0.0, 1.2, 0.02).name('ripple detail');
fSurf.add(ocean.uniforms.uDetailScale, 'value', 0.05, 1.2, 0.01).name('ripple scale');
fSurf.add(ocean.uniforms.uRefractStrength, 'value', 0.0, 0.12, 0.005).name('refraction');
fSurf.add(ocean.uniforms.uSSRStrength, 'value', 0.0, 1.0, 0.02).name('reflections (SSR)');
fSurf.add(ocean.uniforms.uSunGlitter, 'value', 0.0, 1.0, 0.02).name('sun glitter');
fSurf.add(ocean.uniforms.uRoughness, 'value', 0.02, 0.5, 0.01).name('micro roughness');

const fColor = gui.addFolder('Water & colour').close();
fColor.add(ocean.uniforms.uClarity, 'value', 0.3, 3.0, 0.05).name('clarity');
fColor.add(ocean.uniforms.uDepthFalloff, 'value', 0.03, 0.5, 0.01).name('depth falloff');
fColor.add(ocean.uniforms.uSSSStrength, 'value', 0.0, 1.5, 0.02).name('translucency');
addColorCtrl(fColor, ocean.uniforms.uShallowColor, 'shallow');
addColorCtrl(fColor, ocean.uniforms.uDeepColor, 'deep');
addColorCtrl(fColor, ocean.uniforms.uFoamColor, 'foam');

const fFoam = gui.addFolder('Foam').close();
fFoam.add(ocean.uniforms.uFoamCoverage, 'value', 0.0, 2.0, 0.05).name('coverage');
fFoam.add(ocean.uniforms.uFoamEdge, 'value', 0.02, 0.45, 0.01).name('softness / layers');
fFoam.add(ocean.uniforms.uFoamOpacity, 'value', 0.3, 1.0, 0.02).name('opacity');
fFoam.add(ocean.uniforms.uCrestFoamStart, 'value', 0.3, 3.0, 0.05).name('whitecap onset');
fFoam.add(ocean.uniforms.uFoamThreshold, 'value', 0.0, 1.0, 0.02).name('breaking foam');
fFoam.add(ocean.uniforms.uShoreFoamWidth, 'value', 0.0, 8.0, 0.1).name('shore foam width');
fFoam.add(ocean.uniforms.uContactFoam, 'value', 0.0, 2.0, 0.05).name('object foam / wakes');

const fObj = gui.addFolder('Objects').close();
fObj.add({ s: () => dropAtTarget('sphere') }, 's').name('drop sphere');
fObj.add({ c: () => dropAtTarget('cube') }, 'c').name('drop cube');
fObj.add({ x: () => bodies.clear() }, 'x').name('clear objects');
fObj.add(bodies, 'gravity', 0, 45, 0.5).name('gravity');

const fClouds = gui.addFolder('Volumetric clouds').close();
const cu = clouds.uniforms;
fClouds.add({ on: true }, 'on').name('enabled').onChange(setCloudsEnabled);
fClouds.add(cu.uSteps, 'value', 16, 80, 2).name('quality (steps)');
fClouds.add(cu.uCoverage, 'value', 0.1, 0.95, 0.01).name('coverage');
fClouds.add(cu.uDensity, 'value', 0.2, 3.0, 0.05).name('density');
fClouds.add(cu.uNoiseScale, 'value', 0.002, 0.02, 0.0005).name('cloud size (inv)');
fClouds.add(cu.uHeightFalloff, 'value', 0.0, 1.0, 0.02).name('roundness');
fClouds.add(cu.uDetail, 'value', 0.0, 1.0, 0.02).name('wispiness');
fClouds.add(cu.uBase, 'value', 120, 900, 10).name('altitude');
fClouds.add(cu.uHeight, 'value', 100, 700, 10).name('thickness');
fClouds.add(cu.uWindSpeed, 'value', 0.0, 0.15, 0.005).name('wind speed');
fClouds.add(cu.uSunStrength, 'value', 0.5, 6.0, 0.1).name('sun strength');
fClouds.add(cu.uAmbient, 'value', 0.0, 1.2, 0.02).name('ambient');
fClouds.add(cloudShadowP, 'strength', 0.0, 1.0, 0.02).name('sea shadows');

const fUnder = gui.addFolder('Underwater').close();
fUnder.add(post.underwaterMat.uniforms.uShaftDensity, 'value', 0.0, 0.2, 0.005).name('god-ray density');
fUnder.add(post.underwaterMat.uniforms.uFogStrength, 'value', 0.0, 2.0, 0.05).name('fog strength');

const fPost = gui.addFolder('Post').close();
fPost.add(post.compositeMat.uniforms.uExposure, 'value', 0.3, 2.0, 0.02).name('exposure');
fPost.add(post.compositeMat.uniforms.uBloom, 'value', 0.0, 2.0, 0.02).name('bloom');
fPost.add(post, 'bloomStreak', 0.0, 1.0, 0.02).name('anamorphic streak');
fPost.add(post.compositeMat.uniforms.uSaturation, 'value', 0.5, 1.6, 0.02).name('saturation');
fPost.add(post.compositeMat.uniforms.uContrast, 'value', 0.8, 1.3, 0.01).name('contrast');
fPost.add(post.compositeMat.uniforms.uGrain, 'value', 0.0, 0.2, 0.005).name('film grain');
fPost.add(post.compositeMat.uniforms.uCA, 'value', 0.0, 2.0, 0.05).name('lens fringe');
fPost.add(post.compositeMat.uniforms.uVignetteAir, 'value', 0.0, 0.6, 0.02).name('vignette');

if (birdDemoEnabled) {
  const fBirdDemo = gui.addFolder('Bird Demo');
  fBirdDemo.add({ restart: () => { birdClock = 0; } }, 'restart').name('Restart');
  fBirdDemo.add({ toggle: () => { birdPaused = !birdPaused; } }, 'toggle').name('Pause / Play');
  fBirdDemo.add(birdDemoState, 'time').name('timeline (s)').listen().disable();
}

if (cinematicSunsetEnabled) {
  const fSunset = gui.addFolder('Cinematic Sunset');
  fSunset.add(ocean.uniforms.uSunsetAmount, 'value', 0, 1, 0.01).name('Sunset Amount');
  fSunset.add(ocean.uniforms.uSunsetOceanWarmth, 'value', 0, 1, 0.01).name('Ocean Warmth');
  fSunset.add(ocean.uniforms.uSunsetSunFocus, 'value', 0, 1, 0.01).name('Sun Path');
  fSunset.add(ocean.uniforms.uSunsetGlitterBoost, 'value', 0, 1, 0.01).name('Glitter Boost');
  fSunset.add(ocean.uniforms.uSunsetHorizonWarmth, 'value', 0, 1, 0.01).name('Horizon Warmth');
  addColorCtrl(fSunset, ocean.uniforms.uSunsetTint, 'Sunset Tint');
}

// Night V1 (opt-in) — a handful of consumers (Ocean/Sky/Island/Floor/the
// moon THREE.light) each hold their own uMoonIntensity/uStarVisibility
// uniform rather than sharing one by reference, so these two setters just
// propagate a single GUI value to all of them.
function setMoonIntensity(v) {
  ocean.uniforms.uMoonIntensity.value = v;
  sky.uniforms.uMoonIntensity.value = v;
  island.uniforms.uMoonIntensity.value = v;
  floor.uniforms.uMoonIntensity.value = v;
  moonLight.intensity = nightEnabled ? v * 0.5 : 0;
}
function setStarVisibility(v) {
  ocean.uniforms.uStarVisibility.value = v;
  sky.uniforms.uStarVisibility.value = v;
}

if (nightEnabled) {
  const fNight = gui.addFolder('Night');
  fNight.add(moonParams, 'elevation', -10, 89, 0.5).name('Moon Elevation').onChange(applyMoon);
  fNight.add(moonParams, 'azimuth', 0, 360, 1).name('Moon Azimuth').onChange(applyMoon);
  fNight.add({ v: NIGHT_MOON_INTENSITY }, 'v', 0, 3, 0.05).name('Moon Intensity').onChange(setMoonIntensity);
  fNight.add(ocean.uniforms.uMoonPathFocus, 'value', 0, 1, 0.01).name('Moon Path');
  fNight.add({ v: NIGHT_STAR_VISIBILITY }, 'v', 0, 1, 0.01).name('Star Visibility').onChange(setStarVisibility);
  fNight.add(post.compositeMat.uniforms.uExposure, 'value', 0.2, 1.5, 0.01).name('Night Exposure');
  fNight.add(clouds.uniforms.uMoonWeight, 'value', 0, 2, 0.02).name('Cloud Moonlight');
}

gui.add({ dive: () => diveTo(-12) }, 'dive').name('▼ dive under');
gui.add({ surface: () => diveTo(14) }, 'surface').name('▲ back to surface');

function diveTo(y) {
  // Smoothly move the camera + target across the surface.
  const from = camera.position.clone();
  const fromT = controls.target.clone();
  const toPos = new THREE.Vector3(from.x, y, from.z);
  const toTgt = new THREE.Vector3(fromT.x, y < 0 ? y - 4 : 2, fromT.z);
  let t = 0;
  (function step() {
    t = Math.min(1, t + 0.02);
    const e = t * t * (3 - 2 * t);
    camera.position.lerpVectors(from, toPos, e);
    controls.target.lerpVectors(fromT, toTgt, e);
    if (t < 1) requestAnimationFrame(step);
  })();
}

// ---------------------------------------------------------------------------
//  Resize
// ---------------------------------------------------------------------------
function onResize() {
  const w = sizeW();
  const h = sizeH();
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);

  refractionRT.dispose();
  hdrRT.dispose();
  refractionRT = makeSceneRT(w, h);
  hdrRT = makeSceneRT(w, h);
  ocean.uniforms.uRefractionTex.value = refractionRT.texture;
  ocean.uniforms.uDepthTex.value = refractionRT.depthTexture;

  ocean.setResolution(w, h);
  post.setSize(w, h);
  clouds.setSize(w, h);
}
window.addEventListener('resize', onResize);

// Double-click the water to drop an object there (Shift = cube). Double-click
// avoids clashing with single-drag orbiting.
const _ray = new THREE.Raycaster();
const _ndc = new THREE.Vector2();
const _plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const _hit = new THREE.Vector3();
renderer.domElement.addEventListener('dblclick', (ev) => {
  const rect = renderer.domElement.getBoundingClientRect();
  _ndc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
  _ndc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
  _ray.setFromCamera(_ndc, camera);
  if (_ray.ray.intersectPlane(_plane, _hit)) {
    dropObject(ev.shiftKey ? 'cube' : 'sphere', _hit.x, _hit.z);
  }
});

// Click-drag an object to move it (drag on empty water still orbits the camera).
let dragBody = null;
const _dragPlane = new THREE.Plane();
const _dragHit = new THREE.Vector3();
const _dragVel = new THREE.Vector3();
let _dragPrev = null;

function pointerNDC(ev) {
  const rect = renderer.domElement.getBoundingClientRect();
  _ndc.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
  _ndc.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
}

renderer.domElement.addEventListener('pointerdown', (ev) => {
  if (ev.button !== 0) return;
  pointerNDC(ev);
  _ray.setFromCamera(_ndc, camera);
  const hits = _ray.intersectObjects(bodies.bodies.map((b) => b.mesh), false);
  if (!hits.length) return;                      // missed → let OrbitControls orbit
  dragBody = bodies.bodies.find((b) => b.mesh === hits[0].object);
  if (!dragBody) return;
  controls.enabled = false;                      // OrbitControls bails when disabled
  dragBody.dragging = true;
  dragBody.vx = dragBody.vy = dragBody.vz = 0;
  _dragPlane.setFromNormalAndCoplanarPoint(new THREE.Vector3(0, 1, 0), dragBody.mesh.position);
  _dragPrev = null;
  renderer.domElement.setPointerCapture(ev.pointerId);
}, { capture: true });

window.addEventListener('pointermove', (ev) => {
  if (!dragBody) return;
  pointerNDC(ev);
  _ray.setFromCamera(_ndc, camera);
  if (!_ray.ray.intersectPlane(_dragPlane, _dragHit)) return;
  const now = performance.now();
  if (_dragPrev) {
    const ddt = Math.max((now - _dragPrev.t) / 1000, 1 / 240);
    _dragVel.set((_dragHit.x - _dragPrev.x) / ddt, 0, (_dragHit.z - _dragPrev.z) / ddt);
  }
  _dragPrev = { x: _dragHit.x, z: _dragHit.z, t: now };
  dragBody.mesh.position.x = _dragHit.x;
  dragBody.mesh.position.z = _dragHit.z;
});

window.addEventListener('pointerup', () => {
  if (!dragBody) return;
  dragBody.dragging = false;
  dragBody.vx = THREE.MathUtils.clamp(_dragVel.x, -25, 25); // fling with the drag motion
  dragBody.vz = THREE.MathUtils.clamp(_dragVel.z, -25, 25);
  dragBody = null;
  controls.enabled = true;
  _dragVel.set(0, 0, 0);
});

// ---------------------------------------------------------------------------
//  Render loop
// ---------------------------------------------------------------------------
let lastNow = performance.now();
let time = 0;
let frame = 0;
const invProjView = new THREE.Matrix4();

function setVisible(underwater, refractionPass) {
  if (refractionPass) {
    // Background behind the water: sky + floor only.
    ocean.mesh.visible = false;
    sky.mesh.visible = true;
    floor.mesh.visible = true;
    particles.points.visible = false;
  } else {
    ocean.mesh.visible = true;
    sky.mesh.visible = !underwater;
    floor.mesh.visible = true;
    particles.points.visible = underwater;
  }
}

function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  const dt = Math.min((now - lastNow) / 1000, 0.05);
  time += dt;
  lastNow = now;
  if (birdDemoEnabled && !birdPaused) birdClock += dt;

  controls.update();

  // Surface immersion test (exact wave height at the camera column).
  const surfaceH = ocean.heightAt(camera.position.x, camera.position.z, time);
  const underwater = camera.position.y < surfaceH - 0.15;

  // Keep the camera above the seabed.
  if (camera.position.y < -FLOOR_DEPTH + 3) camera.position.y = -FLOOR_DEPTH + 3;

  ocean.update(time, camera);
  floor.update(time, camera);
  island.update(time);
  particles.update(time, camera);
  sky.update(camera, time);
  bodies.update(dt, time, ocean, terrainAt);
  if (birds) {
    birds.update(birdClock);
    birdDemoState.time = Math.round((birdClock % birds.loopDuration) * 10) / 10;
  }

  ocean.uniforms.uCameraUnderwater.value = underwater ? 1 : 0;
  ocean.uniforms.uProjMatrix.value.copy(camera.projectionMatrix);
  post.underwaterMat.uniforms.uTime.value = time;

  // Feed floating bodies into the ocean's contact-foam field (rings, wakes,
  // splash bursts). Strength blends wetness, speed and any recent splash.
  const ou = ocean.uniforms;
  const blist = bodies.bodies;
  const bn = Math.min(blist.length, MAX_FOAM_BODIES);
  ou.uBodyCount.value = bn;
  for (let i = 0; i < bn; i++) {
    const b = blist[i];
    const spd = Math.hypot(b.vx, b.vz);
    const wet = b.wet || 0;
    const strength = wet > 0.02
      ? Math.min(2, (0.3 + spd * 0.22 + (b.splash || 0)) * Math.min(wet * 3, 1))
      : Math.min(2, b.splash || 0);
    ou.uBodies.value[i].set(b.mesh.position.x, b.mesh.position.z, b.r * 1.15, strength);
    ou.uBodyVel.value[i].set(b.vx, b.vz);
  }

  // Sync the sea's cloud shadows with the volumetric layer (drift, coverage).
  if (clouds.enabled) {
    ou.uCloudShadow.value = cloudShadowP.strength;
    ou.uCloudPlaneY.value = cu.uBase.value + cu.uHeight.value * 0.5;
    ou.uCloudScale.value = cu.uNoiseScale.value;
    ou.uCloudCoverage.value = cu.uCoverage.value * (1 - cu.uHeightFalloff.value * 0.5);
    ou.uCloudDrift.value.copy(cu.uDrift.value);
  }

  renderer.setClearColor(OCEAN_CONFIG.deepColor, 1);

  // --- Pass A: refraction background (skip while submerged) ---
  if (!underwater) {
    setVisible(underwater, true);
    renderer.setRenderTarget(refractionRT);
    renderer.render(scene, camera);
  }

  // --- Pass B: full scene to HDR ---
  setVisible(underwater, false);
  renderer.setRenderTarget(hdrRT);
  renderer.render(scene, camera);

  // --- Volumetric clouds: raymarch a low-res HDR buffer from the scene depth ---
  if (clouds.enabled) clouds.render(dt, camera, hdrRT.depthTexture);

  // --- Post: underwater volumetrics + clouds + bloom + tone-map to screen ---
  invProjView.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse).invert();
  post.render(hdrRT, {
    invProjView,
    cameraPos: camera.position,
    sunDir,
    time,
    underwater,
    surfaceY: OCEAN_CONFIG.surfaceY,
    cloudTexture: clouds.enabled ? clouds.texture : null,
  });

  // --- HUD ---
  const depthBelow = surfaceH - camera.position.y;
  depthStateEl.textContent = underwater ? 'BELOW' : 'ABOVE';
  depthStateEl.style.color = underwater ? '#7fe0d0' : '#9be7ff';
  depthValEl.textContent = (underwater ? depthBelow : camera.position.y).toFixed(1) + ' m';

  frame++;
  if (frame === 2) {
    bootEl.classList.add('hidden');
    depthEl.hidden = false;
    setTimeout(() => bootEl.remove(), 1200);
    setTimeout(() => (hintEl.style.opacity = '0'), 7000);
  }
}

// Small handle for debugging / automation (harmless in production).
window.OCEAN = { camera, controls, diveTo, sunParams, applySun, applyPreset, PRESETS, ocean, floor, island, post, bodies, dropObject, dropAtTarget, clouds, setCloudsEnabled };
if (birdDemoEnabled) {
  window.OCEAN.birds = birds;
  window.OCEAN.setBirdClock = (t) => { birdClock = t; };
  window.OCEAN.setBirdPaused = (p) => { birdPaused = p; };
}
if (nightEnabled) {
  window.OCEAN.moonParams = moonParams;
  window.OCEAN.applyMoon = applyMoon;
  window.OCEAN.setMoonIntensity = setMoonIntensity;
  window.OCEAN.setStarVisibility = setStarVisibility;
}

applySun();
setCloudsEnabled(true); // volumetric clouds on by default (toggle in the GUI)

if (birdDemoEnabled) {
  // Bird Demo camera: looking out over open water in +Z, well clear of the
  // island (which sits entirely at world Z <= 65, behind this framing) — a
  // clean horizon + sky with room for the flock to cross. Static pose
  // (OrbitControls stay usable, but this is where the shot starts).
  camera.position.set(0, 9, 90);
  controls.target.set(0, 6, 220);
  controls.update();
  // Cinematic Sunset (below) picks the preset instead, when both are active.
  if (!cinematicSunsetEnabled) applyPreset('Golden Hour');
}

if (cinematicSunsetEnabled) {
  // Start from the existing, unmodified Crimson Sunset preset, then layer
  // the cinematic tint on top of it (Ocean.js). The preset itself is never
  // edited, so plain Crimson Sunset (without the flag) stays exactly as it
  // was.
  applyPreset('Crimson Sunset');
  ocean.uniforms.uSunsetAmount.value = SUNSET_START_AMOUNT;
  gui.controllersRecursive().forEach((c) => c.updateDisplay()); // sync the new sliders
}

if (nightEnabled) {
  // Push the sun well below the horizon — this naturally drives the many
  // existing sunDir-coupled terms (sunLight intensity, Island/Floor ndl,
  // Ocean's SSS/sun-glint/waterCol-intensity, all already elevation-clamped
  // at >= 0) to their already-existing dim floor, with no code changes.
  // Only the sky/cloud COLOUR actually needed fixing (Ocean.js/Sky.js/
  // Clouds.js/Island.js/Floor.js changes above) — everything else here is a
  // direct, stable Night V1 state, not a continuous time-of-day system.
  // clouds.setNightAmount() must run BEFORE applySun(): setSun()'s night
  // colour blend (see Clouds.js) reads this flag, so calling applySun()
  // first would silently apply the day/sunset cloud palette instead.
  clouds.setNightAmount(1.0);
  sunParams.elevation = NIGHT_SUN_ELEVATION;
  applySun();
  applyMoon();

  const moonColor = new THREE.Color(0xdfe6f0);
  ocean.uniforms.uNightAmount.value = 1.0;
  ocean.uniforms.uMoonColor.value.copy(moonColor);
  sky.uniforms.uNightAmount.value = 1.0;
  sky.uniforms.uMoonColor.value.copy(moonColor);
  island.uniforms.uNightAmount.value = 1.0;
  island.uniforms.uMoonColor.value.copy(moonColor);
  floor.uniforms.uNightAmount.value = 1.0;
  floor.uniforms.uMoonColor.value.copy(moonColor);
  setMoonIntensity(NIGHT_MOON_INTENSITY);
  setStarVisibility(NIGHT_STAR_VISIBILITY);

  clouds.setNightAmount(1.0);
  clouds.uniforms.uMoonColor.value.copy(moonColor);
  clouds.uniforms.uMoonWeight.value = NIGHT_CLOUD_MOONLIGHT;
  clouds.uniforms.uSunStrength.value = 0.3;
  clouds.uniforms.uAmbient.value = 0.35;

  // Night camera: close to the water, island as a dark foreground silhouette,
  // moon visible above it (partially threaded through cloud cover) with its
  // glitter path leading down across the water toward camera. Skipped when
  // Bird Demo is also active — birds fly in front of THEIR OWN camera pose
  // (main.js's birdDemoEnabled block above), so keep that framing instead of
  // pointing the camera away from where they are; the night sky/ocean/moon
  // state still applies fully in that framing.
  if (!birdDemoEnabled) {
    camera.position.set(10, 3, 48);
    controls.target.set(0, 2, 0);
    controls.update();
  }

  // Night ocean palette: deep navy / near-black body, muted cool foam,
  // subsurface scattering and sun glitter both nearly off (the moon supplies
  // its own separate glitter/reflection path — see Ocean.js).
  ocean.uniforms.uDeepColor.value.set('#020509');
  ocean.uniforms.uShallowColor.value.set('#0a1830');
  ocean.uniforms.uFoamColor.value.set('#c9d6e6');
  ocean.uniforms.uSSSStrength.value = 0.06;
  ocean.uniforms.uSunGlitter.value = 0.05;
  ocean.uniforms.uCrestFoamStart.value = 1.6;

  // Underwater: dim the shafts (they otherwise assume some real sunlight is
  // always reaching the water column) and cool/darken the fog target — both
  // already-exposed Post.js uniforms, so no Post.js code changes were needed.
  post.underwaterMat.uniforms.uShaftDensity.value = 0.01;
  post.underwaterMat.uniforms.uFogStrength.value = 0.5;
  post.underwaterMat.uniforms.uDeepColor.value.set('#020509');

  // Deterministic manual exposure/bloom — preserves moon-disk and star
  // detail without crushing blacks or flooding the sky with bloom.
  post.compositeMat.uniforms.uExposure.value = NIGHT_EXPOSURE;
  post.compositeMat.uniforms.uBloom.value = NIGHT_BLOOM;
  post.compositeMat.uniforms.uSaturation.value = 1.0;

  gui.controllersRecursive().forEach((c) => c.updateDisplay());
}

animate();
