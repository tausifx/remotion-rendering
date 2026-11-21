import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, ease, fonts, springs, textDim} from '../theme';
import {mix, prog, sine, sp, useSceneClock} from '../utils/animations';
import {Words} from '../components/Typography/Words';
import {Glass, IconMic, IconSpeaker} from '../components/UI/Kit';
import {WaveBars} from '../components/Effects/Wave';
import {Ripples} from '../components/Effects/Pulse';

const X = [400, 960, 1520];
const Y = 430;

const Dial: React.FC<{f: number; start: number}> = ({f, start}) => {
  const n = 11;
  return (
    <svg width={420} height={260} viewBox="-210 -210 420 260">
      {Array.from({length: n}, (_, i) => {
        const a = Math.PI + (i / (n - 1)) * Math.PI;
        const lit = prog(f, start + i * 3.2, 6);
        const r1 = 150, r2 = i % 5 === 0 ? 200 : 182;
        return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2}
          stroke={lit > 0.5 ? colors.accent : alpha(colors.text, 0.2)} strokeWidth={9} strokeLinecap="round"
          style={{filter: lit > 0.5 ? `drop-shadow(0 0 8px ${alpha(colors.accent, 0.8)})` : 'none'}} />;
      })}
      <path d="M-120 0 A120 120 0 0 1 120 0" fill="none" stroke={alpha(colors.accent, 0.5 * prog(f, start + 30, 16))} strokeWidth={4} />
    </svg>
  );
};

export const Scene07: React.FC = () => {
  const {f, T} = useSceneClock('s07');
  const t = [Math.round(T(26.565)) - 4, Math.round(T(27.966)) - 4, Math.round(T(29.08)) - 4];
  const pan = -50 * prog(f, 0, 130, ease.soft);
  const line1 = prog(f, T(27.2), 22, ease.inOut);
  const line2 = prog(f, T(28.5), 22, ease.inOut);
  const s = t.map((x) => sp(f, x, springs.big));
  const Node = (i: number, children: React.ReactNode) => (
    <div style={{position: 'absolute', left: X[i] - 150, top: Y - 150, width: 300, height: 300, transform: `scale(${0.4 + 0.6 * s[i]})`, opacity: Math.min(1, s[i] * 3)}}>{children}</div>
  );
  return (
    <AbsoluteFill style={{transform: `translateX(${pan}px)`}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <line x1={X[0] + 170} y1={Y} x2={X[1] - 170} y2={Y} stroke={alpha(colors.text, 0.12)} strokeWidth={3} strokeDasharray="2 14" strokeLinecap="round" />
        <line x1={X[1] + 170} y1={Y} x2={X[2] - 200} y2={Y} stroke={alpha(colors.text, 0.12)} strokeWidth={3} strokeDasharray="2 14" strokeLinecap="round" />
        <line x1={X[0] + 170} y1={Y} x2={X[0] + 170 + (X[1] - X[0] - 340) * line1} y2={Y} stroke={colors.primary} strokeWidth={5} strokeLinecap="round" />
        <line x1={X[1] + 170} y1={Y} x2={X[1] + 170 + (X[2] - X[1] - 370) * line2} y2={Y} stroke={colors.accent} strokeWidth={5} strokeLinecap="round" />
        {[line1, line2].map((p, i) => p > 0 && p < 1 ? <circle key={i} cx={(i === 0 ? X[0] + 170 + (X[1] - X[0] - 340) * p : X[1] + 170 + (X[2] - X[1] - 370) * p)} cy={Y} r={11} fill={colors.text} style={{filter: `drop-shadow(0 0 12px ${i ? colors.accent : colors.primary})`}} /> : null)}
      </svg>
      {Node(0, <Glass w={300} h={300} r={150} tint={colors.primary}>
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
          <IconSpeaker size={70} color={colors.primary} />
          <div style={{fontFamily: fonts.latin, fontSize: 130, fontWeight: 800, color: colors.text, lineHeight: 1}}>?</div>
        </div>
      </Glass>)}
      {Node(1, <>
        <Ripples size={300} color={colors.accent} start={t[1]} count={2} />
        <Glass w={300} h={300} r={150} tint={colors.accent}>
          <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}>
            <IconMic size={96} color={colors.accent} />
            <WaveBars width={170} height={50} bars={14} color={colors.accent} speed={0.3} seed={2} />
          </div>
        </Glass>
      </>)}
      {Node(2, <div style={{position: 'absolute', left: -60, top: 30}}><Dial f={f} start={t[2] + 8} /></div>)}
      {[
        {text: 'প্রশ্ন করবে', times: [T(26.565), T(26.95)], c: colors.primary},
        {text: 'উত্তর দেবে', times: [T(27.966), T(28.3)], c: colors.accent},
        {text: 'Band Score', times: [T(29.4), T(29.7)], c: colors.accent},
      ].map((l, i) => (
        <div key={i} style={{position: 'absolute', left: X[i] - 300, width: 600, top: Y + 210}}>
          <Words text={l.text} start={0} times={l.times} size={74} weight={700} latin={i === 2} colors={{0: l.c}} />
        </div>
      ))}
      <div style={{position: 'absolute', left: X[2] - 300, width: 600, top: Y + 330}}>
        <Words text="বলে দেবে" start={0} times={[T(29.95), T(30.2)]} size={54} weight={500} color={textDim} />
      </div>
    </AbsoluteFill>
  );
};
