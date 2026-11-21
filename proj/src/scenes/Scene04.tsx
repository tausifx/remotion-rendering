import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, EASE, FONT, LOGOS, MINI, PB, R, SPRING} from '../theme';
import {ease, hexA, useSpr} from '../utils/animations';
import {Studio} from '../components/Backgrounds/Studio';
import {Particles} from '../components/Effects/Particles';
import {Words} from '../components/Typography/Words';
import {Center} from '../components/UI/Center';
import {LogoTile} from '../components/UI/LogoTile';
import {IconArrowUp, IconCursor, IconPlay} from '../components/UI/Icons';
import {Bars} from '../components/Infographics/Bars';

const LANE_L = 260, LANE_W = 1400, LANE_H = 150, TOPS = [330, 506, 682];
const CONTENT_L = 250, CONTENT_W = 1120;

const Lane: React.FC<{label: string; top: number; at: number; children: React.ReactNode}> = ({label, top, at, children}) => {
  const p = useSpr(at, SPRING.ui);
  return (
    <div style={{position: 'absolute', left: LANE_L, top, width: LANE_W, height: LANE_H, borderRadius: R.md, background: hexA(C.bg2, 0.92), border: `1px solid ${C.line}`, transform: `translateX(${(1 - p) * -80}px)`, opacity: Math.min(1, p * 2)}}>
      <div style={{position: 'absolute', left: 30, top: 0, bottom: 0, width: 200, display: 'flex', alignItems: 'center', fontFamily: FONT.bn, fontWeight: 600, fontSize: 38, color: C.text}}>{label}</div>
      <div style={{position: 'absolute', left: CONTENT_L, top: 0, width: CONTENT_W, bottom: 0, display: 'flex', alignItems: 'center'}}>{children}</div>
    </div>
  );
};

