import {FPS} from '../theme';

/** SRT = single source of truth. Times in seconds. */
export type Cue = {s: number; e: number; text: string};
export const CUES: Cue[] = [
  {s: 0.131, e: 1.477, text: 'আইএলটিএস স্পিকিং-এ ভয় পাও?'},
  {s: 2.014, e: 4.0, text: 'রাত ২টায় প্র্যাকটিস করার পার্টনার নাই?'},
  {s: 4.494, e: 6.762, text: 'এই তিনটা এআই ২৪ ঘণ্টা ফ্রি।'},
  {s: 7.35, e: 8.888, text: 'প্রথমে: এলসা স্পিক,'},
  {s: 9.417, e: 10.62, text: 'এলসাস্পিক ডট কম।'},
  {s: 11.035, e: 12.535, text: 'এটা তোমার উচ্চারণ ভুল ধরবে।'},
  {s: 13.041, e: 16.571, text: 'তুমি অ্যাপল বললে ও বলে দেবে তুমি ৮০ শতাংশ ভুল বলেছো,'},
  {s: 16.974, e: 18.366, text: 'আর সঠিকটা শিখিয়ে দেবে।'},
  {s: 18.81, e: 20.269, text: 'আইএলটিএস-এর জন্য বেস্ট।'},
  {s: 20.883, e: 23.254, text: 'দ্বিতীয়টা: চ্যাটজিপিটি ভয়েস মোড।'},
  {s: 23.738, e: 26.081, text: 'ওকে বলো—ইউ আর মাই আইএলটিএস এক্সামিনার।'},
  {s: 26.565, e: 27.698, text: 'ও তোমাকে প্রশ্ন করবে,'},
  {s: 27.966, e: 28.791, text: 'তুমি উত্তর দেবে,'},
  {s: 29.08, e: 30.521, text: 'ও তোমার ব্যান্ড স্কোর বলে দেবে।'},
  {s: 30.912, e: 32.546, text: 'একদম রিয়েল পরীক্ষার মতো।'},
  {s: 33.182, e: 34.895, text: 'আর তিন নম্বর: কল অ্যানি।'},
  {s: 35.384, e: 36.543, text: 'এটা একটা মেয়ে এআই,'},
  {s: 36.9, e: 40.179, text: 'যার সাথে তুমি ফোনে কথা বলার মতো আইএলটিএস প্র্যাকটিস করতে পারবে।'},
  {s: 40.556, e: 41.288, text: 'লজ্জা নাই,'},
  {s: 41.602, e: 42.918, text: '২৪ ঘণ্টা প্র্যাকটিস।'},
  {s: 43.462, e: 45.2, text: 'মনে রাখবে, এলসা স্পিক পেইড,'},
  {s: 45.798, e: 47.442, text: 'কিন্তু প্রতিদিন ফ্রি লেসন আছে।'},
  {s: 47.871, e: 51.187, text: 'চ্যাটজিপিটি ভয়েস আর কল অ্যানিতে ফ্রিতে শুরু করতে পারবে,'},
  {s: 51.458, e: 52.247, text: 'ফ্রি কোটা আছে।'},
  {s: 52.687, e: 54.994, text: 'আইএলটিএস-এর লিংক লাগলে কমেন্টে আইএলটিএস লিখো।'},
  {s: 55.308, e: 56.696, text: 'আমি ফুল লিস্ট পাঠিয়ে দিচ্ছি।'},
  {s: 57.137, e: 58.749, text: 'টুলসএক্স বাংলা ফলো দিয়ে রাখো।'},
];
export const cue = (n: number): Cue => CUES[n - 1];

/** Visuals enter this many frames before their narration. */
export const LEAD = 6;
export const TAIL = 22;
export const TOTAL_FRAMES = Math.round(cue(27).e * FPS) + TAIL;

export type TransitionKind =
  | 'none' | 'push' | 'circle' | 'wipe' | 'split' | 'liquid' | 'perspective' | 'sweep';
export type SceneDef = {
  id: string;
  first: number; // first SRT cue of the scene
  tr: number; // incoming transition length (frames)
  kind: TransitionKind;
  dir?: 'up' | 'left' | 'right' | 'down';
  cx?: number;
  cy?: number;
};

export const SCENE_DEFS: SceneDef[] = [
  {id: 's01', first: 1, tr: 0, kind: 'none'},
  {id: 's02', first: 3, tr: 16, kind: 'push'},
  {id: 's03', first: 4, tr: 18, kind: 'circle', cx: 50, cy: 50},
  {id: 's04', first: 6, tr: 16, kind: 'wipe', dir: 'up'},
  {id: 's05', first: 10, tr: 20, kind: 'circle', cx: 50, cy: 40},
  {id: 's06', first: 11, tr: 14, kind: 'push'},
  {id: 's07', first: 12, tr: 16, kind: 'wipe', dir: 'left'},
  {id: 's08', first: 15, tr: 16, kind: 'split'},
  {id: 's09', first: 16, tr: 20, kind: 'liquid'},
  {id: 's10', first: 17, tr: 16, kind: 'circle', cx: 30, cy: 50},
  {id: 's11', first: 18, tr: 18, kind: 'perspective'},
  {id: 's12', first: 19, tr: 14, kind: 'sweep'},
  {id: 's13', first: 21, tr: 16, kind: 'wipe', dir: 'up'},
  {id: 's14', first: 23, tr: 16, kind: 'wipe', dir: 'left'},
  {id: 's15', first: 25, tr: 16, kind: 'circle', cx: 50, cy: 78},
  {id: 's16', first: 27, tr: 18, kind: 'push'},
];

export type SceneId = (typeof SCENE_DEFS)[number]['id'];

export const SCENES = SCENE_DEFS.map((d, i) => {
  const from = i === 0 ? 0 : Math.round(cue(d.first).s * FPS) - LEAD;
  return {...d, from};
}).map((d, i, arr) => {
  const nextFrom = i < arr.length - 1 ? arr[i + 1].from : TOTAL_FRAMES;
  const nextTr = i < arr.length - 1 ? arr[i + 1].tr : 0;
  return {...d, to: nextFrom, duration: nextFrom - d.from + nextTr};
});

export const sceneFrom = (id: string): number => SCENES.find((s) => s.id === id)!.from;
