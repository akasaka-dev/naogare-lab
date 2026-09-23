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

// Configurable Text Color V1 — a plain hex ('#rgb' or '#rrggbb') -> integer
// RGB parse, used only to build the Canvas 2D fillStyle string below. A
// direct parse (rather than routing through THREE.Color) guarantees the
// hex value the GUI's color picker shows is reproduced byte-for-byte as the
// canvas fill color, with no colour-management/rounding in between.
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

// ---------------------------------------------------------------------------
//  Trail Lyrics Font Support V1 — wait for the CSS Font Loading API to
//  either resolve `fontSpec` (a canvas-style font shorthand, e.g.
//  '600 32px "Noto Sans JP"') or give up after `timeoutMs`, WITHOUT ever
//  throwing or hanging indefinitely: a font that fails to load, doesn't
//  exist, or is slow to fetch must never block app startup or a GUI font
//  swap — the caller (setFont(), below) always proceeds to draw afterward,
//  using whatever the browser resolves (the real webfont if it loaded in
//  time, otherwise the next family in the CSS fallback stack).
//  `sampleText` is passed to document.fonts.load() so the specific glyph
//  subset this phrase actually needs (e.g. CJK ranges for Japanese lyrics)
//  is what gets requested/awaited, not just the Latin default subset.
// ---------------------------------------------------------------------------
async function ensureFontReady(fontSpec, sampleText, timeoutMs = 3000) {
  if (typeof document === 'undefined' || !document.fonts) return; // no Font Loading API — draw with whatever the browser resolves synchronously
  const timeout = new Promise((resolve) => setTimeout(resolve, timeoutMs));
  try {
    await Promise.race([Promise.all([document.fonts.load(fontSpec, sampleText || ''), document.fonts.ready]), timeout]);
  } catch (err) {
    console.warn(`[TrailLyrics] font load failed for "${fontSpec}" — using fallback font stack instead:`, err);
  }
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
function sampleTextTargets(text, { fontWeight = 600, fontFamily = 'Georgia, "Times New Roman", serif', fontSizeScale = 1.0, lineHeight: lineHeightMultiplier = 1.15, targetCount = 650, worldWidth = 26, fixedWorldScale = null, depthJitter = 0.4, seed = 99, shadowStrength = 1.0, textColor = '#ffffff', shadowColor = '#000000', outlineWidth = 0, outlineColor = '#000000' } = {}) {
  // Trail Lyrics Font Support V1: fontSizeScale scales the RASTER font size
  // used to draw glyphs to the canvas (crispness/stroke weight), not the
  // final world-space size — that stays `worldWidth`'s job (and textScale's,
  // applied by the caller), since worldScale below always normalizes the
  // measured pixel width back to `worldWidth` regardless of fontSizeScale.
  // Default 1.0 reproduces the original hardcoded 120px exactly.
  const fontSize = 120 * fontSizeScale;
  // Text is handled as an ordinary JS string throughout — split('\n') and
  // canvas fillText()/measureText() are Unicode-native (no ASCII-only
  // assumption anywhere here), so multi-line Japanese/CJK text takes the
  // exact same code path as multi-line English text.
  const lines = text.split('\n');
  const probe = document.createElement('canvas').getContext('2d');
  probe.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  const padding = fontSize * 0.18;

  // Single-line sizing is IDENTICAL to the original V1/V1.2 formula at the
  // default fontSizeScale (kept byte-for-byte at fontSizeScale=1 so every
  // existing single-line phrase, including the accepted "Forever More"
  // look, renders exactly as before). Multi-line (Lyric Timeline V1: needed
  // for two-line lyric events) stacks lines as a vertically-centred block,
  // sized from the widest line, with a configurable lineHeight multiplier
  // (default 1.15 matches the original hardcoded value).
  let width, height, lineHeight;
  if (lines.length === 1) {
    const metrics = probe.measureText(text);
    width = Math.ceil(metrics.width + padding * 2);
    height = Math.ceil(fontSize * 1.3);
  } else {
    let maxLineWidth = 0;
    for (const line of lines) maxLineWidth = Math.max(maxLineWidth, probe.measureText(line).width);
    lineHeight = fontSize * lineHeightMultiplier;
    width = Math.ceil(maxLineWidth + padding * 2);
    height = Math.ceil(lineHeight * lines.length + padding * 1.2);
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Drawn once per logical line whichever way the caller needs (plain fill
  // for particle-candidate sampling below, then again with outline/shadow
  // for the final glyph texture) — kept as one small helper so both passes
  // stay byte-for-byte positioned identically.
  const drawLines = (drawFn) => {
    if (lines.length === 1) {
      drawFn(text, width / 2, height / 2);
    } else {
      const blockTop = (height - lineHeight * lines.length) / 2;
      lines.forEach((line, i) => drawFn(line, width / 2, blockTop + lineHeight * (i + 0.5)));
    }
  };
  drawLines((t, x, y) => ctx.fillText(t, x, y));

  const img = ctx.getImageData(0, 0, width, height).data;
  const candidates = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (img[(y * width + x) * 4 + 3] > 80) candidates.push(x, y);
    }
  }

  // Forevermore Title Match V1 — matches src/index.html's #tc-title CSS
  // treatment exactly as the canonical visual reference:
  //   color: rgba(255, 255, 255, 0.96)
  //   text-shadow: 0 2px 18px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.6)
  // The title itself uses no stroke/outline, and this file didn't either
  // for a long time (a prior black/red-outline experiment was reverted for
  // exactly that reason) — Outline V1 (see below, near the final fill) adds
  // one back, but ONLY as an explicit, configurable, legibility-focused
  // option layered on top of this title-matched treatment, not a
  // replacement of it. CSS text-shadow supports an arbitrary LIST of shadow
  // layers; Canvas 2D's
  // shadowColor/shadowBlur/shadowOffsetX/shadowOffsetY only describe ONE
  // shadow per draw call, so each layer is cast with its own separate
  // fillText pass (shadow-casting fillStyle here is irrelevant — every
  // pixel it touches is fully overpainted by the real, opaque fill drawn
  // last below — only the blurred/offset shadow spilling past each glyph's
  // edge remains visible). Candidate sampling above already ran against
  // the plain fill, so none of this can shift particle target positions.
  // shadowStrength (GUI: "Shadow Strength", default 1.0) scales both
  // layers' alpha together; 0 renders with no shadow at all. Pixel sizes
  // scale with the raster fontSize (reference: 120px, this file's existing
  // convention) — raster-canvas-then-3D-plane space and the title's CSS px
  // space are different coordinate systems, so this is a proportional
  // approximation of the title's look, not a pixel-exact port. Letter-
  // spacing (title: 0.04em) has NO Canvas 2D fillText equivalent without a
  // custom per-character glyph layout; not implemented here (would also
  // require redoing the particle-candidate sampling pass) — a reportable,
  // deliberately accepted limitation, not a visually critical one for a
  // 1-2 word phrase held briefly on screen.
  // Configurable Shadow Color V1 — shadowColor defaults to '#000000'
  // (matches #tc-title's own black text-shadow); the alpha multipliers
  // (0.55/0.60) and blur/offset values below are unchanged from the
  // title-matched design, only the hardcoded black RGB is replaced by the
  // configured color. shadowColor is controlled entirely independently of
  // textColor (see this.shadowColor's own comment) — never auto-inverted.
  const shadowRgb = hexToRgb(shadowColor);
  ctx.clearRect(0, 0, width, height);
  if (shadowStrength > 0) {
    const scale = fontSize / 120;
    ctx.save();
    // PASS A — shadow silhouette. Per the Canvas 2D spec, a shadow's colour
    // comes ENTIRELY from shadowColor (alpha-multiplied by the shape's own
    // rendered alpha/coverage) — the shape's own fillStyle never bleeds
    // into the shadow's colour. The dummy fill below is therefore fully
    // opaque and its own colour is irrelevant on-screen: every pixel it
    // touches is completely overpainted by PASS C's opaque fill at the
    // identical position — only the blurred/offset shadow spilling PAST
    // each glyph's edge (where PASS C draws nothing) remains visible.
    ctx.fillStyle = shadowColor;
    // Configurable Shadow Strength range extension — shadowStrength now goes
    // up to 2.0 (GUI: "Shadow Strength"), not just the original 0..1 range,
    // so the shadow can go all the way to fully solid/opaque, not only up to
    // the original title-matched 0.55/0.60 alpha ceiling. Clamped to 1.0
    // explicitly here rather than relying on the browser to clamp an
    // out-of-range rgba() alpha, which isn't guaranteed identically across
    // engines.
    ctx.shadowColor = `rgba(${shadowRgb.r}, ${shadowRgb.g}, ${shadowRgb.b}, ${Math.min(1, 0.55 * shadowStrength).toFixed(3)})`;
    ctx.shadowBlur = 20 * scale;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 3 * scale;
    drawLines((t, x, y) => ctx.fillText(t, x, y)); // layer 1 — broad ambient shadow
    ctx.shadowColor = `rgba(${shadowRgb.r}, ${shadowRgb.g}, ${shadowRgb.b}, ${Math.min(1, 0.60 * shadowStrength).toFixed(3)})`;
    ctx.shadowBlur = 4 * scale;
    ctx.shadowOffsetY = 1.5 * scale;
    drawLines((t, x, y) => ctx.fillText(t, x, y)); // layer 2 — tight contact shadow
    // PASS B — explicitly disable shadow before the final fill, rather than
    // relying solely on restore() below to have undone it correctly.
    ctx.shadowColor = 'rgba(0, 0, 0, 0)';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.restore(); // also undoes fillStyle back to whatever it was before PASS A
  }
  // Outline V1 — a plain text-stroke, added ON TOP of the shadow above and
  // UNDER the final fill drawn next. Unlike the shadow (whose visible
  // contrast depends on how dark/light the background already is), a
  // stroke guarantees a fixed-contrast ring around each glyph against ANY
  // background — the standard technique burned-in video captions use for
  // exactly this reason. Deliberately independent of shadowStrength/
  // shadowColor (both can be used together, either alone, or neither).
  // Drawn via ctx.strokeText() at DOUBLE the requested width because the
  // opaque fill drawn next covers the inner half of the stroke, leaving
  // only a clean, uniform OUTER rim of that requested width visible —
  // never a visible double-edge or a stroke bleeding into the letterform.
  if (outlineWidth > 0) {
    const outlineRgb = hexToRgb(outlineColor);
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.strokeStyle = `rgb(${outlineRgb.r}, ${outlineRgb.g}, ${outlineRgb.b})`;
    ctx.lineWidth = outlineWidth * (fontSize / 120) * 2;
    drawLines((t, x, y) => ctx.strokeText(t, x, y));
  }
  // PASS C — final visible text. Shadow is guaranteed off (PASS B, and/or
  // restore() above having never run if shadowStrength is 0). Configurable
  // Text Color V1 — textColor defaults to '#ffffff' (matches #tc-title's
  // color exactly at that default); alpha is fixed at 0.96 regardless of
  // the chosen color, preserving the original title-matched alpha. Never
  // time-of-day tinted — see setTint()'s own comment further below.
  const { r, g, b } = hexToRgb(textColor);
  ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.96)`;
  drawLines((t, x, y) => ctx.fillText(t, x, y));

  const totalCandidates = candidates.length / 2;
  const keepRatio = targetCount / Math.max(totalCandidates, 1);
  const rand = mulberry32(seed);
  // Reading-Order Layout V2 — Fixed Font Size: when `fixedWorldScale` is
  // given, it is used DIRECTLY as world-units-per-raster-pixel instead of
  // being back-derived from a target total plane WIDTH. That is the actual
  // bug behind "font sizes vary to fit": normalizing every phrase to the
  // same total `worldWidth` (the pre-existing default path, unchanged
  // below) means a longer phrase's raster is squeezed into the same 15
  // units, rendering its LETTERS visibly smaller than a short phrase's —
  // exactly backwards from ordinary typography, where font SIZE stays
  // constant and total WIDTH grows with character count. With a fixed
  // scale, `resultWidth` below varies naturally with text length while
  // `worldHeight` (driven by the same fixed raster `fontSize` for every
  // phrase) stays identical across every simultaneous lyric.
  const worldScale = fixedWorldScale != null ? fixedWorldScale : worldWidth / width;
  const resultWidth = fixedWorldScale != null ? width * worldScale : worldWidth;
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
  return { targets, canvas, worldWidth: resultWidth, worldHeight };
}

// ---------------------------------------------------------------------------
//  Reading-Order Layout V2 — deterministic text measurement/wrapping, kept
//  separate from sampleTextTargets() (which rasterises + decimates pixels,
//  a much heavier operation) since layout needs only cheap pixel-width
//  measurements to decide single- vs multi-column and per-phrase wrapping,
//  reused by TrailLyricsManager without spinning up a TrailLyrics instance.
// ---------------------------------------------------------------------------
let _measureCtx = null;
function getMeasureCtx() {
  if (!_measureCtx && typeof document !== 'undefined') _measureCtx = document.createElement('canvas').getContext('2d');
  return _measureCtx;
}

function fontSpecFor({ fontWeight = 600, fontFamily = 'Georgia, "Times New Roman", serif', fontSizeScale = 1.0 } = {}) {
  return `${fontWeight} ${120 * fontSizeScale}px ${fontFamily}`;
}

// Pixel width of `text` at the given font settings — the SAME fontSize
// formula sampleTextTargets() uses internally, so a caller comparing this
// against a pixel-space column width gets an answer consistent with what
// will actually be rasterised.
export function measureTextWidthPx(text, fontOpts) {
  const ctx = getMeasureCtx();
  if (!ctx) return text.length * 66; // non-browser fallback — never hit in practice, just avoids a hard crash
  ctx.font = fontSpecFor(fontOpts);
  return ctx.measureText(text).width;
}

// Deterministic greedy word-wrap of ONE logical line into sub-lines that
// each fit `maxWidthPx`. A single word wider than maxWidthPx on its own is
// kept whole (never hyphenated/broken mid-word) — the ticket's own
// "unless absolutely necessary" escape hatch for line-count/width limits.
export function wrapLineToWidth(line, maxWidthPx, fontOpts) {
  const words = line.split(' ').filter((w) => w.length > 0);
  if (words.length === 0) return [line];
  const lines = [];
  let current = words[0];
  for (let i = 1; i < words.length; i++) {
    const candidate = `${current} ${words[i]}`;
    if (measureTextWidthPx(candidate, fontOpts) <= maxWidthPx) {
      current = candidate;
    } else {
      lines.push(current);
      current = words[i];
    }
  }
  lines.push(current);
  return lines;
}

// Word-wraps EVERY authored logical line (displayLines may already contain
// more than one line from MusicLyricsTimeMark grouping) independently, then
// concatenates the results — preserving authored line breaks while fixing
// overly-wide individual lines. Deterministic and seek-safe: a pure
// function of (text, maxWidthPx, fontOpts), never of when/how it's called.
export function wrapDisplayLines(displayLines, maxWidthPx, fontOpts) {
  const out = [];
  for (const line of displayLines) out.push(...wrapLineToWidth(line, maxWidthPx, fontOpts));
  return out;
}

// ---------------------------------------------------------------------------
//  Phase timing (seconds) — starting values from the spec; all exposed as
//  mutable instance fields so the GUI can retune them live without rebuilding
//  anything (the phase boundaries are recomputed from these every frame).
// ---------------------------------------------------------------------------
const DEFAULT_TIMING = { travel: 3.0, assemble: 1.5, hold: 2.0, leave: 0.2, dissolve: 1.2 };
// DOM Hold Overlay V1 — how long the crossfade between the 3D glyph mesh
// and the plain DOM text overlay takes, at both the start and end of HOLD.
// See _recompute()'s own comment on why HOLD specifically gets this
// treatment: a per-frame camera.position + basis-vector reconstruction
// (this._computeLayoutCenter(), unaffected by this and still driving the
// invisible-during-HOLD 3D mesh) reproduces an occasional real frame-time
// spike (a large dt from any cause) as a visible position jump — provably
// so (see the console jump diagnostic below) — for the ENTIRE, often
// multi-second HOLD read, however briefly the spike itself lasts. A plain
// DOM element positioned via a single one-off screen-space projection,
// taken once as HOLD begins, cannot inherit that: it never re-reads
// camera/world position at all once placed, so there is nothing left for
// a stray large dt to perturb. TRAVEL/ASSEMBLE (letters condensing from
// the wake) and LEAVE/DISSOLVE (scattering back into it) keep the full 3D
// treatment — replacing those with flat text would give up the visual
// effect the whole system exists for, and they are brief enough (a few
// seconds each) that the same rare spike has far less to disrupt.
const DOM_OVERLAY_CROSSFADE = 0.35;
// Largest per-frame screen-space move (CSS percentage points) the DOM hold
// overlay accepts before rejecting it as an outlier frame-hitch spike and
// keeping its last position instead — see the jump-rejection block in
// _recompute(). Generous relative to ordinary camera panning or a reading-
// order layout reflow (both span many frames), tight relative to what a
// large single-frame dt spike produces.
const DOM_OVERLAY_MAX_JUMP_PERCENT = 5.0;
const PARTICLE_COUNT = 650;
const WORLD_UP = new THREE.Vector3(0, 1, 0);

// Reading-Order Layout V2 — a screen-locked (authored-endTime) phrase is
// anchored at this FIXED distance from the camera along its forward axis,
// not a live, ever-changing fraction of camera-to-head distance (the old
// Screen-Lock Hold V1 formula). Fixing the depth is what makes the layout
// math exact: a given (right, up) world-unit offset always subtends the
// SAME on-screen (NDC) position/size regardless of how far the traveler
// currently is, so TrailLyricsManager can compute safe-area bounds and
// column widths analytically from the camera's own FOV/aspect instead of
// approximating against a moving target.
export const LAYOUT_FIXED_DEPTH = 20;
// World units per raster pixel for EVERY screen-locked phrase's glyph —
// see sampleTextTargets()'s `fixedWorldScale` doc comment for why this
// replaces the old fixed-total-plane-WIDTH approach. Tuned so a typical
// (~20 character) phrase renders at roughly its previous on-screen size.
export const LAYOUT_FIXED_WORLD_SCALE = 0.007;
// Uniform font size for every screen-locked phrase, overriding whatever
// per-choreography textScale (e.g. HERO's 1.3x) would otherwise apply —
// LyricTimeline forces this for any phrase with an authored endTime (see
// its _resolveEndTimes()), satisfying "one fixed scale... HERO/TRAIL
// differences must not cause inconsistent lyric font size" for the
// simultaneous readable layout.
export const LAYOUT_FIXED_TEXT_SCALE = 1.0;
// Damping rate for easing `_slotOffset` toward `_slotTargetOffset` (see
// _recompute()) — tuned so the transition reaches ~95% of the way to a new
// target in ~0.55s, inside the ticket's "approximately 0.4-0.7 seconds"
// smooth-reflow window.
const SLOT_TRANSITION_RATE = 0.8;
// Fade-Out Tuning V2 — how long AFTER authored endTime the glyph's own
// visual opacity takes to reach 0. Deliberately short and independent of
// leaveDuration/dissolveDuration (GUI-tunable — see TrailLyricsManager's
// setPhraseTiming(), main.js's own Leave/Dissolve Duration sliders) — see
// _recompute()'s glyphFadeOutEnd for why: the frozen glyph leaves the
// camera frustum in ~1.1-1.5s regardless, so the fade only needs to be
// visible within that window, not across the whole leave+dissolve span,
// however long that's currently configured to be.
const GLYPH_FADE_OUT_SECONDS = 0.75;

// Warm-gold palette matched to Head Particle Trail's own Gold identity
// (spec 9: "Gold compatibility is the priority") — same hex values as
// HeadParticleTrail's COLOR_HEAD_INNER/COLOR_HEAD_OUTER. Still used for the
// wake-emergence PARTICLE system (setTint() below), unchanged.
const COLOR_PARTICLE = new THREE.Color(0xffe0a3);
// Subtle Readability Styling V2 — the readable GLYPH TEXT itself is
// deliberately a neutral, stable colour, NOT the warm-gold particle
// identity above and NOT time-of-day tinted (see setTint()): a fixed
// pass-through multiplier so the CanvasTexture's own fill colour (see
// sampleTextTargets()) is the sole source of the glyph's visible colour.
const COLOR_GLYPH_NEUTRAL = new THREE.Color(0xffffff);

export class TrailLyrics {
  constructor(scene, opts = {}) {
    const { text = 'Forever More', seed = 777 } = opts;
    this._seed = seed >>> 0;
    // TrailLyrics Multi-Instance V1: kept only so dispose() (below) can
    // remove this instance's own objects from the scene it was added to —
    // never used for anything else, and never a second way to reach shared
    // scene state.
    this._scene = scene;

    this.enabled = true;
    this.paused = false;
    this.localTime = 0;
    this.phase = 'travel';

    // Trail Lyrics Font Support V1 — GUI/per-event-tunable font knobs.
    // Defaults reproduce the pre-existing hardcoded values exactly (Georgia
    // serif, weight 600, fontSize 120px, lineHeight multiplier 1.15), so
    // every existing phrase (including the accepted "Forever More" look and
    // the two-line fm-002 lyric event) renders byte-for-byte unchanged
    // unless something explicitly calls setFont()/configure() with an
    // override. See sampleTextTargets() for how each field is used, and
    // setFont() for the async webfont-loading path.
    this.fontFamily = 'Georgia, "Times New Roman", serif';
    this.fontWeight = 600;
    this.fontSizeScale = 1.0;
    this.lineHeight = 1.15;

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
    // Particle Count V1 — GUI-tunable performance knob. Read fresh by
    // setText() (see sampleTextTargets()'s targetCount below), so changing
    // it only affects phrases spawned/rebuilt after the change, same as
    // fontFamily's own "applied synchronously here" per-event behaviour —
    // never a live geometry rebuild on an already-visible phrase.
    this.particleCount = PARTICLE_COUNT;
    // Forevermore Title Match V1 — GUI-tunable 0..1 multiplier for the
    // canvas-drawn two-layer shadow baked into the glyph texture, styled to
    // match #tc-title's CSS text-shadow (see sampleTextTargets()). 1.0
    // (default) is the full title-matched look; 0 renders with no shadow.
    this.shadowStrength = 1.0;
    // Configurable Text Color / Shadow Color V1 — the glyph fill and shadow
    // colors, each a CSS hex string (e.g. '#ffffff'). Defaults match
    // #tc-title's own color/shadow. Neither is ever time-of-day tinted (see
    // setTint()) — glyphMaterial.color stays a fixed neutral white
    // multiplier (COLOR_GLYPH_NEUTRAL) regardless of these values; the
    // CanvasTexture's own fill/shadow colors are the sole colour source.
    // shadowColor is controlled entirely independently of textColor — e.g.
    // a black textColor with the default black shadowColor will make the
    // shadow largely invisible against the fill, which is expected; the
    // two are never auto-inverted relative to each other.
    this.textColor = '#ffffff';
    this.shadowColor = '#000000';
    // Outline V1 (see sampleTextTargets()'s own doc) — a plain text-stroke,
    // independent of and layered on top of the shadow above, purely for
    // guaranteed legibility against ANY background. outlineWidth is in the
    // same raster-px-at-fontSize-120 units the shadow's blur/offset already
    // use; 0 disables it entirely (the title-matched, stroke-less look).
    // Given a small non-zero default here specifically to be visible
    // without any GUI change, so its effect can be judged immediately.
    this.outlineWidth = 2;
    this.outlineColor = '#000000';
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
    // Spatial Placement Fix V1 (see the TRAILLYRICS SPATIAL PLACEMENT
    // INVESTIGATION report): `positionRelease` above is a FRACTION of
    // holdDuration — fine when holds were always ~2-3s (the position-chase
    // window this class was originally tuned around), but MusicLyricsTimeMark
    // V2's explicit endTime can now authorize holds of 10-17+ seconds. Left
    // unchanged, that fraction would stretch the camera-relative chase (see
    // _computeDesiredCenter()) to 7-18+ seconds — long enough that a SECOND,
    // independently-triggered phrase forming during that window chases the
    // exact same live camera-relative target and converges to within a few
    // units of the first, regardless of how far the traveler had actually
    // moved between their two trigger moments (measured and confirmed in the
    // investigation). This caps the chase window to an ABSOLUTE maximum,
    // independent of holdDuration — the phrase still stays fully readable
    // for its entire authored hold (unaffected), it just stops chasing the
    // camera and freezes in world space after this many seconds, exactly as
    // every phrase already did before long MusicLyricsTimeMark V2 holds
    // existed. Orientation/billboard release (billboardRelease, above) is
    // NOT touched — it already reaches 0 exactly at the end of HOLD by
    // design, and this fix does not need to change that.
    this.maxPositionChaseSeconds = 2.0;

    // Reading-Order Layout V2 (formerly Screen-Lock Hold V1 — see the
    // TRAILLYRICS OVERLAPPING-LIFETIME PLACEMENT and TRAIL LYRICS READABLE
    // LAYOUT tickets) — for a phrase with an authored `endTime`, "left
    // behind in world space" is the wrong behavior: MusicLyricsTimeMark V2
    // authored that phrase to stay READABLE until endTime. When true, this
    // instance's position/orientation for the whole ASSEMBLE+HOLD span
    // tracks a fixed-distance camera-relative anchor (see
    // _computeLayoutCenter()) offset by TrailLyricsManager's own
    // reading-order column layout, so it is guaranteed on-screen and
    // camera-facing until endTime regardless of camera movement/cuts. It
    // freezes into an ordinary world-space point at the start of LEAVE
    // exactly as any other phrase does, then hands off to the dissolve
    // particle system (see TrailLyricsManager). Defaults false: a phrase
    // with no authored endTime (legacy fallback) and the standalone demo
    // instance are both completely unaffected, byte-for-byte.
    this.screenLock = false;
    // The camera-relative (right, up) world-unit offset from
    // _computeLayoutCenter()'s fixed-depth anchor. `_slotOffset` is the
    // CURRENT, per-frame-eased value actually rendered with; `_slotTargetOffset`
    // is the latest value TrailLyricsManager's layout algorithm assigned —
    // set instantly, then smoothly approached over ~0.5s (see _recompute())
    // so a layout reflow (a sibling entering/leaving the readable set)
    // never teleports this phrase, per the ticket's explicit "no teleport"
    // rule. {0,0} (both fields) renders at the exact centre of
    // _computeLayoutCenter's fixed anchor.
    this._slotOffset = { right: 0, up: 0 };
    this._slotTargetOffset = { right: 0, up: 0 };

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

    // Lyric Timeline V1 — when true (the V1/V1.2 default, unchanged), a
    // finished cycle simply wraps via modulo and repeats the SAME phrase
    // forever, exactly as before. A timeline controller driving discrete,
    // differently-timed/worded events sets this false so a finished cycle
    // instead freezes at its own end (fully dissolved / invisible) and
    // waits for the next explicit beginEvent() call, rather than looping —
    // see update()/_recompute()'s use of this flag.
    this.loop = true;

    this.count = 0; // setText() below establishes the real count
    const geo = new THREE.BufferGeometry();
    this._aScatterAttr = null;

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
    // canvas as a texture on an ordinary plane. setText() below assigns the
    // real texture/geometry for the initial (and every subsequent) text.
    //
    // Subtle Readability Styling V1 — blending changed from additive to
    // NORMAL. The glyph's own colour never exceeds 1.0 in any channel, so
    // this plane's luminance never reaches Post.js's bloom threshold (1.15)
    // and never actually bloomed under additive blending
    // despite the original intent stated here. Practically, additive
    // blending on a bright glyph over a BRIGHT sky adds light on top of
    // light — the text washes toward white instead of standing out, which
    // is the core of the "hard to read against changing backgrounds"
    // problem this ticket set out to fix. Normal blending lets the glyph's
    // alpha properly occlude the background instead, and is also the reason
    // the dark, low-alpha outline/shadow drawn into the canvas below (see
    // sampleTextTargets()) has any visible effect at all — under additive
    // blending, a near-black stroke/shadow contributes ~0 regardless of
    // alpha, since additive blending can only ever add light, never darken.
    //
    // Subtle Readability Styling V2 — the switch to normal blending had a
    // side effect: `material.color` (previously COLOR_GLYPH, a pale amber-
    // gold, 90%-weighted by setTint()'s own lerp) used to render washed
    // toward white under additive blending regardless of its actual hue —
    // additive blending on a near-1.0-alpha colour reads as "bright",
    // masking the specific hue underneath. Normal blending has no such
    // washing effect, so that same gold colour now renders as visibly
    // yellow/gold instead. Fix: `glyphMaterial.color` is now a fixed neutral
    // white, set once here and never touched again — the CanvasTexture's own
    // fill colour (see sampleTextTargets()) is the sole source of the
    // glyph's visible colour now, and setTint() below no longer touches this
    // material at all (it still tints the particle system, unchanged), so
    // time-of-day no longer recolours lyric text.
    // No other TrailLyrics/particle material is touched — this is scoped to
    // glyphMaterial alone. ----
    this.glyphUniforms = { uOpacity: { value: 0 } };
    // Cloud Occlusion Fix V1 — depthWrite is deliberately TRUE here (unlike
    // every other transparent/additive material in this project, which
    // uses depthWrite:false to blend correctly with itself regardless of
    // draw order). Root cause: Clouds.js's volumetric raymarch clips its
    // march distance to whatever the shared depth texture (hdrRT.depthTexture)
    // says is in front of the sky at each pixel — with depthWrite:false,
    // this plane never told that buffer it was there, so the cloud march
    // ran straight through it to the actual cloud layer and Post.js's
    // cloud composite then painted that (wrongly-computed) cloud density
    // straight over the already-rendered glyph pixels, washing the text
    // out wherever a cloud happened to be in that screen direction —
    // confirmed by toggling this flag live and watching the wash-out
    // disappear. A single flat, non-self-overlapping plane is a safe
    // candidate for this (unlike the particle system below, left
    // untouched — many overlapping point sprites in one draw call is the
    // classic case where transparent depth-writing causes self-occlusion
    // artifacts); the reading-order layout already guarantees simultaneous
    // phrases never overlap on screen, so this doesn't introduce new
    // inter-phrase occlusion either. depthTest stays true (unchanged) —
    // ocean/island still correctly occlude the glyph exactly as before.
    //
    // Cloud Occlusion Fix V2 — depthWrite:true alone wrote depth for the
    // WHOLE rectangular plane, including the fully-transparent CanvasTexture
    // background between/around letters (measured: ~78% of this canvas's
    // pixels are exact alpha=0), producing a visible rectangular
    // cloud-clearing box. `alphaTest` fixes this at the fragment-shader
    // level: a fragment whose final alpha (this material's `opacity`
    // uniform × the CanvasTexture's own per-texel alpha) falls below the
    // threshold is discarded entirely — no color write AND no depth write,
    // since discard happens before both. Only texels with actual glyph
    // coverage (the letter body and its anti-aliased edge ring) pass and
    // write depth; the transparent background never does, regardless of
    // depthWrite. Originally 0.08, chosen from this canvas's own measured
    // alpha histogram (background is ~100% exactly 0, the anti-aliased edge
    // band is a thin ~2.8% ring) back when `opacity` only ever sat at its
    // full faded-in value while the glyph was visible at all.
    //
    // Fade-Out Tuning V1 — `opacity` now sweeps continuously from 1 to 0
    // across LEAVE+DISSOLVE (see _recompute()'s glyphFadeOut), so alphaTest
    // also gates the LAST moment of that fade: once `opacity` itself drops
    // below the threshold, even the most solid glyph texel (texture
    // alpha ~1) discards, and the WHOLE plane disappears in one frame
    // rather than finishing the fade smoothly to 0. Lowered to 0.02 (from
    // 0.08) so that residual pop happens at ~2% opacity — already all but
    // invisible — instead of ~8%; the background is still a clean exact-0
    // everywhere (per the same histogram), so this remains just as
    // effective at preventing the cloud-occlusion rectangle.
    this.glyphMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      depthWrite: true,
      depthTest: true,
      alphaTest: 0.02,
      toneMapped: false,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
      // Subtle Readability Styling V2 — fixed neutral white, never
      // reassigned (see the class comment above and setTint() below): the
      // CanvasTexture's own fill colour is the sole source of the glyph's
      // visible colour, so this just needs to be a pure multiplicative
      // pass-through, not a tinted "text colour" of its own.
      color: COLOR_GLYPH_NEUTRAL.clone(),
      opacity: 0,
    });
    this.glyphMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.glyphMaterial);
    this.glyphMesh.frustumCulled = false;
    this.glyphMesh.visible = false;
    scene.add(this.glyphMesh);
    this._glyphBaseWidth = 1;
    this._glyphBaseHeight = 1;

    // Shared plane frame (spec 6/7) — a world-space centre fixed once per
    // cycle at formation time, plus an orientation quaternion that tracks
    // the live camera while influence > 0 and is simply left untouched
    // (frozen) once influence reaches 0. Both this.points and this.glyphMesh
    // are positioned/oriented directly from these every frame.
    this._planeCenter = new THREE.Vector3();
    this._planeQuat = new THREE.Quaternion();
    this._cyclePrepared = false;
    // DOM Hold Overlay V1 — see DOM_OVERLAY_CROSSFADE's own comment.
    // _holdScreenPos is set ONCE (a one-off projection) the instant HOLD
    // begins each cycle and cleared outside of [holdStart, holdEnd), so it
    // is always either "this cycle's fixed hold position" or null, never a
    // stale value from a previous cycle. _domOverlayAlpha is recomputed
    // every frame (a pure, cheap function of how far into/from HOLD's
    // start/end lt currently is) purely to drive the crossfade opacity —
    // it never feeds back into _holdScreenPos.
    this._holdScreenPos = null;
    this._domOverlayAlpha = 0;
    this._tmpProjected = new THREE.Vector3();

    // Scratch (reused every frame — no per-frame allocation).
    this._tmpOffset = new THREE.Vector3();
    this._tmpTangent = new THREE.Vector3();
    this._tmpDesired = new THREE.Vector3();
    // Screen-Lock Hold V1 — camera basis vectors, extracted fresh each frame
    // a slot offset is actually in effect (see _computeDesiredCenter()).
    this._tmpCamRight = new THREE.Vector3();
    this._tmpCamUp = new THREE.Vector3();
    this._tmpCamFwd = new THREE.Vector3();

    // Scratch for _computeWakeScatter (reused once per CYCLE, not per
    // frame — formation only runs once every ~travel+assemble+hold+leave+
    // dissolve seconds — but still preallocated to keep that call
    // allocation-free). Sized by setText() to match the current text's
    // particle count.
    this._tmpInvQuat = new THREE.Quaternion();
    this._tmpWakePos = new THREE.Vector3();
    this._wakeLocalX = new Float32Array(0);
    this._wakeLocalPos = new Float32Array(0);
    this._wakeSortIndices = new Int32Array(0);

    this._ocean = null;
    this._headParticleTrail = null;
    this._camera = null;

    this.currentText = null;
    this.setText(text);
  }

  // ---- Lyric Timeline V1: (re)builds the particle/glyph geometry for a new
  // text string, reusing the exact same materials/shaders/plane-frame
  // machinery — only the DATA (glyph target positions, canvas texture,
  // particle count) changes. This is what keeps TrailLyrics "a reusable
  // renderer/animation system" rather than a one-phrase demo: a timeline
  // controller can call this (via beginEvent(), below) once per lyric
  // event without touching any of the tail-emergence/assemble/position-
  // release mechanism. Safe to call at any time, including while already
  // mid-cycle for a different text — callers that want a clean fresh cycle
  // should follow it with a localTime/._cyclePrepared reset (beginEvent()
  // does this for you). ----
  setText(text, opts = {}) {
    const seed = opts.seed !== undefined ? (opts.seed >>> 0) : this._seed;
    this._seed = seed;
    this.currentText = text;

    // Reading-Order Layout V2: a screen-locked phrase uses the FIXED
    // world-scale raster mode (letter size constant, plane width varies
    // with character count) instead of the legacy fixed-total-width mode
    // (plane width constant, letter size varies with character count) —
    // see sampleTextTargets()'s `fixedWorldScale` doc comment. Every
    // non-screen-locked phrase (legacy fallback, standalone demo) is
    // completely unaffected — this branch never fires for them.
    const rasterOpts = {
      targetCount: this.particleCount,
      seed,
      fontFamily: this.fontFamily,
      fontWeight: this.fontWeight,
      fontSizeScale: this.fontSizeScale,
      lineHeight: this.lineHeight,
      shadowStrength: this.shadowStrength,
      textColor: this.textColor,
      shadowColor: this.shadowColor,
      outlineWidth: this.outlineWidth,
      outlineColor: this.outlineColor,
    };
    if (this.screenLock) rasterOpts.fixedWorldScale = LAYOUT_FIXED_WORLD_SCALE;
    else rasterOpts.worldWidth = 15;
    const { targets, canvas, worldWidth, worldHeight } = sampleTextTargets(text, rasterOpts);
    // Sort glyph targets by local X (pure text-shape preprocessing,
    // independent of any wake data) — this is the "sorted glyph targets"
    // half of spec 8's low-travel mapping: wake source particles are
    // sorted by local X too, each cycle, in _computeWakeScatter(), and
    // paired index-for-index so the assignment is monotonic (left source
    // -> left letter, right source -> right letter) instead of
    // arbitrary/crossing.
    targets.sort((a, b) => a.x - b.x);
    this.count = targets.length;
    this._textWorldWidth = worldWidth;
    this._textWorldHeight = worldHeight;

    const rand = mulberry32(seed ^ 0x9e3779b9);

    // ---- Per-particle constant attributes (built once per text; no
    // per-frame CPU work over the particle set — the vertex shader does
    // the scatter -> glyph -> dissolve blend entirely from a handful of
    // uniforms). aScatter is intentionally left ZERO here: it is derived
    // fresh every cycle from the live wake trajectory
    // (_computeWakeScatter(), called from _prepareFormation()) — nothing
    // meaningful to sample until then, harmless because points stays
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

    const geo = this.points.geometry;
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.count * 3), 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aScatter', new THREE.BufferAttribute(scatter, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aGlyphTarget', new THREE.BufferAttribute(glyphTarget, 3));
    geo.setAttribute('aStagger', new THREE.BufferAttribute(stagger, 1));
    geo.setAttribute('aSeed', new THREE.BufferAttribute(seedAttr, 1));
    geo.setAttribute('aSize', new THREE.BufferAttribute(sizeAttr, 1));
    this._aScatterAttr = geo.attributes.aScatter;

    // Swap the glyph plane's texture + geometry for the new text (disposing
    // the old GPU resources first — a timeline can trigger many events per
    // session).
    if (this.glyphMaterial.map) this.glyphMaterial.map.dispose();
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    this.glyphMaterial.map = texture;
    this.glyphMaterial.needsUpdate = true;

    this.glyphMesh.geometry.dispose();
    this.glyphMesh.geometry = new THREE.PlaneGeometry(worldWidth * this.textScale, worldHeight * this.textScale);
    this._glyphBaseWidth = worldWidth;
    this._glyphBaseHeight = worldHeight;

    // Resize the wake-scratch arrays to match the new particle count.
    this._wakeLocalX = new Float32Array(this.count);
    this._wakeLocalPos = new Float32Array(this.count * 3);
    this._wakeSortIndices = new Int32Array(this.count);
  }

  // ---- Lyric Timeline V1: bulk-apply GUI-tunable fields from a plain data
  // object (e.g. a timeline event's per-type parameters) without the
  // caller needing its own copy of the field list. Unknown/undefined keys
  // are ignored, so callers can pass a partial config. ----
  configure(opts = {}) {
    const KEYS = [
      'textScale', 'formationDistance', 'formationHeightOffset',
      'travelDuration', 'assembleDuration', 'holdDuration', 'leaveDuration', 'dissolveDuration',
      'particleCount', 'particleContribution', 'billboardRelease', 'positionRelease', 'followSmoothing',
      'maxPositionChaseSeconds', 'screenLock',
      'trailWindowMin', 'trailWindowMax', 'flowAmount',
      // Trail Lyrics Font Support V1 (spec: "per-event font override from
      // ForeverMoreLyrics.js") — a timeline event's trailLyricsConfig may
      // include any of these to override the current font for that event
      // only; setText() (called right after configure() by beginEvent())
      // picks them straight up. Applied synchronously here, unlike
      // setFont() below — a timeline event fires on the audio clock and
      // must never await a webfont load mid-trigger, so per-event font
      // overrides are only safe to use with fonts already warmed (e.g. via
      // the GUI's font-family test control, which does the async wait).
      'fontFamily', 'fontWeight', 'fontSizeScale', 'lineHeight',
      // Forevermore Title Match V1 — see sampleTextTargets()'s doc.
      'shadowStrength',
      // Configurable Text/Shadow Color V1 — see sampleTextTargets()'s doc.
      'textColor', 'shadowColor',
      // Outline V1 — see sampleTextTargets()'s doc.
      'outlineWidth', 'outlineColor',
    ];
    for (const k of KEYS) if (opts[k] !== undefined) this[k] = opts[k];
  }

  // ---- Lyric Timeline V1: the single entry point a timeline controller
  // needs — swap in new text (setText()) and start a brand-new cycle for
  // it RIGHT NOW (reset localTime/._cyclePrepared), rather than waiting for
  // whatever cycle happened to be running to loop around. Callers that
  // also want different timing/sizing for this event should call
  // configure() first (or pass it here as `opts`, applied before the text
  // swap so e.g. a HERO event's larger textScale is already in effect when
  // the new glyph geometry is built). ----
  beginEvent(text, opts = {}) {
    this.configure(opts);
    this.setText(text);
    this.localTime = 0;
    this._cyclePrepared = false;
    this.phase = 'travel';
    // Reading-Order Layout V2: a fresh event always starts at its own
    // natural (unshifted) slot AND already targeting it (no reflow
    // animation from a prior text's leftover offset) — TrailLyricsManager
    // calls setLayoutTarget() right after this, with the real column
    // position, once the new active set's layout has been computed.
    this._slotOffset = { right: 0, up: 0 };
    this._slotTargetOffset = { right: 0, up: 0 };
  }

  // Trail Lyrics Font Support V1 — the GUI's "font family test" control
  // (and any other caller picking an arbitrary/possibly-not-yet-loaded
  // webfont) should use THIS rather than configure()+setText() directly:
  // it waits for the Font Loading API (with a timeout — see
  // ensureFontReady()) before regenerating the CanvasTexture, so the very
  // first frame with the new font already has real glyph metrics instead
  // of a fallback-font canvas that then silently never gets refreshed.
  // Fully async and never awaited by the per-frame update()/beginEvent()
  // path — it does not touch or delay lyric timing/choreography in any way.
  async setFont(opts = {}, timeoutMs = 3000) {
    if (opts.fontFamily !== undefined) this.fontFamily = opts.fontFamily;
    if (opts.fontWeight !== undefined) this.fontWeight = opts.fontWeight;
    if (opts.fontSizeScale !== undefined) this.fontSizeScale = opts.fontSizeScale;
    if (opts.lineHeight !== undefined) this.lineHeight = opts.lineHeight;
    const fontSpec = `${this.fontWeight} 32px ${this.fontFamily}`;
    await ensureFontReady(fontSpec, this.currentText, timeoutMs);
    // Rebuild the glyph texture/particle targets with whatever font the
    // browser resolved (the requested webfont if it loaded in time, else
    // the next family in the fallback stack) — same regeneration path as
    // any other setText() call, so it's still just DATA changing, not a
    // new code path for TrailLyrics' animation/choreography.
    if (this.currentText !== null) this.setText(this.currentText);
  }

  // Trail Lyrics Style GUI — a lightweight, GUI-friendly way to preview
  // style changes (shadow strength, text color, shadow color) on the
  // CURRENTLY visible phrase without going through the full setText()
  // rebuild: re-rasterises the SAME current text at the SAME font/size/wrap
  // settings (so particle targets, geometry, and layout are byte-for-byte
  // unchanged — sampleTextTargets() is a pure function of its inputs, and
  // only its RETURNED CANVAS is used here), then swaps only the glyph
  // texture. Synchronous, no allocation beyond the one small offscreen
  // canvas/texture — safe to call from a GUI onChange handler, never from
  // the per-frame update() path. Takes a single options object
  // ({ shadowStrength, textColor, shadowColor, outlineWidth, outlineColor,
  // fontFamily }, any subset optional) rather than positional params, so
  // future style knobs extend this one call instead of growing an ad-hoc
  // setter per property.
  //
  // fontFamily is the one exception to "texture-only": a different font
  // changes the glyph SHAPES themselves (spec: "changing fontFamily SHOULD
  // naturally change particle target positions... that is correct"), so it
  // cannot be a texture-only swap — the particle target positions
  // (aGlyphTarget, sampled from the OLD font's outline) would go stale.
  // setText() already performs exactly that full rebuild (geometry +
  // texture) from whatever this.fontFamily currently is, so it's reused
  // wholesale here rather than duplicating its particle-buffer logic.
  setGlyphStyle({ shadowStrength, textColor, shadowColor, outlineWidth, outlineColor, fontFamily } = {}) {
    if (shadowStrength !== undefined) this.shadowStrength = shadowStrength;
    if (textColor !== undefined) this.textColor = textColor;
    if (shadowColor !== undefined) this.shadowColor = shadowColor;
    if (outlineWidth !== undefined) this.outlineWidth = outlineWidth;
    if (outlineColor !== undefined) this.outlineColor = outlineColor;
    if (this.currentText === null) return; // nothing drawn yet — setText() will pick up the new value(s) on its own
    if (fontFamily !== undefined && fontFamily !== this.fontFamily) {
      this.fontFamily = fontFamily;
      this.setText(this.currentText); // full rebuild — see this method's own comment on why
      return;
    }
    const rasterOpts = {
      targetCount: this.particleCount,
      seed: this._seed,
      fontFamily: this.fontFamily,
      fontWeight: this.fontWeight,
      fontSizeScale: this.fontSizeScale,
      lineHeight: this.lineHeight,
      shadowStrength: this.shadowStrength,
      textColor: this.textColor,
      shadowColor: this.shadowColor,
      outlineWidth: this.outlineWidth,
      outlineColor: this.outlineColor,
    };
    if (this.screenLock) rasterOpts.fixedWorldScale = LAYOUT_FIXED_WORLD_SCALE;
    else rasterOpts.worldWidth = 15;
    const { canvas } = sampleTextTargets(this.currentText, rasterOpts);
    const oldTexture = this.glyphMaterial.map;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    this.glyphMaterial.map = texture;
    this.glyphMaterial.needsUpdate = true;
    if (oldTexture) oldTexture.dispose(); // disposed only AFTER the new texture is already assigned/live
  }

  setTint(color) {
    this.particleUniforms.uColor.value.copy(COLOR_PARTICLE).lerp(color, 0.10);
    // Subtle Readability Styling V2 — glyphMaterial.color is deliberately
    // NOT touched here anymore: the readable text stays a fixed neutral
    // white (COLOR_GLYPH_NEUTRAL, set once at construction) regardless of
    // time of day, so it never recolours toward the warm/cool stage tint
    // the way the particle wake above still legitimately does.
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

  // DOM Hold Overlay V1 — a one-off NDC->CSS-percentage projection of
  // wherever _planeCenter happened to be at the moment this was called.
  // Deliberately NOT stored/reused internally beyond the single assignment
  // in _recompute() below (see _holdScreenPos's own comment) — callers
  // never need to call this directly.
  _projectToScreen(camera) {
    const p = this._tmpProjected.copy(this._planeCenter).project(camera);
    return { x: (p.x + 1) * 50, y: (1 - p.y) * 50 };
  }

  // Public surface for TrailLyricsManager.getHoldOverlays() — null unless
  // this phrase is CURRENTLY in its HOLD crossfade window with a cached
  // screen position, in which case {x, y} are CSS percentages and alpha is
  // this frame's crossfade opacity (see DOM_OVERLAY_CROSSFADE).
  getHoldOverlay() {
    if (!this._holdScreenPos || this._domOverlayAlpha <= 0) return null;
    return { x: this._holdScreenPos.x, y: this._holdScreenPos.y, alpha: this._domOverlayAlpha, text: this.currentText };
  }

  // Reading-Order Layout V2 — TrailLyricsManager calls this every time it
  // recomputes the readable-set column layout (a phrase entering/leaving,
  // or an existing phrase's own column position shifting to close a gap).
  // Only sets the TARGET; _recompute() eases _slotOffset toward it over
  // ~0.5s every frame (see the ticket's "no teleport" rule) — calling this
  // repeatedly with the same value is a harmless no-op.
  setLayoutTarget(offset) {
    this._slotTargetOffset.right = offset.right;
    this._slotTargetOffset.up = offset.up;
  }
  // This instance's actual rendered glyph-plane size in world units
  // (already includes textScale) — used by TrailLyricsManager's layout
  // algorithm for the final hard-bounds verification/clamp pass against
  // the REAL rendered size, not just the pre-render pixel-width estimate
  // used to decide wrapping/column layout.
  getGlyphSize() {
    return { width: this._glyphBaseWidth * this.textScale, height: this._glyphBaseHeight * this.textScale };
  }

  // Particle Dissolve V2 — deterministically samples `count` of this
  // phrase's OWN already-computed glyph target positions (the exact local
  // points ASSEMBLE condenses particles into — see setText()'s
  // `aGlyphTarget` attribute) and converts them to WORLD space using the
  // plane frame's CURRENT _planeCenter/_planeQuat. Only ever called once
  // LEAVE has begun, at which point both are already frozen (positionInfluence/
  // orientationInfluence are 0), so this reads a stable, unmoving pose —
  // "particles originate from the text glyph area" with zero new
  // text-sampling work, reusing data TrailLyrics already had. Seeded (not
  // Math.random) so the same phrase always detaches into the same relative
  // dust pattern.
  sampleDissolveOrigins(count, seed) {
    const glyphArr = this.points.geometry.attributes.aGlyphTarget.array;
    const total = this.count;
    if (total === 0) return [];
    const rand = mulberry32(seed >>> 0);
    const out = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(rand() * total) % total;
      const local = new THREE.Vector3(glyphArr[idx * 3 + 0], glyphArr[idx * 3 + 1], glyphArr[idx * 3 + 2]);
      local.applyQuaternion(this._planeQuat).add(this._planeCenter);
      out.push(local);
    }
    return out;
  }

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

  // ---- Reading-Order Layout V2 — the anchor a screen-locked (authored
  // endTime) phrase chases for its whole ASSEMBLE+HOLD span, replacing
  // Screen-Lock Hold V1's live head-distance-based chase. Built at a FIXED
  // distance along the camera's own forward axis (see LAYOUT_FIXED_DEPTH's
  // doc comment for why fixing the depth matters), offset by this
  // instance's current (eased) reading-order column position. Because both
  // this offset and the CAMERA are re-read fresh every frame, the phrase's
  // on-screen position stays correct across any camera movement/cut —
  // there is nothing here that could go stale between frames. ----
  _computeLayoutCenter(camera, out) {
    camera.matrixWorld.extractBasis(this._tmpCamRight, this._tmpCamUp, this._tmpCamFwd);
    // extractBasis's third axis is the camera's local +Z (its BACK, since a
    // THREE.Camera looks down its own -Z) — negate for forward, matching
    // camera.getWorldDirection()'s own convention.
    out.copy(camera.position)
      .addScaledVector(this._tmpCamFwd, -LAYOUT_FIXED_DEPTH)
      .addScaledVector(this._tmpCamRight, this._slotOffset.right)
      .addScaledVector(this._tmpCamUp, this._slotOffset.up);
    return out;
  }

  // Runs once per cycle, the instant the phrase starts assembling: seeds
  // _planeCenter/_planeQuat from the live desired centre and camera
  // orientation so the very first assemble frame is already well-composed,
  // then derives this cycle's particle source positions from the live wake
  // (spec 3/4) now that the local frame they need to be expressed in exists.
  _prepareFormation(headParticleTrail, camera) {
    // Wake-Origin Anchor Fix V1 — seed from whichever anchor _recompute()'s
    // own position-influence block will ACTUALLY use going forward
    // (_computeLayoutCenter for a screen-locked phrase, matching its
    // screenLockActive branch there), not always the legacy head-relative
    // _computeDesiredCenter. _computeWakeScatter() below converts each
    // sampled wake position into LOCAL coordinates relative to whatever
    // _planeCenter/_planeQuat are AT THIS MOMENT — if that differs from the
    // anchor _recompute() switches to moments later (same frame, right
    // after this call, for a screen-locked phrase), those local coordinates
    // get re-interpreted against a DIFFERENT world transform than the one
    // they were computed against, and the particles render displaced away
    // from the real wake they were sampled from — even though the sampled
    // POSITIONS themselves were correct. Seeding from the same anchor here
    // removes that mismatch entirely: the wake-sampled particles render
    // exactly where they were sampled from, independent of where the
    // phrase's own readable text ends up on screen.
    if (this.screenLock) this._computeLayoutCenter(camera, this._planeCenter);
    else this._computeDesiredCenter(headParticleTrail, camera, this._planeCenter);
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
    if (!this.paused && this.enabled) {
      if (this.loop) {
        this.localTime += dt;
      } else {
        // Lyric Timeline V1: once a non-looping cycle finishes, freeze at
        // its own end (fully dissolved) instead of wrapping around and
        // replaying the same phrase — the phrase stays dormant/invisible
        // until the timeline's next explicit beginEvent() call.
        this.localTime = Math.min(this.localTime + dt, this._bounds().cycle);
      }
    }
    this._recompute(headParticleTrail, camera, dt);
  }

  _recompute(headParticleTrail, camera, dt = 1 / 60) {
    if (!this.enabled || !headParticleTrail || !camera) {
      this.points.visible = false;
      this.glyphMesh.visible = false;
      return;
    }

    const { t1, t2, t3, t4, cycle } = this._bounds();
    const lt = this.loop ? (this.localTime % cycle) : this.localTime;

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

    // DOM Hold Overlay V1 (see DOM_OVERLAY_CROSSFADE's own comment) —
    // _domOverlayAlpha ramps 0->1 over the crossfade window at hold's start
    // and 1->0 over the same window at hold's end, min()'d so a HOLD
    // shorter than twice the crossfade still reaches a sensible peak
    // instead of overshooting. The actual _holdScreenPos SCREEN POSITION
    // is computed further below, once _planeCenter has been refreshed for
    // this frame (see that block's own comment for why it isn't simply
    // cached once here).
    const inHoldWindow = this.screenLock && lt >= t2 && lt < t3;
    if (inHoldWindow) {
      const holdElapsed = lt - t2;
      const holdRemaining = t3 - lt;
      const fadeIn = smoothstep(0, DOM_OVERLAY_CROSSFADE, holdElapsed);
      const fadeOut = smoothstep(0, DOM_OVERLAY_CROSSFADE, holdRemaining);
      this._domOverlayAlpha = Math.min(fadeIn, fadeOut);
    } else {
      this._holdScreenPos = null;
      this._domOverlayAlpha = 0;
    }

    // Orientation-influence envelope (spec 7): fully locked through ASSEMBLE
    // and the first `billboardRelease` fraction of HOLD, then a smooth
    // release across the remainder of HOLD, reaching exactly 0 by the start
    // of LEAVE — so LEAVE/DISSOLVE are always already fully world-locked.
    const orientLockEnd = t2 + (t3 - t2) * THREE.MathUtils.clamp(this.billboardRelease, 0, 1);
    // Screen-Lock Jitter Fix V1 — computed once, here, and reused below for
    // both orientation and position: see this block's own comment on
    // _planeQuat/_planeCenter for why a fully screen-locked phrase needs to
    // be told apart from the legacy billboardRelease==1.0 case even though
    // both produce orientationInfluence === 1.0.
    const screenLockActive = this.screenLock && lt < t3;
    let orientationInfluence;
    if (screenLockActive) {
      // Screen-Lock Hold V1: stay fully camera-facing for the ENTIRE hold
      // (not just the first billboardRelease fraction of it) — an authored
      // endTime means "readable until then", and readable requires still
      // facing the camera, however long that hold runs or however many
      // camera cuts happen during it. Freezes at t3 (start of LEAVE) exactly
      // like every other phrase — this only changes the shape of the ramp
      // during HOLD, never what happens after it.
      orientationInfluence = 1.0;
    } else if (lt <= orientLockEnd) orientationInfluence = 1.0;
    else if (lt <= t3) orientationInfluence = 1.0 - smoothstep(orientLockEnd, t3, lt);
    else orientationInfluence = 0.0;

    if (screenLockActive) {
      // Screen-Lock Jitter Fix V1 — a fully screen-locked phrase's
      // orientation should track the follow camera's own (already smoothed)
      // orientation with ZERO further lag, not a SECOND independently-timed
      // damper slerping toward it on top of that. Two exponential dampers
      // fed the exact same per-frame dt (which is never perfectly constant
      // in a real browser — ordinary vsync/frame-pacing variance) drift in
      // and out of phase with each other every frame; the RELATIVE
      // orientation/position between camera and text (which is what
      // actually renders as the on-screen billboard) then visibly twitches
      // even though neither damper alone looks unstable in isolation.
      // Confirmed via a manual frame-stepping simulation of the real
      // camera-follow + layout-anchor formulas: with a perfectly uniform dt
      // the screen-relative offset was rock steady (zero direction
      // reversals), but with realistic frame-time jitter alone (no
      // steering/Free Navigation input at all) it reversed direction on
      // most frames. See the matching _planeCenter fix just below.
      this._planeQuat.copy(camera.quaternion);
    } else if (orientationInfluence > 0.001) {
      const damp = 1 - Math.pow(0.0008, dt * Math.max(orientationInfluence, 0.05));
      this._planeQuat.slerp(camera.quaternion, Math.min(1, damp));
    }
    // orientationInfluence === 0 -> plane quaternion is simply left untouched (frozen).

    // Reading-Order Layout V2: a screen-locked phrase's own reading-order
    // column position (`_slotTargetOffset`, set by TrailLyricsManager) is
    // eased toward smoothly — never teleported — over roughly half a
    // second any time the manager reflows the layout (a sibling entering
    // or leaving the readable set). `SLOT_TRANSITION_RATE` is tuned so this
    // settles within the ticket's "approximately 0.4-0.7 seconds" window.
    if (this.screenLock) {
      const slotDamp = 1 - Math.pow(0.0008, dt * SLOT_TRANSITION_RATE);
      const d = Math.min(1, slotDamp);
      this._slotOffset.right += (this._slotTargetOffset.right - this._slotOffset.right) * d;
      this._slotOffset.up += (this._slotTargetOffset.up - this._slotOffset.up) * d;
    }

    // Position-influence envelope (V1.1, spec 5/8) for the LEGACY (non
    // screen-locked) path — unchanged, byte-for-byte the original formula.
    // A screen-locked phrase instead tracks _computeLayoutCenter() at full
    // influence for its entire ASSEMBLE+HOLD span: unlike the old live
    // head-distance chase, the layout anchor is already a fixed, distinct,
    // collision-free target per phrase (TrailLyricsManager's column
    // layout), so there is no more "runaway convergence with a sibling"
    // risk to cap a chase window against — maxPositionChaseSeconds
    // continues to govern only the legacy fallback path below.
    const positionChaseWindow = Math.min(this.holdDuration, this.maxPositionChaseSeconds);
    const posLockEnd = t2 + positionChaseWindow * THREE.MathUtils.clamp(this.positionRelease, 0, 1);
    const posReleaseEnd = t2 + positionChaseWindow;
    let positionInfluence;
    if (screenLockActive) positionInfluence = 1.0;
    else if (lt <= posLockEnd) positionInfluence = 1.0;
    else if (lt <= posReleaseEnd) positionInfluence = 1.0 - smoothstep(posLockEnd, posReleaseEnd, lt);
    else positionInfluence = 0.0;

    if (screenLockActive) {
      // Screen-Lock Jitter Fix V1 — see the matching _planeQuat comment
      // above for the full explanation. _computeLayoutCenter() is already
      // expressed directly in the CURRENT camera's own basis vectors
      // (rebuilt fresh every frame by design — see that method's own
      // comment: "always correct across any camera movement/cut"), so
      // chasing it with a SECOND independently-timed exponential lerp only
      // reintroduces the exact beat-frequency jitter this fix removes.
      // Snapping directly makes the anchor exactly slotOffset-from-centre
      // with zero additional relative lag against the camera, every frame,
      // regardless of dt jitter.
      this._computeLayoutCenter(camera, this._planeCenter);
    } else if (positionInfluence > 0.001) {
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

    // DOM Hold Overlay V1 — recomputed every frame (never just once), from
    // _planeCenter as freshly refreshed above, so this tracks whatever the
    // 3D anchor is ACTUALLY doing: a live camera pan within the current
    // shot, or a reading-order layout reflow when a sibling phrase enters/
    // leaves (_slotOffset easing to a new target over ~0.5s, above) both
    // move _planeCenter legitimately mid-HOLD, and the overlay needs to
    // follow both or it visibly drifts away from where the (now invisible)
    // 3D text actually is — an EARLIER version of this cached the
    // projection exactly once at HOLD's start and never touched it again,
    // which fixed the frame-hitch jump but broke tracking entirely once a
    // reflow moved the real anchor. The one thing still filtered out is a
    // single-frame jump bigger than a real camera/layout change could
    // plausibly produce (the same class of spike the console diagnostic
    // above catches) — DOM_OVERLAY_MAX_JUMP_PERCENT is generous enough for
    // ordinary panning and reflows, tight enough to reject a hitch.
    if (inHoldWindow) {
      const projected = this._projectToScreen(camera);
      if (!this._holdScreenPos) {
        this._holdScreenPos = projected;
      } else {
        const dx = projected.x - this._holdScreenPos.x;
        const dy = projected.y - this._holdScreenPos.y;
        if (Math.hypot(dx, dy) <= DOM_OVERLAY_MAX_JUMP_PERCENT) this._holdScreenPos = projected;
        // else: reject this frame's outlier projection, keep the last-good position.
      }
    }

    this.points.position.copy(this._planeCenter);
    this.points.quaternion.copy(this._planeQuat);
    this.glyphMesh.position.copy(this._planeCenter);
    this.glyphMesh.quaternion.copy(this._planeQuat);
    this.points.visible = true;

    const assembleProgress = smoothstep(t1, t2, lt);
    const dissolveProgress = smoothstep(t4, cycle, lt);
    this.particleUniforms.uAssembleProgress.value = assembleProgress;
    this.particleUniforms.uDissolveProgress.value = dissolveProgress;

    // Glyph fades in near the very end of ASSEMBLE, once the particle
    // letter structure already reads (V1.2 spec 9: reduce the sense of a
    // finished sign suddenly fading in — tightened from V1's 0.6s window).
    const glyphFadeIn = smoothstep(t2 - Math.min(0.4, this.assembleDuration), t2, lt);
    // Fade-Out Tuning V2's original envelope — kept ONLY to drive the
    // particle wake's own auto-fade below (autoParticleFade), preserving
    // that existing particle behavior byte-for-byte (spec: "do not change
    // particle systems"). It no longer drives the glyph mesh's own
    // opacity/visibility — see "Trail Lyrics Opacity Fix V1" below.
    const glyphFadeOutEnd = t3 + GLYPH_FADE_OUT_SECONDS;
    const glyphDepartureProgress = smoothstep(t3, glyphFadeOutEnd, lt);
    const glyphFadeOut = 1 - glyphDepartureProgress;
    const glyphEnvelope = glyphFadeIn * glyphFadeOut;

    // Trail Lyrics Opacity Fix V1 — the glyph mesh's own opacity is now
    // ONLY ever the ASSEMBLE fade-in (clamped to [0, 1], so it can never
    // exceed 1.0 — the prior design multiplied in a per-phrase `textGlow`
    // field, 1.35 for 'hero' phrases, which fed a negative
    // ONE_MINUS_SRC_ALPHA blend factor into NormalBlending, an undefined/
    // clamped edge case rather than a legitimate "extra bright" effect;
    // `textGlow` had no other use anywhere in this codebase and has been
    // removed entirely — see the "CLEAN UP TRAIL LYRICS DIAGNOSTICS" ticket).
    // The glyph mesh is also no longer faded to a partially-transparent
    // state after its authored endTime (t3) — a readable glyph must be
    // either fully opaque or not rendered at all, never a translucent
    // "ghost" the background shows through. It now stays at opacity 1 for
    // the entirety of HOLD, then is hidden (visible = false) with a clean,
    // instant cutoff the moment LEAVE begins — LyricDissolveParticles
    // (registered by TrailLyricsManager at that exact same instant,
    // unchanged) is what carries the entire visual departure from there on,
    // per the intended "solid glyph -> endTime -> glyph gone -> particles
    // carry the departure" sequence.
    this.glyphMesh.visible = lt < t3;
    // Crossfades against the DOM hold overlay (see DOM_OVERLAY_CROSSFADE):
    // (1 - _domOverlayAlpha) is 1 outside of HOLD and outside HOLD's own
    // crossfade windows, so this is a pure no-op multiply everywhere except
    // those brief windows at HOLD's start/end.
    this.glyphMaterial.opacity = THREE.MathUtils.clamp(glyphFadeIn, 0, 1) * (1 - this._domOverlayAlpha);

    // Particle contribution dims automatically as the glyph layer takes
    // over (never to zero — a residual sparkle stays visible around/through
    // the readable text) on top of the GUI's own manual control. Reads
    // `glyphEnvelope` (the OLD glyph fade curve, preserved above), not the
    // glyph mesh's own new opacity — this particle behavior is unchanged.
    const autoParticleFade = 1.0 - glyphEnvelope * 0.5;
    this.particleUniforms.uParticleContribution.value = this.particleContribution * autoParticleFade;
  }

  // TrailLyrics Multi-Instance V1 — releases every GPU/scene resource THIS
  // instance owns (its own particle geometry+material, its own glyph
  // geometry+material+CanvasTexture, and removes both objects from the
  // scene they were added to in the constructor). Idempotent (safe to call
  // twice) and touches nothing outside this instance — no shared
  // WaterThreeJS resource (ocean/sky/HeadParticleTrail/etc) is ever
  // referenced here, only `this.points`/`this.glyphMesh` and their own
  // geometry/material/texture. After calling this, the instance must not
  // be used again (update()/setTime()/etc are not guaranteed safe post-
  // dispose — a manager should simply drop its reference).
  //
  // Existing single-instance callers (e.g. the standalone `?trailLyrics=1`
  // demo without a timeline) are entirely unaffected: nothing calls
  // dispose() on the one long-lived instance they create, so its lifetime
  // is unchanged.
  dispose() {
    if (this._disposed) return;
    this._disposed = true;

    if (this._scene) {
      this._scene.remove(this.points);
      this._scene.remove(this.glyphMesh);
    }

    this.points.geometry.dispose();
    this.points.material.dispose();

    this.glyphMesh.geometry.dispose();
    if (this.glyphMaterial.map) this.glyphMaterial.map.dispose();
    this.glyphMaterial.dispose();

    this.enabled = false;
  }
}
