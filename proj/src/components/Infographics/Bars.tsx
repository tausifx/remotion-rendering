import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../../theme';

export const Bars: React.FC<{n: number; w: number; h: number; gap?: number; color?: string; amp?: number; speed?: number; seed?: number}> = ({n, w, h, gap = 8, color = C.primary, amp = 1, speed = 0.22, seed = 0}) => {
  const f = useCurrentFrame();
  return (
    <div style={{display: 'flex', alignItems: 'center', gap, height: h}}>
      {Array.from({length: n}).map((_, i) => {
        const v = Math.abs(Math.sin(f * speed + i * 0.7 + seed) * Math.sin(i * 1.31 + seed * 2 + f * 0.03));
        const hh = Math.max(w, h * (0.12 + 0.88 * v) * amp);
        return <div key={i} style={{width: w, height: hh, borderRadius: w, background: color}} />;
      })}
    </div>
  );
};
