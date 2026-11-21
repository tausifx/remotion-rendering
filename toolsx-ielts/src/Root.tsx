import React from 'react';
import {Composition} from 'remotion';
import {Main} from './Main';
import {FPS, HEIGHT, WIDTH} from './theme';
import {TOTAL_FRAMES} from './utils/timing';

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Main"
    component={Main}
    durationInFrames={TOTAL_FRAMES}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
  />
);
