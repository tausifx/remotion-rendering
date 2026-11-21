import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C, EASE, FONT, LOGOS, R, SPRING} from '../theme';
import {ease, hexA, toBn, useSpr} from '../utils/animations';
import {Studio} from '../components/Backgrounds/Studio';
import {Particles} from '../components/Effects/Particles';
import {Words} from '../components/Typography/Words';
import {Center} from '../components/UI/Center';
import {LogoTile} from '../components/UI/LogoTile';
import {IconFilm, IconLock} from '../components/UI/Icons';

const XS = [560, 960, 1360];
const COLX = [360, 960, 1560];
const SRCS = [LOGOS.invideo, LOGOS.elevenlabs, LOGOS.leonardo];

const Col: React.FC<{i: number; at: number; value: number; vtxt: string; unit: string; period: string; children: React.ReactNode}> = ({i, at, vtxt, unit, period, children}) => {
  const p = useSpr(at, SPRING.ui);
  return (
    <div style={{position: 'absolute', left: COLX[i] - 250, top: 330, width: 500, height: 660, opacity: Math.min(1, p * 2), transform: `translateY(${(1 - p) * 80}px)`, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div style={{display: 'flex', alignItems: 'baseline', gap: 14}}>
        <span style={{fontFamily: FONT.display, fontWeight: 700, fontSize: 190, lineHeight: 1.25, color: C.secondary}}>{vtxt}</span>
        <span style={{fontFamily: FONT.bn, fontWeight: 700, fontSize: 62, color: C.text}}>{unit}</span>
      </div>
      <div style={{fontFamily: FONT.bn, fontWeight: 600, fontSize: 50, color: C.muted, marginTop: -6}}>{period}</div>
      <div style={{marginTop: 34, height: 290, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
    </div>
  );
};

export const Scene07: React.FC = () => {
  const f = useCurrentFrame();
  const unlock = ease(f, [76, 96], [0, 1], EASE.inOut);
  const toCol = ease(f, [116, 140], [0, 1], EASE.inOut);
  const phase1 = 1 - ease(f, [112, 126], [0, 1]);
  const tilesP = [useSpr(8, SPRING.big), useSpr(14, SPRING.big), useSpr(20, SPRING.big)];
  const stamp = useSpr(20, SPRING.ui);
  // data viz values
  const v1 = ease(f, [135, 160], [0, 1]);
  const v2 = ease(f, [222, 300], [0, 1], EASE.inOut);
  const v3 = ease(f, [325, 400], [0, 1], EASE.inOut);
  const segs = Math.round(v2 * 10);
  const imgs = Math.round(v3 * 150);
  return (
    <AbsoluteFill>
      <Studio glow={C.secondary} glow2={C.primary} flip />
      <Particles count={22} seed="s7" color={C.secondary} />
      {/* phase 1 */}
      <div style={{opacity: phase1}}>
        <Center x={960} y={140}><Words text="মনে রাখবে" size={70} delay={2} color={C.muted} align="center" /></Center>
        {XS.map((x, i) => (
          <Center key={i} x={x} y={430}>
            <div style={{transform: `scale(${0.4 + 0.6 * tilesP[i]})`, opacity: Math.min(1, tilesP[i] * 2), position: 'relative'}}>
              <div style={{opacity: 1 - 0.45 * (1 - unlock)}}><LogoTile src={SRCS[i]} size={240} white={i !== 0} /></div>
              <div style={{position: 'absolute', right: -26, bottom: -26, background: C.bg, borderRadius: '50%', padding: 14, border: `3px solid ${unlock > 0.5 ? C.secondary : C.primary}`}}>
                <IconLock size={64} color={unlock > 0.5 ? C.secondary : C.primary} open={unlock} />
              </div>
            </div>
          </Center>
        ))}
        {f < 86 && (
          <Center x={960} y={790}>
            <div style={{transform: `scale(${stamp}) rotate(-4deg)`, opacity: 1 - ease(f, [76, 86], [0, 1]), border: `8px solid ${C.primary}`, borderRadius: R.md, padding: '0 60px'}}>
              <Words text="পেইড" size={170} delay={22} color={C.primary} align="center" />
            </div>
          </Center>
        )}
        {f >= 78 && (
          <Center x={960} y={790}>
            <div style={{filter: `drop-shadow(0 0 30px ${hexA(C.secondary, 0.45)})`}}>
              <Words text="ফ্রি ট্রায়াল" size={160} delay={80} stagger={8} align="center" color={C.secondary} cfg={SPRING.big} />
            </div>
          </Center>
        )}
      </div>

      {/* tiles travelling to column headers */}
      {toCol > 0 && XS.map((x, i) => (
        <Center key={i} x={x + (COLX[i] - x) * toCol} y={430 + (210 - 430) * toCol}>
          <div style={{opacity: toCol}}><LogoTile src={SRCS[i]} size={240 - 110 * toCol} white={i !== 0} /></div>
        </Center>
      ))}
      <div style={{opacity: ease(f, [126, 140], [0, 1])}}>
        <Center x={960} y={70}><div style={{background: C.secondary, color: C.black, borderRadius: 999, padding: '0 44px', whiteSpace: 'nowrap', fontFamily: FONT.bn, fontWeight: 700, fontSize: 52, lineHeight: 1.5}}>ফ্রি ট্রায়াল</div></Center>
      </div>

      {/* column 1: InVideo — 1 video per day */}
      <Col i={0} at={132} value={1} vtxt="১" unit="ভিডিও" period="প্রতিদিন">
        <svg width={260} height={260} viewBox="0 0 260 260" fill="none">
          {Array.from({length: 24}).map((_, k) => {
            const a = (k / 24) * Math.PI * 2 - Math.PI / 2;
            const on = k === 0;
            return <line key={k} x1={130 + Math.cos(a) * 108} y1={130 + Math.sin(a) * 108} x2={130 + Math.cos(a) * 126} y2={130 + Math.sin(a) * 126} stroke={on ? C.secondary : hexA(C.text, 0.25)} strokeWidth={on ? 9 : 5} strokeLinecap="round" opacity={ease(f, [140 + k, 150 + k], [0, 1])} />;
          })}
          <g transform={`translate(66 66) scale(${v1 * 3.2})`}><IconFilm size={40} color={C.secondary} sw={1.6} /></g>
        </svg>
      </Col>
      {/* column 2: ElevenLabs — 10 minutes per month */}
      <Col i={1} at={216} value={10} vtxt={toBn(Math.max(0, segs))} unit="মিনিট" period="প্রতি মাসে">
        <svg width={260} height={260} viewBox="0 0 260 260" fill="none">
          {Array.from({length: 10}).map((_, k) => {
            const a0 = (k / 10) * Math.PI * 2 - Math.PI / 2 + 0.05, a1 = ((k + 1) / 10) * Math.PI * 2 - Math.PI / 2 - 0.05;
            const r = 112;
            const d = `M ${130 + Math.cos(a0) * r} ${130 + Math.sin(a0) * r} A ${r} ${r} 0 0 1 ${130 + Math.cos(a1) * r} ${130 + Math.sin(a1) * r}`;
            return <path key={k} d={d} stroke={k < segs ? C.secondary : hexA(C.text, 0.2)} strokeWidth={20} strokeLinecap="round" />;
          })}
          <circle cx={130} cy={130} r={10} fill={C.primary} />
          <line x1={130} y1={130} x2={130 + Math.cos(v2 * Math.PI * 2 - Math.PI / 2) * 90} y2={130 + Math.sin(v2 * Math.PI * 2 - Math.PI / 2) * 90} stroke={C.primary} strokeWidth={6} strokeLinecap="round" />
        </svg>
      </Col>
      {/* column 3: Leonardo — 150 images per day (15 x 10 grid) */}
      <Col i={2} at={318} value={150} vtxt={toBn(Math.max(0, imgs))} unit="ছবি" period="প্রতিদিন">
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(15, 24px)', gap: 7}}>
          {Array.from({length: 150}).map((_, k) => <div key={k} style={{width: 24, height: 24, borderRadius: 5, background: k < imgs ? (k % 2 ? C.secondary : C.primary) : hexA(C.text, 0.12)}} />)}
        </div>
      </Col>
    </AbsoluteFill>
  );
};
