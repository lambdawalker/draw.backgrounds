import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { resolve } from "node:path";
export const root = resolve(import.meta.dirname, "../..");
export const base = "/draw.backgrounds";
export const repository = "https://github.com/lambdawalker/draw.backgrounds";
export const slugs = [
  "index",
  "quickstart",
  "concepts",
  "api",
  "recipes",
  "gallery",
  "limitations",
  "troubleshooting",
  "migration",
];
export const labels = {
  en: [
    "Overview",
    "Installation & quickstart",
    "How rendering works",
    "API reference",
    "Recipes & examples",
    "Rendered gallery",
    "Limits & compatibility",
    "Troubleshooting",
    "Migration",
  ],
  es: [
    "Descripción general",
    "Instalación e inicio",
    "Cómo funciona",
    "Referencia de API",
    "Recetas y ejemplos",
    "Galería renderizada",
    "Límites y compatibilidad",
    "Solución de problemas",
    "Migración",
  ],
};
export const sha = (content) =>
  createHash("sha256").update(content).digest("hex");
export function readAt(path, ref = null) {
  return ref
    ? execFileSync("git", ["show", `${ref}:${path}`], {
        cwd: root,
        maxBuffer: 32 * 1024 * 1024,
        stdio: ["pipe", "pipe", "pipe"],
      })
    : readFileSync(resolve(root, path));
}
export function optionalAt(path, ref) {
  try {
    return readAt(path, ref);
  } catch {
    return null;
  }
}
export function compareVersions(a, b) {
  const av = a.split(".").map(BigInt),
    bv = b.split(".").map(BigInt);
  for (let i = 0; i < 3; i++)
    if (av[i] !== bv[i]) return av[i] > bv[i] ? 1 : -1;
  return 0;
}
export function getCatalog() {
  const catalog = JSON.parse(readAt("docs/releases/catalog.json"));
  const seen = new Set();
  for (const release of catalog.releases) {
    if (
      !/^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/.test(
        release.version,
      ) ||
      seen.has(release.version)
    )
      throw Error("Invalid or duplicate release version");
    if (
      ![release.source, release.docsRef].every((ref) =>
        /^[a-f0-9]{40}$/.test(ref),
      )
    )
      throw Error("Release source and docsRef must be immutable Git commits");
    if (release.npm?.version !== release.version || !release.npm?.integrity)
      throw Error("Release lacks confirmed npm identity");
    execFileSync("git", ["cat-file", "-e", `${release.docsRef}^{commit}`], {
      cwd: root,
    });
    seen.add(release.version);
  }
  return catalog.releases.toSorted((a, b) =>
    compareVersions(b.version, a.version),
  );
}
export function guide(locale, slug, ref) {
  const english = optionalAt(`docs/agents/${slug}.md`, ref);
  if (!english) return null;
  if (locale === "en") return { markdown: english.toString(), fallback: false };
  const translation = optionalAt(`docs/es/${slug}.md`, ref);
  const manifest = JSON.parse(
    optionalAt("docs/translations.json", ref)?.toString() || "{}",
  );
  const entry = manifest[slug];
  const fresh = translation && entry?.sourceHash === sha(english);
  return {
    markdown: fresh ? translation.toString() : english.toString(),
    fallback: !fresh,
  };
}
export function route(locale, version, slug = "index") {
  return `${base}/${locale}/${version}/${slug}/`;
}
export function rawRoute(locale, version, slug = "index") {
  return `${base}/${locale}/${version}/agents/${slug}.md`;
}
// Only authored Markdown links outside fenced code are rewritten. Plain code is preserved.
export function rewriteMarkdown(markdown, rewrite) {
  let fenced = false;
  return markdown
    .split("\n")
    .map((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        fenced = !fenced;
        return line;
      }
      if (fenced) return line;
      return line.replace(
        /(!?\[[^\]]*\]\()([^\s)]+)(\))/g,
        (_, start, url, end) => start + rewrite(url) + end,
      );
    })
    .join("\n");
}
export function resolveLink(
  url,
  { locale, version, ref, raw = false, assets = [] },
) {
  if (/^(https?:|mailto:|#)/.test(url)) return url;
  const galleryAsset = assets.find(
    (a) => url === `../../previews/${a.country}/${a.slug}.png`,
  );
  if (galleryAsset) return `${base}/${galleryAsset.file}`;
  if (url.startsWith("/assets/")) {
    const asset = assets.find((a) => url === `/assets/${a.slug}.png`);
    return asset ? `${base}/${asset.file}` : base + url;
  }
  const [path, fragment] = url.split("#");
  const suffix = fragment ? "#" + fragment : "";
  const filename = path.split("/").at(-1);
  const slug = filename?.replace(/\.md$/, "");
  if (slugs.includes(slug) && !path.startsWith("../../"))
    return (
      (raw ? rawRoute(locale, version, slug) : route(locale, version, slug)) +
      suffix
    );
  if (filename === "IMPORT.md")
    return (
      (raw
        ? rawRoute(locale, version, "quickstart")
        : route(locale, version, "quickstart")) + suffix
    );
  const normalized = path.replace(/^(\.\.\/)+/, "").replace(/^\.\//, "");
  return `${repository}/blob/${ref}/${normalized}` + suffix;
}

export function scopedMarkdown(markdown, locale, release, latest = null) {
  if (!release && latest) {
    const status =
      locale === "es"
        ? `**Desarrollo sin publicar.** Usa el selector de versiones para consultar la versión publicada ${latest}.`
        : `**Unreleased development.** Use the version selector for confirmed release ${latest}.`;
    return markdown.replace(
      /<!-- publication-status:start -->[\s\S]*?<!-- publication-status:end -->/g,
      status,
    );
  }
  if (!release)
    return markdown.replace(/<!-- publication-status:(?:start|end) -->/g, "");
  const status =
    locale === "es"
      ? `**Versión publicada: ${release.version}.** Instala la versión exacta con \`npm install ${release.npm.name}@${release.version}\`. Código fuente: \`${release.source}\`.`
      : `**Published release: ${release.version}.** Install the exact version with \`npm install ${release.npm.name}@${release.version}\`. Source: \`${release.source}\`.`;
  return markdown.replace(
    /<!-- publication-status:start -->[\s\S]*?<!-- publication-status:end -->/g,
    status,
  );
}
