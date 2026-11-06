import assert from "node:assert/strict";
import test from "node:test";
import {
  compareVersions,
  mergeRelease,
  validateCatalog,
  validateRun,
} from "../scripts/documentation-history.js";

const entry = {
  version: "1.2.3",
  tag: "v1.2.3",
  source: "a".repeat(40),
  docsRef: "b".repeat(40),
  npm: {
    name: "@lambdawalker/draw-backgrounds",
    version: "1.2.3",
    integrity: "sha512-" + "a".repeat(86) + "==",
  },
  publishRun: 123,
};

test("history starts empty and orders versions semantically, without tag inference", () => {
  assert.deepEqual(validateCatalog({ schema: 1, releases: [] }).releases, []);
  assert.ok(compareVersions("1.10.0", "1.9.9") > 0);
  assert.throws(() => compareVersions("1.0.0-beta.1", "1.0.0"));
  assert.throws(() => compareVersions("01.0.0", "1.0.0"));
});

test("history retains confirmations and rejects rewritten identity", () => {
  const catalog = mergeRelease({ schema: 1, releases: [] }, entry);
  assert.equal(mergeRelease(catalog, { ...entry, publishRun: 124 }), catalog);
  for (const key of ["source", "docsRef"]) {
    assert.throws(() =>
      mergeRelease(catalog, { ...entry, [key]: "c".repeat(40) }),
    );
  }
  assert.throws(() =>
    mergeRelease(catalog, {
      ...entry,
      npm: { ...entry.npm, integrity: "sha512-" + "b".repeat(86) + "==" },
    }),
  );
  assert.throws(() => validateCatalog({ schema: 1, releases: [entry, entry] }));
  const older = {
    ...entry,
    version: "1.1.0",
    tag: "v1.1.0",
    npm: { ...entry.npm, version: "1.1.0" },
  };
  assert.deepEqual(
    mergeRelease(catalog, older).releases.map((item) => item.version),
    ["1.1.0", "1.2.3"],
  );
});

test("confirmation requires a successful matching trusted publication run", () => {
  const run = {
    head_branch: entry.tag,
    conclusion: "success",
    event: "push",
    path: ".github/workflows/publish-npm.yml",
    head_sha: entry.source,
    repository: { full_name: "lambdawalker/draw.backgrounds" },
    head_repository: { full_name: "lambdawalker/draw.backgrounds" },
  };
  validateRun(run, entry.source, entry.tag);
  for (const [key, value] of [
    ["head_branch", "main"],
    ["conclusion", "failure"],
    ["event", "pull_request"],
    ["path", ".github/workflows/other.yml"],
    ["head_sha", "c".repeat(40)],
    ["head_repository", { full_name: "fork/repo" }],
  ]) {
    assert.throws(() =>
      validateRun({ ...run, [key]: value }, entry.source, entry.tag),
    );
  }
});
