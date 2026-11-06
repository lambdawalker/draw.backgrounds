import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createComposition, renderComposition } from "../src/public.js";
import { renderCompositionCanvas } from "../src/canvas.js";

const directory = process.argv[2] ?? "output/example-composition";
await mkdir(directory, { recursive: true });
const recipe = createComposition({
  seed: 2081,
  width: 700,
  height: 440,
  photoIdBoundingBox: { x: 0.06, y: 0.24, width: 0.28, height: 0.6 },
  colorScheme: {
    paper: "#F4F0E7",
    primary: "#386A73",
    secondary: "#718A67",
    accent: "#B67B57",
  },
});
await writeFile(
  join(directory, "composition.json"),
  JSON.stringify(recipe, null, 2) + "\n",
);
await writeFile(join(directory, "composition.svg"), renderComposition(recipe));
await writeFile(
  join(directory, "composition.png"),
  await renderCompositionCanvas(recipe).encode("png"),
);
console.log(directory);
