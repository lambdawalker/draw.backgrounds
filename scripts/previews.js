import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { render, states } from "../src/index.js";
const directory = process.argv[2] || "previews";
await mkdir(directory, { recursive: true });
const composites = [],
  manifest = { seed: 42, width: 1400, height: 880, items: [] };
for (let i = 0; i < states.length; i++) {
  const state = states[i],
    svg = render(state),
    png = await sharp(Buffer.from(svg)).png().toBuffer();
  const files = [];
  for (const [ext, bytes] of [
    ["svg", Buffer.from(svg)],
    ["png", png],
  ]) {
    const filename = `${state}.${ext}`;
    await writeFile(join(directory, filename), bytes);
    files.push({
      filename,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    });
  }
  manifest.items.push({ state, files });
  composites.push({
    input: await sharp(png).resize(700, 440).toBuffer(),
    left: (i % 2) * 740 + 20,
    top: Math.floor(i / 2) * 500 + 45,
  });
  composites.push({
    input: Buffer.from(
      `<svg width="700" height="32"><text x="0" y="24" font-family="sans-serif" font-size="21" fill="#254254">${String(i + 1).padStart(2, "0")} / ${state.toUpperCase()}</text></svg>`,
    ),
    left: (i % 2) * 740 + 20,
    top: Math.floor(i / 2) * 500 + 10,
  });
}
await sharp({
  create: { width: 1480, height: 2500, channels: 3, background: "#e5e9eb" },
})
  .composite(composites)
  .jpeg({ quality: 90 })
  .toFile(join(directory, "contact-sheet.jpg"));
await writeFile(
  join(directory, "manifest.json"),
  JSON.stringify(manifest, null, 2) + "\n",
);
console.log(`Rendered ${states.length} designs in ${directory}`);
