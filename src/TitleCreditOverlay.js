// Title / Credit Overlay V1 — a lightweight DOM overlay for the three
// metadata cues (TITLE/CREDIT) that are deliberately excluded from the
// TrailLyrics wake-emergence renderer (see ForeverMoreLyrics.js's
// METADATA_CHOREOGRAPHY / getChoreography()'s runtimeEnabled: false for
// cue indices 1-3). Entirely separate from TrailLyrics/TrailLyricsManager —
// no WebGL geometry, no shared state, just two plain DOM elements whose
// opacity is a pure function of the current playback time.
//
// Text/time/endTime are NOT duplicated here — the caller (main.js) passes
// in the SAME raw source-cue array it already fetched once for
// LyricTimeline (foreverMoreTimingData.lyrics), so editing the timing JSON
// changes title/credit timing/text for free, with no second fetch.
const FADE_SECONDS = 0.6;
const TITLE_INDEX = 1;
const CREDIT_INDICES = new Set([2, 3]);

function smoothstep(e0, e1, x) {
  const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
  return t * t * (3 - 2 * t);
}

// Pure function of (cue, time) — 0 outside [time, endTime], smoothstep
// fade in/out over FADE_SECONDS at each edge, 1 in the steady middle. Being
// stateless (no accumulator, no "was visible last frame" flag) is what
// makes an arbitrary seek — forward, backward, into or out of a window —
// produce the exactly correct opacity the instant update() is next called,
// with no special-cased seek handling required.
function opacityAt(cue, t) {
  if (t <= cue.time || t >= cue.endTime) return 0;
  const fadeIn = smoothstep(cue.time, cue.time + FADE_SECONDS, t);
  const fadeOut = 1 - smoothstep(cue.endTime - FADE_SECONDS, cue.endTime, t);
  return Math.min(fadeIn, fadeOut);
}

export class TitleCreditOverlay {
  constructor(titleEl, creditEl) {
    this.titleEl = titleEl;
    this.creditEl = creditEl;
    this.titleCue = null; // resolved from sourceCues once loaded — see _syncCues()
    this.creditCues = [];
    this._lastSource = null;
  }

  // Re-extracts cues 1-3 from `sourceCues` only when the array reference
  // changes (i.e. once, the frame right after main.js's timing-JSON fetch
  // resolves and assigns foreverMoreTimingData) — not every frame.
  _syncCues(sourceCues) {
    if (!sourceCues || sourceCues === this._lastSource) return;
    this._lastSource = sourceCues;
    this.titleCue = null;
    this.creditCues = [];
    for (const cue of sourceCues) {
      if (cue.index === TITLE_INDEX) this.titleCue = cue;
      else if (CREDIT_INDICES.has(cue.index)) this.creditCues.push(cue);
    }
    this.titleEl.textContent = this.titleCue ? this.titleCue.text : '';
  }

  // `time` — the SAME clock the caller already reads off LyricTimeline
  // (lyricTimeline.time); never accumulated locally, so there is no second
  // timer to drift out of sync with the real lyric/audio clock.
  // `sourceCues` — the raw MusicLyricsTimeMark cues (main.js's
  // foreverMoreTimingData.lyrics), or null/undefined before that fetch has
  // resolved — in which case both elements simply stay at 0 opacity.
  update(time, sourceCues) {
    this._syncCues(sourceCues);

    const titleOp = this.titleCue ? opacityAt(this.titleCue, time) : 0;
    this.titleEl.style.opacity = titleOp.toFixed(3);

    // Cues 2 and 3 never overlap each other, so one credit slot is enough;
    // whichever (if either) is currently active wins.
    let creditOp = 0;
    let creditText = '';
    for (const cue of this.creditCues) {
      const op = opacityAt(cue, time);
      if (op > creditOp) { creditOp = op; creditText = cue.text; }
    }
    if (creditOp > 0) this.creditEl.textContent = creditText;
    this.creditEl.style.opacity = creditOp.toFixed(3);
  }
}
