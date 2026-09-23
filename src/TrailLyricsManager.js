import * as THREE from 'three';
import { TrailLyrics, LAYOUT_FIXED_DEPTH, LAYOUT_FIXED_WORLD_SCALE, wrapDisplayLines } from './TrailLyrics.js';
import { LyricDissolveParticles } from './LyricDissolveParticles.js';

// TrailLyrics Multi-Instance V1 — owns a SET of independent TrailLyrics
// instances (one per currently-should-exist lyric phrase) instead of the
// single shared instance every prior task used. Responsibility split:
// LyricTimeline decides WHAT should exist at the current audio time (pure
// scheduling — see its class comment); this manager decides HOW that
// happens — constructing/advancing/disposing the actual TrailLyrics
// objects, AND (Reading-Order Layout V2) arranging every currently
// screen-locked (authored-endTime) phrase into a chronological, on-screen
// reading-order layout, plus driving the shared particle-dissolve system
// their departures use. Neither TrailLyrics nor LyricTimeline needs to
// know about this arrangement — TrailLyrics only exposes
// setLayoutTarget()/sampleDissolveOrigins(), LyricTimeline only ever calls
// spawn()/despawn()/has().
//
// V1 deliberately does NOT pool/reuse TrailLyrics instances (spec:
// "Correctness first... do not implement object reuse/pooling unless
// investigation showed it is actually necessary"). The prior investigation
// found real max concurrency of 7 full-lifecycle instances, each ~2 draw
// calls / ~30KB particle buffer / a few MB texture — cheap enough that
// plain construct-on-spawn/dispose-on-expire is simplest and safest; see
// TRAILLYRICS MULTI-INSTANCE V1 investigation report.
//
// One traveler (spec 5/9 of the follow-up ticket): every spawned instance
// reads the SAME single HeadParticleTrail passed into update() each frame
// — nothing here ever creates or duplicates a traveler. TrailLyrics.js's
// own historical-trajectory sampling (_computeWakeScatter(), via
// headParticleTrail.getHeadPositionAtTime()) is already a pure, read-only
// query (confirmed in the investigation), so any number of concurrent
// instances safely reading from the one traveler was already supported
// without any HeadParticleTrail change.
//
// Reading-Order Layout V2 — TRAIL LYRICS READABLE LAYOUT + LIGHTWEIGHT
// PARTICLE DISSOLVE V2 ticket. Replaces the prior TRAILLYRICS
// OVERLAPPING-LIFETIME PLACEMENT ticket's collision-avoidance/scattered
// slot search (findFreeSlot, tried up to 9 directions x 4 radii) — that
// model let phrases land almost anywhere on screen as long as they didn't
// overlap, which is the wrong reading model per this ticket (spec 2) and
// could still place a phrase entirely outside the visible frame (spec 1).
// This version instead:
//   - orders every currently-screen-locked phrase strictly by trigger time
//     (oldest first — `_active`'s own natural order, since spawn() always
//     appends and despawn() splices, so it never needs re-sorting);
//   - lays them out as ONE vertical column (chronological top-to-bottom)
//     if that fits the safe area at the fixed font size, else as TWO
//     columns in column-major reading order (spec 3/4);
//   - expresses every position as an exact analytic (right, up) offset
//     from a FIXED-DISTANCE camera-relative anchor (TrailLyrics'
//     _computeLayoutCenter, built from the camera's own FOV/aspect), so
//     "authored visible" and "actually on screen" are the same thing by
//     construction (spec 8/9), not something that has to be measured and
//     hoped for;
//   - reflows smoothly (TrailLyrics eases toward a new target over ~0.5s)
//     whenever the active set changes, which is now the one place an
//     ALREADY-established phrase's position is allowed to move (spec 7).
export class TrailLyricsManager {
  constructor(scene, opts = {}) {
    this.scene = scene;
    // Soft cap (investigation spec 11): comfortably above the real
    // measured max (7) with headroom, never a silent scheduling failure —
    // reaching it evicts the OLDEST active phrase with a console.warn
    // rather than refusing to spawn the newest one.
    this.maxActive = opts.maxActive || 8;
    // Ordered oldest -> newest by spawn order (== trigger order, since
    // LyricTimeline only ever asks to spawn a phrase once its triggerTime
    // has been reached) — this ordering is what makes
    // getNewestActivePhrase() a simple "last element" lookup AND what the
    // reading-order layout's chronological ordering is built directly on.
    this._active = []; // [{ id, phrase, instance, dissolveRegistered }]

    // Particle Dissolve V2 — one shared, budget-capped system for every
    // phrase's endTime departure (see LyricDissolveParticles's own class
    // doc for why it is deliberately separate from both TrailLyrics' own
    // per-phrase ASSEMBLE particle pool and from HeadParticleTrail).
    this.dissolve = new LyricDissolveParticles(scene, opts.dissolve || {});

    // Cached from the most recent update() call — spawn() (called from
    // LyricTimeline.setTime(), which runs BEFORE this manager's own
    // update() each frame — see main.js's animate loop order) needs a
    // camera to decide wrap width/layout for a brand-new phrase, but isn't
    // itself given one. One frame of staleness on camera fov/aspect
    // (which essentially never change frame-to-frame anyway) is
    // imperceptible and far simpler than threading a camera reference
    // through LyricTimeline, which has no other reason to know about it.
    this._lastCamera = null;
    this._lastLayoutMode = 'SINGLE_COLUMN';

    this._tmpBackward = new THREE.Vector3();
  }

