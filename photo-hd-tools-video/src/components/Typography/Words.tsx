import React from "react";
import { COLORS, FONT_FAMILY, SPRING } from "../../theme";
import { prog, sp } from "../../utils/animations";
import { EASE } from "../../theme";

type Props = {
  text: string;
  frame: number;
  start: number;
  stagger?: number;
  size: number;
  weight?: number;
  color?: string;
  align?: "left" | "center" | "right";
  /** word index → marker colour (highlight sweep behind the word) */
  marks?: Record<number, string>;
  /** word index → css override (colour, filter, …) */
  wordStyle?: (i: number) => React.CSSProperties;
  lineHeight?: number;
  style?: React.CSSProperties;
};

/**
 * Word-by-word mask reveal. Bengali is animated per WORD (never per letter) so
 * conjuncts and vowel signs stay intact. Letter spacing is always 0.
 */
export const Words: React.FC<Props> = ({
  text,
  frame,
  start,
  stagger = 4,
  size,
  weight = 600,
  color = COLORS.primary,
  align = "left",
  marks = {},
  wordStyle,
  lineHeight = 1.4,
  style,
}) => {
  const words = text.split(" ");
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
        fontFamily: FONT_FAMILY,
        fontSize: size,
        fontWeight: weight,
        color,
        lineHeight,
        letterSpacing: 0,
        columnGap: size * 0.26,
        ...style,
      }}
    >
      {words.map((w, i) => {
        const d = start + i * stagger;
        const s = sp(frame, d, SPRING.type);
        const mark = marks[i];
        const sweep = prog(frame, d + 8, 14, EASE.out);
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              // clip only the bottom edge (mask reveal); padding keeps matras/descenders intact
              clipPath: "inset(-60% -30% 0% -30%)",
              paddingBottom: size * 0.28,
              marginBottom: -size * 0.28,
              position: "relative",
            }}
          >
            {mark ? (
              <span
                style={{
                  position: "absolute",
                  left: -size * 0.08,
                  right: -size * 0.08,
                  bottom: size * 0.36,
                  height: size * 0.3,
                  background: mark,
                  opacity: 0.38,
                  borderRadius: size * 0.08,
                  transformOrigin: "left center",
                  transform: `scaleX(${sweep})`,
                }}
              />
            ) : null}
            <span
              style={{
                display: "inline-block",
                position: "relative",
                transform: `translateY(${(1 - s) * 105}%)`,
                opacity: Math.min(1, s * 2.2),
                whiteSpace: "nowrap",
                ...(wordStyle ? wordStyle(i) : {}),
              }}
            >
              {w}
            </span>
          </span>
        );
      })}
    </div>
  );
};
