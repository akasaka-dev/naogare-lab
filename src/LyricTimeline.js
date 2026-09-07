// Lyric Timeline V1 — a small, deterministic scheduler that walks a list of
// lyric events (see ForeverMoreLyrics.js for the data) and drives an
// existing TrailLyrics instance. Owns ONLY scheduling/song-clock state;
// all lyric content/timing/visual-parameter data lives in the data module,
// and all rendering/animation lives in TrailLyrics — this class just
// connects "what time is it" to "which event, if any, should be playing".
//
// Determinism / seeking (spec 12): current state is always re-derived from
// `time` by scanning the (small, sorted-by-triggerTime) event list — there
// is no incremental/hidden replay state that could get out of sync. Seeking
// forward or backward always recomputes the same (nextIndex, activeIndex)
// pair for the same `time`, and only actually touches TrailLyrics when the
// ACTIVE event changes.
//
// V1 limitation (documented per spec 12, not solved here): re-triggering an
// event via a backward seek restarts that event's OWN animation from its
// own t=0 (a fresh beginEvent() call) — it does not reconstruct "how far
// into HOLD would we be at this exact seek time". Scrubbing to the middle
// of an event's hold window shows that event beginning its formation, not
// resuming mid-cycle. A full sub-event replay engine is out of scope for
// V1 (explicitly deferred by the spec).
export class LyricTimeline {
  constructor(trailLyrics, events, opts = {}) {
    this.trailLyrics = trailLyrics;
    // Authored cinematic events (id, sourceCueIndex, text, type, preRoll,
    // camera, hold, leaveBehind, trailLyricsConfig) — see ForeverMoreLyrics.js.
    // Never mutated. `this.events` (the compiled, timing-resolved list
    // setTime()/update() actually walk) is built from this once real timing
    // data arrives, in setTimingData() — until then it stays empty, so
    // nothing is schedulable (see getActiveEvent()/_resolveActiveIndex()).
    this.rawEvents = events;
    this.enabled = true;
    this.paused = false;
    this.speed = 1.0;
    this.time = 0;

    // onEventStart(event): optional hook for cross-module glue (e.g. main.js
    // nudging Auto Director toward a HERO event's preferred camera) — kept
    // out of this class so LyricTimeline itself never imports/knows about
    // AutoDirector, matching TrailLyrics' own "zero shared runtime state
    // between cinematic modules" convention.
    this.onEventStart = opts.onEventStart || null;

    // Real Timing JSON Integration V1: `this.time` (and every triggerTime
    // events are compared against) is in absolute WAV-clock seconds,
    // matching audio.currentTime directly — see setTimingData().
    this.timingLoaded = false;
    this.timingErrors = []; // ids of events whose sourceCueIndex failed to resolve
    this.events = [];

    this._nextIndex = 0; // first event NOT yet triggered
    this._activeIndex = -1; // index of the most recently triggered event, or -1 if none yet

    this.trailLyrics.loop = false; // event-driven, not the standalone auto-loop
    this.trailLyrics.enabled = false; // dormant until the first event fires
  }

