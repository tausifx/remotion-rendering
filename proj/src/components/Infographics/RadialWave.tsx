import React from 'react';
import {useCurrentFrame} from 'remotion';
import {C} from '../../theme';

export const RadialWave: React.FC<{n?: number; r: number; len: number; w?: number; amp: number; colorA?: string; colorB?: string; seed?: number}> = ({n = 56, r, len, w = 8, amp, colorA = C.primary, colorB = C.secondary, seed = 0}) => {
  const f = useCurrentFrame();
  const size = (r + len) * 2 + 20;
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {Array.from({length: n}).map((_, i) => {
        const a = (i / n) * Math.PI * 2 + f * 0.004;
        const v = Math.abs(Math.sin(f * 0.2 + i * 0.9 + seed) * Math.cos(i * 0.37 + f * 0.05));
        const l = Math.max(w, len * (0.1 + 0.9 * v) * amp);
        return <line key={i} x1={c + Math.cos(a) * r} y1={c + Math.sin(a) * r} x2={c + Math.cos(a) * (r + l)} y2={c + Math.sin(a) * (r + l)} stroke={i % 4 === 0 ? colorB : colorA} strokeWidth={w} strokeLinecap="round" />;
      })}
    </svg>
  );
};
