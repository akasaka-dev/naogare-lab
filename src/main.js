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
import { LyricParticles } from './LyricParticles.js';
import { HeadParticleTrail } from './HeadParticleTrail.js';
import { TrailLyrics } from './TrailLyrics.js';
import { AutoDirector } from './AutoDirector.js';
import { LyricTimeline } from './LyricTimeline.js';
import { AudioController } from './AudioController.js';
import { FOREVERMORE_EVENTS } from './ForeverMoreLyrics.js';

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

// ---------------------------------------------------------------------------
//  Time-of-Day V1 — opt-in via ?time=1. A single continuous setTimeOfDay(t)
//  drives sun/moon position and (by continuously setting the SAME uniforms
//  Sunset V2 / Night V1 already use) their existing tint/reflection systems,
//  rather than a third parallel colour system. See setTimeOfDay() below.
// ---------------------------------------------------------------------------
const timeEnabled = new URLSearchParams(window.location.search).get('time') === '1';

// ---------------------------------------------------------------------------
//  Lyric Particles V1 — opt-in via ?lyrics=1. When absent, none of this runs:
//  no particle flock, no GUI folder, no camera/atmosphere override below.
// ---------------------------------------------------------------------------
const lyricsEnabled = new URLSearchParams(window.location.search).get('lyrics') === '1';
const lyricParticles = lyricsEnabled ? new LyricParticles(scene) : null;
let lyricGuiState = null;

// ---------------------------------------------------------------------------
//  Head Particle Trail V1 — opt-in via ?headParticles=1. The accepted
//  traveler effect: the head is the ONLY emitter, particles own their own
//  world-space position once born, and there is no geometry connecting head
//  to tail that could ever misalign with it.
// ---------------------------------------------------------------------------
const headParticlesEnabled = new URLSearchParams(window.location.search).get('headParticles') === '1';
const headParticleTrail = headParticlesEnabled ? new HeadParticleTrail(scene) : null;
let headParticleGuiState = null;
const headParticleFollowCam = { look: new THREE.Vector3(), inited: false };

// ---------------------------------------------------------------------------
//  Trail Lyrics V1 — opt-in via ?trailLyrics=1, and only ever active alongside
//  Head Particle Trail (?headParticles=1). Isolated prototype: does not read
//  or modify HeadParticleTrail's own state beyond its public head position/
//  travel-direction/path. See TrailLyrics.js for the full design.
// ---------------------------------------------------------------------------
const trailLyricsEnabled = headParticlesEnabled && new URLSearchParams(window.location.search).get('trailLyrics') === '1';
const trailLyrics = trailLyricsEnabled ? new TrailLyrics(scene) : null;
let trailLyricsGuiState = null;

// ---------------------------------------------------------------------------
//  Auto Director V1 — opt-in via ?autoDirector=1, only ever active alongside
//  Head Particle Trail (?headParticles=1). When absent, the existing Head
//  Particle Trail follow camera behaves exactly as before — this module and
//  its GUI/debug API simply don't exist. See AutoDirector.js for the full
//  six-preset / seeded-scheduler design.
// ---------------------------------------------------------------------------
const autoDirectorEnabled = headParticlesEnabled && new URLSearchParams(window.location.search).get('autoDirector') === '1';
const autoDirector = autoDirectorEnabled ? new AutoDirector({ seed: 1234 }) : null;
if (autoDirector) {
  autoDirector.enabled = true; // the URL opt-in itself activates the camera takeover, matching every other ?flag=1 module in this file
  autoDirector.restart();
}
let autoDirectorGuiState = null;

// ---------------------------------------------------------------------------
//  Lyric Timeline V1 — opt-in via ?lyricTimeline=1, only ever active
//  alongside Trail Lyrics (?trailLyrics=1, itself requiring
//  ?headParticles=1). A small data-driven scheduler (ForeverMoreLyrics.js
//  for the event data, LyricTimeline.js for the controller) that triggers/
//  configures the EXISTING Trail Lyrics system at real song times — it
//  does not touch TrailLyrics' tail-emergence/assemble/leave-behind
//  mechanism at all, only WHEN and WITH WHAT PARAMETERS it fires. When
//  absent, TrailLyrics keeps its existing standalone auto-looping "Forever
//  More" behavior completely unchanged (see TrailLyrics.loop).
//
//  Real Timing JSON Integration V1: event vocal timing comes from
//  saikai-2026-02-22EngLast-lyrics-timing.json (manually measured against
//  the real WAV, in the SAME absolute time domain as audio.currentTime — no
//  offset/calibration layer). It's fetched once below and handed to
//  LyricTimeline.setTimingData(), which resolves each event's
//  `sourceCueIndex` (see ForeverMoreLyrics.js) against it.
// ---------------------------------------------------------------------------
const lyricTimelineEnabled = trailLyricsEnabled && new URLSearchParams(window.location.search).get('lyricTimeline') === '1';
const LYRIC_TIMING_JSON_URL = './data/saikai-2026-02-22EngLast-lyrics-timing.json';
const lyricTimeline = lyricTimelineEnabled
  ? new LyricTimeline(trailLyrics, FOREVERMORE_EVENTS, {
      // HERO events may request a stronger camera choice (spec 10); TRAIL
      // events deliberately do nothing here and rely entirely on Auto
      // Director's own existing lyric-safe restriction (trailLyrics.getPhase()
      // gating during ASSEMBLE/HOLD) — never an aggressive override.
      onEventStart: (event) => {
        if (event.type === 'hero' && autoDirector && autoDirector.enabled) {
          autoDirector.setMode(event.camera, 'cut', camera.position, controls.target);
        }
      },
    })
  : null;
let lyricTimelineGuiState = null;
let foreverMoreTimingData = null; // raw parsed JSON, kept for OCEAN.foreverMoreTiming (spec 11) — fetched once, never per-frame
if (lyricTimelineEnabled) {
  fetch(LYRIC_TIMING_JSON_URL)
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data.lyrics)) {
        console.error('[LyricTimeline] timing JSON is missing a `lyrics` array:', LYRIC_TIMING_JSON_URL);
        return;
      }
      foreverMoreTimingData = data;
      lyricTimeline.setTimingData(data.lyrics);
      if (lyricTimelineGuiState) lyricTimelineGuiState.loadedCues = data.lyrics.length;
    })
    .catch((err) => console.error('[LyricTimeline] failed to load timing JSON:', LYRIC_TIMING_JSON_URL, err));
}

