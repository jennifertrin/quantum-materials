import React, { useState, Suspense, lazy } from 'react';
import WorldMap from './WorldMap';
import { fridgeComponents, getMaterialData } from '../data/fridgeComponents';
import './FridgeDiagram.css';

const Fridge3DScene = lazy(() => import('./fridge3d/Fridge3DScene'));

const componentOrder = [
  'roomTempElectronics',
  'outerVacuumChamber',
  'upperCoolingStage',
  'lowerCoolingStage',
  'wiringAndSignalLines',
  'mixingChamberQPU',
];

function FridgeDiagram({ onDrillDown }) {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const handleComponentClick = (componentId) => {
    setSelectedComponent(selectedComponent === componentId ? null : componentId);
    setSelectedMaterial(null);
  };

  const handleMaterialSelect = (materialName) => {
    const materialData = getMaterialData(materialName);
    setSelectedMaterial(materialData);
  };

  const activeComponent = selectedComponent ? fridgeComponents[selectedComponent] : null;

  return (
    <div className="fridge-diagram-container">
      <div className="fridge-main-layout">
        {/* 3D Canvas */}
        <Suspense fallback={
          <div className="fridge-canvas-wrapper fridge-canvas-loading">
            <span>Loading 3D model…</span>
          </div>
        }>
          <Fridge3DScene
            onSelectComponent={handleComponentClick}
            selectedComponent={selectedComponent}
          />
        </Suspense>

        {/* Detail Panel */}
        <div className="fridge-detail-panel">
          {activeComponent && !selectedMaterial ? (
            <div className="component-detail active">
              <div className="detail-header">
                <h3>{activeComponent.name}</h3>
                <button className="close-btn" onClick={() => setSelectedComponent(null)}>&times;</button>
              </div>

              <div className="temperature-badge">
                <span className="temp-label">Temp</span>
                <span className="temp-value">{activeComponent.temperature}</span>
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

              {activeComponent.isDrillDown && onDrillDown && (
                <button className="drill-down-cta" onClick={onDrillDown}>
                  Explore QPU Chip
                  <span className="cta-arrow">&rarr;</span>
                </button>
              )}
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
                <button className="close-btn" onClick={() => { setSelectedMaterial(null); setSelectedComponent(null); }}>&times;</button>
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
                        <div className="share-bar" style={{ width: `${source.marketShare}%` }} />
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
                    <path d="M4 4h16v4H4z" />
                    <path d="M6 8v12h12V8" />
                    <path d="M8 12h8" />
                    <path d="M8 16h8" />
                    <circle cx="12" cy="22" r="1.5" />
                  </svg>
                </div>
                <p className="placeholder-text">Click on any stage of the dilution refrigerator to learn about its role and materials</p>

                <div className="component-legend">
                  {componentOrder.map((compId, idx) => (
                    <div key={compId} className="legend-item" onClick={() => handleComponentClick(compId)}>
                      <span className="legend-color" style={{
                        background: [
                          'var(--svg-fridge-stage-copper)',
                          'var(--svg-fridge-shell-start)',
                          'var(--svg-fridge-coolant)',
                          'var(--svg-fridge-coolant-dim)',
                          'var(--svg-fridge-wiring-rf)',
                          'var(--svg-fridge-stage-copper-dim)',
                        ][idx]
                      }}></span>
                      <span>{fridgeComponents[compId].name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FridgeDiagram;