  has(id) {
    return this._active.some((e) => e.id === id);
  }

  getActiveIds() {
    return this._active.map((e) => e.id);
  }

  // Debug/inspection only — the raw {id, phrase, instance} entries, so a
  // caller (e.g. browser-console testing) can reach each active instance
  // directly (instance.getPhase()/setTime()/etc) without this class having
  // to grow a bespoke accessor for every such need.
  getActiveEntries() {
    return this._active;
  }

  // The resolved LyricTimeline phrase objects currently on screen (or
  // mid-assemble/leave/dissolve) — for debug/GUI inspection. Returns the
  // SAME phrase objects LyricTimeline already produces, not renderer
  // internals.
  getActivePhrases() {
    return this._active.map((e) => e.phrase);
  }

  // Reading-Order Layout V2 debug/report accessor — 'SINGLE_COLUMN' or
  // 'MULTI_COLUMN', whichever the most recent layout recompute chose.
  getLayoutMode() {
    return this._lastLayoutMode;
  }

  // The single most-recently-triggered active TrailLyrics instance — what
  // AutoDirector's lyric-safety gating should read (camera safety follows
  // whichever phrase is newest/currently forming or being read, not every
  // older phrase still lingering in world space as a leave-behind object).
  // Returns the TrailLyrics INSTANCE (has getPhase()), not the phrase data.
  getNewestActivePhrase() {
    return this._active.length ? this._active[this._active.length - 1].instance : null;
  }

  // DOM Hold Overlay V1 — every currently-active phrase's own
  // getHoldOverlay() (null unless that phrase is inside its HOLD crossfade
  // window), tagged with its id so main.js can key a pooled set of DOM
  // elements to it (more than one phrase can be in HOLD at once).
  getHoldOverlays() {
    const result = [];
    for (const entry of this._active) {
      const overlay = entry.instance.getHoldOverlay();
      if (overlay) result.push({ id: entry.id, ...overlay });
    }
    return result;
  }