// ---------------------------------------------------------------------------
//  Audio Sync V1 — opt-in via ?audio=1, independent of Lyric Timeline (it's
//  just a music player wrapper on its own — see AudioController.js). Its
//  ONLY connection to Lyric Timeline is the "Sync Lyrics" toggle wired into
//  animate() below, which decides — every frame — whether LyricTimeline's
//  clock comes from audio.currentTime or its own dt-based clock. Nothing in
//  AudioController or LyricTimeline itself knows the other exists.
// ---------------------------------------------------------------------------
const audioEnabled = new URLSearchParams(window.location.search).get('audio') === '1';
const audioController = audioEnabled ? new AudioController('./audio/saikai-2026-02-22EngLast.wav') : null;
let audioGuiState = null;

// Lights — only the dropped primitives (MeshStandardMaterial) use these; the
// ocean/island/sky are raw ShaderMaterials and ignore scene lights.
const sunLight = new THREE.DirectionalLight(0xfff2e0, 3.0);
scene.add(sunLight, sunLight.target);
const skyLight = new THREE.HemisphereLight(0xbfe4ff, 0x24424e, 1.1);
scene.add(skyLight);
// Night V1 (opt-in) — a separate, independent light so dropped objects can
// catch a dim, cool moonlit edge; intensity is 0 until Night mode raises it,
// so normal/day/sunset lighting is unaffected.
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
  moonLight.intensity = (nightEnabled || timeEnabled) ? v * 0.5 : 0;
}
function setStarVisibility(v) {
  ocean.uniforms.uStarVisibility.value = v;
  sky.uniforms.uStarVisibility.value = v;
}

// ---------------------------------------------------------------------------
//  Time-of-Day V1 (opt-in, ?time=1) — a single centralized controller.
//
//  Deliberately reuses the existing systems rather than building a third
//  colour model: Sunset V2's uSunsetAmount and Night V1's uNightAmount (plus
//  uMoonIntensity/uStarVisibility) are opt-in tint layers that are already
//  mathematically neutral at 0 and already handle sun/moon reflection paths,
//  cloud recolouring, island/floor dimming, etc. setTimeOfDay(t) just drives
//  those SAME uniforms continuously from sun/moon elevation instead of a
//  hand-picked preset value — no shader changes were needed for this file.
// ---------------------------------------------------------------------------
function smoothstepJS(e0, e1, x) {
  const tt = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
  return tt * tt * (3 - tt * 2);
}

// Five reference stages, each a Gaussian weight peaked at its own sun
// elevation (degrees) and normalized so all five sum to 1 — a smooth
// partition-of-unity blend where only adjacent stages overlap meaningfully,
// avoiding the "muddy" colours a naive sequential lerp could produce.
const TOD_STAGES = ['day', 'golden', 'sunset', 'twilight', 'night'];
const TOD_STAGE_ELEV = { day: 40, golden: 8, sunset: -2, twilight: -10, night: -30 };
const TOD_STAGE_WIDTH = { day: 25, golden: 10, sunset: 6, twilight: 8, night: 15 };
function todStageWeights(elevDeg) {
  const w = {};
  let sum = 0;
  for (const s of TOD_STAGES) {
    const d = (elevDeg - TOD_STAGE_ELEV[s]) / TOD_STAGE_WIDTH[s];
    w[s] = Math.exp(-d * d);
    sum += w[s];
  }
  if (sum > 0) for (const s of TOD_STAGES) w[s] /= sum;
  return w;
}
function todBlend(w, values) {
  let sum = 0;
  for (const s of TOD_STAGES) sum += w[s] * values[s];
  return sum;
}
const _todColorTmp = new THREE.Color();
function todBlendColor(w, hexValues, target) {
  let r = 0, g = 0, b = 0;
  for (const s of TOD_STAGES) {
    _todColorTmp.set(hexValues[s]);
    r += w[s] * _todColorTmp.r;
    g += w[s] * _todColorTmp.g;
    b += w[s] * _todColorTmp.b;
  }
  target.setRGB(r, g, b);
}

// Base-water/foam keyframes per stage (before the Sunset V2 / Night V1 tint
// layers are added on top — those are driven separately, below).
const TOD_DEEP = { day: '#063049', golden: '#08283b', sunset: '#0e1524', twilight: '#0a1220', night: '#020509' };
const TOD_SHALLOW = { day: '#5fc6c2', golden: '#3f9f9a', sunset: '#33707a', twilight: '#1c3550', night: '#0a1830' };
const TOD_FOAM = { day: '#f6fdff', golden: '#fff1df', sunset: '#ffe4cf', twilight: '#c7d3e0', night: '#c9d6e6' };
const TOD_SSS = { day: 0.35, golden: 0.55, sunset: 0.5, twilight: 0.25, night: 0.06 };
const TOD_SUNGLITTER = { day: 0.0, golden: 0.55, sunset: 0.6, twilight: 0.3, night: 0.05 };
const TOD_ROUGHNESS = { day: 0.06, golden: 0.09, sunset: 0.11, twilight: 0.12, night: 0.1 };
const TOD_CRESTFOAM = { day: 1.4, golden: 1.5, sunset: 1.4, twilight: 1.5, night: 1.6 };
const TOD_CLOUD_SUNSTRENGTH = { day: 3.0, golden: 3.2, sunset: 2.6, twilight: 1.2, night: 0.3 };
const TOD_CLOUD_AMBIENT = { day: 0.85, golden: 0.9, sunset: 0.85, twilight: 0.6, night: 0.35 };
const TOD_SHAFT_DENSITY = { day: 0.05, golden: 0.06, sunset: 0.05, twilight: 0.03, night: 0.01 };
const TOD_FOG_STRENGTH = { day: 1.0, golden: 1.0, sunset: 1.1, twilight: 0.8, night: 0.5 };
const TOD_EXPOSURE = { day: 1.05, golden: 1.15, sunset: 1.2, twilight: 1.0, night: NIGHT_EXPOSURE };
const TOD_BLOOM = { day: 0.5, golden: 0.95, sunset: 1.0, twilight: 0.7, night: NIGHT_BLOOM };
const TOD_SATURATION = { day: 1.08, golden: 1.1, sunset: 1.12, twilight: 1.0, night: 1.0 };
// Shared warm-traveler tint table — subtle per-stage tint used by every
// glowing-traveler module (Lyric Particles, Head Particle Trail); each must
// stay recognizably the same entity across the whole day/night cycle.
const TOD_TRAVELER_TINT = { day: '#fbf6ea', golden: '#fff0d2', sunset: '#ffe9c9', twilight: '#eef1f5', night: '#e3ecf7' };
const _todTintTmp = new THREE.Color();

