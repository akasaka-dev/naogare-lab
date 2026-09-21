import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';

import { Sky } from './Sky.js';
import { Ocean, OCEAN_CONFIG } from './Ocean.js';
import { Floor } from './Floor.js';
import { Island } from './Island.js';
import { Particles } from './Particles.js';
import { Rain } from './Rain.js';
import { Post } from './Post.js';
import { Clouds } from './Clouds.js';
import { HeadParticleTrail } from './HeadParticleTrail.js';
import { TrailLyricsManager } from './TrailLyricsManager.js';
import { AutoDirector } from './AutoDirector.js';
import { LyricTimeline } from './LyricTimeline.js';
import { TitleCreditOverlay } from './TitleCreditOverlay.js';
import { AudioController } from './AudioController.js';
import { getChoreography, baseTrailLyricsConfig, HOLD_TRAIL, HOLD_HERO } from './ForeverMoreLyrics.js';

// ---------------------------------------------------------------------------
//  Query Flags V2 — every ?feature=1 opt-in flag in this file is read
//  through this one case-INSENSITIVE lookup, not a plain
//  URLSearchParams.get(name) === '1'. Mobile Safari's address bar will
//  silently autocorrect/autocapitalize a manually-retyped camelCase
//  parameter name (e.g. "autoDirector" -> "autodirector") without any
//  visible warning, which previously made that one flag permanently
//  unreadable (an exact-case match against the now-mangled key never
//  succeeds) even though the URL "looks right" to the person who typed it.
// ---------------------------------------------------------------------------
function queryFlag(name) {
  const params = new URLSearchParams(window.location.search);
  const target = name.toLowerCase();
  for (const [key, value] of params) {
    if (key.toLowerCase() === target) return value === '1';
  }
  return false;
}

// ---------------------------------------------------------------------------
//  Boot
// ---------------------------------------------------------------------------
const container = document.getElementById('app');
const bootEl = document.getElementById('boot');
const depthEl = document.getElementById('depth');
const depthStateEl = document.getElementById('depth-state');
const depthValEl = document.getElementById('depth-val');
const travelerAltValEl = document.getElementById('traveler-alt-val');
const tcTitleEl = document.getElementById('tc-title');
const tcCreditEl = document.getElementById('tc-credit');
const realTimeEl = document.getElementById('realTime');
const realTimeDateEl = document.getElementById('real-time-date');
const realTimeClockEl = document.getElementById('real-time-clock');
const realTimeHourEl = document.getElementById('real-time-hour');
const realTimeColonEl = document.getElementById('real-time-colon');
const realTimeMinuteEl = document.getElementById('real-time-minute');
const startOverlayEl = document.getElementById('startOverlay');
const startMusicBtnEl = document.getElementById('start-music-btn');

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

// ---------------------------------------------------------------------------
//  Traveler Altitude V1 — Space press-and-hold changes the flight altitude
//  of the moving head particle/light itself (HeadParticleTrail.altitudeOffset),
//  NOT camera.position. See HeadParticleTrail.setAltitudeOffset().
// ---------------------------------------------------------------------------
const TRAVELER_ALTITUDE_SPEED = 7.0;
const MIN_TRAVELER_ALTITUDE_OFFSET = -8.0;
const MAX_TRAVELER_ALTITUDE_OFFSET = 80.0;
let travelerAltitudeOffset = 0;
let travelerAltitudeDirection = 1; // +1 UP, -1 DOWN — next hold's direction
let travelerAltitudeSpaceHeld = false;

window.addEventListener('keydown', (event) => {
  if (event.code !== 'Space') return;
  event.preventDefault();
  if (event.repeat) return;
  if (travelerAltitudeSpaceHeld) return;
  travelerAltitudeSpaceHeld = true;
});

window.addEventListener('keyup', (event) => {
  if (event.code !== 'Space') return;
  event.preventDefault();
  travelerAltitudeSpaceHeld = false;
  travelerAltitudeDirection *= -1; // next press moves the other way
});

window.addEventListener('blur', () => {
  travelerAltitudeSpaceHeld = false; // do NOT toggle direction here
});

// ---------------------------------------------------------------------------
//  Device Tilt Altitude V1 — a mobile-friendly equivalent of the Space-key
//  hold above, for devices with no keyboard: tilting the device front-to-
//  back (away from however it was held when first granted) continuously
//  biases the SAME travelerAltitudeOffset via the SAME TRAVELER_ALTITUDE_SPEED
//  constant (see animate()'s own application further down) — reused, not
//  reimplemented, so tilting feels identical in speed/range to holding
//  Space, and the two simply add together if a device somehow has both.
//  deviceorientation callbacks are cheap (a couple of subtractions), so this
//  adds no measurable per-frame cost regardless of how often they fire.
//
//  iOS 13+ requires DeviceOrientationEvent.requestPermission() from inside
//  a real user gesture, so it's requested on this page's very first
//  pointerdown ANYWHERE ({ once: true }) rather than tying it to any one
//  button — Android/desktop browsers have no such gate and just start
//  receiving events once listened for.
// ---------------------------------------------------------------------------
let deviceTiltInput = 0; // continuous, -1 (tilt one way) .. +1 (tilt the other)
let deviceTiltBaseline = null; // calibrated from whatever the first reading is
const DEVICE_TILT_DEADZONE_DEG = 8; // small tilts near the held baseline are ignored (hand tremor)
const DEVICE_TILT_FULL_DEG = 35; // tilt this far from baseline (or more) for full-speed input

function handleDeviceOrientation(event) {
  if (event.beta === null || event.beta === undefined) return;
  if (deviceTiltBaseline === null) { deviceTiltBaseline = event.beta; return; }
  const delta = event.beta - deviceTiltBaseline;
  const mag = (Math.abs(delta) - DEVICE_TILT_DEADZONE_DEG) / (DEVICE_TILT_FULL_DEG - DEVICE_TILT_DEADZONE_DEG);
  deviceTiltInput = Math.sign(delta) * Math.min(1, Math.max(0, mag));
}

if (queryFlag('headParticles')) {
  // (headParticlesEnabled itself isn't declared until later in this file —
  // re-reading the same URL flag here avoids a temporal-dead-zone error
  // while still keeping this block next to Traveler Altitude V1 above.)
  window.addEventListener('pointerdown', function requestDeviceTiltOnce() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      DeviceOrientationEvent.requestPermission()
        .then((state) => { if (state === 'granted') window.addEventListener('deviceorientation', handleDeviceOrientation); })
        .catch(() => {});
    } else if (typeof DeviceOrientationEvent !== 'undefined') {
      window.addEventListener('deviceorientation', handleDeviceOrientation);
    }
  }, { once: true });
}

// ---------------------------------------------------------------------------
//  Manual A/D Steering V1 — A/D press-and-hold biases the traveler's
//  automatic horizontal steering (HeadParticleTrail.manualTurnInput), fully
//  independent of Space/altitude (Y). Input handling only lives here (held-
//  key state, resolved to -1/0/+1 every frame below); the actual turn-rate
//  integration is HeadParticleTrail's own (see its update()), matching the
//  same "main.js owns input, the trail class owns the resulting motion"
//  split already used for Traveler Altitude V1 above.
// ---------------------------------------------------------------------------
let travelerTurnLeftHeld = false;  // KeyA
let travelerTurnRightHeld = false; // KeyD

window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyA') { event.preventDefault(); travelerTurnLeftHeld = true; }
  else if (event.code === 'KeyD') { event.preventDefault(); travelerTurnRightHeld = true; }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'KeyA') { event.preventDefault(); travelerTurnLeftHeld = false; }
  else if (event.code === 'KeyD') { event.preventDefault(); travelerTurnRightHeld = false; }
});

window.addEventListener('blur', () => {
  // Same tab-switch safety as Traveler Altitude V1 above — never leave
  // manual steering stuck engaged after focus loss.
  travelerTurnLeftHeld = false;
  travelerTurnRightHeld = false;
});

