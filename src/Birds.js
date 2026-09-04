import * as THREE from 'three';

// Bird Demo V1 — three deterministic, procedurally-built gulls flying a fixed,
// looping 15s path high over the sea. Everything here is additive: nothing in
// this file touches Ocean/Post/Clouds, and it only ever adds meshes to the
// scene it's given. No textures, no external models, no Math.random() at
// runtime — every per-bird variation is derived once, at construction time,
// from a seeded PRNG so a fixed seed always reproduces the same flight.

const LOOP_SECONDS = 15;

// Deterministic PRNG (mulberry32) — used only during construction to derive
// each bird's fixed config. Never called again after setup.
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(e0, e1, x) {
  const t = THREE.MathUtils.clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

// ---------------------------------------------------------------------------
//  Shared geometry — a low-poly, silhouette-first gull. Built once, reused
//  (shared, not cloned) across all three birds; only per-bird transforms
//  differ. Bird's rest-pose forward is -Z (matches Object3D.lookAt).
// ---------------------------------------------------------------------------
function makeWingShape(length, chord) {
  // Spanwise (x: 0..length) / chordwise (z: swept-back) outline — a shallow
  // gull-wing crescent, not a plain triangle: wide at the root, swept back,
  // tapering to a point at the tip.
  const s = new THREE.Shape();
  s.moveTo(0, chord * 0.38);
  s.lineTo(length * 0.62, chord * 0.16);
  s.lineTo(length, chord * 0.03);
  s.lineTo(length * 0.82, -chord * 0.14);
  s.lineTo(length * 0.42, -chord * 0.42);
  s.lineTo(0, -chord * 0.26);
  s.closePath();
  const geo = new THREE.ShapeGeometry(s);
  geo.rotateX(-Math.PI / 2); // lay flat: shape-Y -> world-Z (chordwise fore/aft)
  geo.computeVertexNormals();
  return geo;
}

function makeTailGeometry(width, length) {
  const s = new THREE.Shape();
  s.moveTo(-width * 0.5, 0);
  s.lineTo(width * 0.5, 0);
  s.lineTo(width * 0.32, length);
  s.lineTo(0, length * 0.6);
  s.lineTo(-width * 0.32, length);
  s.closePath();
  const geo = new THREE.ShapeGeometry(s);
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

function buildSharedParts() {
  const bodyGeo = new THREE.SphereGeometry(1, 8, 6);
  bodyGeo.scale(0.24, 0.22, 0.85);

  const headGeo = new THREE.SphereGeometry(1, 8, 6);
  headGeo.scale(0.17, 0.16, 0.2);

  const wingGeo = makeWingShape(1.05, 0.5);
  const tailGeo = makeTailGeometry(0.32, 0.42);

  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xcdd2d4,
    roughness: 0.85,
    metalness: 0.0,
    flatShading: true,
  });
  const wingMat = new THREE.MeshStandardMaterial({
    color: 0xc4c9cc,
    roughness: 0.85,
    metalness: 0.0,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  return { bodyGeo, headGeo, wingGeo, tailGeo, bodyMat, wingMat };
}

function buildGull(parts) {
  const root = new THREE.Group();

  const body = new THREE.Mesh(parts.bodyGeo, parts.bodyMat);
  root.add(body);

  const head = new THREE.Mesh(parts.headGeo, parts.bodyMat);
  head.position.set(0, 0.05, -0.92);
  root.add(head);

  const tail = new THREE.Mesh(parts.tailGeo, parts.wingMat);
  tail.position.set(0, 0.0, 0.78);
  root.add(tail);

  // Wing pivots sit at the shoulder; rotating them about their local Z axis
  // (the fore/aft axis) lifts/drops the wingtip — a natural flap hinge.
  const leftPivot = new THREE.Group();
  leftPivot.position.set(0.2, 0.06, 0.02);
  const leftWing = new THREE.Mesh(parts.wingGeo, parts.wingMat);
  leftPivot.add(leftWing);
  root.add(leftPivot);

  const rightPivot = new THREE.Group();
  rightPivot.position.set(-0.2, 0.06, 0.02);
  const rightWing = new THREE.Mesh(parts.wingGeo, parts.wingMat);
  rightWing.scale.x = -1; // mirror the shared wing geometry
  rightPivot.add(rightWing);
  root.add(rightPivot);

  return { root, leftPivot, rightPivot };
}

// ---------------------------------------------------------------------------
//  Per-bird deterministic config + flight curve
// ---------------------------------------------------------------------------
function makeBirdConfig(index, rand) {
  const altitude = 15 + rand() * 6 + index * 0.6;
  // World Z is in front of the Bird Demo camera (which looks out toward +Z,
  // away from the island) — birds start closer and recede further away.
  const zStart = 95 + rand() * 15;
  const zEnd = zStart + 30 + rand() * 20;
  const jitterA = (rand() - 0.5) * 3.0;
  const jitterB = (rand() - 0.5) * 2.4;
  const jitterC = (rand() - 0.5) * 2.0;

  // X span is deliberately tight around the camera's actual horizontal FOV at
  // this depth (~-30..+55 NDC-visible) so most of the flight is on-screen,
  // with only a short off-screen approach/exit at each end.
  const zAt = (f) => zStart + (zEnd - zStart) * f; // monotonic depth lerp
  const points = [
    new THREE.Vector3(-55, altitude + 1.6, zAt(-0.1)),
    new THREE.Vector3(-22, altitude + jitterA, zAt(0.2)),
    new THREE.Vector3(8, altitude + jitterB, zAt(0.5)),
    new THREE.Vector3(38, altitude - 1 + jitterC, zAt(0.8)),
    new THREE.Vector3(70, altitude - 3, zAt(1.0)),
  ];
  const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.4);

  const tStart = 0.6 + index * 0.9 + (rand() - 0.5) * 1.0;
  const duration = 13.3 + (rand() - 0.5) * 1.6;

  return {
    curve,
    tStart,
    duration,
    flapHz: 2.0 + rand() * 0.6,
    cycleSec: 2.6 + rand() * 1.3,
    cyclePhase: rand(),
    flapDuty: 0.4 + rand() * 0.15,
    flapAmplitude: 0.5 + rand() * 0.18,
    glideAngle: 0.07 + rand() * 0.06,
    bankGain: 14 + rand() * 6,
    scale: 0.92 + rand() * 0.18,
  };
}

function flapGate(cyclePos, duty) {
  const edge = 0.08;
  return smoothstep(0, edge, cyclePos) * smoothstep(duty, duty - edge, cyclePos);
}

export class Birds {
  constructor(scene, { seed = 1337, count = 3 } = {}) {
    this.loopDuration = LOOP_SECONDS;
    this.group = new THREE.Group();
    this.group.name = 'BirdDemo';

    const parts = buildSharedParts();
    const rand = mulberry32(seed);

    this.birds = [];
    for (let i = 0; i < count; i++) {
      const cfg = makeBirdConfig(i, rand);
      const gull = buildGull(parts);
      gull.root.visible = false;
      gull.root.scale.setScalar(cfg.scale);
      this.group.add(gull.root);
      this.birds.push({ cfg, ...gull });
    }

    scene.add(this.group);

    this._lookTarget = new THREE.Vector3();
  }

  update(time) {
    const lt = time % this.loopDuration;
    for (const b of this.birds) this._updateBird(b, lt);
  }

  _updateBird(b, lt) {
    const cfg = b.cfg;
    const tEnd = cfg.tStart + cfg.duration;
    if (lt < cfg.tStart || lt > tEnd) {
      b.root.visible = false;
      return;
    }
    b.root.visible = true;

    const u = THREE.MathUtils.clamp((lt - cfg.tStart) / cfg.duration, 0, 1);
    const pos = cfg.curve.getPointAt(u);
    const tan = cfg.curve.getTangentAt(u).normalize();

    b.root.position.copy(pos);
    this._lookTarget.copy(pos).add(tan);
    b.root.up.set(0, 1, 0);
    b.root.lookAt(this._lookTarget);

    // Bank into turns: compare the tangent slightly ahead to get a signed
    // horizontal turn-rate, then roll around the bird's own forward axis.
    const u2 = Math.min(1, u + 0.01);
    const tan2 = cfg.curve.getTangentAt(u2).normalize();
    const turn = tan.x * tan2.z - tan.z * tan2.x;
    const bank = THREE.MathUtils.clamp(-turn * cfg.bankGain, -0.55, 0.55);
    b.root.rotateZ(bank);

    // Wings: short flap bursts gated into an otherwise steady glide, so the
    // three birds never read as mechanically flapping in lockstep.
    const cyclePos = ((lt / cfg.cycleSec + cfg.cyclePhase) % 1 + 1) % 1;
    const gate = flapGate(cyclePos, cfg.flapDuty);
    const flapWave = Math.sin(lt * cfg.flapHz * Math.PI * 2);
    const wingAngle = cfg.glideAngle + gate * flapWave * cfg.flapAmplitude;
    b.leftPivot.rotation.z = wingAngle;
    b.rightPivot.rotation.z = -wingAngle;
  }
}