  // Real Timing JSON Integration V1 (spec 4/8): `cues` is the parsed timing
  // JSON's `lyrics` array (each `{ index, id, time, text }`, manually
  // measured against the real WAV — see
  // saikai-2026-02-22EngLast-lyrics-timing.json). Resolves each rawEvent's
  // `sourceCueIndex` against it and uses `cue.time` AS-IS as audioVocalTime:
  // no offset, no transform — the cue time is already absolute WAV-clock
  // time. An event whose cue is missing or has a non-finite/negative time is
  // logged as an error and excluded from scheduling entirely (spec 8: fail
  // visibly, never silently substitute a stale/offset time).
  setTimingData(cues) {
    const cueByIndex = new Map(cues.map((c) => [c.index, c]));
    this.timingErrors = [];
    const compiled = [];
    for (const raw of this.rawEvents) {
      const cue = cueByIndex.get(raw.sourceCueIndex);
      if (!cue || typeof cue.time !== 'number' || !Number.isFinite(cue.time) || cue.time < 0) {
        console.error(`[LyricTimeline] event "${raw.id}": no valid timing cue at sourceCueIndex ${raw.sourceCueIndex} — excluded from schedule.`);
        this.timingErrors.push(raw.id);
        continue;
      }
      const audioVocalTime = cue.time;
      const triggerTime = Math.max(0, audioVocalTime - raw.preRoll);

      // TrailLyrics' own TRAVEL phase represents "invisible time before this
      // cycle's phrase starts forming" — that concept doesn't fit a
      // scheduled timeline at all: once the controller has decided an event
      // triggers NOW, formation should start immediately. So every timeline
      // event runs TrailLyrics with travelDuration = 0 (set in
      // ForeverMoreLyrics.js), and lets ASSEMBLE itself span the available
      // pre-roll window instead. Nominally that window is just `preRoll`
      // (assembling for exactly `preRoll` seconds lands HOLD's start exactly
      // at audioVocalTime); the min() below only ever compresses anything if
      // triggerTime gets clamped to 0 (i.e. audioVocalTime < preRoll) —
      // general safety net, not a per-event special case.
      const availableWindow = Math.max(0.3, audioVocalTime - triggerTime);
      const assembleDuration = Math.min(raw.preRoll, availableWindow);

      compiled.push({
        ...raw,
        sourceCueText: cue.text,
        audioVocalTime,
        triggerTime,
        trailLyricsConfig: {
          ...raw.trailLyricsConfig,
          assembleDuration,
        },
      });
    }
    compiled.sort((a, b) => a.triggerTime - b.triggerTime);
    this.events = compiled;
    this.timingLoaded = true;
    // Re-resolve at the current clock position so timing data arriving
    // asynchronously (fetch, in main.js) after the animate loop has already
    // started takes effect immediately, rather than waiting for a seek.
    this.setTime(this.time);
  }

  // Debug/inspection snapshot (spec 11) — id, source cue index/text, display
  // text, and resolved timing for every successfully-compiled event.
  getDebugEvents() {
    return this.events.map((e) => ({
      id: e.id,
      sourceCueIndex: e.sourceCueIndex,
      sourceText: e.sourceCueText,
      text: e.text,
      audioVocalTime: e.audioVocalTime,
      preRoll: e.preRoll,
      triggerTime: e.triggerTime,
    }));
  }

  restart() {
    this.time = 0;
    this._nextIndex = 0;
    this._activeIndex = -1;
    this.trailLyrics.enabled = false;
  }

  setPaused(p) { this.paused = !!p; }

  getActiveEvent() { return this._activeIndex >= 0 ? this.events[this._activeIndex] : null; }
  getNextEvent() { return this._nextIndex < this.events.length ? this.events[this._nextIndex] : null; }

  // Which event (if any) SHOULD be active at time `t` — the most recently
  // triggered one, i.e. the last event whose triggerTime <= t.
  _resolveActiveIndex(t) {
    let idx = 0;
    while (idx < this.events.length && this.events[idx].triggerTime <= t) idx++;
    return { nextIndex: idx, activeIndex: idx - 1 };
  }

  _fire(event) {
    this.trailLyrics.enabled = true;
    this.trailLyrics.configure(event.trailLyricsConfig);
    this.trailLyrics.beginEvent(event.text);
    if (this.onEventStart) this.onEventStart(event);
  }

  // Manual seek (spec 12/6) — jumps straight to `t` and reconciles state in
  // one step, deterministically, regardless of direction:
  //  - forward past skipped events: fires only the one that should be
  //    active now, never replays the ones jumped over (no double-trigger).
  //  - backward into a gap before any event: silences TrailLyrics rather
  //    than leaving a later event's leftover visual state on screen.
  //  - backward onto an earlier event: replays it fresh (see class doc
  //    comment for the "fresh, not resumed mid-cycle" limitation).
  setTime(t) {
    this.time = Math.max(0, t);
    const { nextIndex, activeIndex } = this._resolveActiveIndex(this.time);
    this._nextIndex = nextIndex;
    if (activeIndex !== this._activeIndex) {
      this._activeIndex = activeIndex;
      if (activeIndex >= 0) this._fire(this.events[activeIndex]);
      else this.trailLyrics.enabled = false;
    }
  }

  update(dt) {
    if (!this.enabled || this.paused) return;
    this.time += dt * this.speed;
    // Forward playback only ever advances _nextIndex, firing each event
    // exactly once as its triggerTime is crossed.
    while (this._nextIndex < this.events.length && this.events[this._nextIndex].triggerTime <= this.time) {
      const event = this.events[this._nextIndex];
      this._activeIndex = this._nextIndex;
      this._fire(event);
      this._nextIndex++;
    }
  }
}
