import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, readdir, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { render, states } from "../src/index.js";
for (const state of states) {
  test(`${state}: repeatable, variable, self-contained and rasterizable`, async () => {
    const a = render(state, { seed: 42, width: 700, height: 440 });
    assert.equal(a, render(state, { seed: 42, width: 700, height: 440 }));
    const b = render(state, { seed: 43, width: 700, height: 440 });
    assert.notEqual(a, b);
    assert.doesNotMatch(
      a,
      /<(?:text|image|script|foreignObject)\b|(?:NaN|Infinity)|href=/,
    );
    const bytes = await sharp(Buffer.from(a)).png().toBuffer();
    const meta = await sharp(bytes).metadata();
    assert.equal(meta.width, 700);
    assert.equal(meta.height, 440);
    const other = await sharp(Buffer.from(b)).png().toBuffer();
    assert.notDeepEqual(bytes, other);
    const stats = await sharp(bytes).stats();
    assert.ok(
      stats.channels.slice(0, 3).some((c) => c.stdev > 4),
      "not a blank field",
    );
  });
}
test("reject invalid inputs and prototype names", () => {
  for (const state of ["texas", "constructor", "__proto__"])
    assert.throws(() => render(state), /Unknown state/);
  for (const seed of [-1, 1.5, NaN, Infinity, 2 ** 32])
    assert.throws(() => render("utah", { seed }), /seed/);
  for (const [width, height] of [
    [0, 2],
    [1.5, 2],
    [Infinity, 2],
    [8193, 1],
    [8192, 8192],
  ])
    assert.throws(() => render("utah", { width, height }), /dimensions/);
});
test("batch CLI writes 20 matched seed/state records and valid file hashes", async () => {
  const dir = await mkdtemp(join(tmpdir(), "backgrounds-"));
  try {
    execFileSync(process.execPath, [
      "src/cli.js",
      "--state",
      "all",
      "--format",
      "both",
      "--seed",
      "123",
      "--count",
      "2",
      "--width",
      "350",
      "--height",
      "220",
      "--out",
      dir,
    ]);
    const m = JSON.parse(await readFile(join(dir, "manifest.json"), "utf8"));
    assert.equal(m.items.length, 20);
    for (const state of states)
      assert.deepEqual(
        m.items.filter((i) => i.state === state).map((i) => i.seed),
        [123, 124],
      );
    for (const item of m.items)
      for (const file of item.files) {
        const b = await readFile(join(dir, file.filename));
        assert.equal(createHash("sha256").update(b).digest("hex"), file.sha256);
      }
    assert.equal((await readdir(dir)).length, 41);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
test("CLI errors before writing; help succeeds", async () => {
  const dir = await mkdtemp(join(tmpdir(), "invalid-backgrounds-"));
  const out = join(dir, "must-not-exist");
  try {
    for (const args of [
      ["--state", "bogus"],
      ["--count", "0"],
      ["--format", "jpg"],
      ["--seed", "4294967295", "--count", "2"],
      ["--width", "-1"],
      ["--unexpected"],
    ]) {
      const r = spawnSync(
        process.execPath,
        ["src/cli.js", ...args, "--out", out],
        {
          encoding: "utf8",
        },
      );
      assert.equal(r.status, 1);
      assert.match(r.stderr, /Error:/);
      await assert.rejects(access(out));
    }
    assert.equal(
      spawnSync(process.execPath, ["src/cli.js", "--help"]).status,
      0,
    );
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("different designs and seeds use disjoint SVG definition IDs", () => {
  const ids = new Set();
  for (const state of states)
    for (const seed of [42, 43]) {
      const svg = render(state, { seed });
      const own = [...svg.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]);
      for (const id of own) {
        assert.ok(!ids.has(id), `duplicate ${id}`);
        ids.add(id);
      }
      for (const [, ref] of svg.matchAll(/url\(#([^)]*)\)/g))
        assert.ok(own.includes(ref), `missing ${ref}`);
    }
});
test("consecutive seeds produce measurable raster diversity across each design", async () => {
  for (const state of states) {
    let previous,
      total = 0,
      pairs = 0;
    for (let seed = 42; seed < 47; seed++) {
      const data = await sharp(
        Buffer.from(render(state, { seed, width: 350, height: 220 })),
      )
        .removeAlpha()
        .raw()
        .toBuffer();
      if (previous) {
        let sum = 0;
        for (let i = 0; i < data.length; i++)
          sum += Math.abs(data[i] - previous[i]);
        total += sum / data.length;
        pairs++;
      }
      previous = data;
    }
    assert.ok(
      total / pairs > 0.3,
      `${state}: adjacent-seed mean channel delta ${total / pairs} is too small`,
    );
  }
});
