import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { EASE } from "../../theme";
import { prog } from "../../utils/animations";
import { TRANS } from "../../utils/timing";

export type TransitionKind = "none" | "circle" | "wipeX" | "wipeY" | "diag" | "push";

type Props = {
  kind: TransitionKind;
  color: string; // leading edge / ink colour
  origin?: [number, number]; // circle centre in % of frame
  children: React.ReactNode;
};

/**
 * Each scene reveals itself with its own transition (different direction, shape and
 * speed) while the previous scene is still underneath. A coloured "ink" edge leads the reveal.
 */
export const SceneShell: React.FC<Props> = ({ kind, color, origin = [50, 50], children }) => {
  const frame = useCurrentFrame();
  if (kind === "none") return <AbsoluteFill>{children}</AbsoluteFill>;

  const p = prog(frame, 0, TRANS + (kind === "circle" ? 6 : 0), kind === "push" ? EASE.out : EASE.inOut);
  const done = p >= 1;
  let clip: string | undefined;
  let transform: string | undefined;
  let edge: React.ReactNode = null;

  if (kind === "circle") {
    const r = p * 150;
    clip = `circle(${r}% at ${origin[0]}% ${origin[1]}%)`;
    edge = !done ? (
      <div
        style={{
          position: "absolute",
          left: `${origin[0]}%`,
          top: `${origin[1]}%`,
          width: p * 3300,
          height: p * 3300,
          marginLeft: -p * 1650,
          marginTop: -p * 1650,
          borderRadius: "50%",
          border: `${Math.max(2, 38 * (1 - p))}px solid ${color}`,
          opacity: 1 - p * 0.6,
        }}
      />
    ) : null;
  } else if (kind === "wipeX") {
    clip = `inset(0 ${(1 - p) * 100}% 0 0)`;
    edge = !done ? <div style={{ position: "absolute", top: 0, bottom: 0, left: `${p * 100}%`, width: 56, marginLeft: -56, background: color }} /> : null;
  } else if (kind === "wipeY") {
    clip = `inset(${(1 - p) * 100}% 0 0 0)`;
    edge = !done ? <div style={{ position: "absolute", left: 0, right: 0, top: `${(1 - p) * 100}%`, height: 48, background: color }} /> : null;
  } else if (kind === "diag") {
    const x = p * 160 - 30;
    clip = `polygon(0 0, ${x + 30}% 0, ${x}% 100%, 0 100%)`;
    edge = !done ? (
      <div style={{ position: "absolute", inset: 0, clipPath: `polygon(${x + 30 - 4}% 0, ${x + 30}% 0, ${x}% 100%, ${x - 4}% 100%)`, background: color }} />
    ) : null;
  } else if (kind === "push") {
    transform = `translateX(${(1 - p) * 100}%)`;
  }

  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ clipPath: done ? undefined : clip, transform }}>{children}</AbsoluteFill>
      {edge}
    </AbsoluteFill>
  );
};
