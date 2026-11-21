import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, ease, fonts, lineColor, textDim} from '../theme';
import {hash, prog, sine, sp, useSceneClock, win} from '../utils/animations';
import {cue} from '../utils/timing';
import {Words, Label} from '../components/Typography/Words';
import {WaveLine} from '../components/Effects/Wave';
import {Pill} from '../components/UI/Kit';

const Chair: React.FC<{f: number; T: (s: number) => number}> = ({f, T}) => {
  const flick = 0.25 + 0.4 * Math.abs(sine(f, 26)) * (0.6 + 0.4 * hash(Math.floor(f / 3)));
  const a = prog(f, T(2.3), 18);
  return (
    <svg width={420} height={520} viewBox="0 0 420 520" style={{opacity: a}}>
      <g stroke={textDim} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <rect x={90} y={50} width={240} height={190} rx={34} />
        <rect x={70} y={270} width={280} height={40} rx={18} />
        <path d="M110 310 L90 480 M310 310 L330 480 M210 310 V470" />
      </g>
      <g opacity={flick} stroke={colors.primary} strokeWidth={4} strokeDasharray="10 12" fill="none" strokeLinecap="round">
        <circle cx={210} cy={120} r={42} />
        <path d="M120 260 Q120 180 210 180 Q300 180 300 260" />
      </g>
      <text x={210} y={142} textAnchor="middle" fontSize={64} fontWeight={800} fill={colors.primary} opacity={flick + 0.2} fontFamily={fonts.latin}>?</text>
    </svg>
  );
};

export const Scene01: React.FC = () => {
  const {f, T} = useSceneClock('s01');
  const aOut = prog(f, T(1.78), 16, ease.in);
  const decay = 1 - prog(f, 6, 50, ease.soft);
  const bIn = prog(f, T(cue(2).s) - 10, 22);
  const trem = (n: number) => (hash(f * 3 + n) - 0.5) * 9 * decay;
  const lamp = prog(f, T(2.0) - 6, 30, ease.soft);
  return (
    <AbsoluteFill>
      {/* A — fear: nervous voice line + oversized type */}
      <AbsoluteFill style={{opacity: 1 - aOut, transform: `scale(${1 - aOut * 0.35}) translateY(${-aOut * 50}px)`}}>
        <div style={{position: 'absolute', left: 0, right: 0, top: 190, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Label size={26} color={colors.primary} style={{opacity: prog(f, 2, 14)}}>Voice test</Label>
          <Words text="IELTS Speaking" start={2} size={210} weight={800} stagger={6} latin gap={50} colors={{1: colors.primary}} />
          <div style={{transform: `translate(${trem(1)}px, ${trem(2)}px)`}}>
            <Words text="ভয় পাও?" start={Math.round(T(0.95))} size={128} weight={700} stagger={6} colors={{0: colors.alert}} />
          </div>
        </div>
        <div style={{position: 'absolute', left: 260, top: 790, opacity: prog(f, 6, 14)}}>
          <WaveLine width={1400} height={170} color={colors.alert} amp={0.5 + 0.6 * prog(f, 10, 40, ease.soft)} jitter={0.04 + 0.55 * prog(f, 8, 44, ease.soft)} speed={0.16} />
        </div>
      </AbsoluteFill>

      {/* B — 2:00 AM, empty chair, no partner */}
      <AbsoluteFill style={{opacity: bIn}}>
        <div style={{
          position: 'absolute', left: 1020, top: -40, width: 760, height: 1000, opacity: lamp,
          background: `linear-gradient(180deg, ${alpha(colors.primary, 0.2)}, transparent 85%)`,
          clipPath: 'polygon(40% 0, 60% 0, 100% 100%, 0 100%)',
        }} />
        <div style={{position: 'absolute', left: 150, top: 250, transform: `translateY(${(1 - bIn) * 40}px)`}}>
          <Words text="রাত ২টায়" start={Math.round(T(2.0))} size={104} weight={700} align="left" colors={{0: colors.text, 1: colors.accent}} />
          <div style={{display: 'flex', alignItems: 'flex-end', gap: 26, marginTop: 10}}>
            <Words text="2:00" start={Math.round(T(2.1))} size={330} weight={800} latin align="left" style={{lineHeight: 1.05}} />
            <div style={{paddingBottom: 56, opacity: prog(f, T(2.3), 14)}}>
              <Pill latin color={colors.accent} size={54}>AM</Pill>
            </div>
          </div>
          <div style={{height: 3, width: 620 * prog(f, T(2.2), 30), background: `linear-gradient(90deg, ${colors.accent}, transparent)`, marginTop: 8}} />
        </div>
        <div style={{position: 'absolute', left: 1130, top: 330}}>
          <Chair f={f} T={T} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 105, display: 'flex', justifyContent: 'center'}}>
          <div style={{transform: `scale(${0.9 + 0.1 * sp(f, Math.round(T(3.0)))})`}}>
            <Words text="পার্টনার নাই?" start={Math.round(T(3.0))} size={112} weight={700} stagger={7} colors={{1: colors.alert}} />
          </div>
        </div>
        <div style={{position: 'absolute', left: 130, right: 130, top: 905, height: 2, background: lineColor, opacity: 0}} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
