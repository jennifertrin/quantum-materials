/**
 * 3D geometry constants for the dilution refrigerator model.
 * Maps the existing SVG plate/shield/rod layout into Y-axis positions and radii.
 * The model spans roughly 6 units tall, centered at Y=0.
 */

// Total model height ~6 units. Top is +3, bottom is -3.
const TOP = 3;

// Normalise: SVG Y range is ~99 (topFlange) to ~605 (QPU bottom). Map to [TOP, TOP-6].
function svgY(cy) {
  return TOP - ((cy - 60) / 600) * 6;
}
function svgR(rx) {
  return (rx / 202) * 1.6; // scale so topFlange radius = 1.6
}

// ── Plates ──
export const plates = [
  { key: 'topFlange',     label: '300 K',   componentKey: 'outerVacuumChamber',  radius: svgR(202), thickness: 0.10, y: svgY(99) },
  { key: 'fortyK',        label: '40 K',    componentKey: 'upperCoolingStage',   radius: svgR(166), thickness: 0.09, y: svgY(229) },
  { key: 'still',         label: '~800 mK', componentKey: 'lowerCoolingStage',   radius: svgR(128), thickness: 0.07, y: svgY(356) },
  { key: 'coldPlate',     label: '~100 mK', componentKey: 'lowerCoolingStage',   radius: svgR(98),  thickness: 0.07, y: svgY(428) },
  { key: 'mixingChamber', label: '~10 mK',  componentKey: 'mixingChamberQPU',    radius: svgR(65),  thickness: 0.10, y: svgY(541) },
];

// ── Shields (open cylinders between plates) ──
export const shields = [
  { topY: svgY(113), bottomY: svgY(200), radius: svgR(195), componentKey: 'outerVacuumChamber' },
  { topY: svgY(241), bottomY: svgY(330), radius: svgR(152), componentKey: 'upperCoolingStage' },
  { topY: svgY(366), bottomY: svgY(410), radius: svgR(114), componentKey: 'lowerCoolingStage' },
];

// ── Support rods (4 sets, 4 rods each) ──
export const rodSegments = [
  { topY: svgY(113), bottomY: svgY(217), innerRadius: svgR(80),  outerRadius: svgR(195) },
  { topY: svgY(241), bottomY: svgY(346), innerRadius: svgR(120), outerRadius: svgR(155) },
  { topY: svgY(366), bottomY: svgY(418), innerRadius: svgR(140), outerRadius: svgR(118) },
  { topY: svgY(438), bottomY: svgY(527), innerRadius: svgR(150), outerRadius: svgR(90) },
];

// ── Outer shell (bell-jar vacuum chamber) ──
export const outerShell = {
  topY: svgY(99),
  bottomY: svgY(558),
  topRadius: svgR(210),
  bottomRadius: svgR(50),
  componentKey: 'outerVacuumChamber',
};

// ── Electronics box ──
export const electronicsBox = {
  width: svgR(300),
  height: 0.4,
  depth: svgR(100),
  y: svgY(42),
  componentKey: 'roomTempElectronics',
};

// ── Mixing chamber vessel ──
export const mixingChamberVessel = {
  radius: svgR(53),
  height: 0.35,
  y: svgY(570),
  componentKey: 'mixingChamberQPU',
};

// ── QPU chip ──
export const qpuChip = {
  width: 0.35,
  height: 0.04,
  depth: 0.25,
  y: svgY(600),
  componentKey: 'mixingChamberQPU',
};

// ── Wiring lines ──
export const wiringLines = [
  { xOffset: -0.15, type: 'rf',      componentKey: 'wiringAndSignalLines' },
  { xOffset:  0.15, type: 'rf',      componentKey: 'wiringAndSignalLines' },
  { xOffset: -0.07, type: 'dc',      componentKey: 'wiringAndSignalLines' },
  { xOffset:  0.07, type: 'dc',      componentKey: 'wiringAndSignalLines' },
  { xOffset: -0.02, type: 'optical', componentKey: 'wiringAndSignalLines' },
  { xOffset:  0.02, type: 'optical', componentKey: 'wiringAndSignalLines' },
];

// ── Temperature label positions (3D world coords) ──
export const tempLabelPositions = plates.map(p => ({
  position: [p.radius + 0.35, p.y, 0],
  text: p.label,
  key: p.key,
}));

// ── Number label positions ──
export const numberLabels = [
  { componentKey: 'roomTempElectronics', num: 1, position: [-1.4, electronicsBox.y, 0.5] },
  { componentKey: 'outerVacuumChamber',  num: 2, position: [-1.7, svgY(155), 0.5] },
  { componentKey: 'upperCoolingStage',   num: 3, position: [-1.5, svgY(229), 0.5] },
  { componentKey: 'lowerCoolingStage',   num: 4, position: [-1.3, svgY(390), 0.5] },
  { componentKey: 'wiringAndSignalLines',num: 5, position: [-1.7, svgY(290), 0.5] },
  { componentKey: 'mixingChamberQPU',    num: 6, position: [-0.9, svgY(578), 0.5] },
];

// ── Model vertical bounds & center ──
// Top: electronics box top edge, Bottom: QPU chip bottom edge
export const MODEL_TOP = electronicsBox.y + electronicsBox.height / 2;
export const MODEL_BOTTOM = qpuChip.y - qpuChip.height / 2;
export const MODEL_CENTER_Y = (MODEL_TOP + MODEL_BOTTOM) / 2;

// ── Bolt helper ──
export const BOLT_COUNT = 12;
export const BOLT_RADIUS = 0.025;
export const BOLT_HEIGHT = 0.03;
