import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {alpha, colors, ease, fonts, springs, textDim, toolColor} from '../theme';
import {prog, sine, sp, useSceneClock} from '../utils/animations';
import {Words, GhostNumber, Label} from '../components/Typography/Words';
import {IconPhone} from '../components/UI/Kit';
import {Ripples} from '../components/Effects/Pulse';

export const Scene09: React.FC = () => {
  const {f, T} = useSceneClock('s09');
  const ring = sp(f, Math.round(T(33.2)) - 4, springs.big);
  const buzz = f < T(34.0) ? Math.sin(f * 1.9) * 9 * Math.min(1, ring) : 0;
  const logo = prog(f, T(34.0), 20, ease.inOut);
  const lift = prog(f, T(34.0), 24, ease.inOut);
  return (
    <AbsoluteFill>
      <GhostNumber value="03" size={780} color={toolColor.annie} opacity={0.2} style={{position: 'absolute', left: 80, top: 130, opacity: prog(f, 4, 24)}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 150}}>
        <Words text="আর তিন নম্বর" start={0} times={[T(33.182), T(33.52), T(33.86)]} size={92} weight={700} colors={{1: colors.annie}} />
      </div>
      <div style={{position: 'absolute', left: 960 - 105, top: 340 - lift * 90, width: 210, height: 210, transform: `scale(${(0.3 + 0.7 * ring) * (1 - lift * 0.35)})`, opacity: Math.min(1, ring * 3)}}>
        <Ripples size={210} color={colors.annie} start={Math.round(T(33.2))} count={3} period={46} />
        <div style={{position: 'absolute', inset: 0, borderRadius: '50%', background: `linear-gradient(160deg, ${colors.annie}, ${colors.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${buzz}deg)`,
          boxShadow: `0 0 70px ${alpha(colors.annie, 0.5)}`}}>
          <IconPhone size={96} color={colors.white} stroke={2} />
        </div>
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center'}}>
        <Img src={staticFile('logos/call-annie.png')} style={{width: 1000, height: 'auto', clipPath: `inset(-80% ${(1 - logo) * 110 - 10}% -80% -10%)`, transform: `scale(${0.94 + 0.06 * logo})`, filter: `drop-shadow(0 0 40px ${alpha(colors.annie, 0.45)})`}} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontFamily: fonts.latin, fontSize: 30, letterSpacing: '0.2em', textTransform: 'uppercase', color: textDim, opacity: (1 - logo) * prog(f, 12, 12)}}>
        Incoming call…
      </div>
    </AbsoluteFill>
  );
};
