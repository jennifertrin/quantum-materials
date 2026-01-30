import React, { useState, useEffect } from 'react';
import WorldMap from './WorldMap';
import { quantumMaterials } from '../data/materials';
import './MaterialsList.css';

const categories = [...new Set(quantumMaterials.map(m => m.category))];

const categoryDescriptions = {
  'Superconductors': 'Special metals cooled until they conduct electricity perfectly, with no wasted energy',
  'Substrates': 'The flat base that everything is built on, like a circuit board for a quantum chip',
  'Interconnects': 'Tiny wires and joints that connect different parts of the chip together',
  'Thermal Management': 'Materials that draw heat away so the chip stays cold enough to work',
  'Cryogenics': 'Gases and parts used in the giant freezer that chills the chip to near absolute zero',
  'Shielding': 'Protective wrapping that blocks outside signals from disturbing the chip',
  'Insulation': 'Thin layers that keep electrical signals from leaking between components',
  'Spin Qubits': 'Materials for a chip design that stores information in the spin of a single electron',
  'Trapped Ions': 'Materials for a chip design that uses individual charged atoms held in place by electric fields',
  'Neutral Atoms': 'Materials for a chip design that uses individual atoms held in place by laser beams',
};

function MaterialsList({ initialSearch = '' }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [hoveredMaterial, setHoveredMaterial] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, cardBottom: 0 });

  useEffect(() => {
    if (initialSearch) {
      setSearchTerm(initialSearch);
    }
  }, [initialSearch]);

  const filteredMaterials = quantumMaterials.filter(material => {
    const matchesCategory = activeCategory === 'All' || material.category === activeCategory;
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          material.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleMouseEnter = (material, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: rect.left + rect.width / 2,
      y: rect.top,
      cardBottom: rect.bottom
    });
    setHoveredMaterial(material);
  };

  const handleMouseLeave = () => {
    setHoveredMaterial(null);
  };

  return (
    <div className="materials-container">
      <div className="filters">
        <input
          type="text"
          placeholder="Search materials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="category-filters">
          <button
            className={`category-btn ${activeCategory === 'All' ? 'active' : ''}`}
            onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}
          >
            All
          </button>
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
              title={categoryDescriptions[category]}
            >
              {category}
            </button>
          ))}
        </div>
        {activeCategory !== 'All' && categoryDescriptions[activeCategory] && (
          <p className="category-description">{categoryDescriptions[activeCategory]}</p>
        )}
      </div>

      <div className="materials-count">
        Showing {filteredMaterials.length} of {quantumMaterials.length} materials
      </div>

      <div className="materials-grid">
        {filteredMaterials.map(material => (
          <div
            key={material.id}
            className="material-card"
            onMouseEnter={(e) => handleMouseEnter(material, e)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="material-header">
              <h3 className="material-name">{material.name}</h3>
              <span className="material-category">{material.category}</span>
            </div>
            <div className="chip-percentage">
              <div className="percentage-bar">
                <div
                  className="percentage-fill"
                  style={{ width: `${Math.min(material.chipPercentage * 4, 100)}%` }}
                ></div>
              </div>
              <div className="percentage-stats">
                <span className="percentage-text">{material.chipPercentage}% of QPU</span>
                {material.approximateMass && (
                  <span className="mass-text">{material.approximateMass}</span>
                )}
              </div>
            </div>
            <p className="material-description">{material.description}</p>
            <div className="globe-icon" title="Hover for source countries">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <ellipse cx="12" cy="12" rx="4" ry="10" />
                <path d="M2 12h20" />
                <path d="M12 2c3 3 4.5 6 4.5 10s-1.5 7-4.5 10" />
                <path d="M12 2c-3 3-4.5 6-4.5 10s1.5 7 4.5 10" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <div className="no-results">
          No materials found matching your criteria.
        </div>
      )}

      {hoveredMaterial && (() => {
        const popupHeight = 380;
        const gap = 8;
        const spaceAbove = mousePosition.y;
        const showAbove = spaceAbove >= popupHeight + gap;
        const top = showAbove
          ? mousePosition.y - popupHeight - gap
          : mousePosition.cardBottom + gap;
        const clampedTop = Math.max(gap, Math.min(top, window.innerHeight - popupHeight - gap));
        return (
        <div
          className="map-popup"
          style={{
            left: Math.min(mousePosition.x - 225, window.innerWidth - 470),
            top: clampedTop
          }}
        >
          <div className="map-popup-header">
            <h4>{hoveredMaterial.name} - Global Sources</h4>
          </div>
          <WorldMap sourceCountries={hoveredMaterial.sourceCountries} />
          <div className="country-list">
            {hoveredMaterial.sourceCountries.map((source, index) => (
              <div key={index} className="country-item">
                <span className="country-name">{source.country}</span>
                <div className="market-share-bar">
                  <div
                    className="market-share-fill"
                    style={{ width: `${source.marketShare}%` }}
                  ></div>
                </div>
                <span className="market-share-text">{source.marketShare}%</span>
              </div>
            ))}
          </div>
        </div>
        );
      })()}
    </div>
  );
}

export default MaterialsList;
