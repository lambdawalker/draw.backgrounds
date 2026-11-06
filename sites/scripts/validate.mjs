import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, join } from "node:path";
import assert from "node:assert/strict";
import { root, base, slugs, sha, rewriteMarkdown } from "./content.mjs";
const out = resolve(import.meta.dirname, "../dist");
const catalog = JSON.parse(readFileSync(join(out, "catalog.json")));
const files = (dir) =>
  readdirSync(dir).flatMap((name) =>
    statSync(join(dir, name)).isDirectory()
      ? files(join(dir, name))
      : [join(dir, name)],
  );
let links = 0;
for (const file of files(out).filter((f) => f.endsWith(".html"))) {
  const html = readFileSync(file, "utf8");
  for (const match of html.matchAll(/(?:href|src|value)="([^"<>]+)"/g)) {
    const url = match[1].replaceAll("&amp;", "&");
    if (!url.startsWith(base + "/") && !url.startsWith("#")) continue;
    const [path, fragment] = url.split("#");
    let target = path
      ? join(out, decodeURIComponent(path.slice(base.length)))
      : file;
    if (statSync(target).isDirectory()) target = join(target, "index.html");
    const text = readFileSync(target);
    if (fragment && target.endsWith(".html"))
      assert(
        text.toString().includes(`id="${fragment}"`),
        `Missing anchor ${url} from ${file}`,
      );
    links++;
  }
}
for (const file of files(out).filter((f) => f.endsWith(".md"))) {
  rewriteMarkdown(readFileSync(file, "utf8"), (url) => {
    if (url.startsWith(base + "/")) {
      const path = url.split("#")[0];
      readFileSync(join(out, decodeURIComponent(path.slice(base.length))));
      links++;
    } else if (!/^(https?:|mailto:|#)/.test(url)) {
      assert.fail(`Unscoped raw Markdown link ${url} from ${file}`);
    }
    return url;
  });
}
for (const page of catalog.pages) {
  const raw = join(out, page.locale, page.version, "agents", page.slug + ".md");
  assert(
    readFileSync(raw, "utf8").includes("Documentation") ||
      readFileSync(raw, "utf8").includes("documentación"),
  );
}
const manifest = JSON.parse(readFileSync(join(root, "docs/translations.json")));
for (const slug of slugs) {
  const english = readFileSync(join(root, "docs/agents", slug + ".md"), "utf8");
  const spanish = readFileSync(join(root, "docs/es", slug + ".md"), "utf8");
  assert.equal(
    manifest[slug].sourceHash,
    sha(english),
    `Stale translation ${slug}`,
  );
  const code = (s) =>
    [...s.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map((m) => m[1]);
  assert.deepEqual(
    code(spanish),
    code(english),
    `Translated executable code in ${slug}`,
  );
}
for (const asset of JSON.parse(readFileSync(join(out, "assets/manifest.json"))))
  assert.equal(sha(readFileSync(join(out, asset.file))), asset.sha256);
assert.equal(
  catalog.pages.filter((p) => p.version === "development").length,
  slugs.length * 2,
);
console.log(
  `Validated ${links} local links, all raw guides, EN/ES code parity and translation hashes, gallery integrity.`,
);