  // Spawns one new TrailLyrics instance for `phrase` (a resolved
  // LyricTimeline event: id, trailLyricsConfig, displayLines, ...). A
  // phrase already active is never re-spawned (idempotent from
  // LyricTimeline's point of view — it only calls this when `has(id)` is
  // already false, but this guard keeps the manager safe on its own too).
  //
  // Always starts fresh via beginEvent() (localTime=0/phase='travel'),
  // exactly like every prior single-instance task's seek behavior — this
  // is a deliberate, already-accepted V1 limitation (documented on
  // LyricTimeline: a full sub-event replay engine reconstructing "how far
  // into HOLD would we be" is out of scope), now simply applied uniformly
  // per-phrase instead of to one shared instance.
  spawn(phrase) {
    if (this.has(phrase.id)) return;
    if (this._active.length >= this.maxActive) {
      const evicted = this._active.shift();
      console.warn(`[TrailLyricsManager] active phrase cap (${this.maxActive}) reached — evicting oldest "${evicted.id}" to spawn "${phrase.id}".`);
      evicted.instance.dispose();
      this.dissolve.releasePhrase(evicted.id);
    }
    const seed = hashSeed(phrase.id);
    const config = { ...phrase.trailLyricsConfig };
    // Trail Lyrics Style GUI — apply the current GUI-set glyph style (if
    // any) to every newly-spawned phrase too, not just the ones already
    // active when the GUI was touched. Each is undefined until the GUI
    // actually calls setGlyphStyle() with that property — in that case
    // TrailLyrics' own constructor defaults apply, unchanged.
    if (this._glyphShadowStrength !== undefined) config.shadowStrength = this._glyphShadowStrength;
    if (this._glyphTextColor !== undefined) config.textColor = this._glyphTextColor;
    if (this._glyphShadowColor !== undefined) config.shadowColor = this._glyphShadowColor;
    if (this._glyphOutlineWidth !== undefined) config.outlineWidth = this._glyphOutlineWidth;
    if (this._glyphOutlineColor !== undefined) config.outlineColor = this._glyphOutlineColor;
    if (this._glyphFontFamily !== undefined) config.fontFamily = this._glyphFontFamily;
    // Leave/Dissolve Duration V1 — how long a phrase lingers (moving away,
    // then scattering into particles) after its HOLD phase ends. Same
    // GUI-override pattern as the glyph style fields above.
    if (this._leaveDuration !== undefined) config.leaveDuration = this._leaveDuration;
    if (this._dissolveDuration !== undefined) config.dissolveDuration = this._dissolveDuration;
    // Particle Count V1 (performance knob) — future spawns only, see
    // TrailLyrics.js's own particleCount comment for why (a live geometry
    // rebuild isn't worth it for a perf-tuning slider).
    if (this._particleCount !== undefined) config.particleCount = this._particleCount;

    // Reading-Order Layout V2: word-wrap ONCE here, conservatively, to the
    // NARROWER of the two possible column widths (i.e. assume MULTI_COLUMN
    // even if the active set is currently small enough for a single
    // column). This guarantees this phrase's wrapped text already fits
    // whichever layout mode the active set later needs, so it never has to
    // be re-wrapped — and therefore never has its glyph/particle geometry
    // rebuilt — mid-HOLD because a sibling joined and forced a narrower
    // column. Only phrases opting into the readable layout (authored
    // endTime) are wrapped this way; legacy/no-endTime phrases keep their
    // original, unwrapped multi-line grouping untouched.
    let text = phrase.displayLines.join('\n');
    if (config.screenLock) {
      const fontOpts = { fontWeight: config.fontWeight ?? 600, fontFamily: config.fontFamily ?? DEFAULT_FONT_FAMILY, fontSizeScale: config.fontSizeScale ?? 1.0 };
      const maxWidthWorld = this._halfColumnWorldWidthEstimate();
      const maxWidthPx = maxWidthWorld / LAYOUT_FIXED_WORLD_SCALE;
      text = wrapDisplayLines(phrase.displayLines, maxWidthPx, fontOpts).join('\n');
    }

    const instance = new TrailLyrics(this.scene, { text, seed });
    instance.loop = false; // event-driven, not the standalone auto-loop — see TrailLyrics.js's own `loop` field doc
    instance.beginEvent(text, config);
    this._active.push({ id: phrase.id, phrase, instance, dissolveRegistered: false });
    if (instance.screenLock) this._recomputeLayout();
  }

