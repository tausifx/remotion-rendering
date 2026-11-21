import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Paper } from "../components/Backgrounds/Paper";
import { Dust } from "../components/Effects/Dust";
import { PixelGrid } from "../components/Infographics/PixelGrid";
import { LogoTile } from "../components/UI/LogoTile";
import { SfxList } from "../components/UI/Sfx";
import { Words } from "../components/Typography/Words";
import { BRAND, COLORS, EASE, FONT_FAMILY, SHADOW, SPRING } from "../theme";
import { lerp, prog, sp } from "../utils/animations";
import { makeAt } from "../utils/timing";

const at = makeAt("upscale");
const PANEL = 760;

/** Scene 4 – Upscale.media: a purple brand panel and a "small → big" resolution metaphor. */
export const Scene04Upscale: React.FC = () => {
  const frame = useCurrentFrame();
  const logo = sp(frame, 4, SPRING.big);
  const small = sp(frame, at(19.4, 0), SPRING.pop);
  const arrow = prog(frame, at(20.0, 0), 18, EASE.out);
  const big = sp(frame, at(20.5, 0), SPRING.big);

  const url = "upscale.media";
  const tStart = at(21.799, 2);
  const typed = Math.floor(prog(frame, tStart, 30, EASE.soft) * url.length);
  const urlIn = sp(frame, at(21.799, 6), SPRING.ui);
  const caret = Math.floor(frame / 8) % 2 === 0;
  const ticks = Array.from({ length: url.length }).map((_, i) => [tStart + (i / url.length) * 30 + 1, "type", 0.3] as [number, string, number]);

  return (
    <AbsoluteFill>
      <Paper frame={frame} tint={BRAND.upscale} tint2={COLORS.accent} />
      <Dust frame={frame} count={12} seed={5} color={BRAND.upscale} />

      {/* ghost numeral */}
      <div style={{ position: "absolute", left: 1180 + Math.sin(frame / 50) * 10, top: -90, fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 900, lineHeight: 1.3, color: BRAND.upscale, opacity: 0.07 }}>২</div>

      {/* left brand panel */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: PANEL, background: BRAND.upscale, overflow: "hidden" }}>
        {[420, 640, 860].map((d, i) => (
          <div key={d} style={{ position: "absolute", left: PANEL / 2 - d / 2, top: 540 - d / 2, width: d, height: d, borderRadius: "50%", border: "3px solid rgba(255,255,255,0.16)", transform: `scale(${1 + Math.sin(frame / 30 + i) * 0.015})` }} />
        ))}
        <div style={{ position: "absolute", left: PANEL / 2 - 175, top: 540 - 175, transform: `scale(${logo}) rotate(${(1 - logo) * -12}deg)` }}>
          <LogoTile src="upscale-media.png" size={350} plate shadow="0 40px 90px rgba(20,8,70,.45)" />
        </div>
      </div>

      {/* right content */}
      <div style={{ position: "absolute", left: 880, top: 100 }}>
        <div style={{ width: 120, height: 120, borderRadius: "50%", background: COLORS.primary, color: COLORS.bg, fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 80, lineHeight: "130px", textAlign: "center", transform: `scale(${sp(frame, at(19.081, 3), SPRING.pop)})` }}>২</div>
        <div style={{ marginTop: 18 }}>
          <Words text="Upscale.media" frame={frame} start={at(19.081, 3)} size={128} weight={700} lineHeight={1.3} />
        </div>
      </div>

      {/* small → big metaphor */}
      <div style={{ position: "absolute", left: 890, top: 500, display: "flex", alignItems: "center", gap: 34 }}>
        <div style={{ transform: `scale(${small})`, boxShadow: SHADOW.soft, borderRadius: 22, overflow: "hidden", width: 150, height: 150 }}>
          <PixelGrid n={5} size={150} radius={22} />
        </div>
        <svg width="190" height="90" viewBox="0 0 190 90">
          <path d="M6 45 H170" stroke={COLORS.primary} strokeWidth="9" strokeLinecap="round" strokeDasharray="170" strokeDashoffset={170 * (1 - arrow)} fill="none" />
          <path d="M138 14 L174 45 L138 76" stroke={COLORS.primary} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity={prog(frame, at(20.0, 0) + 12, 6)} />
        </svg>
        <div style={{ transform: `scale(${lerp(0.4, 1, big)})`, opacity: Math.min(1, big * 2), transformOrigin: "left center", boxShadow: SHADOW.lift, borderRadius: 30, overflow: "hidden", width: 340, height: 340 }}>
          <PixelGrid n={34} size={340} radius={30} />
        </div>
      </div>

      {/* url pill */}
      <div
        style={{
          position: "absolute", left: 890, top: 900, display: "inline-flex", alignItems: "center", gap: 22, padding: "10px 44px 10px 28px", background: COLORS.white, borderRadius: 100,
          boxShadow: SHADOW.soft, border: `2px solid ${COLORS.line}`, transform: `translateY(${(1 - urlIn) * 50}px)`, opacity: Math.min(1, urlIn * 2),
        }}
      >
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: BRAND.upscale }} />
        <div style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 82, color: COLORS.primary, lineHeight: 1.25, minWidth: 560 }}>
          {url.slice(0, typed)}
          <span style={{ display: "inline-block", width: 6, height: 64, background: COLORS.accent, marginLeft: 4, verticalAlign: "middle", opacity: caret && typed < url.length + 3 ? 1 : 0 }} />
        </div>
      </div>

      <SfxList
        items={[
          [0, "whoosh_low", 0.4],
          [4, "pop", 0.4],
          [at(19.4, 0), "pluck_hi", 0.3],
          [at(20.0, 0), "swipe", 0.25],
          [at(20.5, 0), "pop", 0.4],
          [at(21.799, 6), "swipe", 0.25],
          ...ticks,
          [tStart + 32, "chime_soft", 0.35],
        ]}
      />
    </AbsoluteFill>
  );
};
