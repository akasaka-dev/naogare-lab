import { LAYOUT_FIXED_TEXT_SCALE } from './TrailLyrics.js';

// Lyric Timeline — a small, deterministic scheduler that walks a list of
// lyric PHRASE events and drives an existing TrailLyrics instance. Owns
// ONLY scheduling/song-clock state; all lyric content/timing comes from the
// MusicLyricsTimeMark-exported JSON (see setTimingData()), all choreography
// (designType/preRoll/camera/leaveBehind) comes from a caller-supplied
// `getChoreography(cueIndex)` lookup (see ForeverMoreLyrics.js), and all
// rendering/animation lives in TrailLyrics — this class just connects "what
// time is it" to "which phrase, if any, should be playing".
//
// MusicLyricsTimeMark V2 Integration — architectural split (this task):
// MusicLyricsTimeMark's export is now the sole source of truth for WHAT +
// WHEN (source text, `time`, `endTime`, adjacent-line `group`). This class
// no longer takes a hand-authored phrase list — it builds phrases itself,
// at setTimingData() time, by walking the raw cues in index order and
// merging any run of ADJACENT cues that share the same non-null `group`
// value (spec 7/8/14) into one phrase. An ungrouped cue is a phrase of one.
// Per-phrase choreography (designType/runtimeType/preRoll/camera/
// leaveBehind) comes from the first member cue's `getChoreography()` result
// — grouping is data-driven, choreography stays hand-authored, and neither
// duplicates the other's concern (spec 13).
//
// Explicit endTime semantics (spec 10): when every member of a phrase has a
// finite `endTime`, that phrase's HOLD spans exactly `time -> endTime` (via
// `holdDuration`) and LEAVE/DISSOLVE begin AT `endTime`, using TrailLyrics'
// ordinary default durations — never shrunk to make room for whatever
// phrase fires next. If firing the next phrase actually cuts this one off
// early, that is a real, reportable consequence of the single shared
// TrailLyrics instance (spec 12/16) — logged, never silently hidden, and
// never "fixed" by altering the authored endTime.
//
// Legacy fallback (spec 5): a phrase whose members lack a usable `endTime`
// falls back to the exact algorithm the prior "Lyric Phrase Timeline V2"
// task used — hold long enough to cover its own last vocal line (or a
// type-based minimum), then leave/dissolve shrunk to fit whatever room
// remains before the next phrase's trigger. This keeps old (V1-only, no
// endTime) MusicLyricsTimeMark exports working exactly as before.
//
// Determinism / seeking: current state is always re-derived from `time` by
// scanning the (small, sorted-by-triggerTime) phrase list — there is no
// incremental/hidden replay state that could get out of sync.
//
// TrailLyrics Multi-Instance V1 — set-valued scheduling: this class no
// longer tracks a single "active index". Instead, `_phrasesActiveAt(t)`
// derives the COMPLETE set of phrases whose full visual lifecycle
// (`triggerTime -> fullLifecycleEnd`, i.e. through LEAVE/DISSOLVE) contains
// `t`, fresh from `this.events` every call — exactly the same
// re-derive-from-time philosophy the class already used, generalized from
// scalar to set-valued. `setTime(t)` reconciles a TrailLyricsManager's
// actually-spawned instances against that target set (spawning anything
// newly in range, despawning anything newly out of range), so an arbitrary
// backward or forward seek always reconstructs the exact right set with no
// duplicates and no stale leftovers — the manager is never told "advance
// from where you were", only "this is what should exist right now".
// `update(dt)` is just `setTime(this.time + dt*speed)` — ordinary forward
// playback is nothing more than seeking every frame.
//
// A new phrase spawning no longer destroys an older one whose authored
// lifetime hasn't ended (the prior single-instance limitation) — multiple
// TrailLyricsManager-owned instances now coexist for exactly as long as
// their own authored/legacy timing says they should, independent of
// whatever else triggers meanwhile.
export class LyricTimeline {
  // Default leave/dissolve seconds (matches TrailLyrics' own class default
  // exactly — see its DEFAULT_TIMING) used for every V2 (explicit-endTime)
  // phrase, and for a legacy phrase whose gap to the next trigger is ample.
  static DEFAULT_LEAVE = 2.5;
  static DEFAULT_DISSOLVE = 2.5;
  // Legacy-only: how long past a phrase's own last source cue it should
  // stay in HOLD at minimum, so the final sung line of a multi-line phrase
  // isn't cut off the instant it's sung.
  static LAST_CUE_READ_BUFFER = 0.5;
  // Legacy-only: absolute floor for leave+dissolve combined, even when the
  // gap to the next phrase is extremely tight.
  static MIN_LEAVE_DISSOLVE_TOTAL = 0.6;

