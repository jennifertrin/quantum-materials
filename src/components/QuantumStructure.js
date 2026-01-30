import React, { useState } from 'react';
import FridgeDiagram from './FridgeDiagram';
import QPUDiagram from './QPUDiagram';
import './QuantumStructure.css';

function QuantumStructure() {
  const [viewLevel, setViewLevel] = useState('structure');

  return (
    <div>
      {/* View toggle tabs */}
      <div className="structure-tabs">
        <button
          className={`structure-tab ${viewLevel === 'structure' ? 'active' : ''}`}
          onClick={() => setViewLevel('structure')}
        >
          Dilution Refrigerator
        </button>
        <button
          className={`structure-tab ${viewLevel === 'chip' ? 'active' : ''}`}
          onClick={() => setViewLevel('chip')}
        >
          QPU Chip
        </button>
      </div>

      {/* View */}
      <div className="structure-view" key={viewLevel}>
        {viewLevel === 'structure' ? (
          <FridgeDiagram onDrillDown={() => setViewLevel('chip')} />
        ) : (
          <QPUDiagram />
        )}
      </div>
    </div>
  );
}

export default QuantumStructure;
