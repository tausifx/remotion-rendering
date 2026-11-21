import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, EASE, FONT, R, SPRING} from '../theme';
import {ease, hexA, useSpr} from '../utils/animations';
import {Studio} from '../components/Backgrounds/Studio';
import {Particles} from '../components/Effects/Particles';
import {Cam} from '../components/Effects/Cam';
import {Words} from '../components/Typography/Words';
import {Center} from '../components/UI/Center';
import {Brackets} from '../components/UI/Brackets';
import {IconFace, IconMic, IconPlay} from '../components/UI/Icons';
import {Bars} from '../components/Infographics/Bars';
import {Prohibit} from '../components/Infographics/Prohibit';

const FrameBox: React.FC<{children: React.ReactNode; p: number; rec?: boolean}> = ({children, p, rec}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'relative', width: 480, height: 580, borderRadius: R.md, background: hexA(C.bg2, 0.8), opacity: Math.min(1, p * 2), transform: `scale(${0.85 + 0.15 * p})`}}>
      <div style={{position: 'absolute', inset: 14}}><Brackets w={452} h={552} color={C.text} progress={p} /></div>
      {rec && (
        <div style={{position: 'absolute', left: 44, top: 40, display: 'flex', alignItems: 'center', gap: 10, fontFamily: FONT.display, fontWeight: 700, fontSize: 24, color: C.text}}>
          <div style={{width: 16, height: 16, borderRadius: 8, background: C.primary, opacity: Math.floor(f / 12) % 2 ? 0.25 : 1}} /> REC
        </div>
      )}
      {children}
    </div>
  );
};

const Card: React.FC<{p: number; x: number; y: number; rot: number}> = ({p, x, y, rot}) => (
  <div style={{position: 'absolute', left: x - (1 - p) * 260, top: y, width: 540, height: 304, borderRadius: R.md, opacity: Math.min(1, p * 2), background: `linear-gradient(135deg, ${C.bg3}, ${C.bg2})`, border: `1px solid ${C.line}`, transform: `rotateY(${rot}deg) rotateX(4deg)`, boxShadow: '0 30px 70px rgba(0,0,0,0.55)', overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 22, top: 20, background: C.primary, color: C.accent, fontFamily: FONT.display, fontWeight: 700, fontSize: 22, padding: '4px 14px', borderRadius: 6}}>BREAKING</div>
    <div style={{position: 'absolute', left: 0, right: 0, top: 80, display: 'flex', justifyContent: 'center'}}><IconPlay size={110} color={C.text} /></div>
    <div style={{position: 'absolute', left: 22, right: 22, bottom: 22, height: 8, borderRadius: 4, background: hexA(C.text, 0.15)}}><div style={{width: `${40 + p * 20}%`, height: '100%', borderRadius: 4, background: C.primary}} /></div>
  </div>
);

export const Scene01: React.FC = () => {
  const f = useCurrentFrame();
  const left = useSpr(2, SPRING.big);
  const right = useSpr(26, SPRING.big);
  const ex = ease(f, [68, 88], [0, 1], EASE.inOut);
  const faceP = ease(f, [6, 26], [0, 1], EASE.out);
  const micP = ease(f, [38, 58], [0, 1], EASE.out);
  const amp = ease(f, [30, 40], [0, 1]) * (1 - ease(f, [44, 56], [0, 1])) + 0.001;
  const c1 = useSpr(76, SPRING.big);
  const c2 = useSpr(88, SPRING.big);
  return (
    <AbsoluteFill>
      <Studio />
      <Particles count={26} seed="s1" />
      <Cam to={1.06} end={134}>
        {ex < 1 && (
          <>
            <Center x={500 - ex * 700} y={470}>
              <div style={{opacity: 1 - ex}}>
                <FrameBox p={left} rec>
                  <div style={{position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 20, opacity: 1 - 0.6 * faceP}}><IconFace size={300} color={C.bg3} /></div>
                  <div style={{position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Prohibit size={380} p={faceP} /></div>
                  <div style={{position: 'absolute', left: 0, right: 0, top: 620}}>
                    <Words text="মুখ না" size={104} delay={8} align="center" color={C.text} marks={{'না': C.primary}} />
                  </div>
                </FrameBox>
              </div>
            </Center>
            <Center x={1420 + ex * 700} y={470}>
              <div style={{opacity: 1 - ex}}>
                <FrameBox p={right}>
                  <div style={{position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24, paddingTop: 10}}>
                    <IconMic size={210} color={C.text} />
                    <Bars n={22} w={9} h={110} gap={9} color={C.secondary} amp={amp} />
                  </div>
                  <div style={{position: 'absolute', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Prohibit size={380} p={micP} /></div>
                  <div style={{position: 'absolute', left: 0, right: 0, top: 620}}>
                    <Words text="ভয়েস না" size={104} delay={34} align="center" color={C.text} marks={{'না': C.primary}} />
                  </div>
                </FrameBox>
              </div>
            </Center>
          </>
        )}
        {f > 70 && (
          <>
            <div style={{position: 'absolute', left: 150, top: 220, width: 800, height: 640, perspective: 1800}}>
              <Card p={c1} x={0} y={30} rot={-14} />
              <Card p={c2} x={90} y={290} rot={-14} />
            </div>
            <div style={{position: 'absolute', left: 1040, top: 250}}>
              <Words text="প্রতিদিন" size={72} delay={76} color={C.muted} />
              <Words text="২টা" size={300} delay={88} color={C.secondary} lineHeight={1.15} style={{marginTop: -6}} />
              <Words text="নিউজ ভিডিও" size={112} delay={100} stagger={7} color={C.text} maxWidth={780} />
            </div>
          </>
        )}
      </Cam>
    </AbsoluteFill>
  );
};