  constructor(manager, opts = {}) {
    // TrailLyrics Multi-Instance V1: a TrailLyricsManager (spawn/despawn/
    // update a SET of independent TrailLyrics instances), not a single
    // shared TrailLyrics instance. See TrailLyricsManager.js.
    this.manager = manager;
    // getChoreography(cueIndex) -> { runtimeEnabled, designType, runtimeType,
    // preRoll, camera, leaveBehind, section } | null — see
    // ForeverMoreLyrics.js. LyricTimeline has no built-in notion of which
    // cue indices are "metadata" vs "sung"; that's entirely encoded in
    // whatever this function returns.
    this.getChoreography = opts.getChoreography || (() => null);
    // baseTrailLyricsConfig(choreo) -> the travelDuration/formationDistance/
    // visual-preset part of trailLyricsConfig — see ForeverMoreLyrics.js.
    this.baseTrailLyricsConfig = opts.baseTrailLyricsConfig || (() => ({}));
    // Legacy-fallback hold-duration defaults by runtimeType (spec 5) — only
    // used for a phrase with no usable endTime.
    this.legacyHoldDefaults = opts.legacyHoldDefaults || { trail: 2.0, hero: 2.6 };

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

    this.rawCues = []; // the exact MusicLyricsTimeMark cues last passed to setTimingData(), untouched — see resolveDesignScore()/validate()
    this.timingLoaded = false;
    this.timingErrors = [];
    this.events = []; // compiled, schedulable phrases (runtime-enabled only), sorted by triggerTime
    // No scalar "active index" bookkeeping anymore (see class comment) —
    // which phrases exist is derived fresh from `this.time` on every
    // setTime()/update() call, and the manager (not this class) owns the
    // actual TrailLyrics instances.
  }

  // Groups adjacent cues sharing the same non-null `group` id into runs.
  // Runtime-disabled cues (per getChoreography — e.g. TITLE/CREDIT
  // metadata, or an out-of-range index) are ALWAYS singleton and never
  // merge with a neighbor, regardless of any group value present on them —
  // spec: "metadata cues must stay separate from sung coverage" generalized
  // to "a group can only ever contain cues the choreography table actually
  // enables". A group value reused non-adjacently (not a single contiguous
  // run) is a data error: reported, and the later, non-adjacent occurrence
  // is treated as its own ungrouped phrase rather than silently merged.
  _groupCues(sortedCues) {
    const decorated = sortedCues.map((cue) => ({ cue, choreo: this.getChoreography(cue.index) }));
    const seenGroupEndPos = new Map(); // group value -> last array position it appeared at (contiguous check)
    const groups = [];
    let current = null;
    for (let i = 0; i < decorated.length; i++) {
      const d = decorated[i];
      const enabled = !!(d.choreo && d.choreo.runtimeEnabled);
      const g = d.cue.group;
      let effectiveGroup = g;
      if (enabled && g != null) {
        const lastPos = seenGroupEndPos.get(g);
        if (lastPos !== undefined && lastPos !== i - 1) {
          console.error(`[LyricTimeline] group "${g}" is not contiguous — cue ${d.cue.index} reuses it non-adjacently; treating this occurrence as ungrouped.`);
          effectiveGroup = null;
        }
        seenGroupEndPos.set(g, i);
      }
      if (current && current.enabled === enabled && enabled && effectiveGroup != null && current.group === effectiveGroup) {
        current.members.push(d);
      } else {
        current = { members: [d], enabled, group: enabled ? effectiveGroup : null };
        groups.push(current);
      }
    }
    return groups;
  }

