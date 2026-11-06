import { Hsluv } from "hsluv";

export function rgb(hex) {
  if (typeof hex !== "string" || !/^#[0-9a-f]{6}$/i.test(hex))
    throw new TypeError("Expected an RGB hex color");
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
}

function shifted(hex, hue, lightness) {
  const c = new Hsluv();
  [c.rgb_r, c.rgb_g, c.rgb_b] = rgb(hex);
  c.rgbToHsluv();
  c.hsluv_h = (c.hsluv_h + hue + 360) % 360;
  c.hsluv_l = Math.min(95, Math.max(15, c.hsluv_l + lightness));
  c.hsluvToRgb();
  return [c.rgb_r, c.rgb_g, c.rgb_b].map((channel) =>
    Math.round(channel * 255),
  );
}

// Same sampling ranges and CSS output as Card Designer's seeded helper.
export function related(hex, rng, alpha) {
  return `rgba(${shifted(hex, rng.range(-25, 25), rng.range(-24, 12)).join(",")},${alpha})`;
}

export function mixColors(from, to, amount) {
  if (!Number.isFinite(amount) || amount < 0 || amount > 1)
    throw new RangeError("Color mix amount must be between 0 and 1");
  const a = rgb(from);
  const b = rgb(to);
  return (
    "#" +
    a
      .map((v, i) =>
        Math.round((v + (b[i] - v) * amount) * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
  );
}
