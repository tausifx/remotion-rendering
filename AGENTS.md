# AGENTS.md

## Trigger

When the user sends the single word **`start`**, run the full pipeline below
without asking for confirmation: render every project's video, then commit and
push the results to GitHub.

## Projects

This repo contains three independent Remotion projects:

| Folder | Render script |
| --- | --- |
| `photo-hd-tools-video` | `npm run render` |
| `proj` | `npm run build` |
| `toolsx-ielts` | `npm run render` |

Each project defines its own render script. **Always read that project's
`package.json` first** and use the script it declares — do not assume the
script name is the same across projects, and update this table if a script
changes.

## Pipeline

1. **Check dependencies.** If a project has no `node_modules/`, run
   `npm install` in that project folder.
2. **Check Chromium system libraries.** Remotion's headless Chrome needs
   these packages. If a render fails with `error while loading shared
   libraries` (for example `libatk-1.0.so.0`), install them:

   ```bash
   sudo apt-get update -qq
   sudo apt-get install -y -qq libnss3 libatk1.0-0t64 libatk-bridge2.0-0t64 \
     libcups2t64 libdrm2 libxkbcommon0 libxcomposite1 libxdamage1 libxfixes3 \
     libxrandr2 libgbm1 libpango-1.0-0 libcairo2 libasound2t64 libatspi2.0-0 \
     libx11-xcb1 libxss1
   ```

   Then retry the render.
3. **Render each project** from inside its own folder, using the script from
   its `package.json`:

   ```bash
   cd photo-hd-tools-video && npm run render
   cd ../proj && npm run build
   cd ../toolsx-ielts && npm run render
   ```

   Outputs are written to each project's `out/video.mp4`. Renders can take
   several minutes; allow a long timeout and do not interrupt them.
4. **Verify the outputs.** Confirm each `out/video.mp4` exists and is
   non-empty, and check duration/resolution with:

   ```bash
   npx remotion ffprobe out/video.mp4
   ```

   Expected: 1920x1080, 30fps, H.264.
5. **Commit and push.** From the repo root:

   ```bash
   git add -A
   git commit -m "Render all project videos"
   git push origin main
   ```

   Use a commit message that reflects what actually changed (for example
   mention source edits if the render picked up code changes).

## Reporting

After the pipeline finishes, report to the user:

- the script used for each project,
- each output path, file size, and duration,
- the commit hash and that it was pushed to `origin/main`.

If any step fails, report the exact error and which project it came from
instead of silently skipping it.
