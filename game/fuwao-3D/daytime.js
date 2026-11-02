import * as THREE from 'three';

// ---- 時間の流れ（朝日・昼・夕日・星空の夜） ----
// 時刻から太陽の向きを決め、太陽の高さに応じてライト・かすみ・空の色を変える。
// 昼の色はそれぞれの見た目（アニメ調 / 元の見た目）のものをそのまま使い、朝夕と夜だけ上から色をかぶせる。
// 太陽は東（+X）から昇り、南（+Z）を通って西（-X）へ沈む。夜は反対側に月が出て、月の光で影ができる。

const lin = (r, g, b) => new THREE.Color().setRGB(r, g, b, THREE.LinearSRGBColorSpace);

export const DAY_MINUTES = 24;   // 1 日の長さ（実時間の分）。1 時間が 1 分
export const FAST_FORWARD = 60;  // 早送り中の倍率（1 秒で 1 時間進む）
const SUN_TILT = 50 * Math.PI / 180;   // 太陽の通り道の傾き（正午の高さは 40°）。14 時ごろが Blender の太陽とほぼ同じ向き
const DIR_STEP = 0.002;          // 太陽の向きはこの角度（rad）ごとにまとめて動かす（毎フレーム動かすと影の縁がちらつく）

// 空の色（昼）。夜明け・夕暮れ・夜はここに上から色をかぶせる
const DAY_SKY = {
  pbr: { hor: lin(1.0, 0.72, 0.45), mid: lin(0.95, 0.85, 0.70), zen: lin(0.05, 0.28, 1.0) },
  anime: { hor: lin(0.62, 0.74, 0.96), mid: lin(0.62, 0.74, 0.96), zen: lin(0.10, 0.32, 0.95) },
};

// 太陽の高さ（太陽の向きの Y）ごとの色。light / hemi は昼に対する倍率、
// fog / hor / mid / zen は amt の割合で昼の色にかぶせる色。glow は太陽のまわりの空の輝き
const KEYS = [
  { e: -0.30, light: 0.22, lightTint: lin(0.50, 0.66, 1.0), hemi: 0.24, hemiTint: lin(0.42, 0.52, 1.0), amt: 1,
    fog: lin(0.015, 0.024, 0.06), hor: lin(0.025, 0.04, 0.09), mid: lin(0.012, 0.02, 0.05), zen: lin(0.004, 0.008, 0.025),
    glow: lin(0.0, 0.0, 0.0), cloud: lin(0.10, 0.11, 0.17), night: 1, lamp: 1 },
  { e: -0.10, light: 0, lightTint: lin(0.50, 0.66, 1.0), hemi: 0.36, hemiTint: lin(0.62, 0.55, 0.92), amt: 1,
    fog: lin(0.12, 0.08, 0.15), hor: lin(0.32, 0.14, 0.16), mid: lin(0.10, 0.07, 0.16), zen: lin(0.02, 0.03, 0.10),
    glow: lin(0.9, 0.30, 0.15), cloud: lin(0.38, 0.25, 0.34), night: 0.55, lamp: 1 },
  { e: 0.0, light: 0.4, lightTint: lin(1.0, 0.40, 0.14), hemi: 0.58, hemiTint: lin(0.95, 0.62, 0.55), amt: 1,
    fog: lin(0.85, 0.44, 0.28), hor: lin(1.0, 0.40, 0.13), mid: lin(0.62, 0.36, 0.34), zen: lin(0.07, 0.12, 0.40),
    glow: lin(1.0, 0.45, 0.15), cloud: lin(1.0, 0.56, 0.46), night: 0, lamp: 0.7 },
  { e: 0.15, light: 0.8, lightTint: lin(1.0, 0.68, 0.40), hemi: 0.86, hemiTint: lin(1.0, 0.86, 0.76), amt: 0.55,
    fog: lin(0.95, 0.68, 0.48), hor: lin(1.0, 0.62, 0.35), mid: lin(0.92, 0.72, 0.58), zen: lin(0.08, 0.26, 0.85),
    glow: lin(1.0, 0.70, 0.40), cloud: lin(1.0, 0.84, 0.72), night: 0, lamp: 0.15 },
  { e: 0.35, light: 1, lightTint: lin(1, 1, 1), hemi: 1, hemiTint: lin(1, 1, 1), amt: 0,
    fog: lin(0, 0, 0), hor: lin(0, 0, 0), mid: lin(0, 0, 0), zen: lin(0, 0, 0),
    glow: lin(0.0, 0.0, 0.0), cloud: lin(1, 1, 1), night: 0, lamp: 0 },
];
// 朝焼けは夕焼けより少し桃色で涼しげにする（かぶせる色に掛ける）
const MORNING = lin(0.92, 0.9, 1.12);

