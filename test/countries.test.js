import test from "node:test";
import assert from "node:assert/strict";
import sharp from "sharp";
import { mkdtemp, readFile, rm, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  render,
  countries,
  jurisdictionsByCountry,
  states,
} from "../src/index.js";
const expected = {
  mx: "aguascalientes baja-california baja-california-sur campeche chiapas chihuahua ciudad-de-mexico coahuila colima durango estado-de-mexico guanajuato guerrero hidalgo jalisco michoacan morelos nayarit nuevo-leon oaxaca puebla queretaro quintana-roo san-luis-potosi sinaloa sonora tabasco tamaulipas tlaxcala veracruz yucatan zacatecas".split(
    " ",
  ),
  ca: "alberta british-columbia manitoba new-brunswick newfoundland-and-labrador northwest-territories nova-scotia nunavut ontario prince-edward-island quebec saskatchewan yukon".split(
    " ",
  ),
};
test("country catalogs cover all jurisdictions exactly once", () => {
  assert.deepEqual(countries, ["us", "mx", "ca"]);
  assert.equal(states.length, 50);
  assert.equal(jurisdictionsByCountry.us, states);
  for (const country of ["mx", "ca"])
    assert.deepEqual(jurisdictionsByCountry[country], expected[country].sort());
});
for (const country of ["mx", "ca"])
  for (const jurisdiction of expected[country]) {
    test(`${country}/${jurisdiction}: deterministic standalone SVG and visibly varied seeds`, async () => {
      const options = { country, width: 350, height: 220, seed: 42 };
      const svg = render(jurisdiction, options);
      assert.equal(svg, render(jurisdiction, options));
      assert.doesNotMatch(
        svg,
        /<(?:text|image|script|foreignObject)\b|(?:NaN|Infinity)|href=/,
      );
      const own = [...svg.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
      assert.equal(new Set(own).size, own.length);
      for (const [, ref] of svg.matchAll(/url\(#([^)]*)\)/g))
        assert.ok(own.includes(ref), ref);
      const pixels = await sharp(Buffer.from(svg))
        .removeAlpha()
        .raw()
        .toBuffer();
      const next = await sharp(
        Buffer.from(render(jurisdiction, { ...options, seed: 43 })),
      )
        .removeAlpha()
        .raw()
        .toBuffer();
      let delta = 0;
      for (let i = 0; i < pixels.length; i++)
        delta += Math.abs(pixels[i] - next[i]);
      assert.ok(
        delta / pixels.length > 0.3,
        `adjacent seed delta ${delta / pixels.length}`,
      );
      const stats = await sharp(Buffer.from(svg)).stats();
      assert.ok(stats.channels.slice(0, 3).some((c) => c.stdev > 4));
      const png = await sharp(Buffer.from(svg)).png().toBuffer();
      const metadata = await sharp(png).metadata();
      assert.equal(metadata.width, 350);
      assert.equal(metadata.height, 220);
    });
  }
test("country API rejects mismatched jurisdictions and invalid options", () => {
  for (const country of ["constructor", "__proto__", "mexico", ""])
    assert.throws(() => render("jalisco", { country }), /Unknown country/);
  assert.throws(
    () => render("jalisco", { country: "ca" }),
    /Unknown jurisdiction/,
  );
  for (const country of ["mx", "ca"]) {
    const jurisdiction = expected[country][0];
    for (const seed of [-1, NaN, Infinity, 1.5, 2 ** 32])
      assert.throws(() => render(jurisdiction, { country, seed }), /seed/);
    assert.throws(
      () => render(jurisdiction, { country, width: 0 }),
      /dimensions/,
    );
  }
});
test("country batches preserve namespacing and exact manifest hashes", async () => {
  const dir = await mkdtemp(join(tmpdir(), "countries-"));
  try {
    execFileSync(process.execPath, [
      "src/cli.js",
      "--country",
      "all",
      "--format",
      "svg",
      "--width",
      "350",
      "--height",
      "220",
      "--out",
      dir,
    ]);
    const m = JSON.parse(await readFile(join(dir, "manifest.json"), "utf8"));
    assert.equal(m.version, 2);
    assert.equal(m.items.length, 95);
    assert.equal(
      new Set(m.items.map((i) => i.country + "/" + i.jurisdiction)).size,
      95,
    );
    for (const item of m.items)
      for (const f of item.files) {
        assert.ok(f.filename.startsWith(item.country + "/"));
        const bytes = await readFile(join(dir, f.filename));
        assert.equal(
          createHash("sha256").update(bytes).digest("hex"),
          f.sha256,
        );
      }
    for (const args of [
      ["--country", "bogus"],
      ["--country", ""],
      ["--country", "all", "--state", "jalisco"],
      ["--country", "ca", "--state", "jalisco"],
    ]) {
      const p = spawnSync(process.execPath, [
        "src/cli.js",
        ...args,
        "--out",
        join(dir, "invalid"),
      ]);
      assert.equal(p.status, 1);
      await assert.rejects(access(join(dir, "invalid")));
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("single Canadian jurisdiction writes a two-seed country batch", async () => {
  const dir = await mkdtemp(join(tmpdir(), "canada-batch-"));
  try {
    execFileSync(process.execPath, [
      "src/cli.js",
      "--country",
      "ca",
      "--state",
      "quebec",
      "--count",
      "2",
      "--seed",
      "77",
      "--format",
      "both",
      "--width",
      "350",
      "--height",
      "220",
      "--out",
      dir,
    ]);
    const m = JSON.parse(await readFile(join(dir, "manifest.json"), "utf8"));
    assert.deepEqual(
      m.items.map((i) => [i.country, i.jurisdiction, i.seed]),
      [
        ["ca", "quebec", 77],
        ["ca", "quebec", 78],
      ],
    );
    for (const item of m.items)
      for (const f of item.files) {
        const bytes = await readFile(join(dir, f.filename));
        assert.equal(
          createHash("sha256").update(bytes).digest("hex"),
          f.sha256,
        );
      }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
