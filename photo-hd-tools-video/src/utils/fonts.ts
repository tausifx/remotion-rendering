import { continueRender, delayRender, staticFile } from "remotion";

const BN = "U+0951-0952,U+0964-0965,U+0980-09FE,U+1CF7,U+200C-200D,U+20B9,U+25CC";
const LATIN =
  "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";

let started = false;

/** Loads Hind Siliguri from /public/fonts (fully offline) */
export const loadFonts = () => {
  if (started || typeof document === "undefined") return;
  started = true;
  const handle = delayRender("fonts");
  const jobs: Promise<unknown>[] = [];
  [400, 500, 600, 700].forEach((w) => {
    (["bengali", "latin"] as const).forEach((sub) => {
      const face = new FontFace(
        "Hind Siliguri",
        `url(${staticFile(`fonts/hind-siliguri-${sub}-${w}-normal.woff2`)}) format("woff2")`,
        { weight: String(w), unicodeRange: sub === "bengali" ? BN : LATIN }
      );
      jobs.push(
        face.load().then((f) => {
          (document.fonts as unknown as { add: (f: FontFace) => void }).add(f);
        })
      );
    });
  });
  Promise.all(jobs)
    .catch((e) => console.error("Font load failed", e))
    .finally(() => continueRender(handle));
};
