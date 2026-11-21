import React from 'react';
import {C} from '../../theme';

type P = {size?: number; color?: string; sw?: number; style?: React.CSSProperties};
const base = (size: number, vb: string, style?: React.CSSProperties) => ({width: size, height: size, viewBox: vb, style, fill: 'none' as const});

export const IconFace: React.FC<P> = ({size = 200, color = C.bg3, style}) => (
  <svg {...base(size, '0 0 200 240', style)}>
    <circle cx="100" cy="76" r="54" fill={color} />
    <path d="M14 236 C14 160 58 138 100 138 C142 138 186 160 186 236 Z" fill={color} />
  </svg>
);
export const IconMic: React.FC<P> = ({size = 200, color = C.text, sw = 10, style}) => (
  <svg {...base(size, '0 0 200 200', style)} stroke={color} strokeWidth={sw} strokeLinecap="round">
    <rect x="72" y="14" width="56" height="104" rx="28" />
    <path d="M44 100 a56 56 0 0 0 112 0" />
    <path d="M100 156 V186 M68 186 H132" />
  </svg>
);
export const IconPlay: React.FC<P> = ({size = 80, color = C.text, style}) => (
  <svg {...base(size, '0 0 100 100', style)}>
    <circle cx="50" cy="50" r="46" fill={color} fillOpacity={0.14} stroke={color} strokeWidth={4} />
    <path d="M40 30 L72 50 L40 70 Z" fill={color} />
  </svg>
);
export const IconLock: React.FC<P & {open?: number}> = ({size = 80, color = C.primary, open = 0, style}) => (
  <svg {...base(size, '0 0 160 170', style)} strokeLinecap="round">
    <path d="M50 78 V52 a30 30 0 0 1 60 0 V78" stroke={color} strokeWidth={12} transform={`translate(0 ${-14 * open}) rotate(${-38 * open} 110 78)`} />
    <rect x="26" y="78" width="108" height="82" rx="16" fill={color} />
    <circle cx="80" cy="116" r="10" fill={C.bg} />
  </svg>
);
export const IconCursor: React.FC<P> = ({size = 60, color = C.accent, style}) => (
  <svg {...base(size, '0 0 30 42', style)}>
    <path d="M2 2 L2 34 L10 27 L16 40 L22 37 L16 25 L27 25 Z" fill={color} stroke={C.black} strokeWidth={2} strokeLinejoin="round" />
  </svg>
);
const feather = (d: string[]): React.FC<P> => ({size = 40, color = C.text, sw = 2, style}) => (
  <svg {...base(size, '0 0 24 24', style)} stroke={color} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
    {d.map((p, i) => <path key={i} d={p} />)}
  </svg>
);
export const IconLink = feather(['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71']);
export const IconArrowUp = feather(['M12 19V5', 'M5 12l7-7 7 7']);
export const IconCheck = feather(['M20 6L9 17l-5-5']);
export const IconPlus = feather(['M12 5v14', 'M5 12h14']);
export const IconSend = feather(['M22 2L11 13', 'M22 2l-7 20-4-9-9-4 20-7z']);
export const IconImage = feather(['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M3 17l5-5 4 4 3-3 6 6']);
export const IconFilm = feather(['M4 4h16v16H4z', 'M4 9h16', 'M4 15h16', 'M9 4v16', 'M15 4v16']);
