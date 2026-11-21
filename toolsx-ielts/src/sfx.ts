/**
 * SFX cue sheet — every time is taken from the SRT (seconds).
 * Files live in public/sfx/. One sound per meaningful event (no sound spam).
 * Transitions deliberately use different whooshes (direction / speed / weight).
 */
export type Sfx = {t: number; file: string; vol: number};

const typing = (start: number, n: number, step: number): Sfx[] =>
  Array.from({length: n}, (_, i) => ({t: start + i * step, file: 'tick_soft', vol: 0.7}));

export const SFX_CUES: Sfx[] = [
  // 01 hook
  {t: 0.1, file: 'impact_gentle', vol: 0.35},
  {t: 1.72, file: 'whoosh_fall', vol: 0.3},
  {t: 2.1, file: 'click_crisp', vol: 0.4},
  {t: 3.0, file: 'pop_clean', vol: 0.35},
  // 02 three AI
  {t: 4.26, file: 'whoosh_rise', vol: 0.5},
  {t: 4.62, file: 'pluck_c5', vol: 0.6},
  {t: 4.84, file: 'pluck_e5', vol: 0.6},
  {t: 5.06, file: 'pluck_g5', vol: 0.6},
  ...typing(5.88, 4, 0.2),
  {t: 6.3, file: 'chime_subtle', vol: 0.55},
  // 03 ELSA
  {t: 7.14, file: 'whoosh_deep', vol: 0.5},
  {t: 7.4, file: 'pop_clean', vol: 0.55},
  {t: 9.42, file: 'click_crisp', vol: 0.5},
  // 04 ELSA detail
  {t: 10.84, file: 'swipe_smooth', vol: 0.55},
  {t: 11.2, file: 'whoosh_fast', vol: 0.25},
  {t: 12.2, file: 'impact_gentle', vol: 0.4},
  {t: 13.55, file: 'pop_clean', vol: 0.5},
  ...typing(14.95, 4, 0.25),
  {t: 17.0, file: 'success_soft', vol: 0.6},
  {t: 19.3, file: 'chime_subtle', vol: 0.6},
  // 05 ChatGPT
  {t: 20.68, file: 'whoosh_deep', vol: 0.5},
  {t: 21.0, file: 'pop_clean', vol: 0.55},
  // 06 prompt
  {t: 23.56, file: 'swipe_smooth', vol: 0.5},
  ...[24.4, 24.72, 25.05, 25.4, 25.75].map((t) => ({t, file: 'click_crisp', vol: 0.32})),
  // 07 flow
  {t: 26.38, file: 'whoosh_rise', vol: 0.5},
  {t: 26.7, file: 'pop_clean', vol: 0.5},
  {t: 28.1, file: 'pop_clean', vol: 0.5},
  {t: 29.2, file: 'pop_clean', vol: 0.5},
  ...typing(29.45, 6, 0.11),
  {t: 30.3, file: 'chime_subtle', vol: 0.55},
  // 08 real exam
  {t: 30.74, file: 'whoosh_fast', vol: 0.45},
  {t: 31.55, file: 'impact_gentle', vol: 0.35},
  {t: 31.95, file: 'success_soft', vol: 0.55},
  // 09 Call Annie
  {t: 32.98, file: 'whoosh_deep', vol: 0.5},
  {t: 33.4, file: 'pluck_e5', vol: 0.5},
  {t: 33.75, file: 'pluck_c5', vol: 0.5},
  {t: 34.05, file: 'pluck_g5', vol: 0.6},
  // 10 persona
  {t: 35.2, file: 'whoosh_rise', vol: 0.45},
  {t: 35.5, file: 'pop_clean', vol: 0.5},
  {t: 36.25, file: 'chime_subtle', vol: 0.5},
  // 11 call
  {t: 36.72, file: 'whoosh_fall', vol: 0.5},
  {t: 37.2, file: 'pop_clean', vol: 0.5},
  {t: 39.0, file: 'click_crisp', vol: 0.45},
  {t: 39.3, file: 'pluck_g5', vol: 0.5},
  // 12 no shame / 24h
  {t: 40.34, file: 'swipe_smooth', vol: 0.5},
  {t: 40.8, file: 'click_crisp', vol: 0.5},
  ...typing(41.64, 8, 0.12),
  {t: 42.55, file: 'chime_subtle', vol: 0.5},
  // 13 paid vs free lesson
  {t: 43.24, file: 'whoosh_rise', vol: 0.5},
  {t: 43.7, file: 'pop_clean', vol: 0.5},
  {t: 45.8, file: 'click_crisp', vol: 0.5},
  {t: 45.98, file: 'success_soft', vol: 0.55},
  // 14 free start
  {t: 47.66, file: 'whoosh_fall', vol: 0.45},
  {t: 47.95, file: 'pop_clean', vol: 0.5},
  {t: 49.05, file: 'pop_clean', vol: 0.5},
  ...typing(51.55, 6, 0.1),
  {t: 51.9, file: 'chime_subtle', vol: 0.5},
  // 15 comment CTA
  {t: 52.5, file: 'whoosh_deep', vol: 0.5},
  ...typing(54.2, 5, 0.133),
  {t: 54.85, file: 'click_crisp', vol: 0.55},
  {t: 55.0, file: 'whoosh_fast', vol: 0.4},
  {t: 55.5, file: 'pop_clean', vol: 0.5},
  {t: 56.0, file: 'success_soft', vol: 0.5},
  // 16 outro
  {t: 56.94, file: 'whoosh_rise', vol: 0.5},
  {t: 57.75, file: 'pop_clean', vol: 0.5},
  {t: 58.3, file: 'click_crisp', vol: 0.55},
  {t: 58.4, file: 'success_soft', vol: 0.6},
];
