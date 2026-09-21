// Audio Sync V1 — a minimal wrapper around a single HTMLAudioElement.
//
// Deliberately NOT a music-player UI and NOT a scheduling system: this
// class only owns the one <audio> element (load/play/pause/seek/volume/
// rate) and reports its state. It has no idea LyricTimeline exists — main.js
// is what decides, each frame, whether LyricTimeline should read
// audio.currentTime as its master clock (see main.js's animate() wiring).
// That separation is what makes "A/B test with/without audio sync" trivial:
// nothing here changes depending on whether sync is on.
//
// Autoplay: never calls play() on its own. play() is only ever expected to
// be invoked from inside a real user-gesture handler (a GUI button click),
// which is exactly what the browser's autoplay policy requires — no unlock
// hack, no silent retry loop. If a browser still rejects it (e.g. programmatic
// call without a gesture), the rejection is caught and reported via
// `lastPlayError` rather than an unhandled promise rejection.
export class AudioController {
  constructor(src) {
    this.src = src;
    this.audio = new Audio(src);
    this.audio.preload = 'auto';
    this.audio.loop = false;
    this.audio.volume = 0.8;

    this.loaded = false;
    this.loadError = null;
    this.lastPlayError = null;

    this.audio.addEventListener('loadedmetadata', () => { this.loaded = true; });
    this.audio.addEventListener('error', () => {
      this.loadError = this.audio.error ? this.audio.error.message || String(this.audio.error.code) : 'unknown audio error';
    });
  }

  get currentTime() { return this.audio.currentTime || 0; }
  get duration() { return Number.isFinite(this.audio.duration) ? this.audio.duration : 0; }
  get paused() { return this.audio.paused; }
  get volume() { return this.audio.volume; }
  get playbackRate() { return this.audio.playbackRate; }

  // Returns true if playback actually started, false if the browser blocked
  // it (caller can inspect lastPlayError for why) — never throws.
  async play() {
    try {
      await this.audio.play();
      this.lastPlayError = null;
      return true;
    } catch (err) {
      this.lastPlayError = err && err.message ? err.message : String(err);
      return false;
    }
  }

  pause() { this.audio.pause(); }

  // Karaoke V1 — swaps the underlying source (e.g. vocal <-> instrumental)
  // without recreating the element/losing its volume/rate settings. Does
  // NOT call play() itself, matching this class's own "never plays on its
  // own" convention — the caller decides whether/when to resume.
  setSrc(src) {
    this.audio.pause();
    this.src = src;
    this.loaded = false;
    this.loadError = null;
    this.audio.src = src;
    this.audio.load();
  }

  setTime(seconds) {
    const clamped = this.duration > 0 ? Math.min(Math.max(0, seconds), this.duration) : Math.max(0, seconds);
    this.audio.currentTime = clamped;
  }

  restart() { this.setTime(0); }

  setVolume(v) { this.audio.volume = Math.min(1, Math.max(0, v)); }
  setPlaybackRate(r) { this.audio.playbackRate = Math.min(4, Math.max(0.25, r)); }
}
