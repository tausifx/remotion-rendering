import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Paper } from "../components/Backgrounds/Paper";
import { Dust } from "../components/Effects/Dust";
import { Sparkle } from "../components/Effects/Sparkle";
import { PixelGrid } from "../components/Infographics/PixelGrid";
import { Ring } from "../components/Infographics/Ring";
import { OldPhoto, PHOTO_RATIO } from "../components/Photo/OldPhoto";
import { LogoTile } from "../components/UI/LogoTile";
import { SfxList } from "../components/UI/Sfx";
import { BRAND, COLORS, EASE, FONT_FAMILY, SHADOW, SPRING } from "../theme";
import { lerp, prog, sp } from "../utils/animations";
import { makeAt } from "../utils/timing";

const at = makeAt("features");
const CX = 1010;
const CY = 570;

/** A stage that pops in at `a`, and shrinks/fades out at `b` (frames) */
const Stage: React.FC<{ frame: number; a: number; b: number; children: React.ReactNode; spring?: typeof SPRING.big }> = ({ frame, a, b, children, spring = SPRING.big }) => {
  if (frame < a - 1 || frame > b + 12) return null;
  const s = sp(frame, a, spring);
  const out = prog(frame, b, 10, EASE.in);
  return (
    <div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, opacity: Math.min(1, s * 2) * (1 - out), transform: `scale(${lerp(0.8, 1, s) * (1 + out * 0.12)})`, transformOrigin: `${CX}px ${CY}px` }}>
      {children}
    </div>
  );
};

const Pill: React.FC<{ text: string; bg: string; color?: string; size?: number }> = ({ text, bg, color = "#fff", size = 70 }) => (
  <div style={{ display: "inline-block", padding: "0 34px 8px", borderRadius: 24, background: bg, color, fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: size, lineHeight: 1.35, boxShadow: SHADOW.soft }}>{text}</div>
);

