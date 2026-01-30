import React, { useMemo } from 'react';
import * as THREE from 'three';

export default function FridgeOuterShell({ topY, bottomY, topRadius, bottomRadius, color, selected, onClick, componentKey }) {
  const geometry = useMemo(() => {
    // Build a bell-jar profile curve (right half, will be lathed around Y axis)
    const points = [];
    const steps = 32;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      // Smooth transition from top radius to narrow bottom
      const r = topRadius * (1 - t) + bottomRadius * t;
      // Add a slight belly curve
      const belly = Math.sin(t * Math.PI) * 0.12;
      const y = topY * (1 - t) + bottomY * t;
      points.push(new THREE.Vector2(r + belly, y));
    }
    return new THREE.LatheGeometry(points, 64);
  }, [topY, bottomY, topRadius, bottomRadius]);

  return (
    <mesh
      geometry={geometry}
      userData={{ componentKey }}
      raycast={() => {}}
    >
      <meshPhysicalMaterial
        color={color}
        transparent
        opacity={selected ? 0.12 : 0.05}
        roughness={0.1}
        metalness={0.2}
        transmission={0.7}
        side={2} // DoubleSide
        depthWrite={false}
        wireframe={false}
        emissive={selected ? '#c8956c' : '#000000'}
        emissiveIntensity={selected ? 0.05 : 0}
      />
    </mesh>
  );
}
