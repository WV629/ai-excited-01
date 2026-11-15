// ai-excited-01 — "One match. One galaxy."
// Entrypoint: copies the committed entry.png to the output directory
// the harness expects (MAKEFUN_OUTPUT_DIR, or /output as a fallback).
// Node 22, standard library only, no network, fully deterministic:
// the same bytes go in, the same bytes come out, every run.

import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the directory this file lives in, so the copy works no
// matter which working directory the harness runs us from.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

// The harness sets MAKEFUN_OUTPUT_DIR; /output is the documented
// fallback when it is not set. An empty or whitespace-only value
// counts as unset, so a stray blank env var cannot send the image
// to a relative or empty path.
const outDir = (process.env.MAKEFUN_OUTPUT_DIR || "").trim() || "/output";
const target = join(outDir, "entry.png");

if (!existsSync(source)) {
  console.error(`entry image missing: ${source}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
console.log(`ai-excited-01: copied entry.png (${source}) -> ${target}`);