const SUN_MAX_ELEVATION = 65;
const SUN_AZ_START = 70, SUN_AZ_RANGE = 240; // lands near Crimson Sunset's az=250 at t=0.75
const MOON_MAX_ELEVATION = 50;
const MOON_AZ_START = 255, MOON_AZ_RANGE = -60; // independent sweep, opposite direction
const TOD_SUNSET_PEAK = 0.85;
const TOD_STAR_PEAK = NIGHT_STAR_VISIBILITY;

let timeOfDayValue = 0.5;
function setTimeOfDay(tRaw) {
  const t = Math.min(Math.max(tRaw, 0), 1);
  timeOfDayValue = t;

  // Sun: rises ~t=0.25, peaks ~t=0.5 (noon), sets ~t=0.75, deepest at t=0/1.
  // A single sine keeps the whole cycle continuous with no branch at the
  // horizon crossing.
  sunParams.elevation = SUN_MAX_ELEVATION * Math.sin(2 * Math.PI * (t - 0.25));
  sunParams.azimuth = SUN_AZ_START + t * SUN_AZ_RANGE;
  // Moon: independent motion, phase-shifted half a cycle from the sun (so it
  // peaks near midnight) — a simple approximation, not astronomical.
  moonParams.elevation = MOON_MAX_ELEVATION * Math.sin(2 * Math.PI * (t + 0.25));
  moonParams.azimuth = MOON_AZ_START + t * MOON_AZ_RANGE;

  const sunElevDeg = sunParams.elevation;
  const moonElevDeg = moonParams.elevation;

  // Continuous factors driving the EXISTING Sunset V2 / Night V1 tint
  // layers. sunsetAmount peaks in a band spanning golden-hour through just
  // below the horizon (so dawn gets the same warm glow as dusk, for free);
  // nightAmount ramps in only once the sun is well below the horizon, so
  // the two never peak together (satisfies "never both maximum at once").
  const sunsetAmount = smoothstepJS(-14, 4, sunElevDeg) * (1 - smoothstepJS(4, 14, sunElevDeg)) * TOD_SUNSET_PEAK;
  const nightAmount = smoothstepJS(-2, -18, sunElevDeg);
  // Moon is visible once it's above ITS OWN horizon AND the sun has dropped
  // low enough to allow twilight coexistence — not gated on full night.
  const moonVisibility = smoothstepJS(-5, 5, moonElevDeg) * (1 - smoothstepJS(0, 25, sunElevDeg));
  const starVisibility = nightAmount * TOD_STAR_PEAK;

  // clouds.setNightAmount() must be set BEFORE applySun() — Clouds.js's
  // setSun() reads it to decide how far to blend its palette toward night
  // colours (see the Night V1 ordering fix), so calling applySun() first
  // would apply it one frame late.
  clouds.setNightAmount(nightAmount);
  applySun();
  applyMoon();

  const w = todStageWeights(sunElevDeg);

  // Ocean base body + foam + related surface parameters.
  todBlendColor(w, TOD_DEEP, ocean.uniforms.uDeepColor.value);
  todBlendColor(w, TOD_SHALLOW, ocean.uniforms.uShallowColor.value);
  todBlendColor(w, TOD_FOAM, ocean.uniforms.uFoamColor.value);
  ocean.uniforms.uSSSStrength.value = todBlend(w, TOD_SSS);
  ocean.uniforms.uSunGlitter.value = todBlend(w, TOD_SUNGLITTER);
  ocean.uniforms.uRoughness.value = todBlend(w, TOD_ROUGHNESS);
  ocean.uniforms.uCrestFoamStart.value = todBlend(w, TOD_CRESTFOAM);

  // Sunset V2 + Night V1 tint layers — see the block comment above.
  ocean.uniforms.uSunsetAmount.value = sunsetAmount;
  ocean.uniforms.uNightAmount.value = nightAmount;
  sky.uniforms.uNightAmount.value = nightAmount;
  island.uniforms.uNightAmount.value = nightAmount;
  floor.uniforms.uNightAmount.value = nightAmount;
  setMoonIntensity(NIGHT_MOON_INTENSITY * moonVisibility);
  setStarVisibility(starVisibility);

  // Volumetric clouds.
  clouds.uniforms.uMoonWeight.value = NIGHT_CLOUD_MOONLIGHT * moonVisibility;
  clouds.uniforms.uSunStrength.value = todBlend(w, TOD_CLOUD_SUNSTRENGTH);
  clouds.uniforms.uAmbient.value = todBlend(w, TOD_CLOUD_AMBIENT);

  // Underwater — existing Post.js uniforms only, no Post.js code changes.
  post.underwaterMat.uniforms.uShaftDensity.value = todBlend(w, TOD_SHAFT_DENSITY);
  post.underwaterMat.uniforms.uFogStrength.value = todBlend(w, TOD_FOG_STRENGTH);
  todBlendColor(w, TOD_DEEP, post.underwaterMat.uniforms.uDeepColor.value);

  // Deterministic manual exposure / bloom / saturation.
  post.compositeMat.uniforms.uExposure.value = todBlend(w, TOD_EXPOSURE);
  post.compositeMat.uniforms.uBloom.value = todBlend(w, TOD_BLOOM);
  post.compositeMat.uniforms.uSaturation.value = todBlend(w, TOD_SATURATION);

  // Lyric Particles V1 (opt-in) — subtle colour response to time of day,
  // reusing the same stage weights rather than a parallel colour system.
  if (lyricParticles) todBlendColor(w, TOD_TRAVELER_TINT, lyricParticles.uniforms.uColor.value);
  // Head Particle Trail (opt-in) — same shared per-stage tint table;
  // setTint() also nudges the head colour toward white so it stays the
  // brighter, more neutral object regardless of stage.
  if (headParticleTrail) {
    todBlendColor(w, TOD_TRAVELER_TINT, _todTintTmp);
    headParticleTrail.setTint(_todTintTmp);
  }
  if (trailLyrics) {
    todBlendColor(w, TOD_TRAVELER_TINT, _todTintTmp);
    trailLyrics.setTint(_todTintTmp);
  }

  if (timeGuiState) timeGuiState.time = t;
}

