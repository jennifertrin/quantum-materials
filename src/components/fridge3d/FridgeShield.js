import React from 'react';

export default function FridgeShield({ topY, bottomY, radius, color, selected, onClick, componentKey }) {
  const height = Math.abs(topY - bottomY);
  const midY = (topY + bottomY) / 2;

  return (
    <mesh
      position={[0, midY, 0]}
      userData={{ componentKey }}
      raycast={() => {}}
    >
      <cylinderGeometry args={[radius, radius, height, 64, 1, true]} />
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={selected ? 0.18 : 0.08}
        roughness={0.2}
        metalness={0.1}
        transmission={0.6}
        side={2} // DoubleSide
        depthWrite={false}
        emissive={selected ? '#c8956c' : '#000000'}
        emissiveIntensity={selected ? 0.08 : 0}
      />
    </mesh>
  );
}
