import sharp from "sharp";
import { mkdir, writeFile, cp } from "node:fs/promises";
import { render, states } from "../src/index.js";
const pass = Number(process.argv[2]),
  seed = Number(process.argv[3] || 42),
  width = Number(process.argv[4] || 1400),
  height = Math.round((width * 880) / 1400),
  directory = `docs/reviews/original-additional/pass-${pass}`;
await mkdir(`${directory}/source/designs`, { recursive: true });
await cp("src/designs", `${directory}/source/designs`, { recursive: true });
await cp("src/finishing.js", `${directory}/source/finishing.js`);
await cp("src/geometry.js", `${directory}/source/geometry.js`);
const layers = [];
for (let i = 0; i < 10; i++) {
  const state = states[i],
    svg = render(state, { seed, width, height }),
    png = await sharp(Buffer.from(svg)).resize(700, 440).png().toBuffer();
  layers.push({
    input: png,
    left: (i % 2) * 740 + 20,
    top: Math.floor(i / 2) * 500 + 45,
  });
  layers.push({
    input: Buffer.from(
      `<svg width="700" height="32"><text x="0" y="24" font-family="DejaVu Sans" font-size="21" fill="#254254">${state} / extra ${pass} / seed ${seed}</text></svg>`,
    ),
    left: (i % 2) * 740 + 20,
    top: Math.floor(i / 2) * 500 + 10,
  });
}
await sharp({
  create: { width: 1480, height: 2500, channels: 3, background: "#e5e9eb" },
})
  .composite(layers)
  .jpeg({ quality: 90 })
  .toFile(`${directory}/contact.jpg`);
await writeFile(
  `${directory}/render.json`,
  JSON.stringify(
    { seed, width, height, states: states.slice(0, 10) },
    null,
    2,
  ) + "\n",
);
console.log(directory);
