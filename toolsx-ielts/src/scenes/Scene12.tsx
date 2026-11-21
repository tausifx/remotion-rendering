import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, ease, fonts, springs} from '../theme';
import {hash, prog, sp, useSceneClock} from '../utils/animations';
import {Words} from '../components/Typography/Words';

const N = 24, R = 300, CX0 = 960, CY0 = 470;

export const Scene12: React.FC = () => {
  const {f, T} = useSceneClock('s12');
  const open = sp(f, Math.round(T(40.556)) - 4, springs.big);
  const turn = prog(f, T(41.6), 38, ease.inOut);
  const aOut = prog(f, T(41.4), 12);
  return (
    <AbsoluteFill>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: N}, (_, i) => {
          const a = (i / N) * Math.PI * 2 - Math.PI / 2;
          const x = CX0 + Math.cos(a) * R * (0.7 + 0.3 * open), y = CY0 + Math.sin(a) * R * (0.7 + 0.3 * open);
          const close = prog(f, T(40.62) + i * 0.7, 10);
          const morph = prog(f, T(41.45) + i * 0.4, 12);
          const lit = prog(f, T(41.62) + i * 1.5, 6);
          const deg = (a * 180) / Math.PI + 90;
          const look = Math.sin(f * 0.1 + i) * 3;
          return (
            <g key={i} transform={`translate(${x} ${y})`} opacity={Math.min(1, open * 2)}>
              <g opacity={1 - morph} transform={`scale(${1 - close * 0.15})`}>
                <ellipse rx={30} ry={24 * (1 - close * 0.9)} fill={alpha(colors.panelHi, 0.9)} stroke={alpha(colors.text, 0.5)} strokeWidth={2.5} />
                <circle cx={-Math.cos(a) * 8 + look} cy={-Math.sin(a) * 6} r={9 * (1 - close)} fill={colors.text} />
              </g>
              <g transform={`rotate(${deg})`} opacity={morph}>
                <rect x={-5} y={-22} width={10} height={44} rx={5} fill={lit > 0.5 ? colors.accent : alpha(colors.text, 0.18)}
                  style={{filter: lit > 0.5 ? `drop-shadow(0 0 10px ${alpha(colors.accent, 0.8)})` : 'none'}} />
              </g>
            </g>
          );
        })}
        <g opacity={turn > 0 && turn < 1 ? 1 : 0} transform={`rotate(${turn * 360} ${CX0} ${CY0})`}>
          <line x1={CX0} y1={CY0} x2={CX0} y2={CY0 - R + 40} stroke={colors.accent} strokeWidth={4} strokeLinecap="round" />
          <circle cx={CX0} cy={CY0} r={10} fill={colors.accent} />
        </g>
      </svg>
      {/* A — no shame */}
      <div style={{position: 'absolute', left: CX0 - 260, top: CY0 - 100, width: 520, opacity: 1 - aOut, transform: `scale(${1 - aOut * 0.2})`}}>
        <div style={{position: 'relative'}}>
          <Words text="লজ্জা" start={0} times={[T(40.58)]} size={150} weight={700} colors={{0: colors.text}} />
          <div style={{position: 'absolute', left: 90, right: 90, top: 98, height: 8, borderRadius: 4, background: colors.alert, transformOrigin: 'left', transform: `scaleX(${prog(f, T(40.78), 10)})`}} />
        </div>
        <Words text="নাই" start={0} times={[T(40.95)]} size={150} weight={800} colors={{0: colors.accent}} style={{marginTop: -10}} />
      </div>
      {/* B — 24H */}
      <div style={{position: 'absolute', left: CX0 - 260, top: CY0 - 120, width: 520, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Words text="24H" start={0} times={[T(41.55)]} size={180} weight={800} latin colors={{0: colors.accent}} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 880}}>
        <Words text="প্র্যাকটিস" start={0} times={[T(42.15)]} size={96} weight={700} />
      </div>
    </AbsoluteFill>
  );
};
