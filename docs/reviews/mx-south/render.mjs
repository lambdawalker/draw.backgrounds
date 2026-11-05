import sharp from "sharp";
import { mkdir, cp } from "node:fs/promises";
import designs from "../../../src/countries/mx/south/index.js";
import { Canvas, rng } from "../../../src/geometry.js";
const pass = process.argv[2] || "01",
  dir = new URL(`./pass-${pass}/`, import.meta.url);
await mkdir(dir, { recursive: true });
await cp(
  new URL("../../../src/countries/mx/south/", import.meta.url),
  new URL("source/", dir),
  { recursive: true },
);
const tiles = [];
let i = 0;
for (const [slug, fn] of Object.entries(designs)) {
  const c = new Canvas(rng(42), "south");
  fn(c, 1.7);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="880" viewBox="0 0 1400 880"><defs>${c.defs.join("")}</defs>${c.body.join("")}</svg>`;
  tiles.push({
    input: await sharp(Buffer.from(svg)).resize(560, 352).png().toBuffer(),
    left: (i % 2) * 580 + 10,
    top: Math.floor(i / 2) * 390 + 30,
  });
  tiles.push({
    input: Buffer.from(
      `<svg width="560" height="25"><text x="0" y="18" font-size="16">${slug}</text></svg>`,
    ),
    left: (i % 2) * 580 + 10,
    top: Math.floor(i / 2) * 390 + 4,
  });
  i++;
}
await sharp({
  create: { width: 1160, height: 1950, channels: 3, background: "#edf0ef" },
})
  .composite(tiles)
  .jpeg({ quality: 92 })
  .toFile(new URL("contact-sheet.jpg", dir).pathname);
