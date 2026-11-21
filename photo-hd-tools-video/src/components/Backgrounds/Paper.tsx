import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../../theme";

const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='260' height='260'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.1  0 0 0 0 0.12  0 0 0 0 0.2  0 0 0 .55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

type Props = {
  frame: number;
  /** soft colour blobs */
  tint?: string;
  tint2?: string;
  dark?: boolean;
  grid?: boolean;
};

/** Warm paper background: faint grid, two slow drifting colour fields, subtle grain */
export const Paper: React.FC<Props> = ({ frame, tint = COLORS.secondary, tint2 = COLORS.accent, dark, grid = true }) => {
  const bg = dark ? COLORS.primary : COLORS.bg;
  const line = dark ? "rgba(246,243,238,0.06)" : "rgba(31,42,68,0.05)";
  return (
    <AbsoluteFill style={{ background: bg, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          width: 1100,
          height: 1100,
          borderRadius: "50%",
          left: -300 + Math.sin(frame / 90) * 40,
          top: -480 + Math.cos(frame / 110) * 30,
          background: `radial-gradient(circle, ${tint}${dark ? "44" : "26"} 0%, transparent 68%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 1000,
          height: 1000,
          borderRadius: "50%",
          right: -320 + Math.cos(frame / 100) * 40,
          bottom: -520 + Math.sin(frame / 120) * 30,
          background: `radial-gradient(circle, ${tint2}${dark ? "30" : "1c"} 0%, transparent 68%)`,
        }}
      />
      {grid ? (
        <AbsoluteFill
          style={{
            backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
            backgroundSize: "96px 96px",
            backgroundPosition: `${-(frame * 0.2) % 96}px 0`,
          }}
        />
      ) : null}
      <AbsoluteFill style={{ backgroundImage: GRAIN, opacity: dark ? 0.12 : 0.1, mixBlendMode: dark ? "screen" : "multiply" }} />
    </AbsoluteFill>
  );
};
