import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, EASE, FONT, R, SPRING, W} from '../theme';
import {ease, hexA, toBn, useSpr} from '../utils/animations';
import {Studio} from '../components/Backgrounds/Studio';
import {Particles} from '../components/Effects/Particles';
import {Words} from '../components/Typography/Words';
import {Center} from '../components/UI/Center';
import {Cam} from '../components/Effects/Cam';

export const Ticker: React.FC<{y: number; text: string; tag?: string}> = ({y, text, tag = 'BREAKING NEWS'}) => {
  const f = useCurrentFrame();
  const unit = `${text}   •   `;
  return (
    <div style={{position: 'absolute', left: 0, right: 0, top: y, height: 96, background: hexA(C.bg2, 0.95), borderTop: `2px solid ${C.primary}`, overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, padding: '0 44px', background: C.primary, color: C.accent, display: 'flex', alignItems: 'center', fontFamily: FONT.display, fontWeight: 700, fontSize: 38, zIndex: 2}}>{tag}</div>
      <div style={{position: 'absolute', left: 420 - ((f * 5) % 900), top: 0, bottom: 0, display: 'flex', alignItems: 'center', whiteSpace: 'nowrap', fontFamily: FONT.bn, fontWeight: 600, fontSize: 44, color: C.text}}>
        {unit.repeat(6)}
      </div>
      <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 400, zIndex: 1, background: `linear-gradient(90deg, ${C.primary} 70%, transparent)`, opacity: 0}} />
    </div>
  );
};

export const Scene02: React.FC = () => {
  const f = useCurrentFrame();
  const pill = useSpr(2, SPRING.ui);
  const v = ease(f, [4, 52], [0, 300], EASE.out);
  const ring = ease(f, [4, 52], [0, 1], EASE.out);
  const mon = useSpr(36, SPRING.ui);
  const q = ease(f, [62, 78], [0, 1], EASE.inOut);
  const c = 2 * Math.PI * 330;
  return (
    <AbsoluteFill>
      <Studio glow={C.primary} />
      <Particles count={22} seed="s2" color={C.secondary} />
      <Cam from={1} to={1.04} end={60}>
        <div style={{opacity: 1 - 0.85 * q, filter: `blur(${q * 6}px)`, transform: `scale(${1 - q * 0.3}) translateY(${-q * 90}px)`}}>
          <Center x={960} y={460}>
            <svg width={720} height={720} viewBox="0 0 720 720" style={{position: 'absolute'}}>
              <circle cx="360" cy="360" r="330" stroke={hexA(C.text, 0.1)} strokeWidth={14} fill="none" />
              <circle cx="360" cy="360" r="330" stroke={C.primary} strokeWidth={14} fill="none" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - ring)} transform="rotate(-90 360 360)" />
            </svg>
            <div style={{display: 'flex', alignItems: 'baseline', fontFamily: FONT.display, fontWeight: 700, fontSize: 250, color: C.text, lineHeight: 1.2, minWidth: 560, justifyContent: 'center'}}>
              <span style={{color: C.secondary, fontSize: 190, marginRight: 8}}>$</span>
              <span>{toBn(Math.round(v))}</span>
            </div>
          </Center>
          <Center x={960} y={130}>
            <div style={{transform: `scale(${pill})`, background: C.bg3, border: `1px solid ${C.line}`, borderRadius: 999, padding: '10px 36px', fontFamily: FONT.bn, fontWeight: 600, fontSize: 52, color: C.text}}>ফেসবুক</div>
          </Center>
          <Center x={960} y={770}>
            <div style={{transform: `translateY(${(1 - mon) * 40}px)`, opacity: mon, background: C.secondary, color: C.black, borderRadius: R.md, padding: '4px 40px', fontFamily: FONT.bn, fontWeight: 700, fontSize: 60}}>মাসে</div>
          </Center>
        </div>
        {f >= 62 && (
          <Center x={W / 2} y={470}>
            <Words text="কীভাবে?" size={300} delay={64} cfg={SPRING.big} align="center" color={C.text} marks={{'কীভাবে?': C.text}} />
          </Center>
        )}
        <Ticker y={930} text="ফেসবুক থেকেই মাসে ৩০০ ডলার" />
      </Cam>
    </AbsoluteFill>
  );
};
