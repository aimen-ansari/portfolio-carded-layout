import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * HeroStage's WebGL centrepiece.
 *
 * A single, self-contained scene: an animated aurora field, drifting dust and a
 * slowly rotating "core" (faceted metal icosahedron + wireframe shell + orbit
 * rings + tech nodes). Everything reacts to the pointer and to page scroll.
 * Deliberately built on raw three.js primitives — no external HDRI or texture
 * fetches — so it renders identically offline.
 */

type Quality = "low" | "high";

/* ------------------------------------------------------------------ shaders */

const BASIC_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const AURORA_FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec3 uA;
  uniform vec3 uB;
  uniform vec3 uC;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      v += amp * noise(p);
      p *= 2.03;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(3.2, 2.0);
    float t = uTime * 0.032;
    float n1 = fbm(p * 1.6 + vec2(t, -t * 0.7));
    float n2 = fbm(p * 2.7 + vec2(-t * 0.9, t * 0.6) + n1 * 1.2);
    float m = smoothstep(0.10, 0.95, n1 * 0.7 + n2 * 0.55);
    vec3 col = mix(uA, uB, m);
    col = mix(col, uC, pow(smoothstep(0.5, 1.0, n2), 1.6) * 0.85);
    float d = distance(uv, vec2(0.5, 0.44));
    float falloff = smoothstep(1.0, 0.10, d);
    gl_FragColor = vec4(col, (0.14 + m * 0.5) * falloff);
  }
`;

const GLOW_FRAG = /* glsl */ `
  precision mediump float;
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    float d = distance(vUv, vec2(0.5));
    float a = pow(smoothstep(0.5, 0.0, d), 2.2);
    gl_FragColor = vec4(uColor, a * uOpacity);
  }