// ---------------------------------------------------------------------------
//  Flick Gesture V1 — touch-only mobile equivalent of Space (altitude) and
//  A/D (steering); see Device Tilt Altitude's own comment above for why
//  tilt alone isn't reliable on iOS (DeviceOrientationEvent's permission
//  gate requires HTTPS, which a plain-HTTP LAN dev URL — the normal way to
//  open this on a phone during development — doesn't satisfy).
//
//  Drives the EXACT SAME state each of those keys already uses — never a
//  new movement system, just another way of setting the same variables, so
//  speed/range/smoothing all stay byte-for-byte identical regardless of
//  input source:
//    vertical flick   -> travelerAltitudeSpaceHeld / travelerAltitudeDirection
//    horizontal flick -> travelerTurnLeftHeld / travelerTurnRightHeld
//  V2: a flick AGAINST whichever direction is currently held on that axis
//  stops it (== releasing the key) — it does NOT reverse straight into the
//  opposite motion; from a stop, a separate later flick is what actually
//  starts moving the other way. A flick in the SAME direction as one
//  already held is a no-op (already doing that). V1 had this backwards
//  (same-direction flick to stop) and it read as unintuitive — "flick
//  against the current motion to brake" matches how a physical flick/toss
//  actually feels. Whichever axis (dx vs dy) moved further decides which of
//  the two this gesture affects — never both from one flick. Ignored while
//  OrbitControls owns dragging (Follow Camera off) so it can never fight a
//  manual orbit, and ignored over any interactive control for the same
//  reason as Tap-to-Pause.
// ---------------------------------------------------------------------------
const FLICK_MIN_DIST = 40; // px
const FLICK_MAX_MS = 350;
let flickStartX = 0, flickStartY = 0, flickStartT = 0;
window.addEventListener('pointerdown', (event) => {
  flickStartX = event.clientX; flickStartY = event.clientY; flickStartT = performance.now();
});
window.addEventListener('pointerup', (event) => {
  if (controls.enabled) return; // OrbitControls owns dragging right now (Follow Camera off) — never fight it
  if (event.target.closest && event.target.closest('button, input, select, textarea, .lil-gui, .editor-ui')) return;
  const heldMs = performance.now() - flickStartT;
  if (heldMs > FLICK_MAX_MS) return; // too slow to be a flick
  const dy = event.clientY - flickStartY;
  const dx = event.clientX - flickStartX;
  const absDx = Math.abs(dx), absDy = Math.abs(dy);
  // A plain tap (too small to be a flick) is deliberately left alone here —
  // it's also what Tap-to-Pause (audio) listens for, and having a tap do
  // BOTH "pause the music" and "stop moving" at once is surprising/unwanted.
  // Stopping stays exactly the flick-against-the-current-motion gesture below.
  if (Math.max(absDx, absDy) < FLICK_MIN_DIST) return;
  if (absDy >= absDx) {
    // Vertical -> altitude, same toggle shape as Space.
    const flickDirection = dy < 0 ? 1 : -1; // finger moved up the screen -> ascend
    if (!travelerAltitudeSpaceHeld) {
      travelerAltitudeDirection = flickDirection;
      travelerAltitudeSpaceHeld = true;
    } else if (travelerAltitudeDirection !== flickDirection) {
      travelerAltitudeSpaceHeld = false; // flicked against the current motion -> stop, don't reverse straight into it
    } // else: flicked the same way already moving -> no-op
  } else {
    const flickIsLeft = dx < 0;
    if (!travelerTurnLeftHeld && !travelerTurnRightHeld) {
      // Horizontal, from a stop -> steering, same toggle shape as A/D.
      travelerTurnLeftHeld = flickIsLeft;
      travelerTurnRightHeld = !flickIsLeft;
    } else if (travelerTurnLeftHeld !== flickIsLeft) {
      // Flicked against whichever way is currently held -> stop, don't reverse straight into it.
      travelerTurnLeftHeld = false;
      travelerTurnRightHeld = false;
    } // else: flicked the same way already turning -> no-op
  }
});

// ---------------------------------------------------------------------------
//  Free Navigation V1 — deliberately NOT a new steering/turning algorithm:
//  it only decides WHICH input value to feed into the exact same
//  HeadParticleTrail.setManualTurnInput(-1/0/+1) entry point Manual A/D
//  Steering V1 already uses above, so the resulting turn-rate integration,
//  smoothing, and motion are byte-for-byte identical to a person physically
//  holding A/D. Every Steering Interval seconds, one of the three states is
//  picked uniformly at random (repeats allowed) and then held constant —
//  Math.random() is called only at that switch, never per frame. Vertical
//  motion (see the animate() loop) is a fully separate additive sine term on
//  top of Traveler Altitude V1's own travelerAltitudeOffset, so Space still
//  works unchanged whether or not Free Navigation is active.
// ---------------------------------------------------------------------------
const FREE_NAV_STATES = [-1, 0, 1];
let freeNavState = 0;
let freeNavTimer = 0;
let freeNavVerticalTheta = 0; // continuous phase for the vertical sine wave — advanced by dt, never reassigned from elapsed time
let freeNavWasEnabled = false; // edge-detected in animate() so enabling always starts from a clean state/phase

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
//  Rain V1 — opt-in via ?rain=1 (OFF by default), toggleable at runtime with
//  the R key. Camera-local box, single draw call — see Rain.js. Does not
//  touch ocean/clouds/time-of-day/AutoDirector/HeadParticleTrail/TrailLyrics
//  /audio/post-processing; only reads the frame's existing `underwater` test.
// ---------------------------------------------------------------------------
const rainEnabled = queryFlag('rain');
const rain = new Rain(scene);
rain.setEnabled(rainEnabled);
window.addEventListener('keydown', (event) => {
  if (event.code !== 'KeyR') return;
  if (event.repeat) return;
  rain.toggle();
});

// ---------------------------------------------------------------------------
//  Presentation Mode V1 — press H to hide non-MV editor UI (lil-gui panel,
//  debug HUD) for clean MV playback/recording. A single CSS class toggle on
//  <body> (see index.html's `.editor-ui` rule) — nothing is
//  destroyed/recreated, so GUI state (open folders, slider values, etc.)
//  survives toggling untouched. Starts ON by default (clean-viewing-first):
//  press H to bring the editor UI back when it's actually needed.
// ---------------------------------------------------------------------------
let presentationMode = true;
function setPresentationMode(enabled) {
  presentationMode = enabled;
  document.body.classList.toggle('presentation-mode', enabled);
}
setPresentationMode(presentationMode); // apply the default above immediately, not just on the first H press
window.addEventListener('keydown', (event) => {
  if (event.code !== 'KeyH') return;
  if (event.repeat) return;
  const t = event.target;
  const tag = t && t.tagName;
  if (tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || (t && t.isContentEditable)) return;
  setPresentationMode(!presentationMode);
});

// ---------------------------------------------------------------------------
//  Triple-Tap Presentation Toggle V1 — the mobile equivalent of the H key
//  above (no keyboard to press H on), calling the EXACT SAME
//  setPresentationMode() — never a second toggle mechanism. Requires three
//  quick, small taps in a row (never a drag/flick), specifically so it
//  can't fire by accident from ordinary single-tap (Tap-to-Pause) or flick
//  (Flick Gesture) use elsewhere on this page.
// ---------------------------------------------------------------------------
const TRIPLE_TAP_MAX_GAP_MS = 400; // max time between consecutive taps
const TRIPLE_TAP_MAX_DIST = 24; // px — a real fingertip drifts noticeably more than a mouse click between touchstart/touchend; 10px was tight enough that real taps on a phone could fail this check every time
let tripleTapCount = 0;
let tripleTapLastT = 0;
let tripleTapStartX = 0, tripleTapStartY = 0, tripleTapDownT = 0;
window.addEventListener('pointerdown', (event) => {
  tripleTapStartX = event.clientX; tripleTapStartY = event.clientY; tripleTapDownT = performance.now();
});
window.addEventListener('pointerup', (event) => {
  const now = performance.now();
  const dist = Math.hypot(event.clientX - tripleTapStartX, event.clientY - tripleTapStartY);
  const heldMs = now - tripleTapDownT;
  if (dist >= TRIPLE_TAP_MAX_DIST || heldMs >= TRIPLE_TAP_MAX_GAP_MS) { tripleTapCount = 0; return; } // not a tap at all
  if (now - tripleTapLastT > TRIPLE_TAP_MAX_GAP_MS) tripleTapCount = 0; // gap since the last tap too long — restart the count
  tripleTapCount++;
  tripleTapLastT = now;
  if (tripleTapCount >= 3) {
    tripleTapCount = 0;
    setPresentationMode(!presentationMode);
  }
});

