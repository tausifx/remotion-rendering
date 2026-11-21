import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {C, EASE, FONT, LOGOS, R, SPRING} from '../theme';
import {ease, hexA, useSpr} from '../utils/animations';
import {Studio} from '../components/Backgrounds/Studio';
import {Particles} from '../components/Effects/Particles';
import {Words} from '../components/Typography/Words';
import {Center} from '../components/UI/Center';
import {LogoTile} from '../components/UI/LogoTile';
import {RadialWave} from '../components/Infographics/RadialWave';
import {Bars} from '../components/Infographics/Bars';

const Pill: React.FC<{label: string; active: boolean; pop: number; font?: string}> = ({label, active, pop, font}) => (
  <div style={{transform: `scale(${1 + 0.06 * pop})`, padding: '10px 44px', borderRadius: 999, fontFamily: font ?? FONT.bn, fontWeight: 700, fontSize: 56, background: active ? C.primary : 'transparent', color: active ? C.accent : C.muted, border: `2px solid ${active ? C.primary : C.line}`, boxShadow: active ? `0 0 40px ${hexA(C.primary, 0.35)}` : 'none'}}>{label}</div>
);

export const Scene05: React.FC = () => {
  const f = useCurrentFrame();
  const tile = useSpr(28, SPRING.big);
  const ringIn = ease(f, [38, 62], [0, 1]);
  const amp = interpolate(f, [0, 40, 60, 71, 80, 146, 156, 159, 168, 242, 250, 254, 262, 305, 322], [0.1, 0.2, 0.3, 0.5, 1, 1, 0.4, 0.6, 1, 1, 0.4, 0.6, 1, 1, 0.3], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const shift = ease(f, [62, 88], [0, 1], EASE.inOut) - ease(f, [246, 272], [0, 1], EASE.inOut);
  const ringScale = 1 - 0.2 * shift + 0.08 * ease(f, [246, 272], [0, 1], EASE.inOut);
  const pa = useSpr(66, SPRING.ui);
  const paOut = ease(f, [146, 160], [0, 1], EASE.inOut);
  const pb = useSpr(158, SPRING.ui);
  const pbOut = ease(f, [244, 258], [0, 1], EASE.inOut);
  const lang = f < 198 ? 0 : 1;
  const voiceIdx = f >= 164 ? Math.floor((f - 164) / 20) % 5 : -1;
  const scanX = interpolate(f, [262, 300], [540, 1380], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const aiOp = f < 256 ? 0 : f < 276 ? 1 : f < 288 ? (f % 3 === 0 ? 0.2 : 1) : 0;
  const aiPop = useSpr(256, SPRING.ui);
  const pulse = 0.5 + 0.5 * Math.sin(f / 5);
  const ripple = (d: number) => {
    const p = ease(f, [d, d + 36], [0, 1]);
    return <div style={{position: 'absolute', width: 240 + p * 480, height: 240 + p * 480, borderRadius: '50%', border: `3px solid ${C.primary}`, opacity: (1 - p) * 0.6}} />;
  };
  return (
    <AbsoluteFill>
      <Studio glow={C.primary} />
      <Particles count={24} seed="s5" />
      <div style={{position: 'absolute', left: 1180 - f * 0.4, top: 80, fontFamily: FONT.display, fontWeight: 700, fontSize: 760, lineHeight: 1.1, color: 'transparent', WebkitTextStroke: `3px ${hexA(C.text, 0.09)}`, opacity: 1 - ease(f, [60, 90], [0, 1])}}>০২</div>
      <div style={{position: 'absolute', left: 140, top: 100, opacity: 1 - ease(f, [40, 56], [0, 1])}}><Words text="দ্বিতীয়টা" size={92} delay={2} color={C.secondary} /></div>

      <Center x={960 - 380 * shift} y={500}>
        <div style={{transform: `scale(${ringScale})`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div style={{position: 'absolute', opacity: ringIn}}>
            <RadialWave r={178} len={120} w={9} amp={amp * ringIn} />
          </div>
          {ripple(30)}{ripple(42)}
          <div style={{transform: `scale(${0.5 + 0.5 * tile})`, opacity: Math.min(1, tile * 2.5)}}><LogoTile src={LOGOS.elevenlabs} size={240} glow="0 20px 70px rgba(255,45,61,0.3)" /></div>
        </div>
      </Center>

      {f > 64 && f < 162 && (
        <Center x={1330} y={500} style={{opacity: 1 - paOut}}>
          <div style={{width: 760, transform: `translateX(${(1 - pa) * 160}px)`, opacity: Math.min(1, pa * 2), display: 'flex', flexDirection: 'column', gap: 26, flex: 'none'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, background: C.primary, alignSelf: 'flex-start', borderRadius: 10, padding: '6px 26px', fontFamily: FONT.display, fontWeight: 700, fontSize: 40, color: C.accent}}>
              <div style={{width: 16, height: 16, borderRadius: 8, background: C.accent, opacity: 0.5 + 0.5 * pulse}} /> ON AIR
            </div>
            <Words text="নিউজ প্রেজেন্টার" size={92} delay={72} stagger={8} />
            <Bars n={34} w={10} h={100} gap={12} color={C.secondary} amp={amp} />
          </div>
        </Center>
      )}

      {f > 156 && f < 260 && (
        <Center x={1330} y={500} style={{opacity: 1 - pbOut}}>
          <div style={{width: 780, transform: `translateX(${(1 - pb) * 160}px)`, opacity: Math.min(1, pb * 2), display: 'flex', flexDirection: 'column', gap: 40, flex: 'none'}}>
            <div style={{display: 'flex', gap: 24}}>
              <Pill label="বাংলা" active={lang === 0} pop={lang === 0 ? ease(f, [160, 168], [0, 1]) : 0} />
              <Pill label="English" active={lang === 1} pop={lang === 1 ? ease(f, [198, 206], [0, 1]) : 0} font={FONT.display} />
            </div>
            <Words text="যেকোনো ভয়েস" size={84} delay={162} stagger={8} />
            <div style={{display: 'flex', gap: 28}}>
              {Array.from({length: 5}).map((_, i) => (
                <div key={i} style={{width: 112, height: 112, borderRadius: '50%', background: C.bg3, border: `3px solid ${voiceIdx === i ? C.secondary : C.line}`, boxShadow: voiceIdx === i ? `0 0 34px ${hexA(C.secondary, 0.4)}` : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${voiceIdx === i ? 1.12 : 1})`}}>
                  <Bars n={5} w={7} h={50} gap={5} color={voiceIdx === i ? C.secondary : C.muted} seed={i * 2.1} amp={1} />
                </div>
              ))}
            </div>
          </div>
        </Center>
      )}

      {f > 254 && (
        <>
          <Center x={1250} y={290}>
            <div style={{opacity: aiOp, transform: `scale(${aiPop})`, background: C.bg3, border: `3px solid ${C.primary}`, color: C.primary, fontFamily: FONT.display, fontWeight: 700, fontSize: 52, padding: '4px 34px', borderRadius: R.sm}}>AI</div>
          </Center>
          {f >= 262 && f <= 302 && (
            <div style={{position: 'absolute', left: scanX, top: 230, height: 540, width: 4, background: C.accent, boxShadow: `0 0 30px ${C.secondary}`}} />
          )}
          <Center x={960} y={900}>
            <Words text="কেউ বুঝতেই পারবে না" size={92} delay={258} stagger={7} align="center" marks={{'বুঝতেই': C.secondary, 'পারবে': C.secondary, 'না': C.secondary}} />
          </Center>
        </>
      )}
    </AbsoluteFill>
  );
};
