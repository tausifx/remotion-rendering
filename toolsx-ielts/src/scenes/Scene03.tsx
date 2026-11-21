import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors, ease, fonts, springs, textDim, toolColor} from '../theme';
import {prog, sp, useSceneClock} from '../utils/animations';
import {Words, GhostNumber, Label} from '../components/Typography/Words';
import {Logo} from '../components/UI/Logo';
import {Ripples} from '../components/Effects/Pulse';
import {IconLink, Pill} from '../components/UI/Kit';

export const Scene03: React.FC = () => {
  const {f, T} = useSceneClock('s03');
  const push = 1 + 0.06 * prog(f, 0, 150, ease.soft);
  const s = sp(f, Math.round(T(7.35)) - 4, springs.big);
  const url = prog(f, T(9.417) - 6, 20, ease.inOut);
  return (
    <AbsoluteFill style={{transform: `scale(${push})`}}>
      <GhostNumber value="01" size={820} color={toolColor.elsa} opacity={0.2} style={{position: 'absolute', left: 60, top: 110, opacity: prog(f, 4, 24)}} />
      <div style={{position: 'absolute', left: 430, top: 340, width: 400, height: 400, transform: `scale(${0.3 + 0.7 * s})`, opacity: Math.min(1, s * 3)}}>
        <Ripples size={400} color={colors.accent} start={Math.round(T(7.35))} />
        <Logo tool="elsa" size={400} glowK={1.5} />
      </div>
      <div style={{position: 'absolute', left: 960, top: 300}}>
        <Label size={26} color={colors.accent} style={{opacity: prog(f, 8, 12)}}>Tool 01 · Pronunciation</Label>
        <Words text="ELSA" start={Math.round(T(7.35))} size={220} weight={800} latin align="left" style={{marginTop: 6}} />
        <Words text="Speak" start={Math.round(T(7.35)) + 6} size={220} weight={800} latin align="left" colors={{0: colors.accent}} />
        <div style={{marginTop: 40, display: 'inline-block', clipPath: `inset(0 ${(1 - url) * 100}% 0 0)`}}>
          <Pill latin color={colors.accent} size={52}><IconLink size={50} color={colors.accent} />elsaspeak.com</Pill>
        </div>
      </div>
    </AbsoluteFill>
  );
};
