import * as THREE from 'three';
import { NOISE, CAUSTICS } from './shaders/common.js';

// Sandy seabed: rolling dunes, ripple relief, and two layers of animated
// caustics that only brighten where sunlight reaches. The seabed is kept
// centred under the camera so it feels boundless.
export class Floor {
  constructor(sunDir, depth = 34) {
    this.depth = depth;

    this.uniforms = {
      uTime: { value: 0 },
      uSunDir: { value: sunDir.clone() },
      uDepth: { value: depth },
      uDuneHeight: { value: 4.0 },
      uDuneScale: { value: 0.02 },
      uSandColor: { value: new THREE.Color(0.66, 0.58, 0.44) },
      uSandColor2: { value: new THREE.Color(0.46, 0.41, 0.31) },
      uCausticColor: { value: new THREE.Color(1.0, 0.98, 0.85) },
      // Night V1 (opt-in) — neutral at uNightAmount = 0.
      uNightAmount: { value: 0.0 },
      uMoonDir: { value: new THREE.Vector3(0, 1, 0) },
      uMoonColor: { value: new THREE.Color(0xdfe6f0) },
      uMoonIntensity: { value: 1.0 },
    };

    const material = new THREE.ShaderMaterial({
      toneMapped: false,
      uniforms: this.uniforms,
      vertexShader: /* glsl */ `
        precision highp float;
        ${NOISE}
        uniform float uDuneHeight;
        uniform float uDuneScale;
        varying vec3 vWorldPos;

        void main(){
          vec3 wp = (modelMatrix * vec4(position, 1.0)).xyz;
          float dune = fbm(wp.xz * uDuneScale, 5) * uDuneHeight;
          wp.y += dune;
          vWorldPos = wp;
          gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        ${NOISE}
        ${CAUSTICS}
        uniform float uTime;
        uniform vec3  uSunDir;
        uniform float uDepth;
        uniform float uDuneHeight;
        uniform float uDuneScale;
        uniform vec3  uSandColor;
        uniform vec3  uSandColor2;
        uniform vec3  uCausticColor;
        uniform float uNightAmount;
        uniform vec3  uMoonDir;
        uniform vec3  uMoonColor;
        uniform float uMoonIntensity;
        varying vec3 vWorldPos;

        // Surface normal from the fbm dune/ripple field (analytic gradient).
        vec3 reliefNormal(vec2 p, float slope){
          vec2 g = vec2(0.0);
          float amp = 1.0;
          mat2 m = FBM_M;
          for (int i = 0; i < 5; i++){
            vec3 n = noised(p);
            g += amp * n.yz;
            p = m * p;
            amp *= 0.5;
          }
          return normalize(vec3(-g.x * slope, 1.0, -g.y * slope));
        }

        void main(){
          vec3 sunDir = normalize(uSunDir);
          vec2 xz = vWorldPos.xz;

          // Macro dunes + finer ripples.
          vec3 N = reliefNormal(xz * uDuneScale, uDuneHeight * uDuneScale * 12.0);
          vec3 Nr = reliefNormal(xz * 0.25 + 7.3, 0.35);
          N = normalize(N + vec3(Nr.x, 0.0, Nr.z) * 0.6);

          // Sand albedo with mottled patches.
          float mottle = fbm(xz * 0.06, 4) * 0.5 + 0.5;
          vec3 sand = mix(uSandColor2, uSandColor, smoothstep(0.3, 0.75, mottle));
          sand *= 0.8 + 0.2 * fbm(xz * 0.9, 3);

          // Diffuse sun term (softened; most light underwater is ambient).
          float ndl = clamp(dot(N, sunDir), 0.0, 1.0);
          float diffuse = 0.45 + 0.55 * ndl;
          // Night V1: the 0.45 daylight-ambient floor above assumes there is
          // always some sunlight reaching the seabed — at night that isn't
          // true, so darken it and light the floor from the moon instead.
          float moonNdl = clamp(dot(N, uMoonDir), 0.0, 1.0);
          float nightDiffuse = 0.05 + 0.12 * moonNdl * clamp(uMoonIntensity, 0.0, 3.0);
          diffuse = mix(diffuse, nightDiffuse, uNightAmount);

          // Two caustic layers, offset & counter-scrolling, combined sharply.
          float t = uTime * 0.6;
          vec2 flow = sunDir.xz * uTime * 0.4;
          float c1 = caustics(xz * 0.05 + flow, t);
          float c2 = caustics(xz * 0.085 - flow * 0.7 + 15.0, t * 1.3);
          float caus = min(c1, c2) + 0.35 * c1 * c2;

          // Caustics fade with depth and with the sun sinking.
          float reach = clamp(uSunDir.y, 0.0, 1.0);
          reach *= exp(-uDepth * 0.012);
          caus *= (0.4 + 0.9 * ndl);

          vec3 color = sand * diffuse;
          // Night V1: the (0.9 + 1.6*reach) floor never goes below 0.9 even
          // with reach = 0 (sun fully below the horizon) — caustics need a
          // real light source, so give them a much dimmer, moon-driven
          // ceiling at night instead.
          float causDay = 0.9 + 1.6 * reach;
          float causNight = 0.1 + 0.35 * moonNdl * clamp(uMoonIntensity, 0.0, 3.0);
          color += uCausticColor * caus * mix(causDay, causNight, uNightAmount);

          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    this.size = 6000;
    const geo = new THREE.PlaneGeometry(this.size, this.size, 256, 256);
    geo.rotateX(-Math.PI / 2);
    this.mesh = new THREE.Mesh(geo, material);
    this.mesh.position.y = -depth;
    this.mesh.frustumCulled = false;
  }

  update(time, camera) {
    this.uniforms.uTime.value = time;
    // Follow the camera on a coarse grid so the dune pattern stays put.
    const step = this.size / 256;
    this.mesh.position.x = Math.round(camera.position.x / step) * step;
    this.mesh.position.z = Math.round(camera.position.z / step) * step;
  }

  setSun(sunDir) {
    this.uniforms.uSunDir.value.copy(sunDir);
  }

  setMoon(moonDir) {
    this.uniforms.uMoonDir.value.copy(moonDir);
  }
}
