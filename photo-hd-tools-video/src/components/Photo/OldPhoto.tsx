import React from "react";
import { clamp } from "../../utils/animations";

/** Photo coordinate space (viewBox 800×520) */
export const PHOTO_W = 800;
export const PHOTO_H = 520;
export const PHOTO_RATIO = PHOTO_H / PHOTO_W;

/** Blemishes on the faces – cleared one by one */
export const STAINS = [
  { x: 262, y: 258, r: 12 },
  { x: 312, y: 198, r: 10 },
  { x: 538, y: 268, r: 11 },
  { x: 497, y: 205, r: 9 },
  { x: 292, y: 296, r: 8 },
];

type Props = {
  width: number;
  /** css blur in px (relative to rendered size) */
  blur?: number;
  /** 0 = faded sepia, 1 = vivid colour */
  tone?: number;
  /** old film scratches, 0..1 */
  scratches?: number;
  /** face blemish visibility 0..1 (1 = all visible) */
  stainAmount?: number;
  /** sequential clean-up progress of the blemishes 0..1 */
  stainClear?: number;
  /** repair line in photo coordinates: damage is visible to the RIGHT of it. null = no damage layer */
  healX?: number | null;
  haze?: number;
};

const Face: React.FC<{ cx: number; cy: number; rx: number; ry: number; skin: string; eyeDx: number; eyeY: number }> = ({ cx, cy, rx, ry, skin, eyeDx, eyeY }) => (
  <g>
    <ellipse cx={cx - rx + 2} cy={cy + 6} rx={9} ry={15} fill={skin} />
    <ellipse cx={cx + rx - 2} cy={cy + 6} rx={9} ry={15} fill={skin} />
    <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={skin} />
    {[-1, 1].map((s) => (
      <g key={s}>
        <path d={`M${cx + s * eyeDx - 13} ${eyeY - 16} Q${cx + s * eyeDx} ${eyeY - 22} ${cx + s * eyeDx + 13} ${eyeY - 15}`} stroke="#2A1D17" strokeWidth="3.2" fill="none" strokeLinecap="round" />
        <ellipse cx={cx + s * eyeDx} cy={eyeY} rx={8} ry={4.6} fill="#fff" />
        <circle cx={cx + s * eyeDx} cy={eyeY} r={3.4} fill="#2A1D17" />
        <circle cx={cx + s * eyeDx + 1.2} cy={eyeY - 1.2} r={1} fill="#fff" />
      </g>
    ))}
    <path d={`M${cx} ${eyeY + 4} L${cx - 5} ${eyeY + 28} L${cx + 5} ${eyeY + 28}`} stroke="#B67C5A" strokeWidth="2.4" fill="none" strokeLinejoin="round" />
  </g>
);

