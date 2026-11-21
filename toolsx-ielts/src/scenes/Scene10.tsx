import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, ease, fonts, springs} from '../theme';
import {prog, sine, sp, useSceneClock} from '../utils/animations';
import {Words} from '../components/Typography/Words';
import {RingBars} from '../components/Effects/Wave';
import {Pill} from '../components/UI/Kit';

export const Scene10: React.FC = () => {
  const {f, T} = useSceneClock('s10');
  const s = sp(f, Math.round(T(35.4)) - 4, springs.big);
  const ai = sp(f, Math.round(T(36.2)), springs.big);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 620 - 360, top: 540 - 360, width: 720, height: 720, transform: `scale(${(0.4 + 0.6 * s) * (1 + sine(f, 50) * 0.02)})`, opacity: Math.min(1, s * 3)}}>
        <RingBars size={720} color={colors.annie} amp={0.5 + 0.5 * prog(f, T(35.6), 20)} inner={0.31} count={60} />
        <div style={{position: 'absolute', left: 160, top: 160, width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle at 32% 26%, ${alpha(colors.white, 0.55)}, ${colors.annie} 32%, ${colors.secondary} 78%, ${colors.panel})`, boxShadow: `0 0 120px ${alpha(colors.annie, 0.45)}`}} />
        <div style={{position: 'absolute', left: 160, top: 160, width: 400, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.latin, fontSize: 150, fontWeight: 800, color: colors.white, opacity: prog(f, T(36.1), 12)}}>AI</div>
      </div>
      <div style={{position: 'absolute', left: 1020, top: 330, width: 780}}>
        <Words text="এটা একটা" start={0} times={[T(35.45), T(35.68)]} size={78} weight={600} align="left" color={alpha(colors.text, 0.65)} />
        <Words text="মেয়ে" start={0} times={[T(35.96)]} size={170} weight={700} align="left" />
        <div style={{display: 'flex', alignItems: 'center', gap: 30, marginTop: 6}}>
          <div style={{fontFamily: fonts.latin, fontSize: 210, fontWeight: 800, color: colors.annie, lineHeight: 1, transform: `scale(${0.6 + 0.4 * ai})`, transformOrigin: 'left center', opacity: Math.min(1, ai * 3)}}>AI</div>
          <div style={{opacity: prog(f, T(36.3), 12)}}><Pill latin color={colors.annie} size={36}>Call Annie</Pill></div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