  // Turns one enabled group (1+ adjacent cues + their shared choreography)
  // into a resolved phrase, or null if its timing is unusable (logged via
  // this.timingErrors). Pure — does not touch `this.events`/scheduling
  // state, so resolveDesignScore() can reuse it for phrases this instance
  // may not currently have scheduled.
  _resolvePhraseGroup(group) {
    const cuesInGroup = group.members.map((m) => m.cue);
    const choreo = group.members[0].choreo;
    const first = cuesInGroup[0];
    const last = cuesInGroup[cuesInGroup.length - 1];
    const idLabel = cuesInGroup.length > 1 ? `cue-${first.index}-${last.index}` : `cue-${first.index}`;

    const badTime = cuesInGroup.some((c) => typeof c.time !== 'number' || !Number.isFinite(c.time) || c.time < 0);
    if (badTime) {
      console.error(`[LyricTimeline] ${idLabel}: one or more member cues have an invalid time — excluded from schedule.`);
      this.timingErrors.push(idLabel);
      return null;
    }

    const firstVocalTime = first.time;
    const lastVocalTime = last.time;
    const preRoll = choreo.preRoll;
    const triggerTime = Math.max(0, firstVocalTime - preRoll);
    // See the prior task's identical comment: ASSEMBLE spans the available
    // pre-roll window; the min() only compresses anything if triggerTime
    // got clamped to 0.
    const availableWindow = Math.max(0.3, firstVocalTime - triggerTime);
    const assembleDuration = Math.min(preRoll, availableWindow);

    // MusicLyricsTimeMark V2 (spec 2/10): endTime is authoritative WHEN
    // every member has a valid one (finite, and strictly greater than that
    // same cue's own `time`) — otherwise this phrase falls back to legacy
    // hold behavior entirely (spec 5: "do not require endTime... preserve
    // the current V1 fallback behavior").
    let authoredEndTime = null;
    const allHaveEndTime = cuesInGroup.every((c) => typeof c.endTime === 'number' && Number.isFinite(c.endTime));
    if (allHaveEndTime) {
      const invalidMember = cuesInGroup.find((c) => c.endTime <= c.time);
      if (invalidMember) {
        console.error(`[LyricTimeline] ${idLabel}: cue ${invalidMember.index} has endTime (${invalidMember.endTime}) <= its own time (${invalidMember.time}) — ignoring endTime for this phrase, using legacy fallback instead.`);
      } else {
        authoredEndTime = Math.max(...cuesInGroup.map((c) => c.endTime));
      }
    }

    return {
      id: idLabel,
      sourceCueIndices: cuesInGroup.map((c) => c.index),
      sourceTexts: cuesInGroup.map((c) => c.text),
      sourceTimes: cuesInGroup.map((c) => c.time),
      sourceEndTimes: cuesInGroup.map((c) => (typeof c.endTime === 'number' && Number.isFinite(c.endTime) ? c.endTime : null)),
      displayLines: cuesInGroup.map((c) => c.text),
      group: group.group,
      designType: choreo.designType,
      runtimeType: choreo.runtimeType,
      camera: choreo.camera,
      leaveBehind: choreo.leaveBehind,
      section: choreo.section,
      firstVocalTime,
      lastVocalTime,
      authoredEndTime,
      preRoll,
      triggerTime,
      assembleDuration,
      trailLyricsConfig: this.baseTrailLyricsConfig(choreo),
    };
  }

  // MusicLyricsTimeMark V2 Integration (spec 2): `cues` is the parsed
  // timing JSON's `lyrics` array — each `{ index, id, time, text }` (V1) or
  // `{ index, id, time, endTime, text, group }` (V2). Builds phrases (see
  // _groupCues()/_resolvePhraseGroup()), resolves their timing, and stores
  // the schedulable (runtime-enabled) subset in `this.events`. `cues`
  // itself is never mutated (kept verbatim in `this.rawCues` for debug/
  // validation — spec: "grouping does not mutate the source timing data").
  setTimingData(cues) {
    this.rawCues = cues;
    this.timingErrors = [];
    const sorted = [...cues].sort((a, b) => a.index - b.index);
    const groups = this._groupCues(sorted);
    const resolved = [];
    for (const g of groups) {
      if (!g.enabled) continue;
      const phrase = this._resolvePhraseGroup(g);
      if (phrase) resolved.push(phrase);
    }
    resolved.sort((a, b) => a.triggerTime - b.triggerTime);
    this.events = this._resolveEndTimes(resolved);
    this.timingLoaded = true;
    // Re-resolve at the current clock position so timing data arriving
    // asynchronously (fetch, in main.js) after the animate loop has already
    // started takes effect immediately, rather than waiting for a seek.
    this.setTime(this.time);
  }