// ---------------------------------------------------------------------------
//  Cinematic Sunset V1 — opt-in via ?cinematicSunset=1. When absent, ocean
//  uniforms default to a neutral uSunsetAmount = 0 (see Ocean.js) and none of
//  this runs: no GUI folder, no preset override, no other visual change.
// ---------------------------------------------------------------------------
const cinematicSunsetEnabled = queryFlag('cinematicSunset');
const SUNSET_START_AMOUNT = 0.75; // moderate-strong — natural-cinematic, not an extreme red sea

// ---------------------------------------------------------------------------
//  Night V1 — opt-in via ?night=1. When absent, uNightAmount stays 0 (see
//  Ocean.js/Sky.js/Island.js/Floor.js) and none of this runs: no GUI folder,
//  no state change, no other visual change.
// ---------------------------------------------------------------------------
const nightEnabled = queryFlag('night');
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
const timeEnabled = queryFlag('time');

// ---------------------------------------------------------------------------
//  Head Particle Trail V1 — opt-in via ?headParticles=1. The accepted
//  traveler effect: the head is the ONLY emitter, particles own their own
//  world-space position once born, and there is no geometry connecting head
//  to tail that could ever misalign with it.
// ---------------------------------------------------------------------------
const headParticlesEnabled = queryFlag('headParticles');
const headParticleTrail = headParticlesEnabled ? new HeadParticleTrail(scene) : null;
let headParticleGuiState = null;
let freeNavGuiState = null;
const headParticleFollowCam = { look: new THREE.Vector3(), inited: false };

// ---------------------------------------------------------------------------
//  Trail Lyrics gate — ?trailLyrics=1, required alongside Head Particle
//  Trail (?headParticles=1) before Lyric Timeline mode (below) can activate
//  the real production lyric pipeline (TrailLyricsManager + LyricTimeline +
//  ForeverMoreLyrics). This flag no longer creates a standalone TrailLyrics
//  instance itself — TrailLyricsManager owns every TrailLyrics instance
//  that ever renders (one per concurrently-active phrase); see its own
//  comment and LyricTimeline.js.
// ---------------------------------------------------------------------------
const trailLyricsEnabled = headParticlesEnabled && queryFlag('trailLyrics');

// ---------------------------------------------------------------------------
//  Auto Director V1 — opt-in via ?autoDirector=1, only ever active alongside
//  Head Particle Trail (?headParticles=1). When absent, the existing Head
//  Particle Trail follow camera behaves exactly as before — this module and
//  its GUI/debug API simply don't exist. See AutoDirector.js for the full
//  six-preset / seeded-scheduler design.
// ---------------------------------------------------------------------------
const autoDirectorEnabled = headParticlesEnabled && queryFlag('autoDirector');
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
//  mechanism at all, only WHEN and WITH WHAT PARAMETERS it fires.
//
//  MusicLyricsTimeMark timing JSON: event vocal timing comes from
//  saikai-2026-02-22EngLast-lyrics-timing.json (authored/measured against
//  the real WAV via the MusicLyricsTimeMark tool, in the SAME absolute time
//  domain as audio.currentTime — no offset/calibration layer). It's fetched
//  once below and handed to LyricTimeline.setTimingData(), which groups and
//  resolves the cues itself — see LyricTimeline.js's class comment.
//
//  MusicLyricsTimeMark V2 Integration: MusicLyricsTimeMark's exported JSON
//  is now the sole source of truth for lyric text/time/endTime/group.
//  LyricTimeline builds its own phrase list at setTimingData() time by
//  grouping adjacent same-`group` cues (see LyricTimeline.js's class
//  comment) — ForeverMoreLyrics.js only supplies the `getChoreography()`
//  lookup (designType/preRoll/camera/leaveBehind per source cue index) and
//  the base trailLyricsConfig builder; it no longer hand-authors which
//  cues get grouped into a phrase.
// ---------------------------------------------------------------------------
const lyricTimelineEnabled = trailLyricsEnabled && queryFlag('lyricTimeline');
const LYRIC_TIMING_JSON_URL = './data/saikai-2026-02-22EngLast-lyrics-timing.json';
// TrailLyrics Multi-Instance V1: a dedicated manager owning a SET of
// independent TrailLyrics instances, one per concurrently-active phrase.
const trailLyricsManager = lyricTimelineEnabled ? new TrailLyricsManager(scene) : null;
const lyricTimeline = lyricTimelineEnabled
  ? new LyricTimeline(trailLyricsManager, {
      getChoreography,
      baseTrailLyricsConfig,
      legacyHoldDefaults: { trail: HOLD_TRAIL, hero: HOLD_HERO },
      // HERO events may request a stronger camera choice; TRAIL events
      // deliberately do nothing here and rely entirely on Auto Director's
      // own existing lyric-safe restriction (trailLyrics.getPhase() gating
      // during ASSEMBLE/HOLD) — never an aggressive override.
      onEventStart: (event) => {
        if (event.runtimeType === 'hero' && autoDirector && autoDirector.enabled) {
          autoDirector.setMode(event.camera, 'cut', camera.position, controls.target);
        }
      },
    })
  : null;
