import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import test from "node:test";

const { version } = JSON.parse(readFileSync("package.json", "utf8"));
const check = (tag) =>
  spawnSync(process.execPath, ["scripts/check-release-tag.js", tag], {
    encoding: "utf8",
  });

test("only a canonical stable tag matching the manifest passes", () => {
  assert.equal(check(`v${version}`).status, 0);
  for (const tag of [version, `v${version}-rc.1`, "v00.1.0", "v999.999.999"]) {
    const result = check(tag);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Expected stable release tag/);
  }
});
