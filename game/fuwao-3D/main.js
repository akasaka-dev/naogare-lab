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

const START_POS = new THREE.Vector3(26, 3.6, 6.15); // アーチ橋の東側の表通り（表通りの段は高さ 3.5 前後）
const START_YAW = Math.PI / 2;                      // 西（-X）を向く → 城が見える
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
      .replace('#include <project_vertex>', '#include <project_vertex>\nvWPos = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', /* glsl */`#include <common>
        uniform float uTime;
        varying vec3 vWPos;
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
        diffuseColor.rgb *= 0.88 + 0.2 * wv;`)
      .replace('#include <normal_fragment_maps>', /* glsl */`#include <normal_fragment_maps>
        {
          float e = 0.08;
          float dx = wave(vWPos.xz + vec2(e, 0.0)) - wv;
          float dz = wave(vWPos.xz + vec2(0.0, e)) - wv;
          vec3 nW = normalize(vec3(-dx * 2.5, 1.0, -dz * 2.5));
          normal = normalize((viewMatrix * vec4(nW, 0.0)).xyz);
        }`);
  };
  mat.needsUpdate = true;
}

// ---- 読み込み ----
const overlay = document.getElementById('overlay');
const startLabel = document.getElementById('startLabel');
const statusEl = document.getElementById('status');
const progressBar = document.querySelector('#progress div');
const hud = document.getElementById('hud');
const crosshair = document.getElementById('crosshair');

const FILES = ['models/town.glb', 'models/distant.glb', 'models/pancannon.glb', 'models/germboss.glb', 'models/bread.glb', 'models/grandpa.glb', 'models/girl.glb', 'models/grandma.glb', 'models/town_ruin.glb', 'models/mayor.glb', 'models/germmini.glb', 'models/workshop.glb', 'models/chief.glb'];
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
let waterCollider = null;
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
// extraWater: 廃墟の間は隠している噴水の水など（入れない場所なのは変わらない）
function buildCollider(groups, extraWater = []) {
  const all = groups.flatMap((g) => g.children);
  collider = bvhMesh(all.filter((m) => !isWater(m.material) && !isPassThrough(m.material)));
  waterCollider = bvhMesh([...all, ...extraWater].filter((m) => isWater(m.material)));
  colliders = [collider];
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
  a.hidden.visible = true;
  a.toggles.forEach((o) => { o.visible = true; });
  a.ruin.traverse((o) => {
    if (!o.isMesh) return;
    for (const m of new Set([o.material, o.userData.pbrMaterial])) if (m) { m.transparent = true; m.depthWrite = false; }
  });
  rebuildRuinCollider();
  return true;
}

