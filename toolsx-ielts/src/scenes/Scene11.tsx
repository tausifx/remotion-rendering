import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, ease, fonts, springs, textDim} from '../theme';
import {prog, sine, sp, useSceneClock} from '../utils/animations';
import {Words} from '../components/Typography/Words';
import {WaveBars} from '../components/Effects/Wave';
import {IconPhone} from '../components/UI/Kit';
import {Ripples} from '../components/Effects/Pulse';

export const Scene11: React.FC = () => {
  const {f, T} = useSceneClock('s11');
  const s = sp(f, Math.round(T(36.9)) - 4, springs.big);
  const secs = Math.max(0, Math.floor((f - T(37.2)) / 30));
  const rot = -16 + sine(f, 120) * 3;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 330, top: 130, width: 400, height: 820, perspective: 1600, transform: `translateY(${(1 - s) * 120}px)`, opacity: Math.min(1, s * 2.5)}}>
        <div style={{width: 400, height: 820, borderRadius: 64, transform: `rotateY(${rot}deg) rotateX(4deg)`, position: 'relative',
          background: `linear-gradient(170deg, ${colors.panelHi}, ${colors.bgDeep})`, border: `3px solid ${alpha(colors.text, 0.2)}`, boxShadow: `0 40px 90px rgba(0,0,0,0.6), 0 0 80px ${alpha(colors.annie, 0.28)}`}}>
          <div style={{position: 'absolute', left: 130, top: 22, width: 140, height: 30, borderRadius: 15, background: colors.bgDeep}} />
          <div style={{position: 'absolute', top: 100, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{position: 'relative', width: 170, height: 170}}>
              <Ripples size={170} color={colors.annie} start={Math.round(T(37.0))} count={2} period={50} />
              <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `radial-gradient(circle at 32% 26%, ${alpha(colors.white, 0.5)}, ${colors.annie} 35%, ${colors.secondary} 85%)`}} />
            </div>
            <div style={{fontFamily: fonts.latin, fontSize: 52, fontWeight: 700, color: colors.text, marginTop: 26}}>Annie</div>
            <div style={{fontFamily: fonts.latin, fontSize: 32, color: colors.accent, marginTop: 6, fontVariantNumeric: 'tabular-nums'}}>{`00:${String(secs).padStart(2, '0')}`}</div>
          </div>
          <div style={{position: 'absolute', left: 60, top: 520}}><WaveBars width={280} height={110} bars={22} color={colors.annie} speed={0.26} seed={3} /></div>
          <div style={{position: 'absolute', left: 150, top: 690, width: 100, height: 100, borderRadius: '50%', background: colors.alert, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(135deg)'}}>
            <IconPhone size={50} color={colors.white} stroke={2} />
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 900, top: 190, width: 900}}>
        <Words text="ফোনে কথা বলার মতো" start={0} times={[T(37.8), T(38.1), T(38.4), T(38.7)]} size={88} weight={700} align="left" colors={{0: colors.annie}} />
        <div style={{marginTop: 24}}>
          <Words text="IELTS" start={0} times={[T(39.0)]} size={230} weight={800} latin align="left" />
          <Words text="প্র্যাকটিস" start={0} times={[T(39.3)]} size={112} weight={700} align="left" colors={{0: colors.annie}} marks={{0: {color: colors.annie}}} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
