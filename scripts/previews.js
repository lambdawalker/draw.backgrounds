import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createHash } from "node:crypto";
import {
  render,
  countries,
  jurisdictionsByCountry,
  countryNames,
} from "../src/index.js";
const baseDirectory = process.argv[2] || "previews";
for (const country of countries) {
  const directory = join(baseDirectory, country);
  const states = jurisdictionsByCountry[country];
  await mkdir(directory, { recursive: true });
  const pages = Array.from({ length: Math.ceil(states.length / 10) }, () => []),
    manifest = { country, seed: 42, width: 1400, height: 880, items: [] };
  for (let i = 0; i < states.length; i++) {
    const state = states[i],
      svg = render(state, { country }),
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
    manifest.items.push({ country, jurisdiction: state, state, files });
    pages[Math.floor(i / 10)].push({
      input: await sharp(png).resize(700, 440).toBuffer(),
      left: (i % 2) * 740 + 20,
      top: Math.floor((i % 10) / 2) * 500 + 45,
    });
    pages[Math.floor(i / 10)].push({
      input: Buffer.from(
        `<svg width="700" height="32"><text x="0" y="24" font-family="DejaVu Sans" font-size="21" fill="#254254">${String(i + 1).padStart(2, "0")} / ${state.toUpperCase()}</text></svg>`,
      ),
      left: (i % 2) * 740 + 20,
      top: Math.floor((i % 10) / 2) * 500 + 10,
    });
  }
  for (let page = 0; page < pages.length; page++)
    await sharp({
      create: {
        width: 1480,
        height: Math.ceil(Math.min(10, states.length - page * 10) / 2) * 500,
        channels: 3,
        background: "#e5e9eb",
      },
    })
      .composite(pages[page])
      .jpeg({ quality: 90 })
      .toFile(
        join(
          directory,
          page === 0 ? "contact-sheet.jpg" : `contact-sheet-${page + 1}.jpg`,
        ),
      );
  await writeFile(
    join(directory, "manifest.json"),
    JSON.stringify(manifest, null, 2) + "\n",
  );
  const sheets = pages.map((_, i) =>
    i === 0 ? "contact-sheet.jpg" : `contact-sheet-${i + 1}.jpg`,
  );
  await writeFile(
    join(directory, "README.md"),
    `# ${countryNames[country]} backgrounds

${states.length} original procedural designs. Seed 42, 1400 × 880. [All countries](../README.md).

${sheets.map((file, i) => `[Contact sheet ${i + 1}](${file})`).join(" · ")}

| Jurisdiction | SVG | PNG |
|---|---|---|
${states.map((state) => `| ${state.replaceAll("-", " ")} | [SVG](${state}.svg) | [PNG](${state}.png) |`).join("\n")}

![${countryNames[country]} preview](contact-sheet.jpg)
`,
  );
  console.log(`Rendered ${states.length} designs in ${directory}`);
}

await writeFile(
  join(baseDirectory, "README.md"),
  "# Country galleries\n\n" +
    countries
      .map(
        (country) =>
          `- [${countryNames[country]}](${country}/README.md): ${jurisdictionsByCountry[country].length} designs`,
      )
      .join("\n") +
    "\n",
);
