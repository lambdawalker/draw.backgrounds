import {
  Canvas,
  W,
  H,
  TAU,
  grid,
  waves,
  ridge,
  snowOnRidge,
  rosette,
  flower,
  rng,
  mixSeed,
} from "./geometry.js";
import { mixColors, rgb } from "./color.js";

const version = 1;
const defaultScheme = {
  paper: "#F4F0E7",
  primary: "#386A73",
  secondary: "#718A67",
  accent: "#B67B57",
};
const colorKeys = [
  "paper",
  "wash",
  "textureInk",
  "rosetteInk",
  "petal",
  "flowerCenter",
  "flowerHighlight",
  "ridgeFill",
  "ridgeInk",
  "snow",
];
const textures = ["grid", "waves", "crossed-waves"];
const accentKinds = ["rosette", "flowers", "ridge"];

function validateSurface({ seed, width, height }) {
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff)
    throw new RangeError("seed must be a uint32 integer");
  if (
    ![width, height].every((n) => Number.isInteger(n) && n >= 1 && n <= 8192) ||
    width * height > 40000000
  )
    throw new RangeError(
      "dimensions must be positive integers <=8192 and <=40 million pixels",
    );
}

function box(x, y, width, height) {
  return { x, y, width, height };
}

function checkedBox(value, name) {
  const { x, y, width, height } = value ?? {};
  if (
    ![x, y, width, height].every(Number.isFinite) ||
    x < 0 ||
    y < 0 ||
    width <= 0 ||
    height <= 0 ||
    x + width > 1 ||
    y + height > 1
  )
    throw new RangeError(
      `${name} must be a positive normalized rectangle inside the card`,
    );
  return box(x, y, width, height);
}

function overlaps(a, b) {
  return (
    a.x < b.x + b.width &&
    b.x < a.x + a.width &&
    a.y < b.y + b.height &&
    b.y < a.y + a.height
  );
}

function spacesAround(photo) {
  if (!photo) return [box(0, 0, 1, 1)];
  const left = Math.max(0, photo.x - 0.02);
  const top = Math.max(0, photo.y - 0.02);
  const right = Math.min(1, photo.x + photo.width + 0.02);
  const bottom = Math.min(1, photo.y + photo.height + 0.02);
  return [
    box(0, 0, left, 1),
    box(right, 0, 1 - right, 1),
    box(0, 0, 1, top),
    box(0, bottom, 1, 1 - bottom),
  ];
}

function planAccents(photo, random) {
  const candidates = [];
  for (const space of spacesAround(photo)) {
    const { x, y, width, height } = space;
    // Reserve the complete ink footprint, including rosette rings and flower strokes.
    const size = Math.min(width, height) * (0.56 + random() * 0.3);
    if (size >= 0.12) {
      for (const kind of ["rosette", "flowers"]) {
        candidates.push({
          kind,
          bounds: box(
            x + (width - size) * random(),
            y + (height - size) * random(),
            size,
            size,
          ),
        });
      }
    }
    if (width === 1 && height >= 0.13) {
      const depth = Math.min(height, 0.17 + random() * 0.2);
      if (y === 0)
        candidates.push({ kind: "ridge", bounds: box(0, 0, 1, depth) });
      if (y + height >= 1 - Number.EPSILON)
        candidates.push({ kind: "ridge", bounds: box(0, 1 - depth, 1, depth) });
    }
  }
  if (!candidates.length) return [];
  const pick = (values) => values[Math.floor(random() * values.length)];
  const first = pick(candidates);
  const secondary = candidates.filter(
    ({ bounds, kind }) =>
      kind !== first.kind && !overlaps(bounds, first.bounds),
  );
  return secondary.length && random() < 0.62
    ? [first, pick(secondary)]
    : [first];
}

/** Plan a region-free background. Coordinates are fractions of the card. */
export function createComposition({
  seed = 42,
  width = W,
  height = H,
  photoIdBoundingBox = null,
  colorScheme = defaultScheme,
} = {}) {
  validateSurface({ seed, width, height });
  const photo =
    photoIdBoundingBox === null
      ? null
      : checkedBox(photoIdBoundingBox, "photoIdBoundingBox");
  const { paper, primary, secondary, accent } = colorScheme;
  for (const color of [paper, primary, secondary, accent]) rgb(color);
  const palette = rng(mixSeed(seed ^ 0x558a));
  const texture = rng(mixSeed(seed ^ 0x96e1));
  return {
    version,
    seed,
    width,
    height,
    photoIdBoundingBox: photo,
    paper,
    wash: mixColors(paper, primary, 0.08 + palette() * 0.24),
    textureInk: mixColors(primary, secondary, palette() * 0.7),
    rosetteInk: mixColors(primary, accent, palette() * 0.55),
    petal: mixColors(accent, primary, palette() * 0.33),
    flowerCenter: mixColors(accent, secondary, 0.18 + palette() * 0.45),
    flowerHighlight: mixColors(paper, accent, 0.08),
    ridgeFill: mixColors(paper, secondary, 0.35 + palette() * 0.42),
    ridgeInk: mixColors(secondary, primary, 0.27 + palette() * 0.44),
    snow: mixColors("#FFFFFF", paper, 0.55),
    texture: textures[Math.floor(texture() * textures.length)],
    accents: planAccents(photo, rng(mixSeed(seed ^ 0x231a))),
  };
}

