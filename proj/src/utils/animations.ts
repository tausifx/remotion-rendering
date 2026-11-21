import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {EASE, SPRING} from '../theme';

export const hexA = (hex: string, a: number) => {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export const ease = (
  frame: number,
  range: [number, number],
  out: [number, number],
  easing: (t: number) => number = EASE.out
) =>
  interpolate(frame, range, out, {
    easing,
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

export const useSpr = (delay = 0, config: typeof SPRING.ui = SPRING.ui) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delay, fps, config});
};

export const toBn = (n: number | string) =>
  String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
