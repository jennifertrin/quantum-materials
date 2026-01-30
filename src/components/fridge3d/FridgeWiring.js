import React from 'react';

const WIRE_RADIUS = 0.008;

const WIRE_COLORS = {
  rf: '#5a7a8a',
  dc: '#c8956c',
  optical: '#5a7a5a',
};

export default function FridgeWiring({ lines, topY, bottomY, onClick }) {
  const height = Math.abs(topY - bottomY);
  const midY = (topY + bottomY) / 2;

  return (
    <group>
      {lines.map((line, i) => (
        <mesh
          key={i}
          position={[line.xOffset, midY, 0]}
          onClick={(e) => { e.stopPropagation(); onClick(line.componentKey); }}
          userData={{ componentKey: line.componentKey }}
        >
          <cylinderGeometry args={[WIRE_RADIUS, WIRE_RADIUS, height, 6]} />
          <meshStandardMaterial
            color={WIRE_COLORS[line.type] || '#888888'}
            emissive={WIRE_COLORS[line.type] || '#888888'}
            emissiveIntensity={0.15}
            metalness={0.4}
            roughness={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}
