import React from "react";
import { COLORS } from "../../theme";
import { rand } from "../../utils/animations";

/** A handful of slow floating dust motes – deterministic, cheap (≤ 22 DOM nodes). */
export const Dust: React.FC<{ frame: number; count?: number; color?: string; seed?: number }> = ({
  frame,
  count = 18,
  color = COLORS.primary,
  seed = 1,
}) => (
  <>
    {Array.from({ length: count }).map((_, i) => {
      const r1 = rand(i + seed * 13), r2 = rand(i * 3 + seed), r3 = rand(i * 7 + seed * 5);
      const size = 4 + r3 * 9;
      const x = (r1 * 2100 + frame * (0.25 + r3 * 0.5)) % 2100 - 90;
      const y = ((r2 * 1200 - frame * (0.18 + r1 * 0.3)) % 1200 + 1200) % 1200 - 60;
      return (
        <div
          key={i}
          style={{ position: "absolute", left: x, top: y, width: size, height: size, borderRadius: "50%", background: color, opacity: 0.1 + r2 * 0.14 }}
        />
      );
    })}
  </>
);
