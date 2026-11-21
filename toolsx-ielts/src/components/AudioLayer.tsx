import React, {useEffect, useState} from 'react';
import {Audio, continueRender, delayRender, getRemotionEnvironment, Sequence, staticFile} from 'remotion';
import {AUDIO, FPS} from '../theme';
import {SFX_CUES} from '../sfx';

/** Studio Preview + Render: premium synthetic SFX from public/sfx. */
export const SfxTrack: React.FC = () => {
  if (!AUDIO.sfx) return null;
  return (
    <>
      {SFX_CUES.map((c, i) => (
        <Sequence key={i} from={Math.round(c.t * FPS)} durationInFrames={FPS * 1}>
          <Audio src={staticFile(`sfx/${c.file}.wav`)} volume={Math.min(1, c.vol * AUDIO.sfxMasterVolume)} />
        </Sequence>
      ))}
    </>
  );
};

/** Plays public/voiceover.mp3 only if the file exists (flag-controlled). */
export const PreviewAudio: React.FC = () => {
  const {isRendering} = getRemotionEnvironment();
  const enabled = isRendering ? AUDIO.voiceoverInRender : AUDIO.voiceoverInPreview;
  const [handle] = useState(() => (enabled ? delayRender('voiceover-probe') : null));
  const [exists, setExists] = useState(false);
  useEffect(() => {
    if (handle === null) return;
    (async () => {
      try {
        const r = await fetch(staticFile('voiceover.mp3'), {method: 'HEAD'});
        setExists(r.ok && /audio|mpeg|octet/i.test(r.headers.get('content-type') || ''));
      } catch {
        setExists(false);
      }
      continueRender(handle);
    })();
  }, [handle]);
  if (!enabled || !exists) return null;
  return <Audio src={staticFile('voiceover.mp3')} />;
};
