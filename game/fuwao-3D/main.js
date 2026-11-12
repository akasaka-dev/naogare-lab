import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';
import { MeshBVH, acceleratedRaycast } from 'three-mesh-bvh';
import { createAnimeStyle } from './anime.js';
import { createTouchControls } from './touch.js';
import { createDaytime, skyUniforms, SKY_GLSL } from './daytime.js';
import { createTalk } from './talk.js';
import { TALKS } from './talks.js';

// ---- 値はすべて docs/scene-notes.md より（色は Blender のリニア値） ----
const lin = (r, g, b) => new THREE.Color().setRGB(r, g, b, THREE.LinearSRGBColorSpace);

const START_POS = new THREE.Vector3(-7.7, 12, -22.6); // パン工房の扉の前（北の奥の段）。高さは地面に合わせる
const START_YAW = Math.PI;                            // 南（+Z）を向く → 町を見下ろす
// 「はじめから」のときだけ：パン工房の通り（北の奥の段）の東の入口。西を向くと、通りの先にお城が見える
// （つづきから・R・ボスの撤退のあとは、START_POS の工房の扉の前）
const NEW_START_POS = new THREE.Vector3(18, 12, -25);
const NEW_START_YAW = Math.PI / 2;
const EYE_HEIGHT = 1.55;      // 一人称のときの目の高さ（ふわおの操縦席）
const RADIUS = 0.4;           // ロボの太さ
const STEP_HEIGHT = 0.45;     // これ以下の段差は登れる
const WALK_SPEED = 2.2;
const RUN_SPEED = 4.5;
// 歩きアニメの再生速度（元のアニメに対する倍率。元は 4 秒で 8 歩なので、1 倍で 1 秒に 2 歩）。
// 移動速度にぴったり合わせると 6〜9 倍（1 秒に 12〜18 歩）になり、小刻みすぎて顔が残像のように
// 見えるので、足が滑るのは許容してテンポを抑える
const WALK_ANIM_RATE = 1.75;  // 1 秒に 3.5 歩
const RUN_ANIM_RATE = 2.5;    // 1 秒に 5 歩
const CAM_DISTANCE = 4.2;     // 三人称カメラの距離
const CAM_TARGET_HEIGHT = 1.4;
const MOUSE_SENS = 0.0025;
const STICK_RUN = 0.85;       // スマホのスティックをこれより大きく倒すと走る
const ROBOT_HEIGHT = 1.75;     // 旗の先まで（天井の当たり判定に使う）
const FUWAO_HEIGHT = 1.62;     // ふわおの頭のてっぺんまで
const GRAVITY = 18;
const JUMP_HEIGHT = FUWAO_HEIGHT * 3;                  // ロボなので身長の 3 倍跳べる
const JUMP_SPEED = Math.sqrt(2 * GRAVITY * JUMP_HEIGHT);
// ジェット噴射（ジャンプ中にもう一度 Space、押している間ずっと）。
// 上ではなくロボの正面へ強く押し出す。長く噴かしていると、あおられて少しずつ上昇していく
const JET_SPEED = 16;         // 最高速（m/秒）
const JET_ACCEL = 2.5;        // 最高速への近づき方（大きいほど一気に加速）
const JET_TURN = 2.2;         // 噴射中の旋回の速さ（rad/秒）
const JET_SINK = 0.6;         // 噴射し始めは少し沈む（m/秒）
const JET_RISE_DELAY = 0.8;   // あおりで上がり始めるまで（秒）
const JET_RISE_TIME = 2.5;    // そこから最大の上昇になるまで（秒）
const JET_RISE_MAX = 3.5;     // あおりによる上昇の最大（m/秒、最高速のとき）
const JET_TILT = 0.3;         // あおりで機首が上がる角度（rad、最大）
const JET_MAX_ALT = 25;       // 足元の地面からこれ以上は上がらない
const JET_CLIMB_FROM = 5;     // これより長く噴かし続けると、さらに上昇していく（秒）。最初のタンクではちょうど燃料が切れるころ
const JET_CLIMB_TIME = 1.5;   // そこから最大の上昇になるまで（秒）
const JET_CLIMB_MAX = 4;      // 長く噴かしたときに足される上昇（m/秒、最高速のとき）
const JET_CLIMB_TILT = 0.15;  // そのとき、さらに機首が上がる角度（rad）
const JET_START_UP = 1.0;     // 噴射を始めたら、ジャンプの上昇はこの速さ（m/秒）までに抑える（跳んですぐ噴けば低く飛べる）
const JET_HOVER = 0.9;        // 低空では足元の地面からこの高さより下がらない（沈みで地面についてしまわないように）
const JET_HOVER_PULL = 5;     // その高さより下にいるときに戻す強さ（1/秒）
// 発射の反動：パンが砲口から出た瞬間に後ろへ押し戻される（下がる距離は 初速 / 減り方）
const FIRE_SHOT_FRAME = 107;  // 反動を受けるフレーム（発射アニメは 100 から。パンは PC_Muzzle の spawn_frame で出る）
const RECOIL_SPEED = 4;       // 押し戻しの初速（m/秒）
const RECOIL_DAMP = 8;        // 地面では約 0.5m 下がる
const RECOIL_DAMP_WATER = 3;  // 水の上と空中はすべるので約 1.3m 下がる
const RECOIL_SHAKE = 0.06;    // カメラのゆれ（m）
// 川に入ると船のように浮かんで、流れに運ばれる
const FLOAT_DRAFT = 0.6;      // 浮いているとき足元は水面からこれだけ下（胴の下が沈む）
const FLOAT_MIN_DEPTH = 0.3;  // これより浅いところは歩く（町の川は深さ 0.7m ほど）
const PADDLE_SPEED = 1.4;     // 水の上で漕いで進む速さ（Shift で PADDLE_SPEED_FAST）
const PADDLE_SPEED_FAST = 2.2;
const RIVER_FLOW = new THREE.Vector3(0, 0, 0.9);   // 川の流れ（+Z が下流、m/秒）
const FOG_MAX = 0.55;         // かすみは最大 55%
const SHADOW_RANGE = 55;      // 影を描く範囲（プレイヤーを中心に ±55m）
const WINDMILL_SPEED = 0.5;   // 風車の羽根（rad/秒）
// ボス（ばい菌）：仮置き。町の東の斜面の畑に、町（-X）のほうを向けて置く。高さ約33m
const BOSS_POS = new THREE.Vector3(88, 0, 22);   // Y は地面に合わせる
const BOSS_YAW = -Math.PI / 2;                    // モデルは +Z が正面（顔）

// THREE.Fog は 100% まで霞むので、最大値を抑える
THREE.ShaderChunk.fog_fragment = THREE.ShaderChunk.fog_fragment.replace(
  'mix( gl_FragColor.rgb, fogColor, fogFactor )',
  `mix( gl_FragColor.rgb, fogColor, fogFactor * ${FOG_MAX.toFixed(3)} )`
);

// ---- レンダラー・シーン ----
const renderer = new THREE.WebGLRenderer({ antialias: true });
// スマホなど指で操作する端末は解像度を少し落として軽くする
const IS_TOUCH_DEVICE = window.matchMedia('(pointer: coarse)').matches;
const TAP = IS_TOUCH_DEVICE ? 'タップ' : 'クリック';
renderer.setPixelRatio(Math.min(window.devicePixelRatio, IS_TOUCH_DEVICE ? 1.5 : 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.AgXToneMapping;
renderer.toneMappingExposure = Math.pow(2, 0.2);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.prepend(renderer.domElement);

const scene = new THREE.Scene();
const fogColor = lin(0.88, 0.80, 0.68);
// 町の奥の山（高さ 200m 以上、奥行き約 430m）が消えないよう、霞みの終わりを遠めにする
scene.fog = new THREE.Fog(fogColor, 60, 1000);
scene.background = fogColor;

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.05, 3000);
camera.rotation.order = 'YXZ';

// ---- ライト ----
// sunDir は太陽の向き（空に描く）、lightDir は影を落とす光の向き（昼は太陽、夜は月）。どちらも daytime.js が時刻に合わせて動かす
const sunDir = new THREE.Vector3(-0.468, 0.469, 0.749).normalize();
const lightDir = sunDir.clone();
skyUniforms.uSun.value = sunDir;
const sun = new THREE.DirectionalLight(lin(1.0, 0.78, 0.52), 3.0);
sun.castShadow = true;
sun.shadow.mapSize.set(4096, 4096);
Object.assign(sun.shadow.camera, { left: -SHADOW_RANGE, right: SHADOW_RANGE, top: SHADOW_RANGE, bottom: -SHADOW_RANGE, near: 1, far: 700 });
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.03;
scene.add(sun, sun.target);

// 町が山まで広がったので、影の範囲はプレイヤーについて動かす。
// 影の 1 ピクセル単位でずらさないと、歩くたびに影の縁がちらつく
const SUN_DISTANCE = 300;
const shadowTexel = (SHADOW_RANGE * 2) / sun.shadow.mapSize.x;
const sunX = new THREE.Vector3(), sunY = new THREE.Vector3();
function followShadow(center) {
  sunX.crossVectors(UP, lightDir).normalize();
  sunY.crossVectors(lightDir, sunX);
  const a = Math.round(center.dot(sunX) / shadowTexel) * shadowTexel;
  const b = Math.round(center.dot(sunY) / shadowTexel) * shadowTexel;
  sun.target.position.copy(sunX).multiplyScalar(a).addScaledVector(sunY, b).addScaledVector(lightDir, center.dot(lightDir));
  sun.position.copy(sun.target.position).addScaledVector(lightDir, SUN_DISTANCE);
}

const fill = new THREE.DirectionalLight(lin(0.65, 0.75, 1.0), 0.3);
fill.position.set(0.527, 0.574, -0.628).multiplyScalar(100);
scene.add(fill);

const ambient = lin(0.80, 0.72, 0.62);
const hemi = new THREE.HemisphereLight(ambient, ambient.clone().multiplyScalar(0.55), 0.7);
scene.add(hemi);

// ---- 空（球状のスカイドーム、グラデーション。色・太陽・月・星は daytime.js が時刻に合わせて変える） ----
const sky = new THREE.Mesh(
  new THREE.SphereGeometry(1500, 48, 24),
  new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    uniforms: skyUniforms,
    vertexShader: /* glsl */`
      varying vec3 vDir;
      void main() {
        vDir = normalize((modelMatrix * vec4(position, 0.0)).xyz);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        gl_Position.z = gl_Position.w; // 常に最奥
      }`,
    fragmentShader: /* glsl */`
      ${SKY_GLSL}
      varying vec3 vDir;
      void main() {
        vec3 d = normalize(vDir);
        float h = d.y;
        vec3 c = mix(cHorizon, cMid, smoothstep(0.0, 0.18, h));
        c = mix(c, cZenith, smoothstep(0.12, 1.0, h));
        c = skyExtras(d, c);
        float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
        c = max(mix(vec3(l), c, uSat), 0.0);
        gl_FragColor = vec4(c, 1.0);
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
  })
);
sky.renderOrder = -1;
scene.add(sky);

// ---- 手描きアニメ調の描画（実験。T キーで元の見た目と切り替え） ----
const time = { value: 0 };
const style = createAnimeStyle({ renderer, scene, camera, sun, fill, hemi, sky, sunDir, time });

// ---- 水面の流れ（UV が無いのでワールド座標で模様を作る） ----
const waterUniforms = { uTime: { value: 0 } };
function makeWater(mat) {
  mat.roughness = 0.15;
  mat.metalness = 0.0;
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = waterUniforms.uTime;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;')
      .replace('#include <common>', '#include <common>\nvarying vec3 vWNrm;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvWNrm = normalize(mat3(modelMatrix) * objectNormal);');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', /* glsl */`#include <common>
        uniform float uTime;
        varying vec3 vWPos;
        varying vec3 vWNrm;
        ${FOAM_GLSL}
        // 川は Z 方向に流れる
        float wave(vec2 p) {
          vec2 q = p * vec2(0.9, 0.35) + vec2(0.0, -uTime * 0.8);
          float a = sin(q.x * 3.1 + sin(q.y * 1.7) * 1.4) * sin(q.y * 2.3 + sin(q.x * 1.3 + uTime * 0.5));
          float b = sin(p.x * 1.9 + p.y * 0.7 - uTime * 1.3) * 0.5;
          float c = sin(p.x * -0.8 + p.y * 2.6 - uTime * 1.9) * 0.3;
          return (a + b + c) * 0.5;
        }`)
      .replace('#include <color_fragment>', /* glsl */`#include <color_fragment>
        float wv = wave(vWPos.xz);
        float fall = 1.0 - smoothstep(0.35, 0.6, abs(vWNrm.y));   // 滝（立っている水の面）
        diffuseColor.rgb *= mix(0.88 + 0.2 * wv, 1.0, fall);
        if (fall > 0.0) {
          // 流れ落ちる白い筋
          float h = dot(vWPos.xz, normalize(vec2(-vWNrm.z, vWNrm.x) + 1e-4));
          float y = vWPos.y + uTime * 3.2;
          float s = foamNoise(vec2(h * 3.0, y * 0.35)) * 0.6 + foamNoise(vec2(h * 7.0 + 4.0, y * 0.8)) * 0.4;
          float streak = smoothstep(0.55, 0.85, s);
          diffuseColor.rgb = mix(diffuseColor.rgb * 1.08, vec3(0.93, 0.98, 1.0), streak * 0.65 * fall);
        }`)
      .replace('#include <normal_fragment_maps>', /* glsl */`#include <normal_fragment_maps>
        if (abs(vWNrm.y) > 0.5) {
          float e = 0.08;
          float dx = wave(vWPos.xz + vec2(e, 0.0)) - wv;
          float dz = wave(vWPos.xz + vec2(0.0, e)) - wv;
          vec3 nW = normalize(vec3(-dx * 2.5, 1.0, -dz * 2.5));
          normal = normalize((viewMatrix * vec4(nW, 0.0)).xyz);
        }`);
  };
  mat.needsUpdate = true;
}

// ---- 滝の下の泡としぶき ----
// town.glb の泡（SL_Foam_*。白い板）は隠して、そこに流れていく泡の模様と、跳ね上がるしぶきを置く。
// 滝は川上（-Z）側にあり、泡は滝の足元から川下（+Z）へ流れて消えていく
const FOAM_TRAIL = 2.5;         // 泡の板の先へ、泡がうすれながら流れていく長さ（m）
const FOAM_GLSL = /* glsl */`
  vec2 foamHash(vec2 p) { p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return fract(sin(p) * 43758.5453); }
  float foamNoise(vec2 p) {
    vec2 i = floor(p), f = fract(p), u = f * f * (3.0 - 2.0 * f);
    return mix(mix(foamHash(i).x, foamHash(i + vec2(1, 0)).x, u.x), mix(foamHash(i + vec2(0, 1)).x, foamHash(i + vec2(1, 1)).x, u.x), u.y);
  }
  // 泡つぶ：セルの中心ほど 0（泡の穴）、ふちほど 1。セルの中心がゆらゆら動く
  float foamCells(vec2 x, float t) {
    vec2 n = floor(x), f = fract(x);
    float m = 8.0;
    for (int j = -1; j <= 1; j++) for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = foamHash(n + g);
      o = 0.5 + 0.4 * sin(t + 6.2831 * o);
      vec2 r = g + o - f;
      m = min(m, dot(r, r));
    }
    return sqrt(m);
  }`;
function makeFoamMaterial(padFrac) {
  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff, emissive: 0x141c20, transparent: true, depthWrite: false });
  mat.name = 'fuwao_foam';
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = waterUniforms.uTime;
    shader.uniforms.uPad = { value: padFrac };
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vWPos;\nvarying vec2 vFoamUv;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;\nvFoamUv = uv;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform float uTime, uPad;
        varying vec3 vWPos;
        varying vec2 vFoamUv;
        ${FOAM_GLSL}`)
      .replace('#include <color_fragment>', /* glsl */`#include <color_fragment>
        {
          float t = uTime;
          vec2 p = vWPos.xz;
          float v = 1.0 - vFoamUv.y;   // 0：滝の足元、1：流れていく先
          float side = smoothstep(0.0, 0.1, vFoamUv.x) * smoothstep(1.0, 0.9, vFoamUv.x);
          // 滝の足元で一番こく、川下へ行くほどうすくなる
          float dens = 1.0 - smoothstep(uPad * 0.3, 1.0, v);
          vec2 q = p + vec2(0.0, -t * 1.3);
          float big = foamNoise(q * 0.9) * 0.65 + foamNoise(q * 2.3 + 3.1) * 0.35;
          float c1 = foamCells(q * 2.6, t * 1.7);
          float c2 = foamCells(q * 5.5 + 11.0, t * 2.3);
          float rim = smoothstep(0.18, 0.5, c1) * 0.6 + smoothstep(0.15, 0.45, c2) * 0.4;
          // 滝の足元のわき立つ泡（ふくらんだり、しぼんだり）
          float boil = (1.0 - smoothstep(0.0, 0.35, v)) * (0.25 + 0.25 * sin(t * 5.0 + p.x * 2.7 + foamNoise(p * 1.7) * 6.0));
          float f = dens * (0.3 + 0.95 * big) + boil + rim * 0.25 - (1.0 - side) * 0.9;
          float a = smoothstep(0.42, 0.62, f);
          // 泡のふちは白く、すき間は水の色が少し透ける
          vec3 deep = vec3(0.55, 0.78, 0.86), white = vec3(1.0, 0.99, 0.97);
          diffuseColor.rgb = mix(deep, white, 0.35 + 0.65 * rim * smoothstep(0.4, 0.8, f));
          diffuseColor.a = a * (0.6 + 0.4 * rim);
        }`);
  };
  return mat;
}
// しぶき：滝の足元から跳ね上がって落ちる粒（頂点シェーダーで動かす。色は空の明るさに合わせる）
const sprayColor = { value: new THREE.Color(1, 1, 1) };
const sprayScale = { value: 400 };   // 1m の粒が、1m 先で何ピクセルか（画面の高さと画角から）
function makeSpray({ origin, width, power, count, size, opacity, life, spread }) {
  const g = new THREE.BufferGeometry();
  const seed = new Float32Array(count * 4);
  for (let i = 0; i < seed.length; i++) seed[i] = Math.random();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
  const mat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: {
      uTime: waterUniforms.uTime, uColor: sprayColor,
      uOrigin: { value: origin }, uWidth: { value: width }, uPower: { value: power }, uSpread: { value: spread },
      uSize: { value: size }, uScale: sprayScale, uOpacity: { value: opacity }, uLife: { value: life },
    },
    vertexShader: /* glsl */`
      attribute vec4 aSeed;
      uniform float uTime, uWidth, uPower, uSize, uScale, uLife, uSpread;
      uniform vec3 uOrigin;
      varying float vAlpha;
      void main() {
        float life = uLife * (0.7 + 0.6 * aSeed.z);
        float ph = fract(uTime / life + aSeed.y);
        float t = ph * life;
        vec3 vel = vec3((aSeed.w - 0.5) * uSpread, uPower * (0.6 + 0.8 * fract(aSeed.x * 13.7)), uSpread * (0.4 + fract(aSeed.z * 5.3)));
        vec3 pos = uOrigin + vec3((aSeed.x - 0.5) * uWidth, 0.0, 0.0) + vel * t;
        pos.y -= 4.9 * t * t;
        vAlpha = smoothstep(0.0, 0.12, ph) * (1.0 - smoothstep(0.55, 1.0, ph)) * step(uOrigin.y - 0.2, pos.y);
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = uSize * uScale * (0.6 + 0.8 * ph) / max(0.5, -mv.z);
      }`,
    fragmentShader: /* glsl */`
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d) * vAlpha * uOpacity;
        if (a < 0.01) discard;
        gl_FragColor = vec4(uColor, a);
      }`,
  });
  const pts = new THREE.Points(g, mat);
  pts.frustumCulled = false;
  // 輪郭線の回（法線と奥行きだけを描く）には入れない。点の大きさが決まらず、スマホでは大きな四角になって線が出るため
  pts.userData.noOutline = true;
  pts.renderOrder = 3;
  return pts;
}
// 泡の板（滝ごとに 1 枚）の場所から、泡としぶきを作る。merged：町を材質ごとにまとめたもの（元の白い板を隠す）
function setupFoam(townScene, merged) {
  const pads = [];
  fallPts = [];
  riverPts = riverPoints(merged);
  townScene.updateMatrixWorld(true);
  townScene.traverse((o) => { if (o.isMesh && /foam/i.test(o.material.name)) pads.push(new THREE.Box3().setFromObject(o)); });
  for (const m of merged.children) if (/foam/i.test(m.material.name)) m.visible = false;
  for (const b of pads) {
    const w = b.max.x - b.min.x, d = b.max.z - b.min.z, cx = (b.min.x + b.max.x) / 2, y = b.max.y + 0.02;
    const len = d + FOAM_TRAIL;
    const foam = new THREE.Mesh(new THREE.PlaneGeometry(w + 0.4, len), makeFoamMaterial(d / len));
    foam.rotation.x = -Math.PI / 2;
    foam.position.set(cx, y, b.min.z + len / 2);
    foam.receiveShadow = true;
    foam.renderOrder = 2;
    foam.userData.noOutline = true;   // 泡の板のふちに輪郭線を出さない
    scene.add(foam);
    foamObjs.push(foam);
    // 滝の高さ（川上の水面との差）で、しぶきの勢いを変える
    _o.set(cx, y + 60, b.min.z - 1.2);
    const up = waterCollider && cast(_o, DOWN, 120, waterCollider);
    const drop = THREE.MathUtils.clamp(up ? up.point.y - y : 1, 0.6, 5);
    const origin = new THREE.Vector3(cx, y, b.min.z + 0.25);
    fallPts.push({ at: origin.clone().setY(y + drop / 2), drop });
    foamObjs.push(...[makeSpray({ origin, width: w * 0.9, power: 1.6 + drop * 0.7, count: Math.round(w * 20), size: 0.1, opacity: 0.8, life: 0.9, spread: 1.4 }),
    // 細かい霧（大きく、うすく、ゆっくり）
      makeSpray({ origin, width: w, power: 0.8 + drop * 0.35, count: Math.round(w * 5), size: 0.9 + drop * 0.25, opacity: 0.18, life: 2.2, spread: 0.9 })].map((o) => { scene.add(o); return o; }));
  }
}
// 空の明るさ（朝・昼・夕方・夜）に合わせて、しぶきの色を変える
function updateSpray() {
  sprayScale.value = renderer.domElement.height / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2));
  const c = hemi.color, k = Math.min(1.1, hemi.intensity / 0.7) / Math.max(c.r, c.g, c.b, 1e-3);
  sprayColor.value.setRGB(c.r * k, c.g * k, c.b * k).lerp(_sprayWhite, 0.25).multiplyScalar(Math.min(1, 0.3 + hemi.intensity / 0.7));
}
const _sprayWhite = new THREE.Color(1, 1, 1);

// ---- 環境音（小川・滝） ----
// 川の水面に AMB_CELL ごとに置いた点と、滝（泡の板）の場所から、ふわおまでの距離で音量を決める。
// 左右の聞こえ方はカメラの向きで決める。一時停止中・工房の中・オープニング・エンディングでは消す。
// 音はモノラル 64kbps の MP3。iPhone では画面を押すまで鳴らせないので、ゲームを始めたときに用意する
const AMB = {
  stream: { file: 'sounds/stream.mp3', vol: 0.45, near: 2, far: 16 },      // 川のいちばん近い点からの距離（m）
  waterfall: { file: 'sounds/waterfall.mp3', vol: 0.9, near: 3, far: 28 }, // 滝からの距離（m）
  rumble: { file: 'sounds/rumble.mp3', vol: 0.6, near: 20, far: 100 },     // 脅威3 の地ひびき（町の崩壊の場面と、転がっている脅威3 からの距離（m））
};
const AMB_CELL = 2.5;      // 川の点の間隔（m）
const AMB_PAN = 0.7;       // 左右の振り分けの強さ（1 で片耳だけ）
const AMB_SMOOTH = 0.15;   // 音量が変わるときのなめらかさ（秒）
const AMB_EDGE = 0.06;     // MP3 の頭と終わりのすき間を飛ばしてくり返す（秒）
let audioCtx = null, riverPts = [], fallPts = [];
// 効果音（1 回鳴らす音）。右上の効果音ボタンで切れる。ゲームを始めたときに読みこんでおく（initAudio）
//   jump：ジャンプしたとき / bossLand：脅威1・2 が空から落ちてきて地面にぶつかったとき /
//   shot：パンが砲口から出たとき / explode：脅威3 がはじけ飛んだとき（最後の演出） /
//   equip：板チョコのタンク・魔法のパン種が、ロボに付いた瞬間
const SFX = {
  jump: { file: 'sounds/jump_small.mp3', vol: 0.6 },
  bossLand: { file: 'sounds/boss_land.mp3', vol: 1 },
  shot: { file: 'sounds/shot.mp3', vol: 0.6 },
  explode: { file: 'sounds/explode.mp3', vol: 1 },
  equip: { file: 'sounds/equip.mp3', vol: 0.7 },
  jet: { file: 'sounds/jet.mp3', vol: 0.8 },   // ジェット（updateJetSound で鳴らす。1 回鳴らす音ではない）
};
function playSfx(name) {
  const a = SFX[name];
  if (!audioCtx || !a?.buf || !soundOn.sfx) return;
  const src = audioCtx.createBufferSource();
  src.buffer = a.buf;
  const g = audioCtx.createGain();
  g.gain.value = a.vol;
  src.connect(g).connect(audioCtx.destination);
  src.start();
}
// ジェットの音：噴射し始めたら頭から鳴らし（だんだん強くなる音）、そのまま噴射している間は終わりの JET_LOOP をくり返す。
// 噴射をやめたら JET_FADE でしぼんで止まる
const JET_LOOP = [4.3, 4.79];   // くり返す所（秒）。音の大きさがそろっている終わりの所（MP3 の最後のすき間は使わない）
const JET_FADE = 0.25;
let jetSnd = null;   // { src, gain }
function updateJetSound(active) {
  const a = SFX.jet;
  const on = !!(active && jetting && audioCtx && a.buf && soundOn.sfx && !finale && !knockout);
  if (on && !jetSnd) {
    const src = audioCtx.createBufferSource();
    src.buffer = a.buf;
    src.loop = true;
    src.loopStart = JET_LOOP[0];
    src.loopEnd = Math.min(JET_LOOP[1], a.buf.duration);
    const gain = audioCtx.createGain();
    gain.gain.value = a.vol;
    src.connect(gain).connect(audioCtx.destination);
    src.start();
    jetSnd = { src, gain };
  } else if (!on && jetSnd) {
    const t = audioCtx.currentTime;
    jetSnd.gain.gain.setTargetAtTime(0, t, JET_FADE / 3);
    jetSnd.src.stop(t + JET_FADE * 1.5);
    jetSnd = null;
  }
}
// BGM：ステージごとの曲（いまはステージ 1・2 の曲だけ）。長いので、全部をほどいて持たずに少しずつ読みながら流す（<audio>）。
// 一時停止中・エンディング・ゲームオーバーでは消えていき、消えたら止める（つづきは止めたところから）。工房の中では小さめ
const BGM = [{ file: 'sounds/bgm_stage1-2.mp3', stages: [1, 2] }];
const BGM_VOL = 0.35;        // BGM の大きさ
const BGM_INDOOR = 0.6;      // 工房の中・オープニングでは、この倍
const BGM_FADE = 0.6;        // 大きさが変わるときのなめらかさ（秒）
const bgm = { el: null, gain: null, now: null };
// BGM と効果音の入・切（右上のボタン、M / K キー）。この端末に覚えておく
const SOUND_KEY = 'fuwao3d:sound';
const soundOn = { bgm: true, sfx: true };
try { Object.assign(soundOn, JSON.parse(localStorage.getItem(SOUND_KEY)) || {}); } catch { /* 保存できない環境 */ }
function setSound(kind, on) {
  soundOn[kind] = on;
  try { localStorage.setItem(SOUND_KEY, JSON.stringify(soundOn)); } catch { /* 保存できない環境 */ }
  document.getElementById(`${kind}Btn`).classList.toggle('off', !on);
  if (kind === 'bgm') updateBgm(playing);   // 押したその場で鳴らす（iPhone は押したときでないと鳴らせない）
}
for (const kind of ['bgm', 'sfx']) {
  const btn = document.getElementById(`${kind}Btn`);
  btn.classList.toggle('off', !soundOn[kind]);
  btn.addEventListener('pointerdown', (e) => e.stopPropagation());
  btn.addEventListener('click', (e) => { e.stopPropagation(); setSound(kind, !soundOn[kind]); btn.blur(); });
}
// 町の水の材質の頂点を、AMB_CELL のマスごとに 1 点にまとめる
function riverPoints(merged) {
  const cells = new Map(), v = new THREE.Vector3();
  for (const m of merged.children) {
    if (!isWater(m.material)) continue;
    m.updateMatrixWorld(true);
    const pos = m.geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld);
      const key = `${Math.floor(v.x / AMB_CELL)},${Math.floor(v.z / AMB_CELL)}`;
      const c = cells.get(key);
      if (c) { c.add(v); c.n++; } else { const p = v.clone(); p.n = 1; cells.set(key, p); }
    }
  }
  return [...cells.values()].map((p) => p.divideScalar(p.n));
}
// ゲームを始めたとき（押したとき）に呼ぶ。2 回目からは止まっていたら動かすだけ
function initAudio() {
  if (audioCtx) { audioCtx.resume?.(); updateBgm(true); return; }   // 再開も押したときなので、ここで鳴らし直す
  const Ctx = window.AudioContext || window.webkitAudioContext;
  if (!Ctx) return;
  // iPhone：Web Audio の音は、ふだんはマナーモードのスイッチで消える。BGM（<audio>）が流れている間だけは鳴るので、
  // BGM のないステージ 3 からは効果音まで消えていた。ゲームの音は「再生」の種類にして、BGM がなくても鳴るようにする（iOS 16.4〜）
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch { /* 対応していない環境 */ }
  audioCtx = new Ctx();
  audioCtx.resume?.();
  // BGM は <audio> を Web Audio につないで、大きさを変える
  bgm.el = new Audio();
  bgm.el.loop = true;
  bgm.el.preload = 'auto';
  bgm.gain = audioCtx.createGain();
  bgm.gain.gain.value = 0;
  audioCtx.createMediaElementSource(bgm.el).connect(bgm.gain).connect(audioCtx.destination);
  updateBgm(true);   // 押したその場で鳴らし始める（iPhone は押したときでないと鳴らせない）
  for (const a of Object.values(AMB)) {
    a.gain = audioCtx.createGain();
    a.gain.gain.value = 0;
    a.pan = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null;
    if (a.pan) a.gain.connect(a.pan).connect(audioCtx.destination); else a.gain.connect(audioCtx.destination);
    fetch(a.file).then((r) => r.arrayBuffer()).then((b) => new Promise((ok, ng) => audioCtx.decodeAudioData(b, ok, ng))).then((buf) => {
      const src = audioCtx.createBufferSource();
      src.buffer = buf;
      src.loop = true;
      src.loopStart = AMB_EDGE;
      src.loopEnd = buf.duration - AMB_EDGE;
      src.connect(a.gain);
      src.start(0, AMB_EDGE + Math.random() * (buf.duration - 3 * AMB_EDGE));   // 2 つの音の頭をずらす
    }).catch((e) => console.warn('環境音を読めませんでした', a.file, e));
  }
  for (const a of Object.values(SFX)) {
    fetch(a.file).then((r) => r.arrayBuffer()).then((b) => new Promise((ok, ng) => audioCtx.decodeAudioData(b, ok, ng)))
      .then((buf) => { a.buf = buf; }).catch((e) => console.warn('効果音を読めませんでした', a.file, e));
  }
}
document.addEventListener('visibilitychange', () => {
  if (!audioCtx) return;
  if (document.hidden) { audioCtx.suspend(); bgm.el?.pause(); } else audioCtx.resume();
});
const ambFalloff = (d, a) => d <= a.near ? 1 : d >= a.far ? 0 : ((a.far - d) / (a.far - a.near)) ** 2;
const _ambR = new THREE.Vector3(), _ambD = new THREE.Vector3();
// 音の来る方向（at）の左右（-1 左 〜 1 右）
function ambPan(at) {
  _ambR.setFromMatrixColumn(camera.matrixWorld, 0).setY(0).normalize();
  _ambD.subVectors(at, camera.position).setY(0);
  const len = _ambD.length();
  return len < 0.5 ? 0 : THREE.MathUtils.clamp(_ambD.dot(_ambR) / len, -1, 1) * AMB_PAN;
}
function setAmb(a, vol, pan) {
  if (!a.gain) return;
  const t = audioCtx.currentTime;
  a.gain.gain.setTargetAtTime(vol, t, AMB_SMOOTH);
  a.pan?.pan.setTargetAtTime(pan, t, AMB_SMOOTH);
}
// いまのステージの曲を、場面に合った大きさで流す
function updateBgm(on) {
  if (!bgm.el) return;
  const over = endingEl.classList.contains('on') || document.getElementById('gameover').classList.contains('on');
  const song = BGM.find((b) => b.stages.includes(storyStage)) || null;
  if (song !== bgm.now && song) { bgm.el.src = song.file; bgm.now = song; }
  const vol = on && soundOn.bgm && !over && song === bgm.now && song ? BGM_VOL * (opening || visit ? BGM_INDOOR : 1) : 0;
  bgm.gain.gain.setTargetAtTime(vol, audioCtx.currentTime, BGM_FADE / 3);
  if (vol > 0 && bgm.el.paused && !document.hidden) bgm.el.play().catch(() => {});
  else if (vol === 0 && !bgm.el.paused && bgm.gain.gain.value < 0.005) bgm.el.pause();
}
function updateAmbient(on) {
  if (!audioCtx) return;
  updateBgm(on);
  const quiet = !on || !soundOn.sfx || opening || visit || endingEl.classList.contains('on') || document.getElementById('gameover').classList.contains('on');
  // 小川：いちばん近い川の点
  let best = null, bd = Infinity;
  if (!quiet) for (const p of riverPts) { const d = p.distanceToSquared(feet); if (d < bd) { bd = d; best = p; } }
  setAmb(AMB.stream, best ? AMB.stream.vol * ambFalloff(Math.sqrt(bd), AMB.stream) : 0, best ? ambPan(best) : 0);
  // 滝：いちばん大きく聞こえる滝（高い滝ほど大きい）
  let fv = 0, fat = null;
  if (!quiet) for (const f of fallPts) {
    const v = ambFalloff(f.at.distanceTo(feet), AMB.waterfall) * THREE.MathUtils.clamp(f.drop / 3, 0.35, 1);
    if (v > fv) { fv = v; fat = f.at; }
  }
  setAmb(AMB.waterfall, AMB.waterfall.vol * fv, fat ? ambPan(fat) : 0);
  // 脅威3 の地ひびき：町の崩壊の場面ではだんだん大きく。町を転がっている間は、近いほど大きく
  let rv = 0, rat = null;
  if (!quiet && collapse) rv = [0.45, 0.75, 1][Math.max(0, collapse.cut)] ?? 1;
  else if (!quiet && boss && bossRoaming() && rolling > 0) { rat = boss.position; rv = ambFalloff(Math.hypot(rat.x - feet.x, rat.z - feet.z), AMB.rumble); }
  setAmb(AMB.rumble, AMB.rumble.vol * rv, rat ? ambPan(rat) : 0);
}

// ---- 読み込み ----
const overlay = document.getElementById('overlay');
const startLabel = document.getElementById('startLabel');
const statusEl = document.getElementById('status');
const progressBar = document.querySelector('#progress div');
const hud = document.getElementById('hud');
const crosshair = document.getElementById('crosshair');

// ?collapsed：ボス3の後の倒壊した町（town_collapsed.glb）に差し替えて見る（テスト用）。
// 廃墟の部品（ヘドロ・ガレキ）は重ねず、区画の分け方とくすみだけ使う
const COLLAPSED = new URLSearchParams(location.search).has('collapsed');
const FILES = [COLLAPSED ? 'models/town_collapsed.glb' : 'models/town.glb', 'models/distant.glb', 'models/pancannon.glb', 'models/germboss.glb', 'models/bread.glb', 'models/grandpa.glb', 'models/girl.glb', 'models/grandma.glb', 'models/town_ruin.glb', 'models/mayor.glb', 'models/germmini.glb', 'models/workshop.glb', 'models/chief.glb', 'models/baker.glb', 'models/sludgeboss.glb', 'models/rockboss.glb', 'models/choco.glb', 'models/choco_tank.glb', 'models/yeast.glb', 'models/yeast_cannon.glb', 'models/mecha_wreck.glb'];
const loaded = {}, total = {};
// 公開版のモデルは meshopt で圧縮してある（25MB を超えるファイルは置けないため）
const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
// Blender から書き出し直したモデルが古いキャッシュで読まれないよう、毎回サーバーに更新を確認する
// （変わっていなければ 304 が返るだけなので軽い）
async function load(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${url} (${res.status})`);
  total[url] = Number(res.headers.get('Content-Length')) || 0;
  const reader = res.body.getReader();
  const chunks = [];
  let size = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    size += value.length;
    loaded[url] = size;
    const L = Object.values(loaded).reduce((a, b) => a + b, 0);
    const T = Math.max(1, Object.values(total).reduce((a, b) => a + b, 0));
    progressBar.style.width = `${Math.min(100, (L / T) * 100).toFixed(1)}%`;
    statusEl.textContent = `読み込み中… ${(L / 1048576).toFixed(1)} MB`;
  }
  const buf = new Uint8Array(size);
  let offset = 0;
  for (const c of chunks) { buf.set(c, offset); offset += c.length; }
  return loader.parseAsync(buf.buffer, url.slice(0, url.lastIndexOf('/') + 1));
}

// 同じマテリアルのメッシュをワールド座標で 1 つに結合する（描画呼び出しを減らす）
function mergeByMaterial(root, { castShadow = true, receiveShadow = true } = {}) {
  root.updateMatrixWorld(true);
  const groups = new Map();
  root.traverse((o) => {
    if (!o.isMesh) return;
    const g = o.geometry.clone();
    for (const name of Object.keys(g.attributes)) if (name !== 'position' && name !== 'normal') g.deleteAttribute(name);
    // 圧縮したモデルは座標が整数で入っているので、ワールド座標へ動かす前に小数へ戻す
    for (const name of ['position', 'normal']) {
      const a = g.attributes[name];
      if (a && !(a.array instanceof Float32Array)) {
        const f = new Float32Array(a.count * 3);
        for (let i = 0; i < a.count; i++) { f[i * 3] = a.getX(i); f[i * 3 + 1] = a.getY(i); f[i * 3 + 2] = a.getZ(i); }
        g.setAttribute(name, new THREE.BufferAttribute(f, 3));
      }
    }
    if (!g.attributes.normal) g.computeVertexNormals();
    g.applyMatrix4(o.matrixWorld);
    if (!g.index) g.setIndex([...Array(g.attributes.position.count).keys()]);
    if (!groups.has(o.material)) groups.set(o.material, { meshes: [], geos: [] });
    groups.get(o.material).meshes.push(o);
    groups.get(o.material).geos.push(g);
  });
  const out = new THREE.Group();
  for (const [mat, { meshes, geos }] of groups) {
    const merged = new THREE.Mesh(mergeGeometries(geos), mat);
    merged.name = mat.name;
    merged.userData.sourceNames = meshes.map((m) => m.name);
    merged.castShadow = castShadow;
    merged.receiveShadow = receiveShadow;
    out.add(merged);
    geos.forEach((g) => g.dispose());
  }
  return out;
}

const isWater = (mat) => /water/i.test(mat.name);

// distant.glb の材質は色が書き出されず、Blender の既定の灰色（0.8）になっている。
// 灰色のままのときだけ仮の色を当てる（正しく書き出し直せばそちらが使われる）
const DISTANT_COLORS = {
  EXP_DS_castle_wall: 0xe6d8bc, EXP_DS_castle_roof: 0x6f8cc4, EXP_DS_castle_window: 0x4a4658,
  EXP_DS_flag: 0xd4503c, EXP_DS_hill: 0xa4b07c, EXP_DS_tree: 0x6a8a52,
  EXP_AP_grass: 0x9fb06e, EXP_CL_rock: 0x9c8f7c,
};
function fixUnexportedColor(mat) {
  const hex = DISTANT_COLORS[mat.name];
  const c = mat.color;
  if (hex !== undefined && Math.abs(c.r - 0.8) < 1e-3 && c.r === c.g && c.g === c.b) c.setHex(hex);
}
// ツタ・葉・花はすり抜ける（石段に垂れたツタで通れなくなるため）。滝の下の泡も水の一部なのですり抜ける
// 麦畑の区画（厚さ約1mの塊）も中を歩けるようにすり抜ける
const isPassThrough = (mat) => /ivy|leaf|flower|lily|foam|wheat/i.test(mat.name);

// ---- 当たり判定（地形・建物を 1 つの BVH に） ----
// 水面は別の判定にして「入れない場所」として扱う
let collider = null;
let colliders = [];      // collider と、廃墟の区画ごとに変わる部分（ruinCollider）
let waterCollider = null, leafCollider = null;
function bvhMesh(meshes) {
  const geo = mergeGeometries(meshes.map((m) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', m.geometry.attributes.position);
    g.setIndex(m.geometry.index);
    return g;
  }));
  geo.boundsTree = new MeshBVH(geo);
  const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
  mesh.raycast = acceleratedRaycast;
  mesh.updateMatrixWorld();
  return mesh;
}
// 広場の出店（PZ_Stall_N_*）は、地面から屋根の上までを 1 つの箱として当たる。
// 台（高さ 0.9m）の上から屋根までは 1.3m しかなく、ロボが台に乗ると屋根につかえて動けなくなるため。屋根の上には乗れる
function stallBlocks(root) {
  const boxes = new Map();
  root.updateMatrixWorld(true);
  root.traverse((o) => {
    const m = o.isMesh && /^PZ_Stall_(\d+)_/.exec(o.name);
    if (!m) return;
    if (!boxes.has(m[1])) boxes.set(m[1], { base: new THREE.Box3(), top: -Infinity });
    const b = boxes.get(m[1]), box = new THREE.Box3().setFromObject(o);
    if (/awning/i.test(o.material.name)) b.top = Math.max(b.top, box.max.y);
    else b.base.union(box);   // 柱と台（屋根のひさしは含めない）
  });
  return [...boxes.values()].filter((b) => b.top > -Infinity).map(({ base, top }) => {
    const g = new THREE.BoxGeometry(base.max.x - base.min.x, top - base.min.y, base.max.z - base.min.z);
    g.translate((base.min.x + base.max.x) / 2, (base.min.y + top) / 2, (base.min.z + base.max.z) / 2);
    return new THREE.Mesh(g);
  });
}
// extraWater: 廃墟の間は隠している噴水の水など（入れない場所なのは変わらない）
// extraSolid: 見えない当たりの箱（出店など）
function buildCollider(groups, extraWater = [], extraSolid = []) {
  const all = groups.flatMap((g) => g.children);
  collider = bvhMesh([...all.filter((m) => !isWater(m.material) && !isPassThrough(m.material)), ...extraSolid]);
  waterCollider = bvhMesh([...all, ...extraWater].filter((m) => isWater(m.material)));
  colliders = [collider];
  const leaves = all.filter((m) => /leaf/i.test(m.material.name));
  leafCollider = leaves.length ? bvhMesh(leaves) : null;   // 木の葉（すり抜けるが、カメラの見通しはさえぎる）
}

const ray = new THREE.Raycaster();
ray.firstHitOnly = true;
function cast(origin, dir, far, target = colliders) {
  ray.set(origin, dir);
  ray.far = far;
  const hits = Array.isArray(target) ? ray.intersectObjects(target, false) : ray.intersectObject(target, false);
  return hits[0] || null;
}

// ---- 廃墟の町（town_ruin.glb） ----
// パン工房以外の 10 区画が廃墟の状態から始まり、区画ごとに元の町へ戻す。廃墟の間は
// town.glb の一部（区画の extras.ru_hide）を隠し、town_ruin.glb の部品（ヘドロ・ガレキ・崩れた家）をかぶせ、
// 区画の範囲（extras.ru_tint_boxes）の色をシェーダーでくすませる
const RUIN_PAD = [1.5, 3];   // 範囲の外 1.5m まではそのままくすませ、3m で消える（家の裏が範囲から少しはみ出しているため）
const RUIN_FADE = 1.5;       // 戻すとき、廃墟の部品が消えるまで（秒）
const RUIN_TINT_FADE = 3;    // 戻すとき、色が戻るまで（秒）
const WORKSHOP_BOX = [-17, -41.5, 2, -26];   // パン工房（WS_*）は範囲に入っていてもくすませない
const ruinAreas = [];
const ruinUniforms = { uRuinBox: { value: [] }, uRuinAmt: { value: [] } };
let ruinCollider = null;

// 町の材質に「範囲の中ならくすませる」処理を足す（アニメ調の材質にも引き継がれる）
function addRuinTint(mat) {
  const prev = mat.onBeforeCompile;
  const key = mat.customProgramCacheKey();
  mat.onBeforeCompile = (shader, r) => {
    prev.call(mat, shader, r);
    const n = ruinUniforms.uRuinAmt.value.length;   // 全区画を読み込んだあとに組み立てられる
    Object.assign(shader.uniforms, ruinUniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vRuinPos;')
      .replace('#include <project_vertex>', '#include <project_vertex>\nvRuinPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
        uniform vec4 uRuinBox[${n}];
        uniform float uRuinAmt[${n}];
        varying vec3 vRuinPos;`)
      .replace('#include <color_fragment>', /* glsl */`#include <color_fragment>
        {
          vec2 p = vRuinPos.xz;
          float ru = 0.0;
          for (int i = 0; i < ${n}; i++) {
            vec2 d = max(max(uRuinBox[i].xy - p, p - uRuinBox[i].zw), 0.0);
            ru = max(ru, uRuinAmt[i] * (1.0 - smoothstep(${RUIN_PAD[0].toFixed(1)}, ${RUIN_PAD[1].toFixed(1)}, length(d))));
          }
          if (p.x > ${WORKSHOP_BOX[0].toFixed(1)} && p.x < ${WORKSHOP_BOX[2].toFixed(1)} && p.y > ${WORKSHOP_BOX[1].toFixed(1)} && p.y < ${WORKSHOP_BOX[3].toFixed(1)}) ru = 0.0;
          float l = dot(diffuseColor.rgb, vec3(0.299, 0.587, 0.114));
          vec3 dull = mix(vec3(l), diffuseColor.rgb, 0.35) * 0.78 * vec3(0.97, 0.95, 1.0);
          diffuseColor.rgb = mix(diffuseColor.rgb, dull, ru);
        }`);
  };
  mat.customProgramCacheKey = () => `${key}|ruin`;
  mat.needsUpdate = true;
}

// 町を結合する前に呼ぶ。隠すノードを町から外して区画ごとにまとめ、廃墟の部品を区画ごとに結合する。
// 返り値は町の材質（くすませる対象）
function setupRuin(townRoot, ruinRoot) {
  townRoot.updateMatrixWorld(true);
  ruinRoot.updateMatrixWorld(true);
  const byName = new Map();
  const townMats = new Map();
  townRoot.traverse((o) => {
    if (o.name) byName.set(o.name, o);
    if (o.isMesh) townMats.set(o.material.name, o.material);
  });
  const inWindmill = new Set();
  windmill?.traverse((o) => { byName.set(o.name, o); inWindmill.add(o); });

  for (const node of [...ruinRoot.children]) {
    const hideSet = new Set(JSON.parse(node.userData.ru_hide || '[]'));
    // 隠す家に付いている出窓・看板・煙突などは、隠すリストに無ければ町に残す（Blender と同じ見た目）
    const hiddenObjs = [...hideSet].map((name) => byName.get(name)).filter(Boolean);
    for (const o of hiddenObjs) {
      for (const c of [...o.children]) if (!hideSet.has(c.name)) (inWindmill.has(o) ? o.parent : townRoot).attach(c);
    }
    const hidden = new THREE.Group();
    const toggles = [];   // 回している風車の羽根は結合せず、表示だけ切り替える
    for (const o of hiddenObjs) {
      if (inWindmill.has(o)) { o.visible = false; toggles.push(o); }
      else if (!hideSet.has(o.parent?.name)) hidden.attach(o);
    }
    const hiddenMerged = mergeByMaterial(hidden);
    hiddenMerged.visible = false;
    scene.add(hiddenMerged);

    // 廃墟の部品。区画ごとに材質を複製しておく（戻すときに区画だけ透明にして消すため）。
    // 崩れた家は町と同じ材質の複製にして、町と同じようにくすませる
    const own = new Map();
    const copy = (m, tint) => {
      if (!own.has(m)) {
        const c = m.clone();
        if (tint) addRuinTint(c);
        own.set(m, c);
      }
      return own.get(m);
    };
    const solid = new THREE.Group(), cover = new THREE.Group();
    for (const part of [...node.children]) {
      const house = !!part.userData.ru_tinted;
      part.traverse((o) => {
        if (o.isMesh) o.material = house ? copy(townMats.get(o.material.name) || o.material, true) : copy(o.material, false);
      });
      // 崩れた家・ガレキ・枯れ木はぶつかる。壁や地面に貼りついたヘドロや板は見た目だけ
      (house || /_(Debris\d*|DeadTrees)$/.test(part.name) ? solid : cover).attach(part);
    }
    const ruin = new THREE.Group();
    const solidMerged = mergeByMaterial(solid);
    ruin.add(solidMerged, mergeByMaterial(cover));
    scene.add(ruin);

    const boxes = JSON.parse(node.userData.ru_tint_boxes || '[]');
    const boxIdx = boxes.map((b) => {
      ruinUniforms.uRuinBox.value.push(new THREE.Vector4(...b));
      return ruinUniforms.uRuinAmt.value.push(1) - 1;
    });
    ruinAreas.push({
      name: node.name, ruin, hidden: hiddenMerged, toggles, boxIdx,
      ruinSolid: solidMerged.children.filter((m) => !isPassThrough(m.material)),
      townSolid: hiddenMerged.children.filter((m) => !isWater(m.material) && !isPassThrough(m.material)),
      restored: false, fade: 0, boxes,
    });
  }
  return townMats;
}

// 区画ごとに変わる当たり判定（廃墟ならガレキと崩れた家、戻した区画は隠していた屋台や木）
function rebuildRuinCollider() {
  const meshes = ruinAreas.flatMap((a) => (a.restored ? a.townSolid : a.ruinSolid));
  ruinCollider?.geometry.dispose();
  ruinCollider = meshes.length ? bvhMesh(meshes) : null;
  colliders = ruinCollider ? [collider, ruinCollider] : [collider];
}

// 区画を元の町に戻す（パンを届けたときなどに呼ぶ）。部品は薄くなって消え、色は数秒かけて戻る
function restoreArea(name) {
  const a = ruinAreas.find((x) => x.name === name || x.name === `RU_${name}`);
  if (!a || a.restored) return false;
  a.restored = true;
  a.back = undefined;   // 廃墟に戻っていく途中なら、そこでやめる
  a.hidden.visible = true;
  a.toggles.forEach((o) => { o.visible = true; });
  a.ruin.traverse((o) => {
    if (!o.isMesh) return;
    for (const m of new Set([o.material, o.userData.pbrMaterial])) if (m) { m.transparent = true; m.depthWrite = false; }
  });
  rebuildRuinCollider();
  return true;
}

// 元に戻した区画を、また廃墟にする（脅威の攻撃で崩れたとき）。部品はすっと現れ、色もくすんでいく
const RUIN_BACK = 1.2;        // 廃墟の部品が現れるまで・色がくすむまで（秒）
function unrestoreArea(i) {
  const a = ruinAreas[i];
  if (!a || !a.restored) return false;
  a.restored = false;
  a.back = 0;
  a.backFrom = 1 - Math.min(1, a.fade / RUIN_TINT_FADE);   // 色が戻りきる前に崩れたときは、その途中から
  a.fade = 0;
  a.hidden.visible = false;
  a.toggles.forEach((o) => { o.visible = false; });
  if (!a.ruin.parent) scene.add(a.ruin);
  a.ruin.visible = true;
  rebuildRuinCollider();
  return true;
}
function updateRuin(dt) {
  for (const a of ruinAreas) {
    // 廃墟に戻っていくところ
    if (!a.restored && a.back !== undefined && a.back < 1) {
      a.back = Math.min(1, a.back + dt / RUIN_BACK);
      for (const i of a.boxIdx) ruinUniforms.uRuinAmt.value[i] = Math.max(a.backFrom, a.back);
      a.ruin.traverse((o) => {
        if (!o.isMesh) return;
        for (const m of new Set([o.material, o.userData.pbrMaterial])) {
          if (!m) continue;
          m.opacity = a.back;
          if (a.back >= 1) { m.transparent = false; m.depthWrite = true; m.opacity = 1; }
        }
      });
      continue;
    }
    if (!a.restored || a.fade >= RUIN_TINT_FADE) continue;
    a.fade = Math.min(RUIN_TINT_FADE, a.fade + dt);
    for (const i of a.boxIdx) ruinUniforms.uRuinAmt.value[i] = 1 - a.fade / RUIN_TINT_FADE;
    if (!a.ruin.parent) continue;
    const k = Math.min(1, a.fade / RUIN_FADE);
    a.ruin.traverse((o) => {
      if (o.isMesh) for (const m of new Set([o.material, o.userData.pbrMaterial])) if (m) m.opacity = 1 - k;
    });
    if (k >= 1) scene.remove(a.ruin);   // 部品は捨てずに取っておく（脅威の攻撃で、また崩れることがある）
  }
}

// ---- ふわお（パン射出ロボの操縦席に乗っている） ----
const player = new THREE.Group();   // 位置と向き。中にロボのモデルを入れる
let model = null;
let mixer = null;
let walkAction = null, idleAction = null, fireAction = null, airAction = null, jetAction = null, jetFxAction = null;
let fireOffset = new THREE.Vector3();
let firing = false;
let fireDone = false;   // 発射アニメが最後まで行った（次のフレームで立ちに戻す）
let walkWeight = 0;
let airWeight = 0, jetWeight = 0;

const ANIM_FPS = 24;
// docs: フレーム 1〜97 歩き / 100〜170 溜め・発射・弾・煙 / 180〜220 ジャンプ / 230〜302 ジェット噴射
const JUMP_START = 180, JET_START = 230;

// ルート（PC_Rig_Root）の移動をアニメから消し、移動はコードで行う。
// 足（PC_Rig_Foot_*）とジェットの煙（FX_JetPuff_*）はルートの子ではなく自分で動いているので、
// ルートの移動分をそれらからも引く（煙はその場に残る作りなので、引くとロボの後ろへ流れていく）
const NOT_UNDER_ROOT = /^(PC_Rig_Foot_[LR]|FX_JetPuff_\d+)\.position$/;
function stripRootMotion(clip, axes) {
  const root = clip.tracks.find((t) => t.name === 'PC_Rig_Root.position');
  if (!root) return;
  const rootAt = root.createInterpolant();
  for (const track of clip.tracks) {
    if (!NOT_UNDER_ROOT.test(track.name)) continue;
    for (let k = 0; k < track.times.length; k++) {
      const r = rootAt.evaluate(track.times[k]);
      for (const a of axes) track.values[k * 3 + a] -= r[a];
    }
  }
  for (let i = 0; i < root.values.length; i += 3) for (const a of axes) root.values[i + a] = 0;
}

function setupAnimations(clips) {
  // クリップはオブジェクトごとに分かれているので 1 本にまとめてから切り出す
  const all = new THREE.AnimationClip('all', -1, clips.flatMap((c) => c.tracks));
  const walk = THREE.AnimationUtils.subclip(all, 'walk', 1, 97, ANIM_FPS);
  const fire = THREE.AnimationUtils.subclip(all, 'fire', 100, 170, ANIM_FPS);
  const air = THREE.AnimationUtils.subclip(all, 'air', JUMP_START, 220, ANIM_FPS);
  const jet = THREE.AnimationUtils.subclip(all, 'jet', JET_START, 302, ANIM_FPS);

  // 歩きはその場で足踏み（上下の弾みは残す）。ジャンプとジェットの上昇・前進は物理で動かす
  stripRootMotion(walk, [0, 2]);
  stripRootMotion(air, [0, 1, 2]);
  stripRootMotion(jet, [0, 1, 2]);

  // ジェットの炎と煙（FX_Jet*）は別のアニメに分けて常に重み 1 で動かす。
  // 発射中（発射アニメが全身にかかる）でも、噴射していれば炎が消えないように
  const isJetFx = (t) => t.name.startsWith('FX_Jet');
  const jetFx = new THREE.AnimationClip('jetFx', jet.duration, jet.tracks.filter(isJetFx));
  for (const clip of [walk, fire, air, jet]) clip.tracks = clip.tracks.filter((t) => !isJetFx(t));
  // 発射は歩き終わった位置（約1.4m先）が基準で、閃光や煙もその位置に置かれている。
  // アニメはそのままにして、モデル全体をその分だけ後ろへずらす
  const fireRoot = fire.tracks.find((t) => t.name === 'PC_Rig_Root.position');
  if (fireRoot) fireOffset.set(-fireRoot.values[0], 0, -fireRoot.values[2]);

  const idle = walk.clone();
  idle.name = 'idle';

  walkAction = mixer.clipAction(walk);
  idleAction = mixer.clipAction(idle);
  fireAction = mixer.clipAction(fire);
  airAction = mixer.clipAction(air);
  jetAction = mixer.clipAction(jet);
  jetFxAction = mixer.clipAction(jetFx);
  walkAction.play().setEffectiveWeight(0);
  idleAction.play().setEffectiveWeight(1);
  idleAction.paused = true;   // 歩きの最初のポーズで止めて「立ち」にする
  // ジャンプとジェットは再生せず、状態に合わせてフレームを直接決める（updateAnimation）
  for (const a of [airAction, jetAction]) { a.play().setEffectiveWeight(0); a.paused = true; }
  jetFxAction.play().setEffectiveWeight(1);
  jetFxAction.paused = true;
  fireAction.setLoop(THREE.LoopOnce, 1);
  fireAction.timeScale = 1.4;
  // 終わった瞬間（mixer.update の途中）に止めると、その 1 フレームだけどのアニメもかからず
  // 書き出し時の姿勢が映ってしまう。最後の姿勢で止めておき、次のフレームで立ちに戻す
  fireAction.clampWhenFinished = true;
  mixer.addEventListener('finished', (e) => {
    if (e.action === fireAction) fireDone = true;
  });
}

// 魔法のパン種を撃ってよいときか（撃てるのは一度きり）：脅威3 の顔の正面で、顔と同じ高さにいるとき（yeastAim）
function yeastShotReady() {
  return yeastAim(_yf);
}
function fire() {
  // 地上でも空中（ジャンプ・ジェット中）でも撃てる。パンが出たあとなら、発射アニメの途中でも次を撃てる（連射）
  if ((firing && !shotSpawned) || !fireAction || knockout || retreat) return;
  // 魔法のパン種が砲口にくっついていると、パンは出ない。はじめてのときは町長が止めに来る
  if (items.has('yeast') && !items.has('flour')) {
    showToast('発射しない。種がくっついている');
    if (!mayorWarned && !finale && !talk.active) startMayorWarn();
    return;
  }
  // 打ち粉をまぶすと、パン種を撃てる。撃てるのは一度きりなので、ねらいが合うまでは撃たない
  if (items.has('flour')) {
    if (finale) return;
    if (!yeastShotReady()) { showToast('今は発射すべきではない。脅威の顔の正面、同じ高さで撃とう。チャンスは一度きりだ'); return; }
    startYeastShot();
    return;
  }
  firing = true;
  recoiled = false;
  shotSpawned = false;
  fireAction.reset().setEffectiveWeight(1).play();
}

if (new URLSearchParams(location.search).has('debug')) {
  window.__fuwao = {
    THREE, cast, get feet() { return feet; }, camera, respawn, player,
    get view() { return view; },
    get heading() { return heading; },
    render() { style.render(); },
    style,
    // 手動で数フレーム進める（ブラウザが非表示で rAF が止まっているとき用）
    step(codes, seconds, dt = 1 / 60) {
      codes.forEach((c) => keys.add(c));
      for (let t = 0; t < seconds; t += dt) tick(dt, true);
      codes.forEach((c) => keys.delete(c));
      return feet.toArray().map((v) => +v.toFixed(2));
    },
    fire,
    get jetting() { return jetting; },
    get floating() { return floating; },
    get mixer() { return mixer; },
    get boss() { return boss; },
    bossDistance,
    get germs() { return germs; },
    spawnGerm,
    get breads() { return breads; },
    get residents() { return residents; },
    // 環境音の様子（川の点の数、滝の場所と高さ、いまの音量）
    get ambient() { return { ctx: audioCtx?.state, bgm: bgm.now?.file, bgmVol: bgm.gain?.gain.value, bgmPlaying: bgm.el ? !bgm.el.paused : null, bgmTime: bgm.el?.currentTime, river: riverPts.length, falls: fallPts.map((f) => [...f.at.toArray().map((v) => +v.toFixed(1)), +f.drop.toFixed(1)]), stream: AMB.stream.gain?.gain.value, waterfall: AMB.waterfall.gain?.gain.value, rumble: AMB.rumble.gain?.gain.value, sfx: Object.fromEntries(Object.entries(SFX).map(([k, a]) => [k, !!a.buf])) }; },
    get waterCollider() { return waterCollider; },
    // 例: __fuwao.restore('Plaza')。区画の名前は __fuwao.ruinAreas
    get ruinAreas() { return ruinAreas.map((a) => `${a.name}${a.restored ? '（戻した）' : ''}`); },
    restore: restoreArea,
    restoreAll() { ruinAreas.forEach((a) => restoreArea(a.name)); },
    // 例: __fuwao.daytime.set(18.5)
    get daytime() { return daytime; },
    get opening() { return opening; },
    get room() { return room; },
    get meters() {
      return { town: townProgress(), fuel, fuelMax, body, gen: fuwaoNo, knockout,
        areas: ruinAreas.map((a, i) => `${AREA_NAMES[a.name]} ${Math.round(areaProgress(i) * 100)}% (spots ${areaGauge[i].spots.length}, out ${areaGauge[i].germs.length}, residents ${areaGauge[i].residents.length})`) };
    },
    get stage() { return storyStage; }, set stage(v) { storyStage = v; },
    talkScript(i) { return talkScript(residents[i]); },
    get residentAreas() { return residents.map((r) => `${r.id} ${r.kindName} → 区画${areaNumber(areaAt(r.home.x, r.home.z))}`); },
    retreat() { if (!retreat && !bossGone) startRetreat(); },
    appear() { if (!bossAppeared && !bossIntro) startBossIntro(); },
    get collapse() { return collapse; }, get finale() { return finale; }, startFinale, startMayorWarn, get townCollapsed() { return townCollapsed; }, useBoss, get bossIndex() { return bossIndex; },
    get items() { return [...items]; }, giveItem(k) { items.add(k); }, noon: makeHungry, enterWorkshop, saveGame, readSave, clearSave, startGame, get visit() { return visit; }, get hungry() { return residents.filter((r) => r.hungry).map((r) => r.id); }, get intro() { return bossIntro; }, get appeared() { return bossAppeared; },
    get retreating() { return !!retreat; }, get bossGone() { return bossGone; }, get bossSolid() { return bossSolid; }, get groundUniforms() { return groundUniforms; },
    attackTown, get quake() { return quake; },
    get spots() { return ruinAreas.map((a, i) => [AREA_NAMES[a.name], areaGauge[i].spots.map((p) => [+p.x.toFixed(1), +p.z.toFixed(1)])]); },
    get helps() { return helps.map((h) => [AREA_NAMES[ruinAreas[h.area].name], Math.round(h.dist || 0)]); },
    setFuel(v) { fuel = v; }, setBody(v) { body = v; }, hurt: hurtBody, raiseFuelMax,
    germSpots() { return germs.map((g) => [g.area, ...g.root.position.toArray().map((v) => +v.toFixed(1))]); },
    endOpening() { if (opening) endOpening(); },
    // 例: __fuwao.talk(3)（residents の番号の人と話す）
    talk(i) { startTalk(residents[i]); },
    advanceTalk,
  };
}

// 風車の羽根は Blender ではドライバーで回していて書き出されていないので、ここで回す。
// ハブと羽根 4 枚を結合から外し、ハブの位置を軸（ワールドの Z 方向）にしたグループへ移す
let windmill = null;
function takeWindmillRotor(root) {
  root.updateMatrixWorld(true);
  const parts = [];
  root.traverse((o) => { if (/^WM_(Hub|Sail\d)$/.test(o.name)) parts.push(o); });
  const hub = parts.find((o) => o.name === 'WM_Hub');
  const pivot = new THREE.Group();
  pivot.name = 'WM_Rotor';
  if (hub) hub.getWorldPosition(pivot.position);
  pivot.updateMatrixWorld();
  for (const o of parts) {
    pivot.attach(o);
    o.traverse((m) => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
  }
  return pivot;
}

// glb の 1 本のタイムラインを、ルートの extras.clips（{"名前": [始め, 終わり]}）で切り分ける
function clipsFromExtras(root, clips) {
  const all = new THREE.AnimationClip('all', -1, clips.flatMap((c) => c.tracks));
  const c = root.userData.clips;
  const ranges = typeof c === 'string' ? JSON.parse(c) : c || {};
  const out = {};
  for (const [name, [a, b]] of Object.entries(ranges)) out[name] = THREE.AnimationUtils.subclip(all, name, a, b, ANIM_FPS);
  return out;
}

// ---- ボス ----
// ボスは順番に 1 体ずつ現れる（BOSSES）。出現の条件を満たすと空から落ちてきて（startBossIntro）、町へ近づき、
// 待機（idle）をはさんで 2 種類の攻撃を交互にくり返す。撤退ラインまで押し戻すと撤退し（startRetreat）、次のボスの番になる。
// *_Hit_* / *_Hurt_* は当たり判定用の空のオブジェクト（extras に collider・radius・damage）。今は体の球（hit）だけを体当たりに使う
//   stage：このステージで現れる。appearAt：町の復興度がこれを超えると現れる。next：追い出したあとのステージ
//   attacks：[クリップ名, 当たるフレーム]。bodyY：体の中心の高さ（根元から）。sink：落ちてきたときにめりこむ深さ
//   rain：撤退するときに小バイ菌を町へふらせ、町の復興度をこれまで下げる
//   needs：この道具（ITEMS）がないと、体当たりしてもすり抜けてしまう。道具があれば、撃ったパンが当たった所だけが固まり（SOLID_TIME 秒）、
//          固まった所へ体当たりすると押し戻せる。固まっていない所に体当たりすると、すり抜けてからだが減る
//   summon：復興度では現れず、talks.json の summon のセリフを話し終わったときに現れる（ボス3 は、復興度 100% のあと町長と話すと）
//   roll：転がって町へ来る（clip：転がるアニメ、start：転がり始め、speed：m/秒、loop：アニメ 1 回で進む距離 m）
//   hard：体当たりしても押し戻せない（はね返されるだけ。撤退ラインも出さない）
//   intro：出現シーンの最後に威嚇でするアニメ（ないときは attacks の最初）。camScale：出現シーンのカメラの引き（大きいボス用）
//   roam：次のステージ（next）では、倒されるまで町の中を転げまわる（speed：m/秒。行き先は廃墟の全区画から。pickRoamTarget）。
//         転がっているときにふわおにぶつかると、つぶしてからだを 1/4 減らす
//   ground：どろどろの体。坂の上でも、体の下のほう（すそ）を地面に沿わせる（GROUND_VERT）
//   strike：攻撃がふわおにも当たる。{ クリップ名: [当たり始めのフレーム, 終わりのフレーム, [当たり判定のノード名…], 広げる距離 m] }。
//           広げる距離：たたきつけた地面のまわりにも当たるように、球の半径を足す（触手の先だけだと小さすぎて当たらない）。
//           ノードは extras の collider が hit（球。radius）か hit_ring（地面の輪。radius × 親の拡大率、幅 width。ジャンプでかわせる）。strikePlayer
// name は画面に出す名前（どのボスも「脅威」）。BOSSES の順に、バイ菌ボス・ヘドロボス・ロックボス
const BOSSES = [
  { name: '脅威', root: 'GB_Root', hit: 'GB_Hit_Spikes', stage: 1, appearAt: 0.8, next: 2,
    attacks: [['attack_slam', 92], ['attack_drill', 171]], bodyY: 14, sink: 8, rain: 0.3 },
  { name: '脅威', root: 'SB_Root', hit: 'SB_Hit_Body', stage: 2, appearAt: 0.6, next: 3,
    attacks: [['attack_slam', 92], ['attack_wave', 160]], bodyY: 7, sink: 0, needs: 'solidifier', ground: true,
    strike: {
      attack_slam: [89, 98, ['SB_Hit_Tip_L', 'SB_Hit_Tip_R', 'SB_Hit_Forearm_L', 'SB_Hit_Forearm_R'], 3],
      attack_wave: [160, 185, ['SB_Hit_Wave']],
    } },
  { name: '脅威', root: 'RB_Root', hit: 'RB_Hit_Body', stage: 3, summon: true, next: 4,
    attacks: [], bodyY: 21, sink: 0, roll: { clip: 'roll', start: 'roll_start', speed: 2.5, loop: 131.95 },
    hard: true, intro: 'roll_start', camScale: 2.1, roam: { speed: 6 } },
];
const BOSS_IDLE_TIME = 6;   // 攻撃と攻撃のあいだの待機（秒）
const BOSS_FADE = 0.25;
let boss = null, bossMixer = null, bossActions = null, bossCfg = null, bossIndex = -1, bossModels = [];
let bossIdleTime = 0, bossAttack = null, bossNext = 0, bossHitTimes = {}, bossSolid = 0;
const SOLID_TIME = 4;                        // 固形化パンが当たった所が、固まっている時間（秒）
const SOLID_COLOR = new THREE.Color(0x9a9088);   // 固まった色（乾いた土）
const SOLID_SIZE = 3;                        // 固まった所の大きさ（半径 m）
const SOLID_ARC = 0.42;                      // 体当たりが固まった所に当たったとみなす、ボスの中心から見た左右の角度（ラジアン。約 24°）
// ふわおが手に入れた道具。solidifier：固形化パン（パン工房の工場長がくれる。撃ったパンがヘドロボスに当たると固まり、体当たりできる）
// choco：板チョコ（ステージ 1 をクリアすると工房の展示台に並び、工場長がメカの背中にチョコ燃料タンクとして取り付けてくれる。燃料の最大が CHOCO_FUEL_MAX に）
// yeast：魔法のパン種（町が崩壊したあと、パン工房の前の工場長が砲台に付けてくれる。脅威3 を倒す最後の武器）
// present：お城の女の子のプレゼント（西の丘のお城まで来るともらえる。中身は作り中で、装備の見た目は PRESENT_MODEL に書くと付く）
const ITEMS = { solidifier: '固形化パン', choco: '板チョコ', yeast: '魔法のパン種', flour: '秘伝の打ち粉', present: 'お城のプレゼント' };
// その道具は、先にこの道具を持っていないともらえない（打ち粉は、パン種に振りかけるもの）
const ITEM_NEEDS = { flour: 'yeast' };
const CHOCO_FUEL_MAX = 0.5;
const items = new Set();
let passToast = 0;   // すり抜けたときのお知らせを出してからの時間
// 固まる：パンが当たった所のまわり（半径 SOLID_SIZE）の体の表面を、シェーダーで乾いた土の色にする（ひびの模様つき）。
// 場所はボスの中の座標で覚えて、毎フレーム世界の座標にしてシェーダーへ渡す（ボスと一緒に動く）。SOLID_TIME 秒でうすれて消える
const SOLID_MAX = 6;                          // 同時に固まっていられる所の数
const bossPatches = [];                       // { local: ボスの中の座標, t: 残り秒 }
const solidUniforms = {
  uSolid: { value: Array.from({ length: SOLID_MAX }, () => new THREE.Vector4()) },   // xyz：世界の座標、w：固まり具合（0〜1）
  uSolidR: { value: SOLID_SIZE },
  uSolidColor: { value: SOLID_COLOR },
};
// ---- 地面に沿うすそ（cfg.ground） ----
// ヘドロボスの底は平らなので、坂の上では下側のすそが浮き、上側が地面にもぐる。
// ボスの足元のまわり 2 つの輪（GROUND_R1・GROUND_R2）の GROUND_BINS か所と真ん中で地面の高さを測り（updateGroundSamples）、
// 体の下のほう（足元から GROUND_H まで）の頂点を、その真下の地面の高さの分だけシェーダーで上下させる。
// 影の回（customDepthMaterial）と輪郭線の回（userData.normalMaterial。anime.js）にも同じ曲げ方を入れる。
// 地面に広がるヘドロの波の輪（SB_Wave）も同じように曲がる
const GROUND_BINS = 16, GROUND_R1 = 8, GROUND_R2 = 18, GROUND_H = 5;
const groundUniforms = {
  uGround: { value: new Float32Array(1 + GROUND_BINS * 2) },   // [真ん中, 内側の輪…, 外側の輪…]（ボスの根元からの高さ）
  uGroundO: { value: new THREE.Vector3() },                     // ボスの根元（世界の座標）
};
const GROUND_VERT = `
{
  vec4 gw = modelMatrix * vec4(transformed, 1.0);
  vec2 rel = gw.xz - uGroundO.xz;
  float r = length(rel);
  float t = fract(atan(rel.y, rel.x) / 6.2831853 + 1.0) * ${GROUND_BINS}.0;
  int k0 = int(floor(t)) % ${GROUND_BINS};
  int k1 = (k0 + 1) % ${GROUND_BINS};
  float f = fract(t);
  float g1 = mix(uGround[1 + k0], uGround[1 + k1], f);
  float g2 = mix(uGround[1 + ${GROUND_BINS} + k0], uGround[1 + ${GROUND_BINS} + k1], f);
  float off = r < ${GROUND_R1}.0 ? mix(uGround[0], g1, r / ${GROUND_R1}.0) : mix(g1, g2, clamp((r - ${GROUND_R1}.0) / ${GROUND_R2 - GROUND_R1}.0, 0.0, 1.0));
  float w = 1.0 - smoothstep(0.0, ${GROUND_H}.0, gw.y - uGroundO.y);
  gw.y += off * w;
  transformed = (inverse(modelMatrix) * gw).xyz;
}
#include <project_vertex>`;
function addGroundVertex(shader) {
  Object.assign(shader.uniforms, groundUniforms);
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', `#include <common>
uniform float uGround[${1 + GROUND_BINS * 2}];
uniform vec3 uGroundO;`)
    .replace('#include <project_vertex>', GROUND_VERT);
}
let groundDepthMat = null, groundNormalMat = null;
function groundMaterials() {
  if (groundDepthMat) return;
  groundDepthMat = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
  groundDepthMat.onBeforeCompile = addGroundVertex;
  groundNormalMat = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
  groundNormalMat.onBeforeCompile = addGroundVertex;
}
// 地面の高さを測りなおす（ボスが見えている間、毎フレーム）
function updateGroundSamples() {
  if (!boss?.visible || !bossCfg?.ground) return;
  const o = boss.position, g = groundUniforms.uGround.value;
  groundUniforms.uGroundO.value.copy(o);
  const at = (x, z) => { _o.set(x, o.y + 40, z); const h = cast(_o, DOWN, 120); return h ? h.point.y - o.y : 0; };
  g[0] = at(o.x, o.z);
  for (let k = 0; k < GROUND_BINS; k++) {
    const a = (k / GROUND_BINS) * Math.PI * 2, c = Math.cos(a), sn = Math.sin(a);
    groundRaw[k] = at(o.x + c * GROUND_R1, o.z + sn * GROUND_R1);
    groundRaw[GROUND_BINS + k] = at(o.x + c * GROUND_R2, o.z + sn * GROUND_R2);
  }
  // 木や家の屋根に当たった飛び値をならす（となり 2 つとの真ん中の値）
  for (let ring = 0; ring < 2; ring++) {
    for (let k = 0; k < GROUND_BINS; k++) {
      const i = ring * GROUND_BINS;
      const a = groundRaw[i + (k + GROUND_BINS - 1) % GROUND_BINS], b = groundRaw[i + k], c = groundRaw[i + (k + 1) % GROUND_BINS];
      g[1 + i + k] = Math.max(Math.min(a, b), Math.min(Math.max(a, b), c));
    }
  }
}
const groundRaw = new Float32Array(GROUND_BINS * 2);
// ヘドロボスの材質に、地面に沿うすそ（ground）と固まった所の色（solid）を足す（トゥーンの材質も元の材質の onBeforeCompile を呼ぶ）
function addBossShader(mat, { ground, solid }) {
  mat.onBeforeCompile = (shader) => {
    if (ground) addGroundVertex(shader);
    if (!solid) return;
    Object.assign(shader.uniforms, solidUniforms);
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', `#include <common>
varying vec3 vSolidW;`)
      .replace('#include <project_vertex>', `#include <project_vertex>
vSolidW = (modelMatrix * vec4(transformed, 1.0)).xyz;`);
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', `#include <common>
varying vec3 vSolidW;
uniform vec4 uSolid[${SOLID_MAX}];
uniform float uSolidR;
uniform vec3 uSolidColor;
float solidHash(vec3 p) { return fract(sin(dot(floor(p), vec3(12.9898, 78.233, 37.719))) * 43758.5453); }
float solidNoise(vec3 p) {
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(solidHash(i), solidHash(i + vec3(1, 0, 0)), f.x), mix(solidHash(i + vec3(0, 1, 0)), solidHash(i + vec3(1, 1, 0)), f.x), f.y),
             mix(mix(solidHash(i + vec3(0, 0, 1)), solidHash(i + vec3(1, 0, 1)), f.x), mix(solidHash(i + vec3(0, 1, 1)), solidHash(i + vec3(1, 1, 1)), f.x), f.y), f.z);
}`)
      .replace('#include <color_fragment>', `#include <color_fragment>
{
  float amt = 0.0;
  float edge = (solidNoise(vSolidW * 0.9) - 0.5) * uSolidR * 0.6;   // ふちをでこぼこに
  for (int i = 0; i < ${SOLID_MAX}; i++) {
    vec4 s = uSolid[i];
    if (s.w <= 0.0) continue;
    float d = distance(vSolidW, s.xyz) + edge;
    amt = max(amt, s.w * (1.0 - smoothstep(uSolidR * 0.75, uSolidR, d)));
  }
  if (amt > 0.0) {
    // 乾いてひび割れた土：まだらの明るさと、細いひびの線
    float n = solidNoise(vSolidW * 2.3);
    float crack = smoothstep(0.06, 0.0, abs(solidNoise(vSolidW * 1.4) - 0.5)) * 0.55;
    vec3 dry = uSolidColor * (0.85 + 0.3 * n) * (1.0 - crack);
    diffuseColor.rgb = mix(diffuseColor.rgb, dry, amt);
  }
}`);
  };
  mat.customProgramCacheKey = () => `boss${ground ? '-ground' : ''}${solid ? '-solid' : ''}`;
  mat.needsUpdate = true;
}
const _sl = new THREE.Vector3();
// hit：パンがボスの体のメッシュに当たったところ（Raycaster の結果）
function solidifyAt(hit) {
  boss.updateMatrixWorld(true);
  const local = boss.worldToLocal(hit.point.clone());
  if (bossPatches.length >= SOLID_MAX) bossPatches.sort((a, b) => b.t - a.t).pop();   // いちばん古いものと入れかえる
  bossPatches.push({ local, t: SOLID_TIME });
}
function clearPatches() {
  bossPatches.length = 0;
  bossSolid = 0;
  for (const v of solidUniforms.uSolid.value) v.w = 0;
}
// 固まった所を、うすれさせながらシェーダーへ渡す
function updatePatches(dt) {
  bossSolid = 0;
  for (let i = bossPatches.length - 1; i >= 0; i--) {
    bossPatches[i].t -= dt;
    if (bossPatches[i].t <= 0) bossPatches.splice(i, 1);
  }
  solidUniforms.uSolid.value.forEach((v, i) => {
    const x = bossPatches[i];
    if (!x) { v.w = 0; return; }
    _sl.copy(x.local).applyMatrix4(boss.matrixWorld);
    const age = SOLID_TIME - x.t;
    v.set(_sl.x, _sl.y, _sl.z, Math.min(1, age / 0.15, x.t / 0.6));   // さっと固まって、最後の 0.6 秒でうすれる
    bossSolid = Math.max(bossSolid, x.t);
  });
}
// ふわお（feet）の方向に、固まった所があるか（ボスの中心から見た左右の角度で見る）
function solidToward(x, z) {
  const a = Math.atan2(x - boss.position.x, z - boss.position.z);
  return bossPatches.some((s) => {
    _sl.copy(s.local).applyMatrix4(boss.matrixWorld);
    const b = Math.atan2(_sl.x - boss.position.x, _sl.z - boss.position.z);
    return Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b))) < SOLID_ARC;
  });
}
// ボスを町の外（BOSS_POS）に置き、アニメーションを用意する（出現するまでは隠しておく）
function prepareBoss(gltf, cfg) {
  const root = gltf.scene;
  root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  // 固めるボスは、体の材質（目・歯・波の輪のほか）に固まった所の色をのせる
  // 地面に沿うボスは、全部の部品の材質・影・輪郭線の回に、すそを曲げる処理を足す
  const mats = new Map();   // 材質 → 固まった色をのせるか
  root.traverse((o) => {
    if (!o.isMesh) return;
    const solid = !!cfg.needs && !/Wave/.test(o.name) && !!o.material.color && !o.material.emissiveMap && !/eye|teeth/i.test(o.material.name);
    mats.set(o.material, mats.get(o.material) || solid);
    if (cfg.ground) {
      groundMaterials();
      o.customDepthMaterial = groundDepthMat;
      o.userData.normalMaterial = groundNormalMat;
      o.frustumCulled = false;   // 曲げた形は元の大きさの箱からはみ出すので、画面外の判定はしない
    }
  });
  for (const [m, solid] of mats) if (solid || cfg.ground) addBossShader(m, { ground: !!cfg.ground, solid });
  if (cfg.ground) style.ownNormal(root);
  _o.set(BOSS_POS.x, 400, BOSS_POS.z);
  const hit = cast(_o, DOWN, 800);
  root.position.set(BOSS_POS.x, hit ? hit.point.y : BOSS_POS.y, BOSS_POS.z);
  root.rotation.y = BOSS_YAW;
  root.visible = false;
  scene.add(root);

  const mixer = new THREE.AnimationMixer(root);
  const rootNode = root.getObjectByName(cfg.root) || root;
  const clips = clipsFromExtras(rootNode, gltf.animations);
  const ranges = JSON.parse(rootNode.userData.clips || '{}');
  const actions = {}, hitTimes = {};
  for (const [name, clip] of Object.entries(clips)) {
    const a = mixer.clipAction(clip);
    if (name !== 'idle' && name !== cfg.roll?.clip) { a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; }
    actions[name] = a;
  }
  for (const [name, frame] of cfg.attacks) if (ranges[name]) hitTimes[name] = (frame - ranges[name][0]) / ANIM_FPS;
  actions.idle?.play();
  // 攻撃が終わったら待機へ戻す。ドリルの終わりは体が 3 回転した値だが、見た目は元の姿勢なのでそのままつなぐ
  mixer.addEventListener('finished', (e) => {
    if (cfg.roll && e.action === actions[cfg.roll.start] && rolling === 1 && bossModels[bossIndex]?.mixer === mixer) {
      rolling = 2;
      actions[cfg.roll.clip].reset().play();
      e.action.crossFadeTo(actions[cfg.roll.clip], BOSS_FADE, false);
      return;
    }
    if (e.action !== bossAttack) return;
    actions.idle.reset().play();
    bossAttack.crossFadeTo(actions.idle, BOSS_FADE, false);
    bossAttack = null;
    bossIdleTime = 0;
  });
  const spikes = root.getObjectByName(cfg.hit);
  // ふわおに当たる攻撃：クリップの中の時間（秒）と当たり判定のノード
  const strikes = {};
  for (const [name, [from, to, nodes, reach = 0]] of Object.entries(cfg.strike || {})) {
    if (!ranges[name]) continue;
    strikes[name] = { from: (from - ranges[name][0]) / ANIM_FPS, to: (to - ranges[name][0]) / ANIM_FPS, reach,
      nodes: nodes.map((n) => root.getObjectByName(n)).filter((o) => o?.userData.radius) };
  }
  return { cfg, root, mixer, actions: actions.idle ? actions : null, hitTimes, spikes, radius: spikes?.userData.radius || 9, mats: null, strikes };
}
// i 番目のボスの番にする（まだ現れていない）
function useBoss(i) {
  const m = bossModels[i];
  bossIndex = i;
  bossCfg = m.cfg;
  boss = m.root;
  bossMixer = m.mixer;
  bossActions = m.actions;
  bossHitTimes = m.hitTimes;
  bossSpikes = m.spikes;
  bossSpikeRadius = m.radius;
  clearPatches();
  bossAttack = null;
  bossNext = 0;
  bossIdleTime = 0;
  bossHitDone = true;
  bossGone = false;
  bossAppeared = false;
  bossAppearWait = 0;
  bossSummoned = false;
  attackCount = 0;
  rolling = 0;
  bossVel.set(0, 0, 0);
  boss.visible = false;
  if (retreatLine) retreatLine.visible = false;
}
function startBossAttack(name) {
  const next = bossActions?.[name];
  if (!next) return false;
  bossAttack = next;
  next.reset().play();
  bossActions.idle.crossFadeTo(next, BOSS_FADE, false);
  return true;
}
function updateBoss(dt, active) {
  if (!bossMixer) return;
  if (bossActions && bossAppeared && !bossAttack && !retreat && !finale && bossCfg.attacks.length && (bossIdleTime += dt) > BOSS_IDLE_TIME) {
    startBossAttack(bossCfg.attacks[bossNext][0]);
    bossNext = (bossNext + 1) % bossCfg.attacks.length;
    bossHitDone = false;
  }
  bossMixer.update(dt);
  updateGroundSamples();
  // 固まった所（時間がたつとうすれて消える）
  updatePatches(dt);
  passToast += dt;
  // 町に着いているときは、攻撃が当たった瞬間に町が攻撃される
  if (bossAttack && !bossHitDone && bossAttack.time >= (bossHitTimes[bossAttack.getClip().name] ?? bossAttack.getClip().duration * 0.45)) {
    bossHitDone = true;
    if (active && bossAppeared && boss && !bossGone && !retreat && !talk.active && bossDistance() <= BOSS_STOP + 1) attackTown();
  }
  quake *= Math.exp(-QUAKE_DAMP * dt);
  // 町を転げまわっているときは、近いほど地面がゆれる（ふわおが空中にいる間はゆれない）
  if (active && bossRoaming() && rolling > 0 && onGround) {
    const d = Math.hypot(boss.position.x - feet.x, boss.position.z - feet.z);
    quake = Math.max(quake, 0.35 * THREE.MathUtils.clamp(1 - (d - 20) / 60, 0, 1));
  }
}

// ---- ボスが町を攻撃する ----
// 画面がゆれて、ふちが赤く光り、倒した小バイ菌が 1 匹よみがえる（町の復興度が下がる）。
// よみがえるのは、まだ元に戻っていない区画で倒した小バイ菌のうち、ボスにいちばん近いもの。元に戻った区画はそのまま
const QUAKE_SHAKE = 0.35;      // 町が攻撃されたときのカメラのゆれ（m）
const QUAKE_DAMP = 2.5;        // ゆれがおさまる速さ
let bossHitDone = true, quake = 0;
const hurtEl = document.getElementById('hurt');
// ATTACK_RUIN_EVERY 回に 1 回は、元に戻った区画をランダムに 1 つ廃墟に戻す（区画の小バイ菌も全部よみがえる）。
// ほかの攻撃と、元に戻った区画がないときは、小バイ菌が 1 匹よみがえる
const ATTACK_RUIN_EVERY = 3;
let attackCount = 0;
function attackTown() {
  quake = 1;
  hurtEl.classList.remove('on');
  void hurtEl.offsetWidth;   // アニメーションを最初から
  hurtEl.classList.add('on');
  if (++attackCount % ATTACK_RUIN_EVERY !== 0 || !ruinRandomArea()) reviveGerm();
  showToast('脅威が町を攻撃した！');
}
function ruinRandomArea() {
  const done = areaGauge.map((g, i) => i).filter((i) => areaGauge[i].done && ruinAreas[i].restored);
  if (!done.length) return false;
  const i = done[Math.floor(Math.random() * done.length)];
  unrestoreArea(i);
  const g = areaGauge[i];
  g.done = false;
  g.germs.forEach((x, k) => { if (germGone(x)) reviveGermAt(i, k); });
  quake = 1.6;
  setTimeout(saveGame, 0);
  return true;
}
function reviveGerm() {
  let best = null, bestD = Infinity;
  areaGauge.forEach((gauge, i) => {
    if (gauge.done) return;
    gauge.germs.forEach((g, k) => {
      if (!germGone(g)) return;
      const d = Math.hypot(g.spot.x - boss.position.x, g.spot.z - boss.position.z);
      if (d < bestD) { best = [i, k]; bestD = d; }
    });
  });
  if (!best) return -1;
  reviveGermAt(...best);
  return best[0];
}
// i 番目の区画の k 匹目（倒したもの）を、元の場所によみがえらせる。元に戻った区画なら、ゲージはまた満タンでなくなる
function reviveGermAt(i, k) {
  const gauge = areaGauge[i], old = gauge.germs[k];
  const g = spawnGerm(old.spot.x, old.spot.z);
  g.area = i;
  g.spot = old.spot;
  gauge.germs[k] = g;
  gauge.done = false;
  if (!helps.some((h) => h.area === i) && helps.length < HELP_MAX) addHelp(i);
  return g;
}
// 町の復興度が target 以下になるまで、倒した小バイ菌をどれだけよみがえらせるか（区画は問わず、ばらばらに選ぶ）
function rainPlan(target) {
  const n = areaGauge.length, list = [];
  areaGauge.forEach((gauge, i) => gauge.germs.forEach((g, k) => { if (germGone(g)) list.push([i, k]); }));
  for (let j = list.length - 1; j > 0; j--) { const r = Math.floor(Math.random() * (j + 1)); [list[j], list[r]] = [list[r], list[j]]; }
  let p = townProgress();
  const out = [];
  for (const [i, k] of list) {
    if (p <= target) break;
    const g = areaGauge[i];
    p -= 1 / ((g.spots.length + g.residents.length) * n);
    out.push({ i, k, spot: g.germs[k].spot });
  }
  return out;
}

// ---- ボスが町へ近づく・ジェットで体当たりして押し戻す ----
// ボスは町（BOSS_TARGET）へ向かって少しずつ進み、BOSS_STOP まで来たらそこで止まり、攻撃のたびに町を攻撃する（attackTown）。
// ジェット噴射中に速い勢いでトゲの球（GB_Hit_Spikes）にぶつかると体当たり：ボスを町と反対へ押し戻し、
// ロボははね返される。ゆっくりぶつかったときや歩いているときは、ボスを通り抜けないように押し出すだけ
const BOSS_TARGET = new THREE.Vector3(0, 0, 12);   // 町の真ん中（広場のあたり）
const BOSS_CREEP = 0.25;      // 町へ近づく速さ（m/秒）。BOSS_POS から BOSS_STOP まで約 3 分
const BOSS_STOP = 45;         // 町の真ん中からこの距離まで来たら止まる（町の東の端の外）
const BOSS_FAR = 160;         // これより遠くへは押し戻せない
const BOSS_TURN = 0.6;        // 町のほうへ向き直る速さ
const RAM_MIN_SPEED = 7;      // これより速く飛んでいたら体当たり（ジェットの最高速は JET_SPEED）
const RAM_PUSH = [15, 30];    // 1 回の体当たりで下がる距離（m）。RAM_MIN_SPEED ちょうどで 15m、最高速で 30m
const RAM_PUSH_DAMP = 0.8;    // 押し戻す勢いの減り方（大きいほど早く止まる。30m 下がるのに約 4 秒）
const RAM_STUN = 4;           // 体当たりされたあと、また近づき始めるまで（秒）
const RAM_BOUNCE = 8;         // ロボがはね返される速さ（m/秒）
const RAM_COOLDOWN = 0.5;     // 続けて体当たりにならない時間（秒）
let bossSpikes = null, bossSpikeRadius = 9;   // 今のボスの体当たりの球（BOSSES の hit）
const bossVel = new THREE.Vector3();
let bossStun = 0, ramCooldown = 0, bossWobble = 0, bossWobbleTime = 0;
const _bc = new THREE.Vector3();
const _bd = new THREE.Vector3();
// ---- 撤退ライン ----
// 町の真ん中（BOSS_TARGET）から BOSS_RETREAT の距離に、地面に沿った赤白の線を引く（ボスをここまで押し戻すと撤退する目安）。
// 線の高さは地形（町の外の地面・町の地面・山の斜面）だけで決める。木や家の屋根には乗らない
const BOSS_RETREAT = BOSS_FAR;
const RETREAT_WIDTH = 0.9;      // 線の幅（m）
const RETREAT_DASH = 3;         // 赤と白の 1 組の長さ（m）
const RETREAT_LIFT = 0.12;      // 地面から浮かせる高さ（ちらつき防止）
const TERRAIN_NAMES = /^(DS_Terrain|AP_Apron|TW_Ground|MT_Slope)/;
let retreatLine = null;
function setupRetreatLine(groups) {
  const terrain = groups.flatMap((g) => g.children).filter((m) => m.userData.sourceNames?.some((n) => TERRAIN_NAMES.test(n)));
  if (!terrain.length) return;
  const ground = bvhMesh(terrain);
  const N = Math.ceil(BOSS_RETREAT * Math.PI * 2 / 0.6);   // 0.6m ごとに地面の高さを拾う
  const pos = [], uv = [], idx = [];
  for (let i = 0; i <= N; i++) {
    const a = i / N * Math.PI * 2, cx = Math.cos(a), cz = Math.sin(a);
    for (const side of [-1, 1]) {
      const r = BOSS_RETREAT + side * RETREAT_WIDTH / 2;
      const x = BOSS_TARGET.x + cx * r, z = BOSS_TARGET.z + cz * r;
      _o.set(x, 600, z);
      const t = cast(_o, DOWN, 1200, ground);
      let y = t ? t.point.y : 0;
      // 地面にじかに置かれた道や橋（地形のすぐ上）には乗る
      const top = cast(_o, DOWN, 1200);
      if (top && top.point.y > y && top.point.y - y < 0.8) y = top.point.y;
      pos.push(x, y + RETREAT_LIFT, z);
      uv.push(i / N * BOSS_RETREAT * Math.PI * 2 / RETREAT_DASH, side < 0 ? 0 : 1);
    }
    if (i < N) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
  }
  ground.geometry.disposeBoundsTree?.();
  ground.geometry.dispose();
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  // 赤と白のしま模様（縁は少し暗い赤）
  const c = document.createElement('canvas');
  c.width = 64; c.height = 16;
  const g = c.getContext('2d');
  g.fillStyle = '#d8342c'; g.fillRect(0, 0, 64, 16);
  g.fillStyle = '#fff4e0'; g.fillRect(32, 3, 32, 10);
  g.fillStyle = '#d8342c'; g.fillRect(0, 3, 32, 10);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const line = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({
    map: tex, side: THREE.DoubleSide, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  }));
  line.name = 'RetreatLine';
  line.renderOrder = 1;
  scene.add(line);
  retreatLine = line;
}

// ---- ボスの撤退 ----
// 撤退ライン（BOSS_RETREAT）まで押し戻すと、カットイン（上下の黒い帯）になって：
//   考える（「…」の吹き出しを出して、首をかしげるように揺れる）→ 町と反対へ 180° 向きを変える → 去っていく
//   → 暗転して、ふわおはスタート地点へ戻る。ボスはいなくなり、撤退ラインも消える。
//   このボスは一回きりの登場で、二度と戻ってこない（あとで、ある段階から現れ、撤退したら次のボスが出るようにする予定）
const RETREAT_THINK = 2.4;      // 考えている時間（秒）
const RETREAT_SPEW = 2.4;       // 小バイ菌を空へ吐き出す時間（BOSSES の rain があるボスだけ）
const RAIN_FLY = 2.6;           // 吐き出した小バイ菌が町に落ちるまでの時間（秒）
const RAIN_PEAK = 45;           // 小バイ菌が飛ぶ高さ（吐き出す所と落ちる所を結んだ線から、いちばん高い所まで。m）
const RETREAT_TURN = 1.8;       // 向きを変える時間（秒）
const RETREAT_LEAVE = 4.2;      // 去っていく時間（秒）。最後の FADE_TIME で暗転する
const RETREAT_SPEED = 12;       // 去っていく速さ（m/秒）
let retreat = null;             // { t, yaw0, out: 町から外への向き, top, bubble, cam, look, faded }
let bossGone = false;
const cutinEl = document.getElementById('cutin');
const _rc = new THREE.Vector3();
function thinkBubble() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 160;
  const g = c.getContext('2d');
  const cloud = () => {
    g.fillStyle = '#fffaf0'; g.strokeStyle = '#3a2a1e'; g.lineWidth = 7;
    g.clearRect(0, 0, 256, 160);
    g.beginPath(); g.ellipse(128, 66, 112, 56, 0, 0, Math.PI * 2); g.fill(); g.stroke();
    for (const [x, y, r] of [[64, 128, 14], [36, 148, 8]]) { g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fill(); g.stroke(); }
  };
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
  sprite.renderOrder = 999;
  sprite.userData.draw = (dots) => {   // 「…」の点を 1 つずつ出す
    cloud();
    g.fillStyle = '#3a2a1e';
    for (let i = 0; i < dots; i++) { g.beginPath(); g.arc(86 + i * 42, 70, 11, 0, Math.PI * 2); g.fill(); }
    tex.needsUpdate = true;
  };
  sprite.userData.draw(0);
  return sprite;
}
function startRetreat() {
  // 体のてっぺん（トゲの球の上）。腕は振り上げることがあるので、大きさには入れない
  bossSpikes.getWorldPosition(_rc);
  const top = _rc.y + bossSpikeRadius;
  _rd.set(boss.position.x - BOSS_TARGET.x, 0, boss.position.z - BOSS_TARGET.z).normalize();
  retreat = { t: 0, yaw0: boss.rotation.y, out: _rd.clone(), top, bubble: thinkBubble(), cam: new THREE.Vector3(), look: new THREE.Vector3(), faded: false, dots: -1,
    rain: bossCfg.rain !== undefined ? rainPlan(bossCfg.rain) : [], shots: [], launched: 0, lookExtra: 0 };
  retreat.spew = retreat.rain.length ? RETREAT_SPEW : 0;
  retreat.bubble.scale.set(0.01, 0.01, 1);
  scene.add(retreat.bubble);
  bossVel.set(0, 0, 0);
  boss.scale.setScalar(1);
  // 攻撃の途中なら待機へ戻す（考えている間は攻撃しない）
  if (bossAttack) {
    bossActions.idle.reset().play();
    bossAttack.crossFadeTo(bossActions.idle, 0.4, false);
    bossAttack = null;
  }
  // ロボはその場で止まる（噴射も止める）
  jetting = false; jetEndTime = 0; jetSpeed = 0; jetVel.set(0, 0, 0); recoilVel.set(0, 0, 0);
  releaseAll();
  // カメラ：ボスの町側の斜め前から、ボスと遠ざかる先が入るように
  _rm.set(-retreat.out.z, 0, retreat.out.x);   // 横向き
  // ボスの大きさに合わせて引き、頭の上の「…」まで入るようにする
  const h = top - boss.position.y;
  retreat.lookUp = h * 0.6;
  retreat.cam.copy(boss.position).addScaledVector(retreat.out, -(h * 1.5 + 22)).addScaledVector(_rm, h * 0.6 + 10);
  _o.set(retreat.cam.x, 400, retreat.cam.z);
  const g = cast(_o, DOWN, 800);
  retreat.cam.y = Math.max(g ? g.point.y : boss.position.y, boss.position.y) + h * 0.45 + 4;
  retreat.look.copy(boss.position).setY(boss.position.y + retreat.lookUp);
  cutinEl.querySelector('.caption').textContent = '脅威が撤退していく……';
  document.body.classList.add('cutin');
}
function updateRetreat(dt) {
  const r = retreat, pos = boss.position;
  r.t += dt;
  const t1 = RETREAT_THINK, ts = t1 + r.spew, t2 = ts + RETREAT_TURN, t3 = t2 + RETREAT_LEAVE;
  // 考える：首をかしげるように左右へゆっくり揺れ、「…」が 1 つずつ出る
  boss.rotation.z = r.t < t1 ? Math.sin(r.t * 2.2) * 0.06 * Math.min(1, r.t * 2) : boss.rotation.z * Math.exp(-6 * dt);
  r.bubble.visible = r.t < t1 + 0.3;
  if (r.bubble.visible) {
    const dots = Math.min(3, Math.floor(r.t / 0.5));
    if (dots !== r.dots) { r.dots = dots; r.bubble.userData.draw(dots); }
    r.bubble.position.set(pos.x, r.top + 3.5, pos.z);
    const pop = Math.min(1, r.t * 3);
    r.bubble.scale.set(11 * pop, 6.9 * pop, 1);
  }
  // 小バイ菌を空へ吐き出す：体をふるわせ、てっぺんから次々に打ち上げる。町の倒した小バイ菌の場所へ落ちて、よみがえる
  if (r.spew && r.t >= t1 && r.t < ts) {
    const u = (r.t - t1) / r.spew;
    if (!r.spewing) { r.spewing = true; cutinEl.querySelector('.caption').textContent = '脅威が小バイ菌を空へまき散らした！'; }
    const w = Math.sin(r.t * 30) * 0.05 * Math.sin(Math.PI * u);
    boss.scale.set(1 + w, 1 - w, 1 + w);
    const want = Math.min(r.rain.length, Math.ceil(r.rain.length * u / 0.7));
    while (r.launched < want) launchRain(r, r.rain[r.launched++]);
  } else if (r.spewing && r.t >= ts) {
    r.spewing = false;
    boss.scale.setScalar(1);
    cutinEl.querySelector('.caption').textContent = '脅威が撤退していく……';
  }
  r.lookExtra += ((r.spew && r.t >= t1 && r.t < ts + 0.8 ? 1 : 0) - r.lookExtra) * (1 - Math.exp(-2.5 * dt));
  updateRain(r, dt);
  // 向きを変える（町と反対へ 180°）
  if (r.t >= ts) boss.rotation.y = r.yaw0 + Math.PI * THREE.MathUtils.smootherstep(r.t, ts, t2);
  // 去っていく（だんだん速く）
  if (r.t >= t2) {
    pos.addScaledVector(r.out, RETREAT_SPEED * THREE.MathUtils.smoothstep(r.t, t2, t2 + 1) * dt);
    _o.set(pos.x, 400, pos.z);
    const hit = cast(_o, DOWN, 800);
    if (hit) pos.y += (hit.point.y - pos.y) * (1 - Math.exp(-4 * dt));
  }
  // 暗転して、ふわおをスタート地点へ戻す
  if (!r.faded && r.t >= t3 - FADE_TIME) { r.faded = true; fadeEl.classList.add('on'); }
  if (r.t >= t3) {
    while (r.launched < r.rain.length) launchRain(r, r.rain[r.launched++]);   // 念のため、残りも全部落とす
    for (const shot of r.shots) shot.t = RAIN_FLY;
    updateRain(r, 0);
    scene.remove(r.bubble);
    r.bubble.material.map.dispose();
    r.bubble.material.dispose();
    boss.visible = false;
    boss.rotation.z = 0;
    if (retreatLine) retreatLine.visible = false;
    bossGone = true;
    storyStage = Math.max(storyStage, bossCfg.next);   // 追い出した → 次のステージ
    if (bossModels[bossIndex + 1]) useBoss(bossIndex + 1);   // 次のボスの番（条件を満たすまで現れない）
    respawn();
    document.body.classList.remove('cutin');
    retreat = null;
    setTimeout(() => fadeEl.classList.remove('on'), 300);
    showToast('脅威が撤退した！');
    saveGame();
  }
}
// 吐き出した小バイ菌（飛んでいる間は、くるくる回るだけの見た目）
function launchRain(r, plan) {
  const mesh = germTemplate.clone(true);
  bossSpikes.getWorldPosition(_rc);
  const from = _rc.clone().setY(r.top - 1);
  const to = groundPoint(plan.spot);
  mesh.position.copy(from);
  mesh.scale.setScalar(1.6);
  scene.add(mesh);
  r.shots.push({ mesh, from, to, t: 0, plan, spin: (Math.random() - 0.5) * 12 });
}
function updateRain(r, dt) {
  for (let j = r.shots.length - 1; j >= 0; j--) {
    const s = r.shots[j];
    s.t += dt;
    const u = Math.min(1, s.t / RAIN_FLY);
    s.mesh.position.lerpVectors(s.from, s.to, u);
    s.mesh.position.y += 4 * RAIN_PEAK * u * (1 - u);
    s.mesh.rotation.y += s.spin * dt;
    s.mesh.rotation.x += s.spin * 0.6 * dt;
    s.mesh.scale.setScalar(1.6 - 0.6 * u);
    if (u < 1) continue;
    scene.remove(s.mesh);
    reviveGermAt(s.plan.i, s.plan.k);
    r.shots.splice(j, 1);
  }
}
// カットインのカメラ：決めた位置から、ボスを追って見る（小バイ菌を吐き出すときは、空を見上げる）
function retreatCamera(dt) {
  _rc.copy(boss.position).setY(boss.position.y + retreat.lookUp + 30 * retreat.lookExtra);
  retreat.look.lerp(_rc, 1 - Math.exp(-3 * dt));
  camera.position.copy(retreat.cam);
  camera.lookAt(retreat.look);
  model.visible = true;
}

// ---- ボスの出現 ----
// そのボスのステージで、町の復興度が BOSSES の appearAt を超えると、カットイン（上下の黒い帯）になって：
//   空から落ちてくる → 地面にぶつかって画面が大きくゆれ、土ぼこりが広がる → めりこんだ体を起こして浮かび上がり、いつもの高さへ
//   → 爪をたたきつけて威嚇 → 暗転して、ふわおの操作に戻る。それまでボスは出ていない（町へ近づかない・攻撃しない）
const BOSS_APPEAR_DELAY = 1.5;    // 操作できるようになってから、出現までの間（秒）
const INTRO_FALL_FROM = 1.0;      // 落ち始める時刻（秒）
const INTRO_LAND = 2.7;           // 地面にぶつかる時刻
const INTRO_FALL_H = 170;         // 落ち始める高さ（いつもの位置からの m）
const INTRO_RISE = [5.2, 7.6];    // 浮かび上がる時刻
const INTRO_SLAM = 7.7;           // 爪をたたきつけ始める時刻（当たるのは約 0.9 秒後）
const INTRO_END = 10.4;           // 終わり（最後の FADE_TIME で暗転する）
// 転がるボス（BOSSES の roll）は空から落ちず、町の外の遠くから地ひびきを立てて転がってきて、いつもの位置でドンと止まる
const ROLL_IN_DIST = 110;         // 転がり始める所（いつもの位置から、町と反対へ m）
const ROLL_IN_TIME = 5.0;         // いつもの位置に着く時刻（秒）。ここで画面が大きくゆれる
let bossAppeared = false, bossIntro = null, bossAppearWait = 0, bossSummoned = false;
const _ic = new THREE.Vector3(), _il = new THREE.Vector3();
function introGroundY(x, z, fallback) {
  _o.set(x, 400, z);
  const hit = cast(_o, DOWN, 800);
  return hit ? hit.point.y : fallback;
}
// 土ぼこりの輪（地面に平たく広がって消える）と、もくもくの山
function dustRing(center, color, size) {
  const mesh = new THREE.Mesh(new THREE.RingGeometry(0.55, 1, 48), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85, depthWrite: false, side: THREE.DoubleSide }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.copy(center).setY(center.y + 0.6);
  mesh.userData.size = size;
  mesh.userData.noOutline = true;   // 砂煙に輪郭線は出さない
  mesh.visible = false;
  scene.add(mesh);
  return mesh;
}
function dustCloud(center) {
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xcdb89a, transparent: true, opacity: 0.7, depthWrite: false }));
  mesh.position.copy(center);
  mesh.userData.noOutline = true;
  mesh.visible = false;
  scene.add(mesh);
  return mesh;
}
function startBossIntro() {
  const home = boss.position.clone();
  const out = new THREE.Vector3(home.x - BOSS_TARGET.x, 0, home.z - BOSS_TARGET.z).normalize();   // 町から外への向き
  const side = new THREE.Vector3(-out.z, 0, out.x);
  // カメラの位置（町の側から。地面より上に）。木や家でボスの体が隠れるときは、横へずらした位置をさがす
  const _d = new THREE.Vector3();
  const k = bossCfg.camScale || 1;
  const shot = (back, s0, up, bodyY) => {
    back *= k; s0 *= k; up *= k;
    let first = null;
    // 好みの位置から順に、横・前後・高さを少しずつ変えてさがす（町の外は木が多い）
    const tries = [];
    for (const dh of [0, 3, 7]) for (const db of [0, -6, 8]) for (const ds of [0, 7, -7, 14, -14, 21, -21]) tries.push([ds, db, dh]);
    for (const [ds, db, dh] of tries) {
      const p = home.clone().addScaledVector(out, -(back + db)).addScaledVector(side, s0 + ds);
      p.y = Math.max(introGroundY(p.x, p.z, home.y), home.y) + up + dh;
      first ||= p;
      // 体の真ん中と、左右・上の端（トゲのあたり）が見えるか。木の葉も見る
      const blocked = [[0, 0], [-9, 0], [9, 0], [0, 9], [-6, -4], [6, -4]].some(([sx, sy]) => {
        sx *= k; sy *= k;
        _d.set(home.x, home.y + bodyY + sy, home.z).addScaledVector(side, sx).sub(p);
        const len = _d.length();
        return cast(p, _d.normalize(), len - 3, leafCollider ? [...colliders, leafCollider] : colliders);
      });
      if (!blocked) return p;
    }
    return first;
  };
  const cy = bossCfg.bodyY;
  bossIntro = {
    t: 0, home, out, side, faded: false, landed: false, slammed: false, slamHit: false, dust: [],
    rollIn: !!bossCfg.roll, land: bossCfg.roll ? ROLL_IN_TIME : INTRO_LAND,
    // 落ちてくるところを低い位置から見上げる。転がってくるボスは、通り道の横の低い位置から
    camA: bossCfg.roll ? shot(-10, 42, 2, cy) : shot(48, 22, 2.5, cy),
    camB: shot(38, -12, 1.2, cy - bossCfg.sink),   // ぶつかったあと：近くの低い位置から、ゆっくり寄る
    camC: shot(34, 3, 1.5, cy),                    // たたきつけ：正面の低い位置から見上げる
    look: home.clone().setY(home.y + INTRO_FALL_H * 0.6),
  };
  boss.visible = true;
  boss.position.set(home.x, home.y + INTRO_FALL_H, home.z);
  boss.rotation.y = Math.atan2(-out.x, -out.z);   // 町のほうを向く
  if (bossIntro.rollIn) {
    // 遠くから転がってくる（転がるアニメを流しておく）
    const R = bossCfg.roll, A = bossActions;
    boss.position.copy(home).addScaledVector(out, ROLL_IN_DIST);
    boss.position.y = introGroundY(boss.position.x, boss.position.z, home.y);
    A.idle.stop();
    A[R.clip].reset().play();
    bossIntro.prev = boss.position.clone();
    bossIntro.look.copy(boss.position).setY(boss.position.y + bossCfg.bodyY);
  }
  bossIdleTime = 0;
  jetting = false; jetEndTime = 0; jetSpeed = 0; jetVel.set(0, 0, 0); recoilVel.set(0, 0, 0);
  releaseAll();
  cutinEl.querySelector('.caption').textContent = '';
  document.body.classList.add('cutin');
}
function updateBossIntro(dt) {
  const I = bossIntro, pos = boss.position, home = I.home;
  I.t += dt;
  const t = I.t;
  const caption = cutinEl.querySelector('.caption');
  if (t > 0.3 && t < I.land && !caption.textContent) caption.textContent = I.rollIn ? 'ゴゴゴゴ……！ 地ひびきが近づいてくる……！' : '空から、なにかが……！';
  if (I.rollIn && !I.landed) {
    // 転がってくる（だんだん速く）。地ひびきで画面がゆれ続け、近づくほど大きくなる
    const R = bossCfg.roll;
    const u = Math.min(1, t / I.land);
    const left = ROLL_IN_DIST * (1 - Math.pow(u, 1.25));
    pos.copy(home).addScaledVector(I.out, left);
    const gy = introGroundY(pos.x, pos.z, home.y);
    pos.y += (gy - pos.y) * (1 - Math.exp(-6 * dt));
    const speed = dt > 0 ? Math.hypot(pos.x - I.prev.x, pos.z - I.prev.z) / dt : 0;
    I.prev.copy(pos);
    const roll = bossActions[R.clip];
    roll.timeScale = speed * roll.getClip().duration / R.loop;
    quake = Math.max(quake, 0.25 + 0.7 * u);
    if (t >= I.land) {
      // いつもの位置でドンと止まる
      I.landed = true;
      pos.copy(home);
      quake = 2.2;
      bossActions.idle.reset().play();
      roll.crossFadeTo(bossActions.idle, 0.5, false);
      const ds = bossCfg.camScale || 1;
      I.dust.push({ mesh: dustRing(home, 0xd9c6a5, 55 * ds), t: 0, life: 1.6 }, { mesh: dustRing(home, 0xb9a284, 34 * ds), t: -0.15, life: 1.4 },
        { mesh: dustCloud(home), t: 0, life: 2.4, cloud: true, size: ds });
      caption.textContent = '';
    }
  } else if (I.rollIn) {
    // 止まった反動で、ぐらっと前へ傾いて戻る
    const s = t - I.land;
    const w = Math.exp(-2.5 * s) * Math.sin(s * 7);
    boss.rotation.x = 0.12 * w;
    boss.scale.set(1 + 0.05 * w, 1 - 0.06 * w, 1 + 0.05 * w);
  } else if (!I.landed) {
    // 落ちる（だんだん速く）。勢いで縦にのびる
    const u = THREE.MathUtils.clamp((t - INTRO_FALL_FROM) / (INTRO_LAND - INTRO_FALL_FROM), 0, 1);
    pos.y = home.y + INTRO_FALL_H - (INTRO_FALL_H + bossCfg.sink) * u * u;
    boss.scale.set(1 - 0.08 * u, 1 + 0.12 * u, 1 - 0.08 * u);
    if (t >= INTRO_LAND) {
      // ぶつかった！
      I.landed = true;
      pos.y = home.y - bossCfg.sink;
      quake = 2.2;
      playSfx('bossLand');
      const ds = bossCfg.camScale || 1;
      I.dust.push({ mesh: dustRing(home, 0xd9c6a5, 55 * ds), t: 0, life: 1.6 }, { mesh: dustRing(home, 0xb9a284, 34 * ds), t: -0.15, life: 1.4 },
        { mesh: dustCloud(home), t: 0, life: 2.4, cloud: true, size: ds });
      caption.textContent = '';
    }
  } else {
    // めりこんだあと：つぶれて、ぷるんと戻る
    const s = t - I.land;
    const w = Math.exp(-2.2 * s) * Math.cos(s * 9);
    boss.scale.set(1 + 0.22 * w, 1 - 0.3 * w, 1 + 0.22 * w);
    // 浮かび上がる（上がりきったら少しふわっと揺れておさまる）
    const r = THREE.MathUtils.smootherstep(t, INTRO_RISE[0], INTRO_RISE[1]);
    const bob = Math.sin(Math.max(0, t - INTRO_RISE[0]) * 3) * 0.4 * r * (1 - THREE.MathUtils.smoothstep(t, INTRO_RISE[1], INTRO_RISE[1] + 1));
    pos.y = home.y - bossCfg.sink * (1 - r) + bob;
    boss.rotation.z = Math.sin(t * 1.7) * 0.2 * r * (1 - r);
  }
  // 爪をたたきつけて威嚇
  if (!I.slammed && t >= INTRO_SLAM) {
    I.slammed = true;
    I.slam = bossCfg.intro || bossCfg.attacks[0][0];
    startBossAttack(I.slam);
    bossHitDone = true;   // 町への攻撃にはしない
  }
  if (I.slammed && !I.slamHit && bossAttack && bossAttack.time >= (bossHitTimes[I.slam] ?? 0.9)) { I.slamHit = true; quake = Math.max(quake, 1.2); }
  // 土ぼこり
  for (const d of I.dust) {
    d.t += dt;
    const u = THREE.MathUtils.clamp(d.t / d.life, 0, 1);
    if (d.cloud) {
      const k = 1 - Math.pow(1 - u, 3);
      const z = d.size || 1;
      d.mesh.scale.set((6 + 30 * k) * z, (3 + 14 * k) * z, (6 + 30 * k) * z);
      d.mesh.material.opacity = 0.7 * (1 - u);
    } else {
      const k = 1 - Math.pow(1 - u, 2);
      d.mesh.scale.setScalar(Math.max(0.01, d.mesh.userData.size * k));
      d.mesh.material.opacity = 0.85 * (1 - u);
    }
    d.mesh.visible = d.t > 0 && u < 1;
  }
  // 暗転して終わる
  if (!I.faded && t >= INTRO_END - FADE_TIME) { I.faded = true; fadeEl.classList.add('on'); }
  if (t >= INTRO_END) {
    for (const d of I.dust) { scene.remove(d.mesh); d.mesh.geometry.dispose(); d.mesh.material.dispose(); }
    pos.copy(home);
    boss.scale.setScalar(1);
    boss.rotation.z = 0;
    boss.rotation.x = 0;
    bossIntro = null;
    bossAppeared = true;
    bossIdleTime = 0;
    if (bossAttack) { bossActions.idle.reset().play(); bossAttack.crossFadeTo(bossActions.idle, BOSS_FADE, false); bossAttack = null; }
    if (retreatLine && !bossCfg.hard) retreatLine.visible = true;
    camera.fov = 70;
    camera.updateProjectionMatrix();
    document.body.classList.remove('cutin');
    setTimeout(() => fadeEl.classList.remove('on'), 300);
    showToast(bossCfg.hard ? `${bossCfg.name}が現れた！ 町へ転がってくる……！` : `${bossCfg.name}が現れた！ ジェットで体当たりして、町から追い返そう`);
    saveGame();
  }
}
// 出現のカメラ。カットを切り替えながら、ボスの体を追って見る
function bossIntroCamera(dt) {
  const I = bossIntro, t = I.t;
  _il.copy(boss.position).setY(boss.position.y + bossCfg.bodyY);   // 体の中心
  let fov;
  if (t < I.land + 0.9) {
    // 落ち始める前は空を見上げ、落ちてきたら体を追う
    _ic.copy(I.camA);
    if (I.rollIn || t > INTRO_FALL_FROM - 0.2) I.look.lerp(_il, 1 - Math.exp(-6 * dt));
    fov = t < I.land ? 58 : 58 + 10 * Math.exp(-4 * (t - I.land));   // ぶつかった瞬間に少し広がる
  } else if (t < INTRO_SLAM - 0.2) {
    const u = THREE.MathUtils.smoothstep(t, I.land + 0.9, INTRO_SLAM - 0.2);
    _ic.lerpVectors(I.camB, I.home, 0.22 * u);   // ボスへ向かってまっすぐ寄る（見通しを確かめた線の上）
    if (!I.cutB) { I.cutB = true; I.look.copy(_il); }
    I.look.lerp(_il, 1 - Math.exp(-4 * dt));
    fov = 48 + 8 * u;
  } else {
    const u = THREE.MathUtils.smoothstep(t, INTRO_SLAM - 0.2, INTRO_END);
    _ic.lerpVectors(I.camC, I.home, 0.12 * u);   // ゆっくり寄る
    if (!I.cutC) { I.cutC = true; I.look.copy(_il); }
    I.look.lerp(_il, 1 - Math.exp(-4 * dt));
    fov = 62;
  }
  camera.position.copy(_ic);
  camera.lookAt(I.look);
  if (camera.fov !== fov) { camera.fov = fov; camera.updateProjectionMatrix(); }
  if (quake > 0.01) {
    const s = time.value * 60;
    camera.position.x += Math.sin(s * 1.3) * QUAKE_SHAKE * quake;
    camera.position.y += Math.sin(s * 1.9 + 2) * QUAKE_SHAKE * quake;
    camera.position.z += Math.sin(s * 1.1 + 4) * QUAKE_SHAKE * quake * 0.6;
  }
  sky.position.copy(camera.position);
  model.visible = true;
}
// ---- 町の崩壊（ボス3。ステージ 3 → 4） ----
// 町長の summon のセリフのあと、カットインになって：
//   A 砂煙の中、町のみんなが西の坂道（お城への道）を山へ駆け上がって避難していく
//   B ロックボスが町の外から地ひびきを立てて転がってくる
//   C 山の上から見下ろすと、ロックボスが町を突っ切って押しつぶしていく
//   → 暗転して、町を崩壊した町（town_collapsed.glb）に差し替える。町の人は山へ避難していなくなり、ステージ 4 になる
const COLLAPSE_CUT = [4.5, 9.0];      // B・C のカットの始まり（秒）
const COLLAPSE_END = 13.6;            // 暗転しきる時刻（最後の FADE_TIME で暗転する）
const EVAC_FROM = new THREE.Vector3(-52, 0, 4);    // 避難する人が集まって駆け出す所（町の西の外れ、お城への道の入り口）
const EVAC_TO = new THREE.Vector3(-120, 0, 5);     // 駆けていく先（お城への坂道）
const EVAC_SPEED = 3.2;                            // 駆ける速さ（m/秒）
const RAMPAGE_FROM = 48, RAMPAGE_TO = -38;         // C で転がる範囲（町の真ん中から、町の外への向きに m）
const DUST_COLOR = lin(0.72, 0.6, 0.45);           // 砂煙の霧の色
let collapse = null;              // { t, out, side, dust: [], puff, camB, camC, look, faded, swapping }
let townCollapsed = false;
let townGroup = null, distantGroup = null, foamObjs = [], collapsedLoading = null;
const dustEl = document.getElementById('dust');
// 崩壊した町は大きいので、ステージ 3 になったら裏で読み込んでおく
function preloadCollapsed() {
  collapsedLoading ||= load('models/town_collapsed.glb').catch((e) => { collapsedLoading = null; throw e; });
  return collapsedLoading;
}
function startCollapse() {
  preloadCollapsed().catch((e) => console.error(e));
  const out = new THREE.Vector3(BOSS_POS.x - BOSS_TARGET.x, 0, BOSS_POS.z - BOSS_TARGET.z).normalize();
  const side = new THREE.Vector3(-out.z, 0, out.x);
  collapse = { t: 0, out, side, dust: [], puff: 0, faded: false, swapping: false, prev: new THREE.Vector3(), look: new THREE.Vector3(),
    fogNear: scene.fog.near, fogFar: scene.fog.far, cut: -1 };
  // 町の人は、お城への道の入り口に集まって、山へ駆けていく（町長と話していた場所からは見えないので、カットの間だけ集める）
  residents.forEach((r, i) => {
    if (r.bread) { r.bread.claimedBy = null; r.bread = null; }
    r.route = r.afterRoute = null;
    r.state = 'evac';
    r.oneShot?.stop(); r.oneShot = null;
    r.root.visible = true;
    const row = Math.floor(i / 3), col = i % 3;
    r.root.position.copy(groundPoint(_rm.set(EVAC_FROM.x + 4 + row * 2.2 + Math.random(), 0, EVAC_FROM.z + (col - 1) * 1.6)));
    r.evac = groundPoint(_rm.set(EVAC_TO.x, 0, EVAC_TO.z + (col - 1) * 1.6));
    r.evacDelay = row * 0.35 + Math.random() * 0.3;
    setFace(r, 'sad');
  });
  // ボスは転がって町へ（転がるアニメ）
  boss.visible = true;
  boss.position.copy(BOSS_TARGET).addScaledVector(out, 160);
  boss.position.y = introGroundY(boss.position.x, boss.position.z, BOSS_POS.y);
  boss.rotation.y = Math.atan2(-out.x, -out.z);
  bossActions.idle.stop();
  bossActions[bossCfg.roll.clip].reset().play();
  rolling = 2;
  collapse.prev.copy(boss.position);
  // カメラ B：町の東の端の横から、転がってくるボスを見る。C：北の山の斜面から町を見下ろす
  const b = BOSS_TARGET.clone().addScaledVector(out, 38).addScaledVector(side, 72);
  collapse.camB = b.setY(introGroundY(b.x, b.z, 10) + 6);
  const c = new THREE.Vector3(BOSS_TARGET.x - 28, 0, BOSS_TARGET.z - 72);
  collapse.camC = c.setY(introGroundY(c.x, c.z, 20) + 26);
  jetting = false; jetEndTime = 0; jetSpeed = 0; jetVel.set(0, 0, 0); recoilVel.set(0, 0, 0);
  releaseAll();
  cutinEl.querySelector('.caption').textContent = '';
  document.body.classList.add('cutin');
  dustEl.classList.add('on');
}
// ボスを町の真ん中から外への向きに d の所へ（地面の高さに、なめらかに合わせる）
function collapseRoll(d, dt) {
  const C = collapse, pos = boss.position;
  pos.copy(BOSS_TARGET).addScaledVector(C.out, d).setY(pos.y);
  const gy = introGroundY(pos.x, pos.z, pos.y);
  pos.y += (gy - pos.y) * (1 - Math.exp(-5 * dt));
  const speed = dt > 0 ? Math.hypot(pos.x - C.prev.x, pos.z - C.prev.z) / dt : 0;
  C.prev.copy(pos);
  const roll = bossActions[bossCfg.roll.clip];
  roll.timeScale = speed * roll.getClip().duration / bossCfg.roll.loop;
}
function updateCollapse(dt) {
  const C = collapse;
  C.t += dt;
  const t = C.t, caption = cutinEl.querySelector('.caption');
  const cut = t < COLLAPSE_CUT[0] ? 0 : t < COLLAPSE_CUT[1] ? 1 : 2;
  if (cut !== C.cut) {
    C.cut = cut;
    caption.textContent = ['町のみんなが、山へ避難していく……！', 'ゴゴゴゴ……！ 脅威が転がってくる！', '脅威が、町を押しつぶしていく……！'][cut];
  }
  // 砂煙：霧を砂色にして近くまで濃くする（だんだん濃く）
  const k = Math.min(1, t / 1.5);
  scene.fog.color.lerp(DUST_COLOR, k);
  scene.fog.near = THREE.MathUtils.lerp(C.fogNear, 4, k);
  scene.fog.far = THREE.MathUtils.lerp(C.fogFar, cut === 2 ? 260 : 120, k);
  // 地ひびき
  quake = Math.max(quake, cut === 0 ? 0.35 : cut === 1 ? 0.35 + 0.6 * (t - COLLAPSE_CUT[0]) / (COLLAPSE_CUT[1] - COLLAPSE_CUT[0]) : 1.1);
  // ボス：B は町の外から町の東の端まで、C は町を突っ切って西へ
  if (cut <= 1) {
    const u = THREE.MathUtils.clamp(t / COLLAPSE_CUT[1], 0, 1);
    collapseRoll(THREE.MathUtils.lerp(160, RAMPAGE_FROM, Math.pow(u, 1.15)), dt);
  } else {
    const u = THREE.MathUtils.clamp((t - COLLAPSE_CUT[1]) / (COLLAPSE_END - COLLAPSE_CUT[1]), 0, 1);
    collapseRoll(THREE.MathUtils.lerp(RAMPAGE_FROM, RAMPAGE_TO, u), dt);
  }
  // 砂煙がもくもくと上がる（A は町の人の後ろの通り、B・C は転がるボスの足もと）
  if ((C.puff -= dt) <= 0) {
    if (cut === 0) {
      C.puff = 0.18;
      const at = groundPoint(_rm.set(EVAC_FROM.x + 8 + Math.random() * 22, 0, EVAC_FROM.z + (Math.random() - 0.5) * 12));
      C.dust.push({ mesh: dustCloud(at), t: 0, life: 3.2, cloud: true, size: 0.35 + Math.random() * 0.25 });
    } else {
      C.puff = cut === 1 ? 0.25 : 0.2;
      // ボスの後ろ（転がってきた側）に上がる。大きすぎるとカメラが包まれてしまう
      const at = boss.position.clone().addScaledVector(C.out, 14 + Math.random() * 10).addScaledVector(C.side, (Math.random() - 0.5) * 30);
      C.dust.push({ mesh: dustCloud(at), t: 0, life: 3, cloud: true, size: (cut === 1 ? 0.45 : 0.7) + Math.random() * 0.35 });
      if (cut === 2) { C.dust.push({ mesh: dustRing(boss.position, 0xcdb89a, 45), t: 0, life: 1.4 }); quake = Math.max(quake, 1.6); }
    }
  }
  for (const d of C.dust) {
    d.t += dt;
    const u = THREE.MathUtils.clamp(d.t / d.life, 0, 1);
    if (d.cloud) {
      const e = 1 - Math.pow(1 - u, 3), z = d.size;
      d.mesh.scale.set((6 + 30 * e) * z, (3 + 18 * e) * z, (6 + 30 * e) * z);
      d.mesh.material.opacity = 0.75 * (1 - u);
    } else {
      d.mesh.scale.setScalar(Math.max(0.01, d.mesh.userData.size * (1 - Math.pow(1 - u, 2))));
      d.mesh.material.opacity = 0.85 * (1 - u);
    }
    d.mesh.visible = u < 1;
  }
  // 暗転したら、町を差し替える（崩壊した町の読み込みが終わるまでは暗いまま）
  if (!C.faded && t >= COLLAPSE_END - FADE_TIME) { C.faded = true; fadeEl.classList.add('on'); }
  if (t >= COLLAPSE_END && !C.swapping) {
    C.swapping = true;
    caption.textContent = '';
    collapseTown().then(finishCollapse, (e) => { console.error(e); finishCollapse(); });
  }
}
function finishCollapse() {
  const C = collapse;
  for (const d of C.dust) { scene.remove(d.mesh); d.mesh.geometry.dispose(); d.mesh.material.dispose(); }
  scene.fog.near = C.fogNear;
  scene.fog.far = C.fogFar;
  collapse = null;
  // ボスは町の東の端に止まって、こちらをにらむ
  boss.position.copy(BOSS_TARGET).addScaledVector(C.out, BOSS_STOP);
  boss.position.y = introGroundY(boss.position.x, boss.position.z, boss.position.y);
  boss.rotation.y = Math.atan2(-C.out.x, -C.out.z);
  bossActions[bossCfg.roll.clip].stop();
  bossActions.idle.reset().play();
  rolling = 0;
  roamTarget = null;
  roamWait = 3;   // 少しにらんでから、転げまわり始める
  bossAppeared = true;
  storyStage = Math.max(storyStage, bossCfg.next);
  respawn();
  camera.fov = 70;
  camera.updateProjectionMatrix();
  document.body.classList.remove('cutin');
  dustEl.classList.remove('on');
  setTimeout(() => fadeEl.classList.remove('on'), 300);
  showToast('町が脅威に押しつぶされてしまった……！ パン工房の前で、工場長が待っている');
  saveGame();
}
function collapseCamera(dt) {
  const C = collapse, t = C.t;
  _il.copy(boss.position).setY(boss.position.y + bossCfg.bodyY);
  let fov = 60;
  if (C.cut === 0) {
    // 避難：坂道の先から、駆けてくる町の人を見る
    _ic.set(EVAC_FROM.x - 13, 0, EVAC_FROM.z + 4.5);
    _ic.y = introGroundY(_ic.x, _ic.z, 10) + 1.9;
    _il.set(EVAC_FROM.x + 3, 0, EVAC_FROM.z);
    _il.y = introGroundY(_il.x, _il.z, 10) + 1.4;
    C.look.copy(_il);
    fov = 55;
  } else if (C.cut === 1) {
    _ic.copy(C.camB);
    if (!C.lookB) { C.lookB = true; C.look.copy(_il); }
    C.look.lerp(_il, 1 - Math.exp(-5 * dt));
    fov = 52 + 8 * THREE.MathUtils.smoothstep(t, COLLAPSE_CUT[0], COLLAPSE_CUT[1]);
  } else {
    _ic.copy(C.camC);
    if (!C.lookC) { C.lookC = true; C.look.copy(_il); }
    C.look.lerp(_il, 1 - Math.exp(-3 * dt));
    fov = 50;
  }
  camera.position.copy(_ic);
  camera.lookAt(C.look);
  if (camera.fov !== fov) { camera.fov = fov; camera.updateProjectionMatrix(); }
  if (quake > 0.01) {
    const s = time.value * 60;
    camera.position.x += Math.sin(s * 1.3) * QUAKE_SHAKE * quake;
    camera.position.y += Math.sin(s * 1.9 + 2) * QUAKE_SHAKE * quake;
    camera.position.z += Math.sin(s * 1.1 + 4) * QUAKE_SHAKE * quake * 0.6;
  }
  sky.position.copy(camera.position);
  model.visible = true;
}
// 町を崩壊した町に差し替える（当たり判定・滝の泡も作り直す）。廃墟の部品と、元に戻した区画の部品は消す
async function collapseTown() {
  const gltf = await preloadCollapsed();
  if (townCollapsed) return;
  townCollapsed = true;
  scene.remove(townGroup);
  townGroup.traverse((o) => { if (o.isMesh) o.geometry.dispose(); });
  if (windmill) { scene.remove(windmill); windmill = null; }
  for (const o of foamObjs) { scene.remove(o); o.geometry.dispose(); o.material.dispose(); }
  foamObjs = [];
  for (const a of ruinAreas) {
    if (a.ruin.parent) scene.remove(a.ruin);
    a.hidden.visible = false;
    a.toggles.forEach((o) => { o.visible = false; });
    a.ruinSolid = [];
    a.restored = false;
    a.fade = RUIN_TINT_FADE;
    for (const i of a.boxIdx) ruinUniforms.uRuinAmt.value[i] = 1;   // 町じゅうをくすませる
  }
  windmill = takeWindmillRotor(gltf.scene);
  if (windmill.children.length) scene.add(windmill); else windmill = null;
  const mats = new Set();
  gltf.scene.traverse((o) => { if (o.isMesh) mats.add(o.material); });
  townGroup = mergeByMaterial(gltf.scene);
  for (const m of townGroup.children) {
    fixUnexportedColor(m.material);
    if (isWater(m.material)) { makeWater(m.material); m.castShadow = false; }
  }
  for (const m of mats) if (!isWater(m)) addRuinTint(m);
  scene.add(townGroup);
  style.apply(townGroup);   // 新しい町の材質もアニメ調に
  if (windmill) style.apply(windmill);
  buildCollider([townGroup, distantGroup], [], stallBlocks(gltf.scene));
  rebuildRuinCollider();
  setupFoam(gltf.scene, townGroup);
  enterCollapsed();
}
// 崩壊したあと：町の人は山の上の丘へ避難している（工場長だけはパン工房の前にいる）。小バイ菌と助けを呼ぶ声もなくなる
function enterCollapsed() {
  for (const r of residents) {
    r.hungry = false;
    if (r.guest) continue;   // お城の女の子は、お城にいたまま
    if (r.id === '0-1') {
      // 工場長だけは山へ避難せず、半分崩れたパン工房の前に立っている（魔法のパン種をくれる）
      r.state = 'idle';
      r.root.position.copy(groundPoint(r.home));
      r.root.rotation.y = r.standFace ?? r.root.rotation.y;
      r.root.visible = true;
      continue;
    }
    toHill(r);   // ほかの人は、避難した丘にいる
  }
  for (const g of germs) { g.state = 'defeat'; g.done = true; g.target = null; scene.remove(g.root); }
  for (const h of helps) {
    scene.remove(h.arrow, h.icon);
    h.arrow.traverse((o) => { if (o.isMesh) o.material.dispose(); });
    h.icon.material.map.dispose();
    h.icon.material.dispose();
  }
  helps.length = 0;
}
// ---- 避難した丘（町が崩壊したあと） ----
// 山の斜面の町のさらに上の草の丘。崩れた町と、転げまわる脅威を見下ろせる（脅威の行き先より外なので、ここまでは来ない）。
// 町長を真ん中に、町のほう（+Z）を向いて集まっている。家には帰らず、丘の上を少しだけ歩く
const MAYOR_HILL = new THREE.Vector3(0, 0, -150);
const HILL_SPOTS = {   // 町長からの位置（x, z）
  '1-1': [0, 0], '3-1': [6, 1], '4-1': [3, 3], '7-1': [-2, 5], '2-2': [-4, 4], '7-2': [-6, 5],   // 丘の西には木があるので、その手前
};
const HILL_ROAM = 1.5;   // 丘の上で歩きまわる範囲（m）
function toHill(r) {
  const [dx, dz] = HILL_SPOTS[r.id] || [Math.random() * 8 - 4, Math.random() * 4 - 1];
  // 木の上に乗らないよう、丘の地面の少し上から下を調べる
  const top = (hillGround ||= groundPoint(MAYOR_HILL)).y + 4;
  _o.set(MAYOR_HILL.x + dx, top, MAYOR_HILL.z + dz);
  const hit = cast(_o, DOWN, 20);
  r.home = new THREE.Vector3(_o.x, hit ? hit.point.y : top - 4, _o.z);
  r.root.position.copy(r.home);
  r.root.rotation.y = 0;   // 町のほう（+Z）を向く
  r.standFace = 0;
  r.root.visible = true;
  r.state = 'idle';
  r.wait = 1 + Math.random() * 2;
  r.leaving = false;
  r.house = null;          // 夜も家には帰らない
  r.roam = Math.min(r.roam, HILL_ROAM);
}
// ---- 町長の警告（魔法のパン種を付けて、はじめて発射しようとしたとき） ----
// 丘へ避難していた町長が、ふわおのところへ歩いてきて止める（talks.json の warning）。話し終わると丘のほうへ去っていき、丘に戻る
let mayorWarned = false;
const MAYOR_COME_FROM = 14;       // 町長が歩いてくる距離（m）
const MAYOR_WALK = 1.8;           // 歩いてくる速さ（m/秒）
const MAYOR_LEAVE = 30;           // 話し終わって去っていく距離（m。そこで見えなくなる）
function startMayorWarn() {
  const r = residents.find((x) => x.id === '1-1');
  if (!r || !TALKS.warning) return;
  mayorWarned = true;
  // 避難した丘のほうから歩いてくる
  _rd.set(MAYOR_HILL.x - feet.x, 0, MAYOR_HILL.z - feet.z);
  if (_rd.lengthSq() < 1) _rd.set(0, 0, -1);   // 丘の上にいるときは、さらに奥から
  _rd.normalize();
  r.root.position.copy(groundPoint(_rm.set(feet.x + _rd.x * MAYOR_COME_FROM, 0, feet.z + _rd.z * MAYOR_COME_FROM)));
  r.root.visible = true;
  r.state = 'approach';
  r.leaving = false;
  setFace(r, 'sad');
}
function mayorTalk(r) {
  const book = TALKS.warning;
  const t = book.talks[0];
  r.state = 'talk';
  talkWith = r;
  talkRefill = talkGift = talkSummon = null;
  keys.clear();
  touch.reset();
  r.leaveAfterTalk = true;
  talk.open({
    name: t.name || book.name, portrait: null,
    lines: t.lines.map((l) => ({ text: typeof l === 'string' ? l : l.text, portrait: portraitSrc(book.portrait, (typeof l === 'object' && l.face) || t.face) })),
  });
}
// 話し終わった町長は、丘のほうへ去っていく（見えなくなったら丘に戻っている）
function mayorLeave(r) {
  r.leaveAfterTalk = false;
  r.leaving = true;
  _rd.set(MAYOR_HILL.x - r.root.position.x, 0, MAYOR_HILL.z - r.root.position.z).normalize();
  r.evac = groundPoint(_rm.set(r.root.position.x + _rd.x * MAYOR_LEAVE, 0, r.root.position.z + _rd.z * MAYOR_LEAVE));
  r.evacDelay = 0.6;
  r.state = 'evac';
}

// ---- 最後の演出（魔法のパン種で、脅威3 を倒す） ----
// 町を転げまわる脅威の顔（RB_Hurt_Face）に、魔法のパン種を付けたままジェットで体当たりすると：
//   パン種が顔にめりこむ → 石板のすき間が金色に脈打ち、だんだん強く光る（RB_Glow。砕けるクリップの 211〜217 をゆっくり）
//   → はじける（白い閃光・大きなゆれ・キラキラ・砂煙。218 から砕けるクリップの続きで破片が飛び散る）
//   → 暗転して、ぼろぼろのメカだけが残っている → エンディング
// ぼろぼろのメカのモデルはまだないので、今のメカを傾けて黒ずませ、ふわおを消して煙を出している
const FACE_HIT_ANGLE = THREE.MathUtils.degToRad(25);   // 顔の向きから上下左右この角度まで（顔の中心から約 10m）にぶつかれば、顔に当たったことにする
// 字幕が読めるように、ひとつひとつの場面は長めに
// メカが飛ばされる動き（演出の間はふつうの移動を止めているので、ここで動かす）
const FINALE_BLAST = [16, 13];       // はじけたときに吹き飛ばされる速さ（横、上。m/秒）
const FINALE_BLAST_SPIN = [-9, 4];   // そのとき回る速さ（前後、左右。rad/秒）
const WRECK_TILT = [0.25, 0.42];     // ぼろぼろのメカの傾き（前後、左右。rad）
// 投げ出されたメカ：放物線で飛び、壁に当たったら横の勢いを失い、地面で何度かはずんで止まる。
// 止まったら settle の傾きへゆっくり起き上がる（倒れる）
function flyRobot(dt) {
  const B = finale.fly;
  if (!B) return;
  const k = 1 - Math.exp(-4 * dt);
  if (B.rest) {
    B.rx += (B.settle[0] - B.rx) * k;
    B.rz += (B.settle[1] - B.rz) * k;
    return;
  }
  B.vel.y -= GRAVITY * dt;
  // 壁や崩れた家にぶつかったら、横の勢いを失う
  _rd.set(B.vel.x, 0, B.vel.z);
  const step = _rd.length() * dt;
  if (step > 1e-4 && B.vel.y < 0) {   // 上がっている間は、ガレキの上へ抜けていく
    _o.set(feet.x, feet.y + 1.4, feet.z);   // 低いガレキは越えて飛ぶ
    const hit = cast(_o, _rd.normalize(), step + RADIUS);
    if (hit && hitNormal(hit, _rd)) { B.vel.x = 0; B.vel.z = 0; }   // 横の勢いを失って、その場に落ちる
  }
  feet.addScaledVector(B.vel, dt);
  B.rx += B.spinX * dt;
  B.rz += B.spinZ * dt;
  const gy = groundBelow(feet, 1);
  // 川に落ちたら、水面ではねて岸まで進む（川の底で止まらないように）
  const water = gy !== null ? waterLevel(feet, gy) : null;
  if (water !== null && feet.y <= water && B.vel.y <= 0) {
    feet.y = water;
    B.vel.y = Math.max(3, -B.vel.y * 0.3);
    _rd.set(B.vel.x, 0, B.vel.z);
    if (_rd.lengthSq() < 16) { if (_rd.lengthSq() < 1e-4) _rd.copy(finale.out); _rd.setLength(4); B.vel.x = _rd.x; B.vel.z = _rd.z; }
    return;
  }
  if (gy !== null && feet.y <= gy && B.vel.y <= 0) {   // 着地は落ちてくるときだけ
    feet.y = gy;
    if (B.vel.y < -4) {
      // はずむ（回転も弱まる）
      B.vel.y *= -0.35; B.vel.x *= 0.55; B.vel.z *= 0.55;
      B.spinX *= 0.5; B.spinZ *= 0.5;
      quake = Math.max(quake, 0.6);
    } else {
      B.vel.set(0, 0, 0);
      B.rest = true;
      // 回った角度を、近い向きにそろえてから、止まる傾きへ
      B.rx = Math.atan2(Math.sin(B.rx), Math.cos(B.rx));
      B.rz = Math.atan2(Math.sin(B.rz), Math.cos(B.rz));
    }
  }
}
const FINALE_GLOW = [1.0, 6.0];      // 金色に光っている時間（秒）。この間に 211→217 フレームをゆっくり進める
const FINALE_SAY_GLOW = 2.5;         // 「パン種が、中でふくらんでいく」に字幕が変わる時刻
const FINALE_BURST_SPEED = 0.6;      // はじけたあとの砕けるクリップ（218〜290、3 秒）の速さ。ゆっくり見せる
const FINALE_WRECK = 12.0;           // 暗転のあと、ぼろぼろのメカの場面になる時刻
const FINALE_END = 20.0;             // エンディングの画面へ
const WRECK_CAM = [7.5, 3.2];          // ぼろぼろのメカの場面：カメラの、はじめの距離と、寄りきったときの距離（m）
let finale = null;                   // { t, phase, cam, look, faded, glowMats, burst }
const flashEl = document.getElementById('flash');
const endingEl = document.getElementById('ending');
function startFinale() {
  const out = new THREE.Vector3(feet.x - boss.position.x, 0, feet.z - boss.position.z).normalize();   // ボスからふわおへ
  finale = { t: 0, phase: 'glow', out, look: new THREE.Vector3(), faded: false, burst: false, wreck: false, puff: 0, dust: [] };
  savingOn = false;   // つづきからは、最後の体当たりの前から
  document.getElementById('endingImg').src = endingSrc();   // エンディングの絵を先に読んでおく
  // ロボははね返されて地面に落ち、パン種は顔の中へ
  jetting = false; jetEndTime = 0; jetSpeed = 0;
  jetVel.set(0, 0, 0); recoilVel.set(0, 0, 0); velY = 0;
  finale.fly = { vel: out.clone().multiplyScalar(7).setY(6), rx: 0, rz: 0, spinX: -3, spinZ: 1.5, rest: false, settle: [0, 0] };
  yeastGun.visible = false;
  beginShatterGlow();
  quake = Math.max(quake, 1.5);
  // カメラ：ボスのふわお側の斜め前、引き気味に（破片は 35m の高さ、60m 先まで飛ぶ）
  const side = new THREE.Vector3(-out.z, 0, out.x);
  // 真横寄りに置いて、はじけたあと飛ばされるメカが画面を横切るようにする
  finale.cam = boss.position.clone().addScaledVector(out, 30).addScaledVector(side, 85);
  finale.cam.y = Math.max(introGroundY(finale.cam.x, finale.cam.z, boss.position.y), boss.position.y) + 18;
  finale.look.copy(boss.position).setY(boss.position.y + 21);
  cutinEl.querySelector('.caption').textContent = '魔法のパン種が、脅威の顔にめりこんだ！';
  document.body.classList.add('cutin');
  releaseAll();
}
// パン種が顔に入った：脅威は転がるのをやめて、砕けるクリップの 211 フレームで止める（時刻はこちらで進める）。
// すき間の光る材質を集めておく（体当たりでも、撃っても同じ）
function beginShatterGlow() {
  for (const a of Object.values(bossActions)) { a.stop(); a.paused = false; }
  const sh = bossActions.shatter;
  sh.reset().play();
  sh.paused = true;
  sh.time = 1 / ANIM_FPS;
  rolling = 0;
  // 光る材質（EXP_RB_glow）。アニメ調の材質と元の材質の両方
  finale.glowMats = [];
  boss.traverse((o) => {
    if (!o.isMesh) return;
    for (const m of new Set([o.material, o.userData.pbrMaterial])) if (m && /RB_glow/i.test(m.name)) { m.userData.baseGlow ??= m.emissiveIntensity; finale.glowMats.push(m); }
  });
  boss.getObjectByName('RB_Hurt_Face').getWorldPosition(_oc2);
  sparkleBurst(_oc2, 30, 1.2);
}
function updateFinale(dt) {
  const F = finale;
  F.t += dt;
  if (F.mode === 'shot') {
    updateBeam(dt);
    if (F.phase === 'charge' || F.phase === 'fire' || F.phase === 'beam') { updateYeastShot(dt); return; }
  }
  if (F.phase !== 'wreck') flyRobot(dt);
  const t = F.t, caption = cutinEl.querySelector('.caption');
  const sh = bossActions.shatter;
  if (F.phase === 'glow') {
    // 211→217 フレームをゆっくり。すき間の金色が、だんだん速く、強く脈打つ
    const u = THREE.MathUtils.clamp((t - FINALE_GLOW[0]) / (FINALE_GLOW[1] - FINALE_GLOW[0]), 0, 1);
    sh.time = (1 + 6 * u) / ANIM_FPS;
    const pulse = 0.5 + 0.5 * Math.sin(t * (6 + 22 * u));
    for (const m of F.glowMats) m.emissiveIntensity = m.userData.baseGlow * (1 + 3.5 * u) * (0.6 + 0.6 * pulse);
    quake = Math.max(quake, 0.3 + 1.2 * u);
    if (t > FINALE_SAY_GLOW && !F.saidGlow) { F.saidGlow = true; caption.textContent = 'パン種が、中でふくらんでいく……！'; }
    if (t >= FINALE_GLOW[1]) {
      // はじける！
      F.phase = 'burst';
      // 撃ったときは、ロボは爆風で少し飛ばされて、立ったまま着地する（体当たりのときは大きく飛ばされて壊れる）
      F.fly = F.mode === 'shot'
        ? { vel: F.out.clone().multiplyScalar(SHOT_BLAST[0]).setY(SHOT_BLAST[1]), rx: 0, rz: 0, spinX: -1.2, spinZ: 0.6, rest: false, settle: [0, 0] }
        : { vel: F.out.clone().multiplyScalar(FINALE_BLAST[0]).setY(FINALE_BLAST[1]), rx: F.fly?.rx || 0, rz: F.fly?.rz || 0,
          spinX: FINALE_BLAST_SPIN[0], spinZ: FINALE_BLAST_SPIN[1], rest: false, settle: WRECK_TILT };
      sh.time = 8 / ANIM_FPS;
      sh.paused = false;
      sh.timeScale = FINALE_BURST_SPEED;
      quake = 3;
      playSfx('explode');
      flashEl.classList.remove('on'); void flashEl.offsetWidth; flashEl.classList.add('on');
      const c = boss.position.clone().setY(boss.position.y + 21);
      for (let i = 0; i < 6; i++) sparkleBurst(_rm.set(c.x + (Math.random() - 0.5) * 30, c.y + (Math.random() - 0.5) * 20, c.z + (Math.random() - 0.5) * 30), 24, 2.5);
      const g = boss.position.clone();
      F.dust.push({ mesh: dustRing(g, 0xe8d8b0, 120), t: 0, life: 2.2 }, { mesh: dustCloud(g), t: 0, life: 3.5, cloud: true, size: 2.4 });
      caption.textContent = '脅威が、はじけ飛んだ！';
    }
  }
  if (F.phase === 'burst') {
    for (const m of F.glowMats) m.emissiveIntensity *= Math.exp(-3 * dt);
    if (F.mode === 'shot' && t > SHOT_END_SAY && !F.saidEnd) { F.saidEnd = true; caption.textContent = '町に、静けさがもどった……'; }
    if (!F.faded && t >= FINALE_WRECK - FADE_TIME) { F.faded = true; fadeEl.classList.add('on'); }
    if (t >= FINALE_WRECK) { if (F.mode === 'shot') showEnding(); else setupWreck(); }
  }
  if (F.phase === 'wreck') {
    // 煙が細く上がり続ける
    for (const sm of F.smoke) {
      if ((sm.wait -= dt) > 0) continue;
      sm.wait = 0.5 + Math.random() * 0.4;
      const mesh = dustCloud(_rm.copy(sm.at));
      mesh.material.color.setHex(0x3e3834);   // 黒い煙（設定画のように）
      F.dust.push({ mesh, t: 0, life: 3, cloud: true, size: (0.008 + Math.random() * 0.005) * sm.w, smoke: true });
    }
    if (t >= FINALE_END - FADE_TIME && !F.endFade) { F.endFade = true; fadeEl.classList.add('on'); }
    if (t >= FINALE_END) showEnding();
  }
  for (const d of F.dust) {
    d.t += dt;
    const u = THREE.MathUtils.clamp(d.t / d.life, 0, 1);
    if (d.cloud) {
      const e = 1 - Math.pow(1 - u, 3), z = d.size;
      d.mesh.scale.set((6 + 30 * e) * z, (3 + 18 * e) * z * (d.smoke ? 3 : 1), (6 + 30 * e) * z);
      if (d.smoke) d.mesh.position.y += dt * 1.2;
      d.mesh.material.opacity = (d.smoke ? 0.5 : 0.75) * (1 - u);
    } else {
      d.mesh.scale.setScalar(Math.max(0.01, d.mesh.userData.size * (1 - Math.pow(1 - u, 2))));
      d.mesh.material.opacity = 0.85 * (1 - u);
    }
    d.mesh.visible = u < 1;
  }
}
// 壊れたメカ（mecha_wreck.glb）：横倒しの動かない置物。最後の演出で、メカが落ちた場所に置き換える。
// 煙は背中の裂けた穴・噴射口・つぶれた砲口から（MW_Root からの位置）
const WRECK_SMOKE = [[0.03, 0.9, -0.3, 1], [-0.24, 0.4, -0.71, 0.6], [0.25, 0.43, 1.0, 0.5]];   // [x, y, z, 太さ]
let wreckModel = null;
function setupWreckModel(gltf) {
  wreckModel = gltf.scene;
  wreckModel.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  wreckModel.visible = false;
  scene.add(wreckModel);
}
// ぼろぼろのメカだけが残っている（ふわおはいない。煙が上がる）
function setupWreck() {
  const F = finale;
  F.phase = 'wreck';
  boss.visible = false;
  bossGone = true;
  bossAppeared = false;
  if (retreatLine) retreatLine.visible = false;
  for (const m of F.glowMats) m.emissiveIntensity = m.userData.baseGlow;
  jetVel.set(0, 0, 0); recoilVel.set(0, 0, 0); velY = 0;
  snapToGround(true);
  // 落ちた場所に、壊れたメカを置く（砲身を、飛ばされてきた向きに）
  model.visible = false;
  wreckModel.position.set(feet.x, feet.y - 0.05, feet.z);
  wreckModel.rotation.y = heading;
  wreckModel.visible = true;
  F.smoke = WRECK_SMOKE.map(([x, y, z, w]) => ({ at: new THREE.Vector3(x, y, z).applyAxisAngle(UP, heading).add(wreckModel.position), w, wait: Math.random() * 0.5 }));
  bossActions.shatter.timeScale = 1;
  // 見ればわかるので字幕は出さない。カメラはメカが見える向き（建物やガレキにさえぎられない向き）から寄っていく
  cutinEl.querySelector('.caption').textContent = '';
  F.look.set(feet.x, feet.y + 0.6, feet.z);
  F.camDir = wreckCameraDir(F.look);
  setTimeout(() => fadeEl.classList.remove('on'), 300);
}
// メカのまわり 12 方向から、メカとの間に何もない向きをさがす（メカの正面寄りから順に）。カメラは少し上から見下ろす
function wreckCameraDir(look) {
  const d = new THREE.Vector3(), up = 0.45;
  for (let i = 0; i < 12; i++) {
    const a = heading + (i % 2 ? 1 : -1) * Math.ceil(i / 2) * Math.PI / 6;
    d.set(Math.sin(a), up, Math.cos(a)).normalize();
    // 寄る途中もさえぎられないように、いちばん遠い位置まで確かめる
    if (!cast(look, d, WRECK_CAM[0], leafCollider ? [...colliders, leafCollider] : colliders)) return d.clone();
  }
  return new THREE.Vector3(0, 1, 0.001).normalize();   // どの向きもふさがっていたら真上から
}
function finaleCamera(dt) {
  const F = finale;
  if (F.mode === 'shot') shotCamera(dt);
  else if (F.phase === 'wreck' || F.phase === 'ending') {
    // メカへゆっくり寄っていく
    const k = THREE.MathUtils.smoothstep(F.t, FINALE_WRECK, FINALE_END);
    camera.position.copy(F.look).addScaledVector(F.camDir, THREE.MathUtils.lerp(WRECK_CAM[0], WRECK_CAM[1], k));
    camera.lookAt(F.look);
    model.visible = false;   // 壊れたメカ（wreckModel）に置き換えている
  } else {
    boss.getObjectByName('RB_Ball').getWorldPosition(_il);
    if (F.phase === 'glow') F.look.lerp(_il, 1 - Math.exp(-3 * dt));
    // はじけたあとは、脅威と飛ばされていくメカの間を見る
    else F.look.lerp(_ic.copy(_il).lerp(feet, 0.5), 1 - Math.exp(-2.5 * dt));
    camera.position.copy(F.cam);
    camera.lookAt(F.look);
    model.visible = true;
    // 飛ばされて回っているメカ
    if (F.fly) model.rotation.set(F.fly.rx, 0, F.fly.rz);
  }
  const fov = F.phase === 'wreck' ? 50 : 62;
  if (camera.fov !== fov) { camera.fov = fov; camera.updateProjectionMatrix(); }
  if (quake > 0.01) {
    const s = time.value * 60;
    camera.position.x += Math.sin(s * 1.3) * QUAKE_SHAKE * quake;
    camera.position.y += Math.sin(s * 1.9 + 2) * QUAKE_SHAKE * quake;
    camera.position.z += Math.sin(s * 1.1 + 4) * QUAKE_SHAKE * quake * 0.6;
  }
  sky.position.copy(camera.position);
}
// ---- 魔法のパン種を撃つ（秘伝の打ち粉をまぶしたあと。一度きり） ----
// 脅威3 の顔の正面で、顔と同じ高さにいるときに発射ボタンを押すと：
//   溜め（パン種がふくらみ、まわりから光が集まる）→ 発射（金色の光線が顔までのびる。光の輪が光線を走る）
//   → 命中（閃光）→ すき間が金色に脈打つ → はじける（体当たりの演出と同じ。ここから先は updateFinale）
//   → ロボは爆風で少し飛ばされて着地 → 暗転してエンディング（ふわおは生きて帰る）
const YEAST_AIM_HEIGHT = 4;                                  // 顔の高さとの差がこれ以内（m。ロボの胸の高さで比べる）
const YEAST_AIM_ANGLE = THREE.MathUtils.degToRad(30);        // 顔の向きから左右この角度以内
const YEAST_AIM_RANGE = [3, 60];                             // 顔からの水平の距離（m）
const YEAST_AIM_HINT = 8;                                    // 「今だ！」のメッセージの間隔（秒）
const YEAST_AIM_TILT = 0.35;                                 // 顔がこれより上や下を向いているときは撃てない（向きの上下の成分）
// ねらう点：顔の板（RB_Plate_Face）の中で、目（上 2.8m）と口（下 1.6m）のまん中あたり、板の表面より少し前。
// 当たり判定の中心（RB_Hurt_Face、上 0.3m）だと、見た目には顔の下のほうに当たって見える
const FACE_AIM_LOCAL = new THREE.Vector3(0, 0.7, 1.2);
const SHOT_GLIDE = 5;           // 溜めの間に、ロボが顔の真正面へ寄っていく速さ（1/秒）
const YEAST_CHARGE = 3.2;      // 溜めの長さ（秒）
const YEAST_BEAM_GROW = 0.25;  // 光線が顔までのびる時間（秒）
const YEAST_BEAM = 2.6;        // 光線が出ている時間（のびはじめから。秒）
const YEAST_BEAM_FADE = 0.6;   // 光線が細くなって消える時間（秒）
const SHOT_BLAST = [6, 4];     // はじけたときにロボが飛ばされる速さ（横、上。m/秒）。体当たりより弱い
const SHOT_END_SAY = 8.5;      // 「静けさがもどった」の字幕の時刻（命中から。秒）
const _ya = new THREE.Vector3(), _yn = new THREE.Vector3(), _yd = new THREE.Vector3(), _yf = new THREE.Vector3(), _yq = new THREE.Quaternion();
// 顔のねらう点（face）と、顔の正面の向き（normal。板のローカル +Z）
function faceAimPoint(face, normal) {
  const plate = boss?.getObjectByName('RB_Plate_Face');
  if (!plate) return false;
  plate.updateWorldMatrix(true, false);
  face.copy(FACE_AIM_LOCAL).applyMatrix4(plate.matrixWorld);
  if (normal) normal.set(0, 0, 1).applyQuaternion(plate.getWorldQuaternion(_yq)).normalize();
  return true;
}
let yeastAimHint = -Infinity, yeastAimed = false, doughMats = null;
// 顔の正面・同じ高さにいるか。face に顔の中心（RB_Hurt_Face）を入れて返す
function yeastAim(face) {
  if (!items.has('flour') || !boss || !bossRoaming() || knockout) return false;
  if (!faceAimPoint(face, _yn)) return false;   // 顔の正面の向き（転がると顔も回る）
  if (Math.abs(_yn.y) > YEAST_AIM_TILT) return false;    // 顔が上や下を向いているときはだめ
  if (Math.abs(feet.y + ROBOT_HEIGHT / 2 - face.y) > YEAST_AIM_HEIGHT) return false;
  _yd.set(feet.x - face.x, 0, feet.z - face.z);
  const d = _yd.length();
  if (d < YEAST_AIM_RANGE[0] || d > YEAST_AIM_RANGE[1]) return false;
  _yn.setY(0).normalize();
  return _yd.dot(_yn) / d > Math.cos(YEAST_AIM_ANGLE);
}
// パン種の光る材質（アニメ調の材質と元の材質の両方）
function yeastDoughMats() {
  if (doughMats) return doughMats;
  doughMats = [];
  yeastGun?.traverse((o) => {
    if (!o.isMesh) return;
    for (const m of new Set([o.material, o.userData.pbrMaterial])) if (m && /YS_dough/i.test(m.name)) { m.userData.baseGlow ??= m.emissiveIntensity; doughMats.push(m); }
  });
  return doughMats;
}
function setDoughGlow(k) { for (const m of yeastDoughMats()) m.emissiveIntensity = m.userData.baseGlow * k; }
// ねらいが合っている間は、パン種が強く脈打つ。合ったときに「今だ！」
function updateYeastAim() {
  if (!items.has('flour') || finale || !yeastGun?.visible) { if (yeastAimed) { yeastAimed = false; setDoughGlow(1); } return; }
  const on = yeastAim(_yf);
  if (on) setDoughGlow(2.2 + 1.3 * Math.sin(time.value * 9));
  else if (yeastAimed) setDoughGlow(1);
  if (on && !yeastAimed && time.value - yeastAimHint > YEAST_AIM_HINT && !talk.active) {
    yeastAimHint = time.value;
    showToast('脅威の顔の正面だ！ 今なら撃てる！');
  }
  yeastAimed = on;
}
// 光の筋（ふちのない筒。+Z の向きに長さ 1。scale.z で長さを変える）
function beamPart(r, color, opacity) {
  const g = new THREE.CylinderGeometry(r, r, 1, 20, 1, true);
  g.rotateX(Math.PI / 2);
  g.translate(0, 0, 0.5);
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
  m.userData.opacity = opacity;
  m.renderOrder = 997;
  return m;
}
function glowSprite(size, opacity = 1) {
  sparkleBurst(_ya.set(0, -1000, 0), 0);   // 星のテクスチャを作っておく
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkTex, color: 0xffffff, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending }));
  sp.scale.setScalar(size);
  sp.renderOrder = 999;
  sp.userData.size = size;
  return sp;
}
// まわりから光の粒が集まってくる（sparks の速さは減っていくので、着く速さで打ち出す）
function sparkleInto(to, n, radius, size) {
  sparkleBurst(_ya.set(0, -1000, 0), 0);
  for (let i = 0; i < n; i++) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    _yd.randomDirection().multiplyScalar(radius * (0.6 + Math.random() * 0.4));
    sp.position.copy(to).add(_yd);
    sp.userData = { vel: _yd.clone().multiplyScalar(-2.6), t: 0, life: 0.9 + Math.random() * 0.4, size: size * (0.6 + Math.random() * 0.8), spin: (Math.random() - 0.5) * 6 };
    sp.renderOrder = 998;
    sparkGroup.add(sp);
    sparks.push(sp);
  }
}
function startYeastShot() {
  const target = new THREE.Vector3(), normal = new THREE.Vector3();
  if (!yeastAim(target)) return;
  faceAimPoint(target, normal);
  // 顔の真正面からまっすぐ撃ちこむ：砲口を、顔の正面の向きの線の上（今と同じ距離）へ寄せていく
  muzzle.updateWorldMatrix(true, false);
  muzzle.getWorldPosition(_yf);
  const shotFrom = target.clone().addScaledVector(normal, _yf.distanceTo(target));
  const aim = new THREE.Vector3(-normal.x, 0, -normal.z).normalize();   // ロボから顔へ（水平）
  const out = aim.clone().negate();                                                    // 顔からロボへ
  finale = { mode: 'shot', t: 0, phase: 'charge', out, aim, side: new THREE.Vector3(-aim.z, 0, aim.x), target, shotFrom,
    look: new THREE.Vector3(feet.x, feet.y + 1, feet.z), camPos: camera.position.clone(),
    faded: false, burst: false, wreck: false, puff: 0, dust: [], fly: null, glowMats: [], beam: null };
  savingOn = false;   // つづきからは、撃つ前から
  yeastAimed = false;
  jetting = false; jetEndTime = 0; jetSpeed = 0;
  jetVel.set(0, 0, 0); recoilVel.set(0, 0, 0); velY = 0;
  // 脅威はその場で止まる（顔がずれないように、転がるアニメも止める）
  for (const a of Object.values(bossActions)) a.paused = true;
  // 溜め：パン種がだんだん速く脈打ちながらふくらむ
  yeastGunActs.idle?.stop();
  const ch = yeastGunActs.charge;
  if (ch) { ch.reset().play(); ch.timeScale = ch.getClip().duration / YEAST_CHARGE; }
  cutinEl.querySelector('.caption').textContent = '魔法のパン種に、光が集まっていく……';
  document.body.classList.add('cutin');
  releaseAll();
}
// 溜め → 発射 → 光線がのびる → 命中
function updateYeastShot(dt) {
  const F = finale, t = F.t, caption = cutinEl.querySelector('.caption');
  // ロボは顔のほうへ向き直る
  heading = turnToward(heading, Math.atan2(F.aim.x, F.aim.z), 1 - Math.exp(-8 * dt));
  muzzle.updateWorldMatrix(true, false);
  muzzle.getWorldPosition(_yf);
  // 溜めの間に、砲口が顔の真正面の線の上へ来るよう、ロボを寄せる
  if (F.phase === 'charge') feet.addScaledVector(_yd.subVectors(F.shotFrom, _yf), 1 - Math.exp(-SHOT_GLIDE * dt));
  if (F.phase === 'charge') {
    const u = Math.min(1, t / YEAST_CHARGE);
    setDoughGlow(1.5 + 5 * u * u + Math.sin(t * (8 + 30 * u)) * (0.5 + 1.5 * u));
    // まわりから光の粒が集まる（だんだん多く）
    F.gather = (F.gather || 0) + dt * (14 + 50 * u);
    const n = Math.floor(F.gather);
    if (n) { F.gather -= n; sparkleInto(_yf, n, 2.2 + 1.5 * (1 - u), 0.35 + 0.25 * u); }
    quake = Math.max(quake, 0.25 * u);
    if (t >= YEAST_CHARGE) {
      // 発射！ ロボの発射アニメと、パン種の発射クリップを同じ時刻で
      F.phase = 'fire';
      F.fireT = t;
      firing = true; shotSpawned = true; recoiled = true; fireDone = false;
      fireAction.reset().setEffectiveWeight(1).play();
      const fa = yeastGunActs.fire;
      if (fa) { yeastGunActs.charge?.stop(); fa.reset().play(); fa.timeScale = fireAction.timeScale; }
      caption.textContent = 'いけっ！ 魔法のパン種！';
    }
    return;
  }
  if (F.phase === 'fire' && t - F.fireT >= (muzzleFrame - 100) / ANIM_FPS / fireAction.timeScale) {
    // 砲口から光線
    F.phase = 'beam';
    F.beamT = t;
    makeBeam(_yf);
    sparkleBurst(_yf, 30, 0.9);
    quake = Math.max(quake, 1.2);   // 画面全体の閃光は、はじけるときだけ（光線が白く飛んでしまうので）
  }
  if (F.phase === 'beam' && t - F.beamT >= YEAST_BEAM_GROW) {
    // 命中：顔にパン種がとどいた → すき間が金色に脈打ちはじめる（ここからは体当たりの演出と同じ）
    F.phase = 'glow';
    F.hitT = t;
    F.t = 0;
    F.beam.hit.visible = true;
    beginShatterGlow();
    caption.textContent = '魔法のパン種が、脅威の顔をつらぬいた！';
    // カメラ：はじけるところと、飛ばされるロボが入る、横からの引きの位置へ
    F.cam = boss.position.clone().addScaledVector(F.out, 30).addScaledVector(F.side, 85);
    F.cam.y = Math.max(introGroundY(F.cam.x, F.cam.z, boss.position.y), boss.position.y) + 18;
  }
}
function makeBeam(from) {
  const F = finale;
  const g = new THREE.Group();
  g.userData.noOutline = true;
  const core = beamPart(0.55, 0xffffff, 1), glow = beamPart(1.4, 0xffc444, 0.75), haze = beamPart(3.2, 0xffe2a0, 0.18);
  g.add(core, glow, haze);
  const flare = glowSprite(6), hit = glowSprite(16);
  hit.visible = false;
  scene.add(g, flare, hit);
  flare.userData.noOutline = true; hit.userData.noOutline = true;
  F.beam = { group: g, parts: [core, glow, haze], flare, hit, rings: [], ringWait: 0, from: from.clone(), len: from.distanceTo(F.target) };
}
// 光線：根もとは砲口、先は顔。光の輪が根もとから顔へ走る。終わりは細くなって消える
function updateBeam(dt) {
  const F = finale, B = F.beam;
  if (!B) return;
  const age = (F.hitT !== undefined ? F.hitT - F.beamT + F.t : F.t - F.beamT);
  const out = THREE.MathUtils.clamp((age - YEAST_BEAM) / YEAST_BEAM_FADE, 0, 1);
  if (out >= 1) {
    for (const o of [B.group, B.flare, B.hit, ...B.rings.map((r) => r.mesh)]) { scene.remove(o); o.traverse?.((m) => { m.geometry?.dispose(); m.material?.dispose(); }); }
    F.beam = null;
    return;
  }
  const grow = THREE.MathUtils.clamp(age / YEAST_BEAM_GROW, 0, 1);
  B.group.position.copy(B.from);
  B.group.lookAt(F.target);
  B.group.scale.set(1, 1, Math.max(1e-3, B.len * grow));
  const w = (1 - out) * (1 + 0.18 * Math.sin(age * 40) + 0.08 * Math.sin(age * 73));
  for (const p of B.parts) { p.scale.set(w, w, 1); p.material.opacity = p.userData.opacity * (1 - out * 0.5); }
  B.flare.position.copy(B.from);
  B.flare.scale.setScalar(B.flare.userData.size * w * (1 + 0.25 * Math.sin(age * 31)));
  B.flare.material.rotation += dt * 2;
  B.hit.position.copy(F.target);
  B.hit.scale.setScalar(B.hit.userData.size * w * (1 + 0.3 * Math.sin(age * 23)));
  B.hit.material.rotation -= dt * 1.5;
  // 光の輪（金色の輪が光線にそって顔へ走り、広がりながら消える）
  if (out === 0 && (B.ringWait -= dt) <= 0) {
    B.ringWait = 0.09;
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(1, 0.08, 6, 32), new THREE.MeshBasicMaterial({ color: 0xffd66a, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }));
    mesh.userData.noOutline = true;
    mesh.renderOrder = 998;
    scene.add(mesh);
    B.rings.push({ mesh, t: 0 });
  }
  for (let i = B.rings.length - 1; i >= 0; i--) {
    const r = B.rings[i];
    r.t += dt;
    const u = r.t / 0.5;
    if (u >= 1) { scene.remove(r.mesh); r.mesh.geometry.dispose(); r.mesh.material.dispose(); B.rings.splice(i, 1); continue; }
    r.mesh.position.lerpVectors(B.from, F.target, Math.min(u * grow, 1));
    r.mesh.quaternion.copy(B.group.quaternion);
    r.mesh.scale.setScalar(0.8 + 2.2 * u);
    r.mesh.material.opacity = 0.9 * (1 - u) * (1 - out);
  }
  // 光線にそってキラキラ
  if (out < 1) sparkleBurst(_yd.lerpVectors(B.from, F.target, Math.random() * grow), 2, 0.9);
  if (F.hitT !== undefined && Math.random() < 0.5) sparkleBurst(F.target, 3, 2.2);
}
// 撃つ演出のカメラ：溜めはロボの斜め後ろから顔のほうを、光線は横から全体を、命中のあとは引きの位置へ
function shotCamera(dt) {
  const F = finale;
  const chest = _ya.set(feet.x, feet.y + ROBOT_HEIGHT / 2, feet.z);
  if (F.phase === 'charge' || F.phase === 'fire') {
    const u = Math.min(1, F.t / YEAST_CHARGE);
    _yd.copy(chest).addScaledVector(F.aim, -(5.5 - 1.5 * u)).addScaledVector(F.side, 2.6).setY(chest.y + 1.3);
    _yn.lerpVectors(chest, F.target, 0.12 + 0.1 * u);
  } else if (F.phase === 'beam' || (F.hitT !== undefined && F.t < 1.4)) {
    const len = chest.distanceTo(F.target);
    _yn.lerpVectors(chest, F.target, 0.5);
    _yd.copy(_yn).addScaledVector(F.side, len * 0.85 + 10).setY(_yn.y + 3);
  } else {
    _yd.copy(F.cam);
    boss.getObjectByName('RB_Ball').getWorldPosition(_il);
    if (F.phase === 'glow') _yn.copy(_il);
    else _yn.copy(_il).lerp(feet, 0.5);
  }
  const k = F.phase === 'charge' ? 4 : 2.2;
  F.camPos.lerp(_yd, 1 - Math.exp(-k * dt));
  F.look.lerp(_yn, 1 - Math.exp(-k * dt));
  camera.position.copy(F.camPos);
  camera.lookAt(F.look);
  model.visible = true;
  if (F.fly) model.rotation.set(F.fly.rx, 0, F.fly.rz);
}
// エンディング：画面の向きで絵と動きを使い分ける
//   縦長の画面：縦の絵（ending1.webp）を、煙の立つ空から下のメカとパン屋のお姉さんまでスクロールする
//   横長の画面：横の絵（ending1h.webp）を、左の崩れたパン工房から右のメカとお姉さんまで横に流す
// 終わったら、タイトルと「タイトルにもどる」が浮かぶ
const ENDING_WAIT = 2.0;     // 絵が出てから動き始めるまで（秒）
const ENDING_SCROLL = 14;    // 動いている長さ（秒）
const ENDING_TALL = 1.5;     // 縦の絵：高さは画面の高さのこの倍以上（スマホの縦画面でもスクロールさせるため）
const ENDING_WIDE = 1.4;     // 横の絵：幅は画面の幅のこの倍以上（横に流すため）
// 最後に画面のまん中に来る、絵の中の位置（メカとお姉さん）。[横, 縦]。横の絵は、上に浮かぶタイトルがお姉さんの頭にかからないよう少し上寄り
const ENDING_FOCUS = { tall: [0.62, 1], wide: [0.8, 0.45] };
const endingWide = () => window.innerWidth >= window.innerHeight;
function endingSrc() { return endingWide() ? 'ending1h.webp' : 'ending1.webp'; }
function showEnding() {
  finale.phase = 'ending';
  document.body.classList.remove('cutin');
  endingEl.classList.add('on');
  // 撃って勝ったとき（ふわおは生きて帰る）：絵はまだないので、文字だけ
  if (finale.mode === 'shot') { endingEl.classList.add('plain'); setTimeout(() => endingEl.classList.add('done'), ENDING_WAIT * 1000); return; }
  const img = document.getElementById('endingImg');
  const src = endingSrc();
  const run = () => {
    const vw = window.innerWidth, vh = window.innerHeight, aspect = img.naturalWidth / img.naturalHeight;
    const clampX = (x, w) => THREE.MathUtils.clamp(x, vw - w, 0), clampY = (y, h) => THREE.MathUtils.clamp(y, vh - h, 0);
    let w, h, from, to;
    if (src === 'ending1h.webp') {
      // 横：左はしから、右のお姉さんまで。縦の位置はメカとお姉さんが入る高さ
      w = Math.max(vw * ENDING_WIDE, vh * aspect); h = w / aspect;
      const [fx, fy] = ENDING_FOCUS.wide, y = clampY(vh / 2 - fy * h, h);
      from = [0, y]; to = [clampX(vw / 2 - fx * w, w), y];
    } else {
      // 縦：いちばん上の空から、下のメカとお姉さんまで。横にはみ出すときは、下へ進みながら横にもずらす
      h = Math.max(vh * ENDING_TALL, vw / aspect); w = h * aspect;
      from = [(vw - w) / 2, 0]; to = [clampX(vw / 2 - ENDING_FOCUS.tall[0] * w, w), vh - h];
    }
    img.style.width = `${w}px`;
    img.style.height = `${h}px`;
    img.style.transform = `translate(${from[0]}px, ${from[1]}px)`;
    img.animate([{ transform: `translate(${from[0]}px, ${from[1]}px)` }, { transform: `translate(${to[0]}px, ${to[1]}px)` }],
      { duration: ENDING_SCROLL * 1000, delay: ENDING_WAIT * 1000, easing: 'ease-in-out', fill: 'forwards' })
      .finished.then(() => endingEl.classList.add('done'));
  };
  if (img.getAttribute('src') !== src) img.src = src;
  if (img.complete && img.naturalWidth) run(); else img.addEventListener('load', run, { once: true });
}
// 転がるボス：動いている間は転がり始め → 転がる（進む速さに合わせてアニメの速さを変える）、止まったら待機へ
let rolling = 0;   // 0 止まっている / 1 転がり始め / 2 転がっている
function setRolling(on) {
  const R = bossCfg.roll, A = bossActions;
  if (!R || !A || on === (rolling > 0)) return;
  const from = rolling === 1 ? A[R.start] : rolling === 2 ? A[R.clip] : A.idle;
  const to = on ? A[R.start] : A.idle;
  rolling = on ? 1 : 0;
  to.reset().play();
  from.crossFadeTo(to, 0.4, false);
}
// 町の真ん中からボスまでの水平距離
function bossDistance() {
  return Math.hypot(boss.position.x - BOSS_TARGET.x, boss.position.z - BOSS_TARGET.z);
}
// 町を転げまわる：廃墟の区画（山の斜面の町も）の中の場所を次々に選んで、そこへ転がっていく。
// 区画はどれも同じ割合で選ぶ（広い山の斜面ばかりにならないように）。
// パン工房のまわり（工場長が立っている）は、行き先にも、通り道にもしない
const ROAM_AWAY = 25;       // 今いる所からこれ以上離れた場所を選ぶ（m）
const ROAM_WORKSHOP = 8;    // パン工房の範囲（WORKSHOP_BOX）から、さらにこれだけ離れる（m）
const _roam = new THREE.Vector3();
let roamTarget = null, roamWait = 0;
// 線分 (ax, az)-(bx, bz) が、パン工房のまわりの箱を通るか
function roamHitsWorkshop(ax, az, bx, bz) {
  const [x0, z0, x1, z1] = WORKSHOP_BOX, m = ROAM_WORKSHOP;
  for (let i = 0; i <= 20; i++) {
    const x = ax + (bx - ax) * i / 20, z = az + (bz - az) * i / 20;
    if (x > x0 - m && x < x1 + m && z > z0 - m && z < z1 + m) return true;
  }
  return false;
}
function pickRoamTarget(pos) {
  let best = null;
  for (let i = 0; i < 40; i++) {
    const a = ruinAreas[Math.floor(Math.random() * ruinAreas.length)];
    const total = a.boxes.reduce((t, [x0, z0, x1, z1]) => t + (x1 - x0) * (z1 - z0), 0);
    let r = Math.random() * total, box = a.boxes[0];
    for (const b of a.boxes) { r -= (b[2] - b[0]) * (b[3] - b[1]); if (r <= 0) { box = b; break; } }
    const x = THREE.MathUtils.lerp(box[0], box[2], Math.random()), z = THREE.MathUtils.lerp(box[1], box[3], Math.random());
    if (roamHitsWorkshop(pos.x, pos.z, x, z)) continue;
    best = _roam.set(x, 0, z);
    if (Math.hypot(x - pos.x, z - pos.z) > ROAM_AWAY) break;
  }
  return best ? best.clone() : new THREE.Vector3(BOSS_TARGET.x, 0, BOSS_TARGET.z);
}
function roamBoss(dt) {
  const R = bossCfg.roam, pos = boss.position;
  if (!roamTarget || Math.hypot(roamTarget.x - pos.x, roamTarget.z - pos.z) < 3) {
    if (roamTarget) roamWait = 1 + Math.random() * 1.5;   // 着いたら少し止まって、次へ
    roamTarget = pickRoamTarget(pos);
  }
  _bd.set(roamTarget.x - pos.x, 0, roamTarget.z - pos.z);
  const dist = _bd.length();
  _bd.divideScalar(dist || 1);
  const want = Math.atan2(_bd.x, _bd.z);
  boss.rotation.y = turnToward(boss.rotation.y, want, 1 - Math.exp(-2 * dt));
  const facing = Math.max(0, Math.cos(want - boss.rotation.y));   // 向きを変えてから転がり出す
  const moving = (roamWait -= dt) <= 0;
  if (moving) pos.addScaledVector(_bd, Math.min(R.speed * facing * (rolling === 2 ? 1 : 0.3) * dt, dist));
  setRolling(moving);
  const roll = bossActions?.[bossCfg.roll.clip];
  if (roll) roll.timeScale = R.speed * facing * roll.getClip().duration / bossCfg.roll.loop;
  _o.set(pos.x, 400, pos.z);
  const hit = cast(_o, DOWN, 800);
  if (hit) pos.y += (hit.point.y - pos.y) * (1 - Math.exp(-4 * dt));
}
// ボスの足元の地面の高さ。真ん中と、まわり BOSS_FOOT の 4 か所の高さの真ん中の値を使う
// （足元の 1 か所だけだと、木や塀の上に乗ってしまう）
const BOSS_FOOT = 6;
function bossGroundY(pos) {
  const ys = [];
  for (const [dx, dz] of [[0, 0], [BOSS_FOOT, 0], [-BOSS_FOOT, 0], [0, BOSS_FOOT], [0, -BOSS_FOOT]]) {
    _o.set(pos.x + dx, 400, pos.z + dz);
    const hit = cast(_o, DOWN, 800);
    if (hit) ys.push(hit.point.y);
  }
  if (!ys.length) return null;
  ys.sort((a, b) => a - b);
  return ys[Math.floor(ys.length / 2)];
}
const bossRoaming = () => bossCfg?.roam && storyStage >= bossCfg.next && bossAppeared && !bossGone && !finale;
function moveBoss(dt) {
  if (!boss || bossGone || retreat || !bossAppeared || finale) return;
  if (bossRoaming()) { roamBoss(dt); return; }
  const pos = boss.position;
  _bd.set(BOSS_TARGET.x - pos.x, 0, BOSS_TARGET.z - pos.z);
  const dist = _bd.length();
  _bd.divideScalar(dist || 1);
  // 町へ向かって進む（押し戻されている間と、そのあとしばらくは止まる）。転がるボスは速く、転がりながら
  const R = bossCfg.roll;
  const moving = (bossStun -= dt) <= 0 && dist > BOSS_STOP + 0.05;
  if (moving) pos.addScaledVector(_bd, Math.min((R ? R.speed * (rolling === 2 ? 1 : 0.3) : BOSS_CREEP) * dt, dist - BOSS_STOP));
  if (R) {
    setRolling(moving);
    const roll = bossActions?.[R.clip];
    if (roll) roll.timeScale = R.speed * roll.getClip().duration / R.loop;
  }
  pos.addScaledVector(bossVel, dt);
  bossVel.multiplyScalar(Math.exp(-RAM_PUSH_DAMP * dt));
  // 押し戻せる範囲
  const d = bossDistance();
  if (d > BOSS_FAR) { pos.x = BOSS_TARGET.x + (pos.x - BOSS_TARGET.x) * BOSS_FAR / d; pos.z = BOSS_TARGET.z + (pos.z - BOSS_TARGET.z) * BOSS_FAR / d; }
  if (d >= BOSS_RETREAT - 0.01) startRetreat();
  // 地面の高さに合わせる（斜面を上り下りする）
  const gy = bossGroundY(pos);
  if (gy !== null) pos.y += (gy - pos.y) * (1 - Math.exp(-4 * dt));
  boss.rotation.y = turnToward(boss.rotation.y, Math.atan2(_bd.x, _bd.z), 1 - Math.exp(-BOSS_TURN * dt));
  // 体当たりされると、ぷるんと揺れる
  if (bossWobble > 0.001) {
    bossWobbleTime += dt;
    const w = bossWobble * Math.sin(bossWobbleTime * 14);
    boss.scale.set(1 + w * 0.08, 1 - w * 0.1, 1 + w * 0.08);
    bossWobble *= Math.exp(-3 * dt);
  } else boss.scale.setScalar(1);
}
// ロボとボスのトゲ：ぶつかったら押し出す。噴射で速く飛んでいたら体当たり
// ボスの攻撃（触手のたたきつけ・ヘドロの波）がふわおに当たったら、からだが減ってはじき飛ばされる
const STRIKE_BOUNCE = 11;      // はじき飛ばされる速さ（m/秒）
const STRIKE_RING_HEIGHT = 1.5;   // 波の輪は、足元が地面からこの高さより上（ジャンプ中）なら当たらない
const _sk = new THREE.Vector3(), _ss = new THREE.Vector3();
function strikePlayer() {
  const st = bossAttack && bossModels[bossIndex].strikes[bossAttack.getClip().name];
  if (!st || bossAttack.time < st.from || bossAttack.time > st.to || bodyHitWait > 0) return;
  for (const o of st.nodes) {
    o.getWorldPosition(_sk);
    const r = o.userData.radius;
    let hit;
    if (o.userData.collider === 'hit_ring') {
      o.parent.getWorldScale(_ss);
      const ring = r * _ss.x, half = (o.userData.width || 1.6) / 2;
      const d = Math.hypot(feet.x - _sk.x, feet.z - _sk.z);
      // 高さは、輪の真ん中ではなく、ふわおの足元の地面から見る（波は地面に沿って広がる）
      if (ring > 0.05 && Math.abs(d - ring) < half + RADIUS) {
        const g = onGround ? feet.y : groundBelow(feet, 0.3);
        hit = g !== null && feet.y - g < STRIKE_RING_HEIGHT;
      }
    } else {
      hit = Math.hypot(feet.x - _sk.x, feet.y + ROBOT_HEIGHT / 2 - _sk.y, feet.z - _sk.z) < r + st.reach + RADIUS;
    }
    if (!hit) continue;
    const wave = o.userData.collider === 'hit_ring';
    if (!hurtBody(wave ? `ヘドロの波にのまれた！ ジャンプでかわそう` : `${bossCfg.name}の触手にたたかれた！`)) return;
    // ボスから離れる向きへはじき飛ばす
    _sk.set(feet.x - boss.position.x, 0, feet.z - boss.position.z).normalize();
    jetting = false; jetEndTime = 0; jetSpeed = 0;
    jetVel.copy(_sk).multiplyScalar(STRIKE_BOUNCE);
    velY = Math.max(velY, 6);
    return;
  }
}
function collideBoss(dt) {
  if (!bossSpikes || bossGone || retreat || !bossAppeared || finale) return;
  strikePlayer();
  ramCooldown -= dt;
  // 魔法のパン種を付けたまま、町を転げまわる脅威の顔にジェットで体当たりすると、最後の演出へ。
  // 顔のまわり（玉の中心から見て、顔の向きから上下左右 FACE_HIT_ANGLE 以内）にぶつかったときだけ。顔は地面から 20m ほどの高さ
  // 町長の警告（はじめて発射しようとしたとき）を聞くまでは、体当たりしてもはね返されるだけ
  if (items.has('yeast') && mayorWarned && bossRoaming() && jetVel.length() > RAM_MIN_SPEED) {
    const face = boss.getObjectByName('RB_Plate_Face');
    bossSpikes.getWorldPosition(_bc);
    if (face && Math.hypot(feet.x - _bc.x, feet.y + ROBOT_HEIGHT / 2 - _bc.y, feet.z - _bc.z) < bossSpikeRadius + RADIUS + 0.5) {
      face.getWorldPosition(_bd).sub(_bc).normalize();   // 玉の中心から顔へ
      _rd.set(feet.x - _bc.x, feet.y + ROBOT_HEIGHT / 2 - _bc.y, feet.z - _bc.z).normalize();   // 玉の中心からロボへ
      if (_bd.dot(_rd) > Math.cos(FACE_HIT_ANGLE)) { startFinale(); return; }
    }
  }
  bossSpikes.getWorldPosition(_bc);
  // トゲのあたりまでの球（GB_Hit_Spikes の radius、約 9m。体は約 6m、トゲの先は約 10m）。
  // 体は地面から浮いているので、真下を通るときは当たらない
  _bd.set(feet.x - _bc.x, feet.y + ROBOT_HEIGHT / 2 - _bc.y, feet.z - _bc.z);
  const d = _bd.length(), reach = bossSpikeRadius + RADIUS;
  if (d >= reach) return;
  _bd.divideScalar(d || 1);
  // 体当たりの強さは、ボスへ向かう速さ
  const toward = -(jetVel.x * _bd.x + jetVel.z * _bd.z);
  // 道具がないとき・ぶつかった所がパンで固まっていないときは、ヘドロの体をずぶずぶとすり抜けてしまう（押し出しもしない）
  if (bossCfg.needs && (!items.has(bossCfg.needs) || !solidToward(feet.x, feet.z))) {
    jetVel.multiplyScalar(Math.exp(-2.5 * dt));
    if (toward > RAM_MIN_SPEED * 0.5) {
      // ヘドロの体を通り抜けると、からだが溶かされて 1/4 減る
      const first = passToast > 6;
      if (first) passToast = 0;
      const how = items.has(bossCfg.needs) ? 'パンを当てて固まった所へ、体当たりしよう' : 'パン工房の工場長に相談しよう';
      hurtBody(first ? `${bossCfg.name}の体をすり抜けて、からだが溶かされた！ ${how}` : null);
    }
    return;
  }
  // 町を転げまわっているボスにぶつかると、つぶされる（からだが 1/4 減って、はじき飛ばされる）
  if (bossRoaming() && rolling > 0) {
    if (hurtBody(`${bossCfg.name}につぶされた！ からだが減ってしまった`)) {
      jetting = false; jetEndTime = 0; jetSpeed = 0;
      jetVel.set(_bd.x, 0, _bd.z).normalize().multiplyScalar(RAM_BOUNCE * 1.5);
      velY = Math.max(velY, 7);
      quake = Math.max(quake, 0.8);
    }
  }
  // かたくて押し戻せないボス：ロボがはね返されるだけ
  else if (bossCfg.hard && ramCooldown <= 0 && toward > RAM_MIN_SPEED) {
    ramCooldown = RAM_COOLDOWN;
    useFuel(FUEL_RAM);
    jetting = false; jetEndTime = 0; jetSpeed = 0;
    jetVel.set(_bd.x, 0, _bd.z).normalize().multiplyScalar(RAM_BOUNCE);
    velY = Math.max(velY, 4);
    shake = 1.5;
    if (passToast > 6) { passToast = 0; showToast(`${bossCfg.name}はかたすぎて、びくともしない！`); }
  }
  if (!bossCfg.hard && ramCooldown <= 0 && toward > RAM_MIN_SPEED) {
    ramCooldown = RAM_COOLDOWN;
    const k = THREE.MathUtils.clamp((toward - RAM_MIN_SPEED) / (JET_SPEED - RAM_MIN_SPEED), 0, 1);
    _rd.set(-_bd.x, 0, -_bd.z).normalize();   // ロボからボスへ（水平）
    // 勢いが RAM_PUSH_DAMP の割合で減っていくと、下がる距離は 勢い / RAM_PUSH_DAMP
    bossVel.addScaledVector(_rd, THREE.MathUtils.lerp(RAM_PUSH[0], RAM_PUSH[1], k) * RAM_PUSH_DAMP);
    bossStun = RAM_STUN;
    useFuel(FUEL_RAM);
    bossWobble = 0.6 + 0.4 * k;
    bossWobbleTime = 0;
    // ロボははね返されて、噴射も止まる（もう一度 Space を押し直せば噴射できる）
    jetting = false;
    jetEndTime = 0;
    jetSpeed = 0;
    jetVel.set(_bd.x, 0, _bd.z).normalize().multiplyScalar(RAM_BOUNCE);
    velY = Math.max(velY, 4);
    shake = 1.5;
  }
  // 球の外へ押し出す
  feet.addScaledVector(_bd, reach - d);
}

// ---- 子バイ菌（町人の敵） ----
// 町人を見つけて跳ねながら近づき、体にくっつく（くっついている間は待機。噛みつきのアニメは町人には使わない）。
// ふわおのジェット体当たり（RAM_MIN_SPEED より速く飛んでいるとき）が当たると、やられアニメで縮んで消える。
// 町人が助けを呼んだ区画に、その区画の中の地面から選んだ場所（setupProgress。ページを開くたびに変わる）へ出てくる
const GERM_SPEED = 1.1;        // 跳ねて進む速さ（m/秒）
const GERM_DROP = 1.0;         // これより低い段差へは降りない（川の岸から川へ落ちないように）
const GERM_SEE = 25;           // この距離の町人をねらう
// 体の中心の高さ（GM_Body_Pivot）と体の半径（GM_Hurt_Body の radius）はモデルから読む。下は読めなかったときの値
let germBody = 0.8, germRadius = 0.4;
const GERM_STICK = 0.5;        // 町人の体の表面からこの距離まで来たら、くっつく
const GERM_HIT = 1.0;          // ジェット体当たりが当たる距離（ロボの体の中心の縦の線から、体の中心まで。少し甘め）
// ロボの足元がこの高さより上を通り過ぎたら当たらない（子バイ菌の体の中心から。体の上 0.8m ほどまでは少し甘めに当たる）
const GERM_HIT_BELOW = 1.2;
const GERM_BOUNCE = 6;         // 体当たりしたロボがはね返される速さ（m/秒。ボスは RAM_BOUNCE）
// 低空で飛んでいるときに、階段や段の少し上にいる子バイ菌にも当たるように、上にも広げる（ロボの頭の上からこの高さまで）
const GERM_HIT_ABOVE = 1.5;
let germTemplate = null, germClips = null;
const germs = [];
const _gp = new THREE.Vector3();
function setupGerms(gltf) {
  germTemplate = gltf.scene;
  germTemplate.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  const pivot = germTemplate.getObjectByName('GM_Body_Pivot'), hurt = germTemplate.getObjectByName('GM_Hurt_Body');
  if (pivot) germBody = pivot.position.y;
  if (hurt?.userData.radius) germRadius = hurt.userData.radius;
  germClips = clipsFromExtras(germTemplate.getObjectByName('GM_Root') || germTemplate, gltf.animations);
  // 始めたときには置かない。町人が助けを呼んだ区画にだけ出す（setupProgress / startHelp）
}
function spawnGerm(x, z) {
  const root = germTemplate.clone(true);
  _gp.set(x, 0, z);
  root.position.copy(groundPoint(_gp));
  scene.add(root);
  const mixer = new THREE.AnimationMixer(root);
  const act = {};
  for (const [name, clip] of Object.entries(germClips)) act[name] = mixer.clipAction(clip);
  for (const name of ['attack', 'defeat']) { act[name].setLoop(THREE.LoopOnce, 1); act[name].clampWhenFinished = true; }
  const g = { root, mixer, act, state: 'seek', target: null, angle: 0, lift: 0, current: null, wait: 1 + Math.random() * 2 };
  mixer.addEventListener('finished', (e) => {
    if (e.action === act.defeat) g.done = true;
    else if (e.action === act.attack) playGerm(g, 'idle');
  });
  playGerm(g, 'move');
  germs.push(g);
  return g;
}
function playGerm(g, name) {
  if (g.current === name) return;
  const next = g.act[name];
  next.reset().play();
  if (g.current) g.act[g.current].crossFadeTo(next, 0.15, false);
  g.current = name;
}
// 一番近い、外にいる町人（くっついている数が少ない人を少しひいきする）
function germTarget(g) {
  let best = null, bestD = GERM_SEE;
  for (const r of residents) {
    if (!r.root.visible) continue;
    const n = germs.filter((x) => x.target === r && x.state === 'stuck').length;
    const d = r.root.position.distanceTo(g.root.position) + n * 3;
    if (d < bestD) { best = r; bestD = d; }
  }
  return best;
}
// 水の底に沈んだ・座標がおかしくなった小バイ菌は、出てきた場所へ戻す（見つけられなくなって、区画が元に戻らないため）
let germCheckWait = 0;
function rescueGerms(dt) {
  if ((germCheckWait -= dt) > 0) return;
  germCheckWait = 1;
  for (const g of germs) {
    if (g.state === 'defeat' || g.state === 'stuck') continue;
    const pos = g.root.position;
    const lost = !Number.isFinite(pos.x + pos.y + pos.z);
    const gy = lost ? null : groundBelow(pos, 1);
    if (!lost && !(gy !== null && waterLevel(pos, gy) > pos.y + 0.3)) continue;
    const home = g.spot || EVAC_FROM;   // 出てきた場所（なければ町の西の外れ）
    pos.copy(groundPoint(_gp.set(home.x, 0, home.z)));
    g.target = null;
    g.state = 'seek';
  }
}
function updateGerms(dt) {
  rescueGerms(dt);
  for (const g of germs) {
    const pos = g.root.position;
    if (g.state === 'defeat') { g.mixer.update(dt); continue; }
    // ねらっていた町人が家に入ったら、はがれて別の人をさがす
    if (g.target && !g.target.root.visible) { g.target = null; g.state = 'seek'; }
    if (!g.target) g.target = germTarget(g);
    const r = g.target;
    if (g.state === 'seek' && !r) {
      playGerm(g, 'idle');   // ねらう町人がいなければ、その場で待つ（体当たりには当たる）
    } else if (g.state === 'seek') {
      playGerm(g, 'move');
      _rd.subVectors(r.root.position, pos).setY(0);
      const dist = _rd.length();
      if (dist < r.radius + GERM_STICK && Math.abs(r.root.position.y - pos.y) < 1) {
        // くっつく：町人の体の表面の、今いる向きの場所に。ほかの子バイ菌と重ならないよう向きをずらし、高さも少しずつ変える
        g.state = 'stuck';
        g.angle = Math.atan2(-_rd.x, -_rd.z) - r.root.rotation.y;
        for (const o of germs) {
          if (o !== g && o.target === r && o.state === 'stuck' && Math.abs(Math.atan2(Math.sin(o.angle - g.angle), Math.cos(o.angle - g.angle))) < 0.9) g.angle += 1.3;
        }
        g.lift = 0.45 + Math.random() * 0.3;
        playGerm(g, 'idle');
      } else if (dist > 1e-3) {   // 真下・真上（橋の上と下など）のときは向きが決まらないので動かない
        g.root.rotation.y = turnToward(g.root.rotation.y, Math.atan2(_rd.x, _rd.z), 1 - Math.exp(-6 * dt));
        _rd.divideScalar(dist);
        // 壁や石垣があれば、その手前で跳ねたまま止まる（道をさがすのはこれから）
        _o.set(pos.x, pos.y + germBody, pos.z);
        const wall = cast(_o, _rd, germRadius + 0.2);
        if (!wall || !hitNormal(wall, _rd)) {
          // 川の中と、大きな段差の下へは行かない（水の底に沈んだり、岸に上がれなくなったりするため）
          _gp.copy(pos).addScaledVector(_rd, Math.min(GERM_SPEED * dt, dist));
          const gy = groundBelow(_gp, 1);   // 跳ねるので、少しの段差なら越える
          if (gy !== null && gy > pos.y - GERM_DROP && !waterLevel(_gp, gy)) {
            pos.x = _gp.x; pos.z = _gp.z;
            pos.y += (gy - pos.y) * (1 - Math.exp(-10 * dt));
          }
        }
      }
    } else if (g.state === 'stuck') {
      // 町人の動きと向きについていく。体の表面から外を向く
      const a = r.root.rotation.y + g.angle, rr = r.radius + germRadius * 0.6;   // 少し体にめりこませる
      pos.set(r.root.position.x + Math.sin(a) * rr, r.root.position.y + r.height * g.lift - germBody, r.root.position.z + Math.cos(a) * rr);
      g.root.rotation.y = a + Math.PI;   // くっついている間は待機のまま（噛みつきは町人には使わない）
    }
    // ジェット体当たり
    if (jetVel.length() > RAM_MIN_SPEED) {
      const dy = pos.y + germBody - feet.y;
      if (dy > -GERM_HIT_BELOW && dy < ROBOT_HEIGHT + germRadius + GERM_HIT_ABOVE && Math.hypot(pos.x - feet.x, pos.z - feet.z) < GERM_HIT + germRadius + RADIUS) {
        g.state = 'defeat';
        g.target = null;
        playGerm(g, 'defeat');
        // ボスに当たったときと同じく、ロボははね返されて噴射も止まる（もう一度 Space を押し直せば噴射できる）
        jetting = false;
        jetEndTime = 0;
        jetSpeed = 0;
        _rd.set(feet.x - pos.x, 0, feet.z - pos.z);
        if (_rd.lengthSq() < 1e-4) _rd.set(-Math.sin(heading), 0, -Math.cos(heading));   // 真上を通ったときは後ろへ
        jetVel.copy(_rd.normalize()).multiplyScalar(GERM_BOUNCE);
        velY = Math.max(velY, 3);
        shake = Math.max(shake, 1);
      }
    }
    g.mixer.update(dt);
  }
  for (let i = germs.length - 1; i >= 0; i--) {
    if (!germs[i].done) continue;
    scene.remove(germs[i].root);
    germs[i].mixer.uncacheRoot(germs[i].root);
    germs.splice(i, 1);
  }
}

// ---- 進行度（町の復興度・ジェット燃料・ふわおのからだ） ----
// 町の復興度：廃墟の区画（10）ごとに「その区画の小バイ菌を倒す」「その区画の町人にパンを食べてもらう」で
//   区画のゲージがたまり、満タンになると区画が元の町に戻る。復興度は全区画のゲージの平均。
// 燃料：噴射している間と、ボスへの体当たりで減る。地面に立っている間にゆっくり戻り、パン工房の前では早く満タンになる。
//   タンクの大きさ（上限）は最初は最大の 3 分の 1 で、トッピングで少しずつ大きくなる（raiseFuelMax）。
// からだ：パンを撃つたびに自分の体（蒸しパン）が削れて減る。パン工房の前で焼き直してもらうと戻る。
//   0 になったら暗転して、パン工房の前へ戻される（焼き直されて満タン）。町の復興度はそのまま
const AREA_NAMES = {
  RU_Plaza: '広場', RU_Main: '表通り', RU_Bakery: 'パン屋', RU_North: '上の通り', RU_East: '川の東',
  RU_South: '南の家並み', RU_River: '川', RU_TerracesW: '奥の段（西）', RU_TerracesE: '奥の段（東）', RU_Hillside: '山の斜面の町',
};
const GERMS_PER_AREA = 3;       // 区画ごとの小バイ菌の数（これより多くは出ない）
// 助けを呼ぶ声：まだ小バイ菌が出ていない区画の町人が、ひとつずつ助けを呼ぶ。そのときにその区画の小バイ菌が出てくる。
//   同時に呼んでいるのは HELP_MAX 区画まで（町に出ている小バイ菌は最大 9 匹）。
//   呼んでいる町人の頭の上に助けのアイコン（！）を出し、ふわおのまわりには、呼んでいる区画の小バイ菌の方向を
//   3D の矢印で出す。全部倒すと声は止む
const HELP_MAX = 3;
const HELP_FIRST = 2;           // 遊び始めてから最初に呼ばれるまで（秒）
const HELP_GAP = 6;             // 次の区画が呼ぶまでの間（秒）
const HELP_COLORS = [0xe8463a, 0x3a8fe8, 0xb558d8];   // 矢印とメーターの印の色（呼んでいる枠ごと）
const HELP_ICON_SIZE = 0.09;   // 助けを呼ぶアイコンの大きさ（画面の高さに対して。遠くても同じ大きさ）
// 燃料の量は、いちばん大きくしたタンクの満タンを 1 とする
const FUEL_MAX_START = 1 / 3;   // 最初のタンクの大きさ
const FUEL_MAX_STEP = 1 / 6;    // トッピング 1 つで大きくなる分（4 つで最大）
const FUEL_JET = 1 / 15;        // 噴射で減る燃料（1 秒あたり。最初のタンクで 5 秒、最大のタンクで 15 秒噴ける）
const FUEL_RAM = 0.04;          // ボスに体当たりすると減る燃料
const FUEL_REGEN = 1 / 30;      // 地面に立っている間に戻る燃料（1 秒あたり。最初のタンクなら空から満タンまで 10 秒）
const FUEL_MIN_START = 0.02;    // これより少ないと噴射を始められない
const BODY_PER_SHOT = 0.07;     // パン 1 個で削れるからだ（満タンで約 14 発）
const WORKSHOP_FRONT = new THREE.Vector3(-7.7, 12, -25.2);   // パン工房の扉（町の中、北の奥の段）の前
const WORKSHOP_REFILL_R = 6;    // 扉の前のこの距離の中で地面にいると補給される
const WORKSHOP_REFILL = 0.5;    // 補給の速さ（1 秒あたり、燃料だけ）
let fuelMax = FUEL_MAX_START, fuel = fuelMax, body = 1;
let fuwaoNo = 1;   // 何人目のふわおか。からだが 0 になって工場長に焼き直してもらうたびに 1 ふえる（お姉さんの回復ではふえない）
let knockout = null;            // からだが 0 になって、パン工房へ戻されている途中 { t, moved }
const areaGauge = [];           // 区画ごと { spots: [小バイ菌の出る場所], germs: [出てきた小バイ菌], residents: [町人], called, done }
const helps = [];               // 助けを呼んでいる区画 { area, slot, arrow }
let helpWait = HELP_FIRST;
const metersEl = document.getElementById('meters');
const toastEl = document.getElementById('toast');
let toastTime = 0, refilling = false;
const METERS_IDLE = 1.0;        // 町の復興度・区画・助けを呼ぶ声は、止まってからこれだけたったときだけ出す（秒。燃料とからだはいつも出す）
let stillTime = 0;

// その場所の区画（範囲の長方形が重なるところは、小さい長方形のほうを優先）
function areaAt(x, z) {
  let best = -1, bestSize = Infinity;
  ruinAreas.forEach((a, i) => {
    for (const [x0, z0, x1, z1] of a.boxes) {
      const size = (x1 - x0) * (z1 - z0);
      if (x >= x0 && x <= x1 && z >= z0 && z <= z1 && size < bestSize) { best = i; bestSize = size; }
    }
  });
  return best;
}
// 段ごとの地面の高さの目安（屋根や塀の上に小バイ菌を置かないため。メモの「地面の高さ」）
function streetHeight(z) {
  if (z > 20.5) return 0;
  if (z > -5.5) return 3.5;
  if (z > -22) return 7;
  if (z > -44) return 11.5;
  if (z > -63) return 16.5;
  return null;   // 山の斜面の町は段が曲がっているので、高さでは調べない
}
// 小バイ菌の場所の選び方。まず広くて平らなところ（strict）から選び、見つからない区画だけ条件をゆるめる（loose）
//   flatR / flat … まわり flatR m の地面の高さの違いが flat m まで（階段や坂の途中はやめる）
//   room / dirs  … 8 方向のうち dirs 方向は room m 先まで何もない（細い路地はやめる。ジェットで飛んで来られるように）
const SPOT_RULES = [
  { flatR: 2, flat: 0.35, room: 4, dirs: 3 },
  { flatR: 1.2, flat: 0.6, room: 2.5, dirs: 2 },
];
// 区画の中の、歩ける地面の上の場所をさがす（rand は setupProgress の乱数。ページを開くたびに変わる）
function areaSpot(a, rand, avoid, rule) {
  const boxes = a.boxes, total = boxes.reduce((s, [x0, z0, x1, z1]) => s + (x1 - x0) * (z1 - z0), 0);
  for (let tries = 0; tries < 300; tries++) {
    let r = rand() * total, box = boxes[0];
    for (const b of boxes) { r -= (b[2] - b[0]) * (b[3] - b[1]); if (r <= 0) { box = b; break; } }
    const x = THREE.MathUtils.lerp(box[0] + 1.5, box[2] - 1.5, rand());
    const z = THREE.MathUtils.lerp(box[1] + 1.5, box[3] - 1.5, rand());
    if (x > WORKSHOP_BOX[0] && x < WORKSHOP_BOX[2] && z > WORKSHOP_BOX[1] && z < WORKSHOP_BOX[3]) continue;
    _o.set(x, 400, z);
    const hit = cast(_o, DOWN, 800);
    if (!hit || hit.face.normal.y < 0.97) continue;                     // 平らな地面だけ
    const y = hit.point.y, sy = streetHeight(z);
    const west = x < 15 ? Math.max(0, 15 - x) * 0.06 : 0;              // 川の西は、離れるほど通りが上る
    if (sy !== null && (y < sy - 1.5 || y > sy + west + 3)) continue;   // 屋根・塀の上、川底
    if (sy === null && y < 18) continue;
    _o.set(x, 400, z);
    const wet = waterCollider && cast(_o, DOWN, 800, waterCollider);
    if (wet && wet.point.y > y - 0.3) continue;                        // 水の上
    // まわりが壁で囲まれているすき間はやめる
    _o.set(x, y + 0.6, z);
    let open = 0;
    for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { _d.set(dx, 0, dz); if (!cast(_o, _d, 1.2)) open++; }
    if (open < 3) continue;
    // 階段や坂の途中はやめる
    let flat = true;
    for (let k = 0; k < 8 && flat; k++) {
      const a = k * Math.PI / 4;
      _o.set(x + Math.sin(a) * rule.flatR, y + 3, z + Math.cos(a) * rule.flatR);
      const h = cast(_o, DOWN, 6);
      if (!h || Math.abs(h.point.y - y) > rule.flat) flat = false;
    }
    if (!flat) continue;
    // 細い路地もやめる
    let room = 0;
    for (let k = 0; k < 8; k++) {
      const a = k * Math.PI / 4;
      _d.set(Math.sin(a), 0, Math.cos(a));
      _o.set(x, y + 0.6, z);
      if (cast(_o, _d, rule.room)) continue;
      _o.y = y + 1.5;
      if (!cast(_o, _d, rule.room)) room++;
    }
    if (room < rule.dirs) continue;
    if (avoid.some((p) => Math.hypot(p.x - x, p.z - z) < 6)) continue;
    return { x, z };
  }
  return null;
}
// 小バイ菌の出る場所は、ページを開くたびに区画の中から選び直す（つづきから遊ぶときは、セーブした場所に戻す。loadGame）
function setupProgress() {
  let seed = (Math.random() * 2 ** 32) | 0;
  const rand = () => {   // mulberry32
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  ruinAreas.forEach(() => areaGauge.push({ spots: [], germs: [], residents: [], called: false, done: false }));
  ruinAreas.forEach((a, i) => {
    const spots = areaGauge[i].spots;
    for (const rule of SPOT_RULES) {
      while (spots.length < GERMS_PER_AREA) {
        const p = areaSpot(a, rand, spots, rule);
        if (!p) break;
        spots.push(p);
      }
    }
  });
  // パンを食べられる町人だけ（町長は食べない）。区画は家（いつもいる場所）で決める
  for (const r of residents) {
    if (!r.eat) continue;
    const i = areaAt(r.home.x, r.home.z);
    if (i >= 0) areaGauge[i].residents.push(r);
  }
}
function germGone(g) { return g.state === 'defeat' || g.done; }
function areaProgress(i) {
  const g = areaGauge[i];
  const total = g.spots.length + g.residents.length;   // まだ出ていない小バイ菌も数に入れる
  if (!total) return g.done ? 1 : 0;
  return (g.germs.filter(germGone).length + g.residents.filter((r) => r.fed).length) / total;
}
function townProgress() {
  return areaGauge.length ? areaGauge.reduce((s, _, i) => s + areaProgress(i), 0) / areaGauge.length : 0;
}
// 会話・カットイン・暗転・工房の中・オープニングの間は、セリフと重ならないように出さずにためておき、
// 終わってから順に出す（同じ文はまとめる。たまりすぎたら古いものから捨てる）。
// 出ている途中で会話などが始まったら、いったん引っこめて、あとで出し直す。
// からだが 0 になってパン工房へ戻されるときは、それまでのメッセージは古くなるので捨てる（clearToasts）。
// 長く待ったもの（TOAST_STALE 秒）も捨てる
const TOAST_TIME = 3;          // 1 つを出しておく時間（秒）
const TOAST_GAP = 0.4;         // 続けて出すときのすき間（秒）
const TOAST_QUEUE_MAX = 4;
const TOAST_STALE = 45;
const toastQueue = [];   // { text, at: ためた時刻（time.value） }
let toastGap = 0;
function toastBusy() {
  return talk.active || !!opening || !!visit || document.body.classList.contains('cutin') || fadeEl.classList.contains('on');
}
function queueToast(text) {
  if (toastQueue.some((q) => q.text === text)) return;
  toastQueue.push({ text, at: time.value });
  if (toastQueue.length > TOAST_QUEUE_MAX) toastQueue.shift();
}
function clearToasts() {
  toastQueue.length = 0;
  toastTime = 0;
  toastEl.classList.remove('on');
}
function showToast(text) {
  if (toastBusy()) { queueToast(text); return; }
  toastEl.textContent = text;
  toastEl.classList.add('on');
  toastTime = TOAST_TIME;
}
function updateToast(dt) {
  if (toastBusy()) {
    if (toastTime > 0) {
      if (toastTime > 0.8) toastQueue.unshift({ text: toastEl.textContent, at: time.value });   // ほとんど読めていないものは出し直す
      toastTime = 0;
      toastEl.classList.remove('on');
      toastGap = TOAST_GAP;
    }
    return;
  }
  if (toastTime > 0) {
    if ((toastTime -= dt) <= 0) { toastEl.classList.remove('on'); toastGap = TOAST_GAP; }
    return;
  }
  while (toastQueue.length && time.value - toastQueue[0].at > TOAST_STALE) toastQueue.shift();
  if (toastQueue.length && (toastGap -= dt) <= 0) showToast(toastQueue.shift().text);
}

// ---- 助けを呼ぶ声と、その方向の 3D の矢印 ----
const ARROW_LIFT = 0.9;         // 矢印の輪の高さ（ロボの頭の上から）
const ARROW_RING = 1.0;         // ロボの真上から、呼んでいる方向へずらす距離
const ARROW_SIZE = 0.65;        // 矢印の大きさ（1 で長さ 0.86m）
// ?nomark：矢印と頭の上のアイコン（バイ菌・パン）を出さない（携帯の重さを調べる用）
const NO_MARK = new URLSearchParams(location.search).has('nomark');
const _ha = new THREE.Vector3(), _hd = new THREE.Vector3(), _hf = new THREE.Vector3();
const _hy = new THREE.Vector3(0, 1, 0);
// 矢印（+Y 向き）。いつも手前に見えるように、奥行きを気にせず最後に描く。濃い茶色のふちどり付き
function makeArrow(color) {
  const group = new THREE.Group();
  const shaft = new THREE.CylinderGeometry(0.07, 0.07, 0.5, 10).translate(0, 0.25, 0);
  const head = new THREE.ConeGeometry(0.2, 0.36, 14).translate(0, 0.68, 0);
  const add = (mat, order, s) => {
    for (const geo of [shaft, head]) {
      const m = new THREE.Mesh(geo, mat);
      m.renderOrder = order;
      m.scale.setScalar(s);
      m.frustumCulled = false;
      group.add(m);
    }
  };
  add(new THREE.MeshBasicMaterial({ color: 0x3a2a1e, side: THREE.BackSide, depthTest: false, depthWrite: false, transparent: true }), 998, 1.22);
  // 少しだけ陰影をつけて、向こう向きのときも立体に見えるように
  add(new THREE.MeshLambertMaterial({ color, emissive: color, emissiveIntensity: 0.45, depthTest: false, depthWrite: false, transparent: true }), 999, 1);
  group.children.filter((m, k) => k < 2).forEach((m) => m.position.y = -0.05);   // ふちどりを根元側にも少し出す
  group.scale.setScalar(ARROW_SIZE);
  group.visible = false;
  scene.add(group);
  return group;
}
// 助けを呼ぶアイコン（色の丸に「！」）。呼んでいる町人の頭の上（町人のいない区画は小バイ菌の上）に、いつも手前に出す
// 頭の上の吹き出し。kind：'germ'（小バイ菌が出て助けを呼んでいる。区画の色）/ 'bread'（おなかがすいている）
const ICON_INK = '#3a2a1e';
function drawGermIcon(x) {
  // トゲトゲの丸い体に、つり目
  x.fillStyle = '#6a5288'; x.strokeStyle = ICON_INK; x.lineWidth = 4; x.lineJoin = 'round';
  x.beginPath();
  for (let i = 0; i < 20; i++) {
    const a = i / 20 * Math.PI * 2, r = i % 2 ? 22 : 31;
    x.lineTo(64 + Math.cos(a) * r, 60 + Math.sin(a) * r);
  }
  x.closePath(); x.fill(); x.stroke();
  for (const sx of [-1, 1]) {
    x.fillStyle = '#fffaf0';
    x.beginPath(); x.ellipse(64 + sx * 8, 60, 6, 7, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = ICON_INK;
    x.beginPath(); x.arc(64 + sx * 7, 61, 3, 0, Math.PI * 2); x.fill();
    x.lineWidth = 3.5;
    x.beginPath(); x.moveTo(64 + sx * 15, 49); x.lineTo(64 + sx * 3, 53); x.stroke();   // 怒りまゆ
  }
}
function drawBreadIcon(x) {
  // ふっくらした山形のパン（切れ目入り）
  x.strokeStyle = ICON_INK; x.lineWidth = 4; x.lineJoin = 'round';
  x.fillStyle = '#d68a3e';
  x.beginPath();
  x.moveTo(30, 74);
  x.bezierCurveTo(28, 40, 100, 40, 98, 74);
  x.quadraticCurveTo(64, 82, 30, 74);
  x.closePath(); x.fill(); x.stroke();
  x.fillStyle = '#f2c27c';
  x.beginPath(); x.ellipse(56, 54, 16, 6, -0.2, 0, Math.PI * 2); x.fill();   // てかり
  x.strokeStyle = '#9a5a22'; x.lineWidth = 3.5; x.lineCap = 'round';
  for (const dx of [-16, 0, 16]) { x.beginPath(); x.moveTo(64 + dx - 5, 66); x.lineTo(64 + dx + 5, 52); x.stroke(); }
}
function makeHelpIcon(color, kind = 'germ') {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d');
  x.beginPath();
  x.arc(64, 60, 50, 0, Math.PI * 2);
  x.moveTo(50, 104); x.lineTo(64, 124); x.lineTo(78, 104);   // 下のとがり（吹き出しのしっぽ）
  x.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
  x.fill();
  x.lineWidth = 7; x.strokeStyle = ICON_INK; x.lineJoin = 'round';
  x.stroke();
  // 色の上でも絵が見えるように、白い丸の上に描く
  x.fillStyle = '#fffaf0';
  x.beginPath(); x.arc(64, 60, 40, 0, Math.PI * 2); x.fill();
  if (kind === 'bread') drawBreadIcon(x); else drawGermIcon(x);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const icon = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, depthWrite: false, sizeAttenuation: false }));
  icon.center.set(0.5, 0);
  icon.renderOrder = 997;
  icon.visible = false;
  icon.userData.noOutline = true;   // 画面に貼る絵なので、輪郭線の回には入れない
  scene.add(icon);
  return icon;
}
// まだ呼んでいない区画のうち、ふわおにいちばん近い区画が助けを呼ぶ
// （目の前にいきなり出てこないよう、小バイ菌の場所が HELP_NEAR より近い区画は、ほかになければ選ぶ）
const HELP_NEAR = 12;
function startHelp() {
  if (storyStage >= 4) return false;   // 崩壊したあとの町には、町の人がいない
  let best = -1, bestD = Infinity;
  areaGauge.forEach((g, i) => {
    const again = g.called && g.germs.some((x) => !germGone(x)) && !helps.some((h) => h.area === i);   // よみがえった小バイ菌
    if (!again && (g.called || g.done || !g.spots.length)) return;
    const near = Math.min(...g.spots.map((p) => Math.hypot(p.x - feet.x, p.z - feet.z)));
    const d = near < HELP_NEAR ? near + 1000 : near;
    if (d < bestD) { best = i; bestD = d; }
  });
  if (best < 0) return false;
  const gauge = areaGauge[best];
  if (gauge.called) { addHelp(best); return true; }
  gauge.called = true;
  for (const p of gauge.spots) {
    const g = spawnGerm(p.x, p.z);
    g.area = best;
    g.spot = p;
    gauge.germs.push(g);
  }
  addHelp(best);
  return true;
}
function addHelp(best) {
  const gauge = areaGauge[best];
  const used = helps.map((h) => h.slot);
  const slot = [0, 1, 2].find((s) => !used.includes(s));
  const caller = gauge.residents[Math.floor(Math.random() * gauge.residents.length)] || null;
  helps.push({ area: best, slot, caller, t: 0, arrow: makeArrow(HELP_COLORS[slot]), icon: makeHelpIcon(HELP_COLORS[slot]) });
}
// 呼んでいる区画の、まだ倒していない小バイ菌のうち、いちばん近いもの
function helpTarget(h) {
  let best = null, bestD = Infinity;
  for (const g of areaGauge[h.area].germs) {
    if (germGone(g)) continue;
    const d = g.root.position.distanceToSquared(feet);
    if (d < bestD) { best = g; bestD = d; }
  }
  return best;
}
function updateHelps(dt, active) {
  // 全部倒した区画の声は止む
  for (let i = helps.length - 1; i >= 0; i--) {
    const h = helps[i];
    if (areaGauge[h.area].germs.some((g) => !germGone(g))) continue;
    scene.remove(h.arrow, h.icon);
    h.arrow.traverse((o) => { if (o.isMesh) o.material.dispose(); });
    h.icon.material.map.dispose();
    h.icon.material.dispose();
    helps.splice(i, 1);
    if (!areaGauge[h.area].done) showToast(`${AREA_NAMES[ruinAreas[h.area].name]}の小バイ菌をやっつけた！`);
    helpWait = Math.max(helpWait, HELP_GAP);
  }
  if (active && helps.length < HELP_MAX && (helpWait -= dt) <= 0) {
    if (startHelp()) helpWait = HELP_GAP;
  }
  // 矢印：ふわおの頭の上（一人称のときは目の前の少し下）から、小バイ菌のほうへ向ける
  if (view.thirdPerson) _ha.set(feet.x, feet.y + ROBOT_HEIGHT + ARROW_LIFT, feet.z);
  else {
    camera.getWorldDirection(_hf);
    _ha.copy(camera.position).addScaledVector(_hf, 2.6);
    _ha.y -= 0.7;
  }
  const bob = Math.sin(performance.now() / 1000 * 4) * 0.06;
  for (const h of helps) {
    const g = helpTarget(h);
    h.arrow.visible = !NO_MARK && active && !!g;
    // アイコン：出たときにぽんと大きくなって、あとはゆっくり上下する
    h.t += dt;
    const k = Math.min(1, h.t / 0.35) - 1;
    const pop = 1 + 2.70158 * k * k * k + 1.70158 * k * k;   // 少し行き過ぎて戻る（easeOutBack）
    const s = HELP_ICON_SIZE * Math.max(0.01, pop);
    h.icon.scale.set(s, s, 1);
    const who = h.caller && h.caller.root.visible ? h.caller.root : g?.root;
    h.icon.visible = !NO_MARK && active && !!who;
    if (who) {
      const up = who === h.caller?.root ? h.caller.height + 0.35 : germBody + 1.2;
      h.icon.position.set(who.position.x, who.position.y + up + Math.sin(h.t * 3 + h.slot) * 0.08, who.position.z);
    }
    if (!g) continue;
    _hd.set(g.root.position.x, g.root.position.y + germBody, g.root.position.z).sub(_ha);
    h.dist = _hd.length();
    _hd.divideScalar(h.dist || 1);
    const flat = Math.hypot(_hd.x, _hd.z) || 1;
    h.arrow.position.set(_ha.x + _hd.x / flat * ARROW_RING, _ha.y + bob, _ha.z + _hd.z / flat * ARROW_RING);
    h.arrow.quaternion.setFromUnitVectors(_hy, _hd);
  }
  // 矢印がいくつも出るとうるさいので、いちばん近い小バイ菌への矢印だけ出す
  let near = null;
  for (const h of helps) if (h.arrow.visible && (!near || h.dist < near.dist)) near = h;
  for (const h of helps) if (h !== near) h.arrow.visible = false;
}

function useFuel(amount) { fuel = Math.max(0, fuel - amount); }
// トッピングを手に入れたときに呼ぶ。タンクが大きくなり、増えた分も満たす
function raiseFuelMax(step = FUEL_MAX_STEP) {
  const before = fuelMax;
  fuelMax = Math.min(1, fuelMax + step);
  fuel = Math.min(fuelMax, fuel + (fuelMax - before));
}
// 脅威につぶされた・ヘドロの体をすり抜けたとき：からだが減り、画面のふちが赤く光る。0 になったらパン工房へ
const BODY_HIT = 0.25;          // 1 回で減るからだ（1/4）
const BODY_HIT_GUARD = 1.5;     // 続けて減らない時間（秒）
let bodyHitWait = 0;
// ゲームオーバー（いまは仮の画面。つづきからは、最後に保存したところから）
const GAMEOVER_STAGE = 4;
const KNOCK_FADE_OUT = 1.8;    // からだが 0 になったときの暗転の長さ（秒）
const KNOCK_DARK = 0.4;        // 真っ暗なままの時間（秒）
const KNOCK_FADE_IN = 1.4;     // 工房の中で明るくなる長さ（秒）
// 暗転の長さを変える（null でふつうの FADE_TIME に戻す。CSS の transition）
function setFadeTime(sec) { fadeEl.style.transitionDuration = sec ? `${sec}s` : ''; }
function showGameOver() {
  knockout.gameover = true;
  savingOn = false;   // からだが 0 のまま保存しない
  jetting = false; jetVel.set(0, 0, 0); recoilVel.set(0, 0, 0); velY = 0;
  releaseAll();
  document.getElementById('gameover').classList.add('on');
}
function hurtBody(msg) {
  if (bodyHitWait > 0 || knockout) return false;
  bodyHitWait = BODY_HIT_GUARD;
  body = Math.max(0, body - BODY_HIT);
  hurtEl.classList.remove('on');
  void hurtEl.offsetWidth;
  hurtEl.classList.add('on');
  shake = Math.max(shake, 1.5);
  if (body <= 0) { knockout = { t: 0, moved: false }; clearToasts(); }
  else if (msg) showToast(msg);
  return true;
}
function shaveBody() {
  body = Math.max(0, body - BODY_PER_SHOT);
  if (body <= 0 && !knockout) { knockout = { t: -0.8, moved: false }; clearToasts(); }   // 撃ったパンが飛んでいくのを少し見せてから暗転
}
function updateProgress(dt, active) {
  // 区画のゲージが満タンになったら、区画を元に戻す
  areaGauge.forEach((g, i) => {
    if (g.done || !(g.spots.length + g.residents.length) || areaProgress(i) < 1) return;
    g.done = true;
    restoreArea(ruinAreas[i].name);
    setTimeout(saveGame, 0);
    showToast(`${AREA_NAMES[ruinAreas[i].name] || ruinAreas[i].name}が元に戻った！`);
  });

  bodyHitWait -= dt;
  if (active && !knockout) {
    if (jetting) {
      useFuel(FUEL_JET * dt);
      if (fuel <= 0) { jetting = false; jetEndTime = 0; jumpLocked = true; }   // 押したまま着地しても跳ねないように
    } else if (onGround) fuel = Math.min(fuelMax, fuel + FUEL_REGEN * dt);
    // パン工房の前で補給（焼き直し）
    refilling = onGround && Math.hypot(feet.x - WORKSHOP_FRONT.x, feet.z - WORKSHOP_FRONT.z) < WORKSHOP_REFILL_R
      && Math.abs(feet.y - WORKSHOP_FRONT.y) < 3;
    if (refilling) fuel = Math.min(fuelMax, fuel + WORKSHOP_REFILL * dt);   // からだは戻らない（パン屋のお姉さんで戻る）
  }

  // からだが 0：ゆっくり暗転（KNOCK_FADE_OUT）→ パン工房の中でゆっくり明るくなり（KNOCK_FADE_IN）、工場長が話す → 外へ。
  // ステージ 4（町の崩壊のあと）は、魔法のパン種を工場長が窯から持ち出していて焼き直せないので、ゲームオーバー
  if (knockout) {
    knockout.t += dt;
    if (knockout.t >= 0 && !fadeEl.classList.contains('on')) { setFadeTime(KNOCK_FADE_OUT); fadeEl.classList.add('on'); }
    if (knockout.gameover) return;
    if (knockout.t > KNOCK_FADE_OUT + KNOCK_DARK) {
      if (storyStage >= GAMEOVER_STAGE) { setFadeTime(null); showGameOver(); return; }
      velY = 0; jetting = false; jetVel.set(0, 0, 0); recoilVel.set(0, 0, 0);
      fuel = fuelMax; body = 1; fuwaoNo++;
      knockout = null;
      reviveInWorkshop();
    }
  }

  updateHelps(dt, active);
  // 止まって少したったときだけ、町の復興度などを出す（歩く・走る・跳ぶ・噴射・発射の間は燃料とからだだけ）
  const still = active && !knockout && onGround && !jetting && !firing && moveSpeed < 0.2;
  stillTime = still ? stillTime + dt : 0;
  metersEl.classList.toggle('show', stillTime > METERS_IDLE);
  drawMeters();
}
let drawnMeters = '';
function drawMeters() {
  const here = areaAt(feet.x, feet.z);
  const town = townProgress();
  const helpText = helps.map((h) => `${h.slot}:${h.area}:${Math.round((h.dist || 0) / 5) * 5}`).join(',');
  const key = `${town.toFixed(3)}|${fuel.toFixed(3)}|${fuelMax}|${body.toFixed(3)}|${here}|${here >= 0 ? areaProgress(here).toFixed(3) : ''}|${refilling}|${helpText}|${fuwaoNo}`;
  if (key === drawnMeters) return;
  drawnMeters = key;
  const set = (name, v) => { metersEl.querySelector(`.meter-${name} .fill`).style.transform = `scaleX(${v})`; };
  set('town', town);
  set('fuel', fuel);
  set('body', body);
  metersEl.querySelector('.meter-body .gen').textContent = `🤍${fuwaoNo}`;   // 何人目かは言わない。焼き直されるたびに数だけふえていく
  metersEl.querySelector('.meter-town .num').textContent = `${Math.round(town * 100)}%`;
  // 燃料のバーは最大のタンクの長さで、まだ大きくなっていない分は斜線で埋めておく
  metersEl.querySelector('.meter-fuel .cap').style.width = `${(1 - fuelMax) * 100}%`;
  metersEl.querySelector('.meter-fuel').classList.toggle('low', fuel < fuelMax * 0.2);
  metersEl.querySelector('.meter-body').classList.toggle('low', body < 0.2);
  const areaEl = metersEl.querySelector('.meter-area');
  if (refilling) areaEl.textContent = 'パン工房：補給中（燃料が戻る）';
  else if (here >= 0) {
    const g = areaGauge[here], name = AREA_NAMES[ruinAreas[here].name];
    const left = g.spots.length - g.germs.filter(germGone).length;
    const hungry = g.residents.filter((r) => !r.fed).length;
    const todo = [left && `小バイ菌 あと${left}`, hungry && `おなかをすかせた人 ${hungry}`].filter(Boolean).join('・');
    areaEl.textContent = g.done ? `${name}：元どおり` : `${name}：${Math.round(areaProgress(here) * 100)}%${todo ? `（${todo}）` : ''}`;
  } else areaEl.textContent = '';
  // 助けを呼んでいる区画（矢印と同じ色の印と、だいたいの距離）
  const helpsEl = metersEl.querySelector('.meter-helps');
  helpsEl.replaceChildren(...helps.map((h) => {
    const row = document.createElement('div');
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.style.background = `#${HELP_COLORS[h.slot].toString(16).padStart(6, '0')}`;
    row.append(dot, `${AREA_NAMES[ruinAreas[h.area].name]}　${Math.round((h.dist || 0) / 5) * 5}m`);
    return row;
  }));
}

// ---- ふわふわパン（発射の弾） ----
// 発射アニメのフレーム 110 で、砲口の目印 PC_Muzzle（ローカル +Y が前）からパンを出す。
// 放物線で飛び、地面・壁・水面に当たったらその場に浮かぶ。しばらくしたら煙になって消える
const BREAD_SCALE = 2;        // 元は直径 0.3m。ロボに合わせて大きくする
const BREAD_SPEED = 14;       // 飛び出す速さ（m/秒）
const BREAD_LIFT = 0.8;       // 少しだけ上向きに打ち出す（m/秒）。大きいと山なりになって人の頭を越えてしまう
const BREAD_GRAVITY = 3;      // ふわふわなので弱めの重力。低めにまっすぐ飛んで、遠くでゆっくり落ちる
const BREAD_HOVER = 0.5;      // 着地したところから浮かぶ高さ
const BREAD_LIFE = 10;        // 着地してから消えるまで（秒）
const BREAD_MAX_FLIGHT = 6;   // 何にも当たらなかったときに消えるまで（秒）
const BREAD_MAX = 10;         // 同時に出ているパンの数
const BREAD_VANISH_FROM = 90; // 「食べられる」の終わり（92 で煙玉 → 100 で消える）だけを消えるときに使う
let breadTemplate = null, breadClips = null, muzzle = null, muzzleFrame = 110;
let shotSpawned = false;
const breads = [];
const _bp = new THREE.Vector3();
const _bq = new THREE.Quaternion();
function setupBread(gltf) {
  breadTemplate = gltf.scene;
  // 材質が 2 つあるメッシュ（BR_Bread）は、読み込むと BR_Bread_1 / BR_Bread_2 という名前の部品に分かれ、
  // かじった段階のノード（BR_Bread_1 / _2）と名前がぶつかって、アニメの大きさ 0 が本体の部品にかかってしまう。
  // glb のノードではない部品の名前を変えて、アニメが本来のノードにだけかかるようにする
  breadTemplate.traverse((o) => {
    const assoc = gltf.parser.associations.get(o);
    if (o.isMesh && assoc && assoc.nodes === undefined) o.name = `${o.parent.name}#${assoc.primitives ?? 0}`;
  });
  breadTemplate.traverse((o) => { if (o.isMesh) o.castShadow = true; });
  breadClips = clipsFromExtras(breadTemplate.getObjectByName('BR_Root') || breadTemplate, gltf.animations);
  muzzle = model.getObjectByName('PC_Muzzle');
  if (muzzle?.userData.spawn_frame) muzzleFrame = muzzle.userData.spawn_frame;
}
function spawnBread() {
  if (!breadTemplate || !muzzle) return;
  playSfx('shot');
  muzzle.updateWorldMatrix(true, false);
  muzzle.getWorldPosition(_bp);
  muzzle.getWorldQuaternion(_bq);
  const root = breadTemplate.clone();
  root.position.copy(_bp);
  root.scale.setScalar(BREAD_SCALE);
  root.rotation.y = heading;
  style.apply(root);
  scene.add(root);
  const mixer = new THREE.AnimationMixer(root);
  // PC_Muzzle のローカル +Y が砲口の向き（2026-11-01 20:37 より前の書き出しでは後ろ向きだった）
  // 砲口の上下の傾き（撃つアニメで少し上を向く）は使わず、水平に打ち出して BREAD_LIFT だけ上向きにする
  const dir = new THREE.Vector3(0, 1, 0).applyQuaternion(_bq).setY(0).normalize();
  const b = {
    root, mixer, state: 'fly', time: 0,
    vel: dir.multiplyScalar(BREAD_SPEED).setY(BREAD_LIFT),
    float: mixer.clipAction(breadClips.float),
  };
  const appear = breadClips.appear && mixer.clipAction(breadClips.appear);
  if (appear) {
    appear.setLoop(THREE.LoopOnce, 1);
    appear.clampWhenFinished = true;
    appear.play();
    mixer.addEventListener('finished', (e) => { if (e.action === appear) { b.float.play(); appear.crossFadeTo(b.float, 0.15, false); } });
  } else b.float.play();
  breads.push(b);
  if (breads.filter((x) => x.state !== 'vanish').length > BREAD_MAX) vanishBread(breads.find((x) => x.state !== 'vanish'));
}
// 「食べられる」（60〜100）を from のフレームから再生し、終わったら消す
function vanishBread(b, from = BREAD_VANISH_FROM) {
  b.state = 'vanish';
  b.time = 0;
  b.mixer.stopAllAction();
  if (!breadClips.eaten) { b.done = true; return; }
  const a = b.mixer.clipAction(breadClips.eaten);
  a.setLoop(THREE.LoopOnce, 1);
  a.clampWhenFinished = true;
  a.play();
  a.time = (from - 60) / ANIM_FPS;
  b.mixer.addEventListener('finished', () => { b.done = true; });
}
// 住民に食べられる。かじられる側（BR_Root の +X）を食べる人の顔へ向けてから、最初から再生する
function eatBread(b, mouth) {
  const dx = mouth.x - b.root.position.x, dz = mouth.z - b.root.position.z;
  b.root.rotation.y = Math.atan2(-dz, dx);
  vanishBread(b, 60);
}
// 撃ったパンが脅威の体に入ったら、パンはヘドロにのみこまれて消える。
// 固形化パンを持っていて、固めるボス（needs）なら、当たった所が固まる（solidifyAt）。
// 体はすそ野の広い山の形で、坂に座っていることもあるので、ボスの近く（BREAD_BOSS_NEAR）まで来たら、
// このフレームに進む分だけ、見えているボスの体のメッシュへ線を飛ばして当たりを見る
const BREAD_BOSS_NEAR = 16;
const _bray = new THREE.Raycaster(), _bdir = new THREE.Vector3();
let solidToast = -Infinity;
function breadHitsBoss(b, dt) {
  if (!boss || !bossAppeared || bossGone || retreat || !bossCfg.needs) return false;
  const p = b.root.position, o = boss.position;
  if (Math.hypot(p.x - o.x, p.z - o.z) > BREAD_BOSS_NEAR) return false;
  const len = b.vel.length() * dt;
  _bray.set(p, _bdir.copy(b.vel).divideScalar(b.vel.length() || 1));
  _bray.far = len + 0.15 * BREAD_SCALE;
  boss.updateMatrixWorld(true);
  // 地面に広がる波の輪（SB_Wave）には当てない
  const hit = _bray.intersectObject(boss, true).find((h) => h.object.visible && !/Wave/.test(h.object.name));
  if (!hit) return false;
  p.copy(hit.point);
  vanishBread(b);
  if (items.has(bossCfg.needs)) {
    solidifyAt(hit);
    if (time.value - solidToast > 20) { solidToast = time.value; showToast(`パンが当たった所が固まった！ そこへ体当たり！`); }
  }
  return true;
}
const EAT_TIME = (100 - 60) / ANIM_FPS;
const _bstep = new THREE.Vector3();
function updateBreads(dt) {
  for (const b of breads) {
    b.time += dt;
    if (b.state === 'fly' && catchBread(b)) {
      // 人に受け止められた
    } else if (b.state === 'fly' && breadHitsBoss(b, dt)) {
      // 脅威の体に当たった（固形化パンなら固まる）
    } else if (b.state === 'fly') {
      b.vel.y -= BREAD_GRAVITY * dt;
      _bstep.copy(b.vel).multiplyScalar(dt);
      const len = _bstep.length();
      _d.copy(_bstep).divideScalar(len || 1);
      const hit = cast(b.root.position, _d, len + 0.15 * BREAD_SCALE);
      const wet = cast(b.root.position, _d, len, waterCollider);
      const h = hit && wet ? (hit.distance < wet.distance ? hit : wet) : hit || wet;
      if (h) {
        // 当たった面から少し離して浮かべる（壁なら手前、床なら上）
        const n = h.face.normal.clone().transformDirection(h.object.matrixWorld);
        if (n.dot(_d) > 0) n.negate();
        b.root.position.copy(h.point).addScaledVector(n, 0.2 * BREAD_SCALE);
        if (n.y > 0.5) b.root.position.y += BREAD_HOVER;
        b.state = 'rest';
        b.time = 0;
      } else {
        b.root.position.add(_bstep);
        if (b.time > BREAD_MAX_FLIGHT) vanishBread(b);
      }
    } else if (b.state === 'rest' && b.time > BREAD_LIFE && !b.claimedBy) {
      vanishBread(b);
    }
    b.mixer.update(dt);
  }
  for (let i = breads.length - 1; i >= 0; i--) {
    if (!breads[i].done) continue;
    scene.remove(breads[i].root);
    breads[i].mixer.uncacheRoot(breads[i].root);
    breads.splice(i, 1);
  }
}

// ---- 住民（おじいちゃん、おばあちゃん、少女） ----
// 家のまわりを歩いては立ち止まる。近くにパンが浮かんでいたら歩いていって食べる。
// アニメは Idle / Walk（その場で足踏み）/ Eat。前へ進むのはここで動かす。
// 少女はおなかをすかせていて（Hungry ＋ への字口）、パンを食べると笑顔になって Joy で喜び、そのあとは Idle ＋ 笑顔
// radius / height は当たり判定の円柱（GLB の extras に hit_radius / hit_height があればそちらを使う）
const RESIDENT_KINDS = {
  grandpa: { speed: 0.3, eatPos: new THREE.Vector3(0.04, 1.11, 0.48), radius: 0.3, height: 1.62 },   // 1サイクル約0.4m。杖の分だけ太め
  grandma: { speed: 0.31, eatPos: new THREE.Vector3(0.03, 1.04, 0.45), radius: 0.28, height: 1.5 },   // おじいちゃんと並んで歩ける速さ
  // 町長は世界に 1 人。パンは食べない（Eat がない）。立ち止まると、ときどき Think で考えこむ
  mayor: { speed: 0.5, radius: 0.32, height: 1.75, think: 0.4 },
  // パン屋のお姉さんは店先に立ったまま（押されてずれたら戻る）。パンは食べない。話している間は Talk
  baker: { speed: 0.55, radius: 0.28, height: 1.6, stay: true },
  // 工場長はパン工房の扉の横に立ったまま。パンは食べない
  chief: { speed: 0.5, radius: 0.32, height: 1.7, stay: true },
  girl: { speed: 0.46, eatPos: new THREE.Vector3(0, 0.78, 0.46), radius: 0.25, height: 1.2, hungry: true, smileAt: 32 },
};
// id は会話の台本（talks.js）を引く名前。「区画の番号-その区画の何人目」（区画の番号は AREA_NAMES の順、パン工房は 0）
// house があれば、夜はその家に帰る：out の時刻（[出てくる, 帰る]）になったら way を通って戸口 door まで歩き、
// 家に入って見えなくなる。朝は戸口から出てきて、way を逆にたどって home へ戻る
// おばあちゃんと女の子は、表通りの TH_House_10（バルコニーの家）に一緒に住んでいる
const GRANDMA_DOOR = new THREE.Vector3(6.05, 0, 9.45);
const RESIDENTS = [
  { id: '7-1', kind: 'grandpa', home: new THREE.Vector3(15, 0, 7.5), radius: 5 },   // スタート地点の西、表通り
  { id: '4-1', kind: 'grandpa', home: new THREE.Vector3(-6, 0, -8.5), radius: 3 },   // 上の通り（表通りの一段上）の家並みの前
  { id: '2-2', kind: 'grandma', home: new THREE.Vector3(5, 0, 7), radius: 5,     // 表通り、家の前
    house: { door: GRANDMA_DOOR, way: [], out: [6.5, 18.5] } },
  { id: '7-2', kind: 'girl', home: new THREE.Vector3(19, 0, 6), radius: 3,          // 橋の上。帰りは橋を西へ渡る
    house: { door: GRANDMA_DOOR, way: [new THREE.Vector3(15, 0, 6.3), new THREE.Vector3(8, 0, 8.3)], out: [7, 18] } },
  { id: '1-1', kind: 'mayor', home: new THREE.Vector3(-15.5, 0, 9.2), radius: 1.2 },   // 広場の北のはし、表通りから見える噴水の手前
  // パン屋の店先（扉の前、街灯の右）。軒の下なので、地面はこの高さから下を調べる。face は立つ向き
  { id: '3-1', kind: 'baker', home: new THREE.Vector3(-1.2, 4.28, 3.45), radius: 0, face: 0.245, under: true },
  // パン工房の扉の横（スタート地点の右前）。ふわおのほうを向いて立つ。外に出てくるのは町が崩壊したステージ 4 から（CHIEF_OUT_STAGE。それまでは工房の中）
  { id: '0-1', kind: 'chief', home: new THREE.Vector3(-5.2, 12, -24.4), radius: 0, face: -0.7 },
  // 西の丘のお城の塀の中（天守の南東の中庭）に立つ女の子。町の人ではないので guest：
  // おなかはすかず（パンを食べない）、町が崩壊しても丘へ避難せず、話すのは自分の台本（talks.json の castle）だけ。
  // 町のほう（東、+X）を向いて立っている。話すとプレゼント（ITEMS.present）をくれる
  { id: 'castle', kind: 'girl', home: new THREE.Vector3(-272, 52.3, 18), radius: 0, face: Math.PI / 2, guest: true },
];
const RES_HOME_HURRY = 1.25;     // 家へ帰るときは少し急ぐ
const RES_HURRY = 1.6;           // パンへ向かうときは少し急ぐ（速さもアニメもこの倍）
const RES_TURN = 3;              // 向きを変える速さ
const RES_STEP = 0.45;           // 上り下りできる段差（歩道のへりや戸口の段）
const RES_SEE_BREAD = 10;        // この距離のパンに気づく
const RES_REACH = 0.55;          // パンの手前で止まる距離
const RES_IDLE = [2.5, 6];       // 立ち止まる時間（秒）
const residents = [];
const _rd = new THREE.Vector3();
const _rm = new THREE.Vector3();
function placeResidents(models) {
  for (const { id, kind, home, radius, house, face, under, guest } of RESIDENTS) {
    const gltf = models[kind], k = guest ? { ...RESIDENT_KINDS[kind], hungry: false } : RESIDENT_KINDS[kind];
    const clip = (name) => THREE.AnimationClip.findByName(gltf.animations, name);
    const root = cloneSkinned(gltf.scene);
    root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; } });
    _o.set(home.x, under ? home.y + 1 : 400, home.z);
    const hit = cast(_o, DOWN, under ? 3 : 800);
    home.y = hit ? hit.point.y : home.y;
    root.position.copy(home);
    root.rotation.y = face ?? Math.random() * Math.PI * 2;
    scene.add(root);
    const mixer = new THREE.AnimationMixer(root);
    const once = (name) => {
      const c = clip(name);
      if (!c) return null;
      const a = mixer.clipAction(c);
      a.setLoop(THREE.LoopOnce, 1);
      a.clampWhenFinished = true;
      return a;
    };
    const idle = mixer.clipAction(clip('Idle'));
    let hitRadius = k.radius, hitHeight = k.height;
    gltf.scene.traverse((o) => {
      if (o.userData.hit_radius) hitRadius = o.userData.hit_radius;
      if (o.userData.hit_height) hitHeight = o.userData.hit_height;
    });
    const r = {
      id, kindName: kind, house, route: null, leg: 0, kind: k, root, radius: hitRadius, height: hitHeight, roam: radius, home, mixer, state: 'idle', wait: 1 + Math.random() * 2, target: new THREE.Vector3(), bread: null,
      idle, walk: mixer.clipAction(clip('Walk')).play(), walkWeight: 0,
      eat: once('Eat'), joy: once('Joy'), think: once('Think'), oneShot: null,
      faces: { sad: once('Face_Sad'), smile: once('Face_Smile') }, face: null,
      standFace: face ?? null, talkA: clip('Talk') ? mixer.clipAction(clip('Talk')) : null, talkWeight: 0,
    };
    if (r.talkA) { r.talkA.play(); r.talkA.setEffectiveWeight(0); }
    // ふだんの待機。おなかがすいている間は Hungry
    r.hungryIdle = clip('Hungry') ? mixer.clipAction(clip('Hungry')) : null;
    r.baseIdleClip = idle.getClip();
    if (k.hungry && r.hungryIdle) r.idle = r.hungryIdle;
    r.idle.play();
    r.idle.time = Math.random() * r.idle.getClip().duration;
    r.walk.setEffectiveWeight(0);
    setFace(r, k.hungry ? 'sad' : 'smile');
    // 体のクリップは最初と最後が Idle の最初と同じ姿勢なので、Eat → (Joy) → 待機の頭、とつなぐ
    mixer.addEventListener('finished', (e) => {
      if (e.action !== r.oneShot) return;
      e.action.stop();
      if (e.action === r.eat && r.joy && r.fed) { r.oneShot = r.joy; r.joy.reset().play(); return; }
      r.oneShot = null;
      if (r.fed && r.idle !== idle) { r.idle.stop(); r.idle = idle.play(); }
      r.idle.time = 0;
    });
    if (guest) { r.guest = true; r.eat = null; }   // パンを食べない（受け止めない・探しに行かない）
    residents.push(r);
    if (r.eat) setHungry(r);   // まだパンを食べていない町人は、はじめからおなかをすかせている
  }
}
// 表情（Face_Sad / Face_Smile）は体のクリップと同時に再生し、最後の値を保つ
function setFace(r, name) {
  if (r.face === name || !r.faces[name]) return;
  if (r.face) r.faces[r.face].stop();
  r.faces[name].reset().play();
  r.face = name;
}
// 今いるところから target までまっすぐ歩けるか（壁がなく、段差もない）
function canWalkTo(from, to) {
  _rd.subVectors(to, from).setY(0);
  const len = _rd.length();
  if (len < 0.1) return false;
  _rd.divideScalar(len);
  _o.set(from.x, from.y + 0.5, from.z);
  const wall = cast(_o, _rd, len + 0.3);
  if (wall && hitNormal(wall, _rd)) return false;
  const gy = groundBelow(to);
  return gy !== null && Math.abs(gy - from.y) < 0.6 && !waterLevel(to, gy);
}
function findBread(r) {
  if (!r.eat) return null;
  let best = null, bestD = RES_SEE_BREAD;
  for (const b of breads) {
    if (b.state !== 'rest' || b.claimedBy || b === r.ignore) continue;
    const d = Math.hypot(b.root.position.x - r.root.position.x, b.root.position.z - r.root.position.z);
    _rm.set(b.root.position.x, r.root.position.y, b.root.position.z);
    if (d < bestD && b.root.position.y - r.root.position.y < 2.5 && canWalkTo(r.root.position, _rm)) { best = b; bestD = d; }
  }
  return best;
}
// 夜（家にいる時刻）か
function atHomeTime(r) {
  const h = daytime.hour, [out, back] = r.house.out;
  return h >= back || h < out;
}
// 地面の高さに合わせた点（way や door は高さを書いていないので）
function groundPoint(v) {
  _o.set(v.x, 400, v.z);
  const hit = cast(_o, DOWN, 800);
  return new THREE.Vector3(v.x, hit ? hit.point.y : v.y, v.z);
}
function walkRoute(r, points, then) {
  if (r.bread) { r.bread.claimedBy = null; r.bread = null; }
  r.route = points.map(groundPoint);
  r.leg = 0;
  r.afterRoute = then;
  r.state = 'route';
  r.walkTime = 0;
  r.stuck = 0;
}
function enterHouse(r) {
  r.state = 'home';
  r.root.visible = false;
  r.root.position.copy(groundPoint(r.house.door));
}
function updateHouse(r) {
  if (!r.house || r.state === 'talk' || r.state === 'eat') return;
  const night = atHomeTime(r);
  if (r.state === 'home') {
    if (night) return;
    // 朝：戸口から出てきて、来た道を戻る
    const route = [...r.house.way].reverse().concat(r.home);
    r.root.visible = true;
    r.root.rotation.y = Math.atan2(route[0].x - r.house.door.x, route[0].z - r.house.door.z);
    walkRoute(r, route, 'idle');
  } else if (night && r.afterRoute !== 'home') {
    if (!r.placed) { enterHouse(r); return; }   // 夜に始めたときは、はじめから家の中
    walkRoute(r, r.house.way.concat(r.house.door), 'home');
  }
  r.placed = true;
}
// パンを食べる町人は、はじめはみんなおなかをすかせていて、頭の上にパンのアイコンを出す（食べさせると区画の復興度が進む）。
// お昼と、おやつ（子どもが帰ってくる前）の時刻になると、またみんなおなかがすく（そのときは町の復興度には関係しない）
const HUNGER_TIMES = [
  { hour: 12, text: 'お昼になった！ おなかをすかせた町人が、パンを待っている' },
  { hour: 15, text: 'おやつの時間！ おなかをすかせた町人が、パンを待っている' },
];
const HUNGER_COLOR = 0xf08a24;
let lastHour = null;
function setHungry(r) {
  r.hungry = true;
  r.hungerIcon ||= makeHelpIcon(HUNGER_COLOR, 'bread');
  setFace(r, 'sad');
  if (r.hungryIdle && r.idle !== r.hungryIdle && !r.oneShot) { r.idle.stop(); r.idle = r.hungryIdle.play(); }
}
function makeHungry(text = HUNGER_TIMES[0].text) {
  let n = 0;
  for (const r of residents) {
    if (!r.eat || r.hungry) continue;
    setHungry(r);
    n++;
  }
  if (n) showToast(text);
}
function updateHunger(dt, active) {
  const h = daytime.hour;
  if (active && !townCollapsed && lastHour !== null) {
    const due = HUNGER_TIMES.find((x) => lastHour < x.hour && h >= x.hour && h - lastHour < 6);
    if (due) makeHungry(due.text);
  }
  lastHour = h;
  for (const r of residents) {
    if (!r.hungerIcon) continue;
    const show = !NO_MARK && active && r.hungry && r.root.visible;
    r.hungerIcon.visible = show;
    if (!show) continue;
    r.hungerT = (r.hungerT || 0) + dt;
    r.hungerIcon.scale.set(HELP_ICON_SIZE, HELP_ICON_SIZE, 1);
    const p = r.root.position;
    r.hungerIcon.position.set(p.x, p.y + r.height + 0.35 + Math.sin(r.hungerT * 3) * 0.08, p.z);
  }
}
function updateResidents(dt) {
  for (const r of residents) {
    const pos = r.root.position;
    if (r.state === 'gone') continue;   // 山へ避難した
    if (r.state === 'approach') {
      // ふわおのところへ歩いてきて、そばまで来たら話しかける（町長の警告）
      _rd.set(feet.x - pos.x, 0, feet.z - pos.z);
      const dist = _rd.length();
      r.root.rotation.y = turnToward(r.root.rotation.y, Math.atan2(_rd.x, _rd.z), 1 - Math.exp(-6 * dt));
      const speed = dist > 2.2 ? MAYOR_WALK : 0;
      if (speed) {
        pos.addScaledVector(_rd.divideScalar(dist), speed * dt);
        pos.y += (introGroundY(pos.x, pos.z, pos.y) - pos.y) * (1 - Math.exp(-12 * dt));
      } else if (!talk.active) mayorTalk(r);
      r.walkWeight += ((speed ? 1 : 0) - r.walkWeight) * (1 - Math.exp(-8 * dt));
      r.walk.setEffectiveWeight(r.walkWeight);
      r.idle.setEffectiveWeight(1 - r.walkWeight);
      if (r.talkA) r.talkA.setEffectiveWeight(0);
      r.walk.timeScale = speed / r.kind.speed || 1;
      r.mixer.update(dt);
      continue;
    }
    if (r.state === 'evac') {
      // 山へ駆けていく（カットの間だけ。壁は気にしない）
      let speed = 0;
      if ((r.evacDelay -= dt) <= 0) {
        _rd.subVectors(r.evac, pos).setY(0);
        const dist = _rd.length();
        r.root.rotation.y = turnToward(r.root.rotation.y, Math.atan2(_rd.x, _rd.z), 1 - Math.exp(-8 * dt));
        speed = Math.min((r.leaving ? MAYOR_WALK * 1.4 : EVAC_SPEED * (0.85 + 0.15 * r.kind.speed / 0.5)), dist / Math.max(dt, 1e-3));
        pos.addScaledVector(_rd.divideScalar(dist || 1), speed * dt);
        const gy = introGroundY(pos.x, pos.z, pos.y);
        pos.y += (gy - pos.y) * (1 - Math.exp(-12 * dt));
        if (r.leaving && dist < 0.5) {
          if (r.id === '1-1' && townCollapsed) { toHill(r); continue; }
          r.leaving = false; r.state = 'gone'; r.root.visible = false; continue;
        }
      }
      r.walkWeight += ((speed > 0.01 ? 1 : 0) - r.walkWeight) * (1 - Math.exp(-8 * dt));
      r.walk.setEffectiveWeight(r.walkWeight);
      r.idle.setEffectiveWeight(1 - r.walkWeight);
      if (r.talkA) r.talkA.setEffectiveWeight(0);
      r.walk.timeScale = r.leaving ? 1.4 : 2.2;
      r.mixer.update(dt);
      continue;
    }
    updateHouse(r);
    if (r.state === 'home') continue;
    // 食べに行っていたパンが消えたらあきらめる
    if (r.bread && r.state !== 'eat' && r.bread.state !== 'rest') { r.bread.claimedBy = null; r.bread = null; r.state = 'idle'; r.wait = 1; }
    if (!r.bread && r.state !== 'eat' && r.state !== 'talk' && r.state !== 'route') {
      const b = findBread(r);
      if (b) { r.bread = b; b.claimedBy = r; r.state = 'toBread'; r.stuck = 0; r.walkTime = 0; }
    }

    let speed = 0;
    if (r.state === 'talk') {
      // 話している間は立ち止まって、ロボのほうを向く
      const want = Math.atan2(feet.x - pos.x, feet.z - pos.z);
      r.root.rotation.y = turnToward(r.root.rotation.y, want, 1 - Math.exp(-RES_TURN * dt));
    } else if (r.state === 'route') {
      // 決まった道を歩く（家へ帰る、家から出てくる）。ふさがれて進めないときは、そのまま着いたことにする
      const wp = r.route[r.leg];
      _rd.subVectors(wp, pos).setY(0);
      const dist = _rd.length();
      let arrived = (r.walkTime += dt) > 90 || r.stuck > 3;
      if (dist < 0.2 && ++r.leg >= r.route.length) arrived = true;
      if (arrived) {
        r.route = null;
        if (r.afterRoute === 'home') enterHouse(r);
        else { r.state = 'idle'; r.wait = 1; }
        r.afterRoute = null;
        if (r.state === 'home') continue;
      } else if (dist >= 0.2) {
        const want = Math.atan2(_rd.x, _rd.z);
        r.root.rotation.y = turnToward(r.root.rotation.y, want, 1 - Math.exp(-RES_TURN * dt));
        const facing = Math.cos(want - r.root.rotation.y);
        speed = r.kind.speed * RES_HOME_HURRY * Math.max(0, facing);
        const step = Math.min(speed * dt, dist);
        const nx = pos.x + Math.sin(r.root.rotation.y) * step, nz = pos.z + Math.cos(r.root.rotation.y) * step;
        _rm.set(nx, pos.y, nz);
        const gy = groundBelow(_rm);
        // 下りは少し高い段（植木の縁などに乗ってしまったとき）でも降りられる
        if (gy !== null && gy - pos.y < RES_STEP && pos.y - gy < 0.8) pos.set(nx, gy, nz);
        else { r.stuck += dt; speed = 0; }
      }
    } else if (r.state === 'idle' && r.kind.stay) {
      // 店先に立ったまま。押されてずれたら戻り、立つ向きに向き直る
      if ((r.wait -= dt) <= 0 && Math.hypot(r.home.x - pos.x, r.home.z - pos.z) > 0.3) {
        r.target.set(r.home.x, pos.y, r.home.z);
        r.state = 'walk'; r.walkTime = 0;
      } else if (r.standFace !== null) r.root.rotation.y = turnToward(r.root.rotation.y, r.standFace, 1 - Math.exp(-RES_TURN * 0.5 * dt));
    } else if (r.state === 'idle') {
      if ((r.wait -= dt) <= 0 && r.think && !r.oneShot && Math.random() < r.kind.think) {
        r.think.reset().play();
        r.oneShot = r.think;
        r.wait = r.think.getClip().duration + 1;
      } else if (r.wait <= 0 && !r.oneShot) {
        const a = Math.random() * Math.PI * 2, d = r.roam * Math.sqrt(Math.random());
        r.target.set(r.home.x + Math.cos(a) * d, pos.y, r.home.z + Math.sin(a) * d);
        if (canWalkTo(pos, r.target)) { r.state = 'walk'; r.walkTime = 0; }
        else r.wait = 0.3;
      }
    } else if (r.state === 'walk' || r.state === 'toBread') {
      if (r.state === 'toBread') r.target.set(r.bread.root.position.x, pos.y, r.bread.root.position.z);
      _rd.subVectors(r.target, pos).setY(0);
      const dist = _rd.length();
      const stop = r.state === 'toBread' ? RES_REACH : 0.15;
      // ロボなどにふさがれて着かないときは、あきらめる
      if ((r.walkTime += dt) > 15) {
        if (r.bread) { r.ignore = r.bread; r.bread.claimedBy = null; r.bread = null; }
        r.state = 'idle';
        r.wait = 1;
        continue;
      }
      if (dist <= stop + 0.02) {
        if (r.state === 'toBread') { r.state = 'eat'; r.wait = 0.8; }
        else { r.state = 'idle'; r.wait = RES_IDLE[0] + Math.random() * (RES_IDLE[1] - RES_IDLE[0]); }
      } else {
        const want = Math.atan2(_rd.x, _rd.z);
        r.root.rotation.y = turnToward(r.root.rotation.y, want, 1 - Math.exp(-RES_TURN * dt));
        // 向きがそろってから歩き出す
        const facing = Math.cos(want - r.root.rotation.y);
        speed = r.kind.speed * (r.state === 'toBread' ? RES_HURRY : 1) * Math.max(0, facing);
        const step = Math.min(speed * dt, dist - stop);
        const nx = pos.x + Math.sin(r.root.rotation.y) * step, nz = pos.z + Math.cos(r.root.rotation.y) * step;
        _rm.set(nx, pos.y, nz);
        const gy = groundBelow(_rm);
        if (gy !== null && Math.abs(gy - pos.y) < RES_STEP) pos.set(nx, gy, nz);
        else if (r.state === 'walk') { r.state = 'idle'; r.wait = 0.5; }   // 段差や壁の手前で止まる
        else if ((r.stuck += dt) > 2) {
          // パンへの道がふさがっていたら、そのパンはあきらめる
          r.ignore = r.bread;
          r.bread.claimedBy = null;
          r.bread = null;
          r.state = 'idle';
          r.wait = 1;
        }
      }
    } else if (r.state === 'eat') {
      // パンを口もとへ寄せ（大きさも元の 0.3m に戻す）、Eat と「食べられる」を同時に再生する
      const b = r.bread;
      if (b.state === 'rest') {
        const want = Math.atan2(b.root.position.x - pos.x, b.root.position.z - pos.z);
        r.root.rotation.y = turnToward(r.root.rotation.y, want, 1 - Math.exp(-RES_TURN * dt));
        _rm.copy(r.kind.eatPos).applyAxisAngle(UP, r.root.rotation.y).add(pos);
        const k = 1 - Math.exp(-5 * dt);
        b.root.position.lerp(_rm, k);
        b.root.scale.setScalar(THREE.MathUtils.lerp(b.root.scale.x, 1, k));
        if ((r.wait -= dt) <= 0) {
          b.root.position.copy(_rm);
          b.root.scale.setScalar(1);
          eatBread(b, pos);
          if (r.eat) { r.eat.reset().play(); r.oneShot = r.eat; }
          r.fed = true;
          r.hungry = false;
          if (!r.kind.smileAt) setFace(r, 'smile');   // 女の子は Eat の途中で笑顔になる
          r.wait = EAT_TIME + 0.5;
        }
      } else if ((r.wait -= dt) <= 0 && !r.oneShot) {   // Joy で喜んでいる間も待つ
        b.claimedBy = null;
        r.bread = null;
        r.state = 'idle';
        r.wait = RES_IDLE[0];
      }
    }

    const walking = speed > 0.01;
    r.walkWeight += ((walking ? 1 : 0) - r.walkWeight) * (1 - Math.exp(-8 * dt));
    if (r.talkA) r.talkWeight += ((r.state === 'talk' ? 1 : 0) - r.talkWeight) * (1 - Math.exp(-6 * dt));
    r.walk.setEffectiveWeight(r.oneShot ? 0 : r.walkWeight);
    r.idle.setEffectiveWeight(r.oneShot ? 0 : (1 - r.walkWeight) * (1 - r.talkWeight));
    if (r.talkA) r.talkA.setEffectiveWeight(r.oneShot ? 0 : (1 - r.walkWeight) * r.talkWeight);
    r.walk.timeScale = walking ? speed / r.kind.speed : 1;
    // Eat で顔を上げる所から笑顔
    if (r.kind.smileAt && r.eat && r.oneShot === r.eat && r.eat.time >= r.kind.smileAt / ANIM_FPS) setFace(r, 'smile');
    r.mixer.update(dt);
  }
}

// ---- 人の当たり判定（縦の円柱） ----
// ロボと人：ロボのほうが重いので人を押しのける。押した先が壁や段差なら、ロボのほうが止まる
// 人と人：半分ずつよけ合う
function tryNudge(r, dx, dz) {
  const pos = r.root.position;
  const len = Math.hypot(dx, dz);
  if (len < 1e-5) return true;
  _rd.set(dx / len, 0, dz / len);
  _o.set(pos.x, pos.y + 0.5, pos.z);
  const wall = cast(_o, _rd, len + r.radius);
  if (wall && hitNormal(wall, _rd)) return false;
  _rm.set(pos.x + dx, pos.y, pos.z + dz);
  const gy = groundBelow(_rm);
  if (gy === null || Math.abs(gy - pos.y) >= RES_STEP || waterLevel(_rm, gy)) return false;
  pos.set(_rm.x, gy, _rm.z);
  return true;
}
const _push = new THREE.Vector3();
function collidePeople(active) {
  for (let i = 0; i < residents.length; i++) {
    const a = residents[i], pa = a.root.position;
    if (!a.root.visible) continue;   // 家の中
    for (let j = i + 1; j < residents.length; j++) {
      const b = residents[j], pb = b.root.position;
      if (!b.root.visible) continue;
      let dx = pb.x - pa.x, dz = pb.z - pa.z;
      const d = Math.hypot(dx, dz), overlap = a.radius + b.radius - d;
      if (overlap <= 0 || Math.abs(pa.y - pb.y) > 1) continue;
      if (d < 1e-4) { dx = 1; dz = 0; } else { dx /= d; dz /= d; }
      const h = overlap / 2;
      if (!tryNudge(b, dx * h, dz * h)) tryNudge(a, -dx * overlap, -dz * overlap);
      else tryNudge(a, -dx * h, -dz * h);
    }
  }
  if (!active) return;
  for (const r of residents) {
    const pos = r.root.position;
    if (!r.root.visible) continue;
    if (feet.y > pos.y + r.height || feet.y + ROBOT_HEIGHT < pos.y) continue;   // 頭の上を飛び越える
    let dx = pos.x - feet.x, dz = pos.z - feet.z;
    const d = Math.hypot(dx, dz), overlap = RADIUS + r.radius - d;
    if (overlap <= 0) continue;
    if (d < 1e-4) { dx = Math.sin(heading); dz = Math.cos(heading); } else { dx /= d; dz /= d; }
    if (!tryNudge(r, dx * overlap, dz * overlap)) nudgePlayer(-dx * overlap, -dz * overlap);
  }
}
// 飛んでいるパンが人に当たったら、その人が受け止めて食べる（食べている最中なら、その場に浮かぶ）
function catchBread(b) {
  const p = b.root.position, br = 0.15 * b.root.scale.x;
  for (const r of residents) {
    const pos = r.root.position;
    if (!r.root.visible || !r.eat) continue;   // 町長はパンを受け止めない
    let dx = p.x - pos.x, dz = p.z - pos.z;
    const d = Math.hypot(dx, dz);
    if (d > r.radius + br || p.y < pos.y - br || p.y > pos.y + r.height + br) continue;
    if (d > 1e-4) { dx /= d; dz /= d; } else { dx = Math.sin(r.root.rotation.y); dz = Math.cos(r.root.rotation.y); }
    p.x = pos.x + dx * (r.radius + br);
    p.z = pos.z + dz * (r.radius + br);
    b.state = 'rest';
    b.time = 0;
    if (r.state !== 'eat') {
      if (r.bread) r.bread.claimedBy = null;
      r.bread = b;
      b.claimedBy = r;
      r.state = 'eat';
      r.wait = 0.8;
    }
    return true;
  }
  return false;
}

async function init() {
  const talksLoaded = loadTalks();   // 模型と同時に読む
  preloadPortraits();
  const [town, distant, pancannon, germboss, bread, grandpa, girl, grandma, townRuin, mayor, germmini, workshop, chief, baker, sludgeboss, rockboss, choco, chocoTankGltf, yeastGltf, yeastCannonGltf, mechaWreck] = await Promise.all(FILES.map(load));
  await talksLoaded;
  statusEl.textContent = 'シーンを組み立て中…';
  await new Promise((r) => setTimeout(r, 0));

  windmill = takeWindmillRotor(town.scene);
  scene.add(windmill);
  const townMats = setupRuin(town.scene, townRuin.scene);
  if (COLLAPSED) for (const a of ruinAreas) { a.ruin.visible = false; a.ruinSolid = []; }
  const townMerged = mergeByMaterial(town.scene);
  const distantMerged = mergeByMaterial(distant.scene, { castShadow: false });
  // 遠景は影を落とさない（広い地形が重いため）が、町の南の畑の納屋・干し草・かかし・柵・橋は落とす
  for (const m of distantMerged.children) {
    if (/^EXP_FW_(wood|roof|hay|cloth)$/.test(m.material.name)) m.castShadow = true;
  }
  for (const g of [townMerged, distantMerged]) {
    for (const m of g.children) {
      fixUnexportedColor(m.material);
      if (isWater(m.material)) { makeWater(m.material); m.castShadow = false; }
    }
  }
  for (const m of townMats.values()) addRuinTint(m);
  scene.add(townMerged, distantMerged);
  townGroup = townMerged;
  distantGroup = distantMerged;
  buildCollider([townMerged, distantMerged], ruinAreas.flatMap((a) => a.hidden.children), stallBlocks(town.scene));
  rebuildRuinCollider();
  setupFoam(town.scene, townMerged);
  setupRetreatLine([townMerged, distantMerged]);

  // 既定シーン（PanCannon）のみ。glb 内の Bakery シーンは distant の重複なので使わない
  model = pancannon.scene;
  model.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  player.add(model);
  scene.add(player);
  mixer = new THREE.AnimationMixer(model);
  setupAnimations(pancannon.animations);
  setupPilot();
  bossModels = [prepareBoss(germboss, BOSSES[0]), prepareBoss(sludgeboss, BOSSES[1]), prepareBoss(rockboss, BOSSES[2])];
  useBoss(0);
  setupBread(bread);
  placeResidents({ grandpa, girl, grandma, mayor, baker, chief });
  setupDoor();
  setupGerms(germmini);   // 町人のそばに置くので、町人のあと
  setupProgress();        // 区画ごとの小バイ菌と町人を数える（足りない区画には小バイ菌を足す）

  // 夜にふわおのまわりを照らすランプ（昼は明るさ 0。ライトの数が変わると全部のシェーダーを作り直すので、出しっぱなしにする）
  const lamp = new THREE.PointLight(lin(1.0, 0.72, 0.42), 0, 14, 2);
  lamp.position.copy(LAMP_POS);
  player.add(lamp);
  playerLamp = lamp;
  setupOpening(workshop, mayor, chief);
  setupChoco(choco, chocoTankGltf);
  setupYeast(yeastGltf, yeastCannonGltf);
  setupWreckModel(mechaWreck);
  setupPresent();   // 待たない（モデルがなくても、ゲームは始められる）
  // 夜に明るくする窓と街灯（廃墟の崩れた家の窓も含む）
  const glowMats = new Set();
  scene.traverse((o) => { if (o.isMesh && /BK_glass/.test(o.material.name)) glowMats.add(o.material); });
  // ?time=18.5 のように始まりの時刻を指定できる（ないときは 14 時）
  const startHour = parseFloat(new URLSearchParams(location.search).get('time'));
  daytime = createDaytime({
    sun, lightDir, sunDir, fill, hemi, scene, style, lamp, glowMats: [...glowMats],
    startHour: Number.isFinite(startHour) ? startHour : undefined,
  });

  style.set(new URLSearchParams(location.search).get('style') !== 'pbr');
  respawn();
  tick(0, true);
  renderer.compile(scene, camera);
  // ?skip のときはオープニングを飛ばして町から始める
  if (new URLSearchParams(location.search).has('skip')) endOpening();
  else { opening = { phase: 'wait', t: 0, line: null }; updateOpening(0, false); }
  statusEl.textContent = '';
  document.getElementById('progress').style.display = 'none';
  ready = true;
  showTitleMenu();
  setupDebugStart();
}

// ---- 進み具合の保存（ブラウザの localStorage） ----
// 節目（区画が戻った・ボスを追い出した・道具をもらった・工房から出た・ボスが現れた）と 30 秒ごと、タブを閉じるときに保存する。
// 出現シーン・撤退・工房の中・オープニングの間は保存しない（つづきは、その前の状態から）。
// つづきは、いつもパン工房の扉の前から始める（位置は保存しない）。
// naogare-lab のゲームはみな同じオリジンなので、キーは fuwao3d: で始める。?debug のときは別のキーにして、遊んでいるデータを上書きしない
const SAVE_KEY = new URLSearchParams(location.search).has('debug') ? 'fuwao3d:save:debug' : 'fuwao3d:save';
const SAVE_VERSION = 1;
const SAVE_EVERY = 30;          // 自動保存の間（秒）
let saveWait = SAVE_EVERY, savingOn = false;
function readSave() {
  try {
    const d = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    return d && d.v === SAVE_VERSION ? d : null;
  } catch { return null; }
}
function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch { /* 保存できない環境 */ } }
function talkIndex(r, t) {
  for (const key of [r.id, r.kindName, 'revive']) {   // revive は工場長が焼き直しのあとに話すセリフ
    const i = TALKS[key]?.talks?.indexOf(t);
    if (i >= 0) return [key, i];
  }
  return null;
}
function saveGame() {
  if (!savingOn || opening || visit || bossIntro || retreat || knockout || collapse || finale) return false;
  const d = {
    v: SAVE_VERSION, at: Date.now(),
    stage: storyStage, boss: bossIndex, bossAppeared, bossGone,
    bossPos: boss ? [+boss.position.x.toFixed(2), +boss.position.z.toFixed(2)] : null,
    items: [...items], mayorWarned, fuelMax, fuel: +fuel.toFixed(3), body: +body.toFixed(3), gen: fuwaoNo, hour: +daytime.hour.toFixed(3),
    areas: areaGauge.map((g) => ({ called: g.called, done: g.done, gone: g.germs.map((x) => (germGone(x) ? 1 : 0)),
      spots: g.spots.map((p) => [+p.x.toFixed(2), +p.z.toFixed(2)]) })),
    residents: Object.fromEntries(residents.map((r) => [r.id, {
      fed: !!r.fed, hungry: !!r.hungry,
      once: [...(r.talked || [])].filter((t) => t.once).map((t) => talkIndex(r, t)).filter(Boolean),
    }])),
  };
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(d)); return true; } catch { return false; }
}
function updateSave(dt, active) {
  if (active && (saveWait -= dt) <= 0) { saveWait = SAVE_EVERY; saveGame(); }
}
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveGame(); });
window.addEventListener('pagehide', () => saveGame());
// 保存したデータで町を組み立て直す（「つづきから」。オープニングは飛ばす）
function loadGame(d) {
  storyStage = d.stage;
  if (bossModels[d.boss]) useBoss(d.boss);
  if (d.bossGone) bossGone = true;
  else if (d.bossAppeared) {
    // ボスが町に来ている途中だった：出現シーンなしで、その場所に出す
    if (d.bossPos) { boss.position.x = d.bossPos[0]; boss.position.z = d.bossPos[1]; boss.position.y = introGroundY(d.bossPos[0], d.bossPos[1], boss.position.y); }
    boss.rotation.y = Math.atan2(BOSS_TARGET.x - boss.position.x, BOSS_TARGET.z - boss.position.z);
    boss.visible = true;
    bossAppeared = true;
    if (retreatLine && !bossCfg.hard) retreatLine.visible = true;
  }
  for (const k of d.items || []) if (k in ITEMS) items.add(k);
  mayorWarned = !!d.mayorWarned;
  if (items.has('choco')) chocoTank.visible = true;
  if (items.has('yeast')) applyYeast();
  if (items.has('present')) applyPresent();
  if (d.fuelMax) fuelMax = d.fuelMax;
  fuel = Math.min(fuelMax, d.fuel ?? fuelMax);
  body = d.body ?? 1;
  fuwaoNo = Math.max(1, d.gen | 0);
  if (Number.isFinite(d.hour)) daytime.set(d.hour);
  (d.areas || []).forEach((a, i) => {
    const g = areaGauge[i];
    if (!g) return;
    if (Array.isArray(a.spots) && a.spots.length) g.spots = a.spots.map(([x, z]) => ({ x, z }));   // セーブした出る場所
    g.called = !!a.called;
    if (g.called) {
      g.spots.forEach((p, k) => {
        if (a.gone?.[k]) { g.germs.push({ spot: p, area: i, state: 'defeat', done: true }); return; }   // 倒したもの（目には見えない）
        const x = spawnGerm(p.x, p.z);
        x.area = i;
        x.spot = p;
        g.germs.push(x);
      });
      if (g.germs.some((x) => !germGone(x)) && helps.length < HELP_MAX) addHelp(i);
    }
    if (a.done) { g.done = true; restoreArea(ruinAreas[i].name); }
  });
  updateRuin(1e3);   // 元に戻った区画は、すぐに戻った見た目に
  for (const r of residents) {
    const x = d.residents?.[r.id];
    if (!x) continue;
    r.fed = !!x.fed;
    if (r.eat && (x.hungry || !r.fed)) setHungry(r);
    else {
      r.hungry = false;
      setFace(r, 'smile');
      if (r.idle === r.hungryIdle) { r.idle.stop(); r.idle = r.mixer.clipAction(r.baseIdleClip).play(); }
    }
    r.talked = new Set();
    for (const [key, i] of x.once || []) { const t = TALKS[key]?.talks?.[i]; if (t) r.talked.add(t); }
  }
  respawn();
}

// ---- オープニング（パン工房の中で、ロボに乗っていないふわおと町長が話す） ----
// スタートを押すと、まずパン工房の中（workshop.glb）の全体を見せてから、台本 TALKS.opening の会話になる。
// せりふの who（mayor / fuwao）で、吹き出しとカメラがその人に向く。話し終わったら暗転して町（ロボに乗った状態）へ。
// 部屋は町とは別の場所（WORKSHOP_POS、町の地面のずっと下）に置き、終わったら片づける。
// 明かりは夜用のランプを部屋の天井へ移して使う（ライトを増やすと、町の全部のシェーダーを作り直すことになるため）。
// ?skip で飛ばせる
// オープニングのせりふに人物画をつける（who が町長・工場長のとき。表情は face、省略すると喜）
function openingScript() {
  return { ...TALKS.opening, lines: TALKS.opening.lines.map((l) => ({ ...l, portrait: portraitSrc(l.who, l.face) })) };
}
const WORKSHOP_POS = new THREE.Vector3(0, -400, 0);
const LAMP_POS = new THREE.Vector3(0, 2.6, 0.5);   // ふだんのランプの位置（ロボの上）
const OPENING_FOV = 40;         // 部屋の中のカメラの画角（メモの目安）
const OPENING_INTRO = 3.8;      // 入口から部屋の全体を見せて、町長へ寄っていき、話し始めるまで（秒）
const OPENING_HOLD = 0.7;       // そのうち、入口からの全体のまま止まっている時間（秒）
const OPENING_WIDE_FOV = 62;    // 入口から全体を見るときの画角
const MECHA_SPOT = [0, -2.0];   // 用意されたメカを置く場所（展示台の奥、窯と窯のあいだ。入口からの全体でも正面の奥に見える）
const OPENING_LAMP = 30;        // 部屋の天井へ移したランプの明るさ
const FUWAO_HOP = 0.45;          // 飛び跳ねる高さ（m）
const FUWAO_HOP_RATE = 7;        // 飛び跳ねる速さ（π / これ 秒で 1 回）
const FADE_TIME = 0.6;          // 暗転の長さ（秒）
let opening = null;
let playerLamp = null;
let room = null, roomMayor = null, roomMayorMixer = null, roomMayorThink = null, roomFuwao = null;
let roomChief = null, roomChiefMixer = null, roomChiefActs = {}, roomChiefNow = null;
let roomMecha = null;
let openingFov = OPENING_FOV;
const _oc2 = new THREE.Vector3(), _ot2 = new THREE.Vector3();
const _oc = new THREE.Vector3(), _ot = new THREE.Vector3(), _oq = new THREE.Quaternion();
const fadeEl = document.getElementById('fade');
function setupOpening(workshopGltf, mayorGltf, chiefGltf) {
  room = workshopGltf.scene;
  room.position.copy(WORKSHOP_POS);
  room.traverse((o) => {
    if (!o.isMesh) return;
    const shaft = o.material.transparent;   // 天窓からの光の筒（半透明）は影を作らない
    o.castShadow = !shaft;
    o.receiveShadow = !shaft;
  });
  scene.add(room);
  room.updateMatrixWorld(true);

  // 町長：目印の位置に立って、ふわおのほうを向く
  roomMayor = cloneSkinned(mayorGltf.scene);
  roomMayor.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; } });
  const mark = room.getObjectByName('WI_NPC_Mayor');
  mark.getWorldPosition(roomMayor.position);
  scene.add(roomMayor);
  roomMayorMixer = new THREE.AnimationMixer(roomMayor);
  const clip = (name) => THREE.AnimationClip.findByName(mayorGltf.animations, name);
  roomMayorMixer.clipAction(clip('Idle')).play();
  if (clip('Think')) {
    roomMayorThink = roomMayorMixer.clipAction(clip('Think'));
    roomMayorThink.setLoop(THREE.LoopOnce, 1);
    roomMayorThink.clampWhenFinished = true;
    roomMayorMixer.addEventListener('finished', (e) => { if (e.action === roomMayorThink) roomMayorThink.stop(); });
  }

  // ふわお：ロボの操縦席にいる MP_Rig（体・目・ほっぺ・口）だけを取り出して、町長の正面の作業台の上（WI_Stand_Top）に乗せる。
  // MP_Rig の原点は体の底なので、目印の高さがそのまま天板の上になる
  roomFuwao = new THREE.Group();
  const body = model.getObjectByName('MP_Rig').clone(true);
  body.position.set(0, 0, 0);
  body.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  roomFuwao.add(body);
  room.getObjectByName('WI_Stand_Top').getWorldPosition(roomFuwao.position);
  roomFuwao.userData.baseY = roomFuwao.position.y;
  roomFuwao.rotation.y = Math.atan2(roomMayor.position.x - roomFuwao.position.x, roomMayor.position.z - roomFuwao.position.z);
  roomMayor.rotation.y = roomFuwao.rotation.y + Math.PI;
  scene.add(roomFuwao);

  // 工場長：左の窯の前（WI_NPC_Chief）に、目印の向きのまま立つ。ふだんは腕を組んで Idle、
  // 台本で who: 'chief' のせりふのあいだは Talk（anim: 'laugh' なら Laugh）
  chiefAnims = chiefGltf.animations;
  roomChief = cloneSkinned(chiefGltf.scene);
  roomChief.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; } });
  const chiefMark = room.getObjectByName('WI_NPC_Chief');
  chiefMark.getWorldPosition(roomChief.position);
  chiefMark.getWorldQuaternion(roomChief.quaternion);
  scene.add(roomChief);
  roomChiefMixer = new THREE.AnimationMixer(roomChief);
  for (const name of ['Idle', 'Talk', 'Laugh']) {
    const c = THREE.AnimationClip.findByName(chiefGltf.animations, name);
    if (c) roomChiefActs[name] = roomChiefMixer.clipAction(c);
  }
  roomChiefNow = roomChiefActs.Idle;
  roomChiefNow.play();

  // 町のみんなと工場長が用意したメカ：ふわおが乗っていない、からっぽのロボを、作業台のふわおのほうへ向けて置く
  roomMecha = model.clone(true);
  roomMecha.traverse((o) => {
    if (/^(MP_|FX_)/.test(o.name)) o.visible = false;   // ふわお本人と、噴射の炎・煙は出さない
    if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; }
  });
  roomMecha.position.set(MECHA_SPOT[0], 0, MECHA_SPOT[1]).add(WORKSHOP_POS);
  roomMecha.rotation.y = Math.atan2(roomFuwao.position.x - roomMecha.position.x, roomFuwao.position.z - roomMecha.position.z);
  scene.add(roomMecha);
}
function chiefPlay(name) {
  const next = roomChiefActs[name] || roomChiefActs.Idle;
  if (next === roomChiefNow) return;
  next.reset().play();
  roomChiefNow.crossFadeTo(next, 0.3, false);
  roomChiefNow = next;
}
// カメラ：WI_Cam_<名前> の位置から WI_Cam_<名前>_Target を見る。ふわおが話すときは町長の肩ごしに
function openingShot(who, jump, shot) {
  openingFov = OPENING_FOV;
  // メカの紹介：メカの斜め前（左側）から、少し見下ろして大きく（手前の展示台がかぶらない角度）
  if (shot === 'mecha') {
    _ot.set(Math.sin(roomMecha.rotation.y), 0, Math.cos(roomMecha.rotation.y));
    _oc.copy(roomMecha.position).addScaledVector(_ot, 0.9);
    _oc.x -= _ot.z * 3.3; _oc.z += _ot.x * 3.3;
    _oc.y = roomMecha.position.y + 1.8;
    _ot.copy(roomMecha.position);
    _ot.y += 1.0;
    return;
  }
  // 最後：右の手前から引いて、メカと作業台のふわおと町長を一緒に
  if (shot === 'final') {
    _ot.copy(roomMecha.position).add(roomFuwao.position).multiplyScalar(0.5);
    _oc.set(3.9, 2.1, 4.3).add(WORKSHOP_POS);
    _ot.y = WORKSHOP_POS.y + 0.85;
    openingFov = 50;
    return;
  }
  // 飛び跳ねるときは、横から少し引いて、ふわおと町長を両方入れる
  if (who === 'fuwao' && jump) {
    _ot.subVectors(roomFuwao.position, roomMayor.position).setY(0).normalize();
    const mx = (roomFuwao.position.x + roomMayor.position.x) / 2, mz = (roomFuwao.position.z + roomMayor.position.z) / 2;
    _oc.set(mx + _ot.z * 3.4 + _ot.x * 0.5, roomMayor.position.y + 1.35, mz - _ot.x * 3.4 + _ot.z * 0.5);
    _ot.set(mx + _ot.x * 0.3, roomMayor.position.y + 1.05, mz + _ot.z * 0.3);
    return;
  }
  if (who === 'fuwao') {
    _ot.subVectors(roomFuwao.position, roomMayor.position).setY(0).normalize();
    _oc.copy(roomMayor.position).addScaledVector(_ot, -1.1);
    _oc.x += _ot.z * 0.95; _oc.z -= _ot.x * 0.95;   // 町長の右肩の外から
    _oc.y = roomMayor.position.y + 1.45;
    _ot.copy(roomFuwao.position);
    _ot.y = roomFuwao.userData.baseY - 0.1;
    return;
  }
  const name = who === 'mayor' ? 'Mayor' : who === 'chief' ? 'Chief' : 'Overview';
  room.getObjectByName(`WI_Cam_${name}`).getWorldPosition(_oc);
  room.getObjectByName(`WI_Cam_${name}_Target`).getWorldPosition(_ot);
}
function openingHead(who) {
  _sp.copy(who === 'fuwao' ? roomFuwao.position : who === 'chief' ? roomChief.position : roomMayor.position);
  _sp.y += who === 'fuwao' ? 0.35 : who === 'chief' ? 1.75 : 1.85;
  _sp.project(camera);
  const x = (_sp.x + 1) / 2 * window.innerWidth, y = (1 - _sp.y) / 2 * window.innerHeight;
  return { x, y, visible: _sp.z < 1 && x > 0 && x < window.innerWidth && y > 0 && y < window.innerHeight };
}
function updateOpening(dt, active) {
  const o = opening;
  o.t += dt;
  document.body.classList.add('opening');
  // 明かりとカメラを部屋に
  if (playerLamp.parent !== room) { room.add(playerLamp); playerLamp.position.set(0, 4, 0.5); }
  playerLamp.intensity = OPENING_LAMP;

  if (active && o.phase === 'wait') { o.phase = 'intro'; o.t = 0; }
  if (o.phase === 'intro' && o.t > OPENING_INTRO) { o.phase = 'talk'; talk.open(openingScript()); }
  const line = talk.active ? talk.line : null;
  const who = line && typeof line === 'object' ? line.who : null;
  // 町長が話し始めたら、あごに手を当てて考える
  if (line !== o.line) {
    o.line = line;
    o.lineT = 0;
    if (line) o.shotLine = line;   // 話し終わって暗転するあいだは、最後のせりふのカメラのまま
    if (who === 'mayor' && roomMayorThink) roomMayorThink.reset().play();
    chiefPlay(who !== 'chief' ? 'Idle' : line.anim === 'laugh' ? 'Laugh' : 'Talk');
  }
  if (o.phase === 'fadeout' && o.t > FADE_TIME) { endOpening(); return; }

  // ふわおは作業台の上で、ゆっくり呼吸するようにふくらむ（話している間は小さく弾む。
  // anim: 'jump' のせりふでは、天板の上でぴょんぴょん飛び跳ねる）
  o.lineT = (o.lineT || 0) + dt;
  const jumping = who === 'fuwao' && line.anim === 'jump';
  const hop = jumping ? Math.abs(Math.sin(o.lineT * FUWAO_HOP_RATE)) * FUWAO_HOP
    : who === 'fuwao' ? Math.abs(Math.sin(o.lineT * 9)) * 0.03 : 0;
  roomFuwao.position.y = roomFuwao.userData.baseY + hop;
  // 跳ねるときは、着地でつぶれて、上がるときに縦にのびる
  const h = hop / FUWAO_HOP;
  const squash = jumping ? 1 - 0.18 * Math.max(0, 1 - h * 4) + 0.08 * h : 1 + Math.sin(time.value * 2.2) * 0.025;
  roomFuwao.scale.set(1 / Math.sqrt(squash), squash, 1 / Math.sqrt(squash));
  roomMayorMixer.update(dt);
  roomChiefMixer.update(dt);

  const sl = o.phase === 'fadeout' ? o.shotLine : line;
  if (o.phase === 'talk' || (o.phase === 'fadeout' && sl)) {
    openingShot(sl?.who, jumping, sl?.shot);
  } else {
    // 入口から部屋の全体を広く見せ、少し止まってから、最初に話す町長のカメラへ寄っていく
    openingShot(null);
    _oc.y += 0.3;
    // 寄っている途中でスキップしたら、暗転するあいだはそこで止めておく
    const k = o.phase === 'intro' ? Math.min(1, Math.max(0, (o.t - OPENING_HOLD) / (OPENING_INTRO - OPENING_HOLD))) : (o.introK || 0);
    o.introK = k;
    const e = k * k * (3 - 2 * k);
    if (e > 0) {
      openingShot('mayor');
      _oc2.copy(_oc); _ot2.copy(_ot);
      openingShot(null);
      _oc.y += 0.3;
      _oc.lerp(_oc2, e); _ot.lerp(_ot2, e);
    }
    openingFov = OPENING_WIDE_FOV + (OPENING_FOV - OPENING_WIDE_FOV) * e;
  }
  if (camera.fov !== openingFov) { camera.fov = openingFov; camera.updateProjectionMatrix(); }
  camera.position.copy(_oc);
  camera.lookAt(_ot);
  sky.position.copy(camera.position);
  followShadow(room.position);
  if (talk.active) talk.update(dt, openingHead(who));
}
// ---- パン工房の中へ（扉に駆け込むと、場面が工房の中へ切り替わる） ----
// ステージ 3 までは、工場長は工房の中にいる（町が崩壊した CHIEF_OUT_STAGE から、外の扉の横に出てくる）。
// 扉の前の光る輪（WORKSHOP_FRONT）に入ると暗転して、工房の中（オープニングの部屋）へ。工場長と話し終わると、暗転して扉の前へ戻る。
// 工房の中では、燃料とからだが満タンになる
const CHIEF_OUT_STAGE = 4;
const DOOR_R = 1.1;             // 扉の前の輪の半径（m）。この中に入ると工房へ
const DOOR_ROBOT = [0, 2.7];    // 工房の中で、ロボが立つ場所（部屋の原点から。入口は +Z 側）
const VISIT_LOOK = 1.6;         // 入口から部屋の全体を見せてから、工場長へ寄るまで（秒）
let visit = null;               // { phase: 'in' | 'look' | 'talk' | 'out', t }
let doorArmed = true;           // 一度輪の外へ出るまでは、また入らない（工房から出てきた直後など）
let doorRing = null, doorIcon = null, chiefAnims = [];
const doorOpen = () => storyStage < CHIEF_OUT_STAGE;
// 黄色い光る輪（地面に置く）と、場所の名前の札（吹き出しの形。遠くからでも同じ大きさ）
function placeRing(r) {
  const ring = new THREE.Mesh(new THREE.RingGeometry(r * 0.72, r, 48),
    new THREE.MeshBasicMaterial({ color: 0xffd75e, transparent: true, opacity: 0.8, depthWrite: false, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2;
  ring.renderOrder = 2;
  scene.add(ring);
  return ring;
}
function placeSign(text) {
  const sign = new THREE.Sprite(new THREE.SpriteMaterial({ depthTest: false, depthWrite: false, sizeAttenuation: false }));
  sign.center.set(0.5, 0);
  sign.renderOrder = 997;
  sign.userData.noOutline = true;
  setSignText(sign, text);
  scene.add(sign);
  return sign;
}
// 札の文字を書きかえる（吹き出しの形の絵を作り直す）
function setSignText(sign, text) {
  const c = document.createElement('canvas');
  const x = c.getContext('2d');
  const font = 'bold 44px "Hiragino Maru Gothic ProN", "Yu Gothic UI", sans-serif';
  x.font = font;
  const w = Math.ceil(x.measureText(text).width) + 64, h = 112;
  c.width = w; c.height = h;
  x.fillStyle = '#ffd75e'; x.strokeStyle = '#3a2a1e'; x.lineWidth = 7; x.lineJoin = 'round';
  x.beginPath(); x.roundRect(8, 8, w - 16, 70, 20); x.moveTo(w / 2 - 16, 78); x.lineTo(w / 2, 104); x.lineTo(w / 2 + 16, 78); x.fill(); x.stroke();
  x.fillStyle = '#3a2a1e'; x.font = font; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, w / 2, 45);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  sign.material.map?.dispose();
  sign.material.map = tex;
  sign.material.needsUpdate = true;
  sign.scale.set(0.11 * w / h, 0.11, 1);
}
// 輪と札をゆらす（光が強くなったり弱くなったり、札は上下に）
function pulseMarker(ring, sign, y, signLift) {
  const t = time.value;
  ring.material.opacity = 0.55 + 0.3 * Math.sin(t * 4);
  ring.scale.setScalar(1 + 0.06 * Math.sin(t * 4));
  sign.position.y = y + signLift + Math.sin(t * 3) * 0.1;
}
// パン屋のお姉さん（話すと、からだを満タンにしてくれる）にも、輪と「パン屋」の札
const BAKER_RING_R = 0.9;
let bakerRing = null, bakerSign = null;
function setupBakerMarker() {
  bakerRing = placeRing(BAKER_RING_R);
  bakerSign = placeSign('パン屋');
}
function updateBakerMarker(active) {
  const r = residents.find((x) => x.id === '3-1');
  const show = !!r && r.root.visible && r.state !== 'gone' && r.state !== 'evac' && !townCollapsed;   // 避難のカットと、丘へ避難したあとは出さない
  bakerRing.visible = show;
  bakerSign.visible = show && active;
  if (!show) return;
  const p = r.root.position;
  bakerRing.position.set(p.x, p.y + 0.05, p.z);
  bakerSign.position.x = p.x; bakerSign.position.z = p.z;
  pulseMarker(bakerRing, bakerSign, p.y, r.height + 0.7);
}
// 避難した丘（町が崩壊したあと）にも、輪と「避難所」の札。札は山の向こうからでも見えるので、目印になる
const HILL_RING_R = 2.5;
let hillRing = null, hillSign = null, hillGround = null, hillSignDist = -1;
const HILL_SIGN_NEAR = 25;   // これより近いと、距離は出さない（m）
function updateHillMarker(active) {
  const show = townCollapsed && !finale;
  hillRing.visible = show;
  hillSign.visible = show && active;
  if (!show) return;
  const g = hillGround ||= groundPoint(MAYOR_HILL);   // 崩れた町を読み込んだあとに一度だけ調べる
  hillRing.position.set(g.x, g.y + 0.05, g.z + 2.5);   // 町長の少し町寄り
  hillSign.position.x = g.x; hillSign.position.z = g.z;
  pulseMarker(hillRing, hillSign, g.y, 4);
  const d = Math.hypot(feet.x - g.x, feet.z - g.z);
  const shown = d < HILL_SIGN_NEAR ? 0 : Math.round(d / 10) * 10;   // 10m ごと
  if (shown !== hillSignDist) { hillSignDist = shown; setSignText(hillSign, shown ? `避難所 ${shown}m` : '避難所'); }
}
function setupDoor() {
  const ground = groundPoint(WORKSHOP_FRONT);
  doorRing = placeRing(DOOR_R);
  doorRing.position.copy(ground).setY(ground.y + 0.05);
  // 扉の上の「パン工房」の札
  doorIcon = placeSign('パン工房');
  doorIcon.position.copy(ground).setY(ground.y + 3.4);
  setupBakerMarker();
  // 避難所の目印は、出すタイミングが決まるまで出さない
  // hillRing = placeRing(HILL_RING_R);
  // hillSign = placeSign('避難所');
}
function updateDoor(dt, active) {
  if (!doorRing) return;
  updateBakerMarker(active);
  // updateHillMarker(active);
  const open = doorOpen();
  doorRing.visible = open;
  doorIcon.visible = open && active;
  if (!open) return;
  pulseMarker(doorRing, doorIcon, doorRing.position.y, 3.4);
  const d = Math.hypot(feet.x - WORKSHOP_FRONT.x, feet.z - WORKSHOP_FRONT.z);
  if (d > DOOR_R + 0.6) doorArmed = true;
  if (active && doorArmed && d < DOOR_R && Math.abs(feet.y - doorRing.position.y) < 1.5
    && !talk.active && !bossIntro && !retreat && !knockout && !jetting) enterWorkshop();
}
// からだが 0 になったあと：真っ暗なまま工房の中へ入り、ゆっくり明るくする。工場長は焼き直しのセリフ（talks.json の revive）を話す
function reviveInWorkshop() {
  visit = { phase: 'in', t: FADE_TIME, revive: true };   // すぐに中を組み立てる（もう暗い）
  doorArmed = false;
  moveSpeed = 0;
  releaseAll();
  setFadeTime(KNOCK_FADE_IN);   // 外へ出るとき（leaveWorkshop）にふつうの長さへ戻す
  document.body.classList.add('visiting');
}
function enterWorkshop() {
  visit = { phase: 'in', t: 0 };
  doorArmed = false;
  jetting = false; jetEndTime = 0; jetSpeed = 0; jetVel.set(0, 0, 0); recoilVel.set(0, 0, 0); moveSpeed = 0;
  releaseAll();
  fadeEl.classList.add('on');
  document.body.classList.add('visiting');
}
// 暗転しているあいだに、工房の中を組み立てる
function setupVisitRoom() {
  scene.add(room, roomChief);
  roomChiefMixer = new THREE.AnimationMixer(roomChief);
  roomChiefActs = {};
  for (const name of ['Idle', 'Talk', 'Laugh']) {
    const c = THREE.AnimationClip.findByName(chiefAnims, name);
    if (c) roomChiefActs[name] = roomChiefMixer.clipAction(c);
  }
  roomChiefNow = roomChiefActs.Idle;
  roomChiefNow?.play();
  // ロボは入口の内側に立って、工場長のほうを向く
  player.position.set(DOOR_ROBOT[0], 0, DOOR_ROBOT[1]).add(WORKSHOP_POS);
  player.rotation.y = Math.atan2(roomChief.position.x - player.position.x, roomChief.position.z - player.position.z);
  model.visible = true;
  room.add(playerLamp);
  playerLamp.position.set(0, 4, 0.5);
  playerLamp.intensity = OPENING_LAMP;
  // 工房で補給（燃料だけ。からだはパン屋のお姉さんに話すと戻る）
  fuel = fuelMax;
  // 展示台の板チョコ（ステージ 1 をクリアしたら並ぶ。もらったらない）
  if (chocoShow) {
    chocoShow.position.set(0, 0, 0);
    chocoShow.scale.setScalar(1);
    chocoShow.visible = storyStage >= 2 && !items.has('choco');
  }
}
function leaveWorkshop() {
  setFadeTime(null);
  visit.phase = 'out';
  visit.t = 0;
  fadeEl.classList.add('on');
}
function endVisit() {
  scene.remove(room, roomChief);
  roomChiefMixer?.uncacheRoot(roomChief);
  player.add(playerLamp);
  playerLamp.position.copy(LAMP_POS);
  camera.fov = 70;
  camera.updateProjectionMatrix();
  respawn();   // 扉の前に出て、町のほうを向く
  const toast = visit.toast;
  visit = null;
  document.body.classList.remove('visiting');
  saveGame();   // 道具をもらったあとなど
  setTimeout(() => { fadeEl.classList.remove('on'); if (toast) showToast(toast); }, 200);
}
function startChocoEquip() {
  visit.phase = 'equip';
  visit.t = 0;
  visit.from = chocoShow.getWorldPosition(new THREE.Vector3());
  visit.done = false;
  chocoShow.parent.updateMatrixWorld(true);
  visit.inv = new THREE.Matrix4().copy(chocoShow.parent.matrixWorld).invert();
}
// 板チョコが展示台からメカの背中へ弧を描いて飛び、小さくなって消える → タンクが付いてキラキラ → 外へ
function updateChocoEquip(v) {
  chocoTank.getWorldPosition(_oc2);
  const u = Math.min(1, v.t / CHOCO_FLY), e = u * u * (3 - 2 * u);
  _ot2.lerpVectors(v.from, _oc2, e);
  _ot2.y += Math.sin(Math.PI * e) * 0.8;
  chocoShow.position.copy(_ot2).applyMatrix4(v.inv);   // 展示台のスロットの座標へ
  chocoShow.scale.setScalar(1 - 0.85 * e);
  chocoShow.visible = u < 1;
  if (!v.done && u >= 1) {
    v.done = true;
    applyChoco();
    sparkleBurst(_oc2, 26, 0.4);
    playSfx('equip');
    v.toast = GIFT_TOASTS.choco;   // 工場長の話と重ならないよう、外へ出てから出す（endVisit）
  }
  if (v.t >= CHOCO_EQUIP_END) startEquippedTalk(v);
}
// 取り付けが終わったら、工場長がひとこと言ってから外へ（talks.json の equipped）。話し終わると advanceTalk で外へ出る
function startEquippedTalk(v) {
  const book = TALKS.equipped, chief = residents.find((r) => r.id === '0-1');
  const t = book && chief && pickTalk(book.talks, chief);
  if (!t) { leaveWorkshop(); return; }
  (chief.talked ||= new Set()).add(t);
  chief.lastTalk = t;
  v.phase = 'talk';
  v.equipCam = false;   // カメラを工場長へ戻す
  talkRefill = talkGift = talkSummon = null;
  talk.open({
    name: t.name || book.name, portrait: null,
    lines: t.lines.map((l) => ({ text: typeof l === 'string' ? l : l.text, portrait: portraitSrc(book.portrait, (typeof l === 'object' && l.face) || t.face) })),
  });
}
function updateVisit(dt, active) {
  const v = visit;
  updateSparks(dt);
  if (!active) { if (v.phase !== 'in' && v.phase !== 'out') render(); return; }
  v.t += dt;
  if (v.phase === 'in') {
    if (v.t < FADE_TIME) return;
    setupVisitRoom();
    v.phase = 'look';
    v.t = 0;
    fadeEl.classList.remove('on');
  }
  if (v.phase === 'out' && v.t >= FADE_TIME) { endVisit(); return; }
  // 工場長と話す（ステージに合った話。固形化パンをくれる話などは talks.json の chief / 0-1）
  if (v.phase === 'look' && v.t > VISIT_LOOK) {
    const chief = residents.find((r) => r.id === '0-1');
    const script = v.revive ? reviveScript() : chief && talkScript(chief);
    if (!script) {
      if (v.revive) v.toast = 'パン工房で焼き直してもらった！';
      leaveWorkshop();
      return;
    }
    v.phase = 'talk';
    talkRefill = script.refill;
    talkGift = script.gift;
    talk.open(script);
  }
  if (v.phase === 'equip') updateChocoEquip(v);
  const talking = v.phase === 'talk' && talk.active;
  chiefPlay(talking ? 'Talk' : v.phase === 'equip' ? 'Laugh' : 'Idle');
  roomChiefMixer.update(dt);
  chocoMixer?.update(dt);
  render();
  if (talk.active) talk.update(dt, openingHead('chief'));
  function render() {
    // カメラ：入口から部屋の全体 → 工場長へ寄る（オープニングと同じカメラの目印）
    openingShot(null);
    _oc.y += 0.3;
    const k = v.phase === 'look' ? Math.min(1, v.t / VISIT_LOOK) : 1;
    const e = k * k * (3 - 2 * k);
    openingShot('chief');
    _oc2.copy(_oc); _ot2.copy(_ot);
    openingShot(null);
    _oc.y += 0.3;
    _oc.lerp(_oc2, e); _ot.lerp(_ot2, e);
    const fov = OPENING_WIDE_FOV + (OPENING_FOV - OPENING_WIDE_FOV) * e;
    if (v.phase === 'equip' || v.equipCam) {
      // 取り付け：メカの横の高い所から、背中のタンクを見下ろす（メカのすぐ後ろは入口の壁）
      v.equipCam = true;
      const h = player.rotation.y, fx = Math.sin(h), fz = Math.cos(h);
      _oc.set(fz * 2.4 - fx * 1.2, 2.2, -fx * 2.4 - fz * 1.2).add(player.position);
      _ot.set(-fx * 0.25, 1.15, -fz * 0.25).add(player.position);
    }
    if (camera.fov !== fov) { camera.fov = fov; camera.updateProjectionMatrix(); }
    camera.position.copy(_oc);
    camera.lookAt(_ot);
    sky.position.copy(camera.position);
    followShadow(room.position);
  }
}
// ---- 板チョコ（パワーアップ） ----
// 展示用の板チョコ（choco.glb）は工房の展示台の真ん中（WI_ItemSlot_1）に置く。ふわふわ浮いて揺れるアニメーション。
// もらうと、メカの背中にチョコ燃料タンク（choco_tank.glb）が付いて、燃料の最大が上がる
const CHOCO_FLY = 1.0;            // 展示台からメカの背中へ飛んでいく時間（秒）
const CHOCO_EQUIP_END = 2.6;      // 取り付けの場面の長さ（そのあと工房の外へ）
let chocoShow = null, chocoMixer = null, chocoTank = null;
function setupChoco(chocoGltf, tankGltf) {
  chocoShow = chocoGltf.scene;
  chocoShow.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  room.getObjectByName('WI_ItemSlot_1').add(chocoShow);
  chocoShow.visible = false;
  chocoMixer = new THREE.AnimationMixer(chocoShow);
  for (const c of chocoGltf.animations) chocoMixer.clipAction(c).play();
  chocoTank = tankGltf.scene.getObjectByName('CH_TankRoot');
  chocoTank.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  model.getObjectByName('PC_Rig_Body').add(chocoTank);
  chocoTank.position.set(0, 0.235, -0.45);
  chocoTank.rotation.set(0.2443, 0, 0);   // 上を少し体の方へ傾ける
  chocoTank.visible = false;
}
// ---- お城の女の子のプレゼント（作り中） ----
// 装備のモデルができたら PRESENT_MODEL に書くと、もらったときにメカに付く。null のあいだは、もらうだけで見た目は変わらない。
//   file：モデルのファイル、root：glb の中のメカに付けるノードの名前、parent：メカ（pancannon.glb）のどのノードの子にするか、
//   position / rotation：parent から見た位置と回転（Three.js の値。glb の root の位置・回転は使わない）
// 例: { file: 'models/xxx.glb', root: 'XX_Root', parent: 'PC_Rig_Body', position: [0, 0, 0], rotation: [0, 0, 0] }
// 動き（アニメーション）や、装備したときの効果（速くなる など）も、モデルができてからここに足す
const PRESENT_MODEL = null;
let presentObj = null;
async function setupPresent() {
  if (!PRESENT_MODEL) return;
  try {
    const gltf = await loader.loadAsync(PRESENT_MODEL.file);
    const obj = gltf.scene.getObjectByName(PRESENT_MODEL.root) || gltf.scene;
    obj.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
    model.getObjectByName(PRESENT_MODEL.parent || 'PC_Rig_Body').add(obj);
    obj.position.fromArray(PRESENT_MODEL.position || [0, 0, 0]);
    obj.rotation.fromArray(PRESENT_MODEL.rotation || [0, 0, 0]);
    presentObj = obj;
    presentObj.visible = items.has('present');   // セーブから続けたときは、読み込みが終わった時点で付ける
  } catch (e) {
    console.warn('プレゼントのモデルを読み込めませんでした', PRESENT_MODEL.file, e);
  }
}
// プレゼントをもらったとき（セーブから続けたときも）
function applyPresent() {
  if (presentObj) presentObj.visible = true;
}
// 板チョコの効果：タンクが付いて、燃料の最大が上がり、満タンになる
function applyChoco() {
  chocoTank.visible = true;
  if (fuelMax < CHOCO_FUEL_MAX) raiseFuelMax(CHOCO_FUEL_MAX - fuelMax);
  fuel = fuelMax;
}
// キラキラ星（取り付けた瞬間など）。画面の大きさは距離で変わる
let sparkTex = null;
const sparks = [];
const sparkGroup = new THREE.Group();   // 輪郭線を付けない（四角い板の線が出るため）
sparkGroup.userData.noOutline = true;
scene.add(sparkGroup);
function sparkleBurst(at, n = 18, size = 0.35) {
  if (!sparkTex) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,250,220,1)'); grad.addColorStop(0.25, 'rgba(255,214,90,0.9)'); grad.addColorStop(1, 'rgba(255,190,60,0)');
    g.fillStyle = grad;
    g.beginPath();
    for (let i = 0; i < 8; i++) {   // 4 本の光の筋がある星
      const a = i * Math.PI / 4, r = i % 2 ? 7 : 32;
      g.lineTo(32 + Math.cos(a) * r, 32 + Math.sin(a) * r);
    }
    g.closePath(); g.fill();
    sparkTex = new THREE.CanvasTexture(c);
    sparkTex.colorSpace = THREE.SRGBColorSpace;
  }
  for (let i = 0; i < n; i++) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: sparkTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    sp.position.copy(at);
    const a = Math.random() * Math.PI * 2, up = Math.random();
    sp.userData = { vel: new THREE.Vector3(Math.cos(a) * (0.6 + Math.random()), 0.6 + up * 1.6, Math.sin(a) * (0.6 + Math.random())), t: 0, life: 0.7 + Math.random() * 0.6, size: size * (0.5 + Math.random()), spin: (Math.random() - 0.5) * 6 };
    sp.renderOrder = 998;
    sparkGroup.add(sp);
    sparks.push(sp);
  }
}
function updateSparks(dt) {
  for (let i = sparks.length - 1; i >= 0; i--) {
    const sp = sparks[i], u = sp.userData;
    u.t += dt;
    const k = u.t / u.life;
    if (k >= 1) { sparkGroup.remove(sp); sp.material.dispose(); sparks.splice(i, 1); continue; }
    sp.position.addScaledVector(u.vel, dt);
    u.vel.multiplyScalar(Math.exp(-2.5 * dt));
    const s = u.size * Math.sin(Math.PI * Math.min(1, k * 1.4)) + 1e-3;
    sp.scale.set(s, s, 1);
    sp.material.rotation += u.spin * dt;
    sp.material.opacity = 1 - k * k;
  }
}
// ---- 魔法のパン種（最後の武器） ----
// 町が崩壊したあと、パン工房の前の工場長と話すと、つぼ（yeast.glb）が工場長の前から砲台の先へ飛んできて、
// 砲口に光るパン種（yeast_cannon.glb、PC_Rig_Barrel の子）が付く。パン種はゆっくり脈打つ（待機のクリップ）
const YEAST_FLY = 1.1;           // つぼが砲台へ飛んでいく時間（秒）
let yeastPot = null, yeastPotMixer = null, yeastGun = null, yeastGunMixer = null, yeastGunActs = {};
let yeastFly = null;             // { t, from }
function setupYeast(potGltf, gunGltf) {
  yeastPot = potGltf.scene;
  yeastPot.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  yeastPot.visible = false;
  scene.add(yeastPot);
  yeastPotMixer = new THREE.AnimationMixer(yeastPot);
  for (const c of potGltf.animations) yeastPotMixer.clipAction(c).play();
  yeastGun = gunGltf.scene.getObjectByName('YC_Root');
  yeastGun.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  model.getObjectByName('PC_Rig_Barrel').add(yeastGun);   // 砲身の原点そのもの（位置も回転も 0 のまま）
  yeastGun.visible = false;
  yeastGunMixer = new THREE.AnimationMixer(yeastGun);
  const clips = clipsFromExtras(yeastGun.getObjectByName('YC_DoughPivot'), gunGltf.animations);
  for (const [name, c] of Object.entries(clips)) {
    const a = yeastGunMixer.clipAction(c);
    if (name !== 'idle') { a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; }
    yeastGunActs[name] = a;
  }
  yeastGunActs.idle?.play();
}
function applyYeast() {
  yeastGun.visible = true;
}
// 工場長の前から、つぼが弧を描いて砲台の先へ飛び、小さくなって消える → パン種が付いてキラキラ
function startYeastFly(chief) {
  const p = chief.root.position, h = chief.root.rotation.y;
  yeastFly = { t: 0, from: new THREE.Vector3(p.x + Math.sin(h) * 0.5, p.y + 1.0, p.z + Math.cos(h) * 0.5) };
  yeastPot.position.copy(yeastFly.from);
  yeastPot.scale.setScalar(2);   // 遠くからでも見えるように少し大きく
  yeastPot.visible = true;
  sparkleBurst(yeastFly.from, 10, 0.3);
}
function updateYeast(dt) {
  yeastPotMixer?.update(dt);
  if (yeastGun?.visible) yeastGunMixer.update(dt);
  updateYeastAim();
  if (!yeastFly) return;
  yeastFly.t += dt;
  const u = Math.min(1, yeastFly.t / YEAST_FLY), e = u * u * (3 - 2 * u);
  yeastGun.getWorldPosition(_oc2);
  yeastPot.position.lerpVectors(yeastFly.from, _oc2, e);
  yeastPot.position.y += Math.sin(Math.PI * e) * 1.2;
  yeastPot.rotation.y += dt * 6;
  yeastPot.scale.setScalar(2 * (1 - 0.85 * e));
  if (u >= 1) {
    yeastFly = null;
    yeastPot.visible = false;
    applyYeast();
    sparkleBurst(_oc2, 26, 0.4);
    playSfx('equip');
    showToast(GIFT_TOASTS.yeast);
  }
}
// 話し終わったら暗転して町へ
function finishOpening() {
  opening.phase = 'fadeout';
  opening.t = 0;
  fadeEl.classList.add('on');
  document.body.classList.add('opening-out');   // スキップのボタンを消す
}
// スキップ（⏭ ボタン、または S キー）：会話を閉じて、そのまま暗転して町へ
function skipOpening() {
  if (!opening || opening.phase === 'fadeout' || opening.phase === 'wait') return;
  if (talk.active) talk.close();
  finishOpening();
}
document.getElementById('skipOpening').addEventListener('pointerdown', (e) => {
  e.stopPropagation();
  e.preventDefault();
  skipOpening();
});
function endOpening() {
  opening = null;
  document.body.classList.remove('opening', 'opening-out');
  scene.remove(room, roomMayor, roomFuwao, roomChief, roomMecha);
  roomMayorMixer?.uncacheRoot(roomMayor);
  roomChiefMixer?.uncacheRoot(roomChief);
  player.add(playerLamp);
  playerLamp.position.copy(LAMP_POS);
  camera.fov = 70;
  camera.updateProjectionMatrix();
  fadeEl.classList.remove('on');
}

// ---- 会話 ----
// 人をクリック（タップ）すると話す。台本は talks.js、吹き出しは talk.js。
// マウスが画面に固定されているとき（カーソルがない）は、近くにいて画面の中ほどに見えている人の頭に
// 「話す」を出し、クリックでその人と話す。カーソルや指で操作するときは、触った人と話す
const TALK_RANGE = 10;     // クリックで話せる距離（m）
const TALK_NEAR = 4;       // 「話す」を出す距離（m）
const TALK_AIM = 0.35;     // 「話す」を出すのは、画面の中心から高さのこの割合までに見えている人
const talk = createTalk();
let talkWith = null;
const _sp = new THREE.Vector3();
// 住民の頭（または足もと）の画面上の位置（px）。カメラの後ろなら null
function screenOf(r, up) {
  _sp.copy(r.root.position);
  _sp.y += up;
  _sp.project(camera);
  if (_sp.z > 1) return null;
  return { x: (_sp.x + 1) / 2 * window.innerWidth, y: (1 - _sp.y) / 2 * window.innerHeight };
}
// カメラから胸のあたりまでのあいだに、壁などがないか
function inSight(r) {
  _sp.copy(r.root.position);
  _sp.y += r.height * 0.7;
  _d.subVectors(_sp, camera.position);
  const len = _d.length();
  const hit = cast(camera.position, _d.normalize(), len);
  return !hit || hit.distance > len - 0.3;
}
// 画面の (x, y) に見えている住民（tol は当たりの広さ px）。何人も重なっていたら手前の人
function residentAt(x, y, tol = 8) {
  let best = null, bestD = TALK_RANGE;
  for (const r of residents) {
    const d = r.root.position.distanceTo(feet);
    if (d > bestD || r.state === 'eat' || !r.root.visible) continue;
    const foot = screenOf(r, 0), head = screenOf(r, r.height);
    if (!foot || !head) continue;
    const halfW = (r.radius + 0.1) * (foot.y - head.y) / r.height;
    if (Math.abs(x - (foot.x + head.x) / 2) > halfW + tol || y < head.y - tol || y > foot.y + tol) continue;
    if (!inSight(r)) continue;
    best = r; bestD = d;
  }
  return best;
}
// 「話す」を出す人：近くにいて、画面の中心に一番近く見えている人
function talkTarget() {
  if (!onGround || floating || jetting) return null;
  let best = null, bestD = Infinity;
  const cx = window.innerWidth / 2, cy = window.innerHeight / 2, lim = window.innerHeight * TALK_AIM;
  for (const r of residents) {
    if (r.root.position.distanceTo(feet) > TALK_NEAR || r.state === 'eat' || !r.root.visible || !hasTalk(r)) continue;
    const p = screenOf(r, r.height * 0.6);
    if (!p) continue;
    const d = Math.hypot(p.x - cx, p.y - cy);
    if (d < lim && d < bestD && inSight(r)) { best = r; bestD = d; }
  }
  return best;
}
// ---- 町人のセリフを選ぶ（台本は talks.json。書き方は docs/talks-spec.md） ----
// talks.json を読んで TALKS に足す。docs/talks.schema.json と同じ決まりで確かめ、
// 合わないまとまりはコンソールに警告を出して使わない（キャラクターごと使えないときもある）
// revive：からだが 0 になってパン工房で焼き直されたときの、工場長のセリフ（だれかに話しかけたときには使わない）
// warning：魔法のパン種を付けてはじめて発射しようとしたとき、町長が止めに来るセリフ
const TALK_KEY = /^((10|[0-9])-[1-9][0-9]?|grandpa|grandma|girl|mayor|baker|chief|revive|warning|equipped|castle)$/;
// セリフの人物画は portraits/<組>_<表情>.webp。組はキャラクターの portrait、表情は face（喜・怒・哀・楽。省略すると喜）
const PORTRAIT_SETS = ['baker', 'mayor', 'chief'];
const FACES = ['joy', 'angry', 'sad', 'fun'];
const portraitSrc = (set, face) => (PORTRAIT_SETS.includes(set) ? `portraits/${set}_${FACES.includes(face) ? face : 'joy'}.webp` : null);
function preloadPortraits() {
  for (const set of PORTRAIT_SETS) for (const face of FACES) new Image().src = portraitSrc(set, face);
}
// refill：話し終わったときに満タンにするもの。body からだ / fuel 燃料 / all 両方
const REFILLS = ['body', 'fuel', 'all'];
const needsRefill = (v) => (v === 'body' || v === 'all') && body < 1 || (v === 'fuel' || v === 'all') && fuel < fuelMax;
const TALK_LINE_MAX = 60, TALK_LINES_MAX = 5;
const isInt = (v, lo, hi) => Number.isInteger(v) && v >= lo && (hi === undefined || v <= hi);
const isRange = (v, lo, hi) => Array.isArray(v) && v.length === 2 && isInt(v[0], lo, hi) && isInt(v[1], lo, hi) && v[0] <= v[1];
const TALK_CHECKS = {
  stage: (v) => isInt(v, 1, STAGE_MAX) || isRange(v, 1, STAGE_MAX),
  town: (v) => isRange(v, 0, 100),
  areaTown: (v) => isRange(v, 0, 100),
  area: (v) => isInt(v, 0, 10) || (Array.isArray(v) && v.length > 0 && v.every((a) => isInt(a, 0, 10)) && new Set(v).size === v.length),
  weight: (v) => typeof v === 'number' && v > 0 && v <= 10,
  once: (v) => typeof v === 'boolean',
  face: (v) => FACES.includes(v),
  refill: (v) => REFILLS.includes(v),
  gift: (v) => v in ITEMS,
  item: (v) => v in ITEMS,
  boss: (v) => isInt(v, 1, BOSSES.length),
  summon: (v) => isInt(v, 1, BOSSES.length) && !!BOSSES[v - 1].summon,
  lines: (v) => Array.isArray(v) && v.length >= 1 && v.length <= TALK_LINES_MAX && v.every((l) => {
    if (typeof l === 'string') return l.length >= 1 && l.length <= TALK_LINE_MAX;
    return l && typeof l === 'object' && Object.keys(l).every((k) => k === 'text' || k === 'face')
      && typeof l.text === 'string' && l.text.length >= 1 && l.text.length <= TALK_LINE_MAX
      && (l.face === undefined || FACES.includes(l.face));
  }),
};
const TALK_CONDITIONS = ['stage', 'town', 'area', 'areaTown', 'once', 'boss', 'summon', 'item'];
function talkProblems(t) {
  if (!t || typeof t !== 'object') return ['まとまりがオブジェクトではない'];
  const bad = Object.keys(t).filter((k) => !TALK_CHECKS[k]).map((k) => `知らない項目 ${k}`);
  if (t.lines === undefined) bad.push('lines がない');
  for (const [k, ok] of Object.entries(TALK_CHECKS)) if (t[k] !== undefined && !ok(t[k])) bad.push(`${k} の値がおかしい`);
  return bad;
}
async function loadTalks() {
  let book;
  try {
    const res = await fetch('talks.json', { cache: 'no-cache' });
    book = await res.json();
  } catch (e) {
    console.error('talks.json を読めませんでした', e);
    return;
  }
  for (const [key, c] of Object.entries(book)) {
    const warn = (msg) => console.warn(`talks.json "${key}": ${msg}`);
    if (!TALK_KEY.test(key)) { warn('キーの形がおかしいので使いません'); continue; }
    if (!c || typeof c !== 'object' || !Array.isArray(c.talks)) { warn('talks がないので使いません'); continue; }
    const extra = Object.keys(c).filter((k) => !['name', 'portrait', 'talks'].includes(k));
    if (extra.length) warn(`知らない項目 ${extra.join(', ')}`);
    if (typeof c.name !== 'string' || !c.name || c.name.length > 12) warn('name がおかしい');
    if (c.portrait != null && !PORTRAIT_SETS.includes(c.portrait)) warn(`portrait は ${PORTRAIT_SETS.join(' / ')} か null`);
    const talks = c.talks.filter((t, i) => {
      const bad = talkProblems(t);
      if (bad.length) warn(`talks[${i}] を使いません（${bad.join(' / ')}）`);
      return !bad.length;
    });
    if (!talks.length) { warn('使えるまとまりがないので使いません'); continue; }
    if (!talks.some((t) => TALK_CONDITIONS.every((k) => t[k] === undefined))) warn('条件なしのまとまりがありません（何も話さない場面ができます）');
    TALKS[key] = { ...c, talks };
  }
}
// メインストーリーのステージ（talks.json の stage の条件に使う）
//   1：はじめ → 町の復興度 80% → ボス1 が来て、追い出すまで
//   2：ボス1 を追い出してから → 復興度 60% → ボス2 が来て、追い出すまで
//   3：ボス2 を追い出してから → 復興度 100% → ボス3 が来て、町が倒壊するまで
//   4：町が倒壊してから、ボス3 を倒すまで
// ボス3 は町長のセリフのあとに現れて町を押しつぶし（startCollapse）、ステージ 4 になる。ボス3 を倒すところはこれから
const STAGE_MAX = 4;
let storyStage = 1;
// 区画の番号（1〜10）は AREA_NAMES に書いた順。パン工房は 0
const AREA_ORDER = Object.keys(AREA_NAMES);
function areaNumber(i) { return i >= 0 ? AREA_ORDER.indexOf(ruinAreas[i].name) + 1 : 0; }
const inRange = (v, c) => c === undefined || (Array.isArray(c) ? v >= c[0] && v <= c[c.length - 1] : v === c);
const inList = (v, c) => c === undefined || (Array.isArray(c) ? c.includes(v) : v === c);
// ステージ 4（町が崩壊したあと）は、stage に 4 を含むまとまりだけ（条件なしの話は、崩壊する前の町の話なので出さない）
const TALK_ONLY_STAGE = 4;
function talkFits(t, r, used) {
  if (storyStage >= TALK_ONLY_STAGE && (t.stage === undefined || !inRange(storyStage, t.stage))) return false;
  if (t.once && used.has(t)) return false;
  if (t.gift && items.has(t.gift)) return false;   // もうもらった道具の話はしない
  if (t.gift && ITEM_NEEDS[t.gift] && !items.has(ITEM_NEEDS[t.gift])) return false;   // 先に要る道具がまだ
  if (t.item && !items.has(t.item)) return false;   // その道具を持っているときだけの話
  if (t.boss !== undefined && !(bossIndex + 1 === t.boss && (bossAppeared || retreat) && !bossGone)) return false;
  // ボスを呼ぶ話は、そのボスの番で、まだ現れていないときだけ（ステージもそのボスのステージ）
  if (t.summon !== undefined && !(bossIndex + 1 === t.summon && !bossAppeared && !bossIntro && !bossSummoned && !bossGone && storyStage === BOSSES[t.summon - 1].stage)) return false;
  const ai = areaAt(r.home.x, r.home.z);
  return inRange(storyStage, t.stage)
    && inRange(Math.round(townProgress() * 100), t.town)
    && inList(areaNumber(ai), t.area)
    && (t.areaTown === undefined || (ai >= 0 && inRange(ruinAreas[ai].restored ? 100 : Math.round(areaProgress(ai) * 100), t.areaTown)));
}
function pickTalk(list, r) {
  const used = r.talked || (r.talked = new Set());
  let cands = list.filter((t) => talkFits(t, r, used));
  // 補充が要るときは、補充してくれるまとまりを必ず選ぶ（続けて同じでもよい）
  const refills = cands.filter((t) => t.gift || t.summon || (t.refill && needsRefill(t.refill)));   // 道具をくれる話・ボスを呼ぶ話も、必ず選ぶ
  if (refills.length) cands = refills;
  else if (cands.length > 1) cands = cands.filter((t) => t !== r.lastTalk);   // 続けて同じ話はしない
  if (!cands.length) return null;
  let w = cands.reduce((s, t) => s + (t.weight ?? 1), 0) * Math.random();
  for (const t of cands) if ((w -= t.weight ?? 1) <= 0) return t;
  return cands[cands.length - 1];
}
// 話せるセリフがあるか（選ばずに調べるだけ）
function hasTalk(r) {
  const used = r.talked || new Set();
  return talkBooks(r).some((b) => b && (b.talks ? b.talks.some((t) => talkFits(t, r, used)) : !!b.lines));
}
// その人の id の台本 → 種類（grandpa など）の台本。guest（お城の女の子）は自分の台本だけ（町の女の子の話はしない）
const talkBooks = (r) => (r.guest ? [TALKS[r.id]] : [TALKS[r.id], TALKS[r.kindName]]);
// talkBooks の順で、条件に合うセリフを選ぶ
function talkScript(r) {
  for (const book of talkBooks(r)) {
    if (!book) continue;
    if (!book.talks) return book.lines ? book : null;   // 昔の書き方（lines だけ）
    const t = pickTalk(book.talks, r);
    if (!t) continue;
    r.lastTalk = t;
    r.talked.add(t);
    // 人物画は、セリフごとの face → まとまりの face → 喜 の順で表情を決める
    const lines = t.lines.map((l) => {
      const text = typeof l === 'string' ? l : l.text;
      return { text, portrait: portraitSrc(book.portrait, (typeof l === 'object' && l.face) || t.face) };
    });
    return { name: t.name || book.name, portrait: null, lines, refill: t.refill, gift: t.gift, summon: t.summon };
  }
  return null;
}
// 焼き直されたあとの工場長のセリフ（talks.json の revive）。魔法のパン種がある限り、何度でも生き返れる。工房の中で話す（reviveInWorkshop）
function reviveScript() {
  const book = TALKS.revive, chief = residents.find((r) => r.id === '0-1');
  if (!book || !chief) return null;
  // まだ話していない一度きりの話（はじめてやられたときの、くわしい話）を先に
  const used = chief.talked || (chief.talked = new Set());
  const first = book.talks.find((x) => x.once && talkFits(x, chief, used));
  const t = first || pickTalk(book.talks.filter((x) => !x.once), chief);
  if (!t) return null;
  chief.talked.add(t);
  const lines = t.lines.map((l) => ({
    text: typeof l === 'string' ? l : l.text,
    portrait: portraitSrc(book.portrait, (typeof l === 'object' && l.face) || t.face),
  }));
  talkWith = null;
  talkSummon = null;
  keys.clear();
  touch.reset();
  return { name: t.name || book.name, portrait: null, lines };
}
function startTalk(r) {
  if (!r || opening || retreat || collapse || finale || talk.active || !onGround || floating || jetting) return;
  const script = talkScript(r);
  if (!script) return;
  if (r.bread) { r.bread.claimedBy = null; r.bread = null; }
  r.route = r.afterRoute = null;   // 家へ帰る途中なら、話し終わってから帰り直す
  r.state = 'talk';
  talkWith = r;
  keys.clear();
  touch.reset();
  talkRefill = script.refill;
  talkGift = script.gift;
  talkSummon = script.summon;
  talk.open(script);
}
let talkRefill = null, talkGift = null, talkSummon = null;
const GIFT_TOASTS = {
  solidifier: '固形化パンを手に入れた！ 脅威にパンを当てて固めてから、体当たりで押し戻そう',
  choco: '板チョコを手に入れた！ チョコ燃料タンクで、燃料の最大が 50% に上がった',
  yeast: '魔法のパン種を手に入れた！ 砲台の先に、光るパン種が付いた',
  flour: '秘伝の打ち粉で、魔法のパン種が撃てるようになった！ 撃てるのは一度きり',
  present: 'お城の女の子から、プレゼントをもらった！',
};
function advanceTalk() {
  if (!talk.advance()) return;
  if (opening) { finishOpening(); return; }
  if (talkRefill) {
    const v = talkRefill;
    talkRefill = null;
    if (v === 'body' || v === 'all') body = 1;
    if (v === 'fuel' || v === 'all') fuel = fuelMax;
    showToast(v === 'body' ? 'からだが満タンになった！' : v === 'fuel' ? '燃料が満タンになった！' : 'からだと燃料が満タンになった！');
  }
  if (talkGift) {
    const g = talkGift;
    talkGift = null;
    items.add(g);
    if (g === 'choco' && visit) { startChocoEquip(); return; }   // 工房の中：展示台から飛んできて、背中に付く
    if (g === 'choco') { applyChoco(); sparkleBurst(_rm.set(feet.x, feet.y + 1.4, feet.z)); }
    if (g === 'present') { applyPresent(); sparkleBurst(_rm.set(feet.x, feet.y + 1.4, feet.z)); }
    if (g === 'yeast' && talkWith) startYeastFly(talkWith);   // 着いたときにお知らせを出す
    else showToast(GIFT_TOASTS[g] || `${ITEMS[g]}を手に入れた！`);
  }
  if (talkSummon) {
    // 話し終わって少したつと、ボスが現れる（BOSS_APPEAR_DELAY）
    talkSummon = null;
    bossSummoned = true;
    bossAppearWait = 0;
  }
  if (visit) { leaveWorkshop(); return; }
  if (!talkWith) return;   // 焼き直しのあとの工場長のセリフ（話し相手がいない）
  if (talkWith.leaveAfterTalk) { mayorLeave(talkWith); talkWith = null; return; }
  talkWith.state = 'idle';
  talkWith.wait = RES_IDLE[0];
  talkWith = null;
}
let hintTarget = null;
function updateTalk(dt) {
  if (talk.active && !talkWith) { talk.update(dt, { visible: false }); return; }   // 話し相手がその場にいないセリフ
  if (talk.active) {
    // ロボも話し相手のほうを向く
    const p = talkWith.root.position;
    heading = turnToward(heading, Math.atan2(p.x - feet.x, p.z - feet.z), 1 - Math.exp(-6 * dt));
    const head = screenOf(talkWith, talkWith.height + 0.1);
    talk.update(dt, head ? { ...head, visible: head.y > 0 && head.y < window.innerHeight && head.x > 0 && head.x < window.innerWidth } : { visible: false });
    return;
  }
  hintTarget = playing ? talkTarget() : null;
  talk.hint(hintTarget && screenOf(hintTarget, hintTarget.height + 0.15));
}

// ---- 操作 ----
let ready = false;
let playing = false;
let dragLook = false;   // ポインターロックが使えない環境（iframe 内など）ではドラッグで見回す

// yaw / pitch はカメラの向き。pitch が正だと見下ろす
const view = { yaw: START_YAW, pitch: 0.25, distance: CAM_DISTANCE, thirdPerson: true };

function play() {
  playing = true;
  overlay.classList.remove('title', 'help');   // ここからの overlay は、一時停止の画面（操作の説明つき）
  document.body.classList.add('playing');
  overlay.style.display = 'none';
  crosshair.style.display = view.thirdPerson ? 'none' : 'block';
}
function pause() {
  playing = false;
  document.body.classList.remove('playing');
  overlay.style.display = 'flex';
  crosshair.style.display = 'none';
  startLabel.textContent = `${TAP}してつづける`;
  startLabel.style.display = '';
  keys.clear();
  touch.reset();
}

// タイトルのメニュー：はじめから / つづきから（保存があるときだけ）。一度始めたあとは、画面のどこを押しても再開
let started = false;
const menuEl = document.getElementById('titleMenu');
const newBtn = document.getElementById('newGame'), contBtn = document.getElementById('continueGame');
let confirmNew = false;
// ---- ?debug のときだけ：場面を選んで始める（演出の確かめ用） ----
// 選んだ場面の保存データを debug 用のキー（SAVE_KEY）に作って、「つづきから」と同じように始める
const DEBUG_STARTS = [
  { label: 'ステージ1：はじめから', fresh: true },
  { label: 'ステージ1：脅威1が現れる（復興100%）', stage: 1, boss: 0 },
  { label: 'ステージ2：脅威2が現れる（道具なし）', stage: 2, boss: 1 },
  { label: 'ステージ3：町長と話すと崩壊（復興100%）', stage: 3, boss: 2, items: ['solidifier', 'choco'] },
  { label: 'ステージ4：崩壊後（工場長からパン種の前）', stage: 4, boss: 2, items: ['solidifier', 'choco'], roaming: true },
  { label: 'ステージ4：パン種あり（町長の警告と最後の演出の前）', stage: 4, boss: 2, items: ['solidifier', 'choco', 'yeast'], roaming: true },
];
function debugSave(p) {
  const fuelMaxOf = p.items?.includes('choco') ? CHOCO_FUEL_MAX : FUEL_MAX_START;
  const pos = BOSS_TARGET.clone().add(_rd.set(BOSS_POS.x - BOSS_TARGET.x, 0, BOSS_POS.z - BOSS_TARGET.z).normalize().multiplyScalar(BOSS_STOP));
  return {
    v: SAVE_VERSION, at: Date.now(), stage: p.stage, boss: p.boss,
    bossAppeared: !!p.roaming, bossGone: false, bossPos: p.roaming ? [+pos.x.toFixed(2), +pos.z.toFixed(2)] : null,
    items: p.items || [], mayorWarned: false, fuelMax: fuelMaxOf, fuel: fuelMaxOf, body: 1, hour: 10,
    // 町はすべて元に戻した状態（小バイ菌は全部倒し、町人はみんなパンを食べた）
    areas: areaGauge.map((g) => ({ called: true, done: true, gone: g.spots.map(() => 1) })),
    residents: Object.fromEntries(residents.map((r) => [r.id, { fed: true, hungry: false, once: [] }])),
  };
}
function setupDebugStart() {
  const box = document.getElementById('debugStart');
  if (!new URLSearchParams(location.search).has('debug') || !box) return;
  const sel = box.querySelector('select');
  DEBUG_STARTS.forEach((p, i) => sel.add(new Option(p.label, i)));
  box.style.display = 'flex';
  box.querySelector('button').addEventListener('click', (e) => {
    e.stopPropagation();
    if (!ready) return;
    const p = DEBUG_STARTS[sel.value];
    box.style.display = 'none';
    if (p.fresh) { clearSave(); startGame(false); return; }
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(debugSave(p))); } catch { /* 保存できない環境 */ }
    startGame(true);
  });
  box.addEventListener('click', (e) => e.stopPropagation());
}
function showTitleMenu() {
  const d = readSave();
  startLabel.style.display = 'none';
  menuEl.style.display = 'flex';
  contBtn.style.display = d ? '' : 'none';
  newBtn.textContent = d ? 'はじめから' : 'はじめる';
  if (d) {
    const t = new Date(d.at);
    contBtn.innerHTML = `つづきから<small>ステージ${d.stage}・${t.getMonth() + 1}/${t.getDate()} ${t.getHours()}:${String(t.getMinutes()).padStart(2, '0')}</small>`;
  }
}
function startGame(cont) {
  started = true;
  initAudio();
  savingOn = true;
  menuEl.style.display = 'none';
  const dbg = document.getElementById('debugStart');
  if (dbg) dbg.style.display = 'none';
  startLabel.classList.remove('disabled');
  if (cont) {
    if (opening) endOpening();
    const d = readSave();
    loadGame(d);
    // ステージ 4 は崩壊した町。読み込み終わるまで暗くしておく
    if (d.stage >= 4) {
      fadeEl.classList.add('on');
      collapseTown().catch((e) => console.error(e)).finally(() => { respawn(); setTimeout(() => fadeEl.classList.remove('on'), 300); });
    }
  } else respawn(NEW_START_POS, NEW_START_YAW);
  enterPlay();
}
newBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (!ready) return;
  // つづきがあるときは、もう一度押してもらう（つづきは、最初の自動保存で消える）
  if (readSave() && !confirmNew) { confirmNew = true; newBtn.innerHTML = 'はじめから<small>つづきが消えます。もう一度押す</small>'; return; }
  startGame(false);
});
// 操作説明：タイトルの上に操作の表を出す。「もどる」かどこかを押すとメニューへ
document.getElementById('helpBtn').addEventListener('click', (e) => { e.stopPropagation(); overlay.classList.add('help'); });
document.getElementById('helpPanel').addEventListener('click', (e) => {
  if (!overlay.classList.contains('title')) return;
  e.stopPropagation();
  overlay.classList.remove('help');
});
contBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  if (ready && readSave()) startGame(true);
});
overlay.addEventListener('click', () => {
  if (!ready || !started) return;
  enterPlay();
});
function enterPlay() {
  initAudio();
  if (dragLook) { play(); return; }
  try { document.body.requestPointerLock()?.catch?.(() => {}); } catch { /* 非対応 */ }
  setTimeout(() => {
    if (document.pointerLockElement) return;
    dragLook = true;
    play();
  }, 300);
}
document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement) play();
  else if (!dragLook) pause();
});

let dragging = false;
let downX = 0, downY = 0, downTime = 0;
renderer.domElement.addEventListener('pointerdown', (e) => {
  dragging = dragLook && playing && e.pointerType !== 'touch';
  downX = e.clientX; downY = e.clientY; downTime = performance.now();
});
window.addEventListener('pointerup', (e) => {
  // ドラッグで見回すときは、動かさずに離したらクリック
  if (dragging && Math.hypot(e.clientX - downX, e.clientY - downY) < 6 && performance.now() - downTime < 400) clickAt(e.clientX, e.clientY);
  dragging = false;
});
// 画面の (x, y) をクリック（タップ）した：そこに見えている人か、「話す」が出ている人と話す
function clickAt(x, y) {
  if (!playing || talk.active) return;
  let r = residentAt(x, y);
  if (!r && hintTarget) {
    const h = screenOf(hintTarget, hintTarget.height + 0.15);
    if (h && Math.hypot(x - h.x, y - h.y + 14) < 40) r = hintTarget;
  }
  startTalk(r);
}
// マウスが固定されているときはカーソルがないので、「話す」が出ている人（または画面の中心の人）と話す
window.addEventListener('mousedown', (e) => {
  if (!playing || e.button !== 0 || !document.pointerLockElement) return;
  if (talk.active) advanceTalk();
  else startTalk(hintTarget || residentAt(window.innerWidth / 2, window.innerHeight / 2, 20));
});
document.getElementById('talk').addEventListener('pointerdown', (e) => {
  if (e.button === 0 && !document.pointerLockElement) advanceTalk();
});
function lookBy(dYaw, dPitch) {
  if (dYaw || dPitch) recentering = false;   // 自分で回したら、正面へ戻すのをやめる
  view.yaw -= dYaw;
  const [lo, hi] = view.thirdPerson ? [-0.35, 1.2] : [-1.4, 1.4];
  view.pitch = THREE.MathUtils.clamp(view.pitch + dPitch, lo, hi);
}
window.addEventListener('pointermove', (e) => {
  if (!playing || e.pointerType === 'touch' || !(document.pointerLockElement || dragging)) return;
  lookBy(e.movementX * MOUSE_SENS, e.movementY * MOUSE_SENS);
});
window.addEventListener('wheel', (e) => {
  if (!playing || !view.thirdPerson) return;
  view.distance = THREE.MathUtils.clamp(view.distance + Math.sign(e.deltaY) * 0.5, 2.0, 9.0);
}, { passive: true });

const keys = new Set();
window.addEventListener('keydown', (e) => {
  if (e.code === 'KeyM' && !e.repeat) setSound('bgm', !soundOn.bgm);
  if (e.code === 'KeyK' && !e.repeat) setSound('sfx', !soundOn.sfx);
  if (dragLook && playing && e.code === 'Escape') { pause(); return; }
  if (playing && (talk.active || opening)) {   // 会話中とオープニング中は、会話を進めるキーだけ
    if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); if (!e.repeat) advanceTalk(); }
    if (e.code === 'KeyS' && opening) skipOpening();
    return;
  }
  keys.add(e.code);
  if (!playing) return;
  if (e.code === 'KeyR') respawn();
  if (e.code === 'KeyF') fire();
  if (e.code === 'KeyT') style.toggle();
  if (e.code === 'KeyV') toggleView();
  if (e.code === 'KeyC') recenterCamera();
  if (e.code === 'Space') e.preventDefault();
});
window.addEventListener('keyup', (e) => keys.delete(e.code));

// カメラをロボの正面の向き（ロボの後ろから、ロボが向いている方向を見る）へ回す。
// 向きは C を押したときのロボの向きで決める（回っている間もロボの向きを追うと、
// 左右キーの移動はカメラの向きが基準なので、ロボとカメラが追いかけあってぐるぐる回ってしまう）
let recentering = false, recenterYaw = 0;
function recenterCamera() { recentering = view.thirdPerson; recenterYaw = heading + Math.PI; }
function updateRecenter(dt) {
  if (!recentering) return;
  const target = recenterYaw;
  const k = 1 - Math.exp(-10 * dt);
  view.yaw = turnToward(view.yaw, target, k);
  view.pitch += (0.25 - view.pitch) * k;
  if (Math.abs(Math.atan2(Math.sin(target - view.yaw), Math.cos(target - view.yaw))) < 0.01) recentering = false;
}
function toggleView() {
  view.thirdPerson = !view.thirdPerson;
  view.pitch = view.thirdPerson ? 0.25 : 0;
  crosshair.style.display = view.thirdPerson ? 'none' : 'block';
}

const touch = createTouchControls({
  press: (code) => keys.add(code),
  release: (code) => keys.delete(code),
  fire: () => fire(),
  look: lookBy,
  tap: clickAt,
  recenter: () => recenterCamera(),
  toggleView,
  respawn: () => { releaseAll(); respawn(); },   // 押しっぱなしで残ったときも「戻る」で直る
  pause: () => pause(),
  isPlaying: () => playing,
});

// 別のウィンドウへ移ったり画面が隠れたりしたあいだにキーや指を離すと、離したことが届かず
// 押しっぱなしのまま進み続ける。そうなりうるときは全部離したことにする
function releaseAll() { keys.clear(); touch.reset(); }
window.addEventListener('blur', releaseAll);
window.addEventListener('focus', releaseAll);
document.addEventListener('visibilitychange', () => { if (document.hidden) releaseAll(); });
// 右クリックや長押しのメニューが開くと、その間に離したキーが届かない（blur も起きない）
window.addEventListener('contextmenu', (e) => { if (playing || IS_TOUCH_DEVICE) e.preventDefault(); releaseAll(); });
// スマホのブラウザの拡大（ピンチ・ダブルタップ）と文字の選択を止める。iOS の Safari は viewport の
// user-scalable=no を無視するので、ジェスチャーのイベントも止める（操作は pointer イベントなので影響しない）
for (const type of ['gesturestart', 'gesturechange', 'gestureend', 'dblclick', 'selectstart']) {
  document.addEventListener(type, (e) => e.preventDefault(), { passive: false });
}
document.addEventListener('touchmove', (e) => { if (e.touches.length > 1 || e.scale && e.scale !== 1) e.preventDefault(); }, { passive: false });

// ---- プレイヤー ----
const feet = new THREE.Vector3();
let heading = 0;        // ロボの向き（rotation.y。モデルは +Z が正面）
let velY = 0;
let onGround = false;
let floating = false;   // 川に浮かんでいる
let floatWaterY = 0;    // 浮かんでいる水面の高さ
let paddling = false;   // 浮かびながら漕いでいる
let floatWeight = 0;    // 揺れの強さ（浮かぶと 1 へ）
let moveSpeed = 0;      // 実際に進んだ速さ（歩きアニメの速度に使う）
let spaceHeld = false;  // 前のフレームで Space が押されていたか（押し直しの検出）
let jumpLocked = false;
let jetting = false;
let jetTime = 0;        // 噴射を始めてからの時間
let jetSpeed = 0;       // 噴射による前進の速さ
const jetVel = new THREE.Vector3();   // 噴射の勢い（噴射をやめても少しのあいだ残る）
let jetTilt = 0;        // あおりで機首が上がっている角度
let recoiled = false;   // この発射の反動はもう受けた
const recoilVel = new THREE.Vector3();
let shake = 0;          // カメラのゆれの強さ
let jetEndTime = 1;     // 噴射をやめてからの時間（炎が消えるまで）
let landTime = 1;       // 着地してからの時間

function respawn(pos = START_POS, yaw = START_YAW) {
  feet.copy(pos);
  velY = 0;
  jetting = false;
  jetVel.set(0, 0, 0);
  view.yaw = yaw;
  view.pitch = view.thirdPerson ? 0.25 : 0;
  heading = yaw + Math.PI;
  snapToGround(true);
}

const DOWN = new THREE.Vector3(0, -1, 0);
const UP = new THREE.Vector3(0, 1, 0);
const _o = new THREE.Vector3();
const _n = new THREE.Vector3();
const _d = new THREE.Vector3();

// 足の裏の中心と周囲 4 点で調べて一番高いところ（段の継ぎ目のすき間に落ちないように）
const FOOT_OFFSETS = [[0, 0], [0.15, 0], [-0.15, 0], [0, 0.15], [0, -0.15]];
function groundBelow(pos, maxUp = STEP_HEIGHT) {
  let best = null;
  for (const [dx, dz] of FOOT_OFFSETS) {
    _o.set(pos.x + dx, pos.y + maxUp, pos.z + dz);
    const hit = cast(_o, DOWN, 200);
    if (hit && (best === null || hit.point.y > best)) best = hit.point.y;
  }
  return best;
}

// 足元の地面より上にある水面の高さ（川の中でなければ null）
function waterLevel(pos, gy) {
  if (gy === null) return null;
  _o.set(pos.x, pos.y + 5, pos.z);
  const hit = cast(_o, DOWN, 200, waterCollider);
  return hit && hit.point.y > gy + 0.05 ? hit.point.y : null;
}

function snapToGround(force) {
  const gy = groundBelow(feet, force ? 1 : STEP_HEIGHT);   // 頭上に張り出しがあるので、探すのは少し上まで
  if (gy !== null) feet.y = gy;
}

// ---- ロボの体の当たり判定（カプセル） ----
// ロボの体を縦長のカプセル（半径 RADIUS）として、町のモデルの三角形と重なったら、重なった分だけ横へ押し出す。
// 壁にはその手前で止まり、斜めに当たれば壁に沿ってすべる。軒や窓枠のような出っぱりも、体のどの高さで当たっても止まる。
// 足元から STEP_HEIGHT までは地面の判定（groundBelow）にまかせるので、カプセルの下の端はその高さ
// （浮かんでいるときは、水面の下の石に引っかからないよう FLOAT_DRAFT の高さ）。上の端は旗の先（ROBOT_HEIGHT）
const CAP_ITER = 3;   // 押し出しのくり返し（角では 2 枚の壁から押されるため）
const _seg = new THREE.Line3(), _capBox = new THREE.Box3();
const _triP = new THREE.Vector3(), _capP = new THREE.Vector3(), _triN = new THREE.Vector3();
function capsuleAt(p) {
  const bottom = (floating ? FLOAT_DRAFT + 0.05 : STEP_HEIGHT) + RADIUS;
  _seg.start.set(p.x, p.y + bottom, p.z);
  _seg.end.set(p.x, p.y + Math.max(bottom, ROBOT_HEIGHT - RADIUS), p.z);
  _capBox.makeEmpty().expandByPoint(_seg.start).expandByPoint(_seg.end).expandByScalar(RADIUS);
}
// カプセルに重なる三角形ごとに visit(tri, 距離) を呼ぶ。_triP は三角形の上の、_capP はカプセルの芯の上のいちばん近い点
function eachCapsuleHit(visit) {
  for (const c of colliders) {
    c?.geometry.boundsTree.shapecast({
      intersectsBounds: (box) => box.intersectsBox(_capBox),
      intersectsTriangle: (tri) => {
        const d = tri.closestPointToSegment(_seg, _triP, _capP);
        return d < RADIUS ? visit(tri, d) : false;
      },
    });
  }
}
// p（足元）の体が壁に重なっていたら、重ならないところまで横へ押し出す。from は押し出す前にいた所（向きが決まらないときに使う）
function slideCapsule(p, from) {
  for (let iter = 0; iter < CAP_ITER; iter++) {
    capsuleAt(p);
    let pushed = false;
    eachCapsuleHit((tri, d) => {
      _capP.sub(_triP).setY(0);
      let len = _capP.length();
      if (len < 1e-5) {
        // 芯が三角形に触れている：三角形の向き（来たほうへ）に押す
        tri.getNormal(_triN).setY(0);
        if (_triN.lengthSq() < 1e-8) return false;   // 床・天井は横には押さない
        _triN.normalize();
        if (_triN.x * (from.x - _triP.x) + _triN.z * (from.z - _triP.z) < 0) _triN.negate();
        _capP.copy(_triN);
        len = 1;
      } else if (len < (RADIUS - d) * 0.05) {
        return false;   // ほぼ真上・真下からの重なり（天井・床）は横には押さない
      }
      const push = (RADIUS - d) + 0.002;
      p.x += _capP.x / len * push;
      p.z += _capP.z / len * push;
      _seg.start.x = _seg.end.x = p.x;
      _seg.start.z = _seg.end.z = p.z;
      pushed = true;
      return false;
    });
    if (!pushed) return;
  }
}
// p（足元）に立ったとき、頭の上（体の高さの中）に天井や軒の裏がかぶさるか（低い所へ登らないように）
function ceilingOver(p) {
  capsuleAt(p);
  let hit = false;
  eachCapsuleHit((tri, d) => {
    // 上から押される重なり（三角形がカプセルの芯より上にある）
    if (_triP.y - _capP.y > (RADIUS - d) * 0.5 + 0.01 && _triP.y > _seg.start.y) hit = true;
    return hit;
  });
  return hit;
}
// 当たった面が壁なら、その向き（横向き、dir と逆向きにそろえる）。床・天井・登れる斜面なら null（飛ばされたメカなどで使う）
function hitNormal(hit, dir) {
  if (Math.abs(hit.face.normal.y) > 0.6) return null;
  _n.copy(hit.face.normal).setY(0);
  if (_n.lengthSq() < 1e-6) return null;
  _n.normalize();
  if (_n.dot(dir) > 0) _n.negate();   // 両面ポリゴンなので向きをそろえる
  return _n;
}
// 町の人などに押されて、横へずれる（壁の中へは入らない）
const _nudgeFrom = new THREE.Vector3();
function nudgePlayer(dx, dz) {
  _nudgeFrom.copy(feet);
  feet.x += dx; feet.z += dz;
  slideCapsule(feet, _nudgeFrom);
  if (groundBelow(feet) === null) { feet.x = _nudgeFrom.x; feet.z = _nudgeFrom.z; }
}

// 角度 a から b へ、最短の向きで rate の割合だけ近づける
function turnToward(a, b, t) {
  const diff = Math.atan2(Math.sin(b - a), Math.cos(b - a));
  return a + diff * t;
}

const _fwd = new THREE.Vector3();
const _right = new THREE.Vector3();
const _move = new THREE.Vector3();
const _prev = new THREE.Vector3();
const _sub = new THREE.Vector3(), _subPrev = new THREE.Vector3(), _hp = new THREE.Vector3();
const MOVE_SUBSTEP = 0.2;   // これより長い移動は分けて進める（53°の斜面でも 1 回で 0.27m しか上がらない。体の半径より短いので、薄い壁もすり抜けない）

function updatePlayer(dt) {
  // カメラの向きを基準に移動方向を決める
  _fwd.set(-Math.sin(view.yaw), 0, -Math.cos(view.yaw));
  _right.set(Math.cos(view.yaw), 0, -Math.sin(view.yaw));
  _move.set(0, 0, 0);
  if (keys.has('KeyW') || keys.has('ArrowUp')) _move.add(_fwd);
  if (keys.has('KeyS') || keys.has('ArrowDown')) _move.sub(_fwd);
  if (keys.has('KeyD') || keys.has('ArrowRight')) _move.add(_right);
  if (keys.has('KeyA') || keys.has('ArrowLeft')) _move.sub(_right);
  // スマホのスティック：倒した向きへ。大きく倒すと走り、少しだけならゆっくり歩く
  const { stick } = touch;
  let stickRun = false, stickScale = 1;
  if (stick.mag > 0) {
    _move.addScaledVector(_fwd, -stick.y).addScaledVector(_right, stick.x);
    stickRun = stick.mag > STICK_RUN;
    stickScale = stickRun ? 1 : Math.max(0.4, stick.mag / STICK_RUN);
  }
  const fast = keys.has('ShiftLeft') || keys.has('ShiftRight') || stickRun;
  const speed = floating ? (fast ? PADDLE_SPEED_FAST : PADDLE_SPEED) : fast ? RUN_SPEED : WALK_SPEED;
  paddling = floating && !jetting && _move.lengthSq() > 0;
  // 撃っている間は進まず、向きだけ変えられる（外れたら向き直してすぐ撃ち直せる）
  if (firing && !jetting) {
    if (view.thirdPerson && _move.lengthSq() > 0) heading = turnToward(heading, Math.atan2(_move.x, _move.z), 1 - Math.exp(-12 * dt));
    _move.set(0, 0, 0);
  }
  if (jetting) {
    // 噴射中はロボの正面へ進む。入力の方向（一人称ならカメラの正面）へ少しずつ旋回する
    const hasInput = _move.lengthSq() > 0;
    if (hasInput || !view.thirdPerson) {
      const target = view.thirdPerson ? Math.atan2(_move.x, _move.z) : view.yaw + Math.PI;
      const diff = Math.atan2(Math.sin(target - heading), Math.cos(target - heading));
      heading += THREE.MathUtils.clamp(diff, -JET_TURN * dt, JET_TURN * dt);
    }
    jetSpeed += (JET_SPEED - jetSpeed) * (1 - Math.exp(-JET_ACCEL * dt));
    jetVel.set(Math.sin(heading), 0, Math.cos(heading)).multiplyScalar(jetSpeed);
    _move.copy(jetVel).multiplyScalar(dt);
  } else {
    if (_move.lengthSq() > 0) {
      _move.normalize();
      // 三人称では進む方向へロボを向ける。一人称ではカメラの正面を向く
      const target = view.thirdPerson ? Math.atan2(_move.x, _move.z) : view.yaw + Math.PI;
      heading = turnToward(heading, target, 1 - Math.exp(-12 * dt));
      _move.multiplyScalar(speed * stickScale * dt);
    } else if (!view.thirdPerson) {
      heading = view.yaw + Math.PI;
    }
    // 噴射をやめても勢いはしばらく残る（空中では長く、着地したらすぐ止まる。水の上はすべる）
    _move.addScaledVector(jetVel, dt);
    jetVel.multiplyScalar(Math.exp(-(floating ? 1.5 : onGround ? 10 : 1.2) * dt));
    if (floating) _move.addScaledVector(RIVER_FLOW, dt);
  }

  // 発射の反動（ロボの正面と逆へ）
  if (firing && !recoiled && fireAction.time >= (FIRE_SHOT_FRAME - 100) / ANIM_FPS) {
    recoiled = true;
    recoilVel.set(-Math.sin(heading), 0, -Math.cos(heading)).multiplyScalar(RECOIL_SPEED);
    shake = 1;
  }
  if (firing && !shotSpawned && fireAction.time >= (muzzleFrame - 100) / ANIM_FPS) {
    shotSpawned = true;
    spawnBread();
    shaveBody();   // 撃ったパンの分だけ、からだが削れる
  }
  _move.addScaledVector(recoilVel, dt);
  recoilVel.multiplyScalar(Math.exp(-(floating || !onGround ? RECOIL_DAMP_WATER : RECOIL_DAMP) * dt));
  shake *= Math.exp(-10 * dt);

  _prev.copy(feet);
  // 1 フレームの移動を MOVE_SUBSTEP ずつに分けて進め、そのたびに足元の高さを拾う。
  // 一度に進むと、フレームの遅いスマホでジェットのまま山の斜面へ突っこんだとき、
  // 1 フレームで斜面が STEP_HEIGHT 以上高くなり、地面の下（山の中）へもぐってしまう
  const subN = Math.max(1, Math.ceil(_move.length() / MOVE_SUBSTEP));
  _sub.copy(_move).divideScalar(subN);
  for (let i = 0; i < subN; i++) {
    _subPrev.copy(feet);
    feet.x += _sub.x; feet.z += _sub.z;
    slideCapsule(feet, _subPrev);   // 壁に重なった分だけ押し出す（壁に沿ってすべる）
    const g = groundBelow(feet);
    // 足元に何もない（地形の外）か、登った先で頭の上に天井がかぶさる（橋の下の低い岸など）なら、そこへは進まない
    if (g === null || (g > feet.y + 0.01 && ceilingOver(_hp.set(feet.x, g, feet.z)))) { feet.x = _subPrev.x; feet.z = _subPrev.z; break; }
    if (g > feet.y) feet.y = g;   // 上り坂・段差を登る
  }

  // 足元の高さ
  let ground = groundBelow(feet);
  if (ground === null) {
    // 足元に何もない（地形の外）なら戻す
    feet.x = _prev.x; feet.z = _prev.z;
    ground = groundBelow(feet);
  }
  // 川では水面に浮かぶので、立つ高さは「水面より少し下」と「川底」の高いほう（浅瀬は歩く）
  const water = waterLevel(feet, ground);
  const floor = water !== null && ground !== null ? Math.max(ground, water - FLOAT_DRAFT) : ground;
  const moved = Math.hypot(feet.x - _prev.x, feet.z - _prev.z);
  moveSpeed = dt > 0 ? moved / dt : 0;
  // 壁にぶつかったら勢いもそこで落とす
  if (dt > 0 && jetVel.lengthSq() > 0) {
    const cap = moveSpeed + 1;
    jetSpeed = Math.min(jetSpeed, cap);
    if (jetVel.length() > cap) jetVel.setLength(cap);
  }

  const space = keys.has('Space');
  const spacePressed = space && !spaceHeld;
  spaceHeld = space;
  if (!space) jumpLocked = false;
  if (onGround && !firing && space && !jumpLocked) { velY = JUMP_SPEED; onGround = false; playSfx('jump'); }
  else if (!onGround && spacePressed && !jetting && fuel > FUEL_MIN_START) { jetting = true; jetTime = 0; jetSpeed = moveSpeed; velY = Math.min(velY, JET_START_UP); }
  if (jetting && !space) { jetting = false; jetEndTime = 0; }

  const prevY = feet.y;
  if (jetting) {
    // 噴射の推力でほぼ水平に飛ぶ。長く噴かして速くなるほど、あおられて上昇していく。5 秒を過ぎるとさらに上昇する
    jetTime += dt;
    const t = THREE.MathUtils.smoothstep(jetTime, JET_RISE_DELAY, JET_RISE_DELAY + JET_RISE_TIME);
    const lift = t * JET_RISE_MAX * (jetSpeed / JET_SPEED);
    // JET_CLIMB_FROM 秒より長く噴かすと、さらに上がっていく（タンクが大きくなると、高いボスにも届く）
    const climb = THREE.MathUtils.smoothstep(jetTime, JET_CLIMB_FROM, JET_CLIMB_FROM + JET_CLIMB_TIME) * JET_CLIMB_MAX * (jetSpeed / JET_SPEED);
    const tooHigh = ground !== null && feet.y - ground > JET_MAX_ALT;
    const target = tooHigh ? 0 : lift + climb - JET_SINK * (1 - t);
    velY += (target - velY) * (1 - Math.exp(-3 * dt));
    // 低空では沈まず、地面すれすれ（JET_HOVER）の高さを保つ
    const alt = ground !== null ? feet.y - ground : Infinity;
    if (alt < JET_HOVER) velY = Math.max(velY, (JET_HOVER - alt) * JET_HOVER_PULL);
    jetTilt = tooHigh ? 0 : JET_TILT * lift / JET_RISE_MAX + JET_CLIMB_TILT * climb / JET_CLIMB_MAX;
  } else {
    jetTilt = 0;
    velY -= GRAVITY * dt;
    jetEndTime += dt;
  }
  feet.y += velY * dt;

  // 上昇中に頭（旗の先）が天井や屋根の裏に当たったら止める
  if (velY > 0) {
    _o.set(feet.x, prevY + 1.0, feet.z);
    const hit = cast(_o, UP, feet.y - prevY + ROBOT_HEIGHT - 1.0);
    if (hit) {
      feet.y = Math.max(prevY, hit.point.y - ROBOT_HEIGHT);
      velY = 0;
    }
  }

  if (floor !== null) {
    // 歩いているときは小さな下り段差に吸いつく（滝など大きな段は落ちる）
    const snap = onGround && velY <= 0 ? STEP_HEIGHT : 0;
    if (jetting && feet.y <= floor) {
      // 噴射中は、段差などで地面に触れても着地しない（Space を離すまで飛び続ける）
      feet.y = floor;
      velY = Math.max(velY, 0);
      onGround = false;
    } else if (feet.y <= floor + snap) {
      if (!onGround) landTime = 0;
      feet.y = floor;
      velY = 0;
      onGround = true;
    } else {
      onGround = false;
    }
  }
  if (feet.y < -30) respawn();

  floating = onGround && water !== null && water - ground > FLOAT_MIN_DEPTH;
  if (floating) floatWaterY = water;
}

const LAND_TIME = 0.35;   // 着地の沈み込み（フレーム 208〜220）
const JET_END_TIME = 0.25; // 炎が消えるまで（フレーム 282〜288）
const frameTime = (f, start) => (f - start) / ANIM_FPS;

// ふわお（操縦席の MP_Rig）は、からだが減るほど小さくなる（体積がからだに比例。10% で操縦席のふちから見えなくなる）
const PILOT_HIDE = 0.19;        // 操縦席のふちに隠れる大きさ（倍）。からだ 10% でこの大きさ
const PILOT_BASE = new THREE.Vector3(0, 0.37, 0);   // 体の底（MP_Rig の原点。PC_Rig_Body から）。ここを中心に縮める
let pilotScale = null, pilotSize = 1;
function setupPilot() {
  const rig = model.getObjectByName('MP_Rig'), parent = rig?.parent;
  if (!rig) return;
  pilotScale = new THREE.Group();
  pilotScale.name = 'MP_Scale';
  pilotScale.position.copy(PILOT_BASE);
  const inner = new THREE.Group();
  inner.position.copy(PILOT_BASE).negate();
  parent.add(pilotScale);
  pilotScale.add(inner);
  inner.add(rig);   // アニメーションは MP_Rig そのものに付いているので、そのまま動く
}
function pilotSizeOf(b) {
  const v0 = PILOT_HIDE ** 3;
  const v = b >= 0.1 ? v0 + (b - 0.1) / 0.9 * (1 - v0) : v0 * b / 0.1;
  return Math.cbrt(Math.max(0, v));
}
function updateAnimation(dt) {
  if (!walkAction) return;
  if (pilotScale) {
    pilotSize += (pilotSizeOf(body) - pilotSize) * (1 - Math.exp(-6 * dt));
    pilotScale.scale.setScalar(Math.max(1e-3, pilotSize));
  }
  if (fireDone) {
    fireDone = false;
    firing = false;
    fireAction.stop();
    jetWeight = jetting ? 1 : 0;
    airWeight = !onGround && !jetting ? 1 : 0;
  }
  landTime += dt;
  const blend = 1 - Math.exp(-12 * dt);

  // ジャンプ：上昇・落下の速さに合わせてフレームを選ぶ
  //   184〜200 踏み切り→頂点 / 200〜208 落下 / 208〜220 着地
  let airFrame;
  if (!onGround) {
    const k = THREE.MathUtils.clamp(velY / JUMP_SPEED, -1, 1);
    airFrame = k > 0 ? 184 + 16 * (1 - k) : 200 - 8 * k;
  } else {
    airFrame = 208 + 12 * Math.min(1, landTime / LAND_TIME);
  }
  airAction.time = frameTime(airFrame, JUMP_START);

  // ジェット：236〜252 点火 → 252〜282 をくり返す → やめたら 282〜288 で炎が消える
  const jetShown = jetting || jetEndTime < JET_END_TIME;
  if (jetting) {
    const f = 236 + jetTime * ANIM_FPS;
    jetAction.time = frameTime(f < 252 ? f : 252 + ((f - 252) % 30), JET_START);
  } else {
    jetAction.time = frameTime(282 + 6 * Math.min(1, jetEndTime / JET_END_TIME), JET_START);
  }
  // 噴射していないときは、炎も煙も出ていない最初のフレーム（230）にしておく
  jetFxAction.time = jetShown ? jetAction.time : 0;

  const inAir = !onGround || landTime < LAND_TIME;
  jetWeight += ((jetShown && !firing ? 1 : 0) - jetWeight) * blend;
  airWeight += ((inAir && !jetShown && !firing ? 1 : 0) - airWeight) * blend;

  // 速さに比例して脚を速くする（歩きで WALK_ANIM_RATE、走りでも RUN_ANIM_RATE まで）
  // 浮かんでいるときは流されているだけでは脚を動かさず、漕いでいる間だけ水をかく
  const walking = floating ? paddling : moveSpeed > 0.2 && onGround;
  walkWeight += ((walking ? 1 : 0) - walkWeight) * (1 - Math.exp(-10 * dt));
  walkAction.timeScale = floating ? WALK_ANIM_RATE * 0.8 : Math.min(RUN_ANIM_RATE, (moveSpeed / WALK_SPEED) * WALK_ANIM_RATE);
  const groundW = firing ? 0 : Math.max(0, 1 - airWeight - jetWeight);
  walkAction.setEffectiveWeight(groundW * walkWeight);
  idleAction.setEffectiveWeight(groundW * (1 - walkWeight));
  airAction.setEffectiveWeight(airWeight);
  jetAction.setEffectiveWeight(jetWeight);
  // あおりで機首（+Z）を上げる。X 軸まわりにマイナスで前が上がる。
  // 川に浮かんでいるときは波でゆっくり前後左右にゆれる
  floatWeight += ((floating ? 1 : 0) - floatWeight) * (1 - Math.exp(-4 * dt));
  const t = time.value;
  const swayX = floatWeight * (Math.sin(t * 1.1) * 0.05 + Math.sin(t * 2.3 + 1) * 0.02);
  const swayZ = floatWeight * (Math.sin(t * 1.3 + 2) * 0.07 + Math.sin(t * 2.9) * 0.02);
  model.rotation.x += (-jetTilt + swayX - model.rotation.x) * (1 - Math.exp(-3 * dt));
  model.rotation.z = swayZ;
  // モデルは自分の原点を中心に回るので、発射中のずらし（ロボの 1.44m 後ろが原点）も回して
  // ロボの足元を中心に傾くようにする
  if (firing) model.position.copy(fireOffset).applyEuler(model.rotation);
  else model.position.set(0, 0, 0);
  mixer.update(dt);
}

const _target = new THREE.Vector3();
const _lookDir = new THREE.Vector3();
function updateCamera() {
  player.position.copy(feet);
  player.rotation.y = heading;
  const t = time.value;
  player.position.y += floatWeight * (Math.sin(t * 1.6) * 0.05 + Math.sin(t * 2.7 + 0.5) * 0.025);

  if (!view.thirdPerson) {
    // 一人称：ふわおの目から（ロボは隠す）
    model.visible = false;
    camera.position.set(feet.x, feet.y + EYE_HEIGHT, feet.z);
    camera.rotation.set(-view.pitch, view.yaw, 0);
  } else {
    model.visible = true;
    const cp = Math.cos(view.pitch);
    _lookDir.set(-Math.sin(view.yaw) * cp, -Math.sin(view.pitch), -Math.cos(view.yaw) * cp);
    _target.set(feet.x, feet.y + CAM_TARGET_HEIGHT, feet.z);
    // 壁や屋根でカメラが隠れないよう、間に何かあれば手前に寄せる
    _d.copy(_lookDir).negate();
    const hit = cast(_target, _d, view.distance + 0.3);
    const dist = hit ? Math.max(0.6, hit.distance - 0.3) : view.distance;
    camera.position.copy(_target).addScaledVector(_d, dist);
    camera.lookAt(_target);
  }
  // 浮かんでいるときはカメラを水の中に入れない
  if (floating && camera.position.y < floatWaterY + 0.4) {
    camera.position.y = floatWaterY + 0.4;
    if (view.thirdPerson) camera.lookAt(_target);
  }
  // 発射の反動でカメラを小刻みにゆらす
  if (shake > 0.01) {
    const t = time.value * 60;
    camera.position.x += Math.sin(t * 1.7) * RECOIL_SHAKE * shake;
    camera.position.y += Math.sin(t * 2.3 + 1) * RECOIL_SHAKE * shake;
  }
  // ボスが町を攻撃したときの大きなゆれ
  if (quake > 0.01) {
    const t = time.value * 60;
    camera.position.x += Math.sin(t * 1.3) * QUAKE_SHAKE * quake;
    camera.position.y += Math.sin(t * 1.9 + 2) * QUAKE_SHAKE * quake;
    camera.position.z += Math.sin(t * 1.1 + 4) * QUAKE_SHAKE * quake * 0.6;
  }
  sky.position.copy(camera.position);
  followShadow(feet);
}

let daytime = null;
function tick(dt, active) {
  updateAmbient(active);
  // 一時停止中は時間を止める（見た目の切り替えには合わせ直す）。N を押している間は早送り
  waterUniforms.uTime.value += dt;
  updateSpray();
  if (!visit) { updateSparks(dt); updateYeast(dt); }
  time.value += dt;
  updateToast(dt);
  updateJetSound(active && !opening && !visit);   // 工房に入ったときなども止める（このあと return する場面があるので先に）
  if (opening) { updateOpening(dt, active); return; }
  if (visit) { updateVisit(dt, active); return; }
  daytime.update(active ? dt : 0, active && keys.has('KeyN'));
  if (windmill) windmill.rotation.z += WINDMILL_SPEED * dt;
  updateRuin(dt);
  updateBoss(dt, active);
  if (active) moveBoss(dt);   // 一時停止中は近づかない
  updateBreads(dt);
  updateResidents(dt);
  if (active) updateGerms(dt);
  updateTalk(dt);
  updateProgress(dt, active && !talk.active);
  updateHunger(dt, active);
  updateDoor(dt, active);
  updateSave(dt, active);
  // 工場長は、町が崩壊するまでは工房の中（町にはいない）
  const chiefRes = residents.find((r) => r.id === '0-1');
  if (chiefRes && chiefRes.state !== 'evac' && chiefRes.state !== 'gone') chiefRes.root.visible = storyStage >= CHIEF_OUT_STAGE;
  if (retreat && active) { updateRetreat(dt); releaseAll(); }   // カットインの間は操作できない（ロボは着地まで落ちる）
  if (active && boss && !bossGone && !bossAppeared && !bossIntro && !talk.active && !knockout && !retreat && storyStage === bossCfg.stage
    && !collapse && (bossAppearWait += dt) > BOSS_APPEAR_DELAY && (bossCfg.summon ? bossSummoned : townProgress() > bossCfg.appearAt)) {
    if (bossCfg.summon) startCollapse(); else startBossIntro();
  }
  if (collapse && active && !collapse.swapping) { updateCollapse(dt); releaseAll(); }
  if (finale && active && finale.phase !== 'ending') { updateFinale(dt); releaseAll(); }
  if (storyStage >= 3 && !townCollapsed) preloadCollapsed().catch(() => {});   // 崩壊した町を裏で読んでおく
  if (bossIntro && active) { updateBossIntro(dt); releaseAll(); }
  if (active && !talk.active && !knockout && !bossIntro && !collapse && !finale) { updatePlayer(dt); collideBoss(dt); }
  else moveSpeed = 0;
  collidePeople(active);
  updateAnimation(dt);
  updateRecenter(dt);
  updateCamera();
  if (retreat) retreatCamera(dt);
  if (bossIntro) bossIntroCamera(dt);
  if (collapse) collapseCamera(dt);
  if (finale) finaleCamera(dt);
}

// ---- ループ ----
const clock = new THREE.Clock();
let fpsAcc = 0, fpsFrames = 0;
// ?perf：スマホでも左上に fps と、1 フレームの計算・描画の時間（ms）、描画の回数を出す（重さを調べるとき用）
const PERF = new URLSearchParams(location.search).has('perf');
if (PERF) { document.body.classList.add('perf'); renderer.info.autoReset = false; }   // 輪郭線などの何回かの描画をまとめて数える
let perfTick = 0, perfDraw = 0, fpsReal = 0;
renderer.setAnimationLoop(() => {
  const raw = clock.getDelta(), dt = Math.min(raw, 0.05);
  const t0 = performance.now();
  if (ready) tick(dt, playing);
  const t1 = performance.now();
  if (PERF) renderer.info.reset();
  style.render();
  perfTick += t1 - t0; perfDraw += performance.now() - t1;

  fpsAcc += dt; fpsReal += raw; fpsFrames++;
  if (fpsAcc > 0.5) {
    const fps = Math.round(fpsFrames / fpsReal);
    if (PERF) {
      const info = renderer.info.render;
      hud.textContent = `${fps} fps  ·  計算 ${(perfTick / fpsFrames).toFixed(1)}ms  ·  描画 ${(perfDraw / fpsFrames).toFixed(1)}ms  ·  ${info.calls}回 ${Math.round(info.triangles / 1000)}k  ·  音 ${soundOn.bgm ? 'BGM' : '-'}/${soundOn.sfx ? '効果' : '-'}`;
    } else hud.textContent = ready ? `${daytime.clock}  ·  ${fps} fps  ·  ${style.enabled ? 'アニメ調' : '元の見た目'}  ·  x ${feet.x.toFixed(1)}  y ${feet.y.toFixed(2)}  z ${feet.z.toFixed(1)}` : '';
    fpsAcc = 0; fpsReal = 0; fpsFrames = 0; perfTick = 0; perfDraw = 0;
  }
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  style.setSize();
});

init().catch((err) => {
  console.error(err);
  statusEl.textContent = `読み込みに失敗しました: ${err.message || err}`;
});
