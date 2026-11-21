# ToolsX Bangla — IELTS Speaking AI Tools (Remotion)

Composition ID: `Main` · 1920×1080 · 30 FPS · ~59.5s · Color scheme: **Midnight Voice**

```bash
npm install                                        # dependencies
npx remotion studio                                # preview (SFX included)
npx remotion render src/index.ts Main out/video.mp4  # MP4 render
```

## Notes
- All timing comes from the SRT: `src/utils/timing.ts` (CUES). Scene start = first cue − 6 frames.
- Colors / easing / spring presets: `src/theme.ts`. SFX cue sheet: `src/sfx.ts` (files in `public/sfx/`).
- Voiceover: put `public/voiceover.mp3` — it plays in Studio automatically. Flags in `theme.ts → AUDIO`
  (`voiceoverInRender: false` by default).
- Fonts: for the best Bengali look, add `HindSiliguri-Regular/Medium/SemiBold/Bold.ttf` to `public/fonts/`
  (auto-detected). Without them a bundled offline fallback (FreeSans Bengali + DM Sans) is used.
- Logos in `public/logos/` (ChatGPT logo is the white version of the supplied file, for the dark background).