let lyricTimelineGuiState = null;
// Title / Credit Overlay V1 — drives the two DOM elements above from the
// exact same lyricTimeline.time clock (see the update() call below); kept
// entirely separate from TrailLyrics/TrailLyricsManager (cues 1-3 stay
// excluded from those per ForeverMoreLyrics.js, unchanged).
const titleCreditOverlay = lyricTimelineEnabled ? new TitleCreditOverlay(tcTitleEl, tcCreditEl) : null;
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
      // MusicLyricsTimeMark V2 Integration (spec 17) — validate the raw
      // JSON itself before ever grouping/scheduling it.
      const rawJsonSnapshot = JSON.stringify(data.lyrics); // to later confirm grouping never mutates the source (spec 17)
      if (!Array.isArray(data.lyrics) || data.lyrics.length !== 44) {
        console.error('[LyricTimeline] expected exactly 44 raw source cues, found', data.lyrics ? data.lyrics.length : 'none');
      }
      const seenIndices = new Set();
      for (const c of data.lyrics || []) {
        if (seenIndices.has(c.index)) console.error('[LyricTimeline] duplicate raw cue index', c.index);
        seenIndices.add(c.index);
        if (typeof c.time !== 'number' || !Number.isFinite(c.time) || c.time < 0) {
          console.error('[LyricTimeline] cue', c.index, 'has an invalid time:', c.time);
        }
        if (c.endTime !== undefined && c.endTime !== null) {
          if (typeof c.endTime !== 'number' || !Number.isFinite(c.endTime)) console.error('[LyricTimeline] cue', c.index, 'has a non-finite endTime:', c.endTime);
          else if (c.endTime <= c.time) console.error('[LyricTimeline] cue', c.index, 'endTime (' + c.endTime + ') is not > time (' + c.time + ')');
        }
        if (c.group !== undefined && c.group !== null && typeof c.group !== 'number' && typeof c.group !== 'string') {
          console.error('[LyricTimeline] cue', c.index, 'has an invalid group id:', c.group);
        }
      }

      lyricTimeline.setTimingData(data.lyrics);
      if (lyricTimelineGuiState) lyricTimelineGuiState.loadedCues = data.lyrics.length;

      // Grouping/scheduling must never mutate the source array (spec 17).
      if (JSON.stringify(data.lyrics) !== rawJsonSnapshot) {
        console.error('[LyricTimeline] setTimingData() mutated the raw source cues array — this must never happen.');
      }
      // No raw cue may disappear during grouping (spec 17): every one of
      // the 44 indices must appear in exactly one scheduled OR disabled
      // debug entry's sourceCueIndices.
      const fullScore = lyricTimeline.resolveDesignScore(data.lyrics);
      const coveredIndices = new Set();
      for (const p of fullScore) for (const i of p.sourceCueIndices) coveredIndices.add(i);
      for (const c of data.lyrics || []) {
        if (!coveredIndices.has(c.index)) console.error('[LyricTimeline] raw cue', c.index, 'disappeared during grouping/resolution.');
      }
      // This test file's known group 1 must resolve to exactly cues [18,19].
      const group1Phrase = fullScore.find((p) => p.group === 1);
      if (group1Phrase && (group1Phrase.sourceCueIndices.length !== 2 || group1Phrase.sourceCueIndices[0] !== 18 || group1Phrase.sourceCueIndices[1] !== 19)) {
        console.error('[LyricTimeline] group 1 resolved to', group1Phrase.sourceCueIndices, 'instead of the expected [18, 19].');
      }

      // Lyric Phrase Timeline invariants — setTimingData()/_resolveEndTimes()
      // already fail visibly per-phrase (console.error/warn) for unresolved
      // cues, invalid endTimes, and overlap; this checks the remaining
      // structural invariants across the final scheduled list.
      if (lyricTimeline.timingErrors.length > 0) {
        console.error('[LyricTimeline] phrase score has unresolved phrases:', lyricTimeline.timingErrors);
      }
      for (let i = 0; i < lyricTimeline.events.length; i++) {
        const e = lyricTimeline.events[i];
        if (i > 0 && e.triggerTime < lyricTimeline.events[i - 1].triggerTime) {
          console.error('[LyricTimeline] scheduled phrases are NOT sorted by triggerTime at', lyricTimeline.events[i - 1].id, '->', e.id);
        }
        if (!Number.isFinite(e.triggerTime)) console.error('[LyricTimeline] phrase "' + e.id + '": triggerTime is not finite');
        if (!Number.isFinite(e.endTime)) console.error('[LyricTimeline] phrase "' + e.id + '": endTime is not finite');
        if (e.endTime <= e.firstVocalTime) console.error('[LyricTimeline] phrase "' + e.id + '": endTime does not exceed its own firstVocalTime');
        if (e.endTime <= e.triggerTime) console.error('[LyricTimeline] phrase "' + e.id + '": endTime does not exceed triggerTime');
      }
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
const audioEnabled = queryFlag('audio');
const audioController = audioEnabled ? new AudioController('./audio/saikai-2026-02-22EngLast.wav') : null;
let audioGuiState = null;

// Lights — kept for any future MeshStandardMaterial/lit object (the ocean/
// island/sky are raw ShaderMaterials and ignore scene lights); the
// interactive floating-object feature that used to be their only consumer
// has been removed, so these are currently inert but harmless.
const sunLight = new THREE.DirectionalLight(0xfff2e0, 3.0);
scene.add(sunLight, sunLight.target);
const skyLight = new THREE.HemisphereLight(0xbfe4ff, 0x24424e, 1.1);
scene.add(skyLight);
// Night V1 (opt-in) — a separate, independent light; intensity is 0 until
// Night mode raises it, so normal/day/sunset lighting is unaffected.
const moonLight = new THREE.DirectionalLight(0xdfe6f0, 0.0);
scene.add(moonLight, moonLight.target);

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
  'Clear Sky': {
    // No clouds at all (cloudCoverage: 0) — calm, glassy, high-clarity water
    // so the open sky and the water itself (not cloud shadows/texture) do
    // the visual work. Otherwise closest in spirit to Tropical Noon.
    sun: { el: 55, az: 130 }, amplitude: 0.55, choppy: 0.4, speed: 0.95, waveCount: 26,
    exposure: 1.1, bloom: 0.45, clarity: 1.5, depthFalloff: 0.13, sunGlitter: 0.15, sss: 0.4,
    deep: '#04405c', shallow: '#4fe0d8', foam: '#ffffff', foamCoverage: 0.85, crestFoamStart: 1.6,
    fog: 0.9, shafts: 0.07,
    roughness: 0.05, cloudCoverage: 0, saturation: 1.1,
  },
  'Sun Shower': {
    // Rain V1 turned on (see Rainbow V1 in main.js's own render-loop doc for
    // why): the bow itself needs sun elevation well under 42 degrees to
    // clear the horizon, and partial (not total) cloud cover so there's
    // still a patch of clear sky for direct sunlight to actually reach the
    // rain — the classic "sun shower" look.
    sun: { el: 22, az: 140 }, amplitude: 0.75, choppy: 0.55, speed: 1.0, waveCount: 26,
    exposure: 1.05, bloom: 0.6, clarity: 1.1, depthFalloff: 0.16, sunGlitter: 0.3, sss: 0.4,
    deep: '#063049', shallow: '#4bb0ac', foam: '#f4fbff', foamCoverage: 0.88, crestFoamStart: 1.5,
    fog: 1.05, shafts: 0.06,
    roughness: 0.1, cloudCoverage: 0.4, saturation: 1.05,
    rain: true,
  },
};

function applyPreset(name, { skipSun = false } = {}) {
  const P = PRESETS[name];
  if (!P) return;
  const u = ocean.uniforms;
  // skipSun (Random Weather V1) — Time of Day (Auto Play/Show Time) owns
  // sun position continuously once active; applying a preset's own fixed
  // sun on top of that would fight it every frame. The manual Cinematic
  // dropdown never passes this — an explicit preset pick there always
  // includes its sun position, exactly as before.
  if (P.sun && !skipSun) { sunParams.elevation = P.sun.el; sunParams.azimuth = P.sun.az; }
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
  if (P.rain !== undefined) rain.setEnabled(P.rain); // works regardless of the ?rain=1 URL default — see Rain.js's own setEnabled()
  applySun();
  presetProxy.preset = name;   // keep the dropdown in sync (incl. programmatic calls)
  refreshColorCtrls();
  gui.controllersRecursive().forEach((c) => c.updateDisplay());
}

// ---------------------------------------------------------------------------
//  Random Weather V1 — reuses the EXISTING Cinematic PRESETS/applyPreset()
//  wholesale; no separate preset list, no independent per-parameter
//  randomization (which risks incoherent combinations, e.g. calm seas under
//  a storm sky — the whole point of applyPreset()'s hand-tuned bundles is
//  to avoid exactly that). Picked ONCE per "play" — on page load, and again
//  whenever the song repeats (Audio's own Repeat Time, or a manual
//  Restart — see those two call sites) — never on a continuous timer, so
//  the look stays stable for a whole play-through instead of shifting
//  mid-song. Skips entirely when an explicit, single-purpose mood flag
//  (?cinematicSunset=1 / ?night=1) is already dictating the look, and skips
//  just the sun position (see applyPreset()'s own skipSun doc) whenever
//  Time of Day (Auto Play or Show Time) is driving it continuously instead.
//  "Stormy Seas" is weighted down (doesn't suit the song) rather than
//  removed outright, so it can still turn up occasionally.
// ---------------------------------------------------------------------------
const RANDOM_WEATHER_WEIGHTS = { 'Stormy Seas': 0.1 };
function pickRandomPresetName() {
  const names = Object.keys(PRESETS);
  const totalWeight = names.reduce((sum, n) => sum + (RANDOM_WEATHER_WEIGHTS[n] ?? 1), 0);
  let r = Math.random() * totalWeight;
  for (const n of names) {
    const w = RANDOM_WEATHER_WEIGHTS[n] ?? 1;
    if (r < w) return n;
    r -= w;
  }
  return names[names.length - 1]; // float rounding fallback
}
function rollRandomWeather() {
  if (!randomWeatherGuiState.enabled) return;
  if (cinematicSunsetEnabled || nightEnabled) return; // an explicit mood flag always wins
  const skipSun = timeEnabled && !!timeGuiState && (timeGuiState.autoPlay || timeGuiState.showTime);
  applyPreset(pickRandomPresetName(), { skipSun });
}

