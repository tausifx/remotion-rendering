# Old Photo HD Tools – Remotion project

Composition ID: `Main` · 1920×1080 · 30 FPS · 58 s (timing source: the SRT)

```bash
npm install
npx remotion studio
npx remotion render src/index.ts Main out/video.mp4
```

- All colours / springs / easings: `src/theme.ts`
- Scene timing (seconds from the SRT): `src/utils/timing.ts`
- SFX (synthetic, regenerate with `python3 make_sfx.py`): `public/sfx/`
- Voiceover: drop `public/voiceover.mp3` in – it plays in Studio preview only (switches in `CONFIG`, `theme.ts`).
