import React from 'react';
import {AbsoluteFill, Img, interpolateColors, staticFile, useCurrentFrame} from 'remotion';
import {alpha, colors, HEIGHT, sceneTint, WIDTH} from '../../theme';
import {hash, sine} from '../../utils/animations';
import {SCENES} from '../../utils/timing';

const stopsIn: number[] = [];
const stopsOut: string[] = [];
SCENES.forEach((s, i) => {
  const prev = i === 0 ? sceneTint[s.id] : sceneTint[SCENES[i - 1].id];
  stopsIn.push(s.from + (i === 0 ? 0 : 0), s.from + 26);
  stopsOut.push(prev, sceneTint[s.id]);
});

const PARTICLES = Array.from({length: 38}, (_, i) => ({
  x: hash(i + 1) * WIDTH, y: hash(i + 77) * HEIGHT, r: 1.2 + hash(i + 5) * 2.4,
  sp: 0.15 + hash(i + 9) * 0.5, ph: hash(i + 31) * 6.28, dr: 18 + hash(i + 13) * 40,
}));

/** Persistent atmosphere: tinted glows, dot grid, dust, vignette, grain. */
export const Stage: React.FC<{intensity?: number}> = ({intensity = 1}) => {
  const f = useCurrentFrame();
  const tint = interpolateColors(f, stopsIn, stopsOut);
  return (
    <AbsoluteFill style={{background: colors.bg}}>
      <div style={{
        position: 'absolute', width: 1500, height: 1500, left: 960 - 750 + sine(f, 420) * 160, top: 540 - 750 + sine(f, 520, 1) * 90,
        background: `radial-gradient(circle, ${alpha(tint, 0.2 * intensity)} 0%, transparent 62%)`,
      }} />
      <div style={{
        position: 'absolute', width: 1100, height: 1100, left: 1500 - 550 + sine(f, 600, 2) * 120, top: 1000 - 550 + sine(f, 480) * 70,
        background: `radial-gradient(circle, ${alpha(colors.secondary, 0.14)} 0%, transparent 65%)`,
      }} />
      <AbsoluteFill style={{
        backgroundImage: `radial-gradient(${alpha(colors.text, 0.09)} 1.2px, transparent 1.6px)`,
        backgroundSize: '64px 64px', backgroundPosition: `${(f * 0.25) % 64}px 0`,
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 75%)',
      }} />
      <svg width={WIDTH} height={HEIGHT} style={{position: 'absolute', inset: 0}}>
        {PARTICLES.map((p, i) => (
          <circle key={i} cx={p.x + Math.sin(f * 0.01 * p.sp + p.ph) * p.dr} cy={(p.y - f * p.sp * 0.6 + HEIGHT * 4) % HEIGHT}
            r={p.r} fill={i % 5 === 0 ? tint : colors.text} opacity={0.12 + 0.2 * (0.5 + 0.5 * Math.sin(f * 0.05 * p.sp + p.ph))} />
        ))}
      </svg>
      <AbsoluteFill style={{background: `radial-gradient(ellipse at center, transparent 45%, ${alpha(colors.bgDeep, 0.85)} 100%)`}} />
      <Img src={staticFile('images/noise.png')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.035, mixBlendMode: 'soft-light'}} />
    </AbsoluteFill>
  );
};