// GUI state + slider reference for Time-of-Day (declared before use above;
// only populated when ?time=1 — see below).
let timeGuiState = null;
let timeSliderCtrl = null;

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

if (timeEnabled) {
  timeGuiState = { time: timeOfDayValue, autoPlay: false, speed: 0.05 };
  const fTime = gui.addFolder('Time of Day');
  timeSliderCtrl = fTime.add(timeGuiState, 'time', 0, 1, 0.001).name('Time').onChange(setTimeOfDay);
  fTime.add(timeGuiState, 'autoPlay').name('Auto Play');
  fTime.add(timeGuiState, 'speed', 0.005, 0.3, 0.005).name('Speed');
}

if (lyricsEnabled) {
  lyricGuiState = { glow: lyricParticles.uniforms.uGlow.value, speed: lyricParticles.speed, paused: false };
  const fLyrics = gui.addFolder('Lyric Particles');
  fLyrics.add(lyricGuiState, 'glow', 0.3, 2.5, 0.05).name('Glow').onChange((v) => { lyricParticles.uniforms.uGlow.value = v; });
  fLyrics.add(lyricGuiState, 'speed', 0.25, 3, 0.05).name('Travel Speed').onChange((v) => { lyricParticles.speed = v; });
  fLyrics.add({ assemble: () => lyricParticles.previewAssembled() }, 'assemble').name('Assemble');
  fLyrics.add(lyricGuiState, 'paused').name('Pause').onChange((v) => lyricParticles.setPaused(v));
  fLyrics.add({ restart: () => lyricParticles.restart() }, 'restart').name('Restart');
}

if (headParticlesEnabled) {
  headParticleGuiState = {
    colorMode: 'gold',
    // Default custom palette doubles as the ticket's own suggested
    // white-clipping test (cyan head/young -> blue mid -> violet old).
    headColor: '#66e0ff',
    youngColor: '#66e0ff',
    midColor: '#3366ff',
    oldColor: '#8b5cf6',
    rainbowSpeed: 0.15,
    rainbowSaturation: 0.8,
    brightness: 1.0,
    particleBloom: 1.0,
    headBloom: 1.0,
    emissionRate: headParticleTrail.emissionRate,
    speed: headParticleTrail.speed,
    paused: false,
    follow: true,
  };
  const fHeadParticles = gui.addFolder('Head Particle Trail');
  fHeadParticles.add({ restart: () => headParticleTrail.restart() }, 'restart').name('Restart');
  fHeadParticles.add(headParticleGuiState, 'paused').name('Pause').onChange((v) => headParticleTrail.setPaused(v));
  fHeadParticles.add(headParticleGuiState, 'colorMode', ['gold', 'custom', 'rainbow']).name('Color Mode').onChange((v) => headParticleTrail.setColorMode(v));
  fHeadParticles.addColor(headParticleGuiState, 'headColor').name('Head Color').onChange((v) => headParticleTrail.setHeadColor(v));
  fHeadParticles.addColor(headParticleGuiState, 'youngColor').name('Young Color').onChange((v) => headParticleTrail.setYoungColor(v));
  fHeadParticles.addColor(headParticleGuiState, 'midColor').name('Mid Color').onChange((v) => headParticleTrail.setMidColor(v));
  fHeadParticles.addColor(headParticleGuiState, 'oldColor').name('Old Color').onChange((v) => headParticleTrail.setOldColor(v));
  fHeadParticles.add(headParticleGuiState, 'rainbowSpeed', 0.0, 1.0, 0.01).name('Rainbow Speed').onChange((v) => headParticleTrail.setRainbowSpeed(v));
  fHeadParticles.add(headParticleGuiState, 'rainbowSaturation', 0.0, 1.0, 0.01).name('Rainbow Saturation').onChange((v) => headParticleTrail.setRainbowSaturation(v));
  fHeadParticles.add(headParticleGuiState, 'brightness', 0.2, 2.0, 0.05).name('Brightness').onChange((v) => headParticleTrail.setBrightness(v));
  fHeadParticles.add(headParticleGuiState, 'particleBloom', 0.0, 2.5, 0.05).name('Particle Bloom').onChange((v) => headParticleTrail.setParticleBloom(v));
  fHeadParticles.add(headParticleGuiState, 'headBloom', 0.2, 2.5, 0.05).name('Head Bloom').onChange((v) => headParticleTrail.setHeadBloom(v));
  fHeadParticles.add(headParticleGuiState, 'emissionRate', 40, 300, 5).name('Emission Rate').onChange((v) => headParticleTrail.setEmissionRate(v));
  fHeadParticles.add(headParticleGuiState, 'speed', 0.25, 2.5, 0.05).name('Travel Speed').onChange((v) => { headParticleTrail.speed = v; });
  fHeadParticles.add(headParticleGuiState, 'follow').name('Follow Camera').onChange((v) => { headParticleFollowCam.inited = false; if (!v) controls.enabled = true; });
  // Apply the default custom palette to the uniforms immediately so
  // switching Color Mode to "custom" shows the intended colours right away
  // rather than the shader's own hardcoded initial defaults.
  headParticleTrail.setColors({ head: headParticleGuiState.headColor, young: headParticleGuiState.youngColor, mid: headParticleGuiState.midColor, old: headParticleGuiState.oldColor });
}

