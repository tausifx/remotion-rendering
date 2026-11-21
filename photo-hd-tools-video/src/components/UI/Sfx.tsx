import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

export type SfxItem = [frame: number, name: string, volume?: number];

/** Plays soft synthetic SFX (public/sfx/*.wav) at scene-local frames. Works in Studio preview and render. */
export const SfxList: React.FC<{ items: SfxItem[] }> = ({ items }) => (
  <>
    {items.map(([f, name, v = 0.5], i) => (
      <Sequence key={i} from={Math.max(0, Math.round(f))} durationInFrames={50} layout="none">
        <Audio src={staticFile(`sfx/${name}.wav`)} volume={v} />
      </Sequence>
    ))}
  </>
);
