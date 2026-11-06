import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { resolve, join } from "node:path";
import { render } from "../src/public.js";

const directory = resolve(process.argv[2] ?? "output/example-svg");
await mkdir(directory, { recursive: true });
const items = [];
for (const [country, jurisdiction] of [
  ["us", "texas"],
  ["mx", "jalisco"],
  ["ca", "quebec"],
]) {
  const options = { country, seed: 42, width: 700, height: 440 };
  const output = render(jurisdiction, options);
  const filename = `${country}-${jurisdiction}.svg`;
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
  JSON.stringify({ renderer: "svg", items }, null, 2) + "\n",
);
console.log(directory);
