#!/usr/bin/env node
import { parseArgs } from "node:util";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { render, states, countries, jurisdictionsByCountry } from "./index.js";
const help = `Generate original state-inspired backgrounds.
Usage: npm run generate -- --state all --format both --out output --seed 42 --count 1
  --country us | mx | ca | all (omitted: legacy US output layout)
  --state   all or a jurisdiction slug within the selected country (default all)
  --format  svg | png | both (default both)
  --out     output directory (default output)
  --seed    uint32 seed, incremented for each variation (default 42)
  --count   variations per state, 1..10000 (default 1)
  --width   pixels (default 1400)
  --height  pixels (default 880)
  --help    show help
Writes one manifest.json with relative filenames, seeds and SHA-256 checksums.
Existing matching files in --out are replaced. Use a new directory for each batch.`;
try {
  const { values: v } = parseArgs({
    options: {
      country: { type: "string" },
      state: { type: "string", default: "all" },
      format: { type: "string", default: "both" },
      out: { type: "string", default: "output" },
      seed: { type: "string", default: "42" },
      count: { type: "string", default: "1" },
      width: { type: "string", default: "1400" },
      height: { type: "string", default: "880" },
      help: { type: "boolean" },
    },
  });
  if (v.help) {
    console.log(help);
  } else {
    const seed = Number(v.seed),
      count = Number(v.count),
      width = Number(v.width),
      height = Number(v.height);
    if (!Number.isInteger(count) || count < 1 || count > 10000)
      throw Error("count must be 1..10000");
    if (!["svg", "png", "both"].includes(v.format))
      throw Error("format must be svg, png or both");
    if (!Number.isInteger(seed) || seed < 0 || seed + count - 1 > 0xffffffff)
      throw Error("seed range must fit uint32");
    const selectedCountries =
      v.country === "all" ? countries : [v.country ?? "us"];
    for (const country of selectedCountries)
      if (!countries.includes(country))
        throw Error(`Unknown country: ${country}`);
    if (v.country === "all" && v.state !== "all")
      throw Error("--country all requires --state all");
    const selected = selectedCountries.flatMap((country) =>
      (v.state === "all" ? jurisdictionsByCountry[country] : [v.state]).map(
        (state) => ({ country, state }),
      ),
    );
    // Validate before writing output or loading the optional raster dependency.
    for (const { country, state } of selected)
      render(state, { country, seed, width, height });
    const sharp = v.format === "svg" ? null : (await import("sharp")).default;
    await mkdir(v.out, { recursive: true });
    const manifest = {
      generator: "draw.backgrounds",
      version: v.country ? 2 : 1,
      width,
      height,
      items: [],
    };
    for (const { country, state } of selected)
      for (let i = 0; i < count; i++) {
        const svg = render(state, { country, seed: seed + i, width, height }),
          stem = `${state}_${seed + i}`,
          files = [];
        for (const ext of v.format === "both" ? ["svg", "png"] : [v.format]) {
          const bytes =
            ext === "svg"
              ? Buffer.from(svg)
              : await sharp(Buffer.from(svg)).png().toBuffer();
          const filename = v.country
            ? `${country}/${stem}.${ext}`
            : `${stem}.${ext}`;
          if (v.country) await mkdir(join(v.out, country), { recursive: true });
          await writeFile(join(v.out, filename), bytes);
          files.push({
            filename,
            sha256: createHash("sha256").update(bytes).digest("hex"),
          });
        }
        manifest.items.push({
          ...(v.country ? { country, jurisdiction: state } : {}),
          state,
          seed: seed + i,
          files,
        });
        console.log(v.country ? `${country}/${stem}` : stem);
      }
    await writeFile(
      join(v.out, "manifest.json"),
      JSON.stringify(manifest, null, 2) + "\n",
    );
  }
} catch (e) {
  console.error(`Error: ${e.message}`);
  process.exitCode = 1;
}