  // Second pass: derives holdDuration/leaveDuration/dissolveDuration (and
  // the debug-facing `endTime`) for every phrase in the sorted list. Pure
  // function — does not mutate `this` state beyond the objects passed in,
  // so resolveDesignScore() can reuse it safely.
  _resolveEndTimes(resolved) {
    const { DEFAULT_LEAVE, DEFAULT_DISSOLVE, LAST_CUE_READ_BUFFER, MIN_LEAVE_DISSOLVE_TOTAL } = LyricTimeline;

    // Pass 1: holdDuration (and, for V2 phrases, leave/dissolve too — they
    // never depend on what comes next).
    for (const e of resolved) {
      if (e.authoredEndTime !== null) {
        // Explicit endTime is authoritative (spec 10) — HOLD spans exactly
        // to it; LEAVE/DISSOLVE use TrailLyrics' plain defaults starting
        // AT that point, never shrunk to make room for the next phrase.
        e.holdDuration = Math.max(0.3, e.authoredEndTime - (e.triggerTime + e.assembleDuration));
        e.holdEnd = e.authoredEndTime;
        e.leaveDuration = DEFAULT_LEAVE;
        e.dissolveDuration = DEFAULT_DISSOLVE;
      } else {
        // Legacy fallback (spec 5) — identical algorithm to the prior task.
        const lastCueReadEnd = e.lastVocalTime + LAST_CUE_READ_BUFFER;
        const naturalHold = Math.max(0, lastCueReadEnd - (e.triggerTime + e.assembleDuration));
        const typeHold = this.legacyHoldDefaults[e.runtimeType] ?? this.legacyHoldDefaults.trail;
        e.holdDuration = Math.max(typeHold, naturalHold);
        e.holdEnd = e.triggerTime + e.assembleDuration + e.holdDuration;
      }
    }

    // Pass 2: legacy phrases still need next-phrase-aware leave/dissolve
    // shrinking; V2 (explicit-endTime) phrases only get OBSERVED/reported
    // here — their timing is never altered by what fires next (spec 12).
    for (let i = 0; i < resolved.length; i++) {
      const e = resolved[i];
      const next = resolved[i + 1];
      const nextTrigger = next ? next.triggerTime : Infinity;

      if (e.authoredEndTime !== null) {
        if (Number.isFinite(nextTrigger) && e.holdEnd + e.leaveDuration + e.dissolveDuration > nextTrigger) {
          console.warn(`[LyricTimeline] ${e.id}: authored display window (ends ~${(e.holdEnd + e.leaveDuration + e.dissolveDuration).toFixed(2)}s) overlaps next phrase "${next.id}"'s trigger (${nextTrigger.toFixed(2)}s) — the single shared TrailLyrics instance will cut "${e.id}" short when "${next.id}" fires. This reflects the authoring data's intentional overlap, not a bug; not auto-corrected.`);
        }
        e.endTime = e.holdEnd;
        continue;
      }

      const available = nextTrigger - e.holdEnd;
      if (!Number.isFinite(available)) {
        e.leaveDuration = DEFAULT_LEAVE;
        e.dissolveDuration = DEFAULT_DISSOLVE;
      } else if (available < 0) {
        console.error(`[LyricTimeline] ${e.id}: requested hold overruns next phrase "${next.id}"'s trigger by ${(-available).toFixed(2)}s — clamping hold; report for choreography tuning.`);
        e.holdDuration = Math.max(0, e.holdDuration + available - MIN_LEAVE_DISSOLVE_TOTAL);
        e.holdEnd = e.triggerTime + e.assembleDuration + e.holdDuration;
        e.leaveDuration = MIN_LEAVE_DISSOLVE_TOTAL / 2;
        e.dissolveDuration = MIN_LEAVE_DISSOLVE_TOTAL / 2;
      } else if (available < MIN_LEAVE_DISSOLVE_TOTAL) {
        console.warn(`[LyricTimeline] ${e.id}: only ${available.toFixed(2)}s available before "${next.id}" fires — using the minimum transition.`);
        e.leaveDuration = MIN_LEAVE_DISSOLVE_TOTAL / 2;
        e.dissolveDuration = MIN_LEAVE_DISSOLVE_TOTAL / 2;
      } else if (available >= DEFAULT_LEAVE + DEFAULT_DISSOLVE) {
        e.leaveDuration = DEFAULT_LEAVE;
        e.dissolveDuration = DEFAULT_DISSOLVE;
      } else {
        const ratio = available / (DEFAULT_LEAVE + DEFAULT_DISSOLVE);
        e.leaveDuration = DEFAULT_LEAVE * ratio;
        e.dissolveDuration = DEFAULT_DISSOLVE * ratio;
      }
      e.endTime = e.holdEnd;
    }

    for (const e of resolved) {
      e.trailLyricsConfig = {
        ...e.trailLyricsConfig,
        assembleDuration: e.assembleDuration,
        holdDuration: e.holdDuration,
        leaveDuration: e.leaveDuration,
        dissolveDuration: e.dissolveDuration,
        // Screen-Lock Hold V1 (see TRAILLYRICS OVERLAPPING-LIFETIME
        // PLACEMENT implementation ticket) — general, authored-lifetime-
        // driven, not a per-cue/outro special case: ANY phrase with a
        // resolved authoredEndTime stays camera-relative-slotted (see
        // TrailLyrics.screenLock) for its whole HOLD instead of freezing in
        // world space, so it's still on-screen and readable at that exact
        // endTime. A legacy phrase (authoredEndTime === null) always gets
        // screenLock: false here — completely unaffected, exactly as before.
        screenLock: e.authoredEndTime !== null,
        // TRAIL LYRICS READABLE LAYOUT V2 (spec 5): "Fixed Font Size" — a
        // screen-locked phrase always uses ONE uniform textScale,
        // overriding whatever per-choreography value (e.g. HERO's 1.3x)
        // baseTrailLyricsConfig() set above. HERO/TRAIL semantic
        // differences must not cause inconsistent lyric size while phrases
        // share the simultaneous readable layout; a legacy (no endTime)
        // phrase keeps its original choreography-driven textScale
        // untouched, exactly as before.
        ...(e.authoredEndTime !== null ? { textScale: LAYOUT_FIXED_TEXT_SCALE } : {}),
      };
      // TrailLyrics Multi-Instance V1: the point this phrase's own
      // TrailLyrics instance is fully dissolved and safe to despawn — the
      // upper bound of _phrasesActiveAt()'s "should this phrase's instance
      // exist" test.
      e.fullLifecycleEnd = e.holdEnd + e.leaveDuration + e.dissolveDuration;
    }
    return resolved;
  }

