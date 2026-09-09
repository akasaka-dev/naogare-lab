// ForeverMore Lyrics — choreography layer, MusicLyricsTimeMark V2 Integration.
//
// ARCHITECTURAL SPLIT (this task): MusicLyricsTimeMark's exported JSON (see
// public/data/saikai-2026-02-22EngLast-lyrics-timing.json) is now the sole
// source of truth for WHAT + WHEN — source lyric text, vocal start `time`,
// authored active-display `endTime`, and adjacent-line `group`. This file
// only ever describes HOW a given source cue should be rendered once
// LyricTimeline has already decided which cue(s) form a visual phrase:
// designType (TITLE/CREDIT/TRAIL/HERO/FIELD/ECHO/FINALE), the V1-fallback
// runtimeType it maps to, preRoll, camera preference, and leaveBehind.
//
// This file therefore contains NO lyric text, NO cue grouping, and ZERO
// hardcoded time literals (grep-verifiable) — grouping now comes entirely
// from the JSON's `group` field (see LyricTimeline.setTimingData()'s
// adjacent-same-group merge), not from a hand-authored sourceCueIndices
// list like the prior "Lyric Phrase Timeline V2" task used. That prior
// task's specific pairing choices (6+7, 8+9, 21+22, the outro pairs, etc.)
// are superseded: the current MusicLyricsTimeMark export only defines ONE
// real group (cues 18-19), so every other cue is, for now, its own
// individual phrase — exactly reflecting the authored data rather than an
// invented grouping WaterThreeJS is not supposed to guess at (see the
// integration report's spec 0/7/9). Landmark designType/camera choices
// (HERO openers, the two sustained "forevermore" cues, the FINALE capstone,
// ECHO recurrences) ARE preserved per-cue, since those are HOW decisions,
// independent of grouping.

// ---------------------------------------------------------------------------
//  Per-runtime-type visual defaults (unchanged from every prior task). TRAIL
//  is the existing accepted V1.2 look; HERO the same core system, modestly
//  larger/brighter. FIELD/ECHO/FINALE render through these two presets only.
// ---------------------------------------------------------------------------
const TYPE_DEFAULTS = {
  hero: { textScale: 1.3, textGlow: 1.35, particleContribution: 1.15 },
  trail: { textScale: 1.0, textGlow: 1.0, particleContribution: 1.0 },
};

// Small, fixed preRoll bands — not hand-tuned per cue.
const PREROLL_TRAIL = 1.4;
const PREROLL_HERO = 1.7;
const PREROLL_FIELD_FALLBACK = 1.5;
const PREROLL_ECHO_FALLBACK = 1.2;
const PREROLL_FINALE_FALLBACK = 1.9;
// The two already-shipped, previously-reviewed cues keep their exact
// original preRoll.
const PREROLL_EXISTING = { 4: 1.8, 5: 1.4 };

export const HOLD_TRAIL = 2.0;
export const HOLD_HERO = 2.6;

const DEFAULT_TRAIL_CHOREO = { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: null, leaveBehind: true, section: null };