/** Scene 5 – four benefits, each its own visual: 100% ring · 4x resolution · price tag · watermark wipe */
export const Scene05Features: React.FC = () => {
  const frame = useCurrentFrame();
  const tA = at(23.415, 4), tB = at(25.442, 4), tC = at(28.127, 4), tD = at(29.342, 4);

  // phase a
  const ringP = prog(frame, tA + 4, 38, EASE.inOut);
  // phase b
  const pb = prog(frame, tB + 6, 44, EASE.inOut);
  const n = Math.round(5 * Math.pow(4, pb));
  const gsize = lerp(340, 600, EASE.out(pb));
  // phase c: pendulum
  const dt = Math.max(0, frame - tC - 4);
  const angle = 30 * Math.exp(-dt / 16) * Math.cos(dt / 4.2);
  // phase d
  const sweep = prog(frame, tD + 18, 30, EASE.inOut);
  const PW = 960, PH = PW * PHOTO_RATIO;

  return (
    <AbsoluteFill>
      <Paper frame={frame} tint={BRAND.upscale} tint2={COLORS.accent} />
      <Dust frame={frame} count={12} seed={14} color={BRAND.upscale} />

      {/* brand tag */}
      <div style={{ position: "absolute", left: 90, top: 70, display: "flex", alignItems: "center", gap: 22 }}>
        <LogoTile src="upscale-media.png" size={90} />
        <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 56, color: COLORS.primary, lineHeight: 1.4 }}>Upscale.media</div>
      </div>

      {/* a) 100% ring */}
      <Stage frame={frame} a={tA} b={tB - 2} spring={SPRING.big}>
        <div style={{ position: "absolute", left: CX - 310, top: CY - 310 }}>
          <Ring size={620} progress={ringP} stroke={42} color={BRAND.upscale}>
            <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 190, color: COLORS.primary, lineHeight: 1.1 }}>{Math.round(ringP * 100)}%</div>
            <div style={{ transform: `scale(${sp(frame, tA + 34, SPRING.pop)})` }}><Pill text="FREE" bg={COLORS.accent} size={78} /></div>
          </Ring>
        </div>
        <Sparkle x={CX + 250} y={CY - 250} size={90} frame={frame} start={tA + 40} color={BRAND.upscale} />
        <Sparkle x={CX - 270} y={CY + 200} size={60} frame={frame} start={tA + 46} color={COLORS.accent} />
      </Stage>

      {/* b) 4x resolution */}
      <Stage frame={frame} a={tB} b={tC - 2}>
        <div style={{ position: "absolute", left: CX - gsize / 2, top: CY - gsize / 2, boxShadow: SHADOW.lift, borderRadius: 34, overflow: "hidden" }}>
          <PixelGrid n={n} size={gsize} radius={34} />
        </div>
        {[0, 1, 2, 3].map((i) => {
          const sx = i % 2 ? 1 : -1, sy = i < 2 ? -1 : 1;
          const d = gsize / 2 + 46 + Math.sin(frame / 8) * 4;
          return (
            <svg key={i} width="70" height="70" viewBox="0 0 24 24" style={{ position: "absolute", left: CX + sx * d - 35, top: CY + sy * d - 35, transform: `rotate(${Math.atan2(sy, sx) * 57.3 + 90}deg)`, opacity: pb }}>
              <path d="M12 20V5M6 11l6-6 6 6" stroke={BRAND.upscale} strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          );
        })}
        <div style={{ position: "absolute", left: CX + gsize / 2 - 110, top: CY - gsize / 2 - 50, transform: `scale(${sp(frame, tB + 24, SPRING.pop)}) rotate(6deg)` }}>
          <Pill text="4x HD" bg={BRAND.upscale} size={92} />
        </div>
      </Stage>

      {/* c) price tag pendulum */}
      <Stage frame={frame} a={tC} b={tD - 2} spring={SPRING.soft}>
        <div style={{ position: "absolute", left: CX, top: 90, transform: `rotate(${angle}deg)`, transformOrigin: "0 0" }}>
          <div style={{ position: "absolute", left: -3, top: 0, width: 6, height: 190, background: COLORS.primary, borderRadius: 3 }} />
          <div style={{ position: "absolute", left: -230, top: 170, width: 460, height: 620, borderRadius: 54, background: `linear-gradient(160deg, ${BRAND.upscale}, #8C63FF)`, boxShadow: SHADOW.lift, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <div style={{ position: "absolute", top: 36, width: 64, height: 64, borderRadius: "50%", background: COLORS.bg, boxShadow: "inset 0 4px 8px rgba(0,0,0,.25)" }} />
            <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 150, color: "#fff", lineHeight: 1.2, marginTop: 70 }}>FREE</div>
            <div style={{ width: 240, height: 8, borderRadius: 4, background: "rgba(255,255,255,.5)", marginTop: 14 }} />
          </div>
        </div>
      </Stage>

      {/* d) watermark wipe */}
      <Stage frame={frame} a={tD} b={9999}>
        <div style={{ position: "absolute", left: CX - PW / 2 - 14, top: CY - PH / 2 - 14 - 30, padding: 14, background: "#fff", borderRadius: 30, boxShadow: SHADOW.lift }}>
          <div style={{ position: "relative", width: PW, height: PH, borderRadius: 18, overflow: "hidden" }}>
            <OldPhoto width={PW} />
            {/* watermark pattern, wiped away left → right */}
            <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 0 0 ${sweep * 100}%)` }}>
              {[0, 1, 2].map((r) => (
                <div key={r} style={{ position: "absolute", left: -120, top: 60 + r * 150, width: PW + 400, transform: "rotate(-22deg)", fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 82, color: "#fff", opacity: 0.5, whiteSpace: "nowrap", letterSpacing: 0 }}>
                  WATERMARK&nbsp;&nbsp;WATERMARK&nbsp;&nbsp;WATERMARK
                </div>
              ))}
            </div>
            {frame > tD + 18 && sweep < 1 ? (
              <div style={{ position: "absolute", top: 0, bottom: 0, left: sweep * PW - 4, width: 8, background: "#fff", boxShadow: "0 0 36px 8px rgba(255,255,255,.9)" }} />
            ) : null}
          </div>
        </div>
        <div style={{ position: "absolute", left: CX, top: CY + PH / 2 + 60, transform: `translateX(-50%) scale(${frame < tD + 50 ? 0 : sp(frame, tD + 50, SPRING.pop)})`, display: "flex", alignItems: "center", gap: 20, padding: "8px 44px 14px 26px", borderRadius: 60, background: COLORS.primary, color: COLORS.bg, boxShadow: SHADOW.soft, whiteSpace: "nowrap" }}>
          <svg width="64" height="64" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill={BRAND.upscale} /><path d="M6.5 12.5l4 4 7-8" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 70, lineHeight: 1.4 }}>No Watermark</span>
        </div>
      </Stage>

      <SfxList
        items={[
          [0, "whoosh_fast", 0.35],
          [tA + 2, "pluck", 0.3],
          [tA + 40, "chime", 0.35],
          [tB, "whoosh_rise", 0.25],
          [tB + 10, "tick", 0.3], [tB + 20, "tick", 0.3], [tB + 30, "tick", 0.3], [tB + 40, "tick", 0.3],
          [tB + 24, "stamp", 0.35],
          [tC, "pluck_hi", 0.3],
          [tC + 6, "impact_soft", 0.2],
          [tD, "swipe", 0.25],
          [tD + 18, "whoosh_fast", 0.25],
          [tD + 50, "pop", 0.4],
          [tD + 52, "chime_soft", 0.3],
        ]}
      />
    </AbsoluteFill>
  );
};
