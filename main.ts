import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const sourceImage = fileURLToPath(new URL("./entry.png", import.meta.url));

mkdirSync(outputDir, { recursive: true });
copyFileSync(sourceImage, join(outputDir, "entry.png"));
console.log("wrote entry.png from the repository snapshot");
