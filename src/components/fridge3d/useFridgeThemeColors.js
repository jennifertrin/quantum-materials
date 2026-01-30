import { useState, useEffect, useMemo } from 'react';
import { Color } from 'three';

const CSS_VARS = [
  '--svg-fridge-stage-copper',
  '--svg-fridge-stage-copper-dim',
  '--svg-fridge-shell-start',
  '--svg-fridge-shell-end',
  '--svg-fridge-coolant',
  '--svg-fridge-wiring-rf',
  '--svg-fridge-wiring-dc',
  '--svg-fridge-wiring-sc',
  '--svg-fridge-qpu-glow',
  '--svg-fridge-temp-bg',
  '--svg-fridge-temp-text',
  '--accent',
  '--svg-chip-bg-end',
];

function readColors() {
  const style = getComputedStyle(document.documentElement);
  const out = {};
  CSS_VARS.forEach(v => {
    const raw = style.getPropertyValue(v).trim();
    // Convert CSS variable name to camelCase key
    const key = v
      .replace(/^--/, '')
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    try {
      out[key] = new Color(raw);
    } catch {
      out[key] = new Color('#888888');
    }
  });
  return out;
}

export default function useFridgeThemeColors() {
  const [rev, setRev] = useState(0);

  useEffect(() => {
    const observer = new MutationObserver(() => setRev(r => r + 1));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme', 'style'],
    });
    return () => observer.disconnect();
  }, []);

  const colors = useMemo(() => readColors(), [rev]); // eslint-disable-line
  return colors;
}