// ---------------------------------------------------------------------------
//  Per-cue choreography OVERRIDES (spec 13: "HOW", keyed by MusicLyricsTimeMark
//  source cue index). Any index 4-44 not listed here falls back to
//  DEFAULT_TRAIL_CHOREO (plain TRAIL, no camera preference — AutoDirector
//  chooses freely). Cues 1-3 are handled separately below (metadata, not
//  sung lyric). `camera` values are restricted to AutoDirector's four
//  lyric-safe presets (directRear/rearThreeQuarter/sideFollow/wideChase) —
//  see AutoDirector.js's lyricSafe flags.
// ---------------------------------------------------------------------------
const CUE_CHOREOGRAPHY = {
  4: { designType: 'HERO', runtimeType: 'hero', preRoll: PREROLL_EXISTING[4], camera: 'directRear', leaveBehind: true, section: 'VERSE_A' },
  5: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_EXISTING[5], camera: 'rearThreeQuarter', leaveBehind: true, section: 'VERSE_A' },
  7: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'sideFollow', leaveBehind: true, section: 'VERSE_A' },
  8: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'rearThreeQuarter', leaveBehind: true, section: 'VERSE_A' },
  10: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'sideFollow', leaveBehind: true, section: 'VERSE_A' },
  12: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'wideChase', leaveBehind: true, section: 'PRE_CHORUS_A' },
  15: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'directRear', leaveBehind: true, section: 'PRE_CHORUS_A' },
  16: { designType: 'HERO', runtimeType: 'hero', preRoll: PREROLL_HERO, camera: 'directRear', leaveBehind: true, section: 'CHORUS_A' },
  17: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'rearThreeQuarter', leaveBehind: true, section: 'CHORUS_A' },
  18: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'sideFollow', leaveBehind: true, section: 'CHORUS_A' },
  19: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'sideFollow', leaveBehind: true, section: 'CHORUS_A' },
  // Cue 20 — the first "forevermore": musically sustained. In this V2
  // integration the sustain comes directly from the JSON's explicit
  // endTime (spec 10/11) — no minHoldSeconds override needed anymore.
  20: { designType: 'HERO', runtimeType: 'hero', preRoll: PREROLL_HERO, camera: 'directRear', leaveBehind: true, section: 'CHORUS_A' },
  21: { designType: 'ECHO', runtimeType: 'trail', preRoll: PREROLL_ECHO_FALLBACK, camera: 'sideFollow', leaveBehind: true, section: 'VERSE_B' },
  22: { designType: 'ECHO', runtimeType: 'trail', preRoll: PREROLL_ECHO_FALLBACK, camera: 'sideFollow', leaveBehind: true, section: 'VERSE_B' },
  23: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'sideFollow', leaveBehind: true, section: 'VERSE_B' },
  25: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'wideChase', leaveBehind: true, section: 'VERSE_B' },
  27: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'directRear', leaveBehind: true, section: 'VERSE_B' },
  29: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'wideChase', leaveBehind: true, section: 'PRE_CHORUS_B' },
  32: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'directRear', leaveBehind: true, section: 'PRE_CHORUS_B' },
  33: { designType: 'HERO', runtimeType: 'hero', preRoll: PREROLL_HERO, camera: 'directRear', leaveBehind: true, section: 'CHORUS_B' },
  34: { designType: 'TRAIL', runtimeType: 'trail', preRoll: PREROLL_TRAIL, camera: 'rearThreeQuarter', leaveBehind: true, section: 'CHORUS_B' },
  // Cue 36 — the second "forevermore", same sustained-via-endTime treatment.
  36: { designType: 'FIELD', runtimeType: 'trail', preRoll: PREROLL_FIELD_FALLBACK, camera: 'directRear', leaveBehind: true, section: 'CHORUS_B' },
  37: { designType: 'FIELD', runtimeType: 'trail', preRoll: PREROLL_FIELD_FALLBACK, camera: 'sideFollow', leaveBehind: true, section: 'OUTRO_TAG' },
  38: { designType: 'FIELD', runtimeType: 'trail', preRoll: PREROLL_FIELD_FALLBACK, camera: 'sideFollow', leaveBehind: true, section: 'OUTRO_TAG' },
  39: { designType: 'FIELD', runtimeType: 'trail', preRoll: PREROLL_FIELD_FALLBACK, camera: 'wideChase', leaveBehind: true, section: 'OUTRO_TAG' },
  40: { designType: 'FIELD', runtimeType: 'trail', preRoll: PREROLL_FIELD_FALLBACK, camera: 'wideChase', leaveBehind: true, section: 'OUTRO_TAG' },
  41: { designType: 'ECHO', runtimeType: 'trail', preRoll: PREROLL_ECHO_FALLBACK, camera: 'sideFollow', leaveBehind: true, section: 'OUTRO_TAG' },
  42: { designType: 'ECHO', runtimeType: 'trail', preRoll: PREROLL_ECHO_FALLBACK, camera: 'sideFollow', leaveBehind: true, section: 'OUTRO_TAG' },
  43: { designType: 'ECHO', runtimeType: 'trail', preRoll: PREROLL_ECHO_FALLBACK, camera: 'wideChase', leaveBehind: true, section: 'OUTRO_TAG' },
  44: { designType: 'FINALE', runtimeType: 'hero', preRoll: PREROLL_FINALE_FALLBACK, camera: 'directRear', leaveBehind: true, section: 'OUTRO_TAG' },
};

// Metadata cues (1-3): TITLE/CREDIT film text, not sung lyric — same
// decision as every prior task (the wake-emergence renderer doesn't suit
// extradiegetic text; new title/credit rendering stays out of scope here).
const METADATA_CHOREOGRAPHY = {
  1: { designType: 'TITLE', runtimeType: null, preRoll: null, camera: null, leaveBehind: null, section: 'INTRO_CREDITS' },
  2: { designType: 'CREDIT', runtimeType: null, preRoll: null, camera: null, leaveBehind: null, section: 'INTRO_CREDITS' },
  3: { designType: 'CREDIT', runtimeType: null, preRoll: null, camera: null, leaveBehind: null, section: 'INTRO_CREDITS' },
};

