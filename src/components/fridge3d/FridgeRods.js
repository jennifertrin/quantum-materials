import React, { useMemo } from 'react';

const ROD_RADIUS = 0.018;
const RODS_PER_SET = 4; // equally spaced around the circle

export default function FridgeRods({ segments, color }) {
  const rods = useMemo(() => {
    const arr = [];
    segments.forEach((seg, si) => {
      const height = Math.abs(seg.topY - seg.bottomY);
      const midY = (seg.topY + seg.bottomY) / 2;
      const rodDist = (seg.innerRadius + seg.outerRadius) / 2 || seg.innerRadius;
      for (let i = 0; i < RODS_PER_SET; i++) {
        const angle = (i / RODS_PER_SET) * Math.PI * 2 + Math.PI / 4; // offset 45deg
        arr.push({
          key: `${si}-${i}`,
          position: [Math.cos(angle) * rodDist, midY, Math.sin(angle) * rodDist],
          height,
        });
      }
    });
    return arr;
  }, [segments]);

  return (
    <group>
      {rods.map(r => (
        <mesh key={r.key} position={r.position}>
          <cylinderGeometry args={[ROD_RADIUS, ROD_RADIUS, r.height, 8]} />
          <meshStandardMaterial
            color={color}
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
      ))}
    </group>
  );
}
