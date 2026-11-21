import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Paper } from "../components/Backgrounds/Paper";
import { Dust } from "../components/Effects/Dust";
import { Sparkle } from "../components/Effects/Sparkle";
import { OldPhoto, PHOTO_RATIO } from "../components/Photo/OldPhoto";
import { LogoTile } from "../components/UI/LogoTile";
import { SfxList } from "../components/UI/Sfx";
import { Words } from "../components/Typography/Words";
import { BRAND, COLORS, EASE, FONT_FAMILY, SHADOW, SPRING } from "../theme";
import { lerp, prog, sp } from "../utils/animations";
import { makeAt } from "../utils/timing";

const at = makeAt("picwish");

const PW = 1000;
const PH = PW * PHOTO_RATIO;
const PL = 460; // photo left
const PT = 300; // photo top

const Chip: React.FC<{ text: string; done: boolean; frame: number; start: number; doneAt: number }> = ({ text, done, frame, start, doneAt }) => {
  const s = sp(frame, start, SPRING.ui);
  const d = sp(frame, doneAt, SPRING.pop);
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: 18, padding: "4px 38px 12px 26px", borderRadius: 60, boxSizing: "border-box",
        background: done ? BRAND.picwish : "transparent", border: `4px solid ${done ? BRAND.picwish : COLORS.primary}`, color: done ? "#fff" : COLORS.primary,
        fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 64, lineHeight: 1.45, transform: `scale(${s * (done ? lerp(1.12, 1, d) : 1)})`, opacity: Math.min(1, s * 2),
        boxShadow: done ? SHADOW.glow(BRAND.picwish) : "none", whiteSpace: "nowrap",
      }}
    >
      <svg width="46" height="46" viewBox="0 0 24 24">
        {done ? <path d="M5 12.5l4.5 4.5L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /> : <circle cx="12" cy="12" r="7" stroke={COLORS.primary} strokeWidth="3" strokeDasharray="4 4" fill="none" />}
      </svg>
      {text}
    </div>
  );
};

