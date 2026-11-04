// ---- 会話（人物画 ＋ 手書き風の吹き出し） ----
// 台本は talks.js。人物画があれば画面の左下に出して吹き出しのしっぽをその顔へ、
// なければ吹き出しを本人の頭の上に出して、しっぽを頭へ向ける。
// 文字は 1 文字ずつ出す。クリック（タップ / Space / Enter）で、途中なら全部出し、出し終わっていたら次へ。

const CHAR_RATE = 28;          // 1 秒に出す文字数
const PAUSE = { '。': 0.25, '！': 0.25, '？': 0.25, '…': 0.12, '、': 0.1 };   // この文字のあとは少し間をあける
const BOIL = 0.2;              // 線がこの間隔（秒）で少しずつ描き直されて、手描きのアニメのように揺れる
const WOBBLE = 2.6;            // 線のゆがみ（px）
const TAIL_HALF = 13;          // しっぽの付け根の半分の幅（px）
const TAIL_LEN = [22, 56];     // しっぽの長さ（px）
const MARGIN = 12;             // 画面の端からこれだけあける（px）
const HEAD_GAP = 64;           // 頭の上の吹き出しは、頭からこれだけ上（px）

const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// 角の丸い四角を、なぞる順に細かい点にする。点には外向きの向きと、周りに沿った長さ s をつける。
// tail があれば、その辺の途中にしっぽの先をはさむ
function outline(w, h, tail) {
  const R = Math.min(22, h / 2.5);
  const pts = [];
  let s = 0, last = null;
  const push = (x, y, nx, ny) => {
    if (last) s += Math.hypot(x - last.x, y - last.y);
    last = { x, y, nx, ny, s };
    pts.push(last);
  };
  const edge = (name, x0, y0, x1, y1, nx, ny) => {
    const L = Math.hypot(x1 - x0, y1 - y0), ux = (x1 - x0) / L, uy = (y1 - y0) / L;
    const n = Math.max(1, Math.round(L / 8));
    const cut = tail && tail.edge === name ? tail : null;
    // 辺に沿った位置で、しっぽの付け根の範囲（なぞる向きで手前 a、奥 b）
    let a = L, b = L;
    if (cut) {
      const u = clamp((cut.bx - x0) * ux + (cut.by - y0) * uy, TAIL_HALF + 6, L - TAIL_HALF - 6);
      a = u - TAIL_HALF; b = u + TAIL_HALF;
    }
    for (let i = 0; i <= n; i++) {
      const u = (L * i) / n;
      if (u > a && u < b) continue;
      if (cut && !cut.done && u >= b) {   // 付け根の手前と奥のあいだに、しっぽの先をはさむ
        push(x0 + ux * a, y0 + uy * a, nx, ny);
        pts.push({ x: cut.tx, y: cut.ty, tip: true, s });
        push(x0 + ux * b, y0 + uy * b, nx, ny);
        cut.done = true;
      }
      push(x0 + ux * u, y0 + uy * u, nx, ny);
    }
  };
  const arc = (cx, cy, a0) => {
    for (let i = 1; i < 6; i++) {
      const a = a0 + (Math.PI / 2) * (i / 6);
      push(cx + Math.cos(a) * R, cy + Math.sin(a) * R, Math.cos(a), Math.sin(a));
    }
  };
  edge('top', R, 0, w - R, 0, 0, -1);
  arc(w - R, R, -Math.PI / 2);
  edge('right', w, R, w, h - R, 1, 0);
  arc(w - R, h - R, 0);
  edge('bottom', w - R, h, R, h, 0, 1);
  arc(R, h - R, Math.PI / 2);
  edge('left', 0, h - R, 0, R, -1, 0);
  arc(R, R, Math.PI);
  return pts;
}

