import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Paper } from "../components/Backgrounds/Paper";
import { Dust } from "../components/Effects/Dust";
import { Sparkle } from "../components/Effects/Sparkle";
import { Ring } from "../components/Infographics/Ring";
import { OldPhoto, PHOTO_RATIO, STAINS } from "../components/Photo/OldPhoto";
import { LogoTile } from "../components/UI/LogoTile";
import { SfxList } from "../components/UI/Sfx";
import { Words } from "../components/Typography/Words";
import { BRAND, COLORS, EASE, FONT_FAMILY, SHADOW, SPRING } from "../theme";
import { lerp, prog, sp, vis } from "../utils/animations";
import { makeAt } from "../utils/timing";

const at = makeAt("demo");

const W = 1120;
const H = W * PHOTO_RATIO;
const LEFT = 120;
const TOP = 250;

/** Title group that swaps with a mask reveal; exits by fading up. */
const Title: React.FC<{ frame: number; text: string; start: number; end: number; marks?: Record<number, string>; color?: string; size?: number }> = ({
  frame, text, start, end, marks, color = COLORS.primary, size = 92,
}) => {
  const out = prog(frame, end - 8, 8, EASE.in);
  return (
    <div style={{ position: "absolute", left: LEFT, top: 74, opacity: 1 - out, transform: `translateY(${-out * 30}px)` }}>
      <Words text={text} frame={frame} start={start} size={size} weight={700} marks={marks} color={color} lineHeight={1.3} />
    </div>
  );
};

