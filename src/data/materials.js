export const quantumMaterials = [
  {
    id: 1,
    name: "Niobium",
    category: "Superconductors",
    chipPercentage: 15.2,
    approximateMass: "~2 g",
    description: "Used to create superconducting qubits and resonators. Niobium becomes superconducting at temperatures below 9.2K, enabling lossless electrical current flow essential for maintaining quantum coherence.",
    sourceCountries: [
      { country: "Brazil", code: "BR", marketShare: 88 },
      { country: "Canada", code: "CA", marketShare: 8 },
      { country: "Australia", code: "AU", marketShare: 2 },
      { country: "Other", code: "OTHER", marketShare: 2 }
    ]
  },
  {
    id: 2,
    name: "Aluminum",
    category: "Superconductors",
    chipPercentage: 12.5,
    approximateMass: "~1.5 g",
    description: "Forms Josephson junctions, the heart of superconducting qubits. Thin aluminum oxide layers between aluminum electrodes create the quantum tunneling barrier necessary for qubit operation.",
    sourceCountries: [
      { country: "China", code: "CN", marketShare: 56 },
      { country: "India", code: "IN", marketShare: 10 },
      { country: "Russia", code: "RU", marketShare: 6 },
      { country: "Canada", code: "CA", marketShare: 5 },
      { country: "Other", code: "OTHER", marketShare: 23 }
    ]
  },
  {
    id: 3,
    name: "Silicon",
    category: "Substrates",
    chipPercentage: 25.0,
    approximateMass: "~10 g",
    description: "High-purity silicon wafers serve as the substrate for fabricating superconducting circuits. Silicon-28 isotopically purified substrates reduce nuclear spin noise that can cause decoherence.",
    sourceCountries: [
      { country: "China", code: "CN", marketShare: 68 },
      { country: "Russia", code: "RU", marketShare: 7 },
      { country: "Norway", code: "NO", marketShare: 6 },
      { country: "United States", code: "US", marketShare: 5 },
      { country: "Other", code: "OTHER", marketShare: 14 }
    ]
  },
  {
    id: 4,
    name: "Sapphire (Al₂O₃)",
    category: "Substrates",
    chipPercentage: 18.3,
    approximateMass: "~8 g",
    description: "Used as a low-loss substrate material for superconducting qubits. Its crystalline structure and low dielectric loss help maintain long coherence times in quantum processors.",
    sourceCountries: [
      { country: "United States", code: "US", marketShare: 35 },
      { country: "Japan", code: "JP", marketShare: 25 },
      { country: "Russia", code: "RU", marketShare: 20 },
      { country: "China", code: "CN", marketShare: 15 },
      { country: "Other", code: "OTHER", marketShare: 5 }
    ]
  },
  {
    id: 5,
    name: "Tantalum",
    category: "Superconductors",
    chipPercentage: 8.4,
    approximateMass: "~500 mg",
    description: "An emerging superconducting material showing longer coherence times than niobium in some applications. Used in next-generation transmon qubits due to its superior surface oxide properties.",
    sourceCountries: [
      { country: "DR Congo", code: "CD", marketShare: 33 },
      { country: "Rwanda", code: "RW", marketShare: 25 },
      { country: "Brazil", code: "BR", marketShare: 10 },
      { country: "Australia", code: "AU", marketShare: 8 },
      { country: "Other", code: "OTHER", marketShare: 24 }
    ]
  },
  {
    id: 6,
    name: "Indium",
    category: "Interconnects",
    chipPercentage: 2.1,
    approximateMass: "~200 mg",
    description: "Used for bump bonding and flip-chip connections in multi-chip quantum processor assemblies. Indium's softness allows for reliable low-temperature electrical connections.",
    sourceCountries: [
      { country: "China", code: "CN", marketShare: 58 },
      { country: "South Korea", code: "KR", marketShare: 15 },
      { country: "Japan", code: "JP", marketShare: 10 },
      { country: "Canada", code: "CA", marketShare: 5 },
      { country: "Other", code: "OTHER", marketShare: 12 }
    ]
  },
  {
    id: 7,
    name: "Copper",
    category: "Thermal Management",
    chipPercentage: 5.8,
    approximateMass: "~100 kg",
    description: "Oxygen-free high-conductivity (OFHC) copper is used extensively in dilution refrigerator components and wiring shields. It provides excellent thermal conductivity at cryogenic temperatures.",
    sourceCountries: [
      { country: "Chile", code: "CL", marketShare: 27 },
      { country: "Peru", code: "PE", marketShare: 10 },
      { country: "China", code: "CN", marketShare: 8 },
      { country: "DR Congo", code: "CD", marketShare: 8 },
      { country: "Other", code: "OTHER", marketShare: 47 }
    ]
  },
  {
    id: 8,
    name: "Gold",
    category: "Interconnects",
    chipPercentage: 1.5,
    approximateMass: "~5 g",
    description: "Used for wire bonding connections and as a plating material for microwave connectors. Gold's resistance to oxidation ensures reliable electrical contacts at cryogenic temperatures.",
    sourceCountries: [
      { country: "China", code: "CN", marketShare: 11 },
      { country: "Australia", code: "AU", marketShare: 10 },
      { country: "Russia", code: "RU", marketShare: 9 },
      { country: "United States", code: "US", marketShare: 6 },
      { country: "Other", code: "OTHER", marketShare: 64 }
    ]
  },
  {
    id: 9,
    name: "Helium-3",
    category: "Cryogenics",
    chipPercentage: 0.01,
    approximateMass: "~5 g",
    description: "Essential for dilution refrigerators that cool quantum processors to millikelvin temperatures. The mixing of He-3 and He-4 provides continuous cooling to reach temperatures near absolute zero.",
    sourceCountries: [
      { country: "United States", code: "US", marketShare: 75 },
      { country: "Russia", code: "RU", marketShare: 20 },
      { country: "Other", code: "OTHER", marketShare: 5 }
    ]
  },
  {
    id: 10,
    name: "Helium-4",
    category: "Cryogenics",
    chipPercentage: 0.02,
    approximateMass: "~15 g",
    description: "Used in conjunction with He-3 in dilution refrigerators and as liquid helium for pre-cooling stages. Provides the initial cooling from room temperature to 4 Kelvin.",
    sourceCountries: [
      { country: "United States", code: "US", marketShare: 40 },
      { country: "Qatar", code: "QA", marketShare: 32 },
      { country: "Algeria", code: "DZ", marketShare: 12 },
      { country: "Russia", code: "RU", marketShare: 8 },
      { country: "Other", code: "OTHER", marketShare: 8 }
    ]
  },
  {
    id: 11,
    name: "Titanium Nitride (TiN)",
    category: "Superconductors",
    chipPercentage: 3.2,
    approximateMass: "~300 mg",
    description: "Used for high-quality superconducting resonators and kinetic inductance detectors. TiN films offer tunable superconducting properties and low microwave losses.",
    sourceCountries: [
      { country: "China", code: "CN", marketShare: 45 },
      { country: "Japan", code: "JP", marketShare: 20 },
      { country: "Russia", code: "RU", marketShare: 10 },
      { country: "South Africa", code: "ZA", marketShare: 8 },
      { country: "Other", code: "OTHER", marketShare: 17 }
    ]
  },
  {
    id: 12,
    name: "Diamond (NV Centers)",
    category: "Spin Qubits",
    chipPercentage: 0.8,
    approximateMass: "~100 mg",
    description: "Synthetic diamonds with nitrogen-vacancy (NV) centers serve as room-temperature quantum sensors and potential qubit platforms. The NV center's electron spin can be optically initialized and read out.",
    sourceCountries: [
      { country: "Russia", code: "RU", marketShare: 28 },
      { country: "Botswana", code: "BW", marketShare: 18 },
      { country: "Canada", code: "CA", marketShare: 13 },
      { country: "Angola", code: "AO", marketShare: 12 },
      { country: "Other", code: "OTHER", marketShare: 29 }
    ]
  },
  {
    id: 13,
    name: "Germanium",
    category: "Spin Qubits",
    chipPercentage: 1.2,
    approximateMass: "~200 mg",
    description: "Used in semiconductor spin qubit architectures. Germanium quantum wells host hole spin qubits with strong spin-orbit coupling, enabling fast electrical control.",
    sourceCountries: [
      { country: "China", code: "CN", marketShare: 60 },
      { country: "Russia", code: "RU", marketShare: 12 },
      { country: "United States", code: "US", marketShare: 8 },
      { country: "Belgium", code: "BE", marketShare: 5 },
      { country: "Other", code: "OTHER", marketShare: 15 }
    ]
  },
  {
    id: 14,
    name: "Gallium Arsenide (GaAs)",
    category: "Spin Qubits",
    chipPercentage: 1.8,
    approximateMass: "~3 g",
    description: "Forms quantum dot structures for electron spin qubits. GaAs heterostructures create 2D electron gases where individual electrons can be confined and manipulated as qubits.",
    sourceCountries: [
      { country: "China", code: "CN", marketShare: 80 },
      { country: "Japan", code: "JP", marketShare: 8 },
      { country: "Germany", code: "DE", marketShare: 5 },
      { country: "Other", code: "OTHER", marketShare: 7 }
    ]
  },
  {
    id: 15,
    name: "Yttrium Barium Copper Oxide",
    category: "Superconductors",
    chipPercentage: 0.5,
    approximateMass: "~500 mg",
    description: "A high-temperature superconductor investigated for quantum applications. While not yet mainstream in qubits, YBCO is used in SQUID magnetometers for qubit readout research.",
    sourceCountries: [
      { country: "China", code: "CN", marketShare: 70 },
      { country: "Australia", code: "AU", marketShare: 10 },
      { country: "Myanmar", code: "MM", marketShare: 7 },
      { country: "Other", code: "OTHER", marketShare: 13 }
    ]
  },
  {
    id: 16,
    name: "Mu-Metal",
    category: "Shielding",
    chipPercentage: 2.5,
    approximateMass: "~12 kg",
    description: "A nickel-iron alloy used for magnetic shielding around quantum processors. Protects sensitive qubits from external magnetic field fluctuations that cause decoherence.",
    sourceCountries: [
      { country: "Germany", code: "DE", marketShare: 30 },
      { country: "United States", code: "US", marketShare: 25 },
      { country: "Japan", code: "JP", marketShare: 20 },
      { country: "United Kingdom", code: "GB", marketShare: 10 },
      { country: "Other", code: "OTHER", marketShare: 15 }
    ]
  },
  {
    id: 17,
    name: "Beryllium Copper",
    category: "Thermal Management",
    chipPercentage: 0.6,
    approximateMass: "~1.5 kg",
    description: "Used for cryogenic microwave cables and attenuators. Its thermal conductivity profile helps manage heat flow between temperature stages in the dilution refrigerator.",
    sourceCountries: [
      { country: "United States", code: "US", marketShare: 65 },
      { country: "China", code: "CN", marketShare: 15 },
      { country: "Kazakhstan", code: "KZ", marketShare: 10 },
      { country: "Other", code: "OTHER", marketShare: 10 }
    ]
  },
  {
    id: 18,
    name: "Kapton (Polyimide)",
    category: "Insulation",
    chipPercentage: 0.4,
    approximateMass: "~150 g",
    description: "Thin polyimide films provide electrical insulation in cryogenic wiring and flexible circuit boards. Kapton remains flexible at millikelvin temperatures without cracking.",
    sourceCountries: [
      { country: "United States", code: "US", marketShare: 45 },
      { country: "Japan", code: "JP", marketShare: 30 },
      { country: "China", code: "CN", marketShare: 15 },
      { country: "Other", code: "OTHER", marketShare: 10 }
    ]
  },
  {
    id: 19,
    name: "Ytterbium",
    category: "Trapped Ions",
    chipPercentage: 0.05,
    approximateMass: "~5 mg",
    description: "Ytterbium-171 ions are used in trapped-ion quantum computers. The ion's hyperfine states serve as qubit levels, manipulated by precisely tuned laser beams.",
    sourceCountries: [
      { country: "China", code: "CN", marketShare: 90 },
      { country: "Australia", code: "AU", marketShare: 4 },
      { country: "Myanmar", code: "MM", marketShare: 3 },
      { country: "Other", code: "OTHER", marketShare: 3 }
    ]
  },
  {
    id: 20,
    name: "Calcium",
    category: "Trapped Ions",
    chipPercentage: 0.02,
    approximateMass: "~3 mg",
    description: "Calcium-40 ions are another popular choice for trapped-ion qubits. Optical qubits encoded in calcium ions offer long coherence times and high-fidelity operations.",
    sourceCountries: [
      { country: "China", code: "CN", marketShare: 35 },
      { country: "United States", code: "US", marketShare: 15 },
      { country: "India", code: "IN", marketShare: 8 },
      { country: "Brazil", code: "BR", marketShare: 5 },
      { country: "Other", code: "OTHER", marketShare: 37 }
    ]
  },
  {
    id: 21,
    name: "Rubidium",
    category: "Neutral Atoms",
    chipPercentage: 0.01,
    approximateMass: "~1 g",
    description: "Rubidium-87 atoms are used in neutral-atom quantum computers. Atoms are trapped in optical tweezers and interact via Rydberg states for two-qubit gates.",
    sourceCountries: [
      { country: "Canada", code: "CA", marketShare: 35 },
      { country: "Namibia", code: "NA", marketShare: 25 },
      { country: "Zimbabwe", code: "ZW", marketShare: 15 },
      { country: "Other", code: "OTHER", marketShare: 25 }
    ]
  },
  {
    id: 22,
    name: "Strontium",
    category: "Neutral Atoms",
    chipPercentage: 0.01,
    approximateMass: "~1 g",
    description: "Strontium atoms serve as qubits in optical lattice and tweezer-based quantum computers. Their nuclear spin states provide additional qubit encoding options.",
    sourceCountries: [
      { country: "China", code: "CN", marketShare: 50 },
      { country: "Spain", code: "ES", marketShare: 15 },
      { country: "Mexico", code: "MX", marketShare: 10 },
      { country: "Argentina", code: "AR", marketShare: 8 },
      { country: "Other", code: "OTHER", marketShare: 17 }
    ]
  },
  {
    id: 23,
    name: "Niobium Titanium (NbTi)",
    category: "Cryogenics",
    chipPercentage: 0.3,
    approximateMass: "~400 g",
    description: "Superconducting alloy used in the magnets of dilution refrigerator components and cryogenic cables. Maintains superconductivity up to relatively high magnetic fields.",
    sourceCountries: [
      { country: "Brazil", code: "BR", marketShare: 40 },
      { country: "China", code: "CN", marketShare: 25 },
      { country: "Japan", code: "JP", marketShare: 15 },
      { country: "Russia", code: "RU", marketShare: 10 },
      { country: "Other", code: "OTHER", marketShare: 10 }
    ]
  },
  {
    id: 24,
    name: "Phosphorus in Silicon",
    category: "Spin Qubits",
    chipPercentage: 0.05,
    approximateMass: "< 1 \u03BCg",
    description: "Individual phosphorus atoms implanted in silicon create nuclear spin qubits with extremely long coherence times. The P-31 nuclear spin can store quantum information for minutes.",
    sourceCountries: [
      { country: "China", code: "CN", marketShare: 45 },
      { country: "Morocco", code: "MA", marketShare: 18 },
      { country: "United States", code: "US", marketShare: 12 },
      { country: "Russia", code: "RU", marketShare: 8 },
      { country: "Other", code: "OTHER", marketShare: 17 }
    ]
  }
];
