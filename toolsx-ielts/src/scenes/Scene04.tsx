import React from 'react';
import {AbsoluteFill, interpolateColors} from 'remotion';
import {alpha, colors, ease, fonts, springs, textDim, lineColor} from '../theme';
import {mix, prog, sine, sp, useSceneClock, win} from '../utils/animations';
import {cue} from '../utils/timing';
import {Words, Label} from '../components/Typography/Words';
import {WaveBars} from '../components/Effects/Wave';
import {IconCheck, IconCross, IconSpeaker, Pill} from '../components/UI/Kit';
import {Ripples} from '../components/Effects/Pulse';

const BARS = 64;
const WAVE_W = 1400;

/** P1 — the analyzer scans the voice and flags one phoneme. */
const Scan: React.FC<{f: number; T: (s: number) => number; vis: number}> = ({f, T, vis}) => {
  const p = prog(f, T(11.2), 34, ease.inOut);
  const idx = Math.floor(p * BARS);
  const hot: Record<number, string> = {};
  for (let i = 0; i < idx; i++) hot[i] = i >= 40 && i <= 45 ? colors.alert : colors.accent;
  const flag = sp(f, Math.round(T(12.2)), springs.pop);
  const chips = ['æ', 'p', 'ə', 'l'];
  return (
    <AbsoluteFill style={{opacity: vis}}>
      <div style={{position: 'absolute', left: 0, right: 0, top: 150}}>
        <Words text="উচ্চারণ ভুল ধরবে" start={Math.round(T(11.1))} size={104} weight={700} stagger={7} marks={{1: {color: colors.alert, at: Math.round(T(11.9))}}} />
      </div>
      <div style={{position: 'absolute', left: 260, top: 400}}>
        <WaveBars width={WAVE_W} height={300} bars={BARS} color={colors.primary} hot={hot} speed={0.2} />
        <div style={{position: 'absolute', left: p * WAVE_W - 2, top: -30, width: 4, height: 360, background: colors.text, opacity: p > 0 && p < 1 ? 0.9 : 0,
          boxShadow: `0 0 26px ${alpha(colors.accent, 0.9)}`}} />
        <div style={{position: 'absolute', left: (43 / BARS) * WAVE_W - 44, top: -92, width: 88, height: 88, borderRadius: '50%', background: alpha(colors.alert, 0.18),
          border: `2px solid ${colors.alert}`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${flag})`, opacity: Math.min(1, flag * 2)}}>
          <IconCross size={52} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 800, display: 'flex', justifyContent: 'center', gap: 28}}>
        {chips.map((c, i) => {
          const a = sp(f, Math.round(T(11.5)) + i * 4, springs.ui);
          const bad = i === 2 && f > T(12.2);
          return (
            <div key={i} style={{width: 120, height: 120, borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fonts.latin, fontSize: 64, fontWeight: 700,
              color: bad ? colors.alert : colors.text, background: bad ? alpha(colors.alert, 0.14) : alpha(colors.panelHi, 0.8), border: `1.5px solid ${bad ? colors.alert : lineColor}`,
              transform: `translateY(${(1 - a) * 40}px) scale(${0.8 + 0.2 * a})`, opacity: Math.min(1, a * 2)}}>{c}</div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** P2+P3 — "Apple", 80% wrong, then the correct form. */
const Apple: React.FC<{f: number; T: (s: number) => number; vis: number}> = ({f, T, vis}) => {
  const fix = prog(f, T(16.974), 20, ease.inOut);
  const fill = prog(f, T(14.9), 30, ease.inOut);
  const arc = mix(0.8 * fill, 1, fix);
  const R = 150, C = 2 * Math.PI * R;
  const ringColor = interpolateColors(fix, [0, 1], [colors.alert, colors.accent]);
  const wordColor = interpolateColors(Math.max(fill * 0.9, fix), [0, 0.9, 1], [colors.text, colors.alert, colors.accent]);
  const shift = prog(f, T(14.6), 24, ease.inOut);
  const check = sp(f, Math.round(T(17.1)), springs.pop);
  const mixed = fix > 0.5 ? colors.accent : colors.alert;
  return (
    <AbsoluteFill style={{opacity: vis}}>
      <div style={{position: 'absolute', left: mix(300, 140, shift), top: 280, width: 900, textAlign: 'left'}}>
        <Words text="Apple" start={Math.round(T(13.5))} size={290} weight={800} latin align="left" color={wordColor} />
        <div style={{display: 'flex', alignItems: 'center', gap: 26, marginLeft: 8, opacity: prog(f, T(13.9), 14)}}>
          <div style={{fontFamily: fonts.latin, fontSize: 64, color: fix > 0.5 ? colors.accent : textDim}}>/ˈæp.əl/</div>
          <div style={{position: 'relative', width: 64, height: 64, opacity: fix}}>
            <Ripples size={64} color={colors.accent} start={Math.round(T(17.0))} />
            <IconSpeaker size={64} color={colors.accent} />
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 1180, top: 190, width: 420, height: 420, opacity: prog(f, T(14.5), 14), transform: `scale(${0.85 + 0.15 * sp(f, Math.round(T(14.5)), springs.big)})`}}>
        <svg width={420} height={420} viewBox="-210 -210 420 420" style={{transform: 'rotate(-90deg)'}}>
          <circle r={R} fill="none" stroke={alpha(colors.text, 0.1)} strokeWidth={26} />
          <circle r={R} fill="none" stroke={ringColor} strokeWidth={26} strokeLinecap="round" strokeDasharray={`${C * arc} ${C}`} />
        </svg>
        <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', opacity: 1 - fix}}>
          <div style={{fontFamily: fonts.latin, fontSize: 118, fontWeight: 800, color: mixed}}>{Math.round(80 * fill)}%</div>
          <div style={{fontFamily: fonts.main, fontSize: 52, fontWeight: 600, color: colors.alert, marginTop: -6}}>ভুল</div>
        </div>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${check})`, opacity: fix}}>
          <IconCheck size={170} stroke={2.2} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 780}}>
        <Words text="৮০ শতাংশ ভুল" start={Math.round(T(15.2))} size={84} weight={700} stagger={7} exitAt={T(16.85)} marks={{2: {color: colors.alert}}} colors={{2: colors.alert}} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 780}}>
        <Words text="সঠিকটা শিখিয়ে দেবে" start={0} times={[T(16.974), T(17.35), T(17.72)]} size={84} weight={700} marks={{0: {color: colors.accent}}} colors={{0: colors.accent}} />
      </div>
    </AbsoluteFill>
  );
};

