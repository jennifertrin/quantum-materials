import React, { useState } from 'react';
import './MaterialsChart.css';

function MaterialsChart({ materials, onMaterialClick }) {
  const [activeChart, setActiveChart] = useState('composition');

  // Group materials by category
  const categoryData = materials.reduce((acc, mat) => {
    if (!acc[mat.category]) {
      acc[mat.category] = { total: 0, count: 0 };
    }
    acc[mat.category].total += mat.chipPercentage;
    acc[mat.category].count += 1;
    return acc;
  }, {});

  const categories = Object.entries(categoryData)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.total - a.total);

  // Top materials by composition
  const topMaterials = [...materials]
    .sort((a, b) => b.chipPercentage - a.chipPercentage)
    .slice(0, 10);

  // Colors for categories
  const categoryColors = {
    'Superconductors': 'var(--data-1)',
    'Substrates': 'var(--data-2)',
    'Interconnects': 'var(--accent)',
    'Thermal Management': 'var(--data-4)',
    'Cryogenics': 'var(--data-3)',
    'Shielding': 'var(--data-6)',
    'Insulation': 'var(--data-7)',
    'Spin Qubits': 'var(--data-5)',
    'Trapped Ions': 'var(--data-8)',
    'Neutral Atoms': 'var(--data-9)'
  };

  const totalPercentage = materials.reduce((sum, m) => sum + m.chipPercentage, 0);

  // Calculate pie chart segments
  const pieSegments = categories.map((cat, index) => {
    const startAngle = categories
      .slice(0, index)
      .reduce((sum, c) => sum + (c.total / totalPercentage) * 360, 0);
    const angle = (cat.total / totalPercentage) * 360;
    return { ...cat, startAngle, angle, color: categoryColors[cat.name] || '#666' };
  });

  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = (angle - 90) * Math.PI / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  };

  const describeArc = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
  };

  return (
    <div className="materials-chart-container">
      <div className="chart-tabs">
        <button
          className={`chart-tab ${activeChart === 'composition' ? 'active' : ''}`}
          onClick={() => setActiveChart('composition')}
        >
          Top Materials
        </button>
        <button
          className={`chart-tab ${activeChart === 'category' ? 'active' : ''}`}
          onClick={() => setActiveChart('category')}
        >
          By Category
        </button>
        <button
          className={`chart-tab ${activeChart === 'pie' ? 'active' : ''}`}
          onClick={() => setActiveChart('pie')}
        >
          Distribution
        </button>
      </div>

      <div className="chart-content">
        {activeChart === 'composition' && (
          <div className="bar-chart">
            <h3>Top 10 Materials by System Composition</h3>
            {topMaterials.map((mat, index) => (
              <div
                key={mat.id}
                className="bar-row bar-row-clickable"
                onClick={() => onMaterialClick && onMaterialClick(mat.name)}
              >
                <div className="bar-label">
                  <span className="bar-rank">#{index + 1}</span>
                  <span className="bar-name">{mat.name}</span>
                </div>
                <div className="bar-container">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(mat.chipPercentage / topMaterials[0].chipPercentage) * 100}%`,
                      background: categoryColors[mat.category] || '#6366f1'
                    }}
                  >
                    <span className="bar-value">{mat.chipPercentage}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeChart === 'category' && (
          <div className="category-chart">
            <h3>Materials by Category</h3>
            <div className="category-bars">
              {categories.map((cat) => (
                <div key={cat.name} className="category-row">
                  <div className="category-info">
                    <span
                      className="category-color"
                      style={{ background: categoryColors[cat.name] || '#666' }}
                    />
                    <span className="category-name">{cat.name}</span>
                    <span className="category-count">({cat.count})</span>
                  </div>
                  <div className="category-bar-container">
                    <div
                      className="category-bar-fill"
                      style={{
                        width: `${(cat.total / categories[0].total) * 100}%`,
                        background: categoryColors[cat.name] || '#666'
                      }}
                    />
                  </div>
                  <span className="category-value">{cat.total.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeChart === 'pie' && (
          <div className="pie-chart">
            <h3>Category Distribution</h3>
            <div className="pie-content">
              <svg viewBox="0 0 300 300" className="pie-svg">
                <defs>
                  <filter id="pieGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur"/>
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                {pieSegments.map((seg) => (
                  <path
                    key={seg.name}
                    d={describeArc(150, 150, 120, seg.startAngle, seg.startAngle + seg.angle - 0.5)}
                    fill={seg.color}
                    stroke="var(--chart-pie-stroke)"
                    strokeWidth="2"
                    className="pie-segment"
                  >
                    <title>{seg.name}: {seg.total.toFixed(1)}%</title>
                  </path>
                ))}
                {/* Center circle */}
                <circle cx="150" cy="150" r="60" fill="var(--chart-pie-center)" />
                <text x="150" y="145" textAnchor="middle" fill="var(--chart-pie-label)" fontSize="11" fontFamily="'DM Mono', monospace">
                  Total
                </text>
                <text x="150" y="168" textAnchor="middle" fill="var(--chart-pie-value)" fontSize="18" fontWeight="400" fontFamily="'DM Mono', monospace">
                  {totalPercentage.toFixed(1)}%
                </text>
              </svg>
              <div className="pie-legend">
                {pieSegments.map((seg) => (
                  <div key={seg.name} className="legend-item">
                    <span className="legend-color" style={{ background: seg.color }} />
                    <span className="legend-name">{seg.name}</span>
                    <span className="legend-value">{seg.total.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MaterialsChart;
