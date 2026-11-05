/** A compact visual check of consecutive seeds. */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { render, states } from "../src/index.js";
const dest = process.argv[2] || "output/seed-variations.jpg";
await mkdir(dirname(dest), { recursive: true });
const layers = [];
for (let row = 0; row < states.length; row++)
  for (let col = 0; col < 3; col++) {
    const state = states[row],
      seed = 42 + col;
    layers.push({
      input: await sharp(
        Buffer.from(render(state, { seed, width: 350, height: 220 })),
      )
        .png()
        .toBuffer(),
      left: col * 370 + 10,
      top: row * 250 + 28,
    });
    layers.push({
      input: Buffer.from(
        `<svg width="350" height="24"><text x="0" y="18" font-family="sans-serif" font-size="15" fill="#254254">${state} / seed ${seed}</text></svg>`,
      ),
      left: col * 370 + 10,
      top: row * 250 + 3,
    });
  }
await sharp({
  create: {
    width: 1110,
    height: states.length * 250,
    channels: 3,
    background: "#e5e9eb",
  },
})
  .composite(layers)
  .jpeg({ quality: 87 })
  .toFile(dest);
console.log(dest);
