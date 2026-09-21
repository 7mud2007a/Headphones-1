import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useDragRotation } from '../../hooks/useDragRotation.js';

const IDLE_VELOCITY_EPSILON = 0.00006;

function EarCup({ side, depth, outerRadius, shellColorRef, accentColor, lowDetail }) {
  const shellRef = useRef(null);
  const radialSegments = lowDetail ? 20 : 40;

  useFrame(() => {
    if (shellRef.current) {
      shellRef.current.color.lerp(shellColorRef.current, 0.06);
    }
  });

  return (
    <group position={[side * 1.13, -0.66, 0]}>
      {/* Yoke slider connecting the headband to this cup */}
      <mesh position={[0, 0.42, 0]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.028, 0.032, 0.62, 12]} />
        <meshStandardMaterial color="#3a3a42" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.72, 0]} castShadow>
        <boxGeometry args={[0.09, 0.05, 0.09]} />
        <meshStandardMaterial color="#3a3a42" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Outer shell */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[outerRadius, outerRadius * 0.94, depth, radialSegments, 1]} />
        <meshPhysicalMaterial
          ref={shellRef}
          color="#1c1c22"
          metalness={0.55}
          roughness={0.32}
          clearcoat={0.5}
          clearcoatRoughness={0.25}
        />
      </mesh>

      {/* Outer accent trim ring (glows with brand color) */}
      <mesh position={[side * 0.235, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[outerRadius * 0.82, 0.014, 12, lowDetail ? 24 : 48]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={0.55}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Center badge dot */}
      <mesh position={[side * 0.245, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.01, 24]} />
        <meshStandardMaterial color="#d8d8de" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Inner ear cushion */}
      <mesh position={[-side * 0.22, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[outerRadius * 0.72, outerRadius * 0.32, lowDetail ? 10 : 18, lowDetail ? 20 : 36]} />
        <meshStandardMaterial color="#0c0c0f" metalness={0.05} roughness={0.95} />
      </mesh>
      <mesh position={[-side * 0.3, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <circleGeometry args={[outerRadius * 0.42, lowDetail ? 20 : 32]} />
        <meshStandardMaterial color="#08080a" metalness={0.1} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

const HeadphonesModel = React.forwardRef(function HeadphonesModel(
  {
    color = '#1c1c22',
    accent = '#8b5cf6',
    interactive = true,
    autoRotateSpeed = 0.16,
    baseRotationY = 0.55,
    baseRotationX = 0.06,
    scrollTiltY = 0,
    lowDetail = false,
    scale = 1,
  },
  externalRef
) {
  const groupRef = useRef(null);
  const autoAngle = useRef(0);
  const shellColorRef = useRef(new THREE.Color(color));
  const headbandRef = useRef(null);
  const cushionRef = useRef(null);

  const drag = useDragRotation({ sensitivity: 0.0095, damping: 0.94, verticalLimit: 0.45 });

  React.useEffect(() => {
    shellColorRef.current.set(color);
  }, [color]);

  React.useImperativeHandle(externalRef, () => groupRef.current, []);

  const tubularSegments = lowDetail ? 28 : 56;
  const radialSegments = lowDetail ? 8 : 14;

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const isSettled =
      Math.abs(drag.velocity.current.x) < IDLE_VELOCITY_EPSILON &&
      Math.abs(drag.velocity.current.y) < IDLE_VELOCITY_EPSILON;

    const dragValues = drag.tick();

    if (!interactive || (!drag.isDragging.current && isSettled)) {
      autoAngle.current += delta * autoRotateSpeed;
    }

    groupRef.current.rotation.y = baseRotationY + autoAngle.current + dragValues.y + scrollTiltY;
    groupRef.current.rotation.x = baseRotationX + dragValues.x;

    if (headbandRef.current) headbandRef.current.color.lerp(shellColorRef.current, 0.06);
  });

  const pointerHandlers = interactive
    ? {
        onPointerDown: drag.onPointerDown,
        onPointerMove: drag.onPointerMove,
        onPointerUp: drag.onPointerUp,
        onPointerLeave: drag.onPointerUp,
        onPointerCancel: drag.onPointerUp,
      }
    : {};

  return (
    <group ref={groupRef} scale={scale} {...pointerHandlers}>
      {/* Invisible wide hit-area so small drags anywhere near the model register */}
      {interactive && (
        <mesh visible={false}>
          <sphereGeometry args={[1.7, 8, 8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}

      {/* Main headband arc */}
      <mesh castShadow>
        <torusGeometry args={[1.02, 0.052, radialSegments, tubularSegments, Math.PI]} />
        <meshPhysicalMaterial ref={headbandRef} color="#1c1c22" metalness={0.6} roughness={0.3} clearcoat={0.4} />
      </mesh>

      {/* Padded top cushion, centered on the arc */}
      <mesh rotation={[0, 0, Math.PI / 4]} castShadow>
        <torusGeometry args={[1.09, 0.042, radialSegments, Math.max(12, Math.floor(tubularSegments / 2)), Math.PI / 2]} />
        <meshStandardMaterial ref={cushionRef} color="#0c0c0f" metalness={0.05} roughness={0.9} />
      </mesh>

      <EarCup side={1} depth={0.46} outerRadius={0.56} shellColorRef={shellColorRef} accentColor={accent} lowDetail={lowDetail} />
      <EarCup side={-1} depth={0.46} outerRadius={0.56} shellColorRef={shellColorRef} accentColor={accent} lowDetail={lowDetail} />
    </group>
  );
});

export default HeadphonesModel;
