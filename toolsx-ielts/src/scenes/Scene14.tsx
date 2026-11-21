import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, ease, fonts, springs, textDim} from '../theme';
import {prog, sp, useSceneClock} from '../utils/animations';
import {Words} from '../components/Typography/Words';
import {Logo, toolName} from '../components/UI/Logo';
import {IconPlay, Pill} from '../components/UI/Kit';
import {Tool} from '../theme';

const SEG = 18;

export const Scene14: React.FC = () => {
  const {f, T} = useSceneClock('s14');
  const cards: {tool: Tool; x: number; t: number; label: string}[] = [
    {tool: 'gpt', x: 560, t: 47.871, label: 'ChatGPT Voice'},
    {tool: 'annie', x: 1360, t: 48.95, label: 'Call Annie'},
  ];
  const q = T(51.458);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, top: 110}}>
        <Words text="ফ্রিতে শুরু করতে পারবে" start={0} times={[T(49.6), T(50.0), T(50.35), T(50.7)]} size={86} weight={700} colors={{0: colors.accent}} marks={{0: {color: colors.accent}}} />
      </div>
      {cards.map((c, i) => {
        const s = sp(f, Math.round(T(c.t)) - 4, springs.big);
        const press = sp(f, Math.round(T(50.1 + i * 0.25)), springs.pop);
        return (
          <div key={c.tool} style={{position: 'absolute', left: c.x - 200, top: 290, width: 400, transform: `translateY(${(1 - s) * 80}px) scale(${0.6 + 0.4 * s})`, opacity: Math.min(1, s * 3), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 26}}>
            <Logo tool={c.tool} size={270} glowK={1.2} />
            <div style={{fontFamily: fonts.latin, fontSize: 46, fontWeight: 700}}>{c.label}</div>
            <div style={{opacity: press, transform: `scale(${0.8 + 0.2 * press})`}}>
              <Pill color={colors.accent} size={38}><IconPlay size={36} color={colors.accent} />শুরু</Pill>
            </div>
          </div>
        );
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 745}}>
        <Words text="ফ্রি কোটা আছে" start={0} times={[q, q + 9, q + 18]} size={66} weight={700} colors={{0: colors.accent}} />
        <div style={{display: 'flex', justifyContent: 'center', gap: 10, marginTop: 34}}>
          {Array.from({length: SEG}, (_, i) => {
            const lit = prog(f, q + 6 + i * 1.4, 8);
            return <div key={i} style={{width: 36, height: 34, borderRadius: 8, background: lit > 0.5 ? colors.accent : alpha(colors.text, 0.12), boxShadow: lit > 0.5 ? `0 0 14px ${alpha(colors.accent, 0.55)}` : 'none', opacity: prog(f, q - 4, 10)}} />;
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