/** P4 — best for IELTS. */
const Best: React.FC<{f: number; T: (s: number) => number}> = ({f, T}) => {
  const a = prog(f, T(18.81) - 8, 18);
  const spin = f * 0.35;
  const star = sp(f, Math.round(T(19.5)), springs.pop);
  return (
    <AbsoluteFill style={{opacity: a}}>
      <svg width={1920} height={1080} viewBox="-960 -540 1920 1080" style={{position: 'absolute', inset: 0}}>
        <g transform={`rotate(${spin})`}>
          <circle r={400} fill="none" stroke={alpha(colors.accent, 0.35)} strokeWidth={3} strokeDasharray="4 18" strokeLinecap="round" />
        </g>
        <g transform={`rotate(${-spin * 0.6})`}>
          <circle r={460} fill="none" stroke={alpha(colors.accent, 0.14)} strokeWidth={2} strokeDasharray="60 30" />
        </g>
      </svg>
      <div style={{position: 'absolute', left: 0, right: 0, top: 270, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Words text="IELTS-এর" start={Math.round(T(18.81)) - 4} size={250} weight={800} latin colors={{0: colors.text}} />
        <Words text="জন্য বেস্ট" start={0} times={[T(19.3), T(19.62)]} size={128} weight={700} marks={{1: {color: colors.accent, at: Math.round(T(19.7))}}} colors={{1: colors.accent}} />
      </div>
      <svg width={120} height={120} viewBox="-60 -60 120 120" style={{position: 'absolute', left: 1330, top: 600, transform: `scale(${star}) rotate(${star * 45}deg)`}}>
        <path d="M0 -56 Q4 -4 56 0 Q4 4 0 56 Q-4 4 -56 0 Q-4 -4 0 -56Z" fill={colors.accent} />
      </svg>
    </AbsoluteFill>
  );
};

export const Scene04: React.FC = () => {
  const {f, T} = useSceneClock('s04');
  const p1 = win(f, T(11.035) - 6, T(13.0), 10, 10);
  const p2 = win(f, T(13.041) - 8, T(18.78), 12, 12);
  return (
    <AbsoluteFill>
      <Scan f={f} T={T} vis={p1} />
      <Apple f={f} T={T} vis={p2} />
      <Best f={f} T={T} />
    </AbsoluteFill>
  );
};
