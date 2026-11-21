import { Easing } from "remotion";

/** ─────────────  Clean Daylight palette  ───────────── */
export const COLORS = {
  bg: "#F6F3EE",
  primary: "#1F2A44",
  secondary: "#6C3CF0",
  accent: "#E5383B",
  text: "#141414",
  muted: "#5B6275",
  white: "#FFFFFF",
  line: "rgba(31,42,68,0.14)",
  paperShadow: "rgba(31,42,68,0.18)",
};

/** Brand colours taken from the supplied logos (used only around their own logo) */
export const BRAND = {
  remini: "#A61F24",
  upscale: "#6933F9",
  picwish: "#0077FF",
  picwishLight: "#84E5FF",
};

export const FONT_FAMILY = "'Hind Siliguri', 'Noto Sans Bengali', sans-serif";

export const RADIUS = { sm: 14, md: 28, lg: 44, logo: "22.5%" };

export const SHADOW = {
  soft: "0 18px 40px rgba(31,42,68,0.14)",
  lift: "0 34px 80px rgba(31,42,68,0.22)",
  glow: (c: string) => `0 0 60px ${c}55`,
};

/** Motion personalities – different elements use different spring feels */
export const SPRING = {
  big: { damping: 18, stiffness: 90, mass: 1 }, // large objects: smooth, slight overshoot
  ui: { damping: 20, stiffness: 190, mass: 0.7 }, // small UI: quick, subtle
  type: { damping: 24, stiffness: 200, mass: 0.6 }, // typography: fast entry, controlled stop
  soft: { damping: 30, stiffness: 70, mass: 1 }, // calm, no bounce
  pop: { damping: 12, stiffness: 170, mass: 0.7 }, // stamps / coins
  bg: { damping: 60, stiffness: 20, mass: 1 }, // background drift
};

export const EASE = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.7, 0, 0.84, 0),
  soft: Easing.bezier(0.4, 0, 0.2, 1),
  linear: (t: number) => t,
};

/** Switches */
export const CONFIG = {
  /** Voiceover plays only inside Remotion Studio preview when public/voiceover.mp3 exists */
  previewVoiceover: true,
  /** Set to true to bake the voiceover into the rendered MP4 */
  renderVoiceover: true,
};
