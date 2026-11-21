import {B} from './utils/timing';

export type Sfx = {frame: number; name: string; vol: number};
const S = (scene: number, local: number, name: string, vol = 0.5): Sfx => ({frame: B[scene - 1] + local, name, vol});
const ticks = (scene: number, from: number, to: number, step: number, vol = 0.12): Sfx[] => {
  const out: Sfx[] = [];
  for (let l = from; l <= to; l += step) out.push(S(scene, l, 'tick', vol));
  return out;
};

export const SFX: Sfx[] = [
  // S1 hook
  S(1, 6, 'swipe', 0.3), S(1, 20, 'thump', 0.3), S(1, 36, 'swipe', 0.3), S(1, 52, 'thump', 0.3),
  S(1, 66, 'whoosh_c', 0.35), S(1, 78, 'pop', 0.5), S(1, 90, 'pop', 0.45), S(1, 98, 'pluck', 0.5),
  S(1, 124, 'whoosh_a', 0.5),
  // S2 income
  S(2, 3, 'pop', 0.4), ...ticks(2, 6, 48, 6), S(2, 52, 'chime', 0.45), S(2, 66, 'pop', 0.5), S(2, 80, 'whoosh_b', 0.5),
  // S3 InVideo intro
  S(3, 8, 'pop', 0.5), S(3, 14, 'chime', 0.3), ...ticks(3, 88, 124, 4, 0.1), S(3, 140, 'swipe', 0.3),
  // S4 prompt -> video
  ...ticks(4, 10, 92, 11, 0.15), S(4, 102, 'click', 0.5), S(4, 114, 'swipe', 0.3),
  S(4, 108, 'pop', 0.3), S(4, 168, 'pop', 0.3), S(4, 194, 'pop', 0.3),
  S(4, 222, 'whoosh_d', 0.35), S(4, 232, 'chime', 0.4), S(4, 286, 'swipe', 0.3), S(4, 322, 'whoosh_c', 0.5),
  // S5 ElevenLabs
  S(5, 6, 'swipe', 0.3), S(5, 30, 'pop', 0.5), S(5, 36, 'chime', 0.3), S(5, 64, 'whoosh_d', 0.3), S(5, 70, 'click', 0.3),
  S(5, 160, 'click', 0.3), S(5, 198, 'click', 0.3), S(5, 166, 'tick', 0.2), S(5, 186, 'tick', 0.2), S(5, 206, 'tick', 0.2), S(5, 226, 'tick', 0.2),
  S(5, 250, 'swipe', 0.3), S(5, 262, 'whoosh_e', 0.25), S(5, 284, 'chime', 0.45), S(5, 313, 'swipe', 0.5),
  // S6 Leonardo
  S(6, 8, 'swipe', 0.3), S(6, 38, 'pop', 0.5), S(6, 44, 'chime', 0.3), S(6, 70, 'whoosh_d', 0.3), S(6, 80, 'pop', 0.4),
  ...ticks(6, 139, 185, 15, 0.15), S(6, 198, 'click', 0.5), S(6, 212, 'tick', 0.18), S(6, 228, 'tick', 0.18), S(6, 244, 'tick', 0.18),
  S(6, 262, 'chime', 0.5), S(6, 266, 'whoosh_e', 0.25), S(6, 299, 'whoosh_b', 0.45),
  // S7 free trial
  S(7, 8, 'pop', 0.4), S(7, 14, 'pop', 0.4), S(7, 20, 'pop', 0.4), S(7, 24, 'thump', 0.35),
  S(7, 78, 'chime', 0.5), S(7, 120, 'whoosh_d', 0.3), S(7, 134, 'pop', 0.4), S(7, 142, 'chime', 0.3),
  S(7, 216, 'pop', 0.4), ...ticks(7, 226, 300, 8, 0.1), S(7, 322, 'pop', 0.4), ...ticks(7, 332, 400, 7, 0.1), S(7, 410, 'chime', 0.4), S(7, 418, 'whoosh_a', 0.45),
  // S8 CTA
  S(8, 6, 'pop', 0.4), S(8, 20, 'pluck', 0.4), S(8, 60, 'click', 0.3), S(8, 92, 'pop', 0.4), ...ticks(8, 100, 130, 10, 0.12),
  S(8, 150, 'pop', 0.4), S(8, 162, 'chime', 0.3), S(8, 188, 'whoosh_c', 0.3), S(8, 232, 'swipe', 0.3), S(8, 242, 'thump', 0.35),
  S(8, 264, 'click', 0.5), S(8, 268, 'chime', 0.5),
];

// Durations (frames) of each SFX file, used to bound <Sequence>
export const SFX_DUR: Record<string, number> = {
  whoosh_a: 22, whoosh_b: 22, whoosh_c: 14, whoosh_d: 20, whoosh_e: 20, swipe: 10,
  pop: 8, click: 4, tick: 3, pluck: 16, chime: 30, thump: 14,
};
