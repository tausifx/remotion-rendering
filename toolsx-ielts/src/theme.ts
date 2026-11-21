import {Easing} from 'remotion';

/* ───────────── Video format ───────────── */
export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const CX = WIDTH / 2;
export const CY = HEIGHT / 2;

/* ───────────── Audio flags ─────────────
 * voiceover.mp3 (public/) বাজবে শুধু ফাইলটি থাকলে।
 * Studio Preview-তে ডিফল্টে চালু, Render-এ ডিফল্টে বন্ধ।
 */
export const AUDIO = {
  sfx: false,
  voiceoverInPreview: true,
  voiceoverInRender: true,
  sfxMasterVolume: 1,
};

/* ───────────── Color: "Midnight Voice" ───────────── */
export const colors = {
  bg: '#0A0E1A',
  bgDeep: '#05070E',
  panel: '#0F1527',
  panelHi: '#182040',
  primary: '#4F8CFF',
  secondary: '#7C5CFF',
  accent: '#00E5C3',
  text: '#F2F5FF',
  white: '#FFFFFF',
  alert: '#FF5C7A', // semantic: error / mistake only
  annie: '#A982FF', // sampled from the Call Annie logo
};

export const textDim = 'rgba(242,245,255,0.62)';
export const lineColor = 'rgba(150,178,255,0.16)';

export const alpha = (hex: string, a: number): string => {
  const n = parseInt(hex.replace('#', ''), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`;
};

export const toolColor = {
  elsa: colors.accent,
  gpt: colors.primary,
  annie: colors.annie,
} as const;
export type Tool = keyof typeof toolColor;

/* ───────────── Typography ───────────── */
export const fonts = {
  main: "'Hind Siliguri','DM Sans','BnFallback',sans-serif",
  latin: "'DM Sans','Hind Siliguri','BnFallback',sans-serif",
};

/* ───────────── Shape / depth language ───────────── */
export const radius = {sm: 12, md: 20, lg: 32};
export const shadow = {soft: '0 28px 70px rgba(2,4,12,0.55)'};
export const glow = (c: string, k = 1) =>
  `0 0 ${Math.round(40 * k)}px ${alpha(c, 0.32 * Math.min(k, 1.4))}`;

/* ───────────── Easing presets ───────────── */
export const ease = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  outSoft: Easing.bezier(0.22, 0.8, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.55, 0, 0.9, 0.45),
  soft: Easing.bezier(0.25, 0.1, 0.25, 1),
  linear: Easing.linear,
};

/* ───────────── Spring presets ───────────── */
export const springs = {
  big: {damping: 22, stiffness: 110, mass: 1.1}, // large objects: smooth, slight overshoot
  ui: {damping: 17, stiffness: 230, mass: 0.7}, // small UI: quick, responsive
  type: {damping: 28, stiffness: 210, mass: 0.8}, // typography: fast entry, controlled stop
  bg: {damping: 44, stiffness: 28, mass: 1.6}, // background: slow, continuous
  pop: {damping: 13, stiffness: 260, mass: 0.6}, // tiny badges / checks
};

/* ───────────── Scene tint (background glow colour) ───────────── */
export const sceneTint: Record<string, string> = {
  s01: colors.primary,
  s02: colors.secondary,
  s03: colors.accent,
  s04: colors.accent,
  s05: colors.primary,
  s06: colors.primary,
  s07: colors.secondary,
  s08: colors.primary,
  s09: colors.annie,
  s10: colors.annie,
  s11: colors.annie,
  s12: colors.accent,
  s13: colors.accent,
  s14: colors.primary,
  s15: colors.primary,
  s16: colors.secondary,
};
