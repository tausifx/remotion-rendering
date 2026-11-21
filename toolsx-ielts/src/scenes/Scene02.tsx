import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, CX, ease, fonts, springs, textDim, toolColor, Tool} from '../theme';
import {prog, sine, sp, useSceneClock} from '../utils/animations';
import {Words} from '../components/Typography/Words';
import {Logo, toolName} from '../components/UI/Logo';
import {Pill} from '../components/UI/Kit';

const ORBS: {tool: Tool; x: number; t: number}[] = [
  {tool: 'elsa', x: 470, t: 4.62},
  {tool: 'gpt', x: CX, t: 4.84},
  {tool: 'annie', x: 1450, t: 5.06},
];
const OY = 500;

export const Scene02: React.FC = () => {
  const {f, T} = useSceneClock('s02');
  const tAt = T(5.85);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, top: 120}}>
        <Words text="এই তিনটা AI" start={0} size={112} weight={700} times={[T(4.494), T(4.95), T(5.35)]} colors={{2: colors.primary}} marks={{2: {color: colors.primary}}} />
      </div>
      {/* light trails connecting the three */}
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {[0, 1].map((i) => {
          const a = ORBS[i].x + 160, b = ORBS[i + 1].x - 160;
          const p = prog(f, T(ORBS[i + 1].t) + 4, 22, ease.inOut);
          return (
            <g key={i}>
              <path d={`M${a} ${OY} Q${(a + b) / 2} ${OY - 90} ${b} ${OY}`} stroke={alpha(colors.text, 0.12)} strokeWidth={2} fill="none" />
              <path d={`M${a} ${OY} Q${(a + b) / 2} ${OY - 90} ${b} ${OY}`} stroke={colors.primary} strokeWidth={3} fill="none" pathLength={1}
                strokeDasharray={`${p * 0.9} 1`} strokeDashoffset={-0.0} strokeLinecap="round" opacity={0.9} />
            </g>
          );
        })}
      </svg>
      {ORBS.map((o, i) => {
        const s = sp(f, Math.round(T(o.t)), springs.big);
        const fromX = CX + (o.x - CX) * 0.0;
        const x = fromX + (o.x - fromX) * s;
        const float = sine(f, 90, i * 1.7) * 10;
        return (
          <div key={o.tool} style={{position: 'absolute', left: x - 160, top: OY - 160 + float, width: 320, height: 320, transform: `scale(${0.15 + 0.85 * s})`, opacity: Math.min(1, s * 2.5)}}>
            <Logo tool={o.tool} size={320} glowK={1.2} />
            <div style={{position: 'absolute', left: -40, right: -40, top: 350, textAlign: 'center', fontFamily: fonts.latin, fontSize: 42, fontWeight: 600, color: i === 1 ? colors.text : textDim, opacity: prog(f, Math.round(T(o.t)) + 10, 12)}}>
              {toolName[o.tool]}{o.tool === 'gpt' ? ' Voice' : ''}
            </div>
          </div>
        );
      })}
      {/* 24H free */}
      <div style={{position: 'absolute', left: 0, right: 0, top: 850, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 44}}>
        <div style={{opacity: prog(f, tAt - 4, 12), transform: `translateY(${(1 - prog(f, tAt - 4, 16)) * 24}px)`, fontFamily: fonts.latin, fontSize: 92, fontWeight: 800, color: colors.accent}}>24H</div>
        <div style={{display: 'flex', gap: 9, alignItems: 'center'}}>
          {Array.from({length: 24}, (_, i) => {
            const lit = prog(f, tAt + i * 1.1, 6);
            return <div key={i} style={{width: 8, height: 44, borderRadius: 4, background: lit > 0.5 ? colors.accent : alpha(colors.text, 0.14), boxShadow: lit > 0.5 ? `0 0 14px ${alpha(colors.accent, 0.6)}` : 'none', transform: `scaleY(${0.7 + 0.3 * lit})`}} />;
          })}
        </div>
        <div style={{opacity: prog(f, T(6.3) - 4, 10), transform: `scale(${0.7 + 0.3 * sp(f, Math.round(T(6.3) - 4), springs.pop)})`}}>
          <Pill color={colors.accent} solid size={52}>ফ্রি</Pill>
        </div>
      </div>
    </AbsoluteFill>
  );
};
