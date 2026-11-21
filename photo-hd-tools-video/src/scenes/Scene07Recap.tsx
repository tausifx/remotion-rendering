import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Paper } from "../components/Backgrounds/Paper";
import { Dust } from "../components/Effects/Dust";
import { Sparkle } from "../components/Effects/Sparkle";
import { LogoTile } from "../components/UI/LogoTile";
import { SfxList } from "../components/UI/Sfx";
import { Words } from "../components/Typography/Words";
import { BRAND, COLORS, EASE, FONT_FAMILY, SHADOW, SPRING } from "../theme";
import { lerp, prog, sp } from "../utils/animations";
import { makeAt } from "../utils/timing";

const at = makeAt("recap");
const T = (size: number, weight = 700, color: string = COLORS.bg): React.CSSProperties => ({ fontFamily: FONT_FAMILY, fontSize: size, fontWeight: weight, color, lineHeight: 1.4, whiteSpace: "nowrap" });

const Chip: React.FC<{ text: string; bg: string; color?: string; size?: number; scale: number; border?: string }> = ({ text, bg, color = "#fff", size = 56, scale, border }) => (
  <div style={{ padding: "0 30px 8px", borderRadius: 22, background: bg, border, ...T(size, 700, color), transform: `scale(${scale})`, opacity: Math.min(1, scale * 2), boxShadow: "0 10px 24px rgba(0,0,0,.25)" }}>{text}</div>
);

const Slot: React.FC<{ scale: number; dashed?: boolean }> = ({ scale, dashed }) => (
  <div
    style={{
      width: 90, height: 70, borderRadius: 16, boxSizing: "border-box", display: "flex", alignItems: "center", justifyContent: "center",
      background: dashed ? "transparent" : "rgba(246,243,238,.16)", border: `4px ${dashed ? "dashed" : "solid"} rgba(246,243,238,${dashed ? 0.5 : 0.9})`, transform: `scale(${scale})`,
    }}
  >
    <svg width="48" height="40" viewBox="0 0 48 40"><circle cx="34" cy="12" r="6" fill={COLORS.bg} opacity={dashed ? 0.5 : 1} /><path d="M3 36 L18 16 L28 28 L34 22 L45 36 Z" fill={COLORS.bg} opacity={dashed ? 0.5 : 1} /></svg>
  </div>
);

const Row: React.FC<{ y: number; frame: number; start: number; dim: number; logo: string; plate?: boolean; name: string; children: React.ReactNode }> = ({ y, frame, start, dim, logo, plate, name, children }) => {
  const s = sp(frame, start, SPRING.big);
  return (
    <div
      style={{
        position: "absolute", left: 110, top: y, width: 1700, height: 220, borderRadius: 44, background: "rgba(246,243,238,.07)", border: "2px solid rgba(246,243,238,.16)",
        display: "flex", alignItems: "center", padding: "0 38px", boxSizing: "border-box", gap: 34, transform: `translateX(${(1 - s) * -160}px)`, opacity: Math.min(1, s * 2) * dim,
      }}
    >
      <LogoTile src={logo} size={150} plate={plate} shadow="0 14px 30px rgba(0,0,0,.3)" />
      <div style={{ ...T(66, 700), width: 470 }}>{name}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 28, flex: 1 }}>{children}</div>
    </div>
  );
};

