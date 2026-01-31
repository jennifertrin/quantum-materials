/**
 * Material price data and helpers for cost estimation.
 *
 * All 24 materials use researched static commodity-grade approximations.
 * Sources: USGS Mineral Commodity Summaries, LME spot averages, and
 * specialty-chemical supplier catalogues.
 * Quantum-grade materials are typically 10–100× more expensive.
 */

export const staticPrices = {
  Niobium:                          { pricePerKg: 73,        source: 'USGS 2024 ferroniobium' },
  Aluminum:                         { pricePerKg: 2.4,       source: 'LME spot avg' },
  Silicon:                          { pricePerKg: 3,         source: 'Metallurgical grade' },
  'Sapphire (Al₂O₃)':              { pricePerKg: 400,       source: 'Synthetic boule pricing' },
  Tantalum:                         { pricePerKg: 300,       source: 'USGS concentrate basis' },
  Indium:                           { pricePerKg: 300,       source: 'Minor metals spot' },
  Copper:                           { pricePerKg: 8.5,       source: 'LME spot avg' },
  Gold:                             { pricePerKg: 78000,     source: 'LBMA fix' },
  'Helium-3':                       { pricePerKg: 2000000,   source: 'DOE / specialty gas' },
  'Helium-4':                       { pricePerKg: 120,       source: 'Liquid He market' },
  'Titanium Nitride (TiN)':        { pricePerKg: 500,       source: 'Sputtering target pricing' },
  'Diamond (NV Centers)':          { pricePerKg: 500000,    source: 'Lab-grown quantum grade' },
  Germanium:                        { pricePerKg: 1800,      source: 'USGS / minor metals' },
  'Gallium Arsenide (GaAs)':       { pricePerKg: 3000,      source: 'Wafer-grade compound' },
  'Yttrium Barium Copper Oxide':   { pricePerKg: 1200,      source: 'Bulk YBCO powder' },
  'Mu-Metal':                       { pricePerKg: 55,        source: 'Magnetic alloy supplier' },
  'Beryllium Copper':               { pricePerKg: 45,        source: 'Alloy supplier avg' },
  'Kapton (Polyimide)':            { pricePerKg: 180,       source: 'DuPont / film supplier' },
  Ytterbium:                        { pricePerKg: 14000,     source: 'Rare-earth supplier' },
  Calcium:                          { pricePerKg: 5,         source: 'Metal ingot pricing' },
  Rubidium:                         { pricePerKg: 12000,     source: 'Alkali metal ampules' },
  Strontium:                        { pricePerKg: 6500,      source: 'Metal supplier avg' },
  'Niobium Titanium (NbTi)':       { pricePerKg: 150,       source: 'Superconducting wire' },
  'Phosphorus in Silicon':         { pricePerKg: 300,       source: 'Electronic-grade P' },
};

// --- Mass parser -----------------------------------------------------------
// Converts approximateMass strings from materials.js to kilograms.
// Handles: "~2 g", "~100 kg", "~500 mg", "~5 mg", "< 1 μg"
const UNIT_TO_KG = { kg: 1, g: 1e-3, mg: 1e-6, μg: 1e-9, µg: 1e-9, ug: 1e-9 };

export function parseMassToKg(massString) {
  if (!massString) return 0;
  const match = massString.match(/([\d.]+)\s*(kg|mg|μg|µg|ug|g)\b/i);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();
  return value * (UNIT_TO_KG[unit] ?? 0);
}

// --- Single-material cost calculator ---------------------------------------
export function calculateMaterialCost(name, massKg) {
  const pricePerKg = staticPrices[name]?.pricePerKg ?? 0;
  return {
    pricePerKg,
    massKg,
    totalCost: pricePerKg * massKg,
  };
}