// 両方の空（main.js の元の見た目の空と、anime.js の描き雲の空）が共有する値
export const skyUniforms = {
  uSun: { value: new THREE.Vector3(0, 1, 0) },
  cHorizon: { value: new THREE.Color() }, cMid: { value: new THREE.Color() }, cZenith: { value: new THREE.Color() },
  uGlow: { value: new THREE.Color() },
  uNight: { value: 0 },
  uStarAngle: { value: 0 },   // 星空は北の空の一点を中心に、時刻に合わせて回る
  uClock: { value: 0 },       // 実時間（星のまたたき用。早送りしても速くならない）
  uCloudTint: { value: new THREE.Color(1, 1, 1) },
  // 元の見た目の空は AgX トーンマッピングで色が白っぽく抜けるので、朝夕と夜は彩度を上げておく
  uSat: { value: 1 },
};

// 空のシェーダーに足す部分：太陽のまわりの輝き・太陽・月・星・天の川
export const SKY_GLSL = /* glsl */`
  uniform vec3 uSun, cHorizon, cMid, cZenith, uGlow, uCloudTint;
  uniform float uNight, uStarAngle, uClock, uSat;
  float dHash(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract((p.x + p.y) * p.z);
  }
  float dNoise(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(mix(dHash(i), dHash(i + vec3(1, 0, 0)), f.x), mix(dHash(i + vec3(0, 1, 0)), dHash(i + vec3(1, 1, 0)), f.x), f.y),
               mix(mix(dHash(i + vec3(0, 0, 1)), dHash(i + vec3(1, 0, 1)), f.x), mix(dHash(i + vec3(0, 1, 1)), dHash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
  }
  // 北（-Z）の空、高さ 35° を中心に回す
  vec3 starRot(vec3 d) {
    vec3 ax = normalize(vec3(0.0, 0.57, -0.82));
    float c = cos(uStarAngle), s = sin(uStarAngle);
    return d * c + cross(ax, d) * s + ax * dot(ax, d) * (1.0 - c);
  }
  vec3 skyExtras(vec3 d, vec3 col) {
    float sd = max(dot(d, uSun), 0.0);
    float low = 1.0 - 0.5 * smoothstep(0.0, 0.5, d.y);
    // 朝日・夕日のまわりの輝き
    col += uGlow * (pow(sd, 5.0) * 0.7 + pow(sd, 48.0)) * low;
    // 太陽（地平線より下では見えない）
    float sunDisc = smoothstep(0.99935, 0.9997, sd) * smoothstep(-0.02, 0.01, d.y);
    col += mix(vec3(1.6, 1.45, 1.2), vec3(2.2, 0.9, 0.35), clamp(length(uGlow), 0.0, 1.0)) * sunDisc * 2.0;
    if (uNight > 0.0 && d.y > -0.05) {
      float fade = uNight * smoothstep(-0.05, 0.12, d.y);
      vec3 sp = starRot(d);
      // 天の川（ぼんやりした帯）
      vec3 band = normalize(vec3(0.35, 0.2, 0.92));
      float mw = exp(-pow(dot(sp, band), 2.0) * 28.0) * (0.35 + 0.65 * dNoise(sp * 9.0)) * (0.6 + 0.4 * dNoise(sp * 31.0));
      col += vec3(0.05, 0.055, 0.09) * mw * fade;
      // 星：方向を細かい格子に分け、ところどころのマスに 1 つずつ置く
      vec3 q = sp * 150.0;
      vec3 cell = floor(q);
      float h = dHash(cell);
      if (h > 0.982) {
        vec3 ctr = cell + 0.5 + (vec3(dHash(cell + 1.3), dHash(cell + 7.1), dHash(cell + 3.7)) - 0.5) * 0.5;
        ctr = normalize(ctr) * 150.0;
        float b = smoothstep(0.32, 0.0, length(q - ctr));
        float mag = pow(fract(h * 97.31), 3.0);   // 明るい星は少なく
        float tw = 0.75 + 0.25 * sin(uClock * (2.0 + 3.0 * fract(h * 13.7)) + h * 80.0);
        vec3 tint = mix(vec3(0.75, 0.85, 1.2), vec3(1.2, 1.0, 0.8), fract(h * 51.3));
        col += tint * b * (0.35 + 2.4 * mag) * tw * fade;
      }
    }
    // 月（太陽の反対側）
    vec3 md = -uSun;
    float m = dot(d, md);
    float moonUp = smoothstep(-0.02, 0.02, d.y) * (0.25 + 0.75 * uNight);
    float disc = smoothstep(0.99955, 0.99968, m);
    float maria = 0.82 + 0.18 * dNoise(d * 900.0);
    col = mix(col, vec3(1.0, 0.97, 0.88) * 1.8 * maria, disc * moonUp);
    col += vec3(0.25, 0.3, 0.45) * pow(max(m, 0.0), 300.0) * 0.6 * moonUp * uNight;
    return col;
  }`;

