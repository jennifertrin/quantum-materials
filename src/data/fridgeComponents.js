import { quantumMaterials } from './materials';

const materialMapping = {
  'Copper': 'Copper',
  'Gold': 'Gold',
  'Silicon': 'Silicon',
  'Aluminum': 'Aluminum',
  'Mu-Metal': 'Mu-Metal',
  'Helium-4': 'Helium-4',
  'Helium-3': 'Helium-3',
  'NbTi': 'Niobium Titanium (NbTi)',
  'Beryllium Copper': 'Beryllium Copper',
  'Kapton': 'Kapton (Polyimide)',
  'Indium': 'Indium',
  'Niobium': 'Niobium',
};

export const getMaterialData = (materialName) => {
  const mappedName = materialMapping[materialName] || materialName;
  return quantumMaterials.find(m =>
    m.name === mappedName ||
    m.name.toLowerCase().includes(materialName.toLowerCase())
  );
};

export const fridgeComponents = {
  roomTempElectronics: {
    id: 'roomTempElectronics',
    name: 'Room-Temperature Electronics',
    temperature: '300 K',
    materials: ['Copper', 'Gold', 'Silicon'],
    description: 'The control rack that sits outside the refrigerator at room temperature. Contains the microwave signal generators, amplifiers, and digital-to-analog converters that create and receive the precise pulses used to manipulate and read out qubits.',
    subcomponents: [
      { name: 'Signal Generators', material: 'Silicon' },
      { name: 'Microwave Amplifiers', material: 'Gold' },
      { name: 'Wiring Interfaces', material: 'Copper' }
    ]
  },
  outerVacuumChamber: {
    id: 'outerVacuumChamber',
    name: 'Outer Vacuum Chamber',
    temperature: '300 K \u2192 40 K',
    materials: ['Aluminum', 'Mu-Metal', 'Copper'],
    description: 'The outermost shell of the dilution refrigerator. A sealed vacuum vessel that provides thermal insulation from the room-temperature environment and shields the interior from external electromagnetic interference.',
    subcomponents: [
      { name: 'Vacuum Shell', material: 'Aluminum' },
      { name: 'Magnetic Shield', material: 'Mu-Metal' },
      { name: 'Thermal Anchors', material: 'Copper' }
    ]
  },
  upperCoolingStage: {
    id: 'upperCoolingStage',
    name: 'Pulse Tube / 40 K Stage',
    temperature: '40 K',
    materials: ['Copper', 'Helium-4'],
    description: 'The first mechanical cooling stage, driven by a pulse-tube cryocooler. Uses compressed helium-4 gas in a closed cycle to cool the system from room temperature down to roughly 40 Kelvin (\u2212233 \u00b0C), removing the bulk of the thermal energy.',
    subcomponents: [
      { name: 'Pulse Tube Cold Head', material: 'Copper' },
      { name: 'Radiation Shields', material: 'Copper' },
      { name: 'Coolant Gas', material: 'Helium-4' }
    ]
  },
  lowerCoolingStage: {
    id: 'lowerCoolingStage',
    name: 'Still & Cold Plate',
    temperature: '~800 \u2192 100 mK',
    materials: ['Copper', 'Helium-3', 'Helium-4'],
    description: 'The intermediate cooling stages where the dilution process begins. The still evaporates helium-3 from the mixture at ~800 mK, and the cold plate provides an additional thermal intercept at ~100 mK before reaching the mixing chamber.',
    subcomponents: [
      { name: 'Still Chamber', material: 'Copper' },
      { name: 'Cold Plate', material: 'Copper' },
      { name: 'He-3/He-4 Mixture', material: 'Helium-3' }
    ]
  },
  wiringAndSignalLines: {
    id: 'wiringAndSignalLines',
    name: 'Wiring & Signal Lines',
    temperature: '300 K \u2192 10 mK',
    materials: ['NbTi', 'Beryllium Copper', 'Kapton', 'Copper'],
    description: 'The cables and wiring looms that carry control signals and readout data between room-temperature electronics and the quantum processor. Different materials are used at different temperature stages to balance thermal conductivity with signal fidelity.',
    subcomponents: [
      { name: 'Superconducting Cables', material: 'NbTi' },
      { name: 'Coaxial Attenuators', material: 'Beryllium Copper' },
      { name: 'Flex Ribbon Cables', material: 'Kapton' },
      { name: 'Thermal Anchoring Clamps', material: 'Copper' }
    ]
  },
  mixingChamberQPU: {
    id: 'mixingChamberQPU',
    name: 'Mixing Chamber & QPU',
    temperature: '~10 mK',
    materials: ['Copper', 'Helium-3', 'Helium-4', 'Indium', 'Niobium'],
    description: 'The coldest point in the system, where helium-3 and helium-4 mix to reach ~10 millikelvin. The quantum processor chip is mounted here on a copper cold finger, connected via indium bump bonds, operating in this ultra-cold environment where quantum effects dominate.',
    subcomponents: [
      { name: 'Mixing Chamber', material: 'Copper' },
      { name: 'He-3/He-4 Dilution', material: 'Helium-3' },
      { name: 'QPU Mount Plate', material: 'Copper' },
      { name: 'Chip Interconnects', material: 'Indium' },
      { name: 'Superconducting Circuits', material: 'Niobium' }
    ],
    isDrillDown: true
  }
};