/** Scene 3 – upload → beam compare (5 sec) → crystal clear → blemishes disappear. */
export const Scene03Demo: React.FC = () => {
  const frame = useCurrentFrame();

  const tA = at(9.977, 4);
  const tB = at(12.493, 3);
  const tStamp = tB + 72;
  const tC = at(15.418, 4);
  const tD = at(17.109, 4);

  // photo drop-in
  const drop = sp(frame, tA, SPRING.big);
  const upload = prog(frame, tA + 8, 46, EASE.inOut);
  const dz = 1 - prog(frame, tA + 4, 14);

  // beam compare
  const bx = prog(frame, tB, 70, EASE.inOut);
  const hdAll = frame >= tB + 70;

  // crystal clear
  const sweepC = prog(frame, tC, 26, EASE.inOut);
  const bracket = sp(frame, tC, SPRING.big);

  // push-in & stain clear
  const push = prog(frame, tD, 34, EASE.inOut);
  const scale = 1 + 0.85 * push;
  const clearP = prog(frame, tD + 18, 44, EASE.linear);

  // stepper
  const active = frame < tB - 4 ? 0 : frame < tD - 2 ? 1 : 2;
  const stepLabel = ["আপলোড", "HD", "দাগ মুক্ত"];
  const stepSub = ["", "৫ সেকেন্ড", ""];

  return (
    <AbsoluteFill>
      <Paper frame={frame} tint={BRAND.remini} tint2={COLORS.secondary} />
      <Dust frame={frame} count={10} seed={21} color={BRAND.remini} />

      {/* titles */}
      <Title frame={frame} text="আপলোড করো" start={tA} end={tB - 2} marks={{ 0: BRAND.remini }} />
      <Title frame={frame} text="৫ সেকেন্ডে HD" start={tB} end={tC - 2} marks={{ 2: COLORS.accent }} />
      <Title frame={frame} text="Crystal Clear" start={tC} end={tD - 2} color={COLORS.secondary} size={104} />
      <Title frame={frame} text="মুখের দাগও চলে গেছে" start={tD} end={9999} marks={{ 0: COLORS.accent }} size={84} />

      {/* drop-zone outline */}
      <div
        style={{
          position: "absolute", left: LEFT - 20, top: TOP - 20, width: W + 40, height: H + 40, borderRadius: 40, border: `4px dashed ${COLORS.primary}`,
          opacity: 0.5 * dz * Math.min(1, frame / 8), display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24"><path d="M12 16V5M7 9l5-5 5 5M4 19h16" stroke={COLORS.primary} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </div>

      {/* photo stage */}
      <div
        style={{
          position: "absolute", left: LEFT - 10, top: TOP - 10 + (1 - drop) * 760, width: W + 20, height: H + 20, borderRadius: 34, background: COLORS.white,
          boxShadow: SHADOW.lift, overflow: "hidden", padding: 10, boxSizing: "border-box",
        }}
      >
        <div style={{ position: "relative", width: W, height: H, borderRadius: 24, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, transform: `scale(${scale})`, transformOrigin: "45% 46%" }}>
            {/* before */}
            {!hdAll ? <OldPhoto width={W} blur={14} tone={0} scratches={1} haze={1} /> : null}
            {/* after (revealed by the beam) */}
            <div style={{ position: "absolute", inset: 0, clipPath: hdAll ? undefined : `inset(0 ${(1 - bx) * 100}% 0 0)` }}>
              <OldPhoto width={W} blur={0} tone={1} stainClear={clearP} />
            </div>
            {STAINS.map((s, i) => (
              <Sparkle key={i} x={(s.x / 800) * W} y={(s.y / 520) * H} size={86} frame={frame} start={tD + 18 + Math.round((i / 5) * 44) + 4} color="#fff" dur={18} />
            ))}
          </div>

          {/* crystal-clear sweep */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            <div style={{ position: "absolute", top: -40, bottom: -40, width: 260, left: lerp(-320, W + 100, sweepC), transform: "skewX(-18deg)", background: "linear-gradient(90deg, transparent, rgba(255,255,255,.8), transparent)", opacity: frame > tC ? 1 : 0 }} />
          </div>
          <Sparkle x={W * 0.2} y={H * 0.22} size={70} frame={frame} start={tC + 6} />
          <Sparkle x={W * 0.82} y={H * 0.3} size={100} frame={frame} start={tC + 12} />
          <Sparkle x={W * 0.6} y={H * 0.78} size={64} frame={frame} start={tC + 18} color="#FFE9B0" />

          {/* beam divider + handle */}
          {frame >= tB && bx < 1 ? (
            <div style={{ position: "absolute", top: 0, bottom: 0, left: bx * W - 3, width: 6, background: COLORS.white, boxShadow: "0 0 30px rgba(255,255,255,.9)" }}>
              <div style={{ position: "absolute", top: "50%", left: -34, width: 74, height: 74, marginTop: -37, borderRadius: "50%", background: COLORS.white, boxShadow: SHADOW.soft, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="44" height="44" viewBox="0 0 24 24"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5" stroke={COLORS.primary} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
            </div>
          ) : null}

          {/* before / after tags */}
          <div style={{ position: "absolute", left: 24, top: 22, padding: "2px 22px 8px", borderRadius: 30, background: "rgba(31,42,68,.78)", color: "#fff", fontFamily: FONT_FAMILY, fontWeight: 600, fontSize: 38, lineHeight: 1.4, opacity: prog(frame, tA + 40, 10) * (1 - prog(frame, tB + 60, 8)) }}>
            ঘোলা
          </div>
        </div>

        {/* viewfinder brackets (Crystal Clear) */}
        {[0, 1, 2, 3].map((i) => {
          const right = i % 2 === 1, bottom = i >= 2;
          return (
            <div
              key={i}
              style={{
                position: "absolute", width: 90, height: 90, [right ? "right" : "left"]: 24, [bottom ? "bottom" : "top"]: 24,
                [right ? "borderRight" : "borderLeft"]: "10px solid #fff", [bottom ? "borderBottom" : "borderTop"]: "10px solid #fff",
                borderRadius: 14, opacity: bracket * vis(frame, tC, tD, 4, 12), transform: `scale(${lerp(1.3, 1, bracket)})`, filter: "drop-shadow(0 4px 8px rgba(0,0,0,.25))",
              }}
            />
          );
        })}

        {/* HD stamp */}
        <div
          style={{
            position: "absolute", right: 36, top: 36, padding: "0 30px 6px", borderRadius: 18, background: COLORS.accent, color: "#fff", fontFamily: FONT_FAMILY, fontWeight: 700,
            fontSize: 84, lineHeight: 1.3, transform: `rotate(-8deg) scale(${frame < tStamp ? 0 : sp(frame, tStamp, SPRING.pop)})`, boxShadow: SHADOW.soft, opacity: 1 - prog(frame, tD - 4, 8),
          }}
        >
          HD
        </div>
      </div>

      {/* progress bar */}
      <div style={{ position: "absolute", left: LEFT, top: TOP + H + 38, width: W, height: 14, borderRadius: 7, background: COLORS.line, opacity: 1 - prog(frame, tB - 6, 8) }}>
        <div style={{ width: `${upload * 100}%`, height: "100%", borderRadius: 7, background: BRAND.remini }} />
      </div>

      {/* right: brand + stepper */}
      <div style={{ position: "absolute", left: 1370, top: 70, display: "flex", alignItems: "center", gap: 22, opacity: prog(frame, 4, 12) }}>
        <LogoTile src="remini.png" size={96} />
        <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 60, color: COLORS.primary, lineHeight: 1.4 }}>Remini</div>
      </div>
      <div style={{ position: "absolute", left: 1370, top: 280 }}>
        {[0, 1, 2].map((i) => {
          const done = active > i, on = active === i;
          const rowIn = sp(frame, 10 + i * 5, SPRING.ui);
          return (
            <div key={i} style={{ height: 230, position: "relative", opacity: rowIn, transform: `translateX(${(1 - rowIn) * 50}px)` }}>
              {i < 2 ? <div style={{ position: "absolute", left: 47, top: 106, width: 6, height: 130, background: COLORS.line, borderRadius: 3 }}><div style={{ width: "100%", height: `${(done ? 1 : 0) * 100}%`, background: COLORS.secondary, borderRadius: 3 }} /></div> : null}
              <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                <div style={{ width: 100, height: 100 }}>
                  {i === 1 && on ? (
                    <Ring size={100} progress={bx} stroke={12} color={COLORS.accent}>
                      <span style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 48, color: COLORS.primary, lineHeight: 1.3 }}>৫</span>
                    </Ring>
                  ) : (
                    <div
                      style={{
                        width: 100, height: 100, borderRadius: "50%", boxSizing: "border-box", background: done ? COLORS.secondary : on ? COLORS.primary : "transparent",
                        border: `5px solid ${done ? COLORS.secondary : on ? COLORS.primary : COLORS.line}`, display: "flex", alignItems: "center", justifyContent: "center",
                        transform: `scale(${on ? 1.08 : 1})`,
                      }}
                    >
                      {done ? (
                        <svg width="48" height="48" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      ) : (
                        <span style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 46, color: on ? COLORS.bg : COLORS.muted, lineHeight: 1.3 }}>{["১", "২", "৩"][i]}</span>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ fontFamily: FONT_FAMILY, fontWeight: 700, fontSize: 52, color: on || done ? COLORS.primary : COLORS.muted, lineHeight: 1.4 }}>{stepLabel[i]}</div>
                  {stepSub[i] ? <div style={{ fontFamily: FONT_FAMILY, fontWeight: 500, fontSize: 36, color: COLORS.muted, lineHeight: 1.3, opacity: active >= i ? 1 : 0 }}>{stepSub[i]}</div> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <SfxList
        items={[
          [0, "whoosh_fast", 0.35],
          [tA, "swipe", 0.3],
          [tA + 14, "pop", 0.4],
          [tB, "whoosh_rise", 0.3],
          [tStamp, "stamp", 0.4],
          [tC, "chime", 0.35],
          [tC + 6, "sparkle", 0.25],
          [tD, "whoosh_low", 0.2],
          ...STAINS.map((_, i) => [tD + 22 + Math.round((i / 5) * 44), "pop", 0.22] as [number, string, number]),
          [tD + 66, "chime_soft", 0.35],
        ]}
      />
    </AbsoluteFill>
  );
};

void Words;
