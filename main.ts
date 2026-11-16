// ai-excited-01 — "One Match. One Galaxy."
// Copies the committed entry image to the output directory the
// make.fun runner asks for. Node 22, standard library only, no network.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

const rawDir = process.env.MAKEFUN_OUTPUT_DIR;
const trimmed = rawDir === undefined ? "" : rawDir.trim();
const outputDir = trimmed.length > 0 ? trimmed : "/output";

if (!existsSync(source)) {
  console.error(`entry image not found: ${source}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
const target = join(resolve(outputDir), "entry.png");
copyFileSync(source, target);
console.log(`wrote ${target}`);
