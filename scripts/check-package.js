import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const scratch = mkdtempSync(join(tmpdir(), "draw-backgrounds-package-"));
const npm = (...args) =>
  execFileSync(process.execPath, [process.env.npm_execpath, ...args], {
    encoding: "utf8",
  });

try {
  const [packed] = JSON.parse(
    npm("pack", "--json", "--pack-destination", scratch),
  );
  for (const { path } of packed.files) {
    assert.match(path, /^(src\/|README\.md$|package\.json$|LICENSE(?:\..*)?$)/);
    assert.notEqual(path, "src/cli.js");
  }

  for (const [name, flags] of [
    ["svg-only", ["--omit=optional"]],
    ["canvas", ["--include=optional"]],
  ]) {
    const consumer = join(scratch, name);
    mkdirSync(consumer);
    writeFileSync(
      join(consumer, "package.json"),
      JSON.stringify({ private: true }),
    );
    npm(
      "--prefix",
      consumer,
      "install",
      "--no-audit",
      "--no-fund",
      ...flags,
      join(scratch, packed.filename),
    );
    const checks = `
      import assert from "node:assert/strict";
      import { render, jurisdictionsByCountry } from "${packed.name}";
      assert.equal(Object.values(jurisdictionsByCountry).flat().length, 95);
      assert.match(render("quebec", { country: "ca", width: 64, height: 40 }), /^<svg /);
    `;
    const canvasChecks = `
      const { renderCanvas } = await import("${packed.name}/canvas");
      const canvas = renderCanvas("jalisco", { country: "mx", width: 64, height: 40 });
      assert.equal(canvas.width, 64);
      assert.equal(canvas.height, 40);
      assert.equal((await canvas.encode("png")).subarray(1, 4).toString(), "PNG");
    `;
    execFileSync(
      process.execPath,
      [
        "--input-type=module",
        "--eval",
        checks + (name === "canvas" ? canvasChecks : ""),
      ],
      { cwd: consumer, stdio: "inherit" },
    );
  }
  console.log(
    `Verified ${packed.name}@${packed.version} (${packed.files.length} files, ${packed.size} bytes packed).`,
  );
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
