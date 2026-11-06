import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  cpSync,
  symlinkSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { execFileSync } from "node:child_process";
import { root, sha } from "./content.mjs";
test("complete build retains immutable release docs, fallback scope, and semantic latest", () => {
  const fixture = mkdtempSync(join(tmpdir(), "draw-docs-archive-"));
  const put = (p, s) => {
    mkdirSync(dirname(join(fixture, p)), { recursive: true });
    writeFileSync(join(fixture, p), s);
  };
  const git = (...args) =>
    execFileSync("git", args, {
      cwd: fixture,
      encoding: "utf8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  try {
    cpSync(join(root, "sites/scripts"), join(fixture, "sites/scripts"), {
      recursive: true,
    });
    cpSync(join(root, "sites/styles"), join(fixture, "sites/styles"), {
      recursive: true,
    });
    symlinkSync(
      join(root, "sites/node_modules"),
      join(fixture, "sites/node_modules"),
      "dir",
    );
    for (const [country, slug] of [
      ["us", "texas"],
      ["mx", "jalisco"],
      ["ca", "quebec"],
    ])
      for (const filename of [`${slug}.png`, "manifest.json"]) {
        const target = join(fixture, "previews", country, filename);
        mkdirSync(dirname(target), { recursive: true });
        cpSync(join(root, "previews", country, filename), target);
      }
    put(".gitignore", "sites/node_modules\nsites/dist\n");
    put("IMPORT.md", "# Installation");
    put("docs/agents/index.md", "# Old English\n\n[API](api.md)");
    put("docs/es/index.md", "# Español antiguo");
    put(
      "docs/translations.json",
      JSON.stringify({
        index: {
          sourceHash: sha("# Old English\n\n[API](api.md)"),
          locale: "es",
        },
      }),
    );
    git("init");
    git("config", "user.name", "Fixture");
    git("config", "user.email", "fixture@example.test");
    git("add", ".");
    git("commit", "-m", "old");
    const old = git("rev-parse", "HEAD");
    put("docs/agents/index.md", "# New English");
    put("docs/agents/api.md", "# New API");
    git("add", ".");
    git("commit", "-m", "new");
    const newer = git("rev-parse", "HEAD");
    const entry = (version, source) => ({
      version,
      tag: "v" + version,
      source,
      docsRef: source,
      npm: {
        name: "@lambdawalker/draw-backgrounds",
        version,
        integrity: "sha512-fixture",
      },
      publishRun: 1,
    });
    put(
      "docs/releases/catalog.json",
      JSON.stringify({
        schema: 1,
        releases: [entry("1.9.0", old), entry("1.10.0", newer)],
      }),
    );
    put("docs/agents/index.md", "# Unreleased worktree");
    execFileSync(process.execPath, ["sites/scripts/build.mjs"], {
      cwd: fixture,
      stdio: "pipe",
    });
    const output = (p) => readFileSync(join(fixture, "sites/dist", p), "utf8");
    assert(output("index.html").includes("/en/1.10.0/index/"));
    assert(output("en/1.9.0/index/index.html").includes("Old English"));
    assert(
      !output("en/1.9.0/index/index.html").includes("Unreleased worktree"),
    );
    assert(output("es/1.9.0/agents/index.md").includes("Español antiguo"));
    assert(output("es/1.10.0/agents/index.md").includes("New English"));
    assert(output("es/1.10.0/index/index.html").includes("desactualizada"));
    assert(
      output("en/1.10.0/api/index.html").includes(
        'value="/draw.backgrounds/en/1.9.0/index/"',
      ),
    );
    assert(
      output("en/development/index/index.html").includes("Unreleased worktree"),
    );
    assert.equal(JSON.parse(output("assets/manifest.json")).length, 9);
  } finally {
    rmSync(fixture, { recursive: true, force: true });
  }
});
