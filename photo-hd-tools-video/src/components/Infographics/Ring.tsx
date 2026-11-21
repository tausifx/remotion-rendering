import React from "react";
import { COLORS } from "../../theme";

type Props = { size: number; progress: number; stroke?: number; color?: string; track?: string; children?: React.ReactNode };

/** Radial progress ring */
export const Ring: React.FC<Props> = ({ size, progress, stroke = 22, color = COLORS.secondary, track = COLORS.line, children }) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
        />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>{children}</div>
    </div>
  );
};