  despawn(id) {
    const idx = this._active.findIndex((e) => e.id === id);
    if (idx === -1) return;
    const [entry] = this._active.splice(idx, 1);
    entry.instance.dispose();
    // Defensive — by the time a phrase's fullLifecycleEnd is reached (the
    // only time LyricTimeline ever despawns it in ordinary playback), its
    // dissolve should already have completed and self-released. This
    // covers the non-ordinary paths (cap eviction, a forced/backward seek)
    // where that might not yet be true. Idempotent/harmless otherwise.
    this.dissolve.releasePhrase(id);
    if (entry.instance.screenLock) this._recomputeLayout();
  }

  // Trail Lyrics Style GUI — a GUI-facing convenience: stores whichever
  // value(s) are given so every FUTURE spawn() picks them up (see spawn()'s
  // own comment), AND immediately re-rasterises every CURRENTLY active
  // instance's glyph texture with the new value(s) (TrailLyrics.
  // setGlyphStyle() — cheap, does not touch particle targets/geometry/
  // layout/timing, EXCEPT fontFamily, which naturally reflows glyph shape/
  // particle targets since the letterforms themselves changed), so a GUI
  // change is visible on-screen right away, not just for the next phrase.
  // Takes a single options object ({ textColor, shadowColor,
  // shadowStrength, outlineWidth, outlineColor, fontFamily }, any subset
  // optional) matching TrailLyrics.setGlyphStyle()'s own shape — a caller
  // only sets the property that changed; every other property is left
  // untouched everywhere (both here and inside TrailLyrics.setGlyphStyle()).
  setGlyphStyle({ textColor, shadowColor, shadowStrength, outlineWidth, outlineColor, fontFamily } = {}) {
    if (textColor !== undefined) this._glyphTextColor = textColor;
    if (shadowColor !== undefined) this._glyphShadowColor = shadowColor;
    if (shadowStrength !== undefined) this._glyphShadowStrength = shadowStrength;
    if (outlineWidth !== undefined) this._glyphOutlineWidth = outlineWidth;
    if (outlineColor !== undefined) this._glyphOutlineColor = outlineColor;
    if (fontFamily !== undefined) this._glyphFontFamily = fontFamily;
    for (const entry of this._active) entry.instance.setGlyphStyle({ textColor, shadowColor, shadowStrength, outlineWidth, outlineColor, fontFamily });
  }

  // Leave/Dissolve Duration V1 — same live-plus-future-spawns pattern as
  // setGlyphStyle() above. TrailLyrics.configure() is a plain field
  // assignment (no geometry rebuild), so this is safe to call on an
  // instance mid-phrase — a phrase already leaving/dissolving picks up the
  // new duration for its remaining time immediately.
  setPhraseTiming({ leaveDuration, dissolveDuration } = {}) {
    if (leaveDuration !== undefined) this._leaveDuration = leaveDuration;
    if (dissolveDuration !== undefined) this._dissolveDuration = dissolveDuration;
    for (const entry of this._active) entry.instance.configure({ leaveDuration, dissolveDuration });
  }

  // Particle Count V1 (performance knob) — future spawns only; changing
  // particle count needs a full geometry rebuild (setText()), which isn't
  // worth doing live on an already-visible phrase just to tune this.
  setParticleCount(count) {
    this._particleCount = count;
  }