`;

/* ----------------------------------------------------------------- helpers */

/** Evenly distributes `count` points across a sphere of `radius`. */
function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const points: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return points;
}

type ProgressRef = { current: number };

/* --------------------------------------------------------------- fragments */

function Aurora() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uA: { value: new THREE.Color("#140a05") },
      uB: { value: new THREE.Color("#8d3d13") },
      uC: { value: new THREE.Color("#f4ac55") },
    }),
    [],
  );

  useFrame((_, delta) => {
    uniforms.uTime.value += delta;
  });

  return (
    <mesh position={[0, 0.2, -4.2]}>
      <planeGeometry args={[18, 14, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={BASIC_VERT}
        fragmentShader={AURORA_FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Glow({
  scale = 5,
  color = "#ea8b2e",
  opacity = 0.5,
  position = [0, 0, -1],
}: {
  scale?: number;
  color?: string;
  opacity?: number;
  position?: [number, number, number];
}) {
  const uniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color(color) }, uOpacity: { value: opacity } }),
    [color, opacity],
  );

  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={BASIC_VERT}
        fragmentShader={GLOW_FRAG}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function Dust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      array[i * 3] = (Math.random() - 0.5) * 9.5;
      array[i * 3 + 1] = (Math.random() - 0.5) * 7;
      array[i * 3 + 2] = (Math.random() - 0.5) * 6.5 - 1;
    }
    return array;
  }, [count]);

  useFrame((state, delta) => {
    const node = points.current;
    if (!node) return;
    node.rotation.y += delta * 0.02;
    node.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#f8c67e"
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Core({ quality, progressRef }: { quality: Quality; progressRef: ProgressRef }) {
  const group = useRef<THREE.Group>(null);
  const solid = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const outerShell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);

  const nodeCount = quality === "high" ? 10 : 7;
  const nodes = useMemo(() => fibonacciSphere(nodeCount, 2.02), [nodeCount]);
  const detail = quality === "high" ? 1 : 0;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const progress = progressRef.current;

    if (solid.current) {
      solid.current.rotation.y += delta * 0.22;
      solid.current.rotation.x += delta * 0.07;
    }
    if (shell.current) {
      shell.current.rotation.y -= delta * 0.15;
      shell.current.rotation.z += delta * 0.04;
    }
    if (outerShell.current) {
      outerShell.current.rotation.y += delta * 0.08;
      outerShell.current.rotation.x -= delta * 0.03;
    }
    if (ringA.current) ringA.current.rotation.z += delta * 0.26;
    if (ringB.current) ringB.current.rotation.z -= delta * 0.19;

    const node = group.current;
    if (!node) return;
    const targetX = state.pointer.y * 0.26 - progress * 0.1;
    const targetY = state.pointer.x * 0.42 + progress * 0.4;
    const ease = Math.min(1, delta * 3.2);
    node.rotation.x += (targetX - node.rotation.x) * ease;
    node.rotation.y += (targetY - node.rotation.y) * ease;
    node.position.y = Math.sin(t * 0.55) * 0.06 + progress * 0.22;
  });

  return (
    <group ref={group}>
      <Glow scale={7.6} color="#c2621d" opacity={0.34} position={[0, 0, -2.4]} />

      {/* faceted metal core */}
      <mesh ref={solid}>
        <icosahedronGeometry args={[1, detail]} />
        <meshStandardMaterial
          color="#e7a457"
          emissive="#b4521a"
          emissiveIntensity={0.55}
          metalness={0.96}
          roughness={0.24}
          flatShading
        />
      </mesh>

      {/* inner wireframe shell */}
      <mesh ref={shell} scale={1.17}>
        <icosahedronGeometry args={[1, detail]} />
        <meshBasicMaterial color="#ffd39a" wireframe transparent opacity={0.3} />
      </mesh>

      {/* sparse outer lattice */}
      <mesh ref={outerShell} scale={1.72}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#ff8b3d" wireframe transparent opacity={0.1} />
      </mesh>

      {/* orbit rings */}
      <mesh ref={ringA} rotation={[Math.PI / 2.25, 0.35, 0]}>
        <torusGeometry args={[1.82, 0.0055, 8, 180]} />
        <meshBasicMaterial color="#ffb066" transparent opacity={0.75} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.7, -0.6, 0.8]}>
        <torusGeometry args={[2.16, 0.0045, 8, 180]} />
        <meshBasicMaterial color="#e2703a" transparent opacity={0.5} />
      </mesh>

      {/* tech nodes */}
      {nodes.map((position, index) => (
        <group key={index} position={position}>
          <mesh>
            <sphereGeometry args={[0.042, 16, 16]} />
            <meshStandardMaterial
              color="#ffe3b5"
              emissive="#ff9a3c"
              emissiveIntensity={2.4}
              toneMapped={false}
            />
          </mesh>
          <Glow scale={0.62} color="#ff9a3c" opacity={0.4} />
        </group>
      ))}
    </group>
  );
}

function Scene({
  quality,
  reduced,
  progressRef,
}: {
  quality: Quality;
  reduced: boolean;
  progressRef: ProgressRef;
}) {
  useFrame((state) => {
    if (reduced) return;
    const progress = progressRef.current;
    // subtle parallax copy of the pointer for the whole scene
    state.camera.position.x += (state.pointer.x * 0.28 - state.camera.position.x) * 0.03;
    state.camera.position.y +=
      (state.pointer.y * 0.18 - progress * 0.25 - state.camera.position.y) * 0.03;
  });

  return (
    <>
      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#ffd7a1", "#2a1408", 0.8]} />
      <directionalLight position={[3.5, 5, 4.5]} intensity={1.4} color="#fff0d8" />
      <pointLight position={[4, 2, 4]} intensity={30} distance={16} color="#ffb35c" />
      <pointLight position={[-5, -2.5, 2]} intensity={22} distance={18} color="#ff7a3c" />
      <pointLight position={[0, -3, 5]} intensity={12} distance={14} color="#ffd9a0" />

      <Aurora />
      <Dust count={quality === "high" ? 900 : 380} />
      <Core quality={quality} progressRef={progressRef} />
    </>
  );
}

/* ------------------------------------------------------------------ export */

export default function HeroScene({
  reduced = false,
  quality = "high",
  onReady,
}: {
  reduced?: boolean;
  quality?: Quality;
  onReady?: () => void;
}) {
  const progressRef = useRef(0);
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Track page scroll without reading layout every frame.
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Stop rendering entirely while the stage is off-screen.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), {
      rootMargin: "120px",
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const frameloop = !visible ? "never" : reduced ? "demand" : "always";

  return (
    <div ref={hostRef} style={{ position: "absolute", inset: 0 }}>
      <Canvas
        dpr={[1, quality === "high" ? 1.9 : 1.4]}
        frameloop={frameloop}
        camera={{ position: [0, 0, 7.4], fov: 42 }}
        gl={{
          alpha: true,
          antialias: quality === "high",
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        style={{ position: "absolute", inset: 0 }}
        onCreated={() => onReady?.()}
      >
        <Scene quality={quality} reduced={reduced} progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
