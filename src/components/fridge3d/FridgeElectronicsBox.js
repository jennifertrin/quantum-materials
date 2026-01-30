import React from 'react';

export default function FridgeElectronicsBox({ width, height, depth, y, color, selected, onClick, componentKey }) {
  return (
    <group position={[0, y, 0]}>
      {/* Main box */}
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(componentKey); }}
        userData={{ componentKey }}
      >
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={color}
          metalness={0.6}
          roughness={0.45}
          emissive={selected ? '#c8956c' : '#000000'}
          emissiveIntensity={selected ? 0.12 : 0}
        />
      </mesh>

      {/* Front panel inset */}
      <mesh position={[0, 0, depth / 2 + 0.001]}>
        <planeGeometry args={[width * 0.92, height * 0.8]} />
        <meshStandardMaterial
          color="#111418"
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* LED indicators */}
      {[-0.12, -0.04, 0.04].map((xOff, i) => (
        <mesh key={i} position={[width * -0.35 + xOff, height * 0.15, depth / 2 + 0.005]}>
          <circleGeometry args={[0.015, 16]} />
          <meshStandardMaterial
            color={['#5a7a5a', '#5a7a8a', '#c8956c'][i]}
            emissive={['#5a7a5a', '#5a7a8a', '#c8956c'][i]}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
