import sharp from "sharp";
import { mkdir, writeFile, cp } from "node:fs/promises";
import designs from "../../../src/countries/mx/central/index.js";
import { Canvas, rng } from "../../../src/geometry.js";
const round = process.argv[2] || "1",
  out = new URL(`./round-${round}/`, import.meta.url);
await mkdir(out, { recursive: true });
await cp(
  new URL("../../../src/countries/mx/central/", import.meta.url),
  new URL("source/", out),
  { recursive: true },
);
let composites = [];
let i = 0;
for (const [name, fn] of Object.entries(designs)) {
  const c = new Canvas(rng(42), "mx");
  fn(c, 1.7);
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="880" viewBox="0 0 1400 880"><defs>${c.defs.join("")}</defs>${c.body.join("")}</svg>`;
  await writeFile(new URL(`${name}.svg`, out), svg);
  await sharp(Buffer.from(svg))
    .png()
    .toFile(new URL(`${name}.png`, out).pathname);
  const left = (i % 3) * 470 + 10,
    top = Math.floor(i / 3) * 325 + 35;
  composites.push({
    input: await sharp(Buffer.from(svg)).resize(460, 289).png().toBuffer(),
    left,
    top,
  });
  composites.push({
    input: Buffer.from(
      `<svg width="460" height="30"><text x="0" y="22" font-family="sans-serif" font-size="18">${name}</text></svg>`,
    ),
    left,
    top: top - 30,
  });
  i++;
}
await sharp({
  create: { width: 1420, height: 1300, channels: 3, background: "#dde2e1" },
})
  .composite(composites)
  .jpeg({ quality: 93 })
  .toFile(new URL("contact.jpg", out).pathname);
console.log(out.pathname);
