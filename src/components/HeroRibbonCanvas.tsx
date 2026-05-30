import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  #define PI 3.141592653

  void main() {
    vUv = uv;
    vec3 pos = position;
    float t = uTime * 0.4;
    pos.y += sin(pos.x * 0.5 + t) * 1.2 + cos(pos.x * 1.5 + t * 0.8) * 0.4;
    pos.z += sin(pos.x * 2.0 + t * 1.2) * 0.3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  #define PI 3.141592653

  vec3 hash3(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  vec3 colorPalette(float t) {
    vec3 a = vec3(0.6, 0.3, 0.2);
    vec3 b = vec3(0.4, 0.2, 0.2);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.0, 0.15, 0.25);
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = vUv;
    float t = uTime * 0.15;
    vec2 noiseUV = uv * 2.5 + vec2(t * 0.1, t * 0.15);
    float n = noise(noiseUV);
    float colorIndex = n + t * 0.1 + uv.x * 0.3;
    vec3 col = colorPalette(colorIndex);
    float ribbonShape = smoothstep(0.15, 0.5, uv.x) * smoothstep(0.85, 0.5, uv.x);
    float fade = smoothstep(0.0, 0.25, uv.y) * smoothstep(1.0, 0.75, uv.y);
    float alpha = ribbonShape * fade;
    alpha += 0.15 * (1.0 - alpha) * smoothstep(0.4, 0.6, n);
    gl_FragColor = vec4(col * (0.8 + 0.2 * n), alpha * 0.95);
  }
`;

function RibbonMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[0, 0, -Math.PI / 4]}
      position={[0, -4, 0]}
    >
      <planeGeometry args={[15, 50, 100, 100]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

const HeroRibbonCanvas: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '160px 0px' }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, -8, 5], fov: 75 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
        frameloop={isVisible ? 'always' : 'never'}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <RibbonMesh />
        <EffectComposer>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0}
            luminanceSmoothing={0}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default React.memo(HeroRibbonCanvas);