export function createDaytime({ sun, lightDir, sunDir, fill, hemi, scene, style, lamp, glowMats, startHour = 14 }) {
  const t = { hour: startHour, speed: 1 };
  const k = {
    light: 0, lightTint: new THREE.Color(), hemi: 0, hemiTint: new THREE.Color(), amt: 0,
    fog: new THREE.Color(), hor: new THREE.Color(), mid: new THREE.Color(), zen: new THREE.Color(),
    glow: new THREE.Color(), cloud: new THREE.Color(), night: 0, lamp: 0,
  };
  const COLORS = ['lightTint', 'hemiTint', 'glow', 'cloud'];
  const SKY_COLORS = ['fog', 'hor', 'mid', 'zen'];   // amt を掛けてから混ぜる
  const _a = new THREE.Color(), _b = new THREE.Color(), _dir = new THREE.Vector3();
  let lastAngle = null;
  const glowBase = new Map(glowMats.map((m) => [m, m.emissiveIntensity]));

  // 太陽の高さ e での色を k に入れる
  function sample(e) {
    let i = 0;
    while (i < KEYS.length - 2 && e > KEYS[i + 1].e) i++;
    const A = KEYS[i], B = KEYS[i + 1];
    let f = THREE.MathUtils.clamp((e - A.e) / (B.e - A.e), 0, 1);
    f = f * f * (3 - 2 * f);
    for (const n of ['light', 'hemi', 'amt', 'night', 'lamp']) k[n] = A[n] + (B[n] - A[n]) * f;
    for (const n of COLORS) k[n].copy(A[n]).lerp(B[n], f);
    for (const n of SKY_COLORS) {
      _a.copy(A[n]).multiplyScalar(A.amt);
      _b.copy(B[n]).multiplyScalar(B.amt);
      k[n].copy(_a).lerp(_b, f);
    }
  }

  function apply() {
    // 6 時に東から昇り、18 時に西へ沈む
    const angle = Math.round((((t.hour - 6) / 12) * Math.PI) / DIR_STEP) * DIR_STEP;
    if (angle !== lastAngle) {
      lastAngle = angle;
      sunDir.set(Math.cos(angle), Math.sin(angle) * Math.cos(SUN_TILT), Math.sin(angle) * Math.sin(SUN_TILT));
    }
    const e = sunDir.y;
    sample(e);
    // 太陽が沈んで光が 0 になったところで、光の向きを月（反対側）に切り替える
    lightDir.copy(e > KEYS[1].e ? sunDir : _dir.copy(sunDir).negate());

    const morning = t.hour < 12;
    const base = style.base;
    sun.color.copy(base.sun).multiply(k.lightTint);
    sun.intensity = base.sunIntensity * k.light;
    fill.intensity = base.fillIntensity * k.hemi;
    hemi.color.copy(base.hemiSky).multiply(k.hemiTint);
    hemi.groundColor.copy(base.hemiGround).multiply(k.hemiTint);
    hemi.intensity = base.hemiIntensity * k.hemi;

    const day = DAY_SKY[style.enabled ? 'anime' : 'pbr'];
    const over = (dayColor, c) => _a.copy(dayColor).multiplyScalar(1 - k.amt).add(morning ? _b.copy(c).multiply(MORNING) : c);
    scene.fog.color.copy(over(base.fog, k.fog));   // 背景も同じ色
    skyUniforms.cHorizon.value.copy(over(day.hor, k.hor));
    skyUniforms.cMid.value.copy(over(day.mid, k.mid));
    skyUniforms.cZenith.value.copy(over(day.zen, k.zen));
    skyUniforms.uGlow.value.copy(k.glow);
    if (morning) skyUniforms.uGlow.value.multiply(MORNING);
    skyUniforms.uCloudTint.value.copy(k.cloud);
    skyUniforms.uNight.value = k.night;
    skyUniforms.uSat.value = 1 + 1.2 * Math.min(1, k.amt + k.glow.r);
    skyUniforms.uStarAngle.value = (t.hour / 24) * Math.PI * 2;

    // 窓と街灯は昼は消えていて、日が傾くと灯り始め、日が沈むころには全部つく。夜はふわおのまわりをランプで照らす
    const on = THREE.MathUtils.smoothstep(k.lamp, 0.15, 0.7);
    for (const [m, i] of glowBase) {
      const v = i * 2.6 * on;
      m.emissiveIntensity = v;
      const toon = style.toon(m);
      if (toon) toon.emissiveIntensity = v;
    }
    lamp.intensity = 28 * k.lamp;
  }

  return {
    get hour() { return t.hour; },
    get night() { return k.night; },
    // 時刻を進める（fast なら早送り）
    update(dt, fast) {
      skyUniforms.uClock.value += dt;
      t.hour = (t.hour + (dt * (fast ? FAST_FORWARD : 1) * 24) / (DAY_MINUTES * 60)) % 24;
      apply();
    },
    set(hour) { t.hour = ((hour % 24) + 24) % 24; apply(); },
    // 「14:05」のような表示
    get clock() {
      const m = Math.floor(t.hour * 60);
      return `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
    },
  };
}
