import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve, join } from "node:path";
import { renderCanvas } from "../src/canvas.js";

const directory = resolve(process.argv[2] ?? "output/example-canvas");
await mkdir(directory, { recursive: true });
const items = [];
for (const [country, jurisdiction] of [
  ["us", "texas"],
  ["mx", "jalisco"],
  ["ca", "quebec"],
]) {
  const options = { country, seed: 42, width: 700, height: 440 };
  const canvas = renderCanvas(jurisdiction, options);
  const output = await canvas.encode("png");
  const filename = `${country}-${jurisdiction}.png`;
  await writeFile(join(directory, filename), output);
  items.push({
    jurisdiction,
    ...options,
    filename,
    sha256: createHash("sha256").update(output).digest("hex"),
  });
}
await writeFile(
  join(directory, "manifest.json"),
  JSON.stringify({ renderer: "canvas", items }, null, 2) + "\n",
);
console.log(directory);
