import React, { useState, useRef, useCallback } from 'react';
import WorldMap from './WorldMap';
import { quantumMaterials } from '../data/materials';
import './QPUDiagram.css';

// Map component materials to database entries
const materialMapping = {
  'Aluminum': 'Aluminum',
  'Tantalum': 'Tantalum',
  'Niobium': 'Niobium',
  'Silicon': 'Silicon',
  'Sapphire': 'Sapphire (Al₂O₃)',
  'Gold': 'Gold',
  'Indium': 'Indium',
  'Copper': 'Copper',
  'Titanium Nitride': 'Titanium Nitride (TiN)',
  'Mu-Metal': 'Mu-Metal',
  'High-R Silicon': 'Silicon',
};

const getMaterialData = (materialName) => {
  const mappedName = materialMapping[materialName] || materialName;
  return quantumMaterials.find(m =>
    m.name === mappedName ||
    m.name.toLowerCase().includes(materialName.toLowerCase())
  );
};

const qpuComponents = {
  qubitArray: {
    id: 'qubitArray',
    name: 'Qubit Array',
    materials: ['Aluminum', 'Tantalum', 'Niobium'],
    description: 'The core of the processor — a grid of tiny circuits called qubits that store and process quantum information. Each qubit uses a superconducting loop with a Josephson junction to hold a quantum state.',
    subcomponents: [
      { name: 'Josephson Junctions', material: 'Aluminum' },
      { name: 'Capacitor Pads', material: 'Tantalum' },
      { name: 'Ground Plane', material: 'Niobium' }
    ]
  },
  controlElectronics: {
    id: 'controlElectronics',
    name: 'Control Electronics',
    materials: ['Niobium', 'Titanium Nitride'],
    description: 'The wiring that sends precise signals to each qubit to perform calculations. These include microwave drive lines that set qubit states and flux bias lines that fine-tune each qubit.',
    subcomponents: [
      { name: 'Drive Lines', material: 'Niobium' },
      { name: 'Flux Lines', material: 'Niobium' },
      { name: 'Filters', material: 'Titanium Nitride' }
    ]
  },
  readoutResonators: {
    id: 'readoutResonators',
    name: 'Readout Resonators',
    materials: ['Niobium', 'Titanium Nitride'],
    description: 'Sensors that read the result from each qubit after a calculation. They use small resonating circuits (coplanar waveguides) tuned to detect each qubit\'s state without disturbing it.',
    subcomponents: [
      { name: 'CPW Resonators', material: 'Niobium' },
      { name: 'Coupling Capacitors', material: 'Titanium Nitride' },
      { name: 'Feedlines', material: 'Niobium' }
    ]
  },
  ioPads: {
    id: 'ioPads',
    name: 'I/O Bond Pads',
    materials: ['Gold', 'Aluminum', 'Indium'],
    description: 'Connection points where the chip plugs into the larger system, similar to pins on a computer chip. Signals flow in to control the qubits and flow out to report measurement results.',
    subcomponents: [
      { name: 'Bond Pads', material: 'Gold' },
      { name: 'Wire Bonds', material: 'Aluminum' },
      { name: 'Bump Bonds', material: 'Indium' }
    ]
  },
  substrate: {
    id: 'substrate',
    name: 'Silicon Substrate',
    materials: ['Silicon', 'Sapphire'],
    description: 'The flat base layer that all other components are built on top of, like a circuit board for the quantum chip. Made from ultra-pure crystal to avoid interference with the delicate quantum signals.',
    subcomponents: [
      { name: 'Wafer Base', material: 'Silicon' },
      { name: 'Oxide Layer', material: 'Silicon' },
      { name: 'Alternative Base', material: 'Sapphire' }
    ]
  },
  shielding: {
    id: 'shielding',
    name: 'Magnetic Shielding',
    materials: ['Mu-Metal', 'Aluminum'],
    description: 'Protective layers that block outside magnetic fields and radio-frequency signals from reaching the qubits. Even tiny interference can disrupt a quantum calculation, so multiple shield layers are used.',
    subcomponents: [
      { name: 'Inner Shield', material: 'Mu-Metal' },
      { name: 'Outer Shield', material: 'Mu-Metal' },
      { name: 'RF Shield', material: 'Aluminum' }
    ]
  }
};

