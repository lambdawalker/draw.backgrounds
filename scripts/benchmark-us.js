import { writeFile } from "node:fs/promises";
import { cpus } from "node:os";
import { parseArgs } from "node:util";
import sharp from "sharp";
import { render, states } from "../src/index.js";
import { renderCanvas } from "../src/canvas.js";

const { values } = parseArgs({
  options: {
    state: { type: "string", default: "all" },
    width: { type: "string", default: "1400" },
    height: { type: "string", default: "880" },
    seed: { type: "string", default: "42" },
    samples: { type: "string", default: "10" },
    warmup: { type: "string", default: "2" },
    json: { type: "string" },
    help: { type: "boolean" },
  },
});

if (values.help) {
  console.log(
    "Usage: npm run benchmark:us -- [--state all|SLUG] [--width 1400] [--height 880] [--seed 42] [--samples 10] [--warmup 2] [--json PATH]",
  );
} else {
  await benchmark();
}

function stats(times) {
  const sorted = [...times].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  const median =
    sorted.length % 2
      ? sorted[middle]
      : (sorted[middle - 1] + sorted[middle]) / 2;
  return {
    median,
    p95: sorted[Math.ceil(sorted.length * 0.95) - 1],
    mean: times.reduce((sum, value) => sum + value, 0) / times.length,
  };
}

async function benchmark() {
  const width = Number(values.width);
  const height = Number(values.height);
  const seed = Number(values.seed);
  const sampleCount = Number(values.samples);
  const warmup = Number(values.warmup);
  if (values.state !== "all" && !states.includes(values.state))
    throw new RangeError(`Unknown US state: ${values.state}`);
  if (
    !Number.isInteger(sampleCount) ||
    sampleCount < 1 ||
    !Number.isInteger(warmup) ||
    warmup < 0
  )
    throw new RangeError(
      "samples must be a positive integer and warmup a nonnegative integer",
    );
  if (
    !Number.isInteger(seed) ||
    seed < 0 ||
    seed + sampleCount + warmup - 1 > 0xffffffff
  )
    throw new RangeError("seed range must fit uint32");

  const selected = values.state === "all" ? [...states].sort() : [values.state];
  const raw = { width, height, channels: 4 };
  const svg = async (state, options) => {
    const start = performance.now();
    const source = Buffer.from(render(state, options));
    const generated = performance.now();
    const pixels = await sharp(source).ensureAlpha().raw().toBuffer();
    const drawn = performance.now();
    await sharp(pixels, { raw }).png().toBuffer();
    return {
      generateMs: generated - start,
      drawMs: drawn - start,
      encodeMs: performance.now() - drawn,
    };
  };
  const canvas = async (state, options) => {
    const start = performance.now();
    const surface = renderCanvas(state, options);
    // Keep an owned buffer for the asynchronous encoder.
    const pixels = Buffer.from(surface.data());
    const drawn = performance.now();
    await sharp(pixels, { raw }).png().toBuffer();
    return { drawMs: drawn - start, encodeMs: performance.now() - drawn };
  };

  const results = [];
  for (const [stateIndex, state] of selected.entries()) {
    const samples = [];
    for (let i = 0; i < warmup + sampleCount; i++) {
      const options = { width, height, seed: seed + i };
      let svgTimes, canvasTimes;
      // Alternate order across states and seeds. Run one image at a time.
      if ((i + stateIndex) % 2 === 0) {
        svgTimes = await svg(state, options);
        canvasTimes = await canvas(state, options);
      } else {
        canvasTimes = await canvas(state, options);
        svgTimes = await svg(state, options);
      }
      if (i >= warmup)
        samples.push({
          seed: options.seed,
          svg: svgTimes,
          canvas: canvasTimes,
        });
    }
    const summarize = (renderer, metric) =>
      stats(samples.map((sample) => sample[renderer][metric]));
    const result = {
      state,
      svgGenerate: summarize("svg", "generateMs"),
      svgDraw: summarize("svg", "drawMs"),
      canvasDraw: summarize("canvas", "drawMs"),
      svgPngEncode: summarize("svg", "encodeMs"),
      canvasPngEncode: summarize("canvas", "encodeMs"),
      samples,
    };
    results.push(result);
    console.error(
      `${state}: SVG ${result.svgDraw.median.toFixed(1)} ms, Canvas ${result.canvasDraw.median.toFixed(1)} ms (median draw)`,
    );
  }

  const svgBatches = [];
  const canvasBatches = [];
  for (let i = 0; i < sampleCount; i++) {
    svgBatches.push(
      results.reduce((sum, row) => sum + row.samples[i].svg.drawMs, 0),
    );
    canvasBatches.push(
      results.reduce((sum, row) => sum + row.samples[i].canvas.drawMs, 0),
    );
  }
  const summary = {
    svgDrawBatchMs: stats(svgBatches),
    canvasDrawBatchMs: stats(canvasBatches),
    canvasFasterStates: results.filter(
      (row) => row.canvasDraw.median < row.svgDraw.median,
    ).length,
  };
  const report = {
    environment: {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
      cpu: cpus()[0]?.model,
      sharp: sharp.versions,
    },
    settings: { width, height, seed, sampleCount, warmup },
    summary,
    results,
  };
  console.log(JSON.stringify(summary, null, 2));
  if (values.json)
    await writeFile(values.json, JSON.stringify(report, null, 2) + "\n");
}
