import React, { useState, useRef } from 'react';
import MaterialsList from './components/MaterialsList';
import QuantumStructure from './components/QuantumStructure';
import MaterialsChart from './components/MaterialsChart';
import CostEstimate from './components/CostEstimate';
import ThemeToggle from './components/ThemeToggle';
import { quantumMaterials } from './data/materials';
import './App.css';

function App() {
  const [searchFilter, setSearchFilter] = useState('');
  const materialsRef = useRef(null);

  const scrollToMaterials = (materialName) => {
    setSearchFilter(materialName);
    setTimeout(() => {
      materialsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="header-text">
            <h1>Quantum Computer Materials</h1>
            <p className="subtitle">Exploring the essential materials used in quantum processor manufacturing</p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="main-content">
        <section className="section cost-section">
          <div className="section-header">
            <h2>Raw Materials Cost</h2>
            <p>Estimated cost breakdown based on commodity prices</p>
          </div>
          <CostEstimate />
        </section>

        <section className="section qpu-section">
          <div className="section-header">
            <h2>Quantum Computer Structure</h2>
            <p>Explore the dilution refrigerator and drill down into the quantum processor chip</p>
          </div>
          <QuantumStructure />
        </section>

        <section className="section charts-section">
          <div className="section-header">
            <h2>Material Composition</h2>
            <p>Breakdown of materials by category and percentage</p>
          </div>
          <MaterialsChart materials={quantumMaterials} onMaterialClick={scrollToMaterials} />
        </section>

        <section className="section materials-section" ref={materialsRef}>
          <div className="section-header">
            <h2>Materials Database</h2>
            <p>Complete database of quantum computing materials and their global sources</p>
          </div>
          <MaterialsList initialSearch={searchFilter} />
        </section>
      </main>

      <footer className="footer">
        <p>Data represents typical superconducting quantum computer architecture</p>
      </footer>
    </div>
  );
}

export default App;