export const SUNG_CUE_RANGE = { min: 4, max: 44 };
export const METADATA_CUE_INDICES = new Set([1, 2, 3]);

// ---------------------------------------------------------------------------
//  getChoreography(cueIndex) — the one function LyricTimeline calls (spec
//  15) to find out how a source cue should render. Returns null only for an
//  index this song's data has nothing to say about (outside 1-44) — a
//  finite JSON should never actually produce that; LyricTimeline logs it as
//  an error if it does.
// ---------------------------------------------------------------------------
export function getChoreography(cueIndex) {
  if (METADATA_CUE_INDICES.has(cueIndex)) {
    return { ...METADATA_CHOREOGRAPHY[cueIndex], runtimeEnabled: false };
  }
  if (cueIndex >= SUNG_CUE_RANGE.min && cueIndex <= SUNG_CUE_RANGE.max) {
    const override = CUE_CHOREOGRAPHY[cueIndex];
    return { ...DEFAULT_TRAIL_CHOREO, ...(override || {}), runtimeEnabled: true };
  }
  return null;
}

function typeDefaultsFor(runtimeType) {
  return TYPE_DEFAULTS[runtimeType] || TYPE_DEFAULTS.trail;
}

// Base trailLyricsConfig (travelDuration/formationDistance/type visual
// defaults) for a given choreography — LyricTimeline overlays the timing
// fields (assembleDuration/holdDuration/leaveDuration/dissolveDuration) it
// resolves from the JSON on top of this.
export function baseTrailLyricsConfig(choreo) {
  return {
    travelDuration: 0,
    formationDistance: 0.65,
    ...typeDefaultsFor(choreo.runtimeType),
  };
}

// ---------------------------------------------------------------------------
//  Programmatic validation (spec 17 of this task / spec 19 of the prior
//  one) — pure data-shape checks on THIS file's own choreography table,
//  independent of the real timing JSON. LyricTimeline.setTimingData() covers
//  the JSON-dependent invariants (44 cues, unique indices, group
//  contiguity, endTime > time, etc — see its own validation).
// ---------------------------------------------------------------------------
const VALID_DESIGN_TYPES = new Set(['TITLE', 'CREDIT', 'TRAIL', 'HERO', 'FIELD', 'ECHO', 'FINALE']);
const VALID_RUNTIME_TYPES = new Set(['trail', 'hero']);
const ALLOWED_RUNTIME_FOR_DESIGN = {
  TITLE: [null], CREDIT: [null], TRAIL: ['trail'], HERO: ['hero'], FIELD: ['trail'], ECHO: ['trail'], FINALE: ['hero'],
};
const LYRIC_SAFE_CAMERAS = new Set(['directRear', 'rearThreeQuarter', 'sideFollow', 'wideChase']);

export function validateForeverMoreChoreography() {
  const errors = [];
  for (let i = 1; i <= 44; i++) {
    const c = getChoreography(i);
    if (!c) { errors.push(`cue ${i}: getChoreography() returned null`); continue; }
    if (!VALID_DESIGN_TYPES.has(c.designType)) errors.push(`cue ${i}: invalid designType "${c.designType}"`);
    if (c.runtimeType !== null && !VALID_RUNTIME_TYPES.has(c.runtimeType)) errors.push(`cue ${i}: invalid runtimeType "${c.runtimeType}"`);
    const allowed = ALLOWED_RUNTIME_FOR_DESIGN[c.designType] || [];
    if (!allowed.includes(c.runtimeType)) errors.push(`cue ${i}: designType "${c.designType}" may not map to runtimeType "${c.runtimeType}"`);
    if (c.runtimeEnabled && c.runtimeType === null) errors.push(`cue ${i}: runtimeEnabled but runtimeType is null`);
    if (c.camera !== null && !LYRIC_SAFE_CAMERAS.has(c.camera)) errors.push(`cue ${i}: camera "${c.camera}" is not one of AutoDirector's lyric-safe presets`);
  }
  if (getChoreography(0) !== null) errors.push('getChoreography(0) should return null (out of range)');
  if (getChoreography(45) !== null) errors.push('getChoreography(45) should return null (out of range)');
  if (errors.length > 0) {
    console.error('[ForeverMoreLyrics] choreography validation FAILED:\n' + errors.map((e) => ' - ' + e).join('\n'));
  }
  return errors;
}

validateForeverMoreChoreography();