  // Debug/inspection snapshot — every field spec 15/16 asked for, for every
  // successfully-compiled (i.e. runtime-enabled and scheduled) phrase. See
  // resolveDesignScore() for a view that also includes disabled/metadata
  // cues (as singleton, null-timing entries) for full-JSON visibility.
  getDebugEvents() {
    return this.events.map((e) => ({
      id: e.id,
      sourceCueIndices: e.sourceCueIndices,
      sourceTexts: e.sourceTexts,
      sourceTimes: e.sourceTimes,
      sourceEndTimes: e.sourceEndTimes,
      displayLines: e.displayLines,
      group: e.group,
      designType: e.designType,
      runtimeType: e.runtimeType,
      firstVocalTime: e.firstVocalTime,
      lastVocalTime: e.lastVocalTime,
      authoredEndTime: e.authoredEndTime,
      preRoll: e.preRoll,
      triggerTime: e.triggerTime,
      endTime: e.endTime,
      duration: e.endTime - e.triggerTime,
      camera: e.camera,
      leaveBehind: e.leaveBehind,
    }));
  }

  // A pure, read-only view of the COMPLETE cue set (including metadata/
  // disabled cues, as singleton null-timing entries) grouped and resolved
  // exactly as setTimingData() would, but touching NO instance state —
  // always safe to call from a debug getter on every access. Distinct from
  // `this.events` (only what's actually scheduled) per the "distinguish
  // SOURCE CUES from VISUAL PHRASES" requirement.
  resolveDesignScore(cues) {
    const sorted = [...(cues || [])].sort((a, b) => a.index - b.index);
    const groups = this._groupCues(sorted);
    const enabledResolved = [];
    const disabledViews = [];
    for (const g of groups) {
      if (!g.enabled) {
        for (const m of g.members) {
          disabledViews.push({
            id: `cue-${m.cue.index}`,
            sourceCueIndices: [m.cue.index],
            sourceTexts: [m.cue.text],
            sourceTimes: [m.cue.time],
            sourceEndTimes: [typeof m.cue.endTime === 'number' ? m.cue.endTime : null],
            displayLines: [m.cue.text],
            group: null,
            designType: m.choreo ? m.choreo.designType : null,
            runtimeType: m.choreo ? m.choreo.runtimeType : null,
            firstVocalTime: null,
            lastVocalTime: null,
            authoredEndTime: null,
            preRoll: null,
            triggerTime: null,
            endTime: null,
            duration: null,
            camera: null,
            leaveBehind: null,
          });
        }
        continue;
      }
      const phrase = this._resolvePhraseGroup(g);
      if (phrase) enabledResolved.push(phrase);
    }
    enabledResolved.sort((a, b) => a.triggerTime - b.triggerTime);
    const withEnds = this._resolveEndTimes(enabledResolved);
    const enabledViews = withEnds.map((e) => ({
      id: e.id,
      sourceCueIndices: e.sourceCueIndices,
      sourceTexts: e.sourceTexts,
      sourceTimes: e.sourceTimes,
      sourceEndTimes: e.sourceEndTimes,
      displayLines: e.displayLines,
      group: e.group,
      designType: e.designType,
      runtimeType: e.runtimeType,
      firstVocalTime: e.firstVocalTime,
      lastVocalTime: e.lastVocalTime,
      authoredEndTime: e.authoredEndTime,
      preRoll: e.preRoll,
      triggerTime: e.triggerTime,
      endTime: e.endTime,
      duration: e.endTime - e.triggerTime,
      camera: e.camera,
      leaveBehind: e.leaveBehind,
    }));
    // Present in the original cue order (by each entry's first source cue
    // index) rather than trigger-time order, so the debug view reads like
    // the song itself, top to bottom.
    return [...enabledViews, ...disabledViews].sort((a, b) => a.sourceCueIndices[0] - b.sourceCueIndices[0]);
  }