// ---------------------------------------------------------------------------
//  GUI
// ---------------------------------------------------------------------------
const gui = new GUI({ title: 'Ocean' });
gui.domElement.classList.add('editor-ui'); // hidden by Presentation Mode (H key) — see index.html's .editor-ui rule

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
// Random Weather V1 (see rollRandomWeather()'s own doc) — on by default;
// unchecking it just stops future re-rolls (page load, Repeat Time, manual
// Restart), it does not revert whichever preset is already applied.
const randomWeatherGuiState = { enabled: true };
fPre.add(randomWeatherGuiState, 'enabled').name('Random Weather');

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

// Time Warp V1 — GUI: "Sunset Length" (timeGuiState.sunsetStretch, default
// 1 = off). Slows only the RATE at which `t` advances while the sun sits
// within the exact same elevation band already used for uSunsetAmount above
// (-14..14 degrees, peaking at 4 — see setTimeOfDay()), so the golden-hour/
// sunset TINT itself gets proportionally more real time to play out. This
// deliberately does not touch setTimeOfDay()'s own colour/elevation
// formulas at all (they still map `t` -> elevation/colour exactly as
// before) — only how fast `t` itself is advanced toward and through that
// band changes (see animate()'s own autoPlay block). Returns 1 (normal
// speed) outside the band, smoothly down to 1/stretch at the band's own
// peak elevation.
function todTimeWarpFactor(elevDeg, stretch) {
  const band = smoothstepJS(-14, 4, elevDeg) * (1 - smoothstepJS(4, 14, elevDeg));
  const slow = 1 / Math.max(1, stretch);
  return 1 - band * (1 - slow);
}

// Speed V2 — the "Speed" GUI field is now a log-scaled 0..1 slider instead
// of a linear t-units/sec value directly (was 0.005..0.3): a LINEAR slider
// cannot usefully span real-time (~1/86400 t-units/sec — one full day/night
// cycle per real 24h) up to a fast cinematic pace in the same control,
// since real-time is ~26000x slower than the old top end and would be
// indistinguishable from 0 on a linear scale. On this log scale, equal drag
// distance means equal SPEED RATIO instead of equal absolute speed, so
// real-time (slider = 0) through fast (slider = 1) are all comfortably
// reachable. todSpeedFromSlider() converts the slider position to the
// actual t-units/sec speed consumed by animate()'s autoPlay tick; nothing
// else about how that speed is used changed.
const TOD_SPEED_REALTIME = 1 / 86400; // one full day/night cycle per real 24 hours — the slider's 0 end
const TOD_SPEED_MAX = 0.3; // the slider's 1 end — same fastest pace the old linear slider topped out at
function todSpeedFromSlider(slider) {
  const s = Math.min(Math.max(slider, 0), 1);
  return TOD_SPEED_REALTIME * Math.pow(TOD_SPEED_MAX / TOD_SPEED_REALTIME, s);
}

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

  // Head Particle Trail (opt-in) — same shared per-stage tint table;
  // setTint() also nudges the head colour toward white so it stays the
  // brighter, more neutral object regardless of stage.
  if (headParticleTrail) {
    todBlendColor(w, TOD_TRAVELER_TINT, _todTintTmp);
    headParticleTrail.setTint(_todTintTmp);
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
  // Show Time defaults on now, so autoPlay/speed default to what its own
  // mutual-exclusion onChange would otherwise force them to — see
  // showTimeCtrl's own comment below.
  timeGuiState = { time: timeOfDayValue, autoPlay: false, speed: 0, sunsetStretch: 4.4, showTime: true, clockFontFamily: 'Georgia, "Times New Roman", serif' };
  const fTime = gui.addFolder('Day Animation');
  timeSliderCtrl = fTime.add(timeGuiState, 'time', 0, 1, 0.001).name('Time').onChange(setTimeOfDay);
  const autoPlayCtrl = fTime.add(timeGuiState, 'autoPlay').name('Auto Play').onChange((v) => {
    // Show Time V1 — mutually exclusive with Auto Play (see showTimeCtrl's
    // own comment below): turning Auto Play back on while Show Time is
    // active hands control of `time` back to the normal autoPlay tick, so
    // Show Time must be switched off here too, not just visually unchecked.
    if (v && timeGuiState.showTime) { timeGuiState.showTime = false; showTimeCtrl.updateDisplay(); realTimeEl.hidden = true; }
  });
  // Speed V2 (see todSpeedFromSlider()) — 0 = real time (one day/night
  // cycle per real 24h), 1 = fastest (one cycle in ~3.3s).
  const speedCtrl = fTime.add(timeGuiState, 'speed', 0, 1, 0.005).name('Speed');
  // Time Warp V1 (see todTimeWarpFactor()) — 1 = off (byte-for-byte the old
  // uniform-speed behaviour); >1 slows `t` specifically while passing
  // through the golden/horizon elevation band, stretching that band's own
  // real-time duration without changing the Speed slider's meaning
  // elsewhere in the cycle. Applies equally at BOTH crossings of that band
  // (sunrise ~t=0.25 AND sunset ~t=0.75) — todTimeWarpFactor() is a pure
  // function of the current sun elevation only, with no notion of "rising"
  // vs "setting", so both get the exact same stretch. Named "Sunrise/
  // Sunset Length" (not just "Sunset") specifically to avoid implying
  // otherwise.
  fTime.add(timeGuiState, 'sunsetStretch', 1.0, 8.0, 0.1).name('Sunrise/Sunset Length');
  // Show Time V1 — mutually exclusive with Auto Play (checking one
  // unchecks the other): while on, `time` is driven directly from the
  // real-world wall clock (see animate()'s own autoPlay block) instead of
  // any simulated speed, and a small real date/time readout confirms it
  // (#realTime, bottom-right — see index.html). Speed is forced to 0 only
  // as a visual "this slider isn't driving anything right now" cue; it is
  // not itself read while Show Time is active.
  const showTimeCtrl = fTime.add(timeGuiState, 'showTime').name('Show Time').onChange((v) => {
    if (v) {
      timeGuiState.autoPlay = false;
      autoPlayCtrl.updateDisplay();
      timeGuiState.speed = 0;
      speedCtrl.updateDisplay();
    }
    realTimeEl.hidden = !v;
  });
  // Clock Font V1 — free-text CSS font-family, same "type whatever string
  // you want" pattern as Trail Lyrics Style's own Font Family field.
  // Defaults to the same title-matched serif (see index.html's #realTime
  // .clock rule); left untouched here means the CSS default keeps
  // applying, so this only sets an inline override once the field is
  // actually edited.
  fTime.add(timeGuiState, 'clockFontFamily').name('Clock Font')
    .onChange((v) => { realTimeClockEl.style.fontFamily = v; });
  // lil-gui doesn't fire onChange for a controller's own initial value —
  // sync the overlay's visibility to timeGuiState.showTime's default here.
  realTimeEl.hidden = !timeGuiState.showTime;
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
    meanderStrength: 1.0,
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
  // Organic Meander V1 debug control (0 = pure base Catmull-Rom path, 1 =
  // intended V1 feel, 2 = exaggerated diagnostic).
  fHeadParticles.add(headParticleGuiState, 'meanderStrength', 0.0, 2.0, 0.05).name('Meander Strength').onChange((v) => headParticleTrail.setMeanderStrength(v));
  fHeadParticles.add(headParticleGuiState, 'follow').name('Follow Camera').onChange((v) => { headParticleFollowCam.inited = false; if (!v) controls.enabled = true; });
  // Apply the default custom palette to the uniforms immediately so
  // switching Color Mode to "custom" shows the intended colours right away
  // rather than the shader's own hardcoded initial defaults.
  headParticleTrail.setColors({ head: headParticleGuiState.headColor, young: headParticleGuiState.youngColor, mid: headParticleGuiState.midColor, old: headParticleGuiState.oldColor });

  // Free Navigation V1 GUI — see its own state-block comment further above
  // for the design (reuses Manual A/D Steering V1 verbatim; no new turning
  // algorithm). All four fields are read live from animate() every frame;
  // there is nothing to wire an onChange() to here.
  freeNavGuiState = {
    enabled: false,
    steeringInterval: 5.0,
    verticalAmplitude: 6.0,
    verticalPeriod: 20.0,
  };
  const fFreeNav = gui.addFolder('Free Navigation');
  fFreeNav.add(freeNavGuiState, 'enabled').name('Free Navigation');
  fFreeNav.add(freeNavGuiState, 'steeringInterval', 1.0, 20.0, 0.5).name('Steering Interval');
  fFreeNav.add(freeNavGuiState, 'verticalAmplitude', 0.0, 30.0, 0.5).name('Vertical Amplitude');
  fFreeNav.add(freeNavGuiState, 'verticalPeriod', 2.0, 60.0, 0.5).name('Vertical Period');
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
  // Full Song Lyric Events V1 (spec 21): range widened to cover the whole
  // ~311s track (was 0-45, sized only for the original 4-event prototype)
  // so manual review can seek anywhere in the full song, including the
  // wordless 60s finale tail after the last cue.
  fLyricTimeline.add(lyricTimelineGuiState, 'time', 0, 315, 0.05).name('Time').listen().onChange((v) => lyricTimeline.setTime(v));
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

  // Trail Lyrics Style GUI — development-time-only controls for every
  // lyric's glyph texture (see TrailLyrics.js's sampleTextTargets()).
  //   Text Color — the glyph fill color (default '#ffffff', matching
  //     #tc-title's color; e.g. '#000000' for black text). Never
  //     time-of-day tinted.
  //   Shadow Color — the canvas-drawn two-layer shadow's color (default
  //     '#000000', matching #tc-title's own black shadow), independent of
  //     Text Color — the two are never auto-inverted relative to each
  //     other (e.g. black text + the default black shadow will look mostly
  //     shadow-less, which is expected).
  //   Shadow Strength — scales that same shadow's alpha.
  //   Outline Width / Outline Color — a plain text-stroke (Canvas 2D
  //     strokeText), independent of and layered on top of the shadow above,
  //     purely for guaranteed legibility against any background (unlike the
  //     shadow, whose visible contrast depends on the background's own
  //     darkness). Width 0 disables it entirely (the original,
  //     stroke-less, title-matched look).
  //   Font Family — a free-text CSS font-family string passed directly
  //     into the Canvas 2D font declaration (default matches the existing
  //     title-matched serif look: 'Georgia, "Times New Roman", serif').
  //     Unlike the other controls, changing this ALSO reflows the particle
  //     target positions (the glyph shapes themselves changed — see
  //     TrailLyrics.setGlyphStyle()'s own comment on why).
  // All of these immediately update every currently active phrase's
  // texture, not just future ones — see TrailLyricsManager.setGlyphStyle().
  const trailLyricsStyleGuiState = {
    textColor: '#ffffff',
    shadowColor: '#302a79',
    shadowStrength: 2.0,
    outlineWidth: 2,
    outlineColor: '#000000',
    fontFamily: 'Georgia, "Times New Roman", serif',
  };
  const fTrailLyricsStyle = gui.addFolder('Trail Lyrics Style');
  fTrailLyricsStyle.addColor(trailLyricsStyleGuiState, 'textColor').name('Text Color')
    .onChange((v) => trailLyricsManager.setGlyphStyle({ textColor: v }));
  fTrailLyricsStyle.addColor(trailLyricsStyleGuiState, 'shadowColor').name('Shadow Color')
    .onChange((v) => trailLyricsManager.setGlyphStyle({ shadowColor: v }));
  // Range extended to 2.0 (was 1.0) — 1.0 is only the original title-matched
  // alpha (0.55/0.60, a fairly soft/moderate shadow); both shadow layers
  // reach fully solid/opaque by ~1.67-1.82, so 2.0 comfortably covers the
  // darkest the current two-layer design can produce (see
  // sampleTextTargets()'s own clamp).
  fTrailLyricsStyle.add(trailLyricsStyleGuiState, 'shadowStrength', 0.0, 2.0, 0.05).name('Shadow Strength')
    .onChange((v) => trailLyricsManager.setGlyphStyle({ shadowStrength: v }));
  fTrailLyricsStyle.add(trailLyricsStyleGuiState, 'outlineWidth', 0, 8, 0.5).name('Outline Width')
    .onChange((v) => trailLyricsManager.setGlyphStyle({ outlineWidth: v }));
  fTrailLyricsStyle.addColor(trailLyricsStyleGuiState, 'outlineColor').name('Outline Color')
    .onChange((v) => trailLyricsManager.setGlyphStyle({ outlineColor: v }));
  fTrailLyricsStyle.add(trailLyricsStyleGuiState, 'fontFamily').name('Font Family')
    .onFinishChange((v) => trailLyricsManager.setGlyphStyle({ fontFamily: v }));
  // lil-gui doesn't fire onChange for a controller's own initial value, and
  // TrailLyrics' own constructor defaults (shadowColor '#000000',
  // shadowStrength 1.0) predate this folder's now-different defaults above
  // — sync them into the manager once here, same pattern as
  // headParticleTrail.setColors() further up this file.
  trailLyricsManager.setGlyphStyle({ ...trailLyricsStyleGuiState });
}

