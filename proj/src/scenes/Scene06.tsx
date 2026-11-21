import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame} from 'remotion';
import {C, EASE, FONT, LOGOS, MINI, R, SPRING} from '../theme';
import {ease, hexA, useSpr} from '../utils/animations';
import {Studio} from '../components/Backgrounds/Studio';
import {Particles} from '../components/Effects/Particles';
import {Words} from '../components/Typography/Words';
import {Center} from '../components/UI/Center';
import {LogoTile} from '../components/UI/LogoTile';
import {IconFace} from '../components/UI/Icons';

const CW = 1040, CH = 585, COLS = 26, ROWS = 15;
const PAL = [C.bg3, C.primary, C.secondary, C.accent, C.bg2, C.primary];

const Thumb: React.FC<{gloss: number}> = ({gloss}) => (
  <div style={{position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${C.bg3}, ${C.bg})`, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: -120, top: -40, width: 700, height: 700, background: C.primary, transform: 'skewX(-18deg)', opacity: 0.9}} />
    <div style={{position: 'absolute', right: 40, bottom: 40, opacity: 0.9}}><IconFace size={380} color={C.bg3} style={{filter: `drop-shadow(0 0 24px ${hexA(C.secondary, 0.5)})`}} /></div>
    <div style={{position: 'absolute', left: 36, top: 30, background: C.secondary, color: C.black, fontFamily: FONT.display, fontWeight: 700, fontSize: 30, padding: '4px 18px', borderRadius: 6}}>BREAKING NEWS</div>
    <div style={{position: 'absolute', left: 36, top: 120, fontFamily: FONT.bn, fontWeight: 700, fontSize: 150, lineHeight: 1.3, color: C.accent, textShadow: '0 6px 24px rgba(0,0,0,0.4)'}}>ব্রেকিং<br />নিউজ</div>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 70, background: hexA(C.black, 0.8), display: 'flex', alignItems: 'center'}}>
      <div style={{width: 170, height: '100%', background: C.primary}} />
      <div style={{marginLeft: 26, width: 420, height: 14, borderRadius: 7, background: hexA(C.text, 0.6)}} />
    </div>
    <div style={{position: 'absolute', top: -50, bottom: -50, left: `${gloss}%`, width: 160, transform: 'skewX(-18deg)', background: `linear-gradient(90deg, transparent, ${hexA(C.accent, 0.55)}, transparent)`}} />
  </div>
);

export const Scene06: React.FC = () => {
  const f = useCurrentFrame();
  const tile = useSpr(36, SPRING.big);
  const m = ease(f, [66, 92], [0, 1], EASE.inOut);
  const size = interpolate(m, [0, 1], [260, MINI.size]);
  const tx = interpolate(m, [0, 1], [960, MINI.x]);
  const ty = interpolate(m, [0, 1], [430, MINI.y]);
  const fade = 1 - Math.min(1, m * 2);
  const canvas = useSpr(78, SPRING.ui);
  const chip = useSpr(136, SPRING.ui);
  const click = ease(f, [198, 206], [0, 1]);
  const gloss = interpolate(f, [260, 292], [-30, 130], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const done = ease(f, [258, 280], [0, 1]);
  const showThumb = f >= 200;
  const qFade = 1 - ease(f, [126, 140], [0, 1]);
  const cells = React.useMemo(() => Array.from({length: COLS * ROWS}).map((_, i) => {
    const cx = i % COLS, cy = Math.floor(i / COLS);
    const order = 0.65 * random(`c${i}`) + 0.35 * ((cx / COLS + cy / ROWS) / 2);
    return {cx, cy, order, color: PAL[Math.floor(random(`k${i}`) * PAL.length)]};
  }), []);
  const orbit = (i: number) => {
    const a = (f * 0.012) + (i / 5) * Math.PI * 2;
    return {x: 960 + Math.cos(a) * 230, y: 430 + Math.sin(a) * 230};
  };
  return (
    <AbsoluteFill>
      <Studio glow={C.secondary} glow2={C.primary} />
      <Particles count={22} seed="s6" color={C.secondary} />
      <div style={{position: 'absolute', left: 1180 - f * 0.4, top: 80, fontFamily: FONT.display, fontWeight: 700, fontSize: 760, lineHeight: 1.1, color: 'transparent', WebkitTextStroke: `3px ${hexA(C.text, 0.09)}`, opacity: fade}}>০৩</div>
      <Center x={960} y={150}><div style={{opacity: fade}}><Words text="তিন নম্বর" size={80} delay={4} color={C.secondary} align="center" /></div></Center>
      {fade > 0 && (
        <svg width={1920} height={1080} style={{position: 'absolute', inset: 0, opacity: fade * tile}}>
          <circle cx={960} cy={430} r={230} stroke={hexA(C.text, 0.18)} strokeWidth={2} strokeDasharray="6 10" fill="none" />
          {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={orbit(i).x} cy={orbit(i).y} r={8} fill={C.secondary} />)}
        </svg>
      )}
      <Center x={tx} y={ty}>
        <div style={{transform: `scale(${0.5 + 0.5 * tile})`, opacity: Math.min(1, tile * 2.5)}}><LogoTile src={LOGOS.leonardo} size={size} glow="0 20px 70px rgba(255,200,61,0.25)" /></div>
      </Center>
      <Center x={960} y={650}><div style={{opacity: fade}}><Words text="Leonardo AI" size={78} delay={44} font={FONT.display} align="center" /></div></Center>
      <div style={{position: 'absolute', left: MINI.x + 70, top: MINI.y - 40, opacity: m}}><Words text="Leonardo AI" size={44} delay={70} font={FONT.display} /></div>

      {f > 76 && (
        <Center x={960} y={600}>
          <div style={{width: CW, height: CH, flex: 'none', position: 'relative', transform: `scale(${(0.9 + 0.1 * canvas) * (1 + 0.03 * done)})`, opacity: Math.min(1, canvas * 2), borderRadius: R.md, border: showThumb ? 'none' : `3px dashed ${hexA(C.text, 0.3)}`, background: showThumb ? C.bg : hexA(C.bg2, 0.6), boxShadow: done > 0 ? `0 30px 90px rgba(0,0,0,0.6), 0 0 ${60 * done}px ${hexA(C.secondary, 0.35)}` : 'none', overflow: 'hidden'}}>
            {!showThumb && <Center x={CW / 2} y={CH / 2}><div style={{opacity: qFade}}><Words text="থাম্বনেইল?" size={130} delay={82} color={C.muted} align="center" /></div></Center>}
            {showThumb && <Thumb gloss={gloss} />}
            {f >= 196 && f < 280 && cells.map((c, i) => {
              const appear = ease(f, [196, 204], [0, 1]);
              const reveal = ease(f, [212 + c.order * 46, 226 + c.order * 46], [0, 1]);
              const o = appear * (1 - reveal) * 0.92;
              if (o <= 0.01) return null;
              return <div key={i} style={{position: 'absolute', left: (c.cx * CW) / COLS, top: (c.cy * CH) / ROWS, width: CW / COLS + 1, height: CH / ROWS + 1, background: c.color, opacity: o}} />;
            })}
          </div>
        </Center>
      )}

      {f > 132 && (
        <Center x={960} y={235}>
          <div style={{width: 940, height: 96, flex: 'none', borderRadius: 24, background: C.bg2, border: `2px solid ${hexA(C.secondary, 0.5 + 0.5 * (1 - click))}`, display: 'flex', alignItems: 'center', padding: '0 40px', transform: `translateY(${(1 - chip) * -40}px) scale(${1 - 0.03 * (f > 198 ? 1 - click : 0)})`, opacity: Math.min(1, chip * 2) * (1 - 0.0 * click)}}>
            <Words text="ব্রেকিং নিউজ থাম্বনেইল" size={54} delay={139} stagger={14} weight={600} marks={{'ব্রেকিং': C.primary, 'নিউজ': C.primary}} />
          </div>
        </Center>
      )}
      {f > 216 && (
        <Center x={960} y={975}><Words text="টিভি চ্যানেলের মতো" size={64} delay={218} stagger={8} align="center" marks={{'টিভি': C.secondary}} /></Center>
      )}
    </AbsoluteFill>
  );
};
