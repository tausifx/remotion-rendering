import { interpolate, spring } from "remotion";
import { EASE, SPRING } from "../theme";
import { FPS } from "./timing";

type SpringCfg = { damping: number; stiffness: number; mass: number };

/** 0 → 1 progress between two frames with easing */
export const prog = (
  frame: number,
  start: number,
  dur: number,
  easing: (t: number) => number = EASE.out
) =>
  interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });

/** Spring that starts at `delay` */
export const sp = (frame: number, delay: number, cfg: SpringCfg = SPRING.ui) =>
  spring({ frame: frame - delay, fps: FPS, config: cfg });

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Deterministic pseudo random (0-1) */
export const rand = (seed: number) => {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** 0→1→0 visibility between [a, b] with fade in / out (frames) */
export const vis = (frame: number, a: number, b: number, fi = 8, fo = 8) =>
  clamp((frame - a) / fi) * clamp((b - frame) / fo);
