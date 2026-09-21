import React, { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Lightformer, Sparkles, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import HeadphonesModel from './HeadphonesModel.jsx';
import { useIsMobile } from '../../hooks/useMediaQuery.js';

const LIGHTING_PRESETS = {
  studio: { key: '#ffffff', rim: '#5fd4ff', fill: '#9aa0ff', bg: '#0b0b10' },
  midnight: { key: '#8b5cf6', rim: '#38bdf8', fill: '#4c1d95', bg: '#07060d' },
  sunset: { key: '#fb923c', rim: '#8b5cf6', fill: '#f472b6', bg: '#0d0709' },
};

function Rig({ scrollProgress, zoom, parallax }) {
  useFrame((state) => {
    const { pointer, camera } = state;
    const px = parallax ? pointer.x : 0;
    const py = parallax ? pointer.y : 0;

    const targetX = px * 0.55;
    const targetY = py * 0.28 - scrollProgress * 1.15;
    const targetZ = 4.4 - zoom * 1.1;

    camera.position.x += (targetX - camera.position.x) * 0.06;
    camera.position.y += (targetY - camera.position.y) * 0.06;
    camera.position.z += (targetZ - camera.position.z) * 0.08;
    camera.lookAt(0, -scrollProgress * 0.35, 0);
  });
  return null;
}

function StudioLights({ preset }) {
  const cfg = LIGHTING_PRESETS[preset] || LIGHTING_PRESETS.studio;
  const keyRef = useRef(null);
  const rimRef = useRef(null);
  const fillRef = useRef(null);
  const targetKey = useMemo(() => cfg.key, [cfg.key]);
  const targetRim = useMemo(() => cfg.rim, [cfg.rim]);
  const targetFill = useMemo(() => cfg.fill, [cfg.fill]);

  const keyColor = useMemo(() => new THREE.Color(targetKey), [targetKey]);
  const rimColor = useMemo(() => new THREE.Color(targetRim), [targetRim]);
  const fillColor = useMemo(() => new THREE.Color(targetFill), [targetFill]);

  useFrame(() => {
    if (keyRef.current) keyRef.current.color.lerp(keyColor, 0.05);
    if (rimRef.current) rimRef.current.color.lerp(rimColor, 0.05);
    if (fillRef.current) fillRef.current.color.lerp(fillColor, 0.05);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight ref={keyRef} position={[3, 4, 5]} intensity={1.3} color={cfg.key} castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight ref={rimRef} position={[-3.5, 1.5, -3]} intensity={6} color={cfg.rim} />
      <pointLight ref={fillRef} position={[2, -1.5, 3]} intensity={2} color={cfg.fill} />
      <Environment key={preset} resolution={128} frames={1}>
        <Lightformer intensity={2.2} color="white" position={[0, 4, 1]} scale={[6, 1.5, 1]} />
        <Lightformer intensity={1.4} color={cfg.rim} position={[-4, 1, 3]} rotation={[0, Math.PI / 3, 0]} scale={[3, 1.5, 1]} />
        <Lightformer intensity={1.2} color={cfg.key} position={[4, 1, -3]} rotation={[0, -Math.PI / 3, 0]} scale={[3, 1.5, 1]} />
        <Lightformer intensity={0.6} color="white" position={[0, -3, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[8, 4, 1]} />
      </Environment>
    </>
  );
}

/**
 * Self-contained 3D product canvas. Handles camera parallax, scroll-driven
 * camera movement, wheel-zoom, studio lighting presets and ambient particles.
 */
export default function Scene({
  color = '#1c1c22',
  accent = '#8b5cf6',
  interactive = true,
  autoRotateSpeed = 0.16,
  lightingPreset = 'studio',
  enableZoom = false,
  enableSparkles = true,
  parallax = true,
  scrollProgress = 0,
  baseRotationY = 0.55,
  baseRotationX = 0.06,
  scale = 1,
  className = '',
}) {
  const isMobile = useIsMobile();
  const [zoom, setZoom] = useState(0);
  const cfg = LIGHTING_PRESETS[lightingPreset] || LIGHTING_PRESETS.studio;

  const handleWheel = (e) => {
    if (!enableZoom) return;
    e.preventDefault();
    setZoom((z) => Math.min(0.9, Math.max(-0.4, z + e.deltaY * 0.0012)));
  };

  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 0, 4.4], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onWheel={handleWheel}
      >
        <color attach="background" args={[cfg.bg]} />
        <fog attach="fog" args={[cfg.bg, 6, 14]} />
        <Suspense fallback={null}>
          <StudioLights preset={lightingPreset} />
          <Float speed={interactive ? 1.4 : 1} rotationIntensity={0.15} floatIntensity={0.5} floatingRange={[-0.06, 0.06]}>
            <HeadphonesModel
              color={color}
              accent={accent}
              interactive={interactive}
              autoRotateSpeed={autoRotateSpeed}
              baseRotationY={baseRotationY}
              baseRotationX={baseRotationX}
              lowDetail={isMobile}
              scale={scale}
            />
          </Float>
          <ContactShadows position={[0, -1.35, 0]} opacity={0.55} scale={8} blur={2.6} far={2.5} color="#000000" />
          {enableSparkles && (
            <Sparkles count={isMobile ? 20 : 55} scale={[6, 4, 4]} size={2} speed={0.25} opacity={0.35} color={accent} />
          )}
          <Rig scrollProgress={scrollProgress} zoom={zoom} parallax={parallax} />
          <AdaptiveDpr pixelated={false} />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
}
