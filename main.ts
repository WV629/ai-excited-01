// ai-excited-01 entry: "One Match. One Galaxy."
//
// This program is intentionally boring: the artwork is already finished
// and committed as entry.png next to this file. All the program does is
// place an exact copy of that image where the judge expects it, so the
// output is byte-identical on every run.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the directory this file lives in, so the entry works no
// matter which working directory the runner starts from.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

// MAKEFUN_OUTPUT_DIR wins when set to a non-empty value; otherwise
// the conventional fallback location is used. A relative value is
// resolved against the current working directory, and a trailing
// slash or stray whitespace is harmless.
const rawDir = process.env.MAKEFUN_OUTPUT_DIR;
const outputDir =
  rawDir !== undefined && rawDir.trim() !== ""
    ? resolve(rawDir.trim())
    : "/output";

mkdirSync(outputDir, { recursive: true });

const destination = join(outputDir, "entry.png");
copyFileSync(source, destination);

// Confirm the copy landed where the judge will look for it.
const written = statSync(destination);
console.log(`Wrote ${destination} (${written.size} bytes)`);
