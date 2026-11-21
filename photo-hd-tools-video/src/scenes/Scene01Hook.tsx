import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Paper } from "../components/Backgrounds/Paper";
import { Dust } from "../components/Effects/Dust";
import { Ripple, Cursor } from "../components/Effects/Ripple";
import { Sparkle } from "../components/Effects/Sparkle";
import { OldPhoto, PHOTO_RATIO } from "../components/Photo/OldPhoto";
import { SfxList } from "../components/UI/Sfx";
import { Words } from "../components/Typography/Words";
import { COLORS, EASE, FONT_FAMILY, SHADOW, SPRING } from "../theme";
import { lerp, prog, sp, vis } from "../utils/animations";
import { makeAt } from "../utils/timing";

const at = makeAt("hook");

/** Opening hook – a blurry polaroid; one click clears it. */
export const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const clickF = at(3.95, 0);
  const clear = prog(frame, clickF + 3, 26, EASE.inOut);
  const blur = lerp(15 + Math.sin(frame / 9) * 1.2, 0, clear);
  const push = 1 + prog(frame, 0, 180, EASE.soft) * 0.06;

  // polaroid pose
  const inP = sp(frame, 4, SPRING.big);
  const PW = 800;
  const PH = PW * PHOTO_RATIO;
  const cx = 1330, cy = 520;

  // text groups
  const g1Out = prog(frame, at(3.709, 3), 12, EASE.in);
  const g2In = at(3.709, 2);

  // cursor path to the photo, then click
  const cur = prog(frame, at(3.3, 0), 18, EASE.inOut);
  const curX = lerp(900, cx - 40, cur);
  const curY = lerp(860, cy + 40, cur);
  const press = frame > clickF && frame < clickF + 6 ? 0.82 : 1;
  const curVis = vis(frame, at(3.3, 0), at(4.8, 0), 6, 10);

  return (
    <AbsoluteFill>
      <Paper frame={frame} tint={COLORS.secondary} tint2={COLORS.accent} />
      <Dust frame={frame} count={16} seed={3} />

      {/* camera push wrapper */}
      <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: "70% 50%" }}>
        {/* ghost word, background layer (slow parallax) */}
        <div
          style={{
            position: "absolute", left: 60 - frame * 0.4, top: 700, fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 420,
            color: COLORS.primary, opacity: 0.045, whiteSpace: "nowrap", lineHeight: 1.3,
          }}
        >
          HD
        </div>

        {/* polaroid */}
        <div
          style={{
            position: "absolute", left: cx - (PW + 70) / 2, top: cy - (PH + 190) / 2 + (1 - inP) * 160,
            width: PW + 70, padding: "35px 35px 120px", background: "#FFFDF8", borderRadius: 10, boxShadow: SHADOW.lift,
            transform: `rotate(${lerp(-7, -3, inP) + (1 - clear) * Math.sin(frame / 20) * 0.6}deg) scale(${lerp(0.9, 1, inP) + clear * 0.025})`,
            opacity: Math.min(1, inP * 2),
          }}
        >
          <div style={{ position: "relative" }}>
            <OldPhoto width={PW} blur={blur} tone={clear} scratches={1 - clear} haze={1 - clear} />
            {/* light sweep when it clears */}
            <div
              style={{
                position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
              }}
            >
              <div
                style={{
                  position: "absolute", top: -40, bottom: -40, width: 220, left: lerp(-300, PW + 120, prog(frame, clickF + 2, 24, EASE.inOut)),
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,.85), transparent)", transform: "skewX(-18deg)",
                  opacity: frame > clickF ? 1 : 0,
                }}
              />
            </div>
            <Sparkle x={PW * 0.28} y={PH * 0.3} size={70} frame={frame} start={clickF + 8} color="#fff" />
            <Sparkle x={PW * 0.74} y={PH * 0.55} size={90} frame={frame} start={clickF + 13} color="#fff" />
            <Sparkle x={PW * 0.52} y={PH * 0.16} size={52} frame={frame} start={clickF + 17} color="#FFE9B0" />
          </div>
          {/* tape */}
          <div style={{ position: "absolute", top: -22, left: "50%", width: 150, height: 46, marginLeft: -75, background: "rgba(229,56,59,.28)", transform: "rotate(-3deg)", borderRadius: 4 }} />
        </div>
        <Ripple x={cx - 40 + 12} y={cy + 40 + 8} frame={frame} start={clickF} color={COLORS.secondary} />
        <div style={{ opacity: curVis }}>
          <Cursor x={curX} y={curY} scale={press} />
        </div>
      </AbsoluteFill>

      {/* text group 1 */}
      <div style={{ position: "absolute", left: 110, top: 270, width: 1000, opacity: 1 - g1Out, transform: `translateY(${-g1Out * 40}px)` }}>
        <Words text="তোমার বাবা-মায়ের" frame={frame} start={at(0.05, 0)} size={62} weight={500} color={COLORS.muted} />
        <Words
          text="পুরনো ঘোলা ছবি"
          frame={frame}
          start={at(0.05, 0) + 8}
          size={118}
          weight={700}
          marks={{ 1: COLORS.accent }}
          wordStyle={(i) => (i === 1 ? { filter: `blur(${(1 - prog(frame, at(2.3, 0), 14)) * 0 + 0}px)` } : {})}
          lineHeight={1.3}
        />
        <div style={{ marginTop: 26, display: "flex", alignItems: "center", gap: 22, transform: `scale(${sp(frame, at(2.35, 4), SPRING.pop)})`, transformOrigin: "left center" }}>
          <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 150, lineHeight: 1.1, color: COLORS.accent }}>HD</div>
          <div style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 130, color: COLORS.primary, opacity: 0.35 + Math.sin(frame / 6) * 0.1 }}>?</div>
        </div>
      </div>

      {/* text group 2 */}
      <div style={{ position: "absolute", left: 110, top: 300, width: 820 }}>
        <Words text="এক ক্লিকেই" frame={frame} start={g2In} size={140} weight={700} marks={{ 1: COLORS.secondary }} lineHeight={1.3} />
        <div style={{ height: 14 }} />
        <Words text="চোখের পানি" frame={frame} start={at(4.7, 3)} size={96} weight={600} color={COLORS.secondary} lineHeight={1.3} />
        {/* tear-of-joy drop */}
        <svg width="70" height="90" viewBox="0 0 70 90" style={{ position: "absolute", left: 560, top: 262, transform: `translateY(${prog(frame, at(4.9, 0), 30, EASE.in) * 40}px) scale(${sp(frame, at(4.8, 0), SPRING.ui)})`, opacity: 1 - prog(frame, at(5.3, 0), 14) }}>
          <path d="M35 4 C50 30 64 46 64 60 A29 29 0 0 1 6 60 C6 46 20 30 35 4Z" fill={COLORS.secondary} fillOpacity="0.85" />
          <path d="M22 58 A14 14 0 0 0 34 74" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".7" />
        </svg>
      </div>

      <SfxList
        items={[
          [0, "impact_soft", 0.3],
          [at(2.35, 4), "chime_soft", 0.35],
          [at(3.709, 3), "swipe", 0.25],
          [clickF, "click", 0.6],
          [clickF + 2, "sparkle", 0.35],
        ]}
      />
    </AbsoluteFill>
  );
};
