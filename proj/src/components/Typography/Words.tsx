import React from 'react';
import {spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, FONT, SPRING} from '../../theme';

type Props = {
  text: string;
  size: number;
  delay?: number;
  stagger?: number;
  weight?: number;
  color?: string;
  marks?: Record<string, string>;
  font?: string;
  align?: 'left' | 'center' | 'right';
  lineHeight?: number;
  maxWidth?: number;
  cfg?: typeof SPRING.type;
  style?: React.CSSProperties;
  outline?: boolean;
};

// Word-by-word masked reveal. Never splits Bengali words into letters.
export const Words: React.FC<Props> = ({text, size, delay = 0, stagger = 5, weight = 700, color = C.text, marks, font = FONT.bn, align = 'left', lineHeight = 1.3, maxWidth, cfg = SPRING.type, style, outline}) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  const words = text.split(' ');
  const jc = align === 'center' ? 'center' : align === 'right' ? 'flex-end' : 'flex-start';
  return (
    <div style={{display: 'flex', flexWrap: maxWidth ? 'wrap' : 'nowrap', whiteSpace: 'nowrap', justifyContent: jc, columnGap: size * 0.26, maxWidth, fontFamily: font, fontSize: size, fontWeight: weight, lineHeight, letterSpacing: 0, color, ...style}}>
      {words.map((w, i) => {
        const s = spring({frame: f - delay - i * stagger, fps, config: cfg});
        return (
          <span key={i} style={{display: 'inline-block', overflow: 'hidden', padding: '0.22em 0.08em 0.32em', margin: '-0.22em -0.08em -0.32em'}}>
            <span style={{display: 'inline-block', transform: `translateY(${(1 - s) * 112}%)`, opacity: Math.min(1, s * 1.8), color: outline ? 'transparent' : marks?.[w] ?? color, WebkitTextStroke: outline ? `3px ${marks?.[w] ?? color}` : undefined}}>{w}</span>
          </span>
        );
      })}
    </div>
  );
};
