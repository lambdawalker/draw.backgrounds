import { Canvas, rng, mixSeed } from "./geometry.js";
import washington from "./designs/washington.js";
import arkansas from "./designs/arkansas.js";
import illinois from "./designs/illinois.js";
import tennessee from "./designs/tennessee.js";
import alaska from "./designs/alaska.js";
import wyoming from "./designs/wyoming.js";
import louisiana from "./designs/louisiana.js";
import utah from "./designs/utah.js";
import colorado from "./designs/colorado.js";
import idaho from "./designs/idaho.js";
export const states = Object.freeze([
  "washington",
  "arkansas",
  "illinois",
  "tennessee",
  "alaska",
  "wyoming",
  "louisiana",
  "utah",
  "colorado",
  "idaho",
]);
const designs = {
  washington,
  arkansas,
  illinois,
  tennessee,
  alaska,
  wyoming,
  louisiana,
  utah,
  colorado,
  idaho,
};
export function render(state, { seed = 42, width = 1400, height = 880 } = {}) {
  if (!states.includes(state))
    throw new RangeError(
      `Unknown state: ${state}. Choose ${states.join(", ")}.`,
    );
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff)
    throw new RangeError("seed must be a uint32 integer");
  if (
    !Number.isInteger(width) ||
    !Number.isInteger(height) ||
    width < 1 ||
    height < 1 ||
    width > 8192 ||
    height > 8192 ||
    width * height > 40000000
  )
    throw new RangeError(
      "dimensions must be positive integers <=8192 and <=40 million pixels",
    );
  const random = rng(mixSeed(seed)),
    c = new Canvas(random, `${state}-${seed}-`);
  designs[state](c, random() * Math.PI * 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 1400 880" preserveAspectRatio="none"><defs>${c.defs.join("")}</defs><g>${c.body.join("")}</g></svg>`;
}