// 点を線のゆがみの分だけ外や内へずらして、SVG のパスにする
function pathOf(pts, phase, from = 0, count = pts.length, close = true) {
  let d = '';
  for (let k = 0; k < count; k++) {
    const p = pts[(from + k) % pts.length];
    let x = p.x, y = p.y;
    if (!p.tip) {
      const o = WOBBLE * (0.5 * Math.sin(p.s * 0.021 + phase[0]) + 0.3 * Math.sin(p.s * 0.07 + phase[1]) + 0.2 * Math.sin(p.s * 0.19 + phase[0] * 2));
      x += p.nx * o; y += p.ny * o;
    }
    d += `${k ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return close ? d + 'Z' : d;
}

// しっぽ：吹き出しの外にある target（吹き出しの中の座標）へ向けて、近い辺から出す
function tailToward(w, h, tx, ty) {
  let edge;
  if (ty > h) edge = 'bottom';
  else if (ty < 0) edge = 'top';
  else if (tx < 0) edge = 'left';
  else if (tx > w) edge = 'right';
  else return null;
  const bx = clamp(tx, 0, w), by = clamp(ty, 0, h);
  const cx = edge === 'left' ? 0 : edge === 'right' ? w : bx;
  const cy = edge === 'top' ? 0 : edge === 'bottom' ? h : by;
  const dx = tx - cx, dy = ty - cy, d = Math.hypot(dx, dy) || 1;
  const len = clamp(d, TAIL_LEN[0], TAIL_LEN[1]);
  return { edge, bx: cx, by: cy, tx: cx + (dx / d) * len, ty: cy + (dy / d) * len };
}

export function createTalk() {
  const root = document.getElementById('talk');
  const portrait = root.querySelector('.talk-portrait');
  const bubble = root.querySelector('.talk-bubble');
  const nameEl = bubble.querySelector('.talk-name');
  const textEl = bubble.querySelector('.talk-text');
  const [fillPath, inkPath, ink2Path] = bubble.querySelectorAll('svg path');
  const svg = bubble.querySelector('svg');
  const hintEl = document.getElementById('talkHint');

  let entry = null, line = 0, chars = [], shown = 0, wait = 0;
  let boil = 0, phase = [0, 0], phase2 = [0, 0], start2 = 0, drawnKey = '';
  let portraitOk = false;

  portrait.addEventListener('load', () => { portraitOk = true; portrait.style.display = 'block'; });
  portrait.addEventListener('error', () => { portraitOk = false; portrait.style.display = 'none'; });
  function setPortrait(src) {
    if (!src) { portraitOk = false; portrait.style.display = 'none'; portrait.removeAttribute('src'); return; }
    if (portrait.getAttribute('src') === src) return;
    portraitOk = false;
    portrait.style.display = 'none';
    portrait.src = src;
  }

  function showLine() {
    const l = entry.lines[line];
    const text = typeof l === 'string' ? l : l.text;
    setPortrait((typeof l === 'object' && l.portrait) || entry.portrait);
    // 何人かで話すときは、せりふごとに名前を変えられる（{ name, text }）
    nameEl.textContent = (typeof l === 'object' && l.name) || entry.name || '';
    chars = Array.from(text);
    shown = 0;
    wait = 0;
    textEl.textContent = '';
    bubble.classList.remove('done');
  }
  function close() {
    entry = null;
    document.body.classList.remove('talking');
    setPortrait(null);
  }

  return {
    get active() { return entry !== null; },
    // 今のせりふ（文字列か { who, name, text, ... }）
    get line() { return entry ? entry.lines[line] : null; },
    open(e) {
      entry = e;
      line = 0;
      document.body.classList.add('talking');
      hintEl.style.display = 'none';
      drawnKey = '';
      showLine();
    },
    // 途中なら全部出す。出し終わっていたら次のせりふへ（最後なら閉じる）。閉じたら true
    advance() {
      if (!entry) return false;
      if (shown < chars.length) {
        shown = chars.length;
        textEl.textContent = chars.join('');
        bubble.classList.add('done');
        return false;
      }
      if (++line < entry.lines.length) { showLine(); return false; }
      close();
      return true;
    },
    close,
    // head は話している人の頭の画面上の位置 { x, y, visible }
    update(dt, head) {
      if (!entry) return;
      // 文字を送る
      if (shown < chars.length) {
        wait -= dt;
        while (wait <= 0 && shown < chars.length) {
          const c = chars[shown++];
          wait += 1 / CHAR_RATE + (PAUSE[c] || 0);
        }
        textEl.textContent = chars.slice(0, shown).join('');
        if (shown >= chars.length) bubble.classList.add('done');
      }

      // 置き場所
      const W = window.innerWidth, H = window.innerHeight;
      const bw = bubble.offsetWidth, bh = bubble.offsetHeight;
      let left, top, tx, ty;
      if (portraitOk) {
        const pr = portrait.getBoundingClientRect();
        tx = pr.left + pr.width * 0.55;
        ty = pr.top + pr.height * 0.22;
        left = Math.min(pr.right - pr.width * 0.12, W - MARGIN - bw);
        top = H - bh - Math.max(MARGIN, H * 0.06);
        // 横幅が足りないときは人物画の上に重ねる
        if (left < MARGIN + pr.width * 0.4) { left = (W - bw) / 2; top = Math.max(MARGIN, pr.top - bh - 30); }
      } else if (head.visible) {
        tx = head.x; ty = head.y;
        left = clamp(head.x - bw / 2, MARGIN, W - MARGIN - bw);
        top = clamp(head.y - HEAD_GAP - bh, MARGIN, H - MARGIN - bh);
        // 頭が画面の上のほうで吹き出しが入らないときは、頭の下に出す
        if (top + bh > head.y - TAIL_LEN[0]) top = clamp(head.y + HEAD_GAP, MARGIN, H - MARGIN - bh);
      } else {
        left = (W - bw) / 2; top = H - bh - H * 0.08;
      }
      left = Math.round(left); top = Math.round(top);
      bubble.style.transform = `translate(${left}px, ${top}px)`;

      // 線を描く（大きさやしっぽが変わったとき、それと少しずつの描き直し）
      boil += dt;
      const tail = tx === undefined ? null : tailToward(bw, bh, tx - left, ty - top);
      const key = `${bw},${bh},${tail ? `${Math.round(tail.tx)},${Math.round(tail.ty)},${tail.edge}` : ''}`;
      if (key === drawnKey && boil < BOIL) return;
      if (boil >= BOIL) {
        boil = 0;
        phase = [Math.random() * 6.3, Math.random() * 6.3];
        phase2 = [Math.random() * 6.3, Math.random() * 6.3];
        start2 = Math.random();
      }
      drawnKey = key;
      svg.setAttribute('width', bw);
      svg.setAttribute('height', bh);
      const pts = outline(bw, bh, tail);
      const d = pathOf(pts, phase);
      fillPath.setAttribute('d', d);
      inkPath.setAttribute('d', d);
      // 2 本目の線は少しずらして、一周しきらずに止める（ペンで描いたように）
      ink2Path.setAttribute('d', pathOf(pts, phase2, Math.floor(start2 * pts.length), Math.floor(pts.length * 0.9), false));
    },
    // 話せる人の頭の上に「話す」を出す（pos が null なら消す）
    hint(pos) {
      if (!pos || entry) { hintEl.style.display = 'none'; return; }
      hintEl.style.display = 'block';
      hintEl.style.transform = `translate(${Math.round(pos.x)}px, ${Math.round(pos.y)}px) translate(-50%, -100%)`;
    },
  };
}
