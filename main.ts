// ai-excited-01 — "One Match. One Galaxy."
//
// The entry image is committed to this repo as entry.png. At run time this
// program simply copies that file to the output location the platform
// expects, so the run is fully deterministic: same input bytes in, same
// output bytes out, every time. No network, no randomness, no image work
// at runtime — the pixels were made during the build, not on the judge's
// clock.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the directory this script lives in, so the copy works no matter
// which working directory the runner starts from.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

// The platform tells us where to write via MAKEFUN_OUTPUT_DIR; without it
// we fall back to /output/entry.png. A value that is only whitespace is
// treated exactly like an unset variable.
const rawDir = process.env.MAKEFUN_OUTPUT_DIR;
const outDir = rawDir && rawDir.trim() !== "" ? rawDir.trim() : "/output";
const destination = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, destination);

// Log the copied size so a run can be sanity-checked at a glance.
const bytes = statSync(destination).size;
console.log(`Wrote ${destination} (${bytes} bytes)`);
