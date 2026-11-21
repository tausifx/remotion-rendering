import React from 'react';
import {C} from '../../theme';
import {clamp} from '../../utils/animations';

export const Prohibit: React.FC<{size: number; p: number; color?: string}> = ({size, p, color = C.primary}) => (
  <svg width={size} height={size} viewBox="0 0 200 200" fill="none" style={{opacity: clamp(p * 4)}}>
    <circle cx="100" cy="100" r="86" stroke={color} strokeWidth={12} strokeDasharray={540} strokeDashoffset={540 * (1 - clamp(p * 1.6))} strokeLinecap="round" transform="rotate(-90 100 100)" />
    <line x1="40" y1="40" x2="160" y2="160" stroke={color} strokeWidth={12} strokeDasharray={170} strokeDashoffset={170 * (1 - clamp((p - 0.45) * 2))} strokeLinecap="round" />
  </svg>
);
