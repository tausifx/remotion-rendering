import React from 'react';
import {useCurrentFrame} from 'remotion';
import {alpha} from '../../theme';

/** Expanding ripple rings (looping, deterministic). */
export const Ripples: React.FC<{
  size: number; color: string; count?: number; period?: number; start?: number; stroke?: number;
}> = ({size, color, count = 3, period = 54, start = 0, stroke = 2}) => {
  const f = useCurrentFrame() - start;
  if (f < 0) return null;
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: size, height: size}}>
      {Array.from({length: count}, (_, i) => {
        const t = (((f + (i * period) / count) % period) + period) % period / period;
        const s = 0.8 + t * 1.1;
        return (
          <div key={i} style={{
            position: 'absolute', inset: 0, borderRadius: '50%', border: `${stroke}px solid ${alpha(color, 0.5 * (1 - t))}`,
            transform: `scale(${s})`,
          }} />
        );
      })}
    </div>
  );
};
