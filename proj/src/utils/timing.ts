import {FPS} from '../theme';
export const sec = (s: number) => Math.round(s * FPS);

// Scene boundaries derived from SRT cue edges (30 fps)
export const B = [0, 134, 222, 390, 720, 1042, 1350, 1777, 2070];
export const TOTAL = B[B.length - 1];
export const sceneStart = (n: number) => B[n - 1];
