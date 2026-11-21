import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, ease, fonts, springs, textDim} from '../theme';
import {mix, prog, sp, useSceneClock} from '../utils/animations';
import {Words} from '../components/Typography/Words';
import {Logo} from '../components/UI/Logo';
import {IconLock, IconRepeat, Pill} from '../components/UI/Kit';

export const Scene13: React.FC = () => {
  const {f, T} = useSceneClock('s13');
  const s = sp(f, Math.round(T(43.46)) - 4, springs.big);
  const shift = prog(f, T(45.72), 24, ease.inOut);
  const unlock = prog(f, T(45.8), 8);
  const tk = sp(f, Math.round(T(45.798)) - 4, springs.big);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, top: 130}}>
        <Words text="মনে রাখবে" start={0} times={[T(43.462), T(43.8)]} size={76} weight={600} color={textDim} />
      </div>
      <div style={{position: 'absolute', left: mix(960, 520, shift) - 150, top: 290, width: 300, height: 300, transform: `scale(${0.4 + 0.6 * s})`, opacity: Math.min(1, s * 3)}}>
        <Logo tool="elsa" size={300} glowK={1.3} />
      </div>
      <div style={{position: 'absolute', left: mix(960, 520, shift) - 300, width: 600, top: 630, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
        <div style={{fontFamily: fonts.latin, fontSize: 54, fontWeight: 700}}>ELSA Speak</div>
        <div style={{opacity: prog(f, T(44.4), 12), transform: `translateY(${(1 - prog(f, T(44.4), 14)) * 20}px)`}}>
          <Pill color={unlock > 0.5 ? colors.accent : colors.primary} size={46}>
            <IconLock size={46} open={unlock > 0.5} color={unlock > 0.5 ? colors.accent : colors.primary} />
            {unlock > 0.5 ? 'ফ্রি' : 'পেইড'}
          </Pill>
        </div>
      </div>
      <div style={{position: 'absolute', left: 1010, top: 300, width: 780, height: 330, transform: `translateX(${(1 - tk) * 420}px) rotate(${(1 - tk) * 6}deg)`, opacity: Math.min(1, tk * 3)}}>
        <svg width={780} height={330} viewBox="0 0 780 330" style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
          <path d="M40 0H740Q780 0 780 40V122A44 44 0 0 0 780 208V290Q780 330 740 330H40Q0 330 0 290V208A44 44 0 0 0 0 122V40Q0 0 40 0Z"
            fill={alpha(colors.panelHi, 0.95)} stroke={alpha(colors.accent, 0.6)} strokeWidth={3} />
          <line x1={250} y1={30} x2={250} y2={300} stroke={alpha(colors.accent, 0.4)} strokeWidth={3} strokeDasharray="4 14" strokeLinecap="round" />
        </svg>
        <div style={{position: 'absolute', left: 40, top: 85, width: 170, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{transform: `rotate(${prog(f, T(45.9), 60, ease.inOut) * 360}deg)`}}><IconRepeat size={120} color={colors.accent} stroke={1.6} /></div>
        </div>
        <div style={{position: 'absolute', left: 290, top: 40, width: 470}}>
          <Words text="প্রতিদিন" start={0} times={[T(45.9)]} size={74} weight={600} align="left" color={textDim} />
          <Words text="ফ্রি লেসন" start={0} times={[T(46.3), T(46.62)]} size={110} weight={700} align="left" colors={{0: colors.accent, 1: colors.accent}} marks={{1: {color: colors.accent, at: Math.round(T(46.7))}}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
