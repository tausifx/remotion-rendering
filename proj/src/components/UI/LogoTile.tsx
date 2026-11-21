import React from 'react';
import {Img, staticFile} from 'remotion';
import {C, SHADOW} from '../../theme';

export const LogoTile: React.FC<{src: string; size: number; white?: boolean; glow?: string}> = ({src, size, white = true, glow}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.22, background: white ? C.accent : 'transparent', overflow: 'hidden', boxShadow: glow ?? SHADOW.soft, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
    <Img src={staticFile(src)} style={{width: white ? '78%' : '100%', height: white ? '78%' : '100%', objectFit: 'contain'}} />
  </div>
);