export const Scene04: React.FC = () => {
  const f = useCurrentFrame();
  const btn = f > 102 ? ease(f, [102, 108], [0.9, 1], EASE.out) : 1;
  const ripple = ease(f, [102, 124], [0, 1]);
  const compress = ease(f, [112, 138], [0, 1], EASE.inOut);
  const merge = ease(f, [218, 240], [0, 1], EASE.inOut);
  const vid = useSpr(226, SPRING.big);
  const shift = ease(f, [270, 298], [0, 1], EASE.inOut);
  const playhead = ease(f, [134, 232], [0, 1], EASE.inOut);
  const progress = ease(f, [246, 330], [0, 100], EASE.inOut);
  const cx = ease(f, [250, 262], [0, 1]) * (1 - ease(f, [286, 326], [0, 1], EASE.in));
  const cursorX = 900 + ease(f, [286, 326], [0, 1], EASE.in) * 1250;
  const cursorY = 640 + ease(f, [286, 326], [0, 1], EASE.in) * 700;
  const ampV = ease(f, [200, 214], [0, 1]);
  const scriptW = [92, 78, 96, 60, 84];
  return (
    <AbsoluteFill>
      <Studio glow={C.secondary} glow2={C.primary} flip />
      <Particles count={20} seed="s4" color={C.secondary} />
      {/* mini header (match-cut anchor) */}
      <Center x={MINI.x} y={MINI.y}><LogoTile src={LOGOS.invideo} size={MINI.size} white={false} glow="0 10px 30px rgba(255,200,61,0.3)" /></Center>
      <div style={{position: 'absolute', left: MINI.x + 70, top: MINI.y - 40}}><Words text="InVideo AI" size={44} delay={4} font={FONT.display} /></div>

      {/* prompt box */}
      <div style={{position: 'absolute', left: 960 - PB.w / 2, top: PB.cy - PB.h / 2, width: PB.w, height: PB.h, transformOrigin: '50% 0%', transform: `translateY(${-130 * compress}px) scale(${1 - 0.38 * compress})`}}>
        <div style={{width: '100%', height: '100%', borderRadius: 28, background: C.bg2, border: `2px solid ${hexA(C.secondary, 0.5)}`, boxShadow: `0 0 50px ${hexA(C.secondary, 0.14)}`, position: 'relative', padding: '34px 150px 34px 48px', display: 'flex', alignItems: 'center'}}>
          {f < 14 && <div style={{width: 3, height: 56, background: C.text, opacity: Math.floor(f / 8) % 2 ? 0.1 : 1, position: 'absolute', left: 48}} />}
          <Words text="আজকের ব্রেকিং নিউজ নিয়ে ৩০ সেকেন্ডের ভিডিও বানাও।" size={56} delay={10} stagger={11} weight={600} lineHeight={1.45} maxWidth={1100} marks={{'ব্রেকিং': C.primary, 'নিউজ': C.primary, '৩০': C.secondary, 'সেকেন্ডের': C.secondary}} />
          <div style={{position: 'absolute', right: 30, bottom: 30, width: 86, height: 86}}>
            <div style={{position: 'absolute', inset: -ripple * 30, borderRadius: '50%', border: `3px solid ${C.primary}`, opacity: f > 102 ? 1 - ripple : 0}} />
            <div style={{width: '100%', height: '100%', borderRadius: '50%', background: C.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${btn})`, boxShadow: '0 0 30px rgba(255,45,61,0.4)'}}><IconArrowUp size={46} color={C.accent} sw={2.6} /></div>
          </div>
        </div>
      </div>

      {/* timeline lanes */}
      <div style={{position: 'absolute', inset: 0, transform: `scale(${1 - 0.55 * merge})`, opacity: 1 - merge, transformOrigin: '50% 58%'}}>
        <Lane label="স্ক্রিপ্ট" top={TOPS[0]} at={106}>
          <div style={{display: 'flex', flexDirection: 'column', gap: 14, width: '100%'}}>
            {scriptW.map((w, i) => (
              <div key={i} style={{height: 12, borderRadius: 6, background: i === 0 ? C.primary : hexA(C.text, 0.35), width: `${w * ease(f, [118 + i * 5, 140 + i * 5], [0, 1])}%`}} />
            ))}
          </div>
        </Lane>
        <Lane label="ভিডিও ক্লিপ" top={TOPS[1]} at={164}>
          <div style={{display: 'flex', gap: 14}}>
            {Array.from({length: 7}).map((_, i) => {
              const p = ease(f, [172 + i * 4, 186 + i * 4], [0, 1], EASE.back);
              return (
                <div key={i} style={{width: 144, height: 104, borderRadius: R.sm, transform: `scale(${p})`, background: `linear-gradient(135deg, ${C.bg3}, ${hexA(i % 2 ? C.primary : C.secondary, 0.4)})`, border: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <IconPlay size={38} color={C.text} />
                </div>
              );
            })}
          </div>
        </Lane>
        <Lane label="ভয়েসওভার" top={TOPS[2]} at={190}>
          <div style={{clipPath: `inset(0 ${100 - 100 * ease(f, [198, 232], [0, 1])}% 0 0)`}}>
            <Bars n={60} w={8} h={110} gap={10} color={C.primary} amp={ampV} />
          </div>
        </Lane>
        {playhead > 0 && playhead < 1 && (
          <div style={{position: 'absolute', left: LANE_L + 250 + playhead * 1120, top: 300, height: 560, width: 4, background: C.accent, boxShadow: `0 0 24px ${C.primary}`, borderRadius: 2}} />
        )}
      </div>

      {/* finished news video */}
      {f >= 224 && (
        <Center x={960 - 320 * shift} y={650}>
          <div style={{width: 1000, height: 562, flex: 'none', transform: `scale(${(0.4 + 0.6 * vid) * (1 - 0.2 * shift)})`, opacity: Math.min(1, vid * 2), borderRadius: R.lg, overflow: 'hidden', background: `linear-gradient(135deg, ${C.bg3}, ${C.bg})`, border: `2px solid ${C.line}`, boxShadow: `0 30px 90px rgba(0,0,0,0.6), 0 0 70px ${hexA(C.primary, 0.25)}`, position: 'relative'}}>
            <div style={{position: 'absolute', left: 30, top: 28, background: C.primary, color: C.accent, fontFamily: FONT.display, fontWeight: 700, fontSize: 30, padding: '6px 20px', borderRadius: 8}}>BREAKING NEWS</div>
            <div style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center', opacity: 1 - ease(f, [244, 256], [0, 1])}}><IconPlay size={150} color={C.text} /></div>
            <div style={{position: 'absolute', left: 60, right: 60, top: 170, opacity: ease(f, [248, 262], [0, 1])}}>
              <Bars n={46} w={10} h={150} gap={12} color={C.secondary} amp={1} />
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 52, height: 76, background: hexA(C.black, 0.7), display: 'flex', alignItems: 'center'}}>
              <div style={{width: 200, height: '100%', background: C.primary}} />
              <div style={{marginLeft: 28, width: 460, height: 14, borderRadius: 7, background: hexA(C.text, 0.55)}} />
            </div>
            <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 10, background: hexA(C.text, 0.15)}}><div style={{width: `${progress}%`, height: '100%', background: C.primary}} /></div>
          </div>
        </Center>
      )}
      <div style={{position: 'absolute', left: 1090, top: 340, opacity: shift}}>
        <Words text="তোমাকে" size={58} delay={274} color={C.muted} />
        <Words text="কিছু করতে হবে না" size={112} delay={280} stagger={8} color={C.secondary} maxWidth={720} lineHeight={1.25} />
      </div>
      {cx > 0 && (
        <div style={{position: 'absolute', left: cursorX, top: cursorY, opacity: cx, transform: `scale(${1.1 + 0.2 * ease(f, [286, 326], [0, 1])})`}}><IconCursor size={70} /></div>
      )}
    </AbsoluteFill>
  );
};