  // Per-frame advance for every currently active instance, plus (Reading-
  // Order Layout V2) driving the shared dissolve system. `currentTime` is
  // the SAME absolute LyricTimeline clock every phrase's own
  // triggerTime/endTime already live in — required so dissolve particle
  // state is a pure function of it (see LyricDissolveParticles' class doc
  // on why this is what makes dissolves seek-safe).
  update(dt, headParticleTrail, camera, currentTime) {
    this._lastCamera = camera;
    for (const entry of this._active) {
      entry.instance.update(dt, 0, headParticleTrail, camera);
      // Edge-triggered, once per phrase: the instant its own LEAVE phase
      // begins (== its authored endTime for a screen-locked phrase),
      // register its departure with the shared dissolve system. Applies
      // to every phrase, not just screen-locked ones — the plain-fade ->
      // particle/mist departure (spec 10/11) is a general improvement to
      // "being left behind", independent of how a phrase was held.
      if (!entry.dissolveRegistered && entry.instance.getPhase() === 'leave') {
        entry.dissolveRegistered = true;
        this._registerDissolve(entry, headParticleTrail);
        // Reading-Order Layout V2 (spec 7): the instant a phrase reaches
        // its own authored endTime and starts leaving, it must stop
        // occupying a reading-order slot — the remaining phrases should
        // smoothly close the gap it leaves behind. A phrase's `screenLock`
        // flag never changes, so _recomputeLayout()'s own active-set
        // filter (phase must still be travel/assemble/hold) is what
        // actually drops it; this call is what makes that drop happen
        // promptly instead of waiting for some unrelated later spawn.
        if (entry.instance.screenLock) this._recomputeLayout();
      }
    }
    if (currentTime != null) this.dissolve.update(currentTime);
  }

  _registerDissolve(entry, headParticleTrail) {
    const instance = entry.instance;
    const glintCount = this.dissolve.glintPerPhrase;
    const mistCount = this.dissolve.mistPerPhrase;
    const seed = hashSeed(`${entry.id}:dissolve`);
    const origins = instance.sampleDissolveOrigins(glintCount + mistCount, seed);
    if (origins.length === 0) return; // nothing sampled (shouldn't happen once text is set) — never throws
    const backwardDir = this._tmpBackward.copy(headParticleTrail.travelDir).multiplyScalar(-1).normalize();
    const dissolveStart = entry.phrase.endTime; // the instant LEAVE begins, in the same absolute clock currentTime is
    const totalDuration = instance.leaveDuration + instance.dissolveDuration;
    this.dissolve.beginDissolve(entry.id, {
      origins, dissolveStart, totalDuration, seed,
      backwardDir: backwardDir.clone(), // beginDissolve stores this per-phrase; must not alias the manager's shared scratch vector
      upDir: WORLD_UP,
    });
  }

  // Reading-Order Layout V2 — recomputes the column layout for every
  // currently screen-locked phrase and pushes each one's new (right, up)
  // target to its TrailLyrics instance (which eases toward it smoothly —
  // see TrailLyrics._recompute()'s slot-transition damping). Called
  // whenever the screen-locked active set changes (a spawn or despawn);
  // NOT called every frame — the layout itself is static between such
  // changes, only the smooth approach to it happens continuously.
  _recomputeLayout() {
    const camera = this._lastCamera;
    if (!camera) return; // no camera observed yet this session — the next spawn/despawn after the first update() frame will recompute correctly
    // Only phrases still WITHIN their own readable window (not yet past
    // their own authored endTime) occupy a reading-order slot — a phrase
    // already in 'leave'/'dissolve' has stopped being "authored visible"
    // and must not factor into the column layout at all, even though it
    // remains in `_active` (and screenLock stays true) until its full
    // lifecycle ends and LyricTimeline despawns it.
    const screenLockEntries = this._active.filter((e) => e.instance.screenLock && (e.instance.getPhase() === 'travel' || e.instance.getPhase() === 'assemble' || e.instance.getPhase() === 'hold'));
    if (screenLockEntries.length === 0) return;
    const layout = planLayout(screenLockEntries, camera);
    this._lastLayoutMode = layout.mode;
    for (const a of layout.assignments) {
      const entry = screenLockEntries.find((e) => e.id === a.id);
      if (entry) entry.instance.setLayoutTarget({ right: a.right, up: a.up });
    }
  }

