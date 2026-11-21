import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {C} from './theme';
import {B} from './utils/timing';
import {Fonts} from './components/Audio/Fonts';
import {SfxTrack} from './components/Audio/SfxTrack';
import {PreviewAudio} from './components/Audio/PreviewAudio';
import {SceneTransition, TType} from './components/Transitions/SceneTransition';
import {Scene01} from './scenes/Scene01';
import {Scene02} from './scenes/Scene02';
import {Scene03} from './scenes/Scene03';
import {Scene04} from './scenes/Scene04';
import {Scene05} from './scenes/Scene05';
import {Scene06} from './scenes/Scene06';
import {Scene07} from './scenes/Scene07';
import {Scene08} from './scenes/Scene08';

const SCENES = [Scene01, Scene02, Scene03, Scene04, Scene05, Scene06, Scene07, Scene08];
// Boundary transitions. S3 -> S4 is a match-cut morph (no overlay).
const TRANSITIONS: {at: number; type: TType}[] = [
  {at: B[1], type: 'slash'},
  {at: B[2], type: 'circle'},
  {at: B[4], type: 'sweep'},
  {at: B[5], type: 'bars'},
  {at: B[6], type: 'shutter'},
  {at: B[7], type: 'iris'},
];

export const Main: React.FC = () => (
  <AbsoluteFill style={{background: C.bg}}>
    <Fonts />
    {SCENES.map((Scene, i) => (
      <Sequence key={i} from={B[i]} durationInFrames={B[i + 1] - B[i]}>
        <Scene />
      </Sequence>
    ))}
    {TRANSITIONS.map((t) => (
      <SceneTransition key={t.at} at={t.at} type={t.type} />
    ))}
    <SfxTrack />
    <PreviewAudio />
  </AbsoluteFill>
);
