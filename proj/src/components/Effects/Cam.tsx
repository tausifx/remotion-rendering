import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {EASE} from '../../theme';
import {ease} from '../../utils/animations';

export const Cam: React.FC<{from?: number; to?: number; start?: number; end: number; ox?: string; oy?: string; children: React.ReactNode}> = ({from = 1, to = 1.05, start = 0, end, ox = '50%', oy = '50%', children}) => {
  const f = useCurrentFrame();
  const s = ease(f, [start, end], [from, to], EASE.inOut);
  return <AbsoluteFill style={{transform: `scale(${s})`, transformOrigin: `${ox} ${oy}`}}>{children}</AbsoluteFill>;
};