  // Half of one 2-column layout's width, in world units, at the fixed
  // layout depth and the LAST camera this manager observed — used only to
  // decide spawn()'s conservative wrap width (see its comment). Falls back
  // to a sane constant before any camera has been observed (never hit in
  // practice — main.js always calls update() at least once before the
  // first lyric can trigger).
  _halfColumnWorldWidthEstimate() {
    const camera = this._lastCamera;
    if (!camera) return 10;
    const { halfW } = computeFrustumWorldExtents(camera, LAYOUT_FIXED_DEPTH);
    // Same LAYOUT_SAFETY_MARGIN as planLayout() — this decides the wrap
    // width a phrase's text is permanently committed to at spawn (see
    // spawn()'s comment), so it must stay consistent with what planLayout()
    // will later assume that column width actually is.
    const safeWidthWorld = (SAFE_AREA_X[1] - SAFE_AREA_X[0]) * halfW * LAYOUT_SAFETY_MARGIN;
    const gutterWorld = COLUMN_GUTTER_NDC * 2 * halfW;
    return (safeWidthWorld - gutterWorld) / 2;
  }

  // Full teardown — disposes every active instance, releases every
  // dissolve slot, and empties the set. Used by LyricTimeline.restart()
  // and whenever the timeline itself is torn down; NOT used for ordinary
  // seek reconciliation (that's a surgical spawn/despawn diff — see
  // LyricTimeline.setTime()).
  clear() {
    for (const entry of this._active) entry.instance.dispose();
    this._active = [];
    this.dissolve.clear();
  }
}

// ---------------------------------------------------------------------------
//  Reading-Order Layout V2 — pure layout-planning functions. Kept as plain
//  functions (not methods) since they touch no manager/instance state
//  beyond their explicit arguments — easy to reason about and to exercise
//  directly from a test/debug script.
// ---------------------------------------------------------------------------

// Ticket section 3's target safe area, in NDC (-1..1 both axes). "Generous"
// per the ticket's own wording — deliberately well inside the true ±1
// frustum edge so ordinary lens distortion/aspect differences never push a
// correctly-placed phrase past the ACTUAL visible edge.
const SAFE_AREA_X = [-0.85, 0.85];
const SAFE_AREA_Y = [-0.78, 0.78];
// Gap between the two columns in MULTI_COLUMN mode, as a fraction of the
// full NDC width (converted to world units against the live frustum below).
const COLUMN_GUTTER_NDC = 0.08;
// Absolute floor for the vertical gap between stacked phrases once
// compression (spec: fit before resorting to a hard clamp) kicks in.
const MIN_ROW_GAP_WORLD = 0.15;
// See planLayout()'s comment — a small headroom factor applied to the
// safe-area extents the LAYOUT MATH targets (not the verification bounds
// a caller checks rendered output against).
const LAYOUT_SAFETY_MARGIN = 0.92;
const DEFAULT_FONT_FAMILY = 'Georgia, "Times New Roman", serif';
const WORLD_UP = new THREE.Vector3(0, 1, 0);

function computeFrustumWorldExtents(camera, depth) {
  const vFov = THREE.MathUtils.degToRad(camera.fov);
  const halfH = depth * Math.tan(vFov / 2);
  const halfW = halfH * camera.aspect;
  return { halfW, halfH };
}

