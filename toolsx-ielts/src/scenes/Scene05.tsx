import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, ease, springs, toolColor} from '../theme';
import {prog, sine, sp, useSceneClock} from '../utils/animations';
import {Words, GhostNumber, Label} from '../components/Typography/Words';
import {Logo} from '../components/UI/Logo';
import {Ripples} from '../components/Effects/Pulse';
import {RingBars} from '../components/Effects/Wave';

export const Scene05: React.FC = () => {
  const {f, T} = useSceneClock('s05');
  const s = sp(f, Math.round(T(20.9)) - 2, springs.big);
  const breathe = 1 + sine(f, 60) * 0.025;
  return (
    <AbsoluteFill>
      <GhostNumber value="02" size={640} color={toolColor.gpt} opacity={0.2} style={{position: 'absolute', right: 120, top: 40, opacity: prog(f, 4, 24)}} />
      <div style={{position: 'absolute', left: 960 - 350, top: 10, width: 700, height: 700, transform: `scale(${(0.4 + 0.6 * s) * breathe * 0.86})`, opacity: Math.min(1, s * 3)}}>
        <RingBars size={700} color={colors.primary} amp={0.4 + 0.6 * prog(f, T(21.2), 30)} inner={0.31} count={64} />
        <div style={{position: 'absolute', left: 150, top: 150, width: 400, height: 400}}>
          <Ripples size={400} color={colors.primary} start={Math.round(T(21.0))} count={3} />
          <div style={{position: 'absolute', inset: -40, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(colors.secondary, 0.35)}, transparent 70%)`}} />
          <Logo tool="gpt" size={400} glowK={1.4} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 690}}>
        <Label size={26} color={colors.primary} style={{textAlign: 'center', opacity: prog(f, T(20.9), 12)}}>Tool 02</Label>
        <Words text="ChatGPT" start={0} times={[T(21.47)]} size={150} weight={800} latin />
        <Words text="Voice Mode" start={0} times={[T(22.06), T(22.65)]} size={92} weight={600} latin colors={{0: colors.primary, 1: colors.primary}} style={{marginTop: -8}} />
      </div>
    </AbsoluteFill>
  );
};