function paintRidge(c, bounds, recipe, random) {
  const height = bounds.height * H;
  const transform =
    bounds.y === 0
      ? `translate(${W} ${height}) rotate(180) scale(1 ${height / H})`
      : `translate(0 ${bounds.y * H}) scale(1 ${height / H})`;
  const vertices = Array.from({ length: 9 }, (_, i) => [
    -60 + i * 190,
    i % 2 ? 90 + random() * 330 : 450 + random() * 260,
  ]);
  c.add(c.openGroup(transform));
  const mountain = ridge(c, vertices, {
    fill: recipe.ridgeFill,
    ink: recipe.ridgeInk,
    opacity: 0.56,
  });
  if (random() < 0.68)
    snowOnRidge(c, mountain, {
      lineY: 245 + random() * 150,
      color: recipe.snow,
    });
  c.add(c.closeGroup());
}

function paintAccent(c, { kind, bounds }, recipe, random) {
  if (kind === "ridge") {
    paintRidge(c, bounds, recipe, random);
    return;
  }
  const x = (bounds.x + bounds.width / 2) * W;
  const y = (bounds.y + bounds.height / 2) * H;
  const r = Math.min(bounds.width * W, bounds.height * H) / 2;
  if (kind === "rosette") {
    rosette(c, x, y, r * 0.64, recipe.rosetteInk, {
      rings: Math.min(14, Math.floor(r / 8)),
      lobes: 8 + Math.floor(random() * 17),
      amplitude: r * 0.08,
      opacity: 0.19 + random() * 0.24,
    });
    return;
  }
  const count = 2 + Math.floor(random() * 5);
  for (let i = 0; i < count; i++) {
    const angle = TAU * random();
    const distance = r * 0.58 * random();
    flower(
      c,
      x + distance * Math.cos(angle),
      y + distance * Math.sin(angle),
      r * (0.16 + random() * 0.14),
      recipe.petal,
      0.3 + random() * 0.29,
      { center: recipe.flowerCenter, highlight: recipe.flowerHighlight },
    );
  }
}

export function drawComposition(recipe, createTarget) {
  if (recipe?.version !== version)
    throw new RangeError("Unknown composition version");
  const { width, height, seed, paper, wash, textureInk, texture, accents } =
    recipe;
  validateSurface(recipe);
  for (const key of colorKeys) rgb(recipe[key]);
  if (
    !textures.includes(texture) ||
    !Array.isArray(accents) ||
    accents.length > 2
  )
    throw new RangeError("Invalid composition layers");
  const photo =
    recipe.photoIdBoundingBox === null
      ? null
      : checkedBox(recipe.photoIdBoundingBox, "photoIdBoundingBox");
  for (const { kind, bounds } of accents) {
    const b = checkedBox(bounds, "accent bounds");
    if (
      !accentKinds.includes(kind) ||
      (photo && overlaps(b, photo)) ||
      (kind === "ridge" &&
        (b.x !== 0 ||
          b.width !== 1 ||
          (b.y !== 0 && b.y + b.height < 1 - Number.EPSILON))) ||
      (kind !== "ridge" && Math.min(b.width, b.height) < 0.12)
    )
      throw new RangeError("Invalid accent placement");
  }

  const random = rng(mixSeed(seed ^ 0x8719));
  const c = createTarget(random, width, height, `composition-${seed}-`);
  const stops =
    random() < 0.5
      ? [
          [0, paper],
          [100, wash],
        ]
      : [
          [0, wash],
          [100, paper],
        ];
  c.add(c.rect(0, 0, W, H, c.gradient(stops)));
  const textureOptions = {
    color: textureInk,
    opacity: 0.11 + random() * 0.13,
    spacing: 10 + random() * 18,
    amplitude: 12 + random() * 30,
    phase: random() * TAU,
  };
  if (texture === "grid") grid(c, textureOptions);
  else {
    waves(c, { ...textureOptions, from: -100, to: 1000, slope: 0.09 });
    if (texture === "crossed-waves")
      waves(c, {
        ...textureOptions,
        from: -150,
        to: 1050,
        slope: -0.09,
        phase: textureOptions.phase + Math.PI,
      });
  }
  for (const accent of accents) paintAccent(c, accent, recipe, random);
  return c;
}

export function renderComposition(recipe) {
  const c = drawComposition(
    recipe,
    (random, _width, _height, prefix) => new Canvas(random, prefix),
  );
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${recipe.width}" height="${recipe.height}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>${c.defs.join("")}</defs><g>${c.body.join("")}</g></svg>`;
}
