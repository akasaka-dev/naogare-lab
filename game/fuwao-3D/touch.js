// ---- スマホ用のタッチ操作（前作ふわおと同じ、触ったところが中心になるスティック） ----
// 画面の左側をドラッグで移動、右側をドラッグでカメラ。右下にジャンプと発射、右上に小さなボタン。
// マウスの操作と混ざらないよう、pointerType が touch のものだけを扱う。

const JOY_RADIUS = 56;     // スティックの輪の半径（px）
const JOY_DEADZONE = 0.15; // これより小さい倒し方は無視
const LOOK_SENS = 0.006;   // カメラを回す速さ（rad/px）
const MOVE_AREA = 0.45;    // 画面の左からこの割合までがスティック

// 指が要素の外へ出ても追いかけられるようにする（できない環境では何もしない）
function capture(el, id) {
  try { el.setPointerCapture(id); } catch { /* 追いかけられなくても操作はできる */ }
}

export function createTouchControls({ press, release, fire, look, tap, recenter, toggleView, respawn, pause, isPlaying }) {
  const root = document.getElementById('touchUI');
  const ring = root.querySelector('.joy-ring');
  const knob = root.querySelector('.joy-knob');

  // updatePlayer が読む：x は右、y は手前（下）が正。長さは 0〜1
  const stick = { active: false, x: 0, y: 0, mag: 0 };
  let stickId = null, stickX = 0, stickY = 0;
  let lookId = null, lookX = 0, lookY = 0;
  // 指を置いた場所と時刻。ほとんど動かさずにすぐ離したらタップ（人と話す）
  const downs = new Map();

  // 一度でも指で触ったらタッチ操作を出す（最初から出すのは指で操作する端末だけ）
  if (window.matchMedia('(pointer: coarse)').matches) document.body.classList.add('touch');
  window.addEventListener('pointerdown', (e) => { if (e.pointerType === 'touch') document.body.classList.add('touch'); }, true);

  function placeStick(x, y) {
    let dx = x - stickX, dy = y - stickY;
    const d = Math.hypot(dx, dy);
    if (d > JOY_RADIUS) { dx *= JOY_RADIUS / d; dy *= JOY_RADIUS / d; }
    knob.style.transform = `translate(${dx}px, ${dy}px)`;
    const mag = Math.min(d, JOY_RADIUS) / JOY_RADIUS;
    stick.mag = mag > JOY_DEADZONE ? mag : 0;
    stick.x = stick.mag ? dx / JOY_RADIUS : 0;
    stick.y = stick.mag ? dy / JOY_RADIUS : 0;
  }
  function endStick() {
    stickId = null;
    Object.assign(stick, { active: false, x: 0, y: 0, mag: 0 });
    ring.classList.remove('on');
  }

  // 画面（ボタン以外）を触ったとき：左側ならスティック、右側ならカメラ
  const area = root.querySelector('.touch-area');
  area.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'touch' || !isPlaying()) return;
    if (e.clientX < window.innerWidth * MOVE_AREA && stickId === null) {
      stickId = e.pointerId;
      stickX = e.clientX; stickY = e.clientY;
      ring.style.left = `${stickX}px`;
      ring.style.top = `${stickY}px`;
      ring.classList.add('on');
      stick.active = true;
      placeStick(stickX, stickY);
    } else if (lookId === null) {
      lookId = e.pointerId;
      lookX = e.clientX; lookY = e.clientY;
    }
    downs.set(e.pointerId, { x: e.clientX, y: e.clientY, t: performance.now() });
    capture(area, e.pointerId);
  });
  area.addEventListener('pointermove', (e) => {
    if (e.pointerId === stickId) placeStick(e.clientX, e.clientY);
    else if (e.pointerId === lookId) {
      look((e.clientX - lookX) * LOOK_SENS, (e.clientY - lookY) * LOOK_SENS);
      lookX = e.clientX; lookY = e.clientY;
    }
  });
  area.addEventListener('pointerup', (e) => {
    const d = downs.get(e.pointerId);
    downs.delete(e.pointerId);
    if (d && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 12 && performance.now() - d.t < 350) tap(e.clientX, e.clientY);
  });
  const up = (e) => {
    if (e.pointerId === stickId) endStick();
    if (e.pointerId === lookId) lookId = null;
  };
  area.addEventListener('pointerup', up);
  area.addEventListener('pointercancel', up);
  area.addEventListener('lostpointercapture', up);
  // 指を離したことが要素に届かない端末もあるので、画面全体でも受け取る
  window.addEventListener('pointerup', up, true);
  window.addEventListener('pointercancel', up, true);

  // 押している間だけキーを押したことにするボタン（ジャンプ＝Space。空中でもう一度押し続けるとジェット）
  const holdOffs = [];
  function holdButton(el, code) {
    let id = null;
    el.addEventListener('pointerdown', (e) => {
      if (!isPlaying()) return;
      id = e.pointerId;
      capture(el, id);
      el.classList.add('down');
      press(code);
    });
    const off = (e) => {
      if (id === null || (e && e.pointerId !== id)) return;
      id = null;
      el.classList.remove('down');
      release(code);
    };
    el.addEventListener('pointerup', off);
    el.addEventListener('pointercancel', off);
    el.addEventListener('lostpointercapture', off);
    window.addEventListener('pointerup', off, true);
    window.addEventListener('pointercancel', off, true);
    holdOffs.push(() => off());
  }
  function tapButton(el, action) {
    el.addEventListener('pointerdown', (e) => {
      if (!isPlaying()) return;
      e.preventDefault();
      el.classList.add('down');
      action();
    });
    const off = () => el.classList.remove('down');
    el.addEventListener('pointerup', off);
    el.addEventListener('pointercancel', off);
  }
  holdButton(root.querySelector('.btn-jump'), 'Space');
  holdButton(root.querySelector('.btn-time'), 'KeyN');   // 押している間、時間を早送り
  tapButton(root.querySelector('.btn-fire'), fire);
  tapButton(root.querySelector('.btn-view'), toggleView);
  tapButton(root.querySelector('.btn-front'), recenter);   // カメラをロボの正面へ
  tapButton(root.querySelector('.btn-pause'), pause);

  // 一時停止したり画面から離れたりしたら、押しっぱなしの扱いを全部やめる
  function reset() {
    endStick();
    lookId = null;
    downs.clear();
    holdOffs.forEach((off) => off());
    root.querySelectorAll('.down').forEach((b) => b.classList.remove('down'));
  }

  // 端末によっては、指を離したことが pointerup でも pointercancel でも届かないことがある
  // （画面の端のジェスチャーなど）。そうなるとスティックやジャンプが押しっぱなしで残るので、
  // 「画面に指が1本も残っていない」とわかった時点で、全部離したことにする
  const noFingers = (e) => { if (e.touches.length === 0) reset(); };
  window.addEventListener('touchend', noFingers, true);
  window.addEventListener('touchcancel', noFingers, true);
  // 新しく触った指がその時点で唯一の指なのに、まだ何かを押している扱いなら、それは離し損ねたもの
  window.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'touch' && e.isPrimary && (stickId !== null || lookId !== null || root.querySelector('.down'))) reset();
  }, true);

  return { stick, reset };
}