if (audioEnabled) {
  audioGuiState = {
    loaded: false,
    // Reflects reality (paused at start) — see #startOverlay's own wiring
    // just below for how playback actually begins on mobile/desktop alike.
    playing: false,
    time: 0,
    volume: audioController.volume,
    // Repeat Time V1 — minutes; 0 disables entirely. See the per-frame
    // check further down (search "Repeat Time V1") for how this is
    // actually applied: it restarts (seeks to 0, keeps playing) once
    // audioController.currentTime reaches this many minutes, independent
    // of the track's own natural length/end — e.g. the default 10 minutes
    // restarts well before the ~5m15s track would otherwise reach its own
    // end and stop.
    repeatTime: 10,
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
  // Manual restart counts as "the song repeating" too — see rollRandomWeather().
  fAudio.add({ restart: () => { audioController.restart(); rollRandomWeather(); } }, 'restart').name('Restart');
  // Widened to cover the full ~311.07s track (spec 21) — was 0-300, just
  // short of the real duration.
  fAudio.add(audioGuiState, 'time', 0, 315, 0.1).name('Time').listen().onChange((v) => audioController.setTime(v));
  fAudio.add(audioGuiState, 'volume', 0, 1, 0.01).name('Volume').onChange((v) => { audioController.setVolume(v); });
  fAudio.add(audioGuiState, 'repeatTime', 0, 60, 1).name('Repeat Time (min)');
  fAudio.add(audioGuiState, 'syncLyrics').name('Sync Lyrics').listen().onChange((v) => { audioGuiState.syncLyrics = v; });

  // Start Overlay V1 — the ONE real user gesture this app can rely on:
  // mobile browsers (and increasingly desktop ones) simply refuse a
  // programmatic play() with nothing preceding it, no exceptions. This
  // button's click IS that gesture, satisfying every browser's autoplay
  // policy in one shot. Deliberately not gated on Presentation Mode (see
  // index.html's own comment on #startOverlay) since that defaults to ON
  // now and would otherwise leave mobile visitors with no way to ever
  // start audio at all.
  startOverlayEl.hidden = false;
  startMusicBtnEl.addEventListener('click', () => {
    audioController.play();
    startOverlayEl.classList.add('dismissed');
    setTimeout(() => { startOverlayEl.hidden = true; }, 550);
  });

  // Tap-to-Pause V1 — once the Start Overlay above is dismissed, a plain
  // tap/click anywhere toggles play/pause. Mainly for mobile, where
  // Presentation Mode's default-hidden GUI (see setPresentationMode()
  // further up) otherwise leaves no other one-tap way to pause. Only
  // fires for a genuine TAP: pointerup must land close to and soon after
  // pointerdown, so it never fights an orbit-drag or a pinch/scroll-zoom,
  // and it ignores any interactive control (GUI, the Start button itself)
  // via the same .closest() check either way.
  const TAP_MAX_MS = 400;
  const TAP_MAX_DIST = 24; // px — see Triple-Tap's own comment on why 10px was too tight for a real fingertip
  let tapStartX = 0, tapStartY = 0, tapStartT = 0;
  window.addEventListener('pointerdown', (event) => {
    tapStartX = event.clientX; tapStartY = event.clientY; tapStartT = performance.now();
  });
  window.addEventListener('pointerup', (event) => {
    if (!startOverlayEl.hidden) return; // Start Overlay still up — its own button handles this
    if (event.target.closest && event.target.closest('button, input, select, textarea, .lil-gui, .editor-ui')) return;
    const heldMs = performance.now() - tapStartT;
    const dist = Math.hypot(event.clientX - tapStartX, event.clientY - tapStartY);
    if (heldMs > TAP_MAX_MS || dist > TAP_MAX_DIST) return; // was a drag/pinch, not a tap
    if (audioController.paused) audioController.play(); else audioController.pause();
  });
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
    rain.mesh.visible = false;
  } else {
    ocean.mesh.visible = true;
    sky.mesh.visible = !underwater;
    floor.mesh.visible = true;
    particles.points.visible = underwater;
    rain.mesh.visible = rain.enabled && !underwater;
  }
}