// Trail Lyrics Font Support V1 — small GUI dropdown for testing fonts live
// (spec: "Add small GUI control for font family testing"). Each value is a
// full CSS font-family stack ending in a generic fallback (spec: "Keep
// fallback fonts"). "Missing Font" deliberately references a family that
// doesn't exist anywhere, to exercise the ordinary CSS-fallback path (the
// browser silently falls through to Georgia/serif — no special-case code
// needed for that, canvas font resolution already works this way).
const TRAIL_LYRICS_FONT_PRESETS = {
  'Serif (default)': 'Georgia, "Times New Roman", serif',
  'Sans-serif': '"Noto Sans", Arial, Helvetica, sans-serif',
  'Japanese (Noto Sans JP)': '"Noto Sans JP", "Yu Gothic", Meiryo, sans-serif',
  'Missing Font (fallback test)': '"NoSuchFontXYZ", Georgia, "Times New Roman", serif',
};
if (trailLyricsEnabled) {
  trailLyricsGuiState = {
    enabled: trailLyrics.enabled,
    paused: false,
    localTime: 0,
    fontPreset: 'Serif (default)',
    textScale: trailLyrics.textScale,
    formationDistance: trailLyrics.formationDistance,
    formationHeightOffset: trailLyrics.formationHeightOffset,
    assembleDuration: trailLyrics.assembleDuration,
    holdDuration: trailLyrics.holdDuration,
    leaveDuration: trailLyrics.leaveDuration,
    dissolveDuration: trailLyrics.dissolveDuration,
    textGlow: trailLyrics.textGlow,
    particleContribution: trailLyrics.particleContribution,
    billboardRelease: trailLyrics.billboardRelease,
    positionRelease: trailLyrics.positionRelease,
    followSmoothing: trailLyrics.followSmoothing,
  };
  const fTrailLyrics = gui.addFolder('Trail Lyrics V1');
  fTrailLyrics.add({ restart: () => trailLyrics.restart() }, 'restart').name('Restart');
  fTrailLyrics.add(trailLyricsGuiState, 'enabled').name('Enabled').onChange((v) => { trailLyrics.enabled = v; });
  fTrailLyrics.add(trailLyricsGuiState, 'paused').name('Pause').onChange((v) => trailLyrics.setPaused(v));
  fTrailLyrics.add(trailLyricsGuiState, 'localTime', 0, 30, 0.05).name('Local Time').listen().onChange((v) => trailLyrics.setTime(v));
  fTrailLyrics.add(trailLyricsGuiState, 'textScale', 0.4, 2.0, 0.02).name('Text Scale').onChange((v) => { trailLyrics.textScale = v; });
  fTrailLyrics.add(trailLyricsGuiState, 'formationDistance', 0.2, 0.9, 0.02).name('Formation Distance').onChange((v) => { trailLyrics.formationDistance = v; });
  fTrailLyrics.add(trailLyricsGuiState, 'formationHeightOffset', -6, 10, 0.25).name('Formation Offset').onChange((v) => { trailLyrics.formationHeightOffset = v; });
  fTrailLyrics.add(trailLyricsGuiState, 'assembleDuration', 0.5, 4.0, 0.1).name('Assemble Duration').onChange((v) => { trailLyrics.assembleDuration = v; });
  fTrailLyrics.add(trailLyricsGuiState, 'holdDuration', 0.5, 6.0, 0.1).name('Hold Duration').onChange((v) => { trailLyrics.holdDuration = v; });
  fTrailLyrics.add(trailLyricsGuiState, 'leaveDuration', 0.5, 6.0, 0.1).name('Leave Duration').onChange((v) => { trailLyrics.leaveDuration = v; });
  fTrailLyrics.add(trailLyricsGuiState, 'dissolveDuration', 0.5, 6.0, 0.1).name('Dissolve Duration').onChange((v) => { trailLyrics.dissolveDuration = v; });
  fTrailLyrics.add(trailLyricsGuiState, 'textGlow', 0.2, 2.5, 0.05).name('Text Glow').onChange((v) => { trailLyrics.textGlow = v; });
  fTrailLyrics.add(trailLyricsGuiState, 'particleContribution', 0.0, 1.5, 0.05).name('Particle Contribution').onChange((v) => { trailLyrics.particleContribution = v; });
  fTrailLyrics.add(trailLyricsGuiState, 'billboardRelease', 0.0, 1.0, 0.02).name('Billboard Release').onChange((v) => { trailLyrics.billboardRelease = v; });
  fTrailLyrics.add(trailLyricsGuiState, 'positionRelease', 0.0, 1.0, 0.02).name('Position Release').onChange((v) => { trailLyrics.positionRelease = v; });
  fTrailLyrics.add(trailLyricsGuiState, 'followSmoothing', 0.5, 15.0, 0.25).name('Follow Smoothing').onChange((v) => { trailLyrics.followSmoothing = v; });
  // Trail Lyrics Font Support V1 — setFont() waits for the Font Loading API
  // (with a timeout, never hangs) before regenerating the glyph texture, so
  // switching this mid-scene shows the new font's real metrics immediately
  // rather than a stale fallback-font shape.
  fTrailLyrics.add(trailLyricsGuiState, 'fontPreset', Object.keys(TRAIL_LYRICS_FONT_PRESETS)).name('Font (test)').onChange((label) => {
    trailLyrics.setFont({ fontFamily: TRAIL_LYRICS_FONT_PRESETS[label] });
  });
}

