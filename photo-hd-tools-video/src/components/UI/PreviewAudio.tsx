import React, { useEffect, useState } from "react";
import { Audio, getRemotionEnvironment, staticFile } from "remotion";
import { CONFIG } from "../../theme";

/**
 * Plays public/voiceover.mp3 – only if the file exists.
 * Studio preview: controlled by CONFIG.previewVoiceover
 * Render:         controlled by CONFIG.renderVoiceover (default OFF)
 */
export const PreviewAudio: React.FC = () => {
  const { isStudio, isRendering } = getRemotionEnvironment();
  const wanted = isRendering ? CONFIG.renderVoiceover : isStudio ? CONFIG.previewVoiceover : false;
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (!wanted) return;
    let alive = true;
    fetch(staticFile("voiceover.mp3"), { method: "HEAD" })
      .then((r) => alive && setExists(r.ok && (r.headers.get("content-type") || "").includes("audio")))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [wanted]);

  if (!wanted || !exists) return null;
  return <Audio src={staticFile("voiceover.mp3")} />;
};
