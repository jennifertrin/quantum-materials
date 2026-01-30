import React, { useCallback, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

import useFridgeThemeColors from './useFridgeThemeColors';
import {
  plates,
  shields,
  rodSegments,
  outerShell,
  electronicsBox,
  mixingChamberVessel,
  qpuChip,
  wiringLines,
  tempLabelPositions,
  numberLabels,
  MODEL_CENTER_Y,
} from './fridgeGeometry';

import FridgePlate from './FridgePlate';
import FridgeShield from './FridgeShield';
import FridgeRods from './FridgeRods';
import FridgeOuterShell from './FridgeOuterShell';
import FridgeElectronicsBox from './FridgeElectronicsBox';
import FridgeMixingChamber from './FridgeMixingChamber';
import FridgeWiring from './FridgeWiring';
import FridgeLabels from './FridgeLabels';

function FridgeModel({ onSelectComponent, selectedComponent }) {
  const colors = useFridgeThemeColors();

  const handleClick = useCallback((key) => {
    onSelectComponent(key);
  }, [onSelectComponent]);

  // Determine top/bottom Y for wiring
  const wireTopY = plates[0].y;
  const wireBottomY = plates[plates.length - 1].y;

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={0.7} />
      <directionalLight position={[-2, 3, -3]} intensity={0.3} />
      <pointLight position={[0, -2, 2]} intensity={0.2} color="#c8956c" />

      {/* Environment for reflections */}
      <Environment preset="studio" />

      {/* Outer shell (bell-jar) */}
      <FridgeOuterShell
        topY={outerShell.topY}
        bottomY={outerShell.bottomY}
        topRadius={outerShell.topRadius}
        bottomRadius={outerShell.bottomRadius}
        color={colors.svgFridgeShellEnd || '#252830'}
        selected={selectedComponent === outerShell.componentKey}
        onClick={handleClick}
        componentKey={outerShell.componentKey}
      />

      {/* Plates */}
      {plates.map((p) => (
        <FridgePlate
          key={p.key}
          radius={p.radius}
          thickness={p.thickness}
          yPosition={p.y}
          color={colors.svgFridgeStageCopperDim || '#6e5340'}
          dimColor={colors.svgFridgeStageCopperDim || '#6e5340'}
          selected={selectedComponent === p.componentKey}
          onClick={handleClick}
          componentKey={p.componentKey}
        />
      ))}

      {/* Shields */}
      {shields.map((s, i) => (
        <FridgeShield
          key={i}
          topY={s.topY}
          bottomY={s.bottomY}
          radius={s.radius}
          color={colors.svgFridgeShellEnd || '#252830'}
          selected={selectedComponent === s.componentKey}
          onClick={handleClick}
          componentKey={s.componentKey}
        />
      ))}

      {/* Support rods */}
      <FridgeRods
        segments={rodSegments}
        color={colors.svgFridgeStageCopperDim || '#6e5340'}
      />

      {/* Electronics box */}
      <FridgeElectronicsBox
        width={electronicsBox.width}
        height={electronicsBox.height}
        depth={electronicsBox.depth}
        y={electronicsBox.y}
        color={colors.svgFridgeShellEnd || '#252830'}
        selected={selectedComponent === 'roomTempElectronics'}
        onClick={handleClick}
        componentKey={electronicsBox.componentKey}
      />

      {/* Wiring */}
      <FridgeWiring
        lines={wiringLines}
        topY={wireTopY}
        bottomY={wireBottomY}
        onClick={handleClick}
      />

      {/* Mixing chamber + QPU */}
      <FridgeMixingChamber
        vesselRadius={mixingChamberVessel.radius}
        vesselHeight={mixingChamberVessel.height}
        vesselY={mixingChamberVessel.y}
        chipWidth={qpuChip.width}
        chipHeight={qpuChip.height}
        chipDepth={qpuChip.depth}
        chipY={qpuChip.y}
        copperColor={colors.svgFridgeStageCopperDim || '#6e5340'}
        accentColor={colors.accent || '#c8956c'}
        selected={selectedComponent === 'mixingChamberQPU'}
        onClick={handleClick}
        componentKey={mixingChamberVessel.componentKey}
      />

      {/* Labels */}
      <FridgeLabels
        tempLabels={tempLabelPositions}
        numberLabels={numberLabels}
        selectedComponent={selectedComponent}
        onSelect={handleClick}
      />
    </>
  );
}

export default function Fridge3DScene({ onSelectComponent, selectedComponent }) {
  const controlsRef = useRef();
  const [hintDismissed, setHintDismissed] = useState(false);

  return (
    <div className="fridge-canvas-wrapper">
      <Canvas
        camera={{ position: [0, MODEL_CENTER_Y, 8.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        onPointerDown={() => setHintDismissed(true)}
      >
        <FridgeModel
          onSelectComponent={onSelectComponent}
          selectedComponent={selectedComponent}
        />
        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          target={[0, MODEL_CENTER_Y, 0]}
        />
      </Canvas>
      {!hintDismissed && (
        <div className="fridge-rotate-hint">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 0 1 7.07 2.93" />
            <path d="M19.07 4.93L22 2" />
            <path d="M19.07 4.93L16 2" />
            <circle cx="12" cy="12" r="3" />
            <path d="M12 22a10 10 0 0 1-7.07-2.93" />
            <path d="M4.93 19.07L2 22" />
            <path d="M4.93 19.07L8 22" />
          </svg>
          <span>Drag to rotate</span>
        </div>
      )}
    </div>
  );
}
