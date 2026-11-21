export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const sec = (s: number) => Math.round(s * FPS);

/** Total length comes from the last SRT cue (00:00:57,996) */
export const TOTAL_FRAMES = sec(58);

/** Frames the previous scene stays underneath while the next one transitions in */
export const OVERLAP = 18;
/** Transition length (frames) */
export const TRANS = 16;

/**
 * Scene boundaries in seconds. Every scene begins ~5-9 frames BEFORE its first
 * narration cue (SRT is the single timing source).
 */
export const SCENES = {
  hook: { from: 0, to: 5.95 }, //           cues 1-2
  remini: { from: 5.95, to: 9.75 }, //      cues 3-4
  demo: { from: 9.75, to: 18.8 }, //        cues 5-8
  upscale: { from: 18.8, to: 23.2 }, //     cues 9-10
  features: { from: 23.2, to: 30.6 }, //    cues 11-14
  picwish: { from: 30.6, to: 40.6 }, //     cues 15-18
  recap: { from: 40.6, to: 51.0 }, //       cues 19-21
  cta: { from: 51.0, to: 58 }, //           cues 22-24
} as const;

export type SceneKey = keyof typeof SCENES;

export const sceneFrom = (k: SceneKey) => sec(SCENES[k].from);
export const sceneLen = (k: SceneKey) => sec(SCENES[k].to) - sec(SCENES[k].from);

/**
 * Converts an absolute SRT time (seconds) into a frame local to the scene.
 * `lead` = visual enters a few frames before the narration word.
 */
export const makeAt =
  (k: SceneKey) =>
  (s: number, lead = 5) =>
    sec(s) - sceneFrom(k) - lead;
