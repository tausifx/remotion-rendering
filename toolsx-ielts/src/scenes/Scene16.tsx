import React from 'react';
import {AbsoluteFill} from 'remotion';
import {alpha, colors, ease, fonts, springs} from '../theme';
import {prog, sp, useSceneClock} from '../utils/animations';
import {Words} from '../components/Typography/Words';
import {IconCheck, IconPlus, Pill} from '../components/UI/Kit';
import {Ripples} from '../components/Effects/Pulse';

export const Scene16: React.FC = () => {
  const {f, T} = useSceneClock('s16');
  const btn = sp(f, Math.round(T(57.75)), springs.big);
  const tap = T(58.3);
  const followed = f > tap + 4;
  const sq = f > tap && f < tap + 8 ? 0.93 : 1;
  const sweep = prog(f, T(58.35), 26, ease.inOut);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, right: 0, top: 250, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Words text="Tools X" start={0} times={[T(57.137), T(57.3)]} size={280} weight={800} latin gap={0} colors={{1: colors.accent}} />
        <Words text="Bangla" start={0} times={[T(57.45)]} size={150} weight={700} latin colors={{0: colors.primary}} style={{marginTop: -6}} />
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, top: 800, display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'relative', transform: `scale(${(0.6 + 0.4 * btn) * sq})`, opacity: Math.min(1, btn * 3)}}>
          {f > tap && <div style={{position: 'absolute', left: 0, top: 0}}><Ripples size={10} color={colors.accent} start={Math.round(tap)} count={1} period={26} /></div>}
          <Pill latin solid={followed} color={followed ? colors.accent : colors.primary} size={58}>
            {followed ? <IconCheck size={56} color={colors.bgDeep} /> : <IconPlus size={56} color={colors.primary} />}
            {followed ? 'Following' : 'Follow'}
          </Pill>
        </div>
      </div>
      <div style={{position: 'absolute', top: -100, bottom: -100, width: 380, left: `${-25 + sweep * 150}%`, transform: 'skewX(-18deg)', opacity: sweep > 0 && sweep < 1 ? 0.8 : 0,
        background: `linear-gradient(90deg, transparent, ${alpha(colors.white, 0.16)}, transparent)`, pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};