  restart() {
    this.manager.clear();
    this.time = 0;
    this.setTime(0);
  }

  setPaused(p) { this.paused = !!p; }

  // Every phrase whose full visual lifecycle (triggerTime through
  // LEAVE/DISSOLVE completion) contains `t` — i.e. everything that SHOULD
  // have a live TrailLyrics instance right now. Pure — touches no instance
  // state. `this.events` is sorted by triggerTime, so the result is too.
  _phrasesActiveAt(t) {
    const active = [];
    for (const e of this.events) {
      if (e.triggerTime <= t && t <= e.fullLifecycleEnd) active.push(e);
    }
    return active;
  }

  // All currently-active phrases (spec: "distinguish which phrase is
  // newest" needs the full set, not just one).
  getActiveEvents() { return this._phrasesActiveAt(this.time); }

  // The single most-recently-triggered active phrase (the newest/still-
  // forming-or-being-read one) — kept for callers that only ever cared
  // about "the" active phrase (e.g. a single-line GUI readout). Prefer
  // getActiveEvents() for anything that needs to know about coexisting
  // older phrases.
  getActiveEvent() {
    const active = this.getActiveEvents();
    return active.length ? active[active.length - 1] : null;
  }

  getNextEvent() {
    for (const e of this.events) if (e.triggerTime > this.time) return e;
    return null;
  }

  // Manual seek — jumps straight to `t` and reconciles the manager's
  // actually-spawned instances against `_phrasesActiveAt(t)` in one step,
  // deterministically, regardless of direction:
  //  - despawns every active instance whose lifecycle no longer contains
  //    `t` (whether because we sought past its end, or backward before its
  //    trigger) — never leaves a stale instance behind.
  //  - spawns every phrase whose lifecycle now contains `t` and doesn't
  //    already have a live instance — never spawns the same phrase twice.
  //  - a phrase already correctly active is left completely untouched
  //    (not re-triggered), so ordinary forward playback only ever pays for
  //    the phrases actually crossing a boundary this frame.
  //  - re-triggering a phrase via a backward seek into its own window
  //    still replays it fresh from its own t=0 (a full sub-event replay
  //    engine — resuming mid-cycle rather than restarting — remains out of
  //    scope, exactly as in every prior single-instance task).
  setTime(t) {
    this.time = Math.max(0, t);
    const shouldExist = this._phrasesActiveAt(this.time);
    const shouldExistIds = new Set(shouldExist.map((e) => e.id));
    for (const id of this.manager.getActiveIds()) {
      if (!shouldExistIds.has(id)) this.manager.despawn(id);
    }
    for (const e of shouldExist) {
      if (!this.manager.has(e.id)) {
        this.manager.spawn(e);
        if (this.onEventStart) this.onEventStart(e);
      }
    }
  }

  update(dt) {
    if (!this.enabled || this.paused) return;
    // Ordinary forward playback is nothing more than seeking every frame —
    // same reconciliation, same correctness guarantee, just called with a
    // small incremental `t`.
    this.setTime(this.time + dt * this.speed);
  }
}
