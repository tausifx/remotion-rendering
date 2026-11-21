import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, ease, fonts, springs, textDim} from '../theme';
import {prog, sine, sp, useSceneClock} from '../utils/animations';
import {cue, } from '../utils/timing';
import {Words, Label} from '../components/Typography/Words';
import {WaveBars} from '../components/Effects/Wave';
import {IconMic} from '../components/UI/Kit';
import {Ripples} from '../components/Effects/Pulse';

export const Scene06: React.FC = () => {
  const {f, T} = useSceneClock('s06');
  const speak = prog(f, T(24.3), 8) * (1 - prog(f, T(26.0), 8));
  const m = sp(f, Math.round(T(23.74)) - 4, springs.ui);
  const caret = Math.floor(f / 14) % 2 === 0;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, top: 130, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 34}}>
        <div style={{position: 'relative', width: 110, height: 110, transform: `scale(${m})`}}>
          <Ripples size={110} color={colors.alert} start={Math.round(T(23.9))} count={2} period={40} />
          <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: alpha(colors.alert, 0.16), border: `2px solid ${colors.alert}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <IconMic size={56} color={colors.text} />
          </div>
        </div>
        <Words text="ওকে বলো" start={0} times={[T(23.74), T(24.05)]} size={84} weight={700} color={textDim} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Words text="You are my" start={0} times={[T(24.4), T(24.72), T(25.05)]} size={172} weight={700} latin gap={46} />
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Words text="IELTS Examiner" start={0} times={[T(25.4), T(25.75)]} size={172} weight={800} latin gap={46}
            colors={{0: colors.primary}} marks={{0: {color: colors.primary, at: Math.round(T(25.5))}}} />
          <div style={{width: 8, height: 150, marginLeft: 26, background: colors.primary, opacity: f > T(24.3) && caret ? 1 : 0.1, borderRadius: 4}} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 410, top: 830, opacity: prog(f, T(23.9), 14)}}>
        <WaveBars width={1100} height={150} bars={56} color={colors.primary} amp={0.18 + 0.82 * speak} speed={0.28} seed={4} />
      </div>
    </AbsoluteFill>
  );
};
