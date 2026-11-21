import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, ease, fonts, springs, textDim, lineColor} from '../theme';
import {prog, sp, useSceneClock, win} from '../utils/animations';
import {Words, Label} from '../components/Typography/Words';
import {Glass, IconLink, IconPlane, Pill} from '../components/UI/Kit';
import {Logo, toolName} from '../components/UI/Logo';
import {Tool} from '../theme';

export const Scene15: React.FC = () => {
  const {f, T} = useSceneClock('s15');
  const typeStart = T(54.2);
  const chars = Math.max(0, Math.min(5, Math.floor((f - typeStart) / 4)));
  const typed = 'IELTS'.slice(0, chars);
  const press = sp(f, Math.round(T(54.85)), springs.pop);
  const A = win(f, 0, T(55.2) + 6, 14, 12);
  const B = prog(f, T(55.308) - 8, 18);
  const plane = prog(f, T(54.98), 18, ease.inOut);
  const caret = Math.floor(f / 12) % 2 === 0;
  const rows: {tool: Tool; name: string}[] = [
    {tool: 'elsa', name: 'ELSA Speak'}, {tool: 'gpt', name: 'ChatGPT Voice'}, {tool: 'annie', name: 'Call Annie'},
  ];
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{opacity: A}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 210}}>
          <Words text="লিংক লাগলে কমেন্টে" start={0} times={[T(52.687), T(53.15), T(53.5)]} size={92} weight={700} marks={{2: {color: colors.primary, at: Math.round(T(53.6))}}} />
        </div>
        <div style={{position: 'absolute', left: 380, top: 470, transform: `translateY(${(1 - prog(f, T(52.9), 22)) * 60}px)`, opacity: prog(f, T(52.9), 14)}}>
          <Glass w={1160} h={130} r={65} tint={colors.primary}>
            <div style={{position: 'absolute', left: 30, top: 28, width: 74, height: 74, borderRadius: '50%', background: `linear-gradient(160deg, ${colors.primary}, ${colors.secondary})`}} />
            <div style={{position: 'absolute', left: 134, top: 0, height: 130, display: 'flex', alignItems: 'center', fontFamily: fonts.latin, fontSize: 64, fontWeight: 600}}>
              {typed || <span style={{color: alpha(colors.text, 0.3), fontSize: 46}}>Add a comment…</span>}
              {chars > 0 || f > T(54.0) ? <span style={{display: 'inline-block', width: 5, height: 64, marginLeft: 6, background: colors.primary, opacity: caret ? 1 : 0}} /> : null}
            </div>
            <div style={{position: 'absolute', right: 26, top: 26, width: 78, height: 78, borderRadius: '50%', background: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 - 0.12 * (press < 1 ? press : 2 - press) * (f > T(54.85) && f < T(54.85) + 10 ? 1 : 0)})`}}>
              <IconPlane size={42} color={colors.white} />
            </div>
          </Glass>
        </div>
        <div style={{position: 'absolute', left: 1560 + plane * 260, top: 520 - plane * 170, opacity: plane > 0 ? 1 - plane * 0.9 : 0, transform: `rotate(${plane * -20}deg)`}}><IconPlane size={90} color={colors.primary} /></div>
      </AbsoluteFill>
      <AbsoluteFill style={{opacity: B}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 110}}>
          <Words text="ফুল লিস্ট" start={0} times={[T(55.308), T(55.62)]} size={96} weight={700} colors={{1: colors.accent}} />
        </div>
        <div style={{position: 'absolute', left: 560, top: 290, transform: `translateY(${(1 - B) * 70}px) scale(${0.94 + 0.06 * B})`}}>
          <Glass w={800} h={640} tint={colors.accent}>
            <div style={{padding: '34px 44px'}}>
              <Label size={24} color={colors.accent}>Full List</Label>
              {rows.map((r, i) => {
                const a = prog(f, T(55.5) + i * 5, 14);
                return (
                  <div key={r.tool} style={{display: 'flex', alignItems: 'center', gap: 28, marginTop: 28, opacity: a, transform: `translateX(${(1 - a) * 40}px)`}}>
                    <Logo tool={r.tool} size={92} glowK={0.2} />
                    <div style={{fontFamily: fonts.latin, fontSize: 48, fontWeight: 600, flex: 1}}>{r.name}</div>
                    <IconLink size={46} color={colors.accent} />
                  </div>
                );
              })}
              {[0, 1].map((i) => (
                <div key={i} style={{display: 'flex', alignItems: 'center', gap: 28, marginTop: 28, opacity: 0.35 * prog(f, T(55.9) + i * 5, 12)}}>
                  <div style={{width: 92, height: 92, borderRadius: '50%', background: alpha(colors.text, 0.14)}} />
                  <div style={{height: 22, width: 300 - i * 80, borderRadius: 11, background: alpha(colors.text, 0.14)}} />
                </div>
              ))}
            </div>
          </Glass>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
