import React from 'react';
import {useCurrentFrame} from 'remotion';
import {alpha, colors, fonts} from '../../theme';
import {prog} from '../../utils/animations';
import {ease} from '../../theme';

type Mark = {color: string; at?: number};
type Props = {
  text: string;
  start: number;
  size: number;
  weight?: number;
  color?: string;
  colors?: Record<number, string>;
  marks?: Record<number, Mark>;
  /** explicit start frame per word (SRT sync) – overrides stagger */
  times?: number[];
  stagger?: number;
  gap?: number;
  align?: 'left' | 'center' | 'right';
  latin?: boolean;
  exitAt?: number;
  style?: React.CSSProperties;
};

/** Word-by-word masked reveal. Never splits Bengali into letters. */
export const Words: React.FC<Props> = ({
  text, start, size, weight = 600, color = colors.text, colors: wc = {}, marks = {},
  times, stagger = 4, gap, align = 'center', latin, exitAt, style,
}) => {
  const f = useCurrentFrame();
  const words = text.split(' ');
  const exit = exitAt === undefined ? 1 : 1 - prog(f, exitAt, 10, ease.soft);
  return (
    <div
      style={{
        display: 'flex', flexWrap: 'wrap', columnGap: gap ?? size * 0.28, rowGap: size * 0.05,
        justifyContent: align === 'center' ? 'center' : align === 'left' ? 'flex-start' : 'flex-end',
        fontFamily: latin ? fonts.latin : fonts.main, fontSize: size, fontWeight: weight,
        lineHeight: latin ? 1.08 : 1.32, letterSpacing: 0, color, opacity: exit, ...style,
      }}
    >
      {words.map((w, i) => {
        const t0 = times ? times[i] : start + i * stagger;
        const p = prog(f, t0, 18, ease.out);
        const m = marks[i];
        const mp = m ? prog(f, m.at ?? t0 + 8, 14, ease.inOut) : 0;
        return (
          <span key={i} style={{position: 'relative', display: 'inline-flex'}}>
            {m && (
              <span
                style={{
                  position: 'absolute', left: -size * 0.1, right: -size * 0.1, bottom: size * 0.2,
                  height: size * 0.42, borderRadius: size * 0.12, background: alpha(m.color, 0.3),
                  transformOrigin: 'left center', transform: `scaleX(${mp})`,
                }}
              />
            )}
            <span
              style={{
                position: 'relative', display: 'block', overflow: 'hidden',
                padding: '0.26em 0.08em 0.3em', margin: '-0.26em -0.08em -0.3em',
              }}
            >
              <span
                style={{
                  display: 'inline-block', color: wc[i] ?? color,
                  transform: `translateY(${(1 - p) * 110}%)`, opacity: Math.min(1, p * 3),
                  whiteSpace: 'nowrap',
                }}
              >
                {w}
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
};

/** Small Latin label with tracking (never used for Bengali). */
export const Label: React.FC<{
  children: React.ReactNode; size?: number; color?: string; style?: React.CSSProperties;
}> = ({children, size = 22, color = colors.text, style}) => (
  <div
    style={{
      fontFamily: fonts.latin, fontSize: size, fontWeight: 600, letterSpacing: '0.16em',
      textTransform: 'uppercase', color, ...style,
    }}
  >
    {children}
  </div>
);

/** Oversized outlined editorial numeral. */
export const GhostNumber: React.FC<{
  value: string; size: number; color: string; opacity?: number; style?: React.CSSProperties;
}> = ({value, size, color, opacity = 0.2, style}) => (
  <div
    style={{
      fontFamily: fonts.latin, fontSize: size, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em',
      color: 'transparent', WebkitTextStroke: `2px ${alpha(color, opacity)}`, ...style,
    }}
  >
    {value}
  </div>
);