const DRAG_THRESHOLD = 3;
const MAX_ROTATION = 25;

function QPUDiagram() {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [hoveredQubit, setHoveredQubit] = useState(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const wrapperRef = useRef(null);
  const dragStartRef = useRef(null);
  const hasDraggedRef = useRef(false);

  const qubits = [];
  const gridSize = 5;
  const qubitSpacing = 44;
  const startX = 200;
  const startY = 140;

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      qubits.push({
        id: `q${row * gridSize + col}`,
        x: startX + col * qubitSpacing,
        y: startY + row * qubitSpacing,
        row,
        col
      });
    }
  }

  // --- 3D tilt drag handlers ---
  const handlePointerDown = useCallback((e) => {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartRef.current = { x: clientX, y: clientY, rotX: rotation.x, rotY: rotation.y };
    hasDraggedRef.current = false;
  }, [rotation]);

  const handlePointerMove = useCallback((e) => {
    if (!dragStartRef.current) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - dragStartRef.current.x;
    const dy = clientY - dragStartRef.current.y;

    if (!hasDraggedRef.current && Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) return;

    hasDraggedRef.current = true;
    if (!isDragging) setIsDragging(true);

    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const sensitivity = 0.3;
    const newRotY = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, dragStartRef.current.rotY + dx * sensitivity));
    const newRotX = Math.max(-MAX_ROTATION, Math.min(MAX_ROTATION, dragStartRef.current.rotX - dy * sensitivity));
    setRotation({ x: newRotX, y: newRotY });
  }, [isDragging]);

  const handlePointerUp = useCallback(() => {
    dragStartRef.current = null;
    setIsDragging(false);
  }, []);

  const handleComponentClick = (componentId) => {
    if (hasDraggedRef.current) return;
    setSelectedComponent(selectedComponent === componentId ? null : componentId);
    setSelectedMaterial(null);
  };

  const handleMaterialSelect = (materialName) => {
    const materialData = getMaterialData(materialName);
    setSelectedMaterial(materialData);
  };

  const activeComponent = selectedComponent ? qpuComponents[selectedComponent] : null;

  // Pin positions for package pins (QFP-style protruding leads)
  const topPins = Array.from({ length: 10 }, (_, i) => 95 + i * 44);
  const bottomPins = Array.from({ length: 10 }, (_, i) => 95 + i * 44);
  const leftPins = Array.from({ length: 8 }, (_, i) => 95 + i * 44);
  const rightPins = Array.from({ length: 8 }, (_, i) => 95 + i * 44);

  // Bond wire connection points (inner die pads to outer package pins)
  const bondWireData = {
    top: topPins.slice(1, 9).map((px) => ({
      outerX: px + 12, outerY: 50,
      innerX: px + 12, innerY: 88
    })),
    bottom: bottomPins.slice(1, 9).map((px) => ({
      outerX: px + 12, outerY: 470,
      innerX: px + 12, innerY: 432
    })),
    left: leftPins.map((py) => ({
      outerX: 40, outerY: py + 8,
      innerX: 78, innerY: py + 8
    })),
    right: rightPins.map((py) => ({
      outerX: 560, outerY: py + 8,
      innerX: 522, innerY: py + 8
    }))
  };

  return (
    <div className="qpu-diagram-container">
      <div className="qpu-main-layout">
        {/* 3D tilt wrapper */}
        <div
          ref={wrapperRef}
          className="chip-3d-wrapper"
          style={{
            transform: `perspective(800px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out',
            filter: `drop-shadow(${rotation.y * 0.3}px ${-rotation.x * 0.3 + 4}px 8px rgba(0,0,0,0.5))`
          }}
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          <svg viewBox="0 0 600 520" className="qpu-chip-svg">
            <defs>
              {/* Background */}
              <linearGradient id="chipBg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--svg-chip-bg-start)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--svg-chip-bg-end)' }} />
              </linearGradient>

              {/* Package body — dark ceramic */}
              <linearGradient id="packageGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--svg-package-start)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--svg-package-end)' }} />
              </linearGradient>

              {/* Die — silicon metallic diagonal sheen */}
              <linearGradient id="dieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--svg-die-start)' }} />
                <stop offset="40%" style={{ stopColor: 'var(--svg-die-mid1)' }} />
                <stop offset="60%" style={{ stopColor: 'var(--svg-die-mid2)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--svg-die-end)' }} />
              </linearGradient>

              {/* Inner bevel for package */}
              <linearGradient id="packageBevel" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--svg-bevel-start)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--svg-bevel-end)' }} />
              </linearGradient>

              {/* Qubit gradients */}
              <linearGradient id="qubitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--svg-qubit-start)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--svg-qubit-end)' }} />
              </linearGradient>
              <linearGradient id="qubitHover" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--svg-qubit-hover-start)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--svg-qubit-hover-end)' }} />
              </linearGradient>

              {/* Control electronics */}
              <linearGradient id="controlGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--svg-control-start)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--svg-control-end)' }} />
              </linearGradient>

              {/* Readout resonators */}
              <linearGradient id="resonatorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'var(--svg-resonator-start)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--svg-resonator-end)' }} />
              </linearGradient>

              {/* Bond pad / pin gold */}
              <linearGradient id="padGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--svg-pad-start)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--svg-pad-end)' }} />
              </linearGradient>

              {/* Bond wire gold */}
              <linearGradient id="bondWireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--svg-bond-start)' }} />
                <stop offset="100%" style={{ stopColor: 'var(--svg-bond-end)' }} />
              </linearGradient>

              {/* Grid pattern for die surface */}
              <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="var(--svg-grid-pattern)" strokeWidth="0.5"/>
              </pattern>
            </defs>

            {/* 1. Background */}
            <rect x="0" y="0" width="600" height="520" fill="url(#chipBg)" />

            {/* 2. Package body (clickable as shielding) */}
            <g
              className={`chip-component ${selectedComponent === 'shielding' ? 'selected' : ''}`}
              onClick={() => handleComponentClick('shielding')}
            >
              {/* Outer package */}
              <rect x="30" y="30" width="540" height="460" rx="6" ry="6"
                fill="url(#packageGradient)"
                stroke={selectedComponent === 'shielding' ? 'var(--accent)' : 'var(--svg-stroke-package)'}
                strokeWidth={selectedComponent === 'shielding' ? 2.5 : 2}
              />
              {/* Inner bevel */}
              <rect x="36" y="36" width="528" height="448" rx="4" ry="4"
                fill="none"
                stroke="var(--svg-stroke-bevel)"
                strokeWidth="1"
                opacity="0.5"
              />
              {/* Pin 1 indicator */}
              <circle cx="48" cy="48" r="5" fill="var(--svg-stroke-bevel)" stroke="var(--svg-stroke-alignment)" strokeWidth="1" />
            </g>

            {/* 3. Package pins — QFP-style protruding leads (clickable as ioPads) */}
            <g
              className={`chip-component ${selectedComponent === 'ioPads' ? 'selected' : ''}`}
              onClick={() => handleComponentClick('ioPads')}
            >
              {/* Top pins — extend above package */}
              {topPins.map((px, i) => (
                <rect key={`top-pin-${i}`} x={px} y={14} width={24} height={24} rx="1"
                  fill="url(#padGradient)"
                  stroke={selectedComponent === 'ioPads' ? 'var(--accent)' : 'var(--svg-stroke-pin)'}
                  strokeWidth={selectedComponent === 'ioPads' ? 1.5 : 0.5}
                />
              ))}
              {/* Bottom pins — extend below package */}
              {bottomPins.map((px, i) => (
                <rect key={`bot-pin-${i}`} x={px} y={482} width={24} height={24} rx="1"
                  fill="url(#padGradient)"
                  stroke={selectedComponent === 'ioPads' ? 'var(--accent)' : 'var(--svg-stroke-pin)'}
                  strokeWidth={selectedComponent === 'ioPads' ? 1.5 : 0.5}
                />
              ))}
              {/* Left pins */}
              {leftPins.map((py, i) => (
                <rect key={`left-pin-${i}`} x={14} y={py} width={24} height={16} rx="1"
                  fill="url(#padGradient)"
                  stroke={selectedComponent === 'ioPads' ? 'var(--accent)' : 'var(--svg-stroke-pin)'}
                  strokeWidth={selectedComponent === 'ioPads' ? 1.5 : 0.5}
                />
              ))}
              {/* Right pins */}
              {rightPins.map((py, i) => (
                <rect key={`right-pin-${i}`} x={562} y={py} width={24} height={16} rx="1"
                  fill="url(#padGradient)"
                  stroke={selectedComponent === 'ioPads' ? 'var(--accent)' : 'var(--svg-stroke-pin)'}
                  strokeWidth={selectedComponent === 'ioPads' ? 1.5 : 0.5}
                />
              ))}
            </g>

            {/* 4. Bond wires (decorative, non-clickable) */}
            <g className="bond-wires" pointerEvents="none">
              {/* Top bond wires */}
              {bondWireData.top.map((w, i) => (
                <path key={`bw-top-${i}`}
                  d={`M${w.outerX},${w.outerY} Q${w.outerX},${(w.outerY + w.innerY) / 2 - 8} ${w.innerX},${w.innerY}`}
                  stroke="url(#bondWireGradient)" strokeWidth="0.8" fill="none" opacity="0.7"
                />
              ))}
              {/* Bottom bond wires */}
              {bondWireData.bottom.map((w, i) => (
                <path key={`bw-bot-${i}`}
                  d={`M${w.outerX},${w.outerY} Q${w.outerX},${(w.outerY + w.innerY) / 2 + 8} ${w.innerX},${w.innerY}`}
                  stroke="url(#bondWireGradient)" strokeWidth="0.8" fill="none" opacity="0.7"
                />
              ))}
              {/* Left bond wires */}
              {bondWireData.left.map((w, i) => (
                <path key={`bw-left-${i}`}
                  d={`M${w.outerX},${w.outerY} Q${(w.outerX + w.innerX) / 2 - 8},${w.outerY} ${w.innerX},${w.innerY}`}
                  stroke="url(#bondWireGradient)" strokeWidth="0.8" fill="none" opacity="0.7"
                />
              ))}
              {/* Right bond wires */}
              {bondWireData.right.map((w, i) => (
                <path key={`bw-right-${i}`}
                  d={`M${w.outerX},${w.outerY} Q${(w.outerX + w.innerX) / 2 + 8},${w.outerY} ${w.innerX},${w.innerY}`}
                  stroke="url(#bondWireGradient)" strokeWidth="0.8" fill="none" opacity="0.7"
                />
              ))}
            </g>

            {/* 5. Die — silicon substrate (clickable as substrate) */}
            <g
              className={`chip-component ${selectedComponent === 'substrate' ? 'selected' : ''}`}
              onClick={() => handleComponentClick('substrate')}
            >
              <rect x="70" y="70" width="460" height="380" rx="3" ry="3"
                fill="url(#dieGradient)"
                stroke={selectedComponent === 'substrate' ? 'var(--accent)' : 'var(--svg-stroke-die)'}
                strokeWidth={selectedComponent === 'substrate' ? 2 : 1.5}
              />
              {/* Grid pattern on die */}
              <rect x="70" y="70" width="460" height="380" rx="3" ry="3" fill="url(#gridPattern)" />

              {/* Corner alignment marks (L-shaped) */}
              {/* Top-left */}
              <path d="M78,78 L78,92" stroke="var(--svg-stroke-alignment)" strokeWidth="1" fill="none" />
              <path d="M78,78 L92,78" stroke="var(--svg-stroke-alignment)" strokeWidth="1" fill="none" />
              {/* Top-right */}
              <path d="M522,78 L522,92" stroke="var(--svg-stroke-alignment)" strokeWidth="1" fill="none" />
              <path d="M522,78 L508,78" stroke="var(--svg-stroke-alignment)" strokeWidth="1" fill="none" />
              {/* Bottom-left */}
              <path d="M78,442 L78,428" stroke="var(--svg-stroke-alignment)" strokeWidth="1" fill="none" />
              <path d="M78,442 L92,442" stroke="var(--svg-stroke-alignment)" strokeWidth="1" fill="none" />
              {/* Bottom-right */}
              <path d="M522,442 L522,428" stroke="var(--svg-stroke-alignment)" strokeWidth="1" fill="none" />
              <path d="M522,442 L508,442" stroke="var(--svg-stroke-alignment)" strokeWidth="1" fill="none" />
            </g>

            {/* 6. Circuit traces (decorative, non-clickable) */}
            <g className="circuit-traces" pointerEvents="none" opacity="0.4">
              {/* Traces from left control area to qubit array */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={`trace-l-${i}`}
                  x1="170" y1={155 + i * 44}
                  x2="180" y2={155 + i * 44}
                  stroke="var(--svg-trace-control)" strokeWidth="0.6"
                />
              ))}
              {/* Traces from right control area to qubit array */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={`trace-r-${i}`}
                  x1="420" y1={155 + i * 44}
                  x2="430" y2={155 + i * 44}
                  stroke="var(--svg-trace-control)" strokeWidth="0.6"
                />
              ))}
              {/* Traces from top resonators to qubit array */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={`trace-t-${i}`}
                  x1={200 + i * 44} y1="125"
                  x2={200 + i * 44} y2="130"
                  stroke="var(--svg-trace-resonator)" strokeWidth="0.6"
                />
              ))}
              {/* Traces from bottom resonators to qubit array */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line key={`trace-b-${i}`}
                  x1={200 + i * 44} y1="390"
                  x2={200 + i * 44} y2="395"
                  stroke="var(--svg-trace-resonator)" strokeWidth="0.6"
                />
              ))}
              {/* Horizontal bus lines across die */}
              <line x1="100" y1="260" x2="170" y2="260" stroke="var(--svg-trace-bus-h)" strokeWidth="0.4" />
              <line x1="430" y1="260" x2="500" y2="260" stroke="var(--svg-trace-bus-h)" strokeWidth="0.4" />
              {/* Vertical bus lines across die */}
              <line x1="300" y1="85" x2="300" y2="100" stroke="var(--svg-trace-bus-v)" strokeWidth="0.4" />
              <line x1="300" y1="420" x2="300" y2="435" stroke="var(--svg-trace-bus-v)" strokeWidth="0.4" />
            </g>

            {/* 7. Control Electronics — Left side */}
            <g
              className={`chip-component ${selectedComponent === 'controlElectronics' ? 'selected' : ''}`}
              onClick={() => handleComponentClick('controlElectronics')}
            >
              <rect x="100" y="115" width="70" height="290" rx="3"
                fill="url(#controlGradient)"
                fillOpacity="0.8"
                stroke={selectedComponent === 'controlElectronics' ? 'var(--accent)' : 'var(--svg-stroke-control)'}
                strokeWidth={selectedComponent === 'controlElectronics' ? 2 : 1}
              />
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <line key={`ctrl-line-${i}`} x1="110" y1={130 + i * 27} x2="160" y2={130 + i * 27}
                  stroke="var(--svg-trace-control)" strokeWidth="1.5" strokeLinecap="round"/>
              ))}
            </g>

            {/* Control Electronics — Right side */}
            <g
              className={`chip-component ${selectedComponent === 'controlElectronics' ? 'selected' : ''}`}
              onClick={() => handleComponentClick('controlElectronics')}
            >
              <rect x="430" y="115" width="70" height="290" rx="3"
                fill="url(#controlGradient)"
                fillOpacity="0.8"
                stroke={selectedComponent === 'controlElectronics' ? 'var(--accent)' : 'var(--svg-stroke-control)'}
                strokeWidth={selectedComponent === 'controlElectronics' ? 2 : 1}
              />
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <line key={`ctrl-line-r-${i}`} x1="440" y1={130 + i * 27} x2="490" y2={130 + i * 27}
                  stroke="var(--svg-trace-control)" strokeWidth="1.5" strokeLinecap="round"/>
              ))}
            </g>

            {/* 8. Readout Resonators */}
            <g
              className={`chip-component ${selectedComponent === 'readoutResonators' ? 'selected' : ''}`}
              onClick={() => handleComponentClick('readoutResonators')}
            >
              {/* Top resonator bank */}
              <rect x="185" y="100" width="230" height="25" rx="3"
                fill="url(#resonatorGradient)"
                fillOpacity="0.85"
                stroke={selectedComponent === 'readoutResonators' ? 'var(--accent)' : 'var(--svg-stroke-resonator)'}
                strokeWidth={selectedComponent === 'readoutResonators' ? 2 : 1}
              />
              {[0, 1, 2, 3, 4].map((i) => (
                <path key={`res-top-${i}`}
                  d={`M${200 + i * 45},107 Q${210 + i * 45},112 ${200 + i * 45},117 Q${190 + i * 45},122 ${200 + i * 45},117`}
                  stroke="var(--svg-trace-resonator)" strokeWidth="1" fill="none"
                />
              ))}

              {/* Bottom resonator bank */}
              <rect x="185" y="395" width="230" height="25" rx="3"
                fill="url(#resonatorGradient)"
                fillOpacity="0.85"
                stroke={selectedComponent === 'readoutResonators' ? 'var(--accent)' : 'var(--svg-stroke-resonator)'}
                strokeWidth={selectedComponent === 'readoutResonators' ? 2 : 1}
              />
              {[0, 1, 2, 3, 4].map((i) => (
                <path key={`res-bot-${i}`}
                  d={`M${200 + i * 45},402 Q${210 + i * 45},407 ${200 + i * 45},412 Q${190 + i * 45},417 ${200 + i * 45},412`}
                  stroke="var(--svg-trace-resonator)" strokeWidth="1" fill="none"
                />
              ))}
            </g>

            {/* 9. Qubit Array — Central processor core */}
            <g
              className={`chip-component ${selectedComponent === 'qubitArray' ? 'selected' : ''}`}
              onClick={() => handleComponentClick('qubitArray')}
            >
              {/* Qubit array background */}
              <rect x="180" y="130" width="240" height="260" rx="6"
                fill="var(--svg-qubit-array-bg)"
                fillOpacity="0.6"
                stroke={selectedComponent === 'qubitArray' ? 'var(--accent)' : 'var(--svg-stroke-qubit-array)'}
                strokeWidth={selectedComponent === 'qubitArray' ? 2 : 1}
              />

              {/* Individual qubits */}
              {qubits.map((qubit) => (
                <g key={qubit.id}
                  onMouseEnter={() => setHoveredQubit(qubit.id)}
                  onMouseLeave={() => setHoveredQubit(null)}
                >
                  <rect
                    x={qubit.x - 16}
                    y={qubit.y - 16}
                    width={32}
                    height={32}
                    rx="4"
                    fill={hoveredQubit === qubit.id ? 'url(#qubitHover)' : 'url(#qubitGradient)'}
                    stroke={hoveredQubit === qubit.id ? 'var(--accent)' : 'var(--svg-stroke-qubit)'}
                    strokeWidth={hoveredQubit === qubit.id ? 1.5 : 0.5}
                    style={{ cursor: 'pointer' }}
                  />
                  <rect x={qubit.x - 4} y={qubit.y - 8} width={8} height={4} fill="var(--svg-qubit-jj)" rx="1"/>
                  <line x1={qubit.x} y1={qubit.y - 8} x2={qubit.x} y2={qubit.y - 14} stroke="var(--svg-qubit-jj)" strokeWidth="2"/>
                  <line x1={qubit.x} y1={qubit.y - 4} x2={qubit.x} y2={qubit.y + 4} stroke="var(--svg-qubit-jj)" strokeWidth="2"/>
                  <rect x={qubit.x - 4} y={qubit.y + 4} width={8} height={4} fill="var(--svg-qubit-jj)" rx="1"/>
                </g>
              ))}

              {/* Coupling lines between adjacent qubits */}
              {qubits.map((qubit) => (
                <g key={`coupling-${qubit.id}`}>
                  {qubit.col < gridSize - 1 && (
                    <line
                      x1={qubit.x + 16} y1={qubit.y}
                      x2={qubit.x + qubitSpacing - 16} y2={qubit.y}
                      stroke="var(--svg-stroke-coupling)" strokeWidth="1" strokeOpacity="0.5"
                    />
                  )}
                  {qubit.row < gridSize - 1 && (
                    <line
                      x1={qubit.x} y1={qubit.y + 16}
                      x2={qubit.x} y2={qubit.y + qubitSpacing - 16}
                      stroke="var(--svg-stroke-coupling)" strokeWidth="1" strokeOpacity="0.5"
                    />
                  )}
                </g>
              ))}
            </g>

            {/* 10. Numbered component labels (topmost layer) */}
            <g className="component-labels">
              {[
                { id: 'qubitArray', num: 1, x: 412, y: 373 },
                { id: 'controlElectronics', num: 2, x: 135, y: 393 },
                { id: 'readoutResonators', num: 3, x: 398, y: 112 },
                { id: 'ioPads', num: 4, x: 107, y: 26 },
                { id: 'substrate', num: 5, x: 510, y: 435 },
                { id: 'shielding', num: 6, x: 555, y: 475 },
              ].map(({ id, num, x, y }) => (
                <g
                  key={`label-${id}`}
                  className="component-label"
                  onClick={() => handleComponentClick(id)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle cx={x} cy={y} r="11"
                    fill="var(--svg-label-bg)"
                    fillOpacity="0.9"
                    stroke={selectedComponent === id ? 'var(--accent)' : 'var(--svg-label-stroke)'}
                    strokeWidth={selectedComponent === id ? 1.5 : 1}
                  />
                  <text x={x} y={y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={selectedComponent === id ? 'var(--accent)' : 'var(--svg-label-text)'}
                    fontSize="10"
                    fontFamily="'DM Mono', monospace"
                    fontWeight="500"
                    style={{ pointerEvents: 'none' }}
                  >
                    {num}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>

        {/* Detail Panel */}
        <div className="qpu-detail-panel">
          {activeComponent && !selectedMaterial ? (
            <div className="component-detail active">
              <div className="detail-header">
                <h3>{activeComponent.name}</h3>
                <button className="close-btn" onClick={() => setSelectedComponent(null)}>×</button>
              </div>
              <p className="detail-description">{activeComponent.description}</p>

              <div className="materials-section">
                <h4>Materials Used</h4>
                <div className="material-list">
                  {activeComponent.materials.map((mat) => {
                    const matData = getMaterialData(mat);
                    return (
                      <button
                        key={mat}
                        className="material-tag clickable"
                        onClick={() => handleMaterialSelect(mat)}
                      >
                        {mat}
                        {matData && <span className="mat-percent">{matData.chipPercentage}%</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="subcomponents-section">
                <h4>Component Structure</h4>
                <div className="subcomponent-list">
                  {activeComponent.subcomponents.map((sub, idx) => (
                    <div
                      key={idx}
                      className="subcomponent-item clickable"
                      onClick={() => handleMaterialSelect(sub.material)}
                    >
                      <span className="sub-name">{sub.name}</span>
                      <span className="sub-material">{sub.material}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : selectedMaterial ? (
            <div className="material-detail active">
              <div className="detail-header">
                <button className="back-btn" onClick={() => setSelectedMaterial(null)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </button>
                <h3>{selectedMaterial.name}</h3>
                <button className="close-btn" onClick={() => { setSelectedMaterial(null); setSelectedComponent(null); }}>×</button>
              </div>

              <div className="material-stats">
                <div className="stat-item">
                  <span className="stat-value">{selectedMaterial.chipPercentage}%</span>
                  <span className="stat-label">of system</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{selectedMaterial.category}</span>
                  <span className="stat-label">Category</span>
                </div>
              </div>

              <p className="detail-description">{selectedMaterial.description}</p>

              <div className="source-section">
                <h4>Global Sources</h4>
                <WorldMap sourceCountries={selectedMaterial.sourceCountries} compact />
                <div className="country-breakdown">
                  {selectedMaterial.sourceCountries.map((source, idx) => (
                    <div key={idx} className="country-row">
                      <span className="country-name">{source.country}</span>
                      <div className="share-bar-container">
                        <div
                          className="share-bar"
                          style={{ width: `${source.marketShare}%` }}
                        />
                      </div>
                      <span className="share-value">{source.marketShare}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="component-detail placeholder">
              <div className="placeholder-content">
                <div className="placeholder-icon">
                  <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <rect x="7" y="7" width="3" height="3"/>
                    <rect x="14" y="7" width="3" height="3"/>
                    <rect x="7" y="14" width="3" height="3"/>
                    <rect x="14" y="14" width="3" height="3"/>
                  </svg>
                </div>
                <p className="placeholder-text">Click on any part of the chip diagram to see what it does and what materials it is made from</p>

                <div className="component-legend">
                  <div className="legend-item" onClick={() => handleComponentClick('qubitArray')}>
                    <span className="legend-color" style={{background: 'var(--svg-legend-qubit)'}}></span>
                    <span>Qubit Array</span>
                  </div>
                  <div className="legend-item" onClick={() => handleComponentClick('controlElectronics')}>
                    <span className="legend-color" style={{background: 'var(--svg-legend-control)'}}></span>
                    <span>Control Electronics</span>
                  </div>
                  <div className="legend-item" onClick={() => handleComponentClick('readoutResonators')}>
                    <span className="legend-color" style={{background: 'var(--svg-legend-resonator)'}}></span>
                    <span>Readout Resonators</span>
                  </div>
                  <div className="legend-item" onClick={() => handleComponentClick('ioPads')}>
                    <span className="legend-color" style={{background: 'var(--svg-legend-io)'}}></span>
                    <span>I/O Bond Pads</span>
                  </div>
                  <div className="legend-item" onClick={() => handleComponentClick('substrate')}>
                    <span className="legend-color" style={{background: 'var(--svg-legend-substrate)'}}></span>
                    <span>Silicon Substrate</span>
                  </div>
                  <div className="legend-item" onClick={() => handleComponentClick('shielding')}>
                    <span className="legend-color" style={{background: 'var(--svg-legend-shielding)'}}></span>
                    <span>Magnetic Shielding</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QPUDiagram;
