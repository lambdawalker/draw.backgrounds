import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const repository = "lambdawalker/draw.backgrounds";
const packageName = "@lambdawalker/draw-backgrounds";
const catalogPath = "docs/releases/catalog.json";
const stable = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;
const sha = /^[a-f0-9]{40}$/;
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const gh = (...args) => execFileSync("gh", args, { encoding: "utf8" }).trim();

export function compareVersions(a, b) {
  assert.match(a, stable);
  assert.match(b, stable);
  const aa = a.split(".").map(BigInt);
  const bb = b.split(".").map(BigInt);
  for (let i = 0; i < 3; i++) {
    if (aa[i] !== bb[i]) return aa[i] > bb[i] ? 1 : -1;
  }
  return 0;
}

export function validateCatalog(catalog) {
  assert.equal(catalog.schema, 1, "Unsupported release catalog schema");
  assert.ok(Array.isArray(catalog.releases));
  const versions = new Set();
  for (const entry of catalog.releases) {
    assert.match(entry.version, stable);
    assert.equal(entry.tag, `v${entry.version}`);
    assert.match(entry.source, sha);
    assert.match(entry.docsRef, sha);
    assert.equal(entry.npm.name, packageName);
    assert.equal(entry.npm.version, entry.version);
    assert.match(entry.npm.integrity, /^sha512-[A-Za-z0-9+/]{86}==$/);
    assert.ok(Number.isSafeInteger(entry.publishRun) && entry.publishRun > 0);
    assert.ok(!versions.has(entry.version), "Duplicate release version");
    versions.add(entry.version);
  }
  return catalog;
}

export function mergeRelease(catalog, entry) {
  validateCatalog({ schema: 1, releases: [entry] });
  validateCatalog(catalog);
  const previous = catalog.releases.find(
    (item) => item.version === entry.version,
  );
  if (previous) {
    // A rerun may have a new run id, but may never change a confirmed identity.
    for (const key of ["tag", "source", "docsRef", "npm"]) {
      assert.deepEqual(previous[key], entry[key], `Conflicting release ${key}`);
    }
    return catalog;
  }
  return {
    schema: 1,
    releases: [...catalog.releases, entry].sort((a, b) =>
      compareVersions(a.version, b.version),
    ),
  };
}

export function validateRun(run, source, tag) {
  assert.equal(run.conclusion, "success", "Publication workflow must succeed");
  assert.equal(run.event, "push", "Publication must originate from a tag push");
  assert.equal(run.path, ".github/workflows/publish-npm.yml");
  assert.equal(run.head_repository.full_name, repository);
  assert.equal(run.repository.full_name, repository);
  assert.equal(
    run.head_sha,
    source,
    "Publish run does not match the tagged source",
  );
  assert.equal(
    run.head_branch,
    tag,
    "Publish run must be for the exact release tag",
  );
}

function retained(ref) {
  assert.match(ref, sha);
  assert.equal(git("rev-parse", `${ref}^{commit}`), ref);
  git("merge-base", "--is-ancestor", ref, "origin/main");
}

export function verifyHistory(catalog) {
  validateCatalog(catalog);
  for (const entry of catalog.releases) {
    assert.equal(
      git("rev-parse", `refs/tags/${entry.tag}^{commit}`),
      entry.source,
      "Release tag moved or is missing",
    );
    retained(entry.source);
    retained(entry.docsRef);
    const manifest = JSON.parse(git("show", `${entry.source}:package.json`));
    assert.equal(manifest.name, entry.npm.name);
    assert.equal(manifest.version, entry.version);
  }
}

async function confirm(tag, runId, docsRef) {
  assert.match(tag, /^v(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/);
  assert.match(runId, /^\d+$/);
  const source = git("rev-parse", `refs/tags/${tag}^{commit}`);
  retained(source);
  docsRef ??= source;
  retained(docsRef);
  const manifest = JSON.parse(git("show", `${source}:package.json`));
  assert.equal(manifest.name, packageName);
  assert.equal(tag, `v${manifest.version}`);
  const run = JSON.parse(
    gh("api", `repos/${repository}/actions/runs/${runId}`),
  );
  validateRun(run, source, tag);
  const scratch = mkdtempSync(join(tmpdir(), "draw-docs-confirm-"));
  try {
    gh(
      "run",
      "download",
      runId,
      "--repo",
      repository,
      "--name",
      "npm-release",
      "--dir",
      scratch,
    );
    const files = readdirSync(scratch);
    assert.equal(
      files.length,
      1,
      "Expected exactly one verified package artifact",
    );
    assert.ok(files[0].endsWith(".tgz"));
    const tarball = join(scratch, files[0]);
    const packed = JSON.parse(
      execFileSync("tar", ["-xOf", tarball, "package/package.json"], {
        encoding: "utf8",
      }),
    );
    assert.equal(packed.name, manifest.name);
    assert.equal(packed.version, manifest.version);
    const integrity =
      "sha512-" +
      createHash("sha512").update(readFileSync(tarball)).digest("base64");
    const response = await fetch(
      `https://registry.npmjs.org/${encodeURIComponent(packageName)}/${manifest.version}`,
      {
        cache: "no-store",
        signal: AbortSignal.timeout(30_000),
      },
    );
    assert.ok(
      response.ok,
      `npm version is unavailable (HTTP ${response.status})`,
    );
    const published = await response.json();
    assert.equal(published.name, packageName);
    assert.equal(published.version, manifest.version);
    assert.equal(
      published.dist?.integrity,
      integrity,
      "npm integrity differs from the verified artifact; publication is not confirmed",
    );
    const entry = {
      version: manifest.version,
      tag,
      source,
      docsRef,
      npm: { name: packageName, version: manifest.version, integrity },
      publishRun: Number(runId),
    };
    const catalog = mergeRelease(
      JSON.parse(readFileSync(catalogPath, "utf8")),
      entry,
    );
    verifyHistory(catalog);
    writeFileSync(catalogPath, JSON.stringify(catalog, null, 2) + "\n");
    console.log(
      `Confirmed ${packageName}@${manifest.version}; review and merge ${catalogPath}.`,
    );
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const [command, tag, runId, docsRef] = process.argv.slice(2);
  if (command === "confirm") await confirm(tag, runId, docsRef);
  else if (command === "check") {
    verifyHistory(JSON.parse(readFileSync(catalogPath, "utf8")));
    console.log("Release documentation history verified.");
  } else
    throw new Error(
      "Usage: documentation-history.js check | confirm TAG PUBLISH_RUN_ID [DOCS_SHA]",
    );
}
