import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {SFX, SFX_DUR} from '../../sfx';

export const SfxTrack: React.FC = () => (
  <>
    {SFX.map((e, i) => (
      <Sequence key={i} from={e.frame} durationInFrames={(SFX_DUR[e.name] ?? 20) + 4}>
        <Audio src={staticFile(`sfx/${e.name}.wav`)} volume={e.vol} />
      </Sequence>
    ))}
  </>
);