function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  const dt = Math.min((now - lastNow) / 1000, 0.05);
  time += dt;
  lastNow = now;
  if (timeEnabled && timeGuiState.showTime) {
    // Show Time V1 — `time` mapped directly from the real-world wall clock
    // (midnight = 0, noon = 0.5, exactly matching setTimeOfDay()'s own
    // t=0/t=0.5 convention — see SUN_MAX_ELEVATION's sine above), never
    // Speed/Time Warp. Mutually exclusive with Auto Play (enforced at the
    // GUI level — see fTime's own showTime/autoPlay onChange handlers).
    const nowDate = new Date();
    const secondsOfDay = nowDate.getHours() * 3600 + nowDate.getMinutes() * 60 + nowDate.getSeconds();
    timeGuiState.time = secondsOfDay / 86400;
    setTimeOfDay(timeGuiState.time);
    if (timeSliderCtrl) timeSliderCtrl.updateDisplay();
    realTimeDateEl.textContent = `${nowDate.getFullYear()}/${nowDate.getMonth() + 1}/${nowDate.getDate()}`;
    realTimeHourEl.textContent = String(nowDate.getHours()).padStart(2, '0');
    realTimeMinuteEl.textContent = String(nowDate.getMinutes()).padStart(2, '0');
    // Blinking ":" V1 — toggled off/on roughly once per real second, driven
    // by the wall clock's own whole-second count (never a separate
    // accumulator), so it can't drift out of sync no matter the frame rate.
    realTimeColonEl.style.opacity = Math.floor(nowDate.getTime() / 1000) % 2 === 0 ? '1' : '0';
  } else if (timeEnabled && timeGuiState.autoPlay) {
    // Time Warp V1 (see todTimeWarpFactor()) — reads sunParams.elevation as
    // it stood after LAST frame's setTimeOfDay() call (one-frame lag,
    // imperceptible) to decide how fast `t` should advance THIS frame.
    const warp = todTimeWarpFactor(sunParams.elevation, timeGuiState.sunsetStretch);
    timeGuiState.time = (timeGuiState.time + dt * todSpeedFromSlider(timeGuiState.speed) * warp) % 1;
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
  if (headParticleTrail) {
    // Traveler Altitude V1: accumulate while Space is held, clamp, then push
    // into HeadParticleTrail BEFORE update() so this frame's live head
    // position and newly emitted trail particles use the new altitude.
    // Device Tilt Altitude V1 (see its own comment further up) adds on top
    // via the exact same speed constant — purely additive, so Space and
    // tilt combine naturally instead of fighting.
    if (travelerAltitudeSpaceHeld) {
      travelerAltitudeOffset += travelerAltitudeDirection * TRAVELER_ALTITUDE_SPEED * dt;
    }
    if (deviceTiltInput !== 0) {
      travelerAltitudeOffset += deviceTiltInput * TRAVELER_ALTITUDE_SPEED * dt;
    }
    travelerAltitudeOffset = Math.min(MAX_TRAVELER_ALTITUDE_OFFSET, Math.max(MIN_TRAVELER_ALTITUDE_OFFSET, travelerAltitudeOffset));

    // Free Navigation V1 vertical motion — a plain sine wave over a
    // continuously-advancing phase (theta += dt * angularSpeed, never a
    // position/time formula), fully independent of horizontal steering and
    // additive on top of Space's own travelerAltitudeOffset above (never
    // replacing it), so Space still works exactly as before regardless of
    // Free Navigation's on/off state. Enabling (rising edge) resets the
    // phase to 0 so the sine wave always starts from 0 contribution — no
    // instantaneous jump into whatever phase a background clock would
    // otherwise have drifted to.
    const freeNavEnabled = !!(freeNavGuiState && freeNavGuiState.enabled);
    let freeNavVerticalOffset = 0;
    if (freeNavEnabled) {
      if (!freeNavWasEnabled) {
        freeNavVerticalTheta = 0;
        freeNavState = FREE_NAV_STATES[Math.floor(Math.random() * FREE_NAV_STATES.length)];
        freeNavTimer = freeNavGuiState.steeringInterval;
      }
      freeNavTimer -= dt;
      if (freeNavTimer <= 0) {
        freeNavState = FREE_NAV_STATES[Math.floor(Math.random() * FREE_NAV_STATES.length)];
        freeNavTimer += freeNavGuiState.steeringInterval;
      }
      freeNavVerticalTheta += dt * (Math.PI * 2 / Math.max(0.001, freeNavGuiState.verticalPeriod));
      freeNavVerticalOffset = freeNavGuiState.verticalAmplitude * Math.sin(freeNavVerticalTheta);
    }
    freeNavWasEnabled = freeNavEnabled;

    headParticleTrail.setAltitudeOffset(travelerAltitudeOffset + freeNavVerticalOffset);
    if (travelerAltValEl) {
      travelerAltValEl.textContent = (travelerAltitudeOffset >= 0 ? '+' : '') + travelerAltitudeOffset.toFixed(1) + ' / ' + (travelerAltitudeDirection > 0 ? 'UP' : 'DOWN');
    }
    // Manual A/D Steering V1 input source: resolves to -1/0/+1 and pushes
    // into HeadParticleTrail BEFORE update(), same ordering reason as
    // altitude above — this frame's live steering integration reads it
    // immediately. Free Navigation V1, when enabled, REPLACES the user's
    // own held-key state with its own generated value here — same entry
    // point, same downstream turn-rate integration/smoothing, no separate
    // turning system. Physical A/D state is still tracked above regardless
    // of Free Navigation's on/off state, so turning Free Navigation back
    // off immediately and correctly resumes whatever the user is currently
    // (or isn't) physically holding.
    const travelerManualTurnInput = freeNavEnabled
      ? freeNavState
      : (travelerTurnLeftHeld ? -1 : 0) + (travelerTurnRightHeld ? 1 : 0);
    headParticleTrail.setManualTurnInput(travelerManualTurnInput);
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
    // TrailLyrics Multi-Instance V1: camera lyric-safety follows whichever
    // phrase is newest/currently forming-or-being-read (see
    // TrailLyricsManager.getNewestActivePhrase()) rather than every older
    // phrase still lingering behind as a leave-behind object — this is the
    // ONLY change AutoDirector.js's own lyric-safety gating needed; it
    // already just reads .getPhase() off whatever single object is passed
    // here. null when the timeline isn't running (AutoDirector's own
    // lyric-safe gating treats a null source as "no lyric currently up").
    const lyricSafetySource = trailLyricsManager ? trailLyricsManager.getNewestActivePhrase() : null;
    autoDirector.update(dt, headParticleTrail, lyricSafetySource, camera, ocean, time);
    if (autoDirectorGuiState) autoDirectorGuiState.cameraMode = autoDirector.cameraMode;
    // Keep OrbitControls' target roughly in sync (even though controls are
    // disabled while active) so re-enabling manual orbit control later
    // doesn't snap from a stale target left over from before Auto Director
    // took the camera over.
    if (autoDirectorActive && headParticleTrail) controls.target.copy(headParticleTrail.getHeadPosition(_headParticleHeadTmp));
  }
  // Rain V1: updated here, after AutoDirector (and the Head Particle Trail
  // follow-camera above it) have finalized camera.position for this frame,
  // so the rain volume is centred on wherever the camera actually ends up —
  // never a stale pre-AutoDirector position.
  rain.update(time, camera);
  // Audio Sync (V1, opt-in) — mirrors live playback state into the GUI every
  // frame; does NOT touch LyricTimeline itself (see the block below for the
  // actual clock hookup). Reading these straight off the HTMLAudioElement
  // each frame means there is never a second "audio state" to drift from it.
  if (audioController && audioGuiState) {
    audioGuiState.loaded = audioController.loaded;
    audioGuiState.playing = !audioController.paused;
    audioGuiState.time = audioController.currentTime;
    // Repeat Time V1 — restart once currentTime reaches this many minutes,
    // regardless of the track's own natural length; 0 disables it entirely.
    // Checked (and, before LyricTimeline's own sync below, applied) BEFORE
    // that sync runs, so a Sync-Lyrics-active timeline restarts on the SAME
    // frame instead of one frame later.
    if (audioGuiState.repeatTime > 0 && audioController.currentTime >= audioGuiState.repeatTime * 60) {
      audioController.restart();
      audioGuiState.time = audioController.currentTime;
      rollRandomWeather(); // see its own doc — "the song repeating" is exactly this moment
    }
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
    // Title / Credit Overlay V1: reads the SAME lyricTimeline.time this
    // frame's setTime()/update() above just produced — correct immediately
    // after any seek, with no separate clock of its own — and the SAME
    // already-fetched timing JSON (no second fetch; null until it resolves).
    if (titleCreditOverlay) titleCreditOverlay.update(lyricTimeline.time, foreverMoreTimingData ? foreverMoreTimingData.lyrics : null);
    if (lyricTimelineGuiState) {
      lyricTimelineGuiState.time = lyricTimeline.time;
      // TrailLyrics Multi-Instance V1: report the full active COUNT plus
      // the newest phrase's own phase (read from its own TrailLyrics
      // instance via the manager) — a single-line readout can't show every
      // coexisting phrase, but should at least reflect that more than one
      // may be alive right now rather than implying only one ever is.
      const activeEvents = lyricTimeline.getActiveEvents();
      const newest = activeEvents.length ? activeEvents[activeEvents.length - 1] : null;
      const newestInstance = trailLyricsManager ? trailLyricsManager.getNewestActivePhrase() : null;
      lyricTimelineGuiState.currentEvent = newest
        ? `${newest.id} (${newest.designType}/${newest.runtimeType}) — ${newestInstance ? newestInstance.getPhase() : '?'}${activeEvents.length > 1 ? ` [+${activeEvents.length - 1} more active]` : ''}`
        : '(none yet)';
    }
  }
  // TrailLyrics Multi-Instance V1 — advances every currently-active phrase
  // instance the manager owns (spawned/despawned by the Lyric Timeline
  // block above this same frame). Runs AFTER the Head Particle Trail/Auto
  // Director blocks above so camera.quaternion is already this frame's
  // final value when a brand-new instance's own formation reads it
  // (TrailLyrics reads the camera's live orientation to build/track its
  // billboard plane).
  if (trailLyricsManager) {
    // Reading-Order Layout + Particle Dissolve V2: the manager's dissolve
    // system needs the SAME absolute clock every phrase's own
    // triggerTime/endTime already live in (LyricTimeline's), not a
    // separately-accumulating clock, so a raw seek reconstructs dissolve
    // state exactly rather than drifting relative to it. Passed as
    // `undefined` (harmless no-op inside update()) when the timeline isn't
    // enabled at all.
    trailLyricsManager.update(dt, headParticleTrail, camera, lyricTimeline ? lyricTimeline.time : undefined);
  }

  ocean.uniforms.uCameraUnderwater.value = underwater ? 1 : 0;
  ocean.uniforms.uProjMatrix.value.copy(camera.projectionMatrix);
  post.underwaterMat.uniforms.uTime.value = time;

  const ou = ocean.uniforms;

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

  // Rainbow V1 — only while rain is actually falling (not underwater, where
  // there's no rain to refract light through) AND the sun is low enough
  // that the bow's fixed ~42-degree radius around the antisolar point can
  // still clear the horizon — fades out smoothly near that limit rather
  // than popping off. See Post.js's own render()/shader doc for the actual
  // per-pixel geometry this drives.
  const rainbowStrength = (rain.enabled && !underwater)
    ? smoothstepJS(0, 8, sunParams.elevation) * (1 - smoothstepJS(32, 42, sunParams.elevation))
    : 0;

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
    rainbowStrength,
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
  }
}

