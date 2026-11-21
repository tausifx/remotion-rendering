import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {colors} from './theme';
import {FontLoader} from './components/FontLoader';
import {Stage} from './components/Backgrounds/Stage';
import {SceneShell} from './components/Transitions/SceneShell';
import {Tracker} from './components/UI/Tracker';
import {PreviewAudio, SfxTrack} from './components/AudioLayer';
import {SCENES} from './utils/timing';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';
import {Scene08} from './scenes/Scene08';
import {Scene09} from './scenes/Scene09';
import {Scene10} from './scenes/Scene10';
import {Scene11} from './scenes/Scene11';
import {Scene12} from './scenes/Scene12';
import {Scene13} from './scenes/Scene13';
import {Scene14} from './scenes/Scene14';
import {Scene15} from './scenes/Scene15';
import {Scene16} from './scenes/Scene16';

const COMPONENTS: Record<string, React.FC> = {
  s01: Scene01, s02: Scene02, s03: Scene03, s04: Scene04, s05: Scene05, s06: Scene06, s07: Scene07, s08: Scene08,
  s09: Scene09, s10: Scene10, s11: Scene11, s12: Scene12, s13: Scene13, s14: Scene14, s15: Scene15, s16: Scene16,
};

export const Main: React.FC = () => (
  <AbsoluteFill style={{background: colors.bg, color: colors.text, overflow: 'hidden'}}>
    <FontLoader />
    <Stage />
    {SCENES.map((s, i) => {
      const Comp = COMPONENTS[s.id];
      const post = i < SCENES.length - 1 ? SCENES[i + 1].tr : 0;
      return (
        <Sequence key={s.id} name={s.id} from={s.from} durationInFrames={s.duration}>
          <SceneShell def={s} duration={s.duration} post={post}>
            <Comp />
          </SceneShell>
        </Sequence>
      );
    })}
    <Tracker />
    <SfxTrack />
    <PreviewAudio />
  </AbsoluteFill>
);
