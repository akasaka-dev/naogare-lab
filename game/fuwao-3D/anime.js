import * as THREE from 'three';
import { skyUniforms, SKY_GLSL } from './daytime.js';

// ---- 手描きアニメ調の描画（実験） ----
// トゥーン材質（柔らかい 2 段の塗り分け＋塗りムラ）、描き雲の空、
// 後処理で 茶色い揺れる輪郭線・水彩のにじみと顔料だまり・紙の質感 をのせる。
// 元の見た目（PBR）とはキーで切り替えられる。

const lin = (r, g, b) => new THREE.Color().setRGB(r, g, b, THREE.LinearSRGBColorSpace);

// 昼の青空の配色（ラフスケッチに合わせる）
const LOOK = {
  sun: lin(1.0, 0.88, 0.70), sunIntensity: 3.0,
  fillIntensity: 0,
  hemiSky: lin(0.62, 0.64, 0.92), hemiGround: lin(0.80, 0.60, 0.42), hemiIntensity: 0.85,
  fog: lin(0.62, 0.74, 0.96), fogNear: 90, fogFar: 1300,   // 遠くは青紫に溶ける（城は見えるくらい）
};

const NOISE_GLSL = /* glsl */`
  float aHash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float aNoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(aHash(i), aHash(i + vec2(1.0, 0.0)), f.x),
               mix(aHash(i + vec2(0.0, 1.0)), aHash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float aFbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * aNoise(p); p = p * 2.03 + 17.1; a *= 0.5; }
    return v;
  }`;

