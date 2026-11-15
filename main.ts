// ai-excited-01 — "One Match. One Galaxy."
// Copies the committed entry image to the output directory requested by
// the make.fun runner. Pure Node 22 standard library: no dependencies,
// no network access, fully deterministic (byte-for-byte identical output
// on every run, since it is a plain file copy).

import { copyFileSync, existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The image lives next to this script in the repository.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

// The runner tells us where to write via MAKEFUN_OUTPUT_DIR. An empty
// or whitespace-only value counts as unset, and we fall back to the
// conventional /output directory.
const requestedDir = (process.env.MAKEFUN_OUTPUT_DIR ?? "").trim();
const outputDir = requestedDir === "" ? "/output" : requestedDir;

if (!existsSync(source)) {
  console.error(`entry image not found: ${source}`);
  process.exit(1);
}

mkdirSync(outputDir, { recursive: true });
const destination = join(outputDir, "entry.png");
copyFileSync(source, destination);

// Verify the copy landed and report its size, so a silent partial
// write can never pass as success.
const written = statSync(destination);
if (written.size === 0) {
  console.error(`copy failed: ${destination} is empty`);
  process.exit(1);
}
console.log(`wrote ${destination} (${written.size} bytes)`);