export const OldPhoto: React.FC<Props> = ({ width, blur = 0, tone = 1, scratches = 0, stainAmount = 1, stainClear = 0, healX = null, haze = 0 }) => {
  const height = width * PHOTO_RATIO;
  const scale = width / PHOTO_W;
  const filter = `blur(${blur * scale}px) sepia(${0.9 * (1 - tone)}) saturate(${0.55 + 0.65 * tone}) contrast(${0.82 + 0.22 * tone}) brightness(${1.04})`;
  const scr = [
    [120, 0, 138, 520], [260, 0, 252, 300], [455, 40, 470, 520], [610, 0, 596, 410], [700, 120, 712, 520], [40, 200, 52, 520], [380, 0, 372, 190],
  ];

  return (
    <div style={{ width, height, overflow: "hidden", position: "relative", filter }}>
      <svg width={width} height={height} viewBox={`0 0 ${PHOTO_W} ${PHOTO_H}`} style={{ display: "block" }}>
        <defs>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#9DBFD2" />
            <stop offset="1" stopColor="#6E95AD" />
          </linearGradient>
          <radialGradient id="stain">
            <stop offset="0" stopColor="#6B4426" stopOpacity="0.75" />
            <stop offset="1" stopColor="#6B4426" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75">
            <stop offset="0.6" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.28" />
          </radialGradient>
          <clipPath id="suit"><path d="M120 520 C125 420 190 345 290 338 C390 345 455 420 460 520 Z" /></clipPath>
          <clipPath id="healClip"><rect x={healX ?? 0} y="-10" width={PHOTO_W + 20} height={PHOTO_H + 20} /></clipPath>
        </defs>

        {/* wall + fine wallpaper pattern */}
        <rect width={PHOTO_W} height={PHOTO_H} fill="url(#wall)" />
        {Array.from({ length: 27 }).map((_, i) => (
          <line key={i} x1={i * 30 + 8} y1="0" x2={i * 30 + 8} y2={PHOTO_H} stroke="#fff" strokeOpacity="0.11" strokeWidth="2" />
        ))}
        {Array.from({ length: 9 }).map((_, r) =>
          Array.from({ length: 14 }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={c * 60 + (r % 2) * 30 + 14} cy={r * 62 + 22} r="4" fill="#fff" fillOpacity="0.2" />
          ))
        )}
        {/* curtain */}
        <path d="M0 0 H92 C70 140 98 330 70 520 H0 Z" fill="#8E2B3A" />
        {[16, 34, 52, 70].map((x) => <path key={x} d={`M${x} 0 C${x - 8} 160 ${x + 10} 340 ${x - 2} 520`} stroke="#5E1624" strokeWidth="3" fill="none" />)}

        {/* man */}
        <path d="M120 520 C125 420 190 345 290 338 C390 345 455 420 460 520 Z" fill="#243B5E" />
        <g clipPath="url(#suit)">
          {Array.from({ length: 20 }).map((_, i) => <line key={i} x1={120 + i * 18} y1="330" x2={120 + i * 18} y2="520" stroke="#fff" strokeOpacity="0.16" strokeWidth="1.6" />)}
        </g>
        <rect x="270" y="296" width="40" height="52" fill="#D49E78" />
        <polygon points="290,338 252,344 290,438 328,344" fill="#F4F1EA" />
        <polygon points="290,356 279,378 290,470 301,378" fill="#C23B4A" />
        <path d="M252 344 L290 438 L238 400 Z M328 344 L290 438 L342 400 Z" fill="#1B2D49" />
        <Face cx={290} cy={232} rx={56} ry={66} skin="#E3AE86" eyeDx={19} eyeY={230} />
        <path d="M233 226 C228 150 352 150 347 226 C338 188 244 188 233 226Z" fill="#2A1D17" />
        <path d="M268 280 Q290 268 312 280 Q290 275 268 280Z" fill="#2A1D17" />
        <path d="M272 286 Q290 302 308 286" stroke="#8A3B2E" strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <circle cx="271" cy="230" r="17" stroke="#2A1D17" strokeWidth="2.4" fill="none" />
        <circle cx="309" cy="230" r="17" stroke="#2A1D17" strokeWidth="2.4" fill="none" />
        <path d="M288 228 Q290 224 292 228" stroke="#2A1D17" strokeWidth="2.4" fill="none" />

        {/* woman */}
        <path d="M385 520 C392 425 445 360 520 350 C595 360 648 425 655 520 Z" fill="#B83A58" />
        <path d="M420 520 C430 440 475 392 520 382 C565 392 610 440 620 520" stroke="#E3B04B" strokeWidth="11" fill="none" />
        {Array.from({ length: 9 }).map((_, i) => <circle key={i} cx={438 + i * 18} cy={510 - Math.abs(4 - i) * 7} r="3" fill="#F6D98A" />)}
        <rect x="500" y="314" width="40" height="44" fill="#D9A582" />
        <path d="M478 356 Q520 398 562 356" stroke="#E3B04B" strokeWidth="4.5" fill="none" />
        {[0, 1, 2, 3, 4].map((i) => <circle key={i} cx={490 + i * 10} cy={368 + Math.sin((i / 4) * Math.PI) * 18} r="3.4" fill="#F6D98A" />)}
        <Face cx={520} cy={246} rx={52} ry={62} skin="#E8B995" eyeDx={18} eyeY={242} />
        <path d="M466 246 C460 170 580 170 574 246 C562 206 478 206 466 246Z" fill="#1E1512" />
        <circle cx="520" cy="166" r="31" fill="#1E1512" />
        <path d="M520 176 L520 206" stroke="#E8B995" strokeWidth="4" />
        <circle cx="520" cy="214" r="4.4" fill="#C23B4A" />
        <circle cx="468" cy="272" r="6.5" fill="#F0C65A" />
        <circle cx="572" cy="272" r="6.5" fill="#F0C65A" />
        <path d="M502 292 Q520 306 538 292 Q520 296 502 292Z" fill="#B5384A" />
        <path d="M400 420 C460 408 570 470 650 520 L560 520 Z" fill="#D14F6C" fillOpacity="0.9" />

        {/* face blemishes (cleared sequentially) */}
        {STAINS.map((s, i) => {
          const c = clamp(stainClear * STAINS.length - i);
          const o = stainAmount * (1 - c);
          return o <= 0.01 ? null : <circle key={i} cx={s.x} cy={s.y} r={s.r * (1 + c * 0.5) * 1.5} fill="url(#stain)" opacity={o} />;
        })}

        <rect width={PHOTO_W} height={PHOTO_H} fill="url(#vig)" />
        {haze > 0 ? <rect width={PHOTO_W} height={PHOTO_H} fill="#F3EBDD" opacity={haze * 0.32} /> : null}

        {/* old film scratches */}
        {scratches > 0 ? (
          <g opacity={scratches}>
            {scr.map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={i % 2 ? "#fff" : "#2a1d17"} strokeOpacity={i % 2 ? 0.55 : 0.3} strokeWidth={i % 2 ? 1.8 : 1.4} />
            ))}
          </g>
        ) : null}

        {/* repairable damage layer (PicWish scene) */}
        {healX !== null ? (
          <g clipPath="url(#healClip)">
            <circle cx="170" cy="400" r="70" fill="url(#stain)" opacity="0.8" />
            <circle cx="450" cy="90" r="58" fill="url(#stain)" opacity="0.7" />
            <circle cx="640" cy="330" r="76" fill="url(#stain)" opacity="0.75" />
            <path d="M0 330 L120 296 L300 318 L520 286 L800 330" stroke="#fff" strokeOpacity="0.8" strokeWidth="3" fill="none" />
            <path d="M0 336 L120 302 L300 324 L520 292 L800 336" stroke="#000" strokeOpacity="0.18" strokeWidth="3" fill="none" />
            {scr.map(([x1, y1, x2, y2], i) => (
              <line key={i} x1={x1 + 18} y1={y1} x2={x2 + 24} y2={y2} stroke="#fff" strokeOpacity="0.8" strokeWidth="2.4" />
            ))}
            <path d="M628 0 L800 0 L800 160 L772 124 L750 150 L724 100 L692 120 L668 64 Z" fill="#EDE6DA" />
            <path d="M628 0 L668 64 L692 120 L724 100 L750 150 L772 124 L800 160" stroke="#fff" strokeWidth="4" fill="none" />
            <path d="M0 430 L70 520 L0 520 Z" fill="#EDE6DA" />
            <path d="M0 430 L70 520" stroke="#fff" strokeWidth="4" />
          </g>
        ) : null}
      </svg>
    </div>
  );
};
