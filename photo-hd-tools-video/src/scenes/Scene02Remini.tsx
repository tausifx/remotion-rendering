import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Paper } from "../components/Backgrounds/Paper";
import { Dust } from "../components/Effects/Dust";
import { Cursor, Ripple } from "../components/Effects/Ripple";
import { LogoTile } from "../components/UI/LogoTile";
import { SfxList } from "../components/UI/Sfx";
import { Words } from "../components/Typography/Words";
import { BRAND, COLORS, EASE, FONT_FAMILY, SHADOW, SPRING } from "../theme";
import { lerp, prog, sp } from "../utils/animations";
import { makeAt } from "../utils/timing";

const at = makeAt("remini");

/** Scene 2 – a phone (the "app") with the Remini icon, then the URL types in. */
export const Scene02Remini: React.FC = () => {
  const frame = useCurrentFrame();
  const disc = sp(frame, 2, SPRING.soft);
  const phone = sp(frame, 6, SPRING.big);
  const float = Math.sin(frame / 22) * 10;
  const tapF = at(7.2, 0);
  const cur = prog(frame, tapF - 24, 22, EASE.inOut);

  const url = "remini.ai";
  const typed = Math.floor(prog(frame, at(8.192, 2), 26, EASE.soft) * url.length);
  const urlIn = sp(frame, at(8.192, 6), SPRING.ui);
  const caret = Math.floor(frame / 8) % 2 === 0;

  const typeTicks = Array.from({ length: url.length }).map((_, i) => [at(8.192, 2) + (i / url.length) * 26 + 1, "type", 0.35] as [number, string, number]);

  return (
    <AbsoluteFill>
      <Paper frame={frame} tint={BRAND.remini} tint2={COLORS.secondary} />
      <Dust frame={frame} count={12} seed={8} color={BRAND.remini} />

      {/* brand disc behind the phone */}
      <div
        style={{
          position: "absolute", left: 610 - 450, top: 540 - 450, width: 900, height: 900, borderRadius: "50%",
          background: BRAND.remini, transform: `scale(${disc})`, opacity: 0.95,
        }}
      />
      <div
        style={{
          position: "absolute", left: 610 - 540, top: 540 - 540, width: 1080, height: 1080, borderRadius: "50%",
          border: `3px solid ${BRAND.remini}`, opacity: 0.25 * disc, transform: `scale(${disc})`,
        }}
      />

      {/* phone – perspective UI */}
      <div style={{ position: "absolute", left: 610 - 195, top: 540 - 400 + (1 - phone) * 500 + float, perspective: 1800 }}>
        <div
          style={{
            width: 390, height: 800, borderRadius: 70, background: COLORS.primary, padding: 14, boxSizing: "border-box",
            boxShadow: SHADOW.lift, transform: `rotateY(${lerp(-30, -13, phone)}deg) rotateX(3deg) rotateZ(-2deg)`,
          }}
        >
          <div style={{ width: "100%", height: "100%", borderRadius: 58, background: COLORS.bg, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 18, left: "50%", width: 110, height: 30, marginLeft: -55, borderRadius: 20, background: COLORS.primary }} />
            <div style={{ position: "absolute", top: 150, left: "50%", marginLeft: -105, transform: `scale(${sp(frame, at(6.306, 0), SPRING.pop)})` }}>
              <LogoTile src="remini.png" size={210} />
            </div>
            <div style={{ position: "absolute", top: 410, left: 56, right: 56 }}>
              {[1, 0.7, 0.85].map((w, i) => (
                <div key={i} style={{ height: 18, width: `${w * 100}%`, borderRadius: 9, background: COLORS.line, marginBottom: 18 }} />
              ))}
            </div>
            <div
              style={{
                position: "absolute", bottom: 62, left: 56, right: 56, height: 92, borderRadius: 46, background: BRAND.remini,
                display: "flex", alignItems: "center", justifyContent: "center",
                transform: `scale(${frame > tapF && frame < tapF + 5 ? 0.94 : 1})`,
              }}
            >
              <svg width="46" height="46" viewBox="0 0 24 24"><path d="M12 4v12M6 10l6-6 6 6M5 20h14" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
          </div>
        </div>
        <Ripple x={195} y={720} frame={frame} start={tapF} color={COLORS.white} max={120} />
        <Cursor x={lerp(520, 190, cur)} y={lerp(900, 735, cur)} scale={frame > tapF && frame < tapF + 5 ? 0.85 : 1} />
      </div>

      {/* right side typography */}
      <div style={{ position: "absolute", left: 1090, top: 250 }}>
        <div
          style={{
            width: 120, height: 120, borderRadius: "50%", background: COLORS.primary, color: COLORS.bg, fontFamily: FONT_FAMILY, fontWeight: 700,
            fontSize: 80, lineHeight: "130px", textAlign: "center", transform: `scale(${sp(frame, at(6.306, 4), SPRING.pop)})`,
          }}
        >
          ১
        </div>
        <div style={{ marginTop: 20 }}>
          <Words text="Remini" frame={frame} start={at(6.306, 2)} size={210} weight={700} lineHeight={1.2} />
        </div>
        <div style={{ marginTop: 4, display: "flex", gap: 18, alignItems: "center", opacity: prog(frame, at(6.7, 3), 10), transform: `translateX(${(1 - prog(frame, at(6.7, 3), 14)) * 30}px)` }}>
          <div style={{ padding: "6px 30px 14px", borderRadius: 40, border: `3px solid ${COLORS.primary}`, fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 56, color: COLORS.primary, lineHeight: 1.5 }}>অ্যাপ</div>
        </div>
        {/* URL pill */}
        <div
          style={{
            marginTop: 46, display: "inline-flex", alignItems: "center", gap: 24, padding: "14px 44px 14px 30px", background: COLORS.white, borderRadius: 100,
            boxShadow: SHADOW.soft, border: `2px solid ${COLORS.line}`, transform: `translateY(${(1 - urlIn) * 60}px) scale(${lerp(0.9, 1, urlIn)})`, opacity: Math.min(1, urlIn * 2),
          }}
        >
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: BRAND.remini }} />
          <div style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 92, color: COLORS.primary, lineHeight: 1.25, minWidth: 380 }}>
            {url.slice(0, typed)}
            <span style={{ display: "inline-block", width: 6, height: 70, background: COLORS.accent, marginLeft: 4, verticalAlign: "middle", opacity: caret && typed < url.length + 3 ? 1 : 0 }} />
          </div>
        </div>
      </div>

      <SfxList
        items={[
          [0, "whoosh_wide", 0.4],
          [at(6.306, 0), "pop", 0.45],
          [tapF, "click", 0.55],
          [at(6.306, 4), "pluck", 0.3],
          [at(8.192, 6), "swipe", 0.3],
          ...typeTicks,
          [at(8.192, 2) + 28, "chime_soft", 0.35],
        ]}
      />
    </AbsoluteFill>
  );
};