/** Scene 7 – the honest recap: two paid tools with a small free daily allowance, one with free credits. */
export const Scene07Recap: React.FC = () => {
  const frame = useCurrentFrame();
  const tRow3 = at(48.231, 4);
  const shift = prog(frame, tRow3 - 12, 22, EASE.inOut) * -130;
  const dim = lerp(1, 0.5, prog(frame, tRow3 + 6, 16));
  const tPaid1 = at(43.0, 0), tFree1 = at(44.243, 4);
  const coin = (i: number) => sp(frame, at(49.0, 0) + i * 11, SPRING.pop);

  return (
    <AbsoluteFill>
      <Paper frame={frame} dark tint={COLORS.secondary} tint2={COLORS.accent} />
      <Dust frame={frame} count={14} seed={44} color={COLORS.bg} />

      <div style={{ position: "absolute", left: 110, top: 96 }}>
        <Words text="মনে রাখবে" frame={frame} start={at(40.838, 3)} size={84} weight={700} color={COLORS.bg} lineHeight={1.3} marks={{ 0: COLORS.accent }} />
      </div>

      <div style={{ position: "absolute", left: 0, top: shift }}>
        {/* Remini */}
        <Row y={430} frame={frame} start={at(41.7, 0)} dim={dim} logo="remini.png" name="Remini">
          <Chip text="PAID" bg={COLORS.accent} scale={frame < tPaid1 ? 0 : sp(frame, tPaid1, SPRING.pop)} />
          <FreeBlock frame={frame} start={tFree1} />
        </Row>
        {/* PicWish */}
        <Row y={690} frame={frame} start={at(42.4, 0)} dim={dim} logo="picwish.png" plate name="PicWish">
          <Chip text="PAID" bg={COLORS.accent} scale={frame < tPaid1 + 8 ? 0 : sp(frame, tPaid1 + 8, SPRING.pop)} />
          <FreeBlock frame={frame} start={tFree1 + 8} />
        </Row>
        {/* Upscale.media */}
        <Row y={950} frame={frame} start={tRow3} dim={1} logo="upscale-media.png" name="Upscale.media">
          <div style={{ display: "flex", gap: 14 }}>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ width: 92, height: 92, borderRadius: "50%", background: BRAND.upscale, border: "5px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${coin(i)})`, boxShadow: "0 10px 22px rgba(0,0,0,.3)" }}>
                <svg width="46" height="46" viewBox="0 0 24 24"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z" fill="#fff" /></svg>
              </div>
            ))}
          </div>
          <div style={{ ...T(60, 600), opacity: prog(frame, at(49.0, 0) + 6, 10) }}>৩ ক্রেডিট</div>
          <Chip text="ফ্রি" bg={COLORS.bg} color={COLORS.primary} scale={sp(frame, at(49.0, 0) + 34, SPRING.pop)} />
        </Row>
      </div>
      <Sparkle x={1640} y={800} size={80} frame={frame} start={at(49.0, 0) + 40} color="#FFE9B0" />

      <SfxList
        items={[
          [0, "whoosh_low", 0.4],
          [at(40.838, 3), "pluck", 0.3],
          [at(41.7, 0), "swipe", 0.25],
          [at(42.4, 0), "swipe", 0.25],
          [tPaid1, "stamp", 0.45],
          [tPaid1 + 8, "stamp", 0.45],
          [tFree1 + 8, "pop", 0.35],
          [tFree1 + 16, "chime_soft", 0.3],
          [tRow3, "whoosh_rise", 0.3],
          [at(49.0, 0), "coin", 0.4],
          [at(49.0, 0) + 11, "coin", 0.4],
          [at(49.0, 0) + 22, "coin", 0.4],
          [at(49.0, 0) + 34, "chime", 0.35],
        ]}
      />
    </AbsoluteFill>
  );
};

/** 2–3 photos / day, free */
const FreeBlock: React.FC<{ frame: number; start: number }> = ({ frame, start }) => (
  <>
    <div style={{ display: "flex", gap: 10 }}>
      <Slot scale={sp(frame, start, SPRING.pop)} />
      <Slot scale={sp(frame, start + 6, SPRING.pop)} />
      <Slot scale={sp(frame, start + 12, SPRING.pop)} dashed />
    </div>
    <div style={{ opacity: prog(frame, start + 10, 10), transform: `translateX(${(1 - prog(frame, start + 10, 14)) * 30}px)` }}>
      <div style={T(58, 700)}>২–৩ ছবি</div>
      <div style={T(38, 500, "rgba(246,243,238,.7)")}>প্রতিদিন</div>
    </div>
    <Chip text="ফ্রি" bg={COLORS.bg} color={COLORS.primary} scale={sp(frame, start + 22, SPRING.pop)} />
  </>
);
