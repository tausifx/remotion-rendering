import React, {useEffect, useState} from 'react';
import {Audio, continueRender, delayRender, getRemotionEnvironment, staticFile} from 'remotion';
import {VOICEOVER} from '../../theme';

// Plays public/voiceover.mp3 only if it exists and the flag allows it.
export const PreviewAudio: React.FC = () => {
  const env = getRemotionEnvironment();
  const enabled = env.isRendering ? VOICEOVER.render : VOICEOVER.studioPreview;
  const [handle] = useState(() => (enabled ? delayRender('voiceover-check') : null));
  const [exists, setExists] = useState(false);
  useEffect(() => {
    if (!enabled || handle === null) return;
    fetch(staticFile('voiceover.mp3'), {method: 'HEAD'})
      .then((r) => setExists(r.ok && (r.headers.get('content-type') || '').startsWith('audio')))
      .catch(() => setExists(false))
      .finally(() => continueRender(handle));
  }, [enabled, handle]);
  if (!enabled || !exists) return null;
  return <Audio src={staticFile('voiceover.mp3')} />;
};
