import {interpolate, spring, useCurrentFrame} from 'remotion';
import {FPS, ease, springs} from '../theme';
import {sceneFrom} from './timing';

type EaseFn = (t: number) => number;

/** 0→1 progress between start and start+dur (local frames). */
export const prog = (f: number, start: number, dur: number, e: EaseFn = ease.out): number =>
  interpolate(f, [start, start + Math.max(1, dur)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: e,
  });

/** Spring that stays 0 before `start`. */
export const sp = (
  f: number,
  start: number,
  config: {damping: number; stiffness: number; mass: number} = springs.big,
): number => (f < start ? 0 : spring({frame: f - start, fps: FPS, config}));

/** Visible window with soft fades. */
export const win = (f: number, a: number, b: number, fin = 8, fout = 8): number =>
  prog(f, a, fin, ease.soft) * (1 - prog(f, b - fout, fout, ease.soft));

export const mix = (a: number, b: number, t: number): number => a + (b - a) * t;
export const sine = (f: number, period: number, phase = 0): number =>
  Math.sin((f / period) * Math.PI * 2 + phase);
export const hash = (n: number): number => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Scene-local clock. T(sec) converts an SRT time into the scene's local frame. */
export const useSceneClock = (id: string) => {
  const f = useCurrentFrame();
  const from = sceneFrom(id);
  const T = (sec: number): number => sec * FPS - from;
  return {f, T};
};

/** Spread n words proportionally across a cue (for word-level sync). */
export const wordTimes = (start: number, end: number, n: number): number[] =>
  Array.from({length: n}, (_, i) => start + ((end - start) * i) / n);