if (autoDirectorEnabled) {
  autoDirectorGuiState = {
    enabled: autoDirector.enabled,
    auto: autoDirector.auto,
    cameraMode: autoDirector.cameraMode,
    seed: autoDirector.seed,
    minShotDuration: autoDirector.minShotDuration,
    maxShotDuration: autoDirector.maxShotDuration,
    transitionTime: autoDirector.transitionTime,
    allowCuts: autoDirector.allowCuts,
    paused: autoDirector.paused,
  };
  const fAutoDirector = gui.addFolder('Auto Director');
  fAutoDirector.add(autoDirectorGuiState, 'enabled').name('Enabled').onChange((v) => {
    autoDirector.enabled = v;
    if (!v) { headParticleFollowCam.inited = false; controls.enabled = !(headParticleGuiState && headParticleGuiState.follow); }
  });
  fAutoDirector.add(autoDirectorGuiState, 'auto').name('Auto').onChange((v) => { autoDirector.auto = v; });
  fAutoDirector.add(autoDirectorGuiState, 'cameraMode', AutoDirector.presetLabels).name('Camera Mode').listen().onChange((v) => {
    autoDirector.setMode(v, undefined, camera.position, controls.target);
  });
  fAutoDirector.add(autoDirectorGuiState, 'seed', 0, 99999, 1).name('Seed').onChange((v) => { autoDirector.seed = v >>> 0; autoDirector.restart(); });
  fAutoDirector.add(autoDirectorGuiState, 'minShotDuration', 1, 15, 0.5).name('Min Shot Duration').onChange((v) => { autoDirector.minShotDuration = v; });
  fAutoDirector.add(autoDirectorGuiState, 'maxShotDuration', 1, 20, 0.5).name('Max Shot Duration').onChange((v) => { autoDirector.maxShotDuration = v; });
  fAutoDirector.add(autoDirectorGuiState, 'transitionTime', 0.1, 4.0, 0.1).name('Transition Time').onChange((v) => { autoDirector.transitionTime = v; });
  fAutoDirector.add(autoDirectorGuiState, 'allowCuts').name('Allow Cuts').onChange((v) => { autoDirector.allowCuts = v; });
  fAutoDirector.add(autoDirectorGuiState, 'paused').name('Pause').onChange((v) => { autoDirector.paused = v; });
  fAutoDirector.add({ next: () => autoDirector.requestNextShot(camera.position, controls.target) }, 'next').name('Next Shot');
}

if (lyricTimelineEnabled) {
  lyricTimelineGuiState = {
    enabled: lyricTimeline.enabled,
    time: 0,
    paused: lyricTimeline.paused,
    speed: lyricTimeline.speed,
    currentEvent: '(none yet)',
    timingSource: 'Manual JSON',
    loadedCues: 0, // filled in once the fetch above resolves
  };
  const fLyricTimeline = gui.addFolder('Lyric Timeline');
  fLyricTimeline.add(lyricTimelineGuiState, 'enabled').name('Enabled').onChange((v) => { lyricTimeline.enabled = v; });
  // Range covers Event 4's real ~38-41s window (see FOREVERMORE REAL TIMING
  // JSON INTEGRATION V1 report for the measured cue times).
  fLyricTimeline.add(lyricTimelineGuiState, 'time', 0, 45, 0.05).name('Time').listen().onChange((v) => lyricTimeline.setTime(v));
  fLyricTimeline.add(lyricTimelineGuiState, 'paused').name('Pause').onChange((v) => lyricTimeline.setPaused(v));
  fLyricTimeline.add(lyricTimelineGuiState, 'speed', 0.1, 3.0, 0.05).name('Playback Speed').onChange((v) => { lyricTimeline.speed = v; });
  fLyricTimeline.add(lyricTimelineGuiState, 'currentEvent').name('Current Event').listen().disable();
  fLyricTimeline.add(lyricTimelineGuiState, 'timingSource').name('Timing Source').disable();
  fLyricTimeline.add(lyricTimelineGuiState, 'loadedCues').name('Loaded Cues').listen().disable();
  fLyricTimeline.add({ restart: () => lyricTimeline.restart() }, 'restart').name('Restart');
  fLyricTimeline.add({ next: () => {
    const ev = lyricTimeline.getNextEvent();
    if (ev) lyricTimeline.setTime(ev.triggerTime);
  } }, 'next').name('Next Event');
}

