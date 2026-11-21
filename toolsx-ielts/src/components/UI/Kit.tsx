import React from 'react';
import {alpha, colors, fonts, lineColor, radius, shadow} from '../../theme';

export const Glass: React.FC<{
  w?: number; h?: number; r?: number; tint?: string; style?: React.CSSProperties; children?: React.ReactNode;
}> = ({w, h, r = radius.lg, tint = colors.primary, style, children}) => (
  <div style={{
    width: w, height: h, borderRadius: r, position: 'relative', boxSizing: 'border-box',
    background: `linear-gradient(160deg, ${alpha(colors.panelHi, 0.92)}, ${alpha(colors.panel, 0.92)})`,
    border: `1.5px solid ${lineColor}`, boxShadow: `${shadow.soft}, inset 0 1px 0 ${alpha(colors.white, 0.06)}`,
    overflow: 'hidden', ...style,
  }}>
    <div style={{position: 'absolute', inset: 0, background: `radial-gradient(120% 80% at 0% 0%, ${alpha(tint, 0.14)}, transparent 60%)`}} />
    <div style={{position: 'relative', width: '100%', height: '100%'}}>{children}</div>
  </div>
);

export const Pill: React.FC<{
  children: React.ReactNode; color?: string; size?: number; solid?: boolean; style?: React.CSSProperties; latin?: boolean;
}> = ({children, color = colors.accent, size = 34, solid, style, latin}) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: size * 0.3, padding: `${size * 0.28}px ${size * 0.7}px`, borderRadius: 999,
    fontFamily: latin ? fonts.latin : fonts.main, fontSize: size, fontWeight: 600, letterSpacing: 0, whiteSpace: 'nowrap',
    color: solid ? colors.bgDeep : color, background: solid ? color : alpha(color, 0.12), border: `1.5px solid ${alpha(color, solid ? 1 : 0.5)}`, ...style,
  }}>{children}</div>
);

type IconProps = {size?: number; color?: string; stroke?: number};
const svgBase = (size: number) => ({width: size, height: size, viewBox: '0 0 24 24', fill: 'none' as const});
const sx = (color: string, stroke: number) => ({stroke: color, strokeWidth: stroke, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const});

export const IconMic: React.FC<IconProps> = ({size = 40, color = colors.text, stroke = 1.8}) => (
  <svg {...svgBase(size)}><rect x="9" y="3" width="6" height="11" rx="3" {...sx(color, stroke)} /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" {...sx(color, stroke)} /></svg>
);
export const IconPhone: React.FC<IconProps> = ({size = 40, color = colors.text, stroke = 1.8}) => (
  <svg {...svgBase(size)}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" {...sx(color, stroke)} /></svg>
);
export const IconCheck: React.FC<IconProps> = ({size = 40, color = colors.accent, stroke = 2.4}) => (
  <svg {...svgBase(size)}><path d="M5 12.5l4.5 4.5L19 7" {...sx(color, stroke)} /></svg>
);
export const IconCross: React.FC<IconProps> = ({size = 40, color = colors.alert, stroke = 2.4}) => (
  <svg {...svgBase(size)}><path d="M6 6l12 12M18 6L6 18" {...sx(color, stroke)} /></svg>
);
export const IconLink: React.FC<IconProps> = ({size = 40, color = colors.text, stroke = 1.8}) => (
  <svg {...svgBase(size)}><path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" {...sx(color, stroke)} /></svg>
);
export const IconLock: React.FC<IconProps & {open?: boolean}> = ({size = 40, color = colors.text, stroke = 1.8, open}) => (
  <svg {...svgBase(size)}><rect x="5" y="11" width="14" height="10" rx="2.5" {...sx(color, stroke)} /><path d={open ? 'M8 11V7a4 4 0 0 1 7.5-1.8' : 'M8 11V7a4 4 0 0 1 8 0v4'} {...sx(color, stroke)} /></svg>
);
export const IconPlay: React.FC<IconProps> = ({size = 40, color = colors.text}) => (
  <svg {...svgBase(size)}><path d="M8 5.5v13l11-6.5z" fill={color} /></svg>
);
export const IconRepeat: React.FC<IconProps> = ({size = 40, color = colors.text, stroke = 1.8}) => (
  <svg {...svgBase(size)}><path d="M4 11a8 8 0 0 1 14-4.5L20 9M20 4v5h-5M20 13a8 8 0 0 1-14 4.5L4 15M4 20v-5h5" {...sx(color, stroke)} /></svg>
);
export const IconPlane: React.FC<IconProps> = ({size = 40, color = colors.text, stroke = 1.8}) => (
  <svg {...svgBase(size)}><path d="M21 3L3 10.5l7 2.5 2.5 7L21 3zM10 13l5-5" {...sx(color, stroke)} /></svg>
);
export const IconSpeaker: React.FC<IconProps> = ({size = 40, color = colors.text, stroke = 1.8}) => (
  <svg {...svgBase(size)}><path d="M4 10v4h4l5 4V6L8 10H4zM16.5 9a4 4 0 0 1 0 6M19 6.5a8 8 0 0 1 0 11" {...sx(color, stroke)} /></svg>
);
export const IconPlus: React.FC<IconProps> = ({size = 40, color = colors.text, stroke = 2.2}) => (
  <svg {...svgBase(size)}><path d="M12 5v14M5 12h14" {...sx(color, stroke)} /></svg>
);
