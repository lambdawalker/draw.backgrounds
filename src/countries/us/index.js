import expansionA from "./expansion/a/index.js";
import expansionB from "./expansion/b/index.js";
import expansionC from "./expansion/c/index.js";
import expansionD from "./expansion/d/index.js";
import { finish } from "./finishing.js";
import { Canvas, rng, mixSeed } from "../../geometry.js";
import washington from "./originals/washington.js";
import arkansas from "./originals/arkansas.js";
import illinois from "./originals/illinois.js";
import tennessee from "./originals/tennessee.js";
import alaska from "./originals/alaska.js";
import wyoming from "./originals/wyoming.js";
import louisiana from "./originals/louisiana.js";
import utah from "./originals/utah.js";
import colorado from "./originals/colorado.js";
import idaho from "./originals/idaho.js";
const originalStates = Object.freeze([
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
export const states = Object.freeze([
  ...originalStates,
  ...Object.keys({
    ...expansionA,
    ...expansionB,
    ...expansionC,
    ...expansionD,
  }).sort(),
]);
const designs = {
  ...expansionA,
  ...expansionB,
  ...expansionC,
  ...expansionD,
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
export function drawState(
  state,
  { seed = 42, width = 1400, height = 880 },
  createTarget,
) {
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
    c = createTarget(random, width, height, `${state}-${seed}-`);
  designs[state](c, random() * Math.PI * 2);
  if (originalStates.includes(state)) finish(c, state);
  return c;
}

export function render(state, { seed = 42, width = 1400, height = 880 } = {}) {
  const c = drawState(
    state,
    { seed, width, height },
    (random, _width, _height, prefix) => new Canvas(random, prefix),
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 1400 880" preserveAspectRatio="none"><defs>${c.defs.join("")}</defs><g>${c.body.join("")}</g></svg>`;
}
