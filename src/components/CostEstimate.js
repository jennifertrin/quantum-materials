import React, { useState } from 'react';
import { quantumMaterials } from '../data/materials';
import { staticPrices, parseMassToKg, calculateMaterialCost } from '../data/materialPrices';
import './CostEstimate.css';

// ---------------------------------------------------------------------------
// Currency formatter — adaptive: $2.8M, $14K, $8.50, < $0.01
// ---------------------------------------------------------------------------
function formatCurrency(value) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 10_000) return `$${Math.round(value / 1_000)}K`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  if (value >= 0.01) return `$${value.toFixed(2)}`;
  if (value > 0) return '< $0.01';
  return '$0.00';
}

function formatPricePerKg(value) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 10_000) return `$${Math.round(value / 1_000)}K`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  if (value >= 1) return `$${value.toFixed(2)}`;
  if (value >= 0.01) return `$${value.toFixed(2)}`;
  return '< $0.01';
}

function formatMass(massKg) {
  if (massKg >= 1) return `${massKg.toFixed(massKg % 1 ? 1 : 0)} kg`;
  if (massKg >= 1e-3) return `${(massKg * 1e3).toFixed(massKg * 1e3 % 1 ? 1 : 0)} g`;
  if (massKg >= 1e-6) return `${(massKg * 1e6).toFixed(massKg * 1e6 % 1 ? 1 : 0)} mg`;
  if (massKg > 0) return `${(massKg * 1e9).toFixed(0)} ng`;
  return '—';
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function CostEstimate() {
  const [showTable, setShowTable] = useState(false);

  const rows = quantumMaterials.map((mat) => {
    const massKg = parseMassToKg(mat.approximateMass);
    const cost = calculateMaterialCost(mat.name, massKg);
    return { ...mat, ...cost, source: staticPrices[mat.name]?.source ?? '' };
  });

  rows.sort((a, b) => b.totalCost - a.totalCost);

  const totalCost = rows.reduce((sum, r) => sum + r.totalCost, 0);

  return (
    <div className="cost-estimate-container">
      {/* Summary */}
      <div className="cost-summary">
        <p className="cost-summary-value">{formatCurrency(totalCost)}</p>
        <p className="cost-summary-meta">
          <span>{rows.length} materials</span>
          <span className="meta-sep">/</span>
          <span>commodity-grade pricing</span>
        </p>
      </div>

      {/* Context note */}
      <div className="cost-context">
        Raw materials are a small fraction of total system cost.
        A full quantum computer typically runs <strong>$10M–$50M+</strong> including
        cryogenics, electronics, fabrication, and facilities.
      </div>

      {/* Toggle */}
      <button
        className="cost-toggle"
        onClick={() => setShowTable((v) => !v)}
        aria-expanded={showTable}
      >
        <svg
          className={`cost-toggle-icon ${showTable ? 'cost-toggle-icon-open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Material breakdown</span>
        <span className="cost-toggle-count">{rows.length}</span>
      </button>

      {/* Collapsible table */}
      {showTable && (
        <div className="cost-table-wrapper">
          <table className="cost-table">
            <thead>
              <tr>
                <th>Material</th>
                <th className="align-right">$/kg</th>
                <th className="align-right">Quantity</th>
                <th className="align-right">Est. Cost</th>
                <th className="align-right">Source</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="cost-material-name">{r.name}</div>
                    <div className="cost-material-category">{r.category}</div>
                  </td>
                  <td className="mono">{formatPricePerKg(r.pricePerKg)}/kg</td>
                  <td className="mono">{formatMass(r.massKg)}</td>
                  <td className="mono">{formatCurrency(r.totalCost)}</td>
                  <td className="mono cost-source-cell">{r.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Disclaimer */}
          <div className="cost-disclaimer">
            Prices reflect raw commodity rates, not quantum-grade pricing.
            Actual costs for lab-grade and isotopically purified materials are
            typically 10–100× higher.
          </div>
        </div>
      )}
    </div>
  );
}