if (audioEnabled) {
  audioGuiState = {
    loaded: false,
    playing: false,
    time: 0,
    volume: audioController.volume,
    playbackRate: audioController.playbackRate,
    syncLyrics: !!lyricTimelineEnabled,
  };
  const fAudio = gui.addFolder('Audio');
  fAudio.add(audioGuiState, 'loaded').name('Loaded').listen().disable();
  // A single checkbox toggling play/pause: onChange requests the change,
  // and since `playing` is re-synced from audio.paused every frame below,
  // a blocked play() (autoplay policy) simply snaps the box back to
  // unchecked next frame rather than getting stuck out of sync with reality.
  fAudio.add(audioGuiState, 'playing').name('Play / Pause').listen().onChange((v) => {
    if (v) audioController.play(); else audioController.pause();
  });
  fAudio.add({ restart: () => audioController.restart() }, 'restart').name('Restart');
  fAudio.add(audioGuiState, 'time', 0, 300, 0.1).name('Time').listen().onChange((v) => audioController.setTime(v));
  fAudio.add(audioGuiState, 'volume', 0, 1, 0.01).name('Volume').onChange((v) => { audioController.setVolume(v); });
  fAudio.add(audioGuiState, 'playbackRate', 0.5, 1.5, 0.01).name('Playback Rate').onChange((v) => { audioController.setPlaybackRate(v); });
  fAudio.add(audioGuiState, 'syncLyrics').name('Sync Lyrics').listen().onChange((v) => { audioGuiState.syncLyrics = v; });
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
const _headParticleHeadTmp = new THREE.Vector3();
const _headParticleDesiredPos = new THREE.Vector3();
const _headParticleLookTmp = new THREE.Vector3();
const _headParticleRightTmp = new THREE.Vector3();
const _headParticleUpWorld = new THREE.Vector3(0, 1, 0);

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
  if (timeEnabled && timeGuiState.autoPlay) {
    timeGuiState.time = (timeGuiState.time + dt * timeGuiState.speed) % 1;
    setTimeOfDay(timeGuiState.time);
    if (timeSliderCtrl) timeSliderCtrl.updateDisplay();
  }

  // Camera ownership: Head Particle Trail's follow camera (or, when active,
  // Auto Director — see below) takes over orbit-control input.
  const autoDirectorActive = !!(autoDirector && autoDirector.enabled);
  if (headParticleTrail && headParticleGuiState) controls.enabled = !headParticleGuiState.follow && !autoDirectorActive;
  else if (autoDirectorActive) controls.enabled = false;
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
  if (lyricParticles) lyricParticles.update(dt, time, ocean);
  if (headParticleTrail) {
    headParticleTrail.update(dt, time, ocean, camera.position);
    // Head Particle Trail local water glint (Ocean.js's block is gated
    // behind uTravelerGlowIntensity > 0, defaulting to 0 — mathematically a
    // no-op when Head Particle Trail mode is inactive). Reuses the exact
    // same authoritative head position already computed for the visible
    // head this frame — never a second/reconstructed position — so a
    // detached water-glint blob (caused by a stale or separately-derived
    // head position) cannot occur.
    ocean.uniforms.uTravelerHeadPos.value.copy(headParticleTrail.getHeadPosition(_headParticleHeadTmp));
    ocean.uniforms.uTravelerGlowIntensity.value = 1.0;
    ocean.uniforms.uTravelerGlowColor.value.copy(headParticleTrail.waterGlintColor);
    // Auto Director, when active, fully owns the camera instead of this
    // diagonal follow camera (see the update() call below) — gating this
    // block on !autoDirectorActive is what keeps "Follow Camera behavior
    // unchanged when Auto Director is disabled" (spec 3/27) exactly true:
    // when autoDirector is absent or its own Enabled toggle is off, this
    // code path is byte-for-byte what ran before Auto Director existed.
    if (headParticleGuiState && headParticleGuiState.follow && !autoDirectorActive) {
      controls.enabled = false;
      const head = headParticleTrail.getHeadPosition(_headParticleHeadTmp);
      const dir = headParticleTrail.travelDir;
      const right = _headParticleRightTmp.crossVectors(dir, _headParticleUpWorld);
      if (right.lengthSq() < 1e-6) right.set(1, 0, 0); else right.normalize();
      const desiredPos = _headParticleDesiredPos.copy(head).addScaledVector(dir, -22).addScaledVector(right, 18);
      desiredPos.y += 10;
      const desiredLook = _headParticleLookTmp.copy(head).addScaledVector(dir, 8).addScaledVector(right, -5);
      if (!headParticleFollowCam.inited) {
        camera.position.copy(desiredPos);
        headParticleFollowCam.look.copy(desiredLook);
        headParticleFollowCam.inited = true;
      } else {
        const damp = 1 - Math.pow(0.0008, dt);
        camera.position.lerp(desiredPos, damp);
        headParticleFollowCam.look.lerp(desiredLook, damp);
      }
      camera.lookAt(headParticleFollowCam.look);
      controls.target.copy(headParticleFollowCam.look);
    }
  }
  // Auto Director (V1, opt-in) — runs after Head Particle Trail so it reads
  // this frame's live head/travel-direction state, and BEFORE Trail Lyrics
  // so camera.quaternion reflects Auto Director's own framing when a lyric
  // billboard reads the live camera orientation this frame (same ordering
  // rule the existing follow camera already relies on above).
  if (autoDirector) {
    autoDirector.update(dt, headParticleTrail, trailLyrics, camera, ocean, time);
    if (autoDirectorGuiState) autoDirectorGuiState.cameraMode = autoDirector.cameraMode;
    // Keep OrbitControls' target roughly in sync (even though controls are
    // disabled while active) so re-enabling manual orbit control later
    // doesn't snap from a stale target left over from before Auto Director
    // took the camera over.
    if (autoDirectorActive && headParticleTrail) controls.target.copy(headParticleTrail.getHeadPosition(_headParticleHeadTmp));
  }
  // Audio Sync (V1, opt-in) — mirrors live playback state into the GUI every
  // frame; does NOT touch LyricTimeline itself (see the block below for the
  // actual clock hookup). Reading these straight off the HTMLAudioElement
  // each frame means there is never a second "audio state" to drift from it.
  if (audioController && audioGuiState) {
    audioGuiState.loaded = audioController.loaded;
    audioGuiState.playing = !audioController.paused;
    audioGuiState.time = audioController.currentTime;
  }
  // Lyric Timeline (V1, opt-in) — runs BEFORE Trail Lyrics' own update() so
  // that if this frame crosses an event's triggerTime, TrailLyrics starts
  // consuming its fresh (post-beginEvent) cycle state this same frame.
  //
  // Audio Sync V1: when the GUI's "Sync Lyrics" toggle is on, the audio
  // element's own currentTime IS the timeline clock — setTime() (the exact
  // same method the manual Time slider already uses for seeking) is called
  // every frame instead of the dt-based update(). Exactly one of the two
  // ever runs per frame, so there is no second clock to drift out of sync:
  // pausing the audio freezes lyric timing for free (currentTime just stops
  // changing), and seeking/restarting the audio is indistinguishable from a
  // manual timeline seek from LyricTimeline's point of view.
  if (lyricTimeline) {
    const audioSyncActive = !!(audioController && audioGuiState && audioGuiState.syncLyrics);
    if (audioSyncActive) lyricTimeline.setTime(audioController.currentTime);
    else lyricTimeline.update(dt);
    if (lyricTimelineGuiState) {
      lyricTimelineGuiState.time = lyricTimeline.time;
      const active = lyricTimeline.getActiveEvent();
      lyricTimelineGuiState.currentEvent = active ? `${active.id} (${active.type}) — ${trailLyrics.phase}` : '(none yet)';
    }
  }
  // Runs AFTER the Head Particle Trail block above so camera.quaternion
  // already reflects this frame's follow-camera update (TrailLyrics reads
  // the camera's live orientation to build/track its billboard plane).
  if (trailLyrics) {
    trailLyrics.update(dt, time, headParticleTrail, camera);
    if (trailLyricsGuiState) trailLyricsGuiState.localTime = trailLyrics.localTime % trailLyrics.getCycleLength();
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
if (nightEnabled) {
  window.OCEAN.moonParams = moonParams;
  window.OCEAN.applyMoon = applyMoon;
  window.OCEAN.setMoonIntensity = setMoonIntensity;
  window.OCEAN.setStarVisibility = setStarVisibility;
}
if (timeEnabled) {
  window.OCEAN.setTimeOfDay = setTimeOfDay;
  Object.defineProperty(window.OCEAN, 'timeOfDay', { get: () => timeOfDayValue });
}
if (lyricsEnabled) {
  window.OCEAN.lyricParticles = lyricParticles;
  window.OCEAN.setLyricParticleTime = (t) => lyricParticles.setTime(t);
  window.OCEAN.setLyricParticlesPaused = (p) => lyricParticles.setPaused(p);
}
if (headParticlesEnabled) {
  window.OCEAN.headParticleTrail = headParticleTrail;
  window.OCEAN.setHeadParticleTime = (t) => { headParticleTrail.setTime(t); headParticleFollowCam.inited = false; };
  window.OCEAN.setHeadParticlePaused = (p) => headParticleTrail.setPaused(p);
  window.OCEAN.setHeadParticleEmissionRate = (r) => headParticleTrail.setEmissionRate(r);
  window.OCEAN.setHeadParticleColorMode = (m) => headParticleTrail.setColorMode(m);
  window.OCEAN.setHeadParticleColors = (opts) => headParticleTrail.setColors(opts);
  window.OCEAN.setHeadParticleBrightness = (v) => headParticleTrail.setBrightness(v);
  window.OCEAN.setHeadParticleBloom = (v) => headParticleTrail.setParticleBloom(v);
  window.OCEAN.setHeadParticleHeadBloom = (v) => headParticleTrail.setHeadBloom(v);
  window.OCEAN.setHeadParticleRainbowSpeed = (v) => headParticleTrail.setRainbowSpeed(v);
  window.OCEAN.setHeadParticleRainbowSaturation = (v) => headParticleTrail.setRainbowSaturation(v);
}
if (trailLyricsEnabled) {
  window.OCEAN.trailLyrics = trailLyrics;
  window.OCEAN.setTrailLyricTime = (t) => trailLyrics.setTime(t);
  window.OCEAN.setTrailLyricsPaused = (p) => trailLyrics.setPaused(p);
}
if (autoDirectorEnabled) {
  window.OCEAN.autoDirector = autoDirector;
  window.OCEAN.setDirectorAuto = (b) => { autoDirector.auto = !!b; if (autoDirectorGuiState) autoDirectorGuiState.auto = autoDirector.auto; };
  window.OCEAN.setDirectorMode = (name) => { autoDirector.setMode(name, undefined, camera.position, controls.target); };
  window.OCEAN.setDirectorSeed = (seed) => { autoDirector.seed = seed >>> 0; autoDirector.restart(); if (autoDirectorGuiState) autoDirectorGuiState.seed = autoDirector.seed; };
  window.OCEAN.nextDirectorShot = () => autoDirector.requestNextShot(camera.position, controls.target);
}
if (lyricTimelineEnabled) {
  window.OCEAN.lyricTimeline = lyricTimeline;
  // Live getter (spec 6) rather than a plain snapshot value, so reading it
  // from the console always reflects the current song-clock position.
  Object.defineProperty(window.OCEAN, 'lyricTimelineTime', { configurable: true, get: () => lyricTimeline.time });
  window.OCEAN.setLyricTimelineTime = (seconds) => {
    lyricTimeline.setTime(seconds);
    if (lyricTimelineGuiState) lyricTimelineGuiState.time = lyricTimeline.time;
  };
  window.OCEAN.setLyricTimelinePaused = (p) => {
    lyricTimeline.setPaused(p);
    if (lyricTimelineGuiState) lyricTimelineGuiState.paused = lyricTimeline.paused;
  };
  // Real Timing JSON Integration V1 (spec 11) — read-only inspection: the raw
  // fetched timing JSON (once loaded — live getter, not a stale snapshot,
  // since the fetch above resolves asynchronously) and a live getter for the
  // four compiled events' resolved id/sourceCueIndex/sourceText/text/
  // audioVocalTime/preRoll/triggerTime. No mutable internals exposed here —
  // use setLyricTimelineTime()/setLyricTimelinePaused() above for control.
  Object.defineProperty(window.OCEAN, 'foreverMoreTiming', { configurable: true, get: () => foreverMoreTimingData });
  Object.defineProperty(window.OCEAN, 'lyricEvents', { configurable: true, get: () => lyricTimeline.getDebugEvents() });
}
if (audioEnabled) {
  window.OCEAN.audio = audioController;
  window.OCEAN.playAudio = () => audioController.play();
  window.OCEAN.pauseAudio = () => audioController.pause();
  window.OCEAN.setAudioTime = (seconds) => audioController.setTime(seconds);
  window.OCEAN.setAudioSyncLyrics = (v) => { if (audioGuiState) audioGuiState.syncLyrics = !!v; };
}

applySun();
setCloudsEnabled(true); // volumetric clouds on by default (toggle in the GUI)

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
  // glitter path leading down across the water toward camera.
  camera.position.set(10, 3, 48);
  controls.target.set(0, 2, 0);
  controls.update();

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

if (timeEnabled) {
  // Neutral framing: the same default camera every other mode without its
  // own explicit pose uses — Time-of-Day intentionally never couples to
  // camera position.
  setTimeOfDay(timeGuiState.time);
  gui.controllersRecursive().forEach((c) => c.updateDisplay());
}

if (lyricsEnabled) {
  // Default test environment: twilight/night reads best for glowing
  // particles (spec 31) — reuse the SAME continuous Time-of-Day controller
  // rather than a hand-rolled atmosphere, but only when nothing else has
  // already claimed the sky/ocean palette. When ?time=1 is also active, that
  // controller (and its own slider) remains authoritative (spec 31/37).
  if (!timeEnabled && !nightEnabled && !cinematicSunsetEnabled) {
    setTimeOfDay(0.79);
  }
  // Dedicated cinematic framing: open water, no island, room for the flock
  // to approach from distance (spec 32). Skipped when Time-of-Day/Night
  // already own the camera.
  if (!timeEnabled && !nightEnabled) {
    camera.position.set(0, 11, 75);
    controls.target.set(0, 12, 300);
    controls.update();
  }
  gui.controllersRecursive().forEach((c) => c.updateDisplay());
}

if (headParticlesEnabled) {
  // Default test environment: late golden hour reads strongly for a
  // luminous traveler while keeping the ocean clearly visible — reuse the
  // Time-of-Day controller, only when nothing else already claimed the
  // atmosphere.
  if (!timeEnabled && !nightEnabled && !cinematicSunsetEnabled) {
    setTimeOfDay(0.74);
  }
  // Static/base framing: looking down -Z across the head's path. The follow
  // camera (on by default) overrides this every frame — this pose is what
  // "Follow Camera" off actually shows.
  if (!timeEnabled && !nightEnabled) {
    camera.position.set(10, 18, 370);
    controls.target.set(10, 12, 120);
    controls.update();
  }
  gui.controllersRecursive().forEach((c) => c.updateDisplay());
}

animate();
