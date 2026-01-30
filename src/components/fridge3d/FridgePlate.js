import React, { useRef, useMemo } from 'react';
import { BOLT_COUNT, BOLT_RADIUS, BOLT_HEIGHT } from './fridgeGeometry';

export default function FridgePlate({ radius, thickness, yPosition, color, dimColor, selected, onClick, componentKey }) {
  const meshRef = useRef();

  const bolts = useMemo(() => {
    const arr = [];
    for (let i = 0; i < BOLT_COUNT; i++) {
      const angle = (i / BOLT_COUNT) * Math.PI * 2;
      const br = radius * 0.88;
      arr.push([Math.cos(angle) * br, 0, Math.sin(angle) * br]);
    }
    return arr;
  }, [radius]);

  return (
    <group position={[0, yPosition, 0]}>
      {/* Main disc */}
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(componentKey); }}
        userData={{ componentKey }}
      >
        <cylinderGeometry args={[radius, radius, thickness, 64]} />
        <meshStandardMaterial
          color={color}
          metalness={0.7}
          roughness={0.35}
          emissive={selected ? '#c8956c' : '#000000'}
          emissiveIntensity={selected ? 0.15 : 0}
        />
      </mesh>

      {/* Bolts around the rim */}
      {bolts.map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[BOLT_RADIUS, BOLT_RADIUS, BOLT_HEIGHT + thickness, 8]} />
          <meshStandardMaterial
            color={dimColor || color}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
