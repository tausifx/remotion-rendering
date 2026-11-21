import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, EASE, H, W} from '../../theme';
import {hexA} from '../../utils/animations';

export type TType = 'slash' | 'circle' | 'sweep' | 'bars' | 'shutter' | 'iris';

const Strips: React.FC<{t: number; vertical: boolean; n: number; color: string; edge: string}> = ({t, vertical, n, color, edge}) => (
  <AbsoluteFill>
    {Array.from({length: n}).map((_, i) => {
      const d = i * 0.025;
      const enter = interpolate(t, [d, d + 0.3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE.inOut});
      const exit = interpolate(t, [0.55 + d, 0.55 + d + 0.3], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: EASE.inOut});
      const entering = t < 0.55 + d;
      const sc = entering ? enter : 1 - exit;
      const fromStart = vertical ? true : i % 2 === 0;
      const origin = entering ? (fromStart ? 'top left' : 'bottom right') : (fromStart ? 'bottom right' : 'top left');
      const size = 100 / n;
      const style: React.CSSProperties = vertical
        ? {left: `${i * size}%`, width: `${size + 0.15}%`, top: 0, height: '100%', transform: `scaleY(${sc})`, transformOrigin: origin}
        : {top: `${i * size}%`, height: `${size + 0.15}%`, left: 0, width: '100%', transform: `scaleX(${sc})`, transformOrigin: origin};
      return <div key={i} style={{position: 'absolute', background: i % 2 ? color : edge, ...style}} />;
    })}
  </AbsoluteFill>
);

export const SceneTransition: React.FC<{at: number; type: TType; half?: number}> = ({at, type, half = 10}) => {
  const f = useCurrentFrame();
  const t = (f - (at - half)) / (2 * half);
  if (t <= 0 || t >= 1) return null;

  if (type === 'slash') {
    const left = interpolate(t, [0, 1], [-190, 112], {easing: EASE.inOut});
    const band = (l: number, w: number, bg: string) => (
      <div style={{position: 'absolute', top: '-20%', height: '140%', width: `${w}%`, left: `${l}%`, background: bg, transform: 'skewX(-20deg)'}} />
    );
    return <AbsoluteFill style={{overflow: 'hidden'}}>{band(left + 172, 7, C.secondary)}{band(left, 170, C.primary)}{band(left - 6, 3, C.accent)}</AbsoluteFill>;
  }
  if (type === 'circle' || type === 'iris') {
    const R = 1500;
    const origin = type === 'circle' ? '50% 50%' : '8% 92%';
    const color = type === 'circle' ? C.primary : C.secondary;
    if (t < 0.5) {
      const r = interpolate(t, [0, 0.5], [0, R], {easing: EASE.out});
      return (
        <AbsoluteFill style={{overflow: 'hidden'}}>
          <div style={{position: 'absolute', left: type === 'circle' ? W / 2 - r : W * 0.08 - r, top: type === 'circle' ? H / 2 - r : H * 0.92 - r, width: r * 2, height: r * 2, borderRadius: '50%', background: color}} />
        </AbsoluteFill>
      );
    }
    const hole = interpolate(t, [0.5, 1], [0, R], {easing: EASE.out});
    return <AbsoluteFill style={{background: color, WebkitMaskImage: `radial-gradient(circle at ${origin}, transparent ${hole}px, #000 ${hole + 2}px)`}} />;
  }
  if (type === 'sweep') {
    const p = interpolate(t, [0, 1], [-35, 135]);
    const veil = Math.pow(Math.sin(Math.PI * t), 1.4);
    return (
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <AbsoluteFill style={{background: hexA(C.bg, veil)}} />
        <div style={{position: 'absolute', top: '-10%', height: '120%', width: '26%', left: `${p}%`, transform: 'skewX(-18deg)', background: `linear-gradient(90deg, transparent, ${hexA(C.accent, 0.9)}, transparent)`}} />
        <div style={{position: 'absolute', top: '-10%', height: '120%', width: '10%', left: `${p - 16}%`, transform: 'skewX(-18deg)', background: `linear-gradient(90deg, transparent, ${hexA(C.secondary, 0.5)}, transparent)`}} />
      </AbsoluteFill>
    );
  }
  if (type === 'bars') return <Strips t={t} vertical n={8} color={C.bg3} edge={C.primary} />;
  return <Strips t={t} vertical={false} n={6} color={C.bg2} edge={C.secondary} />;
};
