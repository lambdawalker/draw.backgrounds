import { states, drawState } from "./countries/us/index.js";
import mexicoNorth from "./countries/mx/north/index.js";
import mexicoCentral from "./countries/mx/central/index.js";
import mexicoSouth from "./countries/mx/south/index.js";
import canada from "./countries/ca/index.js";
import { Canvas, rng, mixSeed } from "./geometry.js";
export { states };
export const countries = Object.freeze(["us", "mx", "ca"]);
const designs = {
  mx: { ...mexicoNorth, ...mexicoCentral, ...mexicoSouth },
  ca: canada,
};
export const jurisdictionsByCountry = Object.freeze({
  us: states,
  mx: Object.freeze(Object.keys(designs.mx).sort()),
  ca: Object.freeze(Object.keys(designs.ca).sort()),
});
export const countryNames = Object.freeze({
  us: "United States",
  mx: "Mexico",
  ca: "Canada",
});
export function drawJurisdiction(
  jurisdiction,
  { country = "us", seed = 42, width = 1400, height = 880 },
  createTarget,
) {
  if (!countries.includes(country))
    throw new RangeError("Unknown country: " + country);
  if (country === "us")
    return drawState(jurisdiction, { seed, width, height }, createTarget);
  if (!jurisdictionsByCountry[country].includes(jurisdiction))
    throw new RangeError(
      "Unknown jurisdiction for " + country + ": " + jurisdiction,
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
    c = createTarget(
      random,
      width,
      height,
      country + "-" + jurisdiction + "-" + seed + "-",
    );
  designs[country][jurisdiction](c, random() * Math.PI * 2);
  return c;
}

export function render(
  jurisdiction,
  { country = "us", seed = 42, width = 1400, height = 880 } = {},
) {
  const c = drawJurisdiction(
    jurisdiction,
    { country, seed, width, height },
    (random, _width, _height, prefix) => new Canvas(random, prefix),
  );
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" width="' +
    width +
    '" height="' +
    height +
    '" viewBox="0 0 1400 880" preserveAspectRatio="none"><defs>' +
    c.defs.join("") +
    "</defs><g>" +
    c.body.join("") +
    "</g></svg>"
  );
}
