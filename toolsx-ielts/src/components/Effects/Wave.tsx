import React from 'react';
import {useCurrentFrame} from 'remotion';
import {alpha, colors} from '../../theme';
import {hash} from '../../utils/animations';

type BarsProps = {
  width: number; height: number; bars?: number; color?: string; amp?: number; speed?: number;
  seed?: number; barWidth?: number; flat?: number; hot?: Record<number, string>;
};

/** Deterministic voice-bar equalizer. amp 0..1. */
export const WaveBars: React.FC<BarsProps> = ({
  width, height, bars = 48, color = colors.primary, amp = 1, speed = 0.22, seed = 1,
  barWidth, flat = 0.06, hot = {},
}) => {
  const f = useCurrentFrame();
  const step = width / bars;
  const bw = barWidth ?? step * 0.46;
  return (
    <svg width={width} height={height} style={{overflow: 'visible'}}>
      {Array.from({length: bars}, (_, i) => {
        const env = Math.sin((i / (bars - 1)) * Math.PI) ** 0.8;
        const a = Math.abs(Math.sin(i * 0.55 + f * speed + seed) * Math.cos(i * 0.21 - f * speed * 0.6 + hash(i + seed) * 6));
        const h = Math.max(4, height * (flat + (1 - flat) * a * env * amp));
        const c = hot[i] ?? color;
        return (
          <rect key={i} x={i * step + (step - bw) / 2} y={(height - h) / 2} width={bw} height={h} rx={bw / 2} fill={c} opacity={0.55 + 0.45 * a} />
        );
      })}
    </svg>
  );
};

/** Sine-sum line wave with optional nervous jitter. */
export const WaveLine: React.FC<{
  width: number; height: number; color?: string; amp?: number; jitter?: number; speed?: number; stroke?: number;
}> = ({width, height, color = colors.primary, amp = 1, jitter = 0, speed = 0.12, stroke = 4}) => {
  const f = useCurrentFrame();
  const n = 120;
  const pts = Array.from({length: n + 1}, (_, i) => {
    const x = (i / n) * width;
    const env = Math.sin((i / n) * Math.PI) ** 0.6;
    const y =
      Math.sin(i * 0.18 + f * speed) * 0.5 + Math.sin(i * 0.43 - f * speed * 1.7) * 0.3 +
      (hash(i * 3 + Math.floor(f / 2)) - 0.5) * 2 * jitter;
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${(height / 2 + y * env * amp * height * 0.38).toFixed(1)}`;
  }).join(' ');
  return (
    <svg width={width} height={height} style={{overflow: 'visible'}}>
      <path d={pts} fill="none" stroke={alpha(color, 0.25)} strokeWidth={stroke * 3.2} strokeLinecap="round" strokeLinejoin="round" />
      <path d={pts} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/** Circular equalizer. */
export const RingBars: React.FC<{size: number; color?: string; amp?: number; count?: number; inner?: number}> = ({
  size, color = colors.annie, amp = 1, count = 56, inner = 0.34,
}) => {
  const f = useCurrentFrame();
  const r0 = size * inner;
  return (
    <svg width={size} height={size} viewBox={`${-size / 2} ${-size / 2} ${size} ${size}`}>
      {Array.from({length: count}, (_, i) => {
        const a = (i / count) * Math.PI * 2;
        const v = Math.abs(Math.sin(i * 0.7 + f * 0.2) * Math.cos(i * 0.31 - f * 0.13)) * amp;
        const len = size * 0.04 + size * 0.14 * v;
        return (
          <line key={i} x1={Math.cos(a) * r0} y1={Math.sin(a) * r0} x2={Math.cos(a) * (r0 + len)} y2={Math.sin(a) * (r0 + len)}
            stroke={color} strokeWidth={size * 0.012} strokeLinecap="round" opacity={0.5 + 0.5 * v} />
        );
      })}
    </svg>
  );
};