// On-screen block size for one phrase's ALREADY-WRAPPED text (decided
// once, at spawn — see spawn()'s comment). Uses the instance's REAL
// rendered glyph height (TrailLyrics.getGlyphSize(), already built by
// setText() before this is ever called) rather than re-deriving
// sampleTextTargets()'s raster-to-world formula here — the actual
// geometry already exists, and duplicating that math would only risk
// silently drifting out of sync with it (an early version of this
// function did exactly that, underestimating height by the canvas
// padding term and pinning phrases right against the top of the safe
// area with zero margin for the error).
function measureItem(entry) {
  const instance = entry.instance;
  const lines = instance.currentText ? instance.currentText.split('\n') : [''];
  const glyphSize = instance.getGlyphSize();
  const lineHeightWorld = lines.length > 0 ? glyphSize.height / lines.length : glyphSize.height;
  return { lineCount: lines.length, blockHeightWorld: glyphSize.height, lineHeightWorld };
}

function estimateGap(items) {
  const avg = items.reduce((s, it) => s + it.lineHeightWorld, 0) / Math.max(1, items.length);
  return Math.max(MIN_ROW_GAP_WORLD, avg * 0.5);
}

// Stacks `items` (each with a blockHeightWorld) vertically from a FIXED
// top anchor, top item first. Returns per-item CENTER "up" offsets (world
// units, +up) in the same array order as `items` — the top item gets the
// largest (most positive) value, matching chronological top-to-bottom
// reading order (spec 3: "oldest... top ... newest... bottom").
//
// Deliberately NOT centred as a whole block that re-balances around 0
// every time the item count changes: with a fixed top anchor, an
// ALREADY-established phrase's position depends only on the phrases
// ABOVE it (older, never changing) and the current gap — appending a new
// (younger) phrase below the existing ones never moves them at all,
// matching the ticket's rule that only REMOVAL is allowed to reflow
// already-visible phrases (spec 7). Centring the whole block on every
// insertion was tried first and rejected: it forces existing phrases to
// swap places with a brand-new phrase that (necessarily) starts easing in
// from the shared {0,0} default, and since both then move apart from that
// same shared point, their separation starts at ~0 and only reaches a
// safe distance after most of the transition — a real, measured collision
// window, not merely a theoretical one.
function stackColumn(items, gap, topAnchor) {
  const offsets = [];
  let cursorTop = topAnchor;
  for (const it of items) {
    offsets.push(cursorTop - it.blockHeightWorld / 2);
    cursorTop -= it.blockHeightWorld + gap;
  }
  // Bottom edge of the LAST (lowest) item — the one number that actually
  // decides whether this column fits the safe area, since the top anchor
  // is fixed regardless of item count.
  const bottomEdge = items.length ? offsets[offsets.length - 1] - items[items.length - 1].blockHeightWorld / 2 : topAnchor;
  return { bottomEdge, offsets };
}

