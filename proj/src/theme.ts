import {Easing} from 'remotion';

export const FPS = 30;
export const W = 1920;
export const H = 1080;

// Colour scheme 1 — "Breaking Red Studio"
export const C = {
  bg: '#0B0D12',
  bg2: '#141824',
  bg3: '#1E2433',
  primary: '#FF2D3D',
  secondary: '#FFC83D',
  accent: '#FFFFFF',
  text: '#F5F6F8',
  muted: '#8B92A5',
  black: '#05060A',
  line: 'rgba(255,255,255,0.10)',
};

export const FONT = {
  bn: '"Hind Siliguri","Space Grotesk",sans-serif',
  display: '"Space Grotesk","Hind Siliguri",sans-serif',
};

export const R = {sm: 10, md: 18, lg: 28};

export const SHADOW = {
  soft: '0 24px 70px rgba(0,0,0,0.5)',
  glowRed: '0 0 70px rgba(255,45,61,0.38)',
  glowYellow: '0 0 60px rgba(255,200,61,0.30)',
};

// Spring presets: big = heavy/controlled, ui = quick, type = typography, soft = background
export const SPRING = {
  big: {damping: 20, stiffness: 90, mass: 1.1},
  ui: {damping: 22, stiffness: 190, mass: 0.7},
  type: {damping: 28, stiffness: 170, mass: 0.8},
  soft: {damping: 32, stiffness: 55, mass: 1},
};

export const EASE = {
  out: Easing.bezier(0.16, 1, 0.3, 1),
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  in: Easing.bezier(0.55, 0, 0.9, 0.45),
  back: Easing.bezier(0.34, 1.35, 0.64, 1),
};

// Shared layout anchors (used by the S3 -> S4 match cut)
export const PB = {w: 1300, h: 220, cy: 330};
export const MINI = {x: 170, y: 100, size: 84};

export const VOICEOVER = {studioPreview: true, render: true};

export const LOGOS = {
  invideo: 'logos/invideo.png',
  elevenlabs: 'logos/elevenlabs.png',
  leonardo: 'logos/leonardo.png',
};
