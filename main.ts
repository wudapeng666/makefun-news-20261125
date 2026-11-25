import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const sourceImage = fileURLToPath(new URL("./entry.png", import.meta.url));

mkdirSync(outputDir, { recursive: true });
const outputImage = join(outputDir, "entry.png");
copyFileSync(sourceImage, outputImage);

const header = readFileSync(outputImage).subarray(0, 8);
const pngSignature = "89504e470d0a1a0a";
if (header.toString("hex") !== pngSignature || statSync(outputImage).size > 1_048_576) {
  throw new Error("entry.png is not a valid in-budget PNG");
}
console.log(`wrote entry.png (${statSync(outputImage).size} bytes)`);
