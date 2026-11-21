import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Paper } from "../components/Backgrounds/Paper";
import { Dust } from "../components/Effects/Dust";
import { Cursor, Ripple } from "../components/Effects/Ripple";
import { Sparkle } from "../components/Effects/Sparkle";
import { SfxList } from "../components/UI/Sfx";
import { Words } from "../components/Typography/Words";
import { BRAND, COLORS, EASE, FONT_FAMILY, SHADOW, SPRING } from "../theme";
import { lerp, prog, sp } from "../utils/animations";
import { makeAt } from "../utils/timing";

const at = makeAt("cta");
const font = (size: number, weight = 600, color: string = COLORS.primary): React.CSSProperties => ({ fontFamily: FONT_FAMILY, fontSize: size, fontWeight: weight, color, lineHeight: 1.4, whiteSpace: "nowrap" });

/** point on a quadratic bezier */
const bez = (t: number, p0: [number, number], p1: [number, number], p2: [number, number]): [number, number] => [
  (1 - t) * (1 - t) * p0[0] + 2 * (1 - t) * t * p1[0] + t * t * p2[0],
  (1 - t) * (1 - t) * p0[1] + 2 * (1 - t) * t * p1[1] + t * t * p2[1],
];

/** Scene 8 – comment "HD" → link flies in → follow ToolsX Bangla. */
export const Scene08Cta: React.FC = () => {
  const frame = useCurrentFrame();
  const tType = at(53.6, 0);
  const tSend = tType + 22;
  const tPlane = at(54.834, 2);
  const tBrand = at(56.287, 4);
  const tClick = tBrand + 36;

  const word = "HD";
  const typed = frame < tType ? 0 : frame < tType + 7 ? 1 : 2;
  const box = sp(frame, at(51.25, 0) + 14, SPRING.big);
  const posted = frame >= tSend;
  const bubble = sp(frame, tSend + 2, SPRING.pop);

  // exit of comment stage
  const out = prog(frame, tBrand - 14, 14, EASE.in);

  // plane
  const pt = prog(frame, tPlane, 28, EASE.inOut);
  const [px, py] = bez(pt, [260, 930], [900, 120], [1500, 700]);
  const [qx, qy] = bez(Math.min(1, pt + 0.02), [260, 930], [900, 120], [1500, 700]);
  const ang = Math.atan2(qy - py, qx - px) * 57.3;
  const landed = frame >= tPlane + 28;
  const linkIn = sp(frame, tPlane + 28, SPRING.pop);

  // brand
  const followed = frame >= tClick;
  const cur = prog(frame, tClick - 22, 20, EASE.inOut);
  const btnS = sp(frame, tBrand + 14, SPRING.ui);

  return (
    <AbsoluteFill>
      <Paper frame={frame} tint={COLORS.secondary} tint2={COLORS.accent} />
      <Dust frame={frame} count={14} seed={52} />

      {/* ───── comment stage ───── */}
      <AbsoluteFill style={{ opacity: 1 - out, transform: `scale(${1 - out * 0.08})` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 120 }}>
          <Words text="পুরনো ছবি HD করার লিংক লাগলে" frame={frame} start={at(51.25, 3)} size={84} weight={700} align="center" marks={{ 2: COLORS.accent }} lineHeight={1.3} />
        </div>

        {/* posted comment bubble */}
        <div
          style={{
            position: "absolute", left: 380, top: 400, display: "flex", alignItems: "center", gap: 28, padding: "18px 56px 18px 24px", background: COLORS.white, borderRadius: 70,
            boxShadow: SHADOW.lift, transform: `scale(${posted ? bubble : 0})`, transformOrigin: "left center",
          }}
        >
          <div style={{ width: 96, height: 96, borderRadius: "50%", background: COLORS.secondary }} />
          <div style={{ ...font(120, 700), color: COLORS.primary }}>{word}</div>
        </div>
        {/* link reply chip */}
        <div
          style={{
            position: "absolute", left: 640, top: 600, display: "flex", alignItems: "center", gap: 24, padding: "12px 52px 18px 28px", background: COLORS.primary, borderRadius: 64,
            boxShadow: SHADOW.lift, transform: `scale(${landed ? linkIn : 0})`, transformOrigin: "left center",
          }}
        >
          <svg width="70" height="70" viewBox="0 0 24 24"><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" stroke={COLORS.bg} strokeWidth="2.3" fill="none" strokeLinecap="round" /></svg>
          <div style={font(84, 700, COLORS.bg)}>লিংক</div>
        </div>

        {/* comment box */}
        <div
          style={{
            position: "absolute", left: 360, top: 790, width: 1200, height: 150, borderRadius: 75, background: COLORS.white, boxShadow: SHADOW.lift, border: `2px solid ${COLORS.line}`,
            display: "flex", alignItems: "center", padding: "0 30px", gap: 28, boxSizing: "border-box", transform: `translateY(${(1 - box) * 120}px)`, opacity: Math.min(1, box * 2),
          }}
        >
          <div style={{ width: 90, height: 90, borderRadius: "50%", background: COLORS.secondary, flexShrink: 0 }} />
          <div style={{ flex: 1, ...font(80, 700), lineHeight: 1.3 }}>
            {typed === 0 || posted ? (
              <span style={{ ...font(58, 500, COLORS.muted), opacity: posted ? 0.0 : 1 }}>কমেন্ট করো…</span>
            ) : (
              word.slice(0, typed)
            )}
            {!posted ? <span style={{ display: "inline-block", width: 6, height: 70, background: COLORS.accent, marginLeft: 6, verticalAlign: "middle", opacity: Math.floor(frame / 8) % 2 === 0 ? 1 : 0 }} /> : null}
          </div>
          <div style={{ width: 104, height: 104, borderRadius: "50%", background: COLORS.secondary, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${frame > tSend - 4 && frame < tSend + 4 ? 0.88 : 1})` }}>
            <svg width="52" height="52" viewBox="0 0 24 24"><path d="M4 12l16-8-6 16-3-7z" fill="#fff" /></svg>
          </div>
        </div>
        <Ripple x={1508} y={865} frame={frame} start={tSend} color={COLORS.secondary} max={110} />
        <Cursor x={lerp(1900, 1490, prog(frame, tSend - 26, 22, EASE.inOut))} y={lerp(1000, 860, prog(frame, tSend - 26, 22, EASE.inOut))} scale={frame > tSend - 4 && frame < tSend + 4 ? 0.85 : 1} />

        {/* paper plane carrying the link */}
        {frame >= tPlane && !landed ? (
          <>
            <svg width="1920" height="1080" style={{ position: "absolute", left: 0, top: 0 }}>
              <path d="M260 930 Q900 120 1500 700" stroke={COLORS.secondary} strokeWidth="5" strokeDasharray="4 16" strokeLinecap="round" fill="none" opacity={0.6} strokeDashoffset={-frame} pathLength={1000} style={{ clipPath: `inset(0 ${100 - pt * 100}% 0 0)` }} />
            </svg>
            <div style={{ position: "absolute", left: px - 55, top: py - 55, transform: `rotate(${ang}deg)` }}>
              <svg width="110" height="110" viewBox="0 0 24 24"><path d="M2.5 11.5 21.5 3l-6.5 18-3.5-7.5z" fill={COLORS.secondary} stroke="#fff" strokeWidth="1" strokeLinejoin="round" /><path d="M11.5 13.5 21.5 3" stroke="#fff" strokeWidth="1.2" /></svg>
            </div>
          </>
        ) : null}
      </AbsoluteFill>

      {/* ───── brand stage ───── */}
      {frame >= tBrand - 4 ? (
        <AbsoluteFill>
          <div style={{ position: "absolute", left: 0, right: 0, top: 250 }}>
            <Words text="ToolsX Bangla" frame={frame} start={tBrand} size={200} weight={700} align="center" lineHeight={1.2} wordStyle={(i) => ({ color: i === 0 ? COLORS.primary : COLORS.secondary })} stagger={6} />
          </div>
          <div style={{ position: "absolute", left: 960 - 260, top: 640, width: 520, height: 150, borderRadius: 75, background: followed ? COLORS.primary : COLORS.accent, boxShadow: SHADOW.lift, display: "flex", alignItems: "center", justifyContent: "center", gap: 22, transform: `scale(${btnS * (frame > tClick && frame < tClick + 5 ? 0.93 : 1)})`, opacity: Math.min(1, btnS * 2) }}>
            {followed ? (
              <svg width="64" height="64" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            ) : (
              <svg width="60" height="60" viewBox="0 0 24 24"><path d="M12 4v16M4 12h16" stroke="#fff" strokeWidth="3" strokeLinecap="round" /></svg>
            )}
            <div style={font(78, 700, "#fff")}>{followed ? "Following" : "Follow"}</div>
          </div>
          <Ripple x={960 + 40} y={715} frame={frame} start={tClick} color={COLORS.accent} max={160} />
          <Cursor x={lerp(1500, 990, cur)} y={lerp(950, 730, cur)} scale={frame > tClick && frame < tClick + 5 ? 0.85 : 1} />
          <Sparkle x={560} y={330} size={90} frame={frame} start={tClick + 4} color={COLORS.accent} />
          <Sparkle x={1380} y={300} size={70} frame={frame} start={tClick + 9} color={COLORS.secondary} />
          <Sparkle x={1420} y={760} size={60} frame={frame} start={tClick + 14} color="#FFC857" />
        </AbsoluteFill>
      ) : null}

      <SfxList
        items={[
          [0, "swipe", 0.35],
          [at(51.25, 0) + 14, "pop", 0.3],
          [tType, "type", 0.4],
          [tType + 7, "type", 0.4],
          [tSend - 1, "click", 0.5],
          [tSend + 2, "pop", 0.45],
          [tPlane, "whoosh_fast", 0.35],
          [tPlane + 28, "chime", 0.4],
          [tBrand - 8, "whoosh_wide", 0.3],
          [tBrand + 14, "pop", 0.35],
          [tClick, "click", 0.5],
          [tClick + 2, "sparkle", 0.4],
          [tClick + 4, "chime_soft", 0.35],
        ]}
      />
    </AbsoluteFill>
  );
};