// The core reading-order layout decision (ticket sections 3/4): try ONE
// vertical column first; fall back to two columns, column-major reading
// order, only if a single column genuinely cannot fit the safe area at
// the fixed font size. `entries` MUST already be in chronological
// (trigger-time) order — TrailLyricsManager's `_active` always is.
// Exported (alongside the project's existing convention of exporting pure
// helpers like wrapDisplayLines/measureTextWidthPx) purely so this can be
// exercised directly with a synthetic entries array — real playback data
// for THIS song never has enough simultaneous concurrency to reach
// MULTI_COLUMN, but the code path still needs to be verified correct.
export function planLayout(entries, camera) {
  const { halfW, halfH } = computeFrustumWorldExtents(camera, LAYOUT_FIXED_DEPTH);
  // LAYOUT_SAFETY_MARGIN shrinks the effective area the layout math itself
  // targets slightly below the true safe-area bounds — headroom against
  // AutoDirector momentarily using a different camera fov/aspect than the
  // one this recompute observed (a cut and a layout reflow are otherwise
  // unrelated events), not a substitute for the SAFE_AREA_* constants
  // themselves (spec 3's own "generous... adjust slightly if required").
  const safeWidthWorld = (SAFE_AREA_X[1] - SAFE_AREA_X[0]) * halfW * LAYOUT_SAFETY_MARGIN;
  const safeHeightWorld = (SAFE_AREA_Y[1] - SAFE_AREA_Y[0]) * halfH * LAYOUT_SAFETY_MARGIN;
  const gutterWorld = COLUMN_GUTTER_NDC * 2 * halfW;

  const items = entries.map(measureItem);
  const topAnchor = safeHeightWorld / 2;
  const bottomLimit = -safeHeightWorld / 2;

  // --- Attempt 1: SINGLE_COLUMN ---
  let gap = estimateGap(items);
  let stack = stackColumn(items, gap, topAnchor);
  if (stack.bottomEdge < bottomLimit && entries.length > 1) {
    const contentOnly = items.reduce((s, it) => s + it.blockHeightWorld, 0);
    const neededGap = (safeHeightWorld - contentOnly) / (entries.length - 1);
    if (neededGap >= MIN_ROW_GAP_WORLD) {
      gap = neededGap;
      stack = stackColumn(items, gap, topAnchor);
    }
  }
  if (stack.bottomEdge >= bottomLimit - 1e-6) {
    return {
      mode: 'SINGLE_COLUMN',
      assignments: entries.map((e, i) => ({ id: e.id, right: 0, up: stack.offsets[i] })),
    };
  }

  // --- Attempt 2: MULTI_COLUMN (2 columns), column-major reading order —
  // LEFT column top-to-bottom (oldest phrases), THEN right column
  // top-to-bottom (newer phrases): spec 4's explicit example. ---
  const leftCount = Math.ceil(entries.length / 2);
  const leftEntries = entries.slice(0, leftCount);
  const rightEntries = entries.slice(leftCount);
  const leftItems = items.slice(0, leftCount);
  const rightItems = items.slice(leftCount);

  let colGap = estimateGap(items);
  let leftStack = stackColumn(leftItems, colGap, topAnchor);
  let rightStack = stackColumn(rightItems, colGap, topAnchor);
  const worstBottom = Math.min(leftStack.bottomEdge, rightStack.bottomEdge);
  if (worstBottom < bottomLimit) {
    const tall = leftStack.bottomEdge <= rightStack.bottomEdge ? leftItems : rightItems;
    if (tall.length > 1) {
      const contentOnly = tall.reduce((s, it) => s + it.blockHeightWorld, 0);
      const neededGap = (safeHeightWorld - contentOnly) / (tall.length - 1);
      colGap = Math.max(MIN_ROW_GAP_WORLD * 0.4, Math.min(colGap, neededGap));
    }
    leftStack = stackColumn(leftItems, colGap, topAnchor);
    rightStack = stackColumn(rightItems, colGap, topAnchor);
  }

  const colWidth = (safeWidthWorld - gutterWorld) / 2;
  const leftX = -(gutterWorld / 2 + colWidth / 2);
  const rightX = gutterWorld / 2 + colWidth / 2;
  const assignments = [];
  leftEntries.forEach((e, i) => assignments.push({ id: e.id, right: leftX, up: leftStack.offsets[i] }));
  rightEntries.forEach((e, i) => assignments.push({ id: e.id, right: rightX, up: rightStack.offsets[i] }));

  // Last-resort hard clamp (spec 9: "if rounding/projection causes
  // boundary overflow, clamp layout positions inward") — only reachable
  // with unrealistically high concurrency that even a compressed 2-column
  // grid can't fit; a bounded, explicitly-allowed compromise rather than
  // letting anything render outside the safe area.
  const halfSafeHeight = safeHeightWorld / 2;
  for (const a of assignments) a.up = THREE.MathUtils.clamp(a.up, -halfSafeHeight, halfSafeHeight);

  return { mode: 'MULTI_COLUMN', assignments };
}

// Small stable string hash -> uint32 seed (same family as the project's
// existing mulberry32 PRNGs elsewhere) so a phrase id like "cue-18-19"
// always gets the same particle-scatter seed, independent of spawn order.
function hashSeed(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
