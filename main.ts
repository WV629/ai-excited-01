// ai-excited-01 — "One Match. One Galaxy."
//
// The entry image is committed next to this file as entry.png. This
// program simply copies that exact image into the output directory
// requested by the runner, so every run produces byte-identical output.
//
// Output directory resolution:
//   1. MAKEFUN_OUTPUT_DIR, when it is set to a non-empty value.
//   2. Otherwise the fallback /output.
//
// Node 22, standard library only. No network access.

import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUTPUT_FILE = "entry.png";
const FALLBACK_DIR = "/output";

function resolveOutputDir(): string {
  const raw = process.env.MAKEFUN_OUTPUT_DIR;
  if (typeof raw === "string" && raw.trim() !== "") {
    // Accept relative paths too: resolve them against the working directory.
    return resolve(raw.trim());
  }
  return FALLBACK_DIR;
}

function main(): void {
  const outDir = resolveOutputDir();
  const outPath = join(outDir, OUTPUT_FILE);

  // The committed image lives beside this script.
  const here = dirname(fileURLToPath(import.meta.url));
  const sourcePath = join(here, OUTPUT_FILE);

  mkdirSync(outDir, { recursive: true });
  copyFileSync(sourcePath, outPath);

  console.log(`Copied ${sourcePath} -> ${outPath}`);
}

main();