function updateRuin(dt) {
  for (const a of ruinAreas) {
    if (!a.restored || a.fade >= RUIN_TINT_FADE) continue;
    a.fade = Math.min(RUIN_TINT_FADE, a.fade + dt);
    for (const i of a.boxIdx) ruinUniforms.uRuinAmt.value[i] = 1 - a.fade / RUIN_TINT_FADE;
    if (!a.ruin.parent) continue;
    const k = Math.min(1, a.fade / RUIN_FADE);
    a.ruin.traverse((o) => {
      if (o.isMesh) for (const m of new Set([o.material, o.userData.pbrMaterial])) if (m) m.opacity = 1 - k;
    });
    if (k >= 1) {
      scene.remove(a.ruin);
      a.ruin.traverse((o) => { if (o.isMesh) o.geometry.dispose(); });
    }
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

function fire() {
  if (firing || !fireAction || knockout) return;   // 地上でも空中（ジャンプ・ジェット中）でも撃てる
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
      return { town: townProgress(), fuel, fuelMax, body, knockout,
        areas: ruinAreas.map((a, i) => `${AREA_NAMES[a.name]} ${Math.round(areaProgress(i) * 100)}% (spots ${areaGauge[i].spots.length}, out ${areaGauge[i].germs.length}, residents ${areaGauge[i].residents.length})`) };
    },
    get helps() { return helps.map((h) => [AREA_NAMES[ruinAreas[h.area].name], Math.round(h.dist || 0)]); },
    setFuel(v) { fuel = v; }, setBody(v) { body = v; }, raiseFuelMax,
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
  const ranges = JSON.parse(root.userData.clips || '{}');
  const out = {};
  for (const [name, [a, b]] of Object.entries(ranges)) out[name] = THREE.AnimationUtils.subclip(all, name, a, b, ANIM_FPS);
  return out;
}

// ---- ボス ----
// 待機（idle）をくり返し、ときどき爪たたきつけ（attack_slam）と回転ドリル突進（attack_drill）を交互に見せる。
// GB_Hit_* / GB_Hurt_* は当たり判定用の空のオブジェクト（extras に collider・radius・damage）。今はトゲの球（GB_Hit_Spikes）だけを体当たりに使う
const BOSS_IDLE_TIME = 6;   // 攻撃と攻撃のあいだの待機（秒）
const BOSS_FADE = 0.25;
let boss = null, bossMixer = null, bossActions = null;
let bossIdleTime = 0, bossAttack = null, bossNext = 'attack_slam';
function placeBoss(gltf) {
  boss = gltf.scene;
  boss.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  _o.set(BOSS_POS.x, 400, BOSS_POS.z);
  const hit = cast(_o, DOWN, 800);
  boss.position.set(BOSS_POS.x, hit ? hit.point.y : BOSS_POS.y, BOSS_POS.z);
  boss.rotation.y = BOSS_YAW;
  scene.add(boss);

  bossMixer = new THREE.AnimationMixer(boss);
  const clips = clipsFromExtras(boss.getObjectByName('GB_Root') || boss, gltf.animations);
  if (!clips.idle) return;
  bossActions = {};
  for (const [name, clip] of Object.entries(clips)) {
    const a = bossMixer.clipAction(clip);
    if (name !== 'idle') { a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; }
    bossActions[name] = a;
  }
  bossActions.idle.play();
  // 攻撃が終わったら待機へ戻す。ドリルの終わりは体が 3 回転した値だが、見た目は元の姿勢なのでそのままつなぐ
  bossMixer.addEventListener('finished', (e) => {
    if (e.action !== bossAttack) return;
    bossActions.idle.reset().play();
    bossAttack.crossFadeTo(bossActions.idle, BOSS_FADE, false);
    bossAttack = null;
    bossIdleTime = 0;
  });
}
function updateBoss(dt) {
  if (!bossMixer) return;
  if (bossActions && !bossAttack && (bossIdleTime += dt) > BOSS_IDLE_TIME) {
    const next = bossActions[bossNext];
    if (next) {
      bossAttack = next;
      next.reset().play();
      bossActions.idle.crossFadeTo(next, BOSS_FADE, false);
    }
    bossNext = bossNext === 'attack_slam' ? 'attack_drill' : 'attack_slam';
  }
  bossMixer.update(dt);
}

// ---- ボスが町へ近づく・ジェットで体当たりして押し戻す ----
// ボスは町（BOSS_TARGET）へ向かって少しずつ進み、BOSS_STOP まで来たらそこで止まる（今は着いても何も起きない）。
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
let bossSpikes = null, bossSpikeRadius = 9;
const bossVel = new THREE.Vector3();
let bossStun = 0, ramCooldown = 0, bossWobble = 0, bossWobbleTime = 0;
const _bc = new THREE.Vector3();
const _bd = new THREE.Vector3();
function setupBossMove() {
  bossSpikes = boss.getObjectByName('GB_Hit_Spikes');
  if (bossSpikes?.userData.radius) bossSpikeRadius = bossSpikes.userData.radius;
}
// 町の真ん中からボスまでの水平距離
function bossDistance() {
  return Math.hypot(boss.position.x - BOSS_TARGET.x, boss.position.z - BOSS_TARGET.z);
}
function moveBoss(dt) {
  if (!boss) return;
  const pos = boss.position;
  _bd.set(BOSS_TARGET.x - pos.x, 0, BOSS_TARGET.z - pos.z);
  const dist = _bd.length();
  _bd.divideScalar(dist || 1);
  // 町へ向かって進む（押し戻されている間と、そのあとしばらくは止まる）
  if ((bossStun -= dt) <= 0 && dist > BOSS_STOP) pos.addScaledVector(_bd, Math.min(BOSS_CREEP * dt, dist - BOSS_STOP));
  pos.addScaledVector(bossVel, dt);
  bossVel.multiplyScalar(Math.exp(-RAM_PUSH_DAMP * dt));
  // 押し戻せる範囲
  const d = bossDistance();
  if (d > BOSS_FAR) { pos.x = BOSS_TARGET.x + (pos.x - BOSS_TARGET.x) * BOSS_FAR / d; pos.z = BOSS_TARGET.z + (pos.z - BOSS_TARGET.z) * BOSS_FAR / d; }
  // 地面の高さに合わせる（斜面を上り下りする）
  _o.set(pos.x, 400, pos.z);
  const hit = cast(_o, DOWN, 800);
  if (hit) pos.y += (hit.point.y - pos.y) * (1 - Math.exp(-4 * dt));
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
function collideBoss(dt) {
  if (!bossSpikes) return;
  ramCooldown -= dt;
  bossSpikes.getWorldPosition(_bc);
  // 体は地面から浮いているので、球を地面まで縦にのばした形（カプセル）にして、低く飛んでも当たるようにする
  const low = boss.position.y;
  if (_bc.y > low) _bc.y = THREE.MathUtils.clamp(feet.y + ROBOT_HEIGHT / 2, low, _bc.y);
  _bd.set(feet.x - _bc.x, feet.y + ROBOT_HEIGHT / 2 - _bc.y, feet.z - _bc.z);
  const d = _bd.length(), reach = bossSpikeRadius + RADIUS;
  if (d >= reach) return;
  _bd.divideScalar(d || 1);
  // 体当たりの強さは、ボスへ向かう速さ
  const toward = -(jetVel.x * _bd.x + jetVel.z * _bd.z);
  if (ramCooldown <= 0 && toward > RAM_MIN_SPEED) {
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
// 町人が助けを呼んだ区画に、その区画の場所（GERM_TEST の場所を優先し、足りない分は区画の中の地面）へ出てくる
const GERM_SPEED = 1.1;        // 跳ねて進む速さ（m/秒）
const GERM_SEE = 25;           // この距離の町人をねらう
// 体の中心の高さ（GM_Body_Pivot）と体の半径（GM_Hurt_Body の radius）はモデルから読む。下は読めなかったときの値
let germBody = 0.8, germRadius = 0.4;
const GERM_STICK = 0.5;        // 町人の体の表面からこの距離まで来たら、くっつく
const GERM_HIT = 0.75;         // ジェット体当たりが当たる距離（ロボの体の中心の縦の線から、体の中心まで）
// ジェットで飛んでいるロボは地面から 4m ほどの高さなので、真下を通り過ぎた子バイ菌にも当たるようにする（仮）
const GERM_HIT_BELOW = 4.5;
const GERM_TEST = [
  [26, 6], [12, 7.5], [-2, 7], [36, 8],   // 表通り（スタート地点、パン屋の前、川の東）
  [-12, 15], [-22, 13],                   // 広場
  [12, 30],                               // 南の裏通り
  [12, -12], [30, -10],                   // 北の裏通り
  [-14, -30],                             // 奥の段（パン工房の段）
];
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
function updateGerms(dt) {
  for (const g of germs) {
    const pos = g.root.position;
    if (g.state === 'defeat') { g.mixer.update(dt); continue; }
    // ねらっていた町人が家に入ったら、はがれて別の人をさがす
    if (g.target && !g.target.root.visible) { g.target = null; g.state = 'seek'; }
    if (!g.target) g.target = germTarget(g);
    const r = g.target;
    if (g.state === 'seek') {
      if (!r) { playGerm(g, 'idle'); g.mixer.update(dt); continue; }
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
      } else {
        g.root.rotation.y = turnToward(g.root.rotation.y, Math.atan2(_rd.x, _rd.z), 1 - Math.exp(-6 * dt));
        _rd.divideScalar(dist);
        // 壁や石垣があれば、その手前で跳ねたまま止まる（道をさがすのはこれから）
        _o.set(pos.x, pos.y + germBody, pos.z);
        const wall = cast(_o, _rd, germRadius + 0.2);
        if (!wall || !hitNormal(wall, _rd)) {
          pos.addScaledVector(_rd, Math.min(GERM_SPEED * dt, dist));
          const gy = groundBelow(pos, 1);   // 跳ねるので、少しの段差なら越える
          if (gy !== null) pos.y += (gy - pos.y) * (1 - Math.exp(-10 * dt));
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
      if (dy > -GERM_HIT_BELOW && dy < ROBOT_HEIGHT + germRadius && Math.hypot(pos.x - feet.x, pos.z - feet.z) < GERM_HIT + germRadius + RADIUS) {
        g.state = 'defeat';
        g.target = null;
        playGerm(g, 'defeat');
        shake = Math.max(shake, 0.5);
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
//   ふわおのまわりに、呼んでいる区画の小バイ菌の方向を 3D の矢印で出す。全部倒すと声は止む
const HELP_MAX = 3;
const HELP_FIRST = 2;           // 遊び始めてから最初に呼ばれるまで（秒）
const HELP_GAP = 6;             // 次の区画が呼ぶまでの間（秒）
const HELP_COLORS = [0xe8463a, 0x3a8fe8, 0xb558d8];   // 矢印とメーターの印の色（呼んでいる枠ごと）
const HELP_WORDS = ['たすけてー！ ばい菌が来たー！', 'だれかー！ ばい菌だー！', 'たすけてー！ 食べ物が腐っちゃう！'];
// 燃料の量は、いちばん大きくしたタンクの満タンを 1 とする
const FUEL_MAX_START = 1 / 3;   // 最初のタンクの大きさ
const FUEL_MAX_STEP = 1 / 6;    // トッピング 1 つで大きくなる分（4 つで最大）
const FUEL_JET = 1 / 15;        // 噴射で減る燃料（1 秒あたり。最初のタンクで 5 秒、最大のタンクで 15 秒噴ける）
const FUEL_RAM = 0.04;          // ボスに体当たりすると減る燃料
const FUEL_REGEN = 1 / 30;      // 地面に立っている間に戻る燃料（1 秒あたり。最初のタンクなら空から満タンまで 10 秒）
const FUEL_MIN_START = 0.02;    // これより少ないと噴射を始められない
const BODY_PER_SHOT = 0.05;     // パン 1 個で削れるからだ（満タンで 20 発）
const WORKSHOP_FRONT = new THREE.Vector3(-7.7, 12, -25.2);   // パン工房の扉（町の中、北の奥の段）の前
const WORKSHOP_REFILL_R = 6;    // 扉の前のこの距離の中で地面にいると補給される
const WORKSHOP_REFILL = 0.5;    // 補給の速さ（1 秒あたり、燃料とからだの両方）
let fuelMax = FUEL_MAX_START, fuel = fuelMax, body = 1;
let knockout = null;            // からだが 0 になって、パン工房へ戻されている途中 { t, moved }
const areaGauge = [];           // 区画ごと { spots: [小バイ菌の出る場所], germs: [出てきた小バイ菌], residents: [町人], called, done }
const helps = [];               // 助けを呼んでいる区画 { area, slot, arrow }
let helpWait = HELP_FIRST;
const metersEl = document.getElementById('meters');
const toastEl = document.getElementById('toast');
let toastTime = 0, refilling = false;

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
// 区画の中の、歩ける地面の上の場所をさがす（毎回同じ場所になるように、決まった乱数で）
function areaSpot(a, rand, avoid) {
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
    if (avoid.some((p) => Math.hypot(p.x - x, p.z - z) < 6)) continue;
    return { x, z };
  }
  return null;
}
function setupProgress() {
  let seed = 20261105;
  const rand = () => {   // mulberry32
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  ruinAreas.forEach(() => areaGauge.push({ spots: [], germs: [], residents: [], called: false, done: false }));
  for (const [x, z] of GERM_TEST) {
    const i = areaAt(x, z);
    if (i >= 0 && areaGauge[i].spots.length < GERMS_PER_AREA) areaGauge[i].spots.push({ x, z });
  }
  ruinAreas.forEach((a, i) => {
    const spots = areaGauge[i].spots;
    while (spots.length < GERMS_PER_AREA) {
      const p = areaSpot(a, rand, spots);
      if (!p) break;
      spots.push(p);
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
function showToast(text) {
  toastEl.textContent = text;
  toastEl.classList.add('on');
  toastTime = 3;
}

// ---- 助けを呼ぶ声と、その方向の 3D の矢印 ----
const ARROW_LIFT = 0.9;         // 矢印の輪の高さ（ロボの頭の上から）
const ARROW_RING = 1.0;         // ロボの真上から、呼んでいる方向へずらす距離
const ARROW_SIZE = 0.65;        // 矢印の大きさ（1 で長さ 0.86m）
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
function residentName(r) {
  return (TALKS[r.id] || TALKS[r.kindName])?.name || '町の人';
}
// まだ呼んでいない区画のうち、ふわおにいちばん近い区画が助けを呼ぶ
// （目の前にいきなり出てこないよう、小バイ菌の場所が HELP_NEAR より近い区画は、ほかになければ選ぶ）
const HELP_NEAR = 12;
function startHelp() {
  let best = -1, bestD = Infinity;
  areaGauge.forEach((g, i) => {
    if (g.called || g.done || !g.spots.length) return;
    const near = Math.min(...g.spots.map((p) => Math.hypot(p.x - feet.x, p.z - feet.z)));
    const d = near < HELP_NEAR ? near + 1000 : near;
    if (d < bestD) { best = i; bestD = d; }
  });
  if (best < 0) return false;
  const gauge = areaGauge[best];
  gauge.called = true;
  for (const p of gauge.spots) {
    const g = spawnGerm(p.x, p.z);
    g.area = best;
    gauge.germs.push(g);
  }
  const used = helps.map((h) => h.slot);
  const slot = [0, 1, 2].find((s) => !used.includes(s));
  helps.push({ area: best, slot, arrow: makeArrow(HELP_COLORS[slot]) });
  const caller = gauge.residents[Math.floor(Math.random() * gauge.residents.length)];
  const words = HELP_WORDS[Math.floor(Math.random() * HELP_WORDS.length)];
  const name = AREA_NAMES[ruinAreas[best].name];
  showToast(caller ? `${name}の${residentName(caller)}「${words}」` : `${name}から助けを呼ぶ声！「${words}」`);
  return true;
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
    scene.remove(h.arrow);
    h.arrow.traverse((o) => { if (o.isMesh) o.material.dispose(); });
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
    h.arrow.visible = active && !!g;
    if (!g) continue;
    _hd.set(g.root.position.x, g.root.position.y + germBody, g.root.position.z).sub(_ha);
    h.dist = _hd.length();
    _hd.divideScalar(h.dist || 1);
    const flat = Math.hypot(_hd.x, _hd.z) || 1;
    h.arrow.position.set(_ha.x + _hd.x / flat * ARROW_RING, _ha.y + bob, _ha.z + _hd.z / flat * ARROW_RING);
    h.arrow.quaternion.setFromUnitVectors(_hy, _hd);
  }
}

function useFuel(amount) { fuel = Math.max(0, fuel - amount); }
// トッピングを手に入れたときに呼ぶ。タンクが大きくなり、増えた分も満たす
function raiseFuelMax(step = FUEL_MAX_STEP) {
  const before = fuelMax;
  fuelMax = Math.min(1, fuelMax + step);
  fuel = Math.min(fuelMax, fuel + (fuelMax - before));
}
function shaveBody() {
  body = Math.max(0, body - BODY_PER_SHOT);
  if (body <= 0 && !knockout) knockout = { t: -0.8, moved: false };   // 撃ったパンが飛んでいくのを少し見せてから暗転
}
function updateProgress(dt, active) {
  // 区画のゲージが満タンになったら、区画を元に戻す
  areaGauge.forEach((g, i) => {
    if (g.done || !(g.spots.length + g.residents.length) || areaProgress(i) < 1) return;
    g.done = true;
    restoreArea(ruinAreas[i].name);
    showToast(`${AREA_NAMES[ruinAreas[i].name] || ruinAreas[i].name}が元に戻った！`);
  });

  if (active && !knockout) {
    if (jetting) {
      useFuel(FUEL_JET * dt);
      if (fuel <= 0) { jetting = false; jetEndTime = 0; }
    } else if (onGround) fuel = Math.min(fuelMax, fuel + FUEL_REGEN * dt);
    // パン工房の前で補給（焼き直し）
    refilling = onGround && Math.hypot(feet.x - WORKSHOP_FRONT.x, feet.z - WORKSHOP_FRONT.z) < WORKSHOP_REFILL_R
      && Math.abs(feet.y - WORKSHOP_FRONT.y) < 3;
    if (refilling) {
      fuel = Math.min(fuelMax, fuel + WORKSHOP_REFILL * dt);
      body = Math.min(1, body + WORKSHOP_REFILL * dt);
    }
  }

  // からだが 0：暗転 → パン工房の前へ → 明るくなる
  if (knockout) {
    knockout.t += dt;
    if (knockout.t >= 0) fadeEl.classList.add('on');
    if (!knockout.moved && knockout.t > FADE_TIME) {
      knockout.moved = true;
      feet.copy(groundPoint(WORKSHOP_FRONT));
      velY = 0; jetting = false; jetVel.set(0, 0, 0); recoilVel.set(0, 0, 0);
      heading = 0;                     // 扉に背を向けて、町（+Z）のほうを向く
      view.yaw = Math.PI;
      view.pitch = view.thirdPerson ? 0.25 : 0;
      snapToGround(true);
      fuel = fuelMax; body = 1;
      showToast('パン工房で焼き直してもらった！');
    }
    if (knockout.t > FADE_TIME + 0.6) { fadeEl.classList.remove('on'); knockout = null; }
  }

  updateHelps(dt, active);
  if (toastTime > 0 && (toastTime -= dt) <= 0) toastEl.classList.remove('on');
  drawMeters();
}
let drawnMeters = '';
function drawMeters() {
  const here = areaAt(feet.x, feet.z);
  const town = townProgress();
  const helpText = helps.map((h) => `${h.slot}:${h.area}:${Math.round((h.dist || 0) / 5) * 5}`).join(',');
  const key = `${town.toFixed(3)}|${fuel.toFixed(3)}|${fuelMax}|${body.toFixed(3)}|${here}|${here >= 0 ? areaProgress(here).toFixed(3) : ''}|${refilling}|${helpText}`;
  if (key === drawnMeters) return;
  drawnMeters = key;
  const set = (name, v) => { metersEl.querySelector(`.meter-${name} .fill`).style.transform = `scaleX(${v})`; };
  set('town', town);
  set('fuel', fuel);
  set('body', body);
  metersEl.querySelector('.meter-town .num').textContent = `${Math.round(town * 100)}%`;
  // 燃料のバーは最大のタンクの長さで、まだ大きくなっていない分は斜線で埋めておく
  metersEl.querySelector('.meter-fuel .cap').style.width = `${(1 - fuelMax) * 100}%`;
  metersEl.querySelector('.meter-fuel').classList.toggle('low', fuel < fuelMax * 0.2);
  metersEl.querySelector('.meter-body').classList.toggle('low', body < 0.2);
  const areaEl = metersEl.querySelector('.meter-area');
  if (refilling) areaEl.textContent = 'パン工房：補給中（燃料とからだが戻る）';
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
const BREAD_LIFT = 3;         // 砲身はほぼ水平なので、少し上向きに打ち出して山なりに飛ばす（m/秒）
const BREAD_GRAVITY = 6;      // ふわふわなので弱めの重力
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
  const dir = new THREE.Vector3(0, 1, 0).applyQuaternion(_bq);
  const b = {
    root, mixer, state: 'fly', time: 0,
    vel: dir.multiplyScalar(BREAD_SPEED).setY(dir.y + BREAD_LIFT),
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
const EAT_TIME = (100 - 60) / ANIM_FPS;
const _bstep = new THREE.Vector3();
function updateBreads(dt) {
  for (const b of breads) {
    b.time += dt;
    if (b.state === 'fly' && catchBread(b)) {
      // 人に受け止められた
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
  girl: { speed: 0.46, eatPos: new THREE.Vector3(0, 0.78, 0.46), radius: 0.25, height: 1.2, hungry: true, smileAt: 32 },
};
// id は会話の台本（talks.js）を引く名前
// house があれば、夜はその家に帰る：out の時刻（[出てくる, 帰る]）になったら way を通って戸口 door まで歩き、
// 家に入って見えなくなる。朝は戸口から出てきて、way を逆にたどって home へ戻る
// おばあちゃんと女の子は、表通りの TH_House_10（バルコニーの家）に一緒に住んでいる
const GRANDMA_DOOR = new THREE.Vector3(6.05, 0, 9.45);
const RESIDENTS = [
  { id: 'grandpa_east', kind: 'grandpa', home: new THREE.Vector3(15, 0, 7.5), radius: 5 },   // スタート地点の西、表通り
  { id: 'grandpa_west', kind: 'grandpa', home: new THREE.Vector3(2, 0, 6), radius: 5 },
  { id: 'grandma', kind: 'grandma', home: new THREE.Vector3(5, 0, 7), radius: 5,     // 西のおじいちゃんの近く
    house: { door: GRANDMA_DOOR, way: [], out: [6.5, 18.5] } },
  { id: 'girl', kind: 'girl', home: new THREE.Vector3(19, 0, 6), radius: 3,          // 橋の上。帰りは橋を西へ渡る
    house: { door: GRANDMA_DOOR, way: [new THREE.Vector3(15, 0, 6.3), new THREE.Vector3(8, 0, 8.3)], out: [7, 18] } },
  { id: 'mayor', kind: 'mayor', home: new THREE.Vector3(-11, 0, 15), radius: 2.5 },   // 広場、噴水の東側
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
  for (const { id, kind, home, radius, house } of RESIDENTS) {
    const gltf = models[kind], k = RESIDENT_KINDS[kind];
    const clip = (name) => THREE.AnimationClip.findByName(gltf.animations, name);
    const root = cloneSkinned(gltf.scene);
    root.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; o.frustumCulled = false; } });
    _o.set(home.x, 400, home.z);
    const hit = cast(_o, DOWN, 800);
    home.y = hit ? hit.point.y : home.y;
    root.position.copy(home);
    root.rotation.y = Math.random() * Math.PI * 2;
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
    };
    // ふだんの待機。おなかがすいている間は Hungry
    if (k.hungry && clip('Hungry')) r.idle = mixer.clipAction(clip('Hungry'));
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
    residents.push(r);
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
function updateResidents(dt) {
  for (const r of residents) {
    const pos = r.root.position;
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
    r.walk.setEffectiveWeight(r.oneShot ? 0 : r.walkWeight);
    r.idle.setEffectiveWeight(r.oneShot ? 0 : 1 - r.walkWeight);
    r.walk.timeScale = walking ? speed / r.kind.speed : 1;
    // Eat で顔を上げる所から笑顔
    if (r.kind.smileAt && r.oneShot === r.eat && r.eat.time >= r.kind.smileAt / ANIM_FPS) setFace(r, 'smile');
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
    if (!tryNudge(r, dx * overlap, dz * overlap)) moveHorizontal(_push.set(-dx * overlap, 0, -dz * overlap));
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
  const [town, distant, pancannon, germboss, bread, grandpa, girl, grandma, townRuin, mayor, germmini, workshop, chief] = await Promise.all(FILES.map(load));
  statusEl.textContent = 'シーンを組み立て中…';
  await new Promise((r) => setTimeout(r, 0));

  windmill = takeWindmillRotor(town.scene);
  scene.add(windmill);
  const townMats = setupRuin(town.scene, townRuin.scene);
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
  buildCollider([townMerged, distantMerged], ruinAreas.flatMap((a) => a.hidden.children));
  rebuildRuinCollider();

  // 既定シーン（PanCannon）のみ。glb 内の Bakery シーンは distant の重複なので使わない
  model = pancannon.scene;
  model.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
  player.add(model);
  scene.add(player);
  mixer = new THREE.AnimationMixer(model);
  setupAnimations(pancannon.animations);
  placeBoss(germboss);
  setupBossMove();
  setupBread(bread);
  placeResidents({ grandpa, girl, grandma, mayor });
  setupGerms(germmini);   // 町人のそばに置くので、町人のあと
  setupProgress();        // 区画ごとの小バイ菌と町人を数える（足りない区画には小バイ菌を足す）

  // 夜にふわおのまわりを照らすランプ（昼は明るさ 0。ライトの数が変わると全部のシェーダーを作り直すので、出しっぱなしにする）
  const lamp = new THREE.PointLight(lin(1.0, 0.72, 0.42), 0, 14, 2);
  lamp.position.copy(LAMP_POS);
  player.add(lamp);
  playerLamp = lamp;
  setupOpening(workshop, mayor, chief);
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
  startLabel.textContent = `${TAP}してはじめる`;
  startLabel.classList.remove('disabled');
  ready = true;
}

// ---- オープニング（パン工房の中で、ロボに乗っていないふわおと町長が話す） ----
// スタートを押すと、まずパン工房の中（workshop.glb）の全体を見せてから、台本 TALKS.opening の会話になる。
// せりふの who（mayor / fuwao）で、吹き出しとカメラがその人に向く。話し終わったら暗転して町（ロボに乗った状態）へ。
// 部屋は町とは別の場所（WORKSHOP_POS、町の地面のずっと下）に置き、終わったら片づける。
// 明かりは夜用のランプを部屋の天井へ移して使う（ライトを増やすと、町の全部のシェーダーを作り直すことになるため）。
// ?skip で飛ばせる
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
  if (o.phase === 'intro' && o.t > OPENING_INTRO) { o.phase = 'talk'; talk.open(TALKS.opening); }
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
  if (o.phase === 'talk' || o.phase === 'fadeout') {
    openingShot(sl?.who, jumping, sl?.shot);
  } else {
    // 入口から部屋の全体を広く見せ、少し止まってから、最初に話す町長のカメラへ寄っていく
    openingShot(null);
    _oc.y += 0.3;
    const k = o.phase === 'intro' ? Math.min(1, Math.max(0, (o.t - OPENING_HOLD) / (OPENING_INTRO - OPENING_HOLD))) : 0;
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
// 話し終わったら暗転して町へ
function finishOpening() {
  opening.phase = 'fadeout';
  opening.t = 0;
  fadeEl.classList.add('on');
}
function endOpening() {
  opening = null;
  document.body.classList.remove('opening');
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
    if (r.root.position.distanceTo(feet) > TALK_NEAR || r.state === 'eat' || !r.root.visible) continue;
    const p = screenOf(r, r.height * 0.6);
    if (!p) continue;
    const d = Math.hypot(p.x - cx, p.y - cy);
    if (d < lim && d < bestD && inSight(r)) { best = r; bestD = d; }
  }
  return best;
}
function startTalk(r) {
  if (!r || opening || talk.active || !onGround || floating || jetting) return;
  const script = TALKS[r.id] || TALKS[r.kindName];
  if (!script) return;
  if (r.bread) { r.bread.claimedBy = null; r.bread = null; }
  r.route = r.afterRoute = null;   // 家へ帰る途中なら、話し終わってから帰り直す
  r.state = 'talk';
  talkWith = r;
  keys.clear();
  touch.reset();
  talk.open(script);
}
function advanceTalk() {
  if (!talk.advance()) return;
  if (opening) { finishOpening(); return; }
  talkWith.state = 'idle';
  talkWith.wait = RES_IDLE[0];
  talkWith = null;
}
let hintTarget = null;
function updateTalk(dt) {
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
  keys.clear();
  touch.reset();
}

overlay.addEventListener('click', () => {
  if (!ready) return;
  if (dragLook) { play(); return; }
  try { document.body.requestPointerLock()?.catch?.(() => {}); } catch { /* 非対応 */ }
  setTimeout(() => {
    if (document.pointerLockElement) return;
    dragLook = true;
    play();
  }, 300);
});
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
  if (dragLook && playing && e.code === 'Escape') { pause(); return; }
  if (playing && (talk.active || opening)) {   // 会話中とオープニング中は、会話を進めるキーだけ
    if (e.code === 'Space' || e.code === 'Enter') { e.preventDefault(); if (!e.repeat) advanceTalk(); }
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

// カメラをロボの正面の向き（ロボの後ろから、ロボが向いている方向を見る）へ回す
let recentering = false;
function recenterCamera() { recentering = view.thirdPerson; }
function updateRecenter(dt) {
  if (!recentering) return;
  const target = heading + Math.PI;
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
window.addEventListener('contextmenu', (e) => { if (playing) e.preventDefault(); releaseAll(); });

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

function respawn() {
  feet.copy(START_POS);
  velY = 0;
  jetting = false;
  jetVel.set(0, 0, 0);
  view.yaw = START_YAW;
  view.pitch = view.thirdPerson ? 0.25 : 0;
  heading = START_YAW + Math.PI;
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

// 横方向の移動：壁に当たったら壁に沿って滑らせる
const PROBE_HEIGHTS = [STEP_HEIGHT + 0.05, 1.0, 1.55];
// 浮かんでいるときは水面より下にあるもの（滝の縁の石など）に引っかからず、上をすべっていく
const FLOAT_PROBE_HEIGHTS = [FLOAT_DRAFT + 0.05, 1.0, 1.55];
const probeHeights = () => (floating ? FLOAT_PROBE_HEIGHTS : PROBE_HEIGHTS);
function hitNormal(hit, dir) {
  if (Math.abs(hit.face.normal.y) > 0.6) return null;   // 床や登れる斜面は壁扱いしない
  _n.copy(hit.face.normal).setY(0);
  if (_n.lengthSq() < 1e-6) return null;      // 床・天井は無視
  _n.normalize();
  if (_n.dot(dir) > 0) _n.negate();           // 両面ポリゴンなので向きをそろえる
  return _n;
}

function moveHorizontal(delta) {
  for (let iter = 0; iter < 3; iter++) {
    const len = delta.length();
    if (len < 1e-6) return;
    _d.copy(delta).divideScalar(len);
    let blocked = false;
    for (const h of probeHeights()) {
      _o.set(feet.x, feet.y + h, feet.z);
      const hit = cast(_o, _d, len + RADIUS);
      if (!hit) continue;
      const n = hitNormal(hit, _d);
      if (!n) continue;
      // 壁の手前まで進み、残りは壁に沿った成分だけ残す
      const allowed = Math.max(0, hit.distance - RADIUS);
      feet.addScaledVector(_d, allowed);
      delta.addScaledVector(_d, -allowed);
      delta.addScaledVector(n, -delta.dot(n));
      blocked = true;
      break;
    }
    if (!blocked) { feet.add(delta); return; }
  }
}

// 角などでめり込んだときに押し戻す
const RADIAL = Array.from({ length: 8 }, (_, i) => new THREE.Vector3(Math.cos(i * Math.PI / 4), 0, Math.sin(i * Math.PI / 4)));
function pushOut() {
  for (const h of probeHeights()) {
    for (const dir of RADIAL) {
      _o.set(feet.x, feet.y + h, feet.z);
      const hit = cast(_o, dir, RADIUS);
      if (!hit) continue;
      const n = hitNormal(hit, dir);
      if (n) feet.addScaledVector(n, RADIUS - hit.distance);
    }
  }
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

function updatePlayer(dt) {
  // カメラの向きを基準に移動方向を決める
  _fwd.set(-Math.sin(view.yaw), 0, -Math.cos(view.yaw));
  _right.set(Math.cos(view.yaw), 0, -Math.sin(view.yaw));
  _move.set(0, 0, 0);
  if (!firing) {
    if (keys.has('KeyW') || keys.has('ArrowUp')) _move.add(_fwd);
    if (keys.has('KeyS') || keys.has('ArrowDown')) _move.sub(_fwd);
    if (keys.has('KeyD') || keys.has('ArrowRight')) _move.add(_right);
    if (keys.has('KeyA') || keys.has('ArrowLeft')) _move.sub(_right);
  }
  // スマホのスティック：倒した向きへ。大きく倒すと走り、少しだけならゆっくり歩く
  const { stick } = touch;
  let stickRun = false, stickScale = 1;
  if (!firing && stick.mag > 0) {
    _move.addScaledVector(_fwd, -stick.y).addScaledVector(_right, stick.x);
    stickRun = stick.mag > STICK_RUN;
    stickScale = stickRun ? 1 : Math.max(0.4, stick.mag / STICK_RUN);
  }
  const fast = keys.has('ShiftLeft') || keys.has('ShiftRight') || stickRun;
  const speed = floating ? (fast ? PADDLE_SPEED_FAST : PADDLE_SPEED) : fast ? RUN_SPEED : WALK_SPEED;
  paddling = floating && !jetting && _move.lengthSq() > 0;
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
  moveHorizontal(_move);
  pushOut();

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
  if (onGround && !firing && space && !jumpLocked) { velY = JUMP_SPEED; onGround = false; }
  else if (!onGround && spacePressed && !jetting && fuel > FUEL_MIN_START) { jetting = true; jetTime = 0; jetSpeed = moveSpeed; }
  if (jetting && !space) { jetting = false; jetEndTime = 0; }

  const prevY = feet.y;
  if (jetting) {
    // 噴射の推力でほぼ水平に飛ぶ。長く噴かして速くなるほど、あおられて上昇していく
    jetTime += dt;
    const t = THREE.MathUtils.smoothstep(jetTime, JET_RISE_DELAY, JET_RISE_DELAY + JET_RISE_TIME);
    const lift = t * JET_RISE_MAX * (jetSpeed / JET_SPEED);
    const tooHigh = ground !== null && feet.y - ground > JET_MAX_ALT;
    const target = tooHigh ? 0 : lift - JET_SINK * (1 - t);
    velY += (target - velY) * (1 - Math.exp(-3 * dt));
    jetTilt = JET_TILT * (tooHigh ? 0 : lift / JET_RISE_MAX);
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
    if (feet.y <= floor + snap) {
      if (!onGround) landTime = 0;
      feet.y = floor;
      velY = 0;
      onGround = true;
      // 噴射したまま着地したら、Space を一度離すまではジャンプしない
      if (jetting) { jetting = false; jetEndTime = 0; jumpLocked = true; }
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

function updateAnimation(dt) {
  if (!walkAction) return;
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
  sky.position.copy(camera.position);
  followShadow(feet);
}

let daytime = null;
function tick(dt, active) {
  // 一時停止中は時間を止める（見た目の切り替えには合わせ直す）。N を押している間は早送り
  waterUniforms.uTime.value += dt;
  time.value += dt;
  if (opening) { updateOpening(dt, active); return; }
  daytime.update(active ? dt : 0, active && keys.has('KeyN'));
  if (windmill) windmill.rotation.z += WINDMILL_SPEED * dt;
  updateRuin(dt);
  updateBoss(dt);
  if (active) moveBoss(dt);   // 一時停止中は近づかない
  updateBreads(dt);
  updateResidents(dt);
  if (active) updateGerms(dt);
  updateTalk(dt);
  updateProgress(dt, active && !talk.active);
  if (active && !talk.active && !knockout) { updatePlayer(dt); collideBoss(dt); }
  else moveSpeed = 0;
  collidePeople(active);
  updateAnimation(dt);
  updateRecenter(dt);
  updateCamera();
}

// ---- ループ ----
const clock = new THREE.Clock();
let fpsAcc = 0, fpsFrames = 0;
renderer.setAnimationLoop(() => {
  const dt = Math.min(clock.getDelta(), 0.05);
  if (ready) tick(dt, playing);
  style.render();

  fpsAcc += dt; fpsFrames++;
  if (fpsAcc > 0.5) {
    hud.textContent = ready ? `${daytime.clock}  ·  ${Math.round(fpsFrames / fpsAcc)} fps  ·  ボスまで ${Math.round(bossDistance())}m  ·  ${style.enabled ? 'アニメ調' : '元の見た目'}  ·  x ${feet.x.toFixed(1)}  y ${feet.y.toFixed(2)}  z ${feet.z.toFixed(1)}` : '';
    fpsAcc = 0; fpsFrames = 0;
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
