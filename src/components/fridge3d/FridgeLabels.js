import React from 'react';
import { Html } from '@react-three/drei';

export default function FridgeLabels({ tempLabels, numberLabels, selectedComponent, onSelect }) {
  return (
    <group>
      {/* Temperature labels */}
      {tempLabels.map((t) => (
        <Html
          key={t.key}
          position={t.position}
          center
          distanceFactor={6}
          occlude={false}
          style={{ pointerEvents: 'none' }}
        >
          <div className="temp-label-3d">
            {t.text}
          </div>
        </Html>
      ))}

      {/* Numbered component labels */}
      {numberLabels.map((n) => (
        <Html
          key={n.componentKey}
          position={n.position}
          center
          distanceFactor={6}
          occlude={false}
        >
          <div
            className={`component-label-3d ${selectedComponent === n.componentKey ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(n.componentKey);
            }}
          >
            {n.num}
          </div>
        </Html>
      ))}
    </group>
  );
}
