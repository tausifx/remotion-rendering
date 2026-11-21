import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, ease, fonts, springs, textDim} from '../theme';
import {mix, prog, sp, useSceneClock} from '../utils/animations';
import {Words, Label} from '../components/Typography/Words';
import {Glass} from '../components/UI/Kit';
import {Logo} from '../components/UI/Logo';
import {WaveBars} from '../components/Effects/Wave';
import {IconCheck} from '../components/UI/Kit';

export const Scene08: React.FC = () => {
  const {f, T} = useSceneClock('s08');
  const enter = sp(f, Math.round(T(30.912)) - 4, springs.big);
  const m = prog(f, T(31.45), 26, ease.inOut);
  const lx = mix(420, 665, m), rx = mix(1500, 1255, m);
  const eq = sp(f, Math.round(T(31.9)), springs.pop);
  return (
    <AbsoluteFill>
      {[0, 1].map((i) => {
        const x = i === 0 ? lx : rx;
        const dirIn = i === 0 ? -1 : 1;
        return (
          <div key={i} style={{position: 'absolute', left: x - 260, top: 190, transform: `translateX(${(1 - enter) * dirIn * 260}px)`, opacity: Math.min(1, enter * 2)}}>
            <Glass w={520} h={420} tint={i === 0 ? colors.text : colors.primary}>
              <div style={{position: 'absolute', left: 36, top: 30, display: 'flex', alignItems: 'center', gap: 18}}>
                {i === 0 ? (
                  <svg width={64} height={64} viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth={1.6} strokeLinecap="round"><rect x="5" y="3" width="14" height="18" rx="2.5" /><path d="M8.5 8h7M8.5 12h7M8.5 16h4" /></svg>
                ) : <Logo tool="gpt" size={64} glowK={0.3} />}
                <Label size={26} color={i === 0 ? colors.text : colors.primary}>{i === 0 ? 'Real Exam' : 'ChatGPT Voice'}</Label>
              </div>
              <div style={{position: 'absolute', left: 40, top: 150}}>
                <WaveBars width={440} height={200} bars={26} color={i === 0 ? alpha(colors.text, 0.75) : colors.primary} seed={1 + (i === 0 ? (1 - m) * 3 : 0)} speed={0.2} />
              </div>
            </Glass>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 960 - 55, top: 345, width: 110, height: 110, borderRadius: '50%', background: alpha(colors.accent, 0.16), border: `2px solid ${colors.accent}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${eq})`, opacity: Math.min(1, eq * 2)}}>
        <div style={{fontFamily: fonts.latin, fontSize: 80, fontWeight: 700, color: colors.accent, lineHeight: 1, marginTop: -6}}>=</div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 710}}>
        <Words text="একদম রিয়েল পরীক্ষার মতো" start={0} times={[T(30.912), T(31.32), T(31.72), T(32.1)]} size={100} weight={700}
          marks={{1: {color: colors.accent, at: Math.round(T(31.4))}, 2: {color: colors.accent, at: Math.round(T(31.8))}}} />
      </div>
    </AbsoluteFill>
  );
};