// Small handle for debugging / automation (harmless in production).
window.OCEAN = { camera, controls, diveTo, sunParams, applySun, applyPreset, PRESETS, ocean, floor, island, post, clouds, setCloudsEnabled };
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
  // Read-only inspection: the raw fetched timing JSON (once loaded — live
  // getter, not a stale snapshot, since the fetch above resolves
  // asynchronously). `foreverMoreTiming.lyrics` is the original 44 SOURCE
  // CUES, unchanged — see lyricPhrases below for the separate VISUAL PHRASE
  // score built on top of them (spec 18: "distinguish SOURCE CUES from
  // VISUAL PHRASES").
  Object.defineProperty(window.OCEAN, 'foreverMoreTiming', { configurable: true, get: () => foreverMoreTimingData });
  Object.defineProperty(window.OCEAN, 'lyricSourceCues', { configurable: true, get: () => (foreverMoreTimingData ? foreverMoreTimingData.lyrics : []) });
  // MusicLyricsTimeMark V2 Integration (spec 16) — the COMPLETE resolved
  // phrase score (including disabled TITLE/CREDIT cues, as null-timing
  // singleton entries), each with id/sourceCueIndices/sourceTexts/
  // sourceTimes/sourceEndTimes/displayLines/group/designType/runtimeType/
  // firstVocalTime/lastVocalTime/authoredEndTime/preRoll/triggerTime/
  // endTime/duration/camera/leaveBehind. A live getter (recomputed on every
  // access, not cached) so it's always accurate once the timing JSON has
  // loaded, and harmless (empty) before it has. No mutable renderer
  // internals exposed — this is a fresh plain-object array every call, not
  // a reference into TrailLyrics/LyricTimeline's own state.
  Object.defineProperty(window.OCEAN, 'lyricPhrases', {
    configurable: true,
    get: () => lyricTimeline.resolveDesignScore(foreverMoreTimingData ? foreverMoreTimingData.lyrics : []),
  });
  // TrailLyrics Multi-Instance V1 — the manager itself (spawn/despawn/
  // getActivePhrases()/getNewestActivePhrase(), see TrailLyricsManager.js),
  // and a live getter for exactly which phrases are coexisting RIGHT NOW
  // (as opposed to lyricPhrases' full design score). Both read-only in the
  // sense that mutating what they return doesn't affect the running
  // scene — actual control stays through setLyricTimelineTime()/
  // setLyricTimelinePaused() above.
  window.OCEAN.trailLyricsManager = trailLyricsManager;
  Object.defineProperty(window.OCEAN, 'activeLyricPhrases', { configurable: true, get: () => trailLyricsManager.getActivePhrases() });
  // Testing/inspection convenience: force every currently-active phrase
  // instance's own local animation clock forward by `t` seconds in one
  // call (this environment's rAF can be throttled while a devtools/
  // automation tab is occluded, so a real per-frame update() may not run
  // for a while — this bypasses that deterministically, exactly like
  // calling .setTime() on a single instance already does elsewhere).
  window.OCEAN.setActiveLyricLocalTimes = (t) => {
    for (const entry of trailLyricsManager.getActiveEntries()) entry.instance.setTime(t);
  };
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

rollRandomWeather(); // Random Weather V1 — one pick for this whole page load/play-through
animate();
