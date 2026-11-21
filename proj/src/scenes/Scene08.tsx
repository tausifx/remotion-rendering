import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, EASE, FONT, R, SPRING} from '../theme';
import {ease, hexA, useSpr} from '../utils/animations';
import {Studio} from '../components/Backgrounds/Studio';
import {Particles} from '../components/Effects/Particles';
import {Words} from '../components/Typography/Words';
import {Center} from '../components/UI/Center';
import {IconFace, IconLink, IconPlay, IconPlus, IconSend} from '../components/UI/Icons';
import {Prohibit} from '../components/Infographics/Prohibit';

const Bubble: React.FC<{p: number; w: number; children: React.ReactNode; accent?: string}> = ({p, w, children, accent = C.bg3}) => (
  <div style={{width: w, borderRadius: 28, background: accent, border: `1px solid ${C.line}`, padding: '22px 36px', transform: `translateY(${(1 - p) * 50}px) scale(${0.92 + 0.08 * p})`, opacity: Math.min(1, p * 2), boxShadow: '0 20px 50px rgba(0,0,0,0.4)'}}>{children}</div>
);

export const Scene08: React.FC = () => {
  const f = useCurrentFrame();
  const card = useSpr(6, SPRING.big);
  const shift = ease(f, [88, 112], [0, 1], EASE.inOut);
  const cardOut = ease(f, [222, 240], [0, 1], EASE.inOut);
  const ring = ease(f, [20, 44], [0, 1]);
  const chip = useSpr(56, SPRING.ui);
  const cmt = useSpr(92, SPRING.ui);
  const rep = useSpr(150, SPRING.ui);
  const plane = ease(f, [186, 214], [0, 1], EASE.inOut);
  const end = useSpr(236, SPRING.big);
  const fol = ease(f, [262, 270], [0, 1]);
  const folPress = f > 262 ? 1 - 0.08 * Math.sin(Math.PI * Math.min(1, (f - 262) / 8)) : 1;
  const pulse = ease(f, [262, 292], [0, 1]);
  return (
    <AbsoluteFill>
      <Studio glow={C.primary} glow2={C.secondary} />
      <Particles count={28} seed="s8" color={C.secondary} opacity={0.6} />
      {/* faceless page card */}
      <div style={{opacity: 1 - cardOut}}>
        <Center x={960 - 420 * shift} y={540}>
          <div style={{width: 920, height: 620, flex: 'none', borderRadius: R.lg, overflow: 'hidden', background: C.bg2, border: `1px solid ${C.line}`, boxShadow: '0 30px 90px rgba(0,0,0,0.55)', transform: `scale(${(0.88 + 0.12 * card) * (1 - 0.14 * shift)})`, opacity: Math.min(1, card * 2), position: 'relative'}}>
            <div style={{height: 230, background: `linear-gradient(120deg, ${C.primary}, ${hexA(C.primary, 0.3)} 60%, ${C.bg3})`, position: 'relative'}}>
              <div style={{position: 'absolute', left: 40, top: 34, background: C.secondary, color: C.black, fontFamily: FONT.display, fontWeight: 700, fontSize: 28, padding: '4px 18px', borderRadius: 6}}>BREAKING NEWS</div>
            </div>
            <div style={{position: 'absolute', left: 50, top: 150, width: 170, height: 170, borderRadius: '50%', background: C.bg3, border: `6px solid ${C.bg2}`, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <div style={{opacity: 0.35, marginTop: 24}}><IconFace size={130} color={C.muted} /></div>
              <div style={{position: 'absolute'}}><Prohibit size={150} p={ring} /></div>
            </div>
            <div style={{position: 'absolute', left: 250, top: 262}}><Words text="ফেসলেস পেইজ" size={78} delay={16} stagger={8} /></div>
            <div style={{position: 'absolute', left: 50, top: 400, right: 50, display: 'flex', flexDirection: 'column', gap: 20}}>
              {[88, 64].map((w, i) => <div key={i} style={{height: 16, borderRadius: 8, background: hexA(C.text, 0.18), width: `${w * ease(f, [30 + i * 6, 52 + i * 6], [0, 1])}%`}} />)}
            </div>
            <div style={{position: 'absolute', left: 50, bottom: 44, transform: `scale(${chip})`, transformOrigin: 'left center', display: 'flex', alignItems: 'center', gap: 16, border: `3px solid ${C.secondary}`, color: C.secondary, borderRadius: 999, padding: '4px 36px', fontFamily: FONT.bn, fontWeight: 700, fontSize: 52}}>আজকেই শুরু করো</div>
          </div>
        </Center>
      </div>

      {/* comment -> reply */}
      {f > 88 && f < 244 && (
        <div style={{position: 'absolute', left: 1020, top: 290, display: 'flex', flexDirection: 'column', gap: 30, opacity: 1 - cardOut}}>
          <div style={{fontFamily: FONT.bn, fontWeight: 600, fontSize: 52, color: C.secondary}}>কমেন্টে</div>
          <Bubble p={cmt} w={640}>
            <Words text="নিউজ" size={64} delay={100} stagger={10} color={C.text} />
          </Bubble>
          {f > 146 && (
            <Bubble p={rep} w={760} accent={hexA(C.primary, 0.2)}>
              <div style={{display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap'}}>
                <IconPlay size={64} color={C.secondary} />
                <Words text="ফুল টিউটোরিয়াল" size={54} delay={154} stagger={8} />
                <IconLink size={56} color={C.secondary} sw={2.2} />
                <Words text="লিংক" size={54} delay={176} color={C.secondary} />
              </div>
            </Bubble>
          )}
        </div>
      )}
      {plane > 0 && plane < 1 && (
        <div style={{position: 'absolute', left: 1050 + plane * 520, top: 560 - Math.sin(plane * Math.PI) * 120, opacity: Math.sin(plane * Math.PI), transform: `rotate(${plane * 10}deg)`}}><IconSend size={80} color={C.secondary} sw={1.8} /></div>
      )}

      {/* end card */}
      {f >= 232 && (
        <Center x={960} y={470}>
          <div style={{transform: `scale(${0.85 + 0.15 * end})`, opacity: Math.min(1, end * 2), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, flex: 'none'}}>
            <Words text="টুলসএক্স বাংলা" size={190} delay={238} stagger={10} align="center" cfg={SPRING.big} lineHeight={1.25} />
            <div style={{height: 10, width: 560 * ease(f, [250, 272], [0, 1]), background: C.primary, borderRadius: 5, boxShadow: `0 0 30px ${hexA(C.primary, 0.5)}`}} />
            <div style={{marginTop: 40, position: 'relative'}}>
              <div style={{position: 'absolute', inset: -pulse * 40, borderRadius: 999, border: `3px solid ${C.primary}`, opacity: f > 262 ? 1 - pulse : 0}} />
              <div style={{transform: `scale(${folPress})`, opacity: fol, display: 'flex', alignItems: 'center', gap: 18, background: C.primary, color: C.accent, borderRadius: 999, padding: '4px 64px 4px 48px', fontFamily: FONT.bn, fontWeight: 700, fontSize: 72, boxShadow: `0 0 60px ${hexA(C.primary, 0.4)}`}}>
                <IconPlus size={56} color={C.accent} sw={2.6} /> ফলো
              </div>
            </div>
          </div>
        </Center>
      )}
    </AbsoluteFill>
  );
};
