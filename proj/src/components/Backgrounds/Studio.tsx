import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from '../../theme';
import {hexA} from '../../utils/animations';

export const Studio: React.FC<{glow?: string; glow2?: string; grid?: boolean; flip?: boolean}> = ({glow = C.primary, glow2 = C.secondary, grid = true, flip = false}) => {
  const f = useCurrentFrame();
  const x1 = (flip ? 78 : 22) + Math.sin(f / 90) * 7;
  const y1 = 28 + Math.cos(f / 110) * 8;
  const x2 = (flip ? 20 : 80) + Math.cos(f / 100) * 6;
  return (
    <AbsoluteFill style={{background: C.bg}}>
      <AbsoluteFill style={{background: `radial-gradient(900px 700px at ${x1}% ${y1}%, ${hexA(glow, 0.17)}, transparent 70%), radial-gradient(800px 600px at ${x2}% 88%, ${hexA(glow2, 0.08)}, transparent 70%)`}} />
      {grid && (
        <AbsoluteFill style={{backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`, backgroundSize: '96px 96px', backgroundPosition: `${-f * 0.35}px 0`, opacity: 0.4, WebkitMaskImage: 'radial-gradient(ellipse at center, #000 25%, transparent 78%)'}} />
      )}
      <AbsoluteFill style={{background: `radial-gradient(ellipse at center, transparent 52%, ${hexA(C.black, 0.6)} 100%)`}} />
    </AbsoluteFill>
  );
};
