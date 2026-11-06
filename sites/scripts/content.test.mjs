import test from "node:test";
import assert from "node:assert/strict";
import {
  compareVersions,
  rewriteMarkdown,
  resolveLink,
  guide,
  readAt,
  scopedMarkdown,
} from "./content.mjs";
test("release ordering is semantic, including arbitrarily large components", () => {
  assert(compareVersions("1.10.0", "1.9.9") > 0);
  assert(compareVersions("9007199254740993.0.0", "9007199254740992.0.0") > 0);
  assert.equal(compareVersions("1.0.0", "1.0.0"), 0);
});
test("links retain locale and release scope; code fences remain verbatim", () => {
  const text = '[API](api.md)\n```js\nconst x = "[API](api.md)";\n```';
  const result = rewriteMarkdown(text, (url) =>
    resolveLink(url, { locale: "es", version: "1.2.3", ref: "abc" }),
  );
  assert(result.startsWith("[API](/draw.backgrounds/es/1.2.3/api/)"));
  assert(result.includes('const x = "[API](api.md)";'));
  assert.equal(
    resolveLink("api.md", { locale: "en", version: "1.0.0", raw: true }),
    "/draw.backgrounds/en/1.0.0/agents/api.md",
  );
});
test("fresh translations use Spanish and missing guides are absent", () => {
  assert.equal(guide("es", "index", null).fallback, false);
  assert.equal(guide("en", "nonexistent", null), null);
});
test("historical reads use Git objects, independent of worktree contents", () => {
  const historical = readAt("package.json", "HEAD");
  assert.equal(JSON.parse(historical).name, "@lambdawalker/draw-backgrounds");
});

test("publication status is scoped without displaying authoring markers", () => {
  const text =
    "<!-- publication-status:start -->Development only<!-- publication-status:end -->\nAPI stays";
  assert.equal(scopedMarkdown(text, "en", null), "Development only\nAPI stays");
  const released = scopedMarkdown(text, "es", {
    version: "1.2.3",
    source: "abc",
    npm: { name: "pkg" },
  });
  assert(released.includes("npm install pkg@1.2.3"));
  assert(!released.includes("Development"));
  assert(released.includes("API stays"));
});
