import fs from "node:fs/promises";
import sharp from "sharp";
import designs from "../../../src/countries/ca/index.js";
import { Canvas, rng, mixSeed } from "../../../src/geometry.js";
const pass = process.argv[2] ?? "pass-01",
  root = new URL(`./${pass}/`, import.meta.url);
await fs.mkdir(root, { recursive: true });
await fs.cp(
  new URL("../../../src/countries/ca/", import.meta.url),
  new URL("source/", root),
  { recursive: true },
);
let composites = [];
let i = 0;
for (const [slug, fn] of Object.entries(designs)) {
  let r = rng(mixSeed(42)),
    c = new Canvas(r, slug);
  fn(c, r() * Math.PI * 2);
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="880"><defs>${c.defs.join("")}</defs>${c.body.join("")}</svg>`;
  let png = await sharp(Buffer.from(svg)).resize(560, 352).png().toBuffer();
  let x = (i % 3) * 580,
    y = Math.floor(i / 3) * 390;
  composites.push(
    { input: png, left: x, top: y + 28 },
    {
      input: Buffer.from(
        `<svg width="560" height="25"><text x="10" y="19" font-family="sans-serif" font-size="17">${slug}</text></svg>`,
      ),
      left: x,
      top: y,
    },
  );
  i++;
}
await sharp({
  create: { width: 1740, height: 1950, channels: 3, background: "#ffffff" },
})
  .composite(composites)
  .jpeg({ quality: 90 })
  .toFile(new URL("contact-sheet.jpg", root).pathname);
