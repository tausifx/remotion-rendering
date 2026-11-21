import React from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import {C, H, W} from '../../theme';

export const Particles: React.FC<{count?: number; color?: string; seed?: string; speed?: number; opacity?: number}> = ({count = 30, color = C.text, seed = 'p', speed = 0.35, opacity = 0.5}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{pointerEvents: 'none'}}>
      {Array.from({length: count}).map((_, i) => {
        const r1 = random(`${seed}x${i}`), r2 = random(`${seed}y${i}`), r3 = random(`${seed}s${i}`);
        const x = r1 * W + Math.sin(f / 60 + i) * 12;
        const y = (((r2 * H - f * speed * (0.4 + r3)) % H) + H) % H;
        const s = 2 + r3 * 4;
        const tw = 0.4 + 0.6 * Math.abs(Math.sin(f / 25 + i * 2));
        return <div key={i} style={{position: 'absolute', left: x, top: y, width: s, height: s, borderRadius: '50%', background: color, opacity: opacity * tw * (0.3 + r3 * 0.7)}} />;
      })}
    </AbsoluteFill>
  );
};
