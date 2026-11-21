import React, {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';

const FILES = [
  {family: 'Hind Siliguri', file: 'hind-siliguri-bengali-400-normal.woff2', weight: 400},
  {family: 'Hind Siliguri', file: 'hind-siliguri-bengali-500-normal.woff2', weight: 500},
  {family: 'Hind Siliguri', file: 'hind-siliguri-bengali-600-normal.woff2', weight: 600},
  {family: 'Hind Siliguri', file: 'hind-siliguri-bengali-700-normal.woff2', weight: 700},
  {family: 'Space Grotesk', file: 'space-grotesk-latin-500-normal.woff2', weight: 500},
  {family: 'Space Grotesk', file: 'space-grotesk-latin-700-normal.woff2', weight: 700},
];

export const Fonts: React.FC = () => {
  const [handle] = useState(() => delayRender('fonts'));
  useEffect(() => {
    Promise.all(
      FILES.map(async (f) => {
        const face = new FontFace(f.family, `url(${staticFile('fonts/' + f.file)})`, {weight: String(f.weight)});
        await face.load();
        (document.fonts as unknown as {add: (f: FontFace) => void}).add(face);
      })
    )
      .catch((e) => console.error('Font load failed', e))
      .finally(() => continueRender(handle));
  }, [handle]);
  return null;
};
