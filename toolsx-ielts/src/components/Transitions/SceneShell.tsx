import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {alpha, colors, ease, HEIGHT, WIDTH} from '../../theme';
import {prog} from '../../utils/animations';
import {SceneDef} from '../../utils/timing';

const liquidPoly = (p: number, f: number): string => {
  const n = 18;
  const lead = -0.2 + p * 1.45;
  const pts = ['0% 0%'];
  for (let i = 0; i <= n; i++) {
    const y = (i / n) * 100;
    const x = (lead + Math.sin(i * 0.9 + f * 0.25) * 0.07 * Math.sin(p * Math.PI)) * 100;
    pts.push(`${Math.max(0, Math.min(140, x)).toFixed(1)}% ${y.toFixed(1)}%`);
  }
  pts.push('0% 100%');
  return `polygon(${pts.join(',')})`;
};

/** Wraps a scene: incoming transition (by kind) + soft outgoing exit. */
export const SceneShell: React.FC<{def: SceneDef; duration: number; post: number; children: React.ReactNode}> = ({
  def, duration, post, children,
}) => {
  const f = useCurrentFrame();
  const tr = Math.max(1, def.tr);
  const inP = def.kind === 'none' ? 1 : prog(f, 0, tr, def.kind === 'push' ? ease.out : ease.inOut);
  const exitP = prog(f, duration - Math.max(post, 6), Math.max(post, 6), ease.in);
  let style: React.CSSProperties = {};
  let overlay: React.ReactNode = null;

  if (inP < 1) {
    switch (def.kind) {
      case 'push':
        style = {opacity: Math.min(1, inP * 2.2), transform: `scale(${0.84 + 0.16 * inP})`, filter: `blur(${(1 - inP) * 10}px)`};
        break;
      case 'circle': {
        const r = inP * 150;
        style = {clipPath: `circle(${r}% at ${def.cx}% ${def.cy}%)`};
        const d = ((r / 100) * Math.hypot(WIDTH, HEIGHT) * 0.5) * 2;
        overlay = (
          <div style={{
            position: 'absolute', left: (def.cx! / 100) * WIDTH - d / 2, top: (def.cy! / 100) * HEIGHT - d / 2, width: d, height: d,
            borderRadius: '50%', border: `3px solid ${alpha(colors.accent, 0.7 * (1 - inP))}`, pointerEvents: 'none',
          }} />
        );
        break;
      }
      case 'wipe': {
        const dir = def.dir ?? 'up';
        const rest = (1 - inP) * 100;
        style = {clipPath:
          dir === 'up' ? `inset(${rest}% 0 0 0)` : dir === 'down' ? `inset(0 0 ${rest}% 0)` : dir === 'left' ? `inset(0 0 0 ${rest}%)` : `inset(0 ${rest}% 0 0)`};
        const vertical = dir === 'up' || dir === 'down';
        const pos = dir === 'up' || dir === 'left' ? rest : 100 - rest;
        overlay = (
          <div style={{
            position: 'absolute', background: `linear-gradient(${vertical ? '90deg' : '180deg'}, transparent, ${alpha(colors.accent, 0.9)}, transparent)`,
            opacity: 1 - inP, pointerEvents: 'none',
            ...(vertical ? {left: 0, right: 0, height: 3, top: `${pos}%`} : {top: 0, bottom: 0, width: 3, left: `${pos}%`}),
          }} />
        );
        break;
      }
      case 'split': {
        const rest = (1 - inP) * 50;
        style = {clipPath: `inset(${rest}% 0 ${rest}% 0)`};
        overlay = (
          <>
            {[50 - (inP * 50), 50 + inP * 50].map((y, i) => (
              <div key={i} style={{position: 'absolute', left: 0, right: 0, top: `${y}%`, height: 3, opacity: 1 - inP,
                background: `linear-gradient(90deg, transparent, ${alpha(colors.primary, 0.9)}, transparent)`}} />
            ))}
          </>
        );
        break;
      }
      case 'liquid':
        style = {clipPath: liquidPoly(inP, f)};
        break;
      case 'perspective':
        style = {opacity: Math.min(1, inP * 2), transform: `perspective(1800px) rotateY(${(1 - inP) * -38}deg) translateX(${(1 - inP) * 220}px)`, transformOrigin: 'left center'};
        break;
      case 'sweep': {
        const x = -20 + inP * 140;
        style = {opacity: Math.min(1, inP * 3)};
        overlay = (
          <div style={{
            position: 'absolute', top: -200, bottom: -200, width: 360, left: `${x}%`, transform: 'skewX(-18deg)', pointerEvents: 'none',
            background: `linear-gradient(90deg, transparent, ${alpha(colors.white, 0.28)}, transparent)`, opacity: 1 - Math.abs(inP - 0.5) * 1.2,
          }} />
        );
        break;
      }
      default:
    }
  }
  const exitStyle: React.CSSProperties =
    exitP > 0 ? {opacity: 1 - exitP * 0.9, transform: `scale(${1 + exitP * 0.035})`} : {};
  return (
    <AbsoluteFill>
      <AbsoluteFill style={exitStyle}>
        <AbsoluteFill style={style}>{children}</AbsoluteFill>
      </AbsoluteFill>
      {overlay}
    </AbsoluteFill>
  );
};
