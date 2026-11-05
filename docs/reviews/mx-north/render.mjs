import sharp from "sharp";
import fs from "node:fs/promises";
import designs from "../../../src/countries/mx/north/index.js";
import { Canvas, rng } from "../../../src/geometry.js";
const pass = process.argv[2] || "1";
const dir = new URL(`./pass-${pass}/`, import.meta.url);
await fs.mkdir(dir, { recursive: true });
await fs.copyFile(
  new URL("../../../src/countries/mx/north/index.js", import.meta.url),
  new URL("index.js.txt", dir),
);
await fs.copyFile(
  new URL("../../../src/countries/mx/north/helpers.js", import.meta.url),
  new URL("helpers.js.txt", dir),
);
const tiles = [];
let i = 0;
for (const [slug, draw] of Object.entries(designs)) {
  const c = new Canvas(rng(42), "n" + i);
  draw(c, 1.7);
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="880"><defs>${c.defs.join("")}</defs>${c.body.join("")}</svg>`;
  const png = await sharp(Buffer.from(svg)).resize(560, 352).png().toBuffer();
  tiles.push({
    input: png,
    left: (i % 3) * 580,
    top: Math.floor(i / 3) * 390 + 30,
  });
  const label = Buffer.from(
    `<svg width="560" height="30"><text x="5" y="22" font-family="sans-serif" font-size="18" fill="#263746">${slug}</text></svg>`,
  );
  tiles.push({
    input: label,
    left: (i % 3) * 580,
    top: Math.floor(i / 3) * 390,
  });
  i++;
}
await sharp({
  create: { width: 1740, height: 1560, channels: 3, background: "#ffffff" },
})
  .composite(tiles)
  .jpeg({ quality: 90 })
  .toFile(new URL("contact.jpg", dir).pathname);
console.log(dir.pathname);