// 光の当たり具合 → 明るさ。境目だけ少しぼかした 2 段（影・中間・明るい面）
function makeGradient() {
  const N = 256, data = new Uint8Array(N);
  const s = (a, b, v) => { const t = Math.min(1, Math.max(0, (v - a) / (b - a))); return t * t * (3 - 2 * t); };
  for (let i = 0; i < N; i++) {
    const x = i / (N - 1);   // dot(N, L) * 0.5 + 0.5
    data[i] = Math.round(255 * (0.12 + 0.6 * s(0.46, 0.54, x) + 0.28 * s(0.70, 0.76, x)));
  }
  const tex = new THREE.DataTexture(data, N, 1, THREE.RedFormat);
  tex.minFilter = tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

// 面の中の塗りムラ（UV が無いのでワールド座標から作る）
function addWash(shader) {
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\nvarying vec3 vWashPos;')
    .replace('#include <project_vertex>', '#include <project_vertex>\nvWashPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <common>', `#include <common>\nvarying vec3 vWashPos;\n${NOISE_GLSL}`)
    .replace('#include <color_fragment>', /* glsl */`#include <color_fragment>
      {
        vec2 wp = vWashPos.xz + vWashPos.y * vec2(0.63, 0.41);
        float wash = aFbm(wp * 0.35);
        float brush = aNoise(wp * 3.0 + vWashPos.y * 1.7);
        diffuseColor.rgb *= 0.84 + 0.3 * wash + 0.06 * (brush - 0.5);
      }`);
}

const SKY_VERT = /* glsl */`
  varying vec3 vDir;
  void main() {
    vDir = normalize((modelMatrix * vec4(position, 0.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position.z = gl_Position.w;
  }`;

// 青空ともくもくした描き雲（上は白、太陽と反対側はラベンダーの影）
const SKY_FRAG = /* glsl */`
  uniform float uTime;
  ${SKY_GLSL}
  varying vec3 vDir;
  ${NOISE_GLSL}
  void main() {
    vec3 d = normalize(vDir);
    float h = d.y;
    vec3 c = mix(cHorizon, cZenith, pow(clamp(h, 0.0, 1.0), 0.55));
    c = skyExtras(d, c);   // 朝日・夕日の輝き、太陽、月、星（雲の後ろ）
    if (h > 0.0) {
      vec2 p = d.xz / (h + 0.2) * 1.8 + vec2(uTime * 0.012, uTime * 0.005);
      float n = aFbm(p);
      float ns = aFbm(p + normalize(uSun.xz) * 0.09);
      float cover = smoothstep(0.47, 0.50, n) * smoothstep(0.02, 0.2, h);
      float lit = 1.0 - smoothstep(-0.004, 0.02, ns - n);
      vec3 cloud = mix(vec3(0.58, 0.60, 0.86), vec3(1.05, 1.02, 0.97), lit);
      float rim = smoothstep(0.47, 0.50, n) - smoothstep(0.50, 0.56, n);
      cloud = mix(cloud, vec3(0.50, 0.56, 0.86), rim * 0.35);
      cloud *= uCloudTint;   // 朝夕は茜色、夜は暗い青
      c = mix(c, cloud, cover);
    }
    gl_FragColor = vec4(c, 1.0);
  }`;

const POST_VERT = /* glsl */`
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const POST_FRAG = /* glsl */`
  #include <packing>
  uniform sampler2D tColor, tNormal, tDepth;
  uniform vec2 uRes;
  uniform float uPR, uTime, uExposure, cameraNear, cameraFar;
  uniform float uLine, uPaper, uBleed;
  varying vec2 vUv;
  ${NOISE_GLSL}

  float viewD(vec2 uv) { return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, cameraNear, cameraFar); }
  vec3 nrm(vec2 uv) { return texture2D(tNormal, uv).xyz * 2.0 - 1.0; }
  // 明るいところをやさしく丸めて、暗部は少し持ち上げる（水彩っぽい明るさ）
  vec3 grade(vec3 c) {
    c = 1.0 - exp(-c * uExposure);
    c = pow(c, vec3(1.0 / 2.2));
    float l = dot(c, vec3(0.299, 0.587, 0.114));
    c = mix(vec3(l), c, 1.4);
    c += vec3(0.02, 0.0, 0.04) * (1.0 - l) * (1.0 - l);   // 暗いところは少し紫寄り
    c *= vec3(1.03, 1.0, 0.95);                            // 全体を暖色に
    return c;
  }

  void main() {
    vec2 px = 1.0 / uRes;
    vec2 sp = vUv * uRes / uPR;          // CSS ピクセル単位の座標（紙の目の大きさを画面密度に依らずそろえる）
    float boil = floor(uTime * 6.0);     // 線は 1 秒に 6 回描き直したように揺れる

    // ---- 輪郭線（奥行きと法線の不連続） ----
    vec2 wob = vec2(aNoise(sp / 14.0 + boil * 1.7), aNoise(sp / 14.0 + 40.0 + boil * 2.3)) - 0.5;
    vec2 uvL = vUv + wob * px * 2.5 * uPR;
    vec2 dx = vec2(px.x * uPR, 0.0), dy = vec2(0.0, px.y * uPR);
    float d0 = viewD(uvL);
    float i0 = 1.0 / d0;
    // 1/奥行き は平面上では画面に対して線形なので、2 次差分なら平らな地面に線が出ない
    float lap = abs(1.0 / viewD(uvL - dx) + 1.0 / viewD(uvL + dx) - 2.0 * i0)
              + abs(1.0 / viewD(uvL - dy) + 1.0 / viewD(uvL + dy) - 2.0 * i0);
    float edge = smoothstep(0.08, 0.25, lap / i0);
    vec3 n0 = nrm(uvL);
    float nd = max(max(1.0 - dot(n0, nrm(uvL - dx)), 1.0 - dot(n0, nrm(uvL + dx))),
                   max(1.0 - dot(n0, nrm(uvL - dy)), 1.0 - dot(n0, nrm(uvL + dy))));
    if (d0 < cameraFar * 0.9) edge = max(edge, smoothstep(0.35, 0.7, nd));
    edge *= 1.0 - 0.6 * smoothstep(40.0, 400.0, d0);                        // 遠くは線を薄く
    edge *= 0.55 + 0.45 * smoothstep(0.3, 0.7, aNoise(sp / 5.0 + boil));    // 鉛筆のかすれ
    edge *= uLine;

    // ---- 水彩のにじみ（塗りが線から少しずれる）と顔料だまり ----
    vec2 bleed = (vec2(aFbm(sp / 80.0), aFbm(sp / 80.0 + 19.0)) - 0.5) * px * 5.0 * uPR * uBleed;
    vec3 c = grade(texture2D(tColor, vUv + bleed).rgb);
    vec2 o = px * 2.5 * uPR;
    vec3 avg = grade(texture2D(tColor, vUv + vec2(o.x, 0.0)).rgb) + grade(texture2D(tColor, vUv - vec2(o.x, 0.0)).rgb)
             + grade(texture2D(tColor, vUv + vec2(0.0, o.y)).rgb) + grade(texture2D(tColor, vUv - vec2(0.0, o.y)).rgb);
    float pool = clamp(length(c - avg * 0.25) * 2.0, 0.0, 1.0);
    c *= 1.0 - 0.35 * pool * uBleed;

    // ---- 紙 ----
    float tooth = aFbm(sp / 1.8);
    float blot = aFbm(sp / 140.0 + 5.0);
    c *= mix(1.0, mix(0.93, 1.03, tooth) * (0.95 + 0.08 * blot), uPaper);
    c *= mix(vec3(1.0), vec3(1.0, 0.985, 0.95), uPaper);

    // ---- 線は黒ではなく、下の色を濃くした茶色 ----
    c = mix(c, c * vec3(0.38, 0.28, 0.22), clamp(edge, 0.0, 1.0) * 0.85);

    float v = smoothstep(1.1, 0.35, length(vUv - 0.5) * 1.3);
    c *= mix(0.9, 1.0, v);
    gl_FragColor = vec4(c, 1.0);
  }`;

export function createAnimeStyle({ renderer, scene, camera, sun, fill, hemi, sky, sunDir, time }) {
  const pbr = {
    sun: sun.color.clone(), sunIntensity: sun.intensity,
    fillIntensity: fill.intensity,
    hemiSky: hemi.color.clone(), hemiGround: hemi.groundColor.clone(), hemiIntensity: hemi.intensity,
    fog: scene.fog.color.clone(), fogNear: scene.fog.near, fogFar: scene.fog.far,
    skyMat: sky.material,
  };

  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false, toneMapped: false,
    uniforms: { uTime: time, ...skyUniforms },   // 空の色・太陽・星は daytime.js が時刻に合わせて変える
    vertexShader: SKY_VERT, fragmentShader: SKY_FRAG,
  });

  // ---- トゥーン材質（元の材質ごとに 1 つ作って使い回す） ----
  const gradient = makeGradient();
  const toonOf = new Map();
  function toToon(m) {
    if (!m.isMeshStandardMaterial) return m;
    let t = toonOf.get(m);
    if (t) return t;
    t = new THREE.MeshToonMaterial({
      name: m.name, color: m.color, map: m.map, gradientMap: gradient,
      emissive: m.emissive, emissiveMap: m.emissiveMap, emissiveIntensity: m.emissiveIntensity,
      transparent: m.transparent, opacity: m.opacity, alphaTest: m.alphaTest, alphaMap: m.alphaMap,
      side: m.side, vertexColors: m.vertexColors,
    });
    const water = /water/i.test(m.name);
    // 水面の波（main.js の makeWater）はそのまま引き継ぐ
    t.onBeforeCompile = (shader, r) => { m.onBeforeCompile(shader, r); if (!water) addWash(shader); };
    // 元の材質の追加処理（廃墟のくすみなど）があるものとないもので、シェーダーを分ける
    t.customProgramCacheKey = () => (water ? 'anime-water' : 'anime-wash') + m.customProgramCacheKey();
    toonOf.set(m, t);
    return t;
  }
  function swapMaterials(on, root = scene) {
    root.traverse((o) => {
      if (!o.isMesh || o === sky) return;
      o.userData.pbrMaterial ??= o.material;
      const base = o.userData.pbrMaterial;
      o.material = !on ? base : Array.isArray(base) ? base.map(toToon) : toToon(base);
    });
  }

  // ---- 後処理 ----
  const size = new THREE.Vector2();
  const colorRT = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 4 });
  const normalRT = new THREE.WebGLRenderTarget(1, 1, { depthTexture: new THREE.DepthTexture(1, 1) });
  const normalMat = new THREE.MeshNormalMaterial();
  const post = new THREE.ShaderMaterial({
    depthTest: false, depthWrite: false, toneMapped: false,
    uniforms: {
      tColor: { value: colorRT.texture }, tNormal: { value: normalRT.texture }, tDepth: { value: normalRT.depthTexture },
      uRes: { value: new THREE.Vector2() }, uPR: { value: 1 }, uTime: time, uExposure: { value: 1.35 },
      cameraNear: { value: camera.near }, cameraFar: { value: camera.far },
      uLine: { value: 1 }, uPaper: { value: 1 }, uBleed: { value: 1 },
    },
    vertexShader: POST_VERT, fragmentShader: POST_FRAG,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), post);
  quad.frustumCulled = false;
  const postScene = new THREE.Scene();
  postScene.add(quad);
  const postCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const flatNormal = lin(0.5, 0.5, 1.0);
  const _clear = new THREE.Color();

  function setSize() {
    renderer.getDrawingBufferSize(size);
    colorRT.setSize(size.x, size.y);
    normalRT.setSize(size.x, size.y);
    post.uniforms.uRes.value.copy(size);
    post.uniforms.uPR.value = renderer.getPixelRatio();
  }
  setSize();

  const style = {
    enabled: false,
    uniforms: post.uniforms,
    set(on) {
      style.enabled = on;
      const L = on ? LOOK : pbr;
      sun.color.copy(L.sun); sun.intensity = L.sunIntensity;
      fill.intensity = L.fillIntensity;
      hemi.color.copy(L.hemiSky); hemi.groundColor.copy(L.hemiGround); hemi.intensity = L.hemiIntensity;
      scene.fog.color.copy(L.fog);   // 背景も同じ Color を指している
      scene.fog.near = L.fogNear; scene.fog.far = L.fogFar;
      sky.material = on ? skyMat : pbr.skyMat;
      swapMaterials(on);
    },
    toggle() { style.set(!style.enabled); },
    // 今の見た目の昼のライトの値（daytime.js が時刻に合わせて上から色を変える）
    get base() { return style.enabled ? LOOK : pbr; },
    // 元の材質から作ったトゥーン材質（まだ作っていなければ undefined）
    toon: (m) => toonOf.get(m),
    // あとからシーンに足したもの（発射したパンなど）を今の見た目に合わせる
    apply(root) { swapMaterials(style.enabled, root); },
    setSize,
    render() {
      if (!style.enabled) {
        renderer.setRenderTarget(null);
        renderer.render(scene, camera);
        return;
      }
      renderer.setRenderTarget(colorRT);
      renderer.render(scene, camera);

      // 法線と奥行きだけの 2 回目（影は 1 回目で更新済み）
      const bg = scene.background;
      renderer.getClearColor(_clear);
      const clearAlpha = renderer.getClearAlpha();
      scene.background = null;
      scene.overrideMaterial = normalMat;
      sky.visible = false;
      // 輪郭線を付けないもの（キラキラなど。userData.noOutline）は、法線の回には描かない
      const noOutline = scene.children.filter((o) => o.visible && o.userData.noOutline);
      for (const o of noOutline) o.visible = false;
      renderer.shadowMap.autoUpdate = false;
      renderer.setClearColor(flatNormal, 1);
      renderer.setRenderTarget(normalRT);
      renderer.render(scene, camera);
      renderer.setClearColor(_clear, clearAlpha);
      renderer.shadowMap.autoUpdate = true;
      sky.visible = true;
      for (const o of noOutline) o.visible = true;
      scene.overrideMaterial = null;
      scene.background = bg;

      post.uniforms.cameraNear.value = camera.near;
      post.uniforms.cameraFar.value = camera.far;
      renderer.setRenderTarget(null);
      renderer.render(postScene, postCam);
    },
  };
  return style;
}
