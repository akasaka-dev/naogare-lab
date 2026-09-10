import * as THREE from 'three';

// Rain V1 — a lightweight, camera-local rain field for visual testing.
// Single draw call (one THREE.LineSegments), zero per-particle CPU work per
// frame: every drop's fall/wind/recycle motion happens entirely on the GPU
// in the vertex shader, driven only by a uTime/uCam uniform pair — the same
// "wrap a box around the camera" technique Particles.js already uses for its
// marine-snow field, applied here to short falling line segments instead of
// round point sprites so rain reads as thin streaks rather than sparkles.
export class Rain {
  constructor(scene, opts = {}) {
    const {
      count = 1200, // visible streaks (spec: 800-1500)
      boxWidth = 70,
      boxDepth = 70,
      boxHeight = 50,
      fallSpeed = 18, // world units/sec, downward
      windX = 2.4, // world units/sec sideways drift — "slight consistent wind"
      windZ = 0.9,
      streakLength = 1.3,
    } = opts;

    this.enabled = false; // OFF by default (opt-in via ?rain=1 or the R key)

    // Two vertices per drop (bottom + top of the streak), sharing the same
    // base position/seed so they fall as one rigid segment; aEnd (0 or 1)
    // tells the vertex shader which end to extend toward the wind+gravity
    // direction, done once in the shader rather than per-frame on the CPU.
    const positions = new Float32Array(count * 2 * 3);
    const ends = new Float32Array(count * 2);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * boxWidth;
      const y = (Math.random() - 0.5) * boxHeight;
      const z = (Math.random() - 0.5) * boxDepth;
      for (let v = 0; v < 2; v++) {
        const idx = (i * 2 + v) * 3;
        positions[idx + 0] = x;
        positions[idx + 1] = y;
        positions[idx + 2] = z;
        ends[i * 2 + v] = v; // 0 = bottom, 1 = top
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('aEnd', new THREE.BufferAttribute(ends, 1));

    this.uniforms = {
      uTime: { value: 0 },
      uCam: { value: new THREE.Vector3() },
      uBox: { value: new THREE.Vector3(boxWidth, boxHeight, boxDepth) },
      uFallSpeed: { value: fallSpeed },
      uWind: { value: new THREE.Vector2(windX, windZ) },
      uStreakLength: { value: streakLength },
      uColor: { value: new THREE.Color(0.52, 0.58, 0.66) }, // soft blue-gray, not white
      uAlpha: { value: 0.24 },
    };

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      toneMapped: false,
      blending: THREE.NormalBlending,
      uniforms: this.uniforms,
      vertexShader: /* glsl */ `
        precision highp float;
        attribute float aEnd;
        uniform float uTime;
        uniform vec3 uCam;
        uniform vec3 uBox;
        uniform float uFallSpeed;
        uniform vec2 uWind;
        uniform float uStreakLength;

        void main(){
          vec3 p = position;
          p.y -= uTime * uFallSpeed;
          p.x += uTime * uWind.x;
          p.z += uTime * uWind.y;

          // Wrap into a box centred on the camera (identical technique to
          // Particles.js) — recycles drops that fall below the volume back
          // in above it, and endlessly follows the camera horizontally.
          vec3 rel = mod(p - uCam + 0.5 * uBox, uBox) - 0.5 * uBox;
          vec3 base = uCam + rel;

          // Extend only the top vertex along the true fall direction
          // (gravity + wind) so each streak reads as a diagonal line rigidly
          // falling with its drop, not two independently wrapped points.
          vec3 dir = normalize(vec3(uWind.x, -uFallSpeed, uWind.y));
          vec3 world = base + dir * uStreakLength * aEnd;

          vec4 mv = viewMatrix * vec4(world, 1.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uColor;
        uniform float uAlpha;
        void main(){
          gl_FragColor = vec4(uColor, uAlpha);
        }
      `,
    });

    this.mesh = new THREE.LineSegments(geo, material);
    this.mesh.frustumCulled = false;
    this.mesh.visible = false;
    scene.add(this.mesh);
  }

  setEnabled(v) { this.enabled = !!v; }
  toggle() { this.enabled = !this.enabled; }

  // Visibility (enabled + underwater gating) is authoritatively decided by
  // the caller's own per-pass setVisible()-style logic, matching how
  // Particles.js's `.points.visible` is handled — this only advances the
  // GPU-side fall/wind/recycle state each frame.
  update(time, camera) {
    this.uniforms.uTime.value = time;
    this.uniforms.uCam.value.copy(camera.position);
  }
}
