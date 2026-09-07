// ForeverMore Lyrics — data layer, Real Timing JSON Integration V1.
//
// Deliberately just DATA (which measured vocal cue each event uses, its
// display text, type, camera hint, and choreography knobs) — no scheduling
// logic, no timing math, no TrailLyrics/AutoDirector API calls live here.
// LyricTimeline.js is the controller: it resolves each event's
// `sourceCueIndex` against the real timing JSON (see
// saikai-2026-02-22EngLast-lyrics-timing.json, `lyrics[].index`) to get an
// already-absolute-WAV-time `audioVocalTime` — no offset, no transform, see
// LyricTimeline.setTimingData(). TrailLyrics.js itself has no idea this
// file, or a "song timeline" concept, exists. This keeps TrailLyrics a
// reusable renderer/animation system rather than something hardcoded to one
// song.
//
// V1 scope: only the first four events of the first ~40 seconds, hand-mapped
// against the real timing JSON's 44 measured cues (see the FOREVERMORE REAL
// TIMING JSON INTEGRATION V1 report for the full mapping rationale — each
// mapping below is unambiguous text-verified, not fuzzy-matched). Two lyric
// types are supported (see TYPE_DEFAULTS below) — FIELD/FINALE are
// intentionally not implemented yet.

// ---------------------------------------------------------------------------
//  Per-type visual defaults (spec 5). TRAIL is the existing accepted V1.2
//  look, completely unchanged. HERO is "the same core system" — same
//  renderer, same tail-emergence mechanism — just modestly larger/brighter
//  and held a touch longer, per event data below. Deliberately NOT pushed
//  so far that it reads as a HUD title card: no scale/glow multiplier here
//  exceeds ~1.3x, and HERO still goes through the exact same wake-emergence
//  and world-space freeze as every other event.
// ---------------------------------------------------------------------------
const TYPE_DEFAULTS = {
  hero: {
    textScale: 1.3,
    textGlow: 1.35,
    particleContribution: 1.15,
  },
  trail: {
    textScale: 1.0,
    textGlow: 1.0,
    particleContribution: 1.0,
  },
};

// Raw authored data — exactly the four events from the spec. `preRoll`/
// `hold` are seconds; `camera` is a soft hint consumed by main.js's
// Auto-Director wiring (LyricTimeline itself never touches AutoDirector
// directly — see its class comment). `sourceCueIndex` matches the real
// timing JSON's `lyrics[].index` field exactly — LyricTimeline looks up
// that cue's `time` (already absolute WAV-clock seconds) as this event's
// vocal time. The comment on each entry documents the exact JSON cue text
// it was matched against, verified by hand against
// saikai-2026-02-22EngLast-lyrics-timing.json (never assumed/fuzzy-matched).
const RAW_EVENTS = [
  {
    id: 'fm-001',
    sourceCueIndex: 4, // JSON line-004 (14.8497s): "Through the nights and skies of blue,"
    preRoll: 1.8,
    text: 'Through the nights and skies of blue',
    type: 'hero',
    camera: 'directRear',
    hold: 3.0,
    leaveBehind: true,
  },
  {
    id: 'fm-002',
    sourceCueIndex: 5, // JSON line-005 (20.333375s): "I've finally come back right here to you"
    preRoll: 1.4,
    text: "I've finally come back\nright here to you",
    type: 'trail',
    camera: 'rearThreeQuarter',
    hold: 2.0,
    leaveBehind: true,
  },
  {
    id: 'fm-003',
    // JSON line-007 (32.492482s): "through all my days with endless hope for
    // you" — spec 3: this prototype deliberately displays only the second
    // half of that source line.
    sourceCueIndex: 7,
    preRoll: 1.3,
    text: 'endless hope for you',
    type: 'trail',
    camera: 'sideFollow',
    hold: 2.0,
    leaveBehind: true,
  },
  {
    id: 'fm-004',
    sourceCueIndex: 8, // JSON line-008 (38.779451s): "Everything you've promised me"
    preRoll: 1.5,
    text: "Everything you've promised me",
    type: 'trail',
    camera: 'rearThreeQuarter',
    hold: 2.2,
    leaveBehind: true,
  },
];

// ---------------------------------------------------------------------------
//  Merge per-type visual defaults into each event's trailLyricsConfig.
//
//  Real Timing JSON Integration V1 (spec 7): this module describes ONLY
//  authored/selected data (which source cue, display text, type, and
//  choreography knobs) — it deliberately does NOT compute triggerTime or
//  assembleDuration, since both require the real timing JSON's measured
//  cue.time, which is only available once LyricTimeline.setTimingData() is
//  called (see main.js's fetch). travelDuration is always 0 here — see
//  LyricTimeline.setTimingData() for why.
// ---------------------------------------------------------------------------
function withTypeDefaults(raw) {
  const typeDefaults = TYPE_DEFAULTS[raw.type] || TYPE_DEFAULTS.trail;
  return {
    ...raw,
    // Passed straight to TrailLyrics.configure() by LyricTimeline — see
    // TrailLyrics.js's configure()/beginEvent() for the exact field list.
    // (assembleDuration is added on top of this by LyricTimeline.setTimingData().)
    //
    // Trail Lyrics Font Support V1: an event may optionally set `raw.font`
    // (any of fontFamily/fontWeight/fontSizeScale/lineHeight) to override
    // TrailLyrics' current font for just that event — merged in last so it
    // wins over typeDefaults. None of the four V1 events set this, so they
    // keep TrailLyrics' default font untouched (Georgia serif) — this is
    // purely wiring the capability, not a font choice for the real song.
    trailLyricsConfig: {
      travelDuration: 0,
      holdDuration: raw.hold,
      formationDistance: 0.65,
      ...typeDefaults,
      ...(raw.font || {}),
    },
  };
}

export const FOREVERMORE_EVENTS = RAW_EVENTS.map(withTypeDefaults);
