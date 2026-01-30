import React from 'react';

export default function FridgeMixingChamber({
  vesselRadius, vesselHeight, vesselY,
  chipWidth, chipHeight, chipDepth, chipY,
  copperColor, accentColor, selected, onClick, componentKey,
}) {
  return (
    <group>
      {/* Cylindrical mixing chamber vessel */}
      <mesh
        position={[0, vesselY, 0]}
        onClick={(e) => { e.stopPropagation(); onClick(componentKey); }}
        userData={{ componentKey }}
      >
        <cylinderGeometry args={[vesselRadius, vesselRadius, vesselHeight, 32]} />
        <meshStandardMaterial
          color={copperColor}
          metalness={0.65}
          roughness={0.4}
          emissive={selected ? '#c8956c' : '#000000'}
          emissiveIntensity={selected ? 0.15 : 0}
        />
      </mesh>

      {/* QPU chip box */}
      <mesh
        position={[0, chipY, 0]}
        onClick={(e) => { e.stopPropagation(); onClick(componentKey); }}
        userData={{ componentKey }}
      >
        <boxGeometry args={[chipWidth, chipHeight, chipDepth]} />
        <meshStandardMaterial
          color={accentColor}
          metalness={0.5}
          roughness={0.5}
          emissive={accentColor}
          emissiveIntensity={selected ? 0.25 : 0.1}
        />
      </mesh>

      {/* QPU glow ring */}
      <mesh position={[0, chipY, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[chipWidth * 0.55, chipWidth * 0.8, 32]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.08}
          side={2}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
