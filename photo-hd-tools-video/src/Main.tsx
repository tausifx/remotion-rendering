import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { PreviewAudio } from "./components/UI/PreviewAudio";
import { SceneShell, TransitionKind } from "./components/Transitions/SceneShell";
import { BRAND, COLORS } from "./theme";
import { loadFonts } from "./utils/fonts";
import { OVERLAP, SCENES, SceneKey, sceneFrom, sceneLen } from "./utils/timing";
import { Scene01Hook } from "./scenes/Scene01Hook";
import { Scene02Remini } from "./scenes/Scene02Remini";
import { Scene03Demo } from "./scenes/Scene03Demo";
import { Scene04Upscale } from "./scenes/Scene04Upscale";
import { Scene05Features } from "./scenes/Scene05Features";
import { Scene06PicWish } from "./scenes/Scene06PicWish";
import { Scene07Recap } from "./scenes/Scene07Recap";
import { Scene08Cta } from "./scenes/Scene08Cta";

loadFonts();

type Entry = { key: SceneKey; C: React.FC; kind: TransitionKind; color: string; origin?: [number, number] };

const LIST: Entry[] = [
  { key: "hook", C: Scene01Hook, kind: "none", color: COLORS.primary },
  { key: "remini", C: Scene02Remini, kind: "circle", color: BRAND.remini, origin: [68, 48] },
  { key: "demo", C: Scene03Demo, kind: "wipeX", color: BRAND.remini },
  { key: "upscale", C: Scene04Upscale, kind: "wipeY", color: BRAND.upscale },
  { key: "features", C: Scene05Features, kind: "diag", color: BRAND.upscale },
  { key: "picwish", C: Scene06PicWish, kind: "circle", color: BRAND.picwish, origin: [50, 50] },
  { key: "recap", C: Scene07Recap, kind: "diag", color: COLORS.accent },
  { key: "cta", C: Scene08Cta, kind: "push", color: COLORS.primary },
];

export const Main: React.FC = () => (
  <AbsoluteFill style={{ background: COLORS.bg }}>
    {LIST.map(({ key, C, kind, color, origin }, i) => (
      <Sequence key={key} from={sceneFrom(key)} durationInFrames={sceneLen(key) + (i < LIST.length - 1 ? OVERLAP : 0)} name={key}>
        <SceneShell kind={kind} color={color} origin={origin}>
          <C />
        </SceneShell>
      </Sequence>
    ))}
    <PreviewAudio />
  </AbsoluteFill>
);

void SCENES; void BRAND;