/** Scene 6 – PicWish: brand intro, then a "repair brush" heals scratches & the torn corner; colour returns. */
export const Scene06PicWish: React.FC = () => {
  const frame = useCurrentFrame();

  const tIntroOut = 104; // intro group leaves
  const tRepair = at(34.37, 3); // 108ish
  const tNew = at(38.944, 4);

  /* intro */
  const logoIn = sp(frame, 4, SPRING.big);
  const move = prog(frame, tIntroOut, 30, EASE.inOut);
  const logoSize = lerp(330, 92, move);
  const logoX = lerp(560 - 165, 90, move);
  const logoY = lerp(540 - 165, 66, move);
  const introFade = 1 - prog(frame, tIntroOut - 2, 14, EASE.in);
  const url = "picwish.com";
  const tUrl = at(32.925, 2);
  const typed = Math.floor(prog(frame, tUrl, 24, EASE.soft) * url.length);
  const urlIn = sp(frame, at(32.925, 6), SPRING.ui);
  const caret = Math.floor(frame / 8) % 2 === 0;
  const ticks = Array.from({ length: url.length }).map((_, i) => [tUrl + (i / url.length) * 24 + 1, "type", 0.3] as [number, string, number]);

  /* repair */
  const heal = prog(frame, tRepair + 6, 120, EASE.inOut) * 800;
  const photoIn = sp(frame, tRepair - 2, SPRING.big);
  const nw = prog(frame, tNew, 26, EASE.inOut);
  const brushVis = frame > tRepair + 4 && frame < tRepair + 130 ? 1 : 0;
  const bx = PL + (heal / 800) * PW;
  const by = PT + PH * (0.5 + 0.34 * Math.sin(heal / 44));
  const bounce = frame > tNew ? 1 + Math.sin(prog(frame, tNew, 20) * Math.PI) * 0.03 : 1;
  const chipsOut = prog(frame, tNew - 6, 10, EASE.in);

  return (
    <AbsoluteFill>
      <Paper frame={frame} tint={BRAND.picwish} tint2={BRAND.picwishLight} />
      <Dust frame={frame} count={12} seed={31} color={BRAND.picwish} />

      {/* ghost numeral */}
      <div style={{ position: "absolute", left: 1130, top: -60, fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 900, lineHeight: 1.3, color: BRAND.picwish, opacity: 0.07 * introFade }}>৩</div>

      {/* logo tile – travels from hero position to the corner */}
      <div style={{ position: "absolute", left: logoX, top: logoY, transform: `scale(${move > 0 ? 1 : logoIn})`, transformOrigin: "center" }}>
        {move === 0 ? (
          <>
            {[1, 2].map((k) => (
              <div key={k} style={{ position: "absolute", left: 165 - (330 + k * 150) / 2, top: 165 - (330 + k * 150) / 2, width: 330 + k * 150, height: 330 + k * 150, borderRadius: "50%", border: `3px solid ${BRAND.picwish}`, opacity: 0.22 / k }} />
            ))}
          </>
        ) : null}
        <LogoTile src="picwish.png" size={logoSize} plate shadow={SHADOW.lift} />
      </div>
      {move > 0.6 ? (
        <div style={{ position: "absolute", left: 210, top: 62, fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 60, lineHeight: 1.4, color: COLORS.primary, opacity: prog(frame, tIntroOut + 20, 10) }}>PicWish</div>
      ) : null}

      {/* intro text */}
      <div style={{ position: "absolute", left: 960, top: 230, opacity: introFade, transform: `translateX(${move * -60}px)` }}>
        <div style={{ width: 120, height: 120, borderRadius: "50%", background: COLORS.primary, color: COLORS.bg, fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 80, lineHeight: "130px", textAlign: "center", transform: `scale(${sp(frame, 4, SPRING.pop)})` }}>৩</div>
        <div style={{ marginTop: 18 }}>
          <Words text="PicWish" frame={frame} start={6} size={200} weight={700} color={COLORS.primary} lineHeight={1.2} wordStyle={() => ({ color: BRAND.picwish })} />
        </div>
        <div
          style={{
            marginTop: 40, display: "inline-flex", alignItems: "center", gap: 22, padding: "10px 44px 10px 28px", background: COLORS.white, borderRadius: 100,
            boxShadow: SHADOW.soft, border: `2px solid ${COLORS.line}`, transform: `translateY(${(1 - urlIn) * 50}px)`, opacity: Math.min(1, urlIn * 2),
          }}
        >
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: BRAND.picwish }} />
          <div style={{ fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 86, color: COLORS.primary, lineHeight: 1.25, minWidth: 480 }}>
            {url.slice(0, typed)}
            <span style={{ display: "inline-block", width: 6, height: 66, background: COLORS.accent, marginLeft: 4, verticalAlign: "middle", opacity: caret && typed < url.length + 3 ? 1 : 0 }} />
          </div>
        </div>
      </div>

      {/* chips: scratches & damaged parts */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 120, display: "flex", justifyContent: "center", gap: 36, opacity: 1 - chipsOut }}>
        {frame >= tRepair - 2 ? (
          <>
            <Chip text="দাগ" done={heal > 560} frame={frame} start={tRepair} doneAt={tRepair + 90} />
            <Chip text="নষ্ট অংশ" done={heal > 790} frame={frame} start={tRepair + 22} doneAt={tRepair + 128} />
          </>
        ) : null}
      </div>

      {/* final title */}
      <div style={{ position: "absolute", left: 0, right: 0, top: 96 }}>
        <Words text="একদম নতুনের মতো" frame={frame} start={tNew} size={104} weight={700} align="center" marks={{ 1: BRAND.picwishLight }} lineHeight={1.3} />
      </div>

      {/* repair stage */}
      {frame >= tRepair - 6 ? (
        <div style={{ position: "absolute", left: PL - 14, top: PT - 14 + (1 - photoIn) * 700, padding: 14, background: "#fff", borderRadius: 30, boxShadow: SHADOW.lift, transform: `scale(${bounce})`, transformOrigin: "center" }}>
          <div style={{ position: "relative", width: PW, height: PH, borderRadius: 18, overflow: "hidden" }}>
            <OldPhoto width={PW} blur={0.6} tone={lerp(0.3, 1, nw)} stainClear={nw >= 1 ? 1 : heal / 800} healX={nw >= 1 ? 820 : heal} haze={0.25 * (1 - nw)} />
            {/* soft glow along the repair line */}
            {brushVis ? <div style={{ position: "absolute", top: 0, bottom: 0, left: (heal / 800) * PW - 70, width: 140, background: `linear-gradient(90deg, transparent, ${BRAND.picwishLight}aa, transparent)` }} /> : null}
            {/* new-look sweep */}
            <div style={{ position: "absolute", top: -30, bottom: -30, width: 240, left: lerp(-300, PW + 100, nw), transform: "skewX(-18deg)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,.85), transparent)", opacity: frame > tNew && nw < 1 ? 1 : 0 }} />
          </div>
        </div>
      ) : null}

      {/* brush */}
      {brushVis ? (
        <div style={{ position: "absolute", left: bx - 60, top: by - 60, width: 120, height: 120, borderRadius: "50%", border: `6px solid ${BRAND.picwish}`, background: `${BRAND.picwishLight}66`, boxShadow: SHADOW.glow(BRAND.picwish), transform: `scale(${1 + Math.sin(frame / 4) * 0.06})` }}>
          <div style={{ position: "absolute", left: 48, top: 48, width: 24, height: 24, borderRadius: "50%", background: BRAND.picwish }} />
        </div>
      ) : null}

      <Sparkle x={PL + PW * 0.84} y={PT + PH * 0.18} size={110} frame={frame} start={tNew + 6} color="#fff" />
      <Sparkle x={PL + PW * 0.2} y={PT + PH * 0.7} size={80} frame={frame} start={tNew + 12} color="#fff" />
      <Sparkle x={PL + PW * 0.55} y={PT + PH * 0.1} size={64} frame={frame} start={tNew + 18} color="#FFE9B0" />

      <SfxList
        items={[
          [0, "whoosh_wide", 0.4],
          [4, "pop", 0.45],
          [6, "pluck", 0.3],
          [at(32.925, 6), "swipe", 0.25],
          ...ticks,
          [tUrl + 26, "chime_soft", 0.35],
          [tIntroOut + 2, "whoosh_fall", 0.25],
          [tRepair, "pop", 0.35],
          [tRepair + 6, "whoosh_rise", 0.22],
          [tRepair + 22, "click", 0.4],
          [tRepair + 90, "pluck_hi", 0.3],
          [tRepair + 128, "pluck", 0.3],
          [tNew, "sparkle", 0.4],
          [tNew + 4, "chime", 0.4],
        ]}
      />
    </AbsoluteFill>
  );
};
