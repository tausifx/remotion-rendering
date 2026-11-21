import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, EASE, FONT, LOGOS, MINI, PB, SPRING} from '../theme';
import {ease, hexA, useSpr} from '../utils/animations';
import {Studio} from '../components/Backgrounds/Studio';
import {Particles} from '../components/Effects/Particles';
import {Words} from '../components/Typography/Words';
import {Center} from '../components/UI/Center';
import {LogoTile} from '../components/UI/LogoTile';

export const Scene03: React.FC = () => {
  const f = useCurrentFrame();
  const tile = useSpr(6, SPRING.big);
  const bar = useSpr(78, SPRING.ui);
  const m = ease(f, [138, 168], [0, 1], EASE.inOut);
  const size = interpolate(m, [0, 1], [300, MINI.size]);
  const tx = interpolate(m, [0, 1], [960, MINI.x]);
  const ty = interpolate(m, [0, 1], [380, MINI.y]);
  const bw = interpolate(m, [0, 1], [1000, PB.w]);
  const bh = interpolate(m, [0, 1], [96, PB.h]);
  const by = interpolate(m, [0, 1], [760, PB.cy]);
  const br = interpolate(m, [0, 1], [20, 28]);
  const n = Math.floor(Math.max(0, Math.min(10, (f - 88) / 3.5)));
  const url = 'invideo.io'.slice(0, n);
  const fade = 1 - Math.min(1, m * 2.2);
  const ripple = (d: number) => {
    const p = ease(f, [d, d + 34], [0, 1]);
    return <div style={{position: 'absolute', width: 300 + p * 520, height: 300 + p * 520, borderRadius: '50%', border: `3px solid ${C.secondary}`, opacity: (1 - p) * 0.6 * fade}} />;
  };
  return (
    <AbsoluteFill>
      <Studio glow={C.secondary} glow2={C.primary} flip />
      <Particles count={24} seed="s3" color={C.secondary} />
      <div style={{position: 'absolute', left: 1180 - f * 0.5, top: 90, fontFamily: FONT.display, fontWeight: 700, fontSize: 760, lineHeight: 1.1, color: 'transparent', WebkitTextStroke: `3px ${hexA(C.text, 0.1)}`, opacity: fade}}>০১</div>
      <Center x={960} y={150}>
        <div style={{opacity: fade}}><Words text="প্রথমে" size={76} delay={2} color={C.secondary} align="center" /></div>
      </Center>
      <Center x={tx} y={ty}>
        {ripple(8)}{ripple(18)}
      </Center>
      <Center x={tx} y={ty}>
        <div style={{transform: `scale(${0.5 + 0.5 * tile})`, opacity: Math.min(1, tile * 2.5)}}>
          <LogoTile src={LOGOS.invideo} size={size} white={false} glow="0 30px 80px rgba(255,200,61,0.35)" />
        </div>
      </Center>
      <Center x={960} y={585}>
        <div style={{opacity: fade}}><Words text="InVideo AI" size={78} delay={14} font={FONT.display} align="center" /></div>
      </Center>
      <Center x={960} y={by}>
        <div style={{width: bw, height: bh, borderRadius: br, background: C.bg2, border: `2px solid ${hexA(C.secondary, 0.5)}`, boxShadow: `0 0 50px ${hexA(C.secondary, 0.14)}`, transform: `translateY(${(1 - bar) * 70}px)`, opacity: Math.min(1, bar * 2), display: 'flex', alignItems: 'center', padding: '0 40px', position: 'relative', flex: 'none'}}>
          <div style={{width: 16, height: 16, borderRadius: 8, background: C.secondary, marginRight: 24, opacity: fade}} />
          <div style={{fontFamily: FONT.display, fontWeight: 500, fontSize: 46, color: C.text, opacity: fade}}>{url}</div>
          <div style={{width: 3, height: 48, background: C.text, marginLeft: 4, opacity: fade * (Math.floor(f / 8) % 2 ? 0.1 : 1), position: m > 0.3 ? 'absolute' : 'relative', left: m > 0.3 ? 44 : undefined, top: m > 0.3 ? 40 : undefined}} />
        </div>
      </Center>
    </AbsoluteFill>
  );
};
