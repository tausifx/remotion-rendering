import React, {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';

/**
 * Offline fonts. Drop HindSiliguri-Regular/Medium/SemiBold/Bold.ttf into public/fonts/
 * and they are picked up automatically; otherwise the bundled fallbacks are used.
 */
const HIND = [
  ['Regular', 400],
  ['Medium', 500],
  ['SemiBold', 600],
  ['Bold', 700],
] as const;

export const FontLoader: React.FC = () => {
  const [handle] = useState(() => delayRender('fonts'));
  const [probed, setProbed] = useState(false);
  const [hind, setHind] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      let ok = false;
      try {
        const r = await fetch(staticFile('fonts/HindSiliguri-Regular.ttf'), {method: 'HEAD'});
        ok = r.ok && /font|octet|ttf/i.test(r.headers.get('content-type') || '');
      } catch {
        ok = false;
      }
      if (alive) {
        setHind(ok);
        setProbed(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!probed) return;
    const loads = [
      document.fonts.load('400 40px "BnFallback"', 'আ'),
      document.fonts.load('400 40px "DM Sans"', 'Ag'),
      document.fonts.load('700 40px "DM Sans"', 'Ag'),
      ...(hind ? HIND.map(([, w]) => document.fonts.load(`${w} 40px "Hind Siliguri"`, 'আ')) : []),
    ];
    Promise.all(loads)
      .catch(() => undefined)
      .finally(() => continueRender(handle));
  }, [probed, hind, handle]);

  const css =
    `@font-face{font-family:'BnFallback';font-weight:400;src:url(${staticFile('fonts/FreeSans-Bengali.ttf')}) format('truetype');}` +
    `@font-face{font-family:'DM Sans';font-weight:100 1000;src:url(${staticFile('fonts/DMSans-Variable.ttf')}) format('truetype');}` +
    (hind
      ? HIND.map(
          ([n, w]) =>
            `@font-face{font-family:'Hind Siliguri';font-weight:${w};src:url(${staticFile(
              `fonts/HindSiliguri-${n}.ttf`,
            )}) format('truetype');}`,
        ).join('')
      : '');
  return <style>{css}</style>;
};
