import {
  mkdirSync,
  writeFileSync,
  rmSync,
  readFileSync,
  copyFileSync,
} from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import {
  root,
  base,
  repository,
  slugs,
  labels,
  sha,
  readAt,
  getCatalog,
  guide,
  route,
  rawRoute,
  rewriteMarkdown,
  resolveLink,
  scopedMarkdown,
} from "./content.mjs";
const out = resolve(import.meta.dirname, "../dist");
const escape = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const markdown = new MarkdownIt({
  html: false,
  linkify: true,
  highlight(code, language) {
    return language && hljs.getLanguage(language)
      ? hljs.highlight(code, { language }).value
      : escape(code);
  },
});
markdown.renderer.rules.heading_open = (tokens, index) => {
  const text = tokens[index + 1].content;
  const id = text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
  return `<${tokens[index].tag} id="${escape(id)}">`;
};
rmSync(out, { recursive: true, force: true });
function write(path, content) {
  const target = resolve(out, path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content);
}
const releases = getCatalog();
const currentSha = execFileSync("git", ["rev-parse", "HEAD"], {
  cwd: root,
  encoding: "utf8",
}).trim();
const versions = [
  ...releases.map((r) => ({
    id: r.version,
    ref: r.docsRef,
    source: r.source,
    release: r,
  })),
  { id: "development", ref: null, source: currentSha },
];
const latest = releases[0]?.version || "development";
const texts = {
  en: {
    dev: "Development",
    scope: "Documentation scope",
    language: "Language",
    version: "Version",
    raw: "Agent Markdown",
    source: "Source",
    noRelease:
      "No npm release has been confirmed in the documentation catalog. These guides describe current development.",
    fallback:
      "This translation is missing or stale. Showing the English guide from the same documentation revision.",
    search: "Find a guide",
    gallery: "Three countries. One rendering API.",
    subtitle: "Seeded artwork for synthetic card datasets.",
    allVersions: "All versions and languages",
    copied: "Copied",
    copy: "Copy code",
    skip: "Skip to content",
    development: "development",
  },
  es: {
    dev: "Desarrollo",
    scope: "Ámbito de documentación",
    language: "Idioma",
    version: "Versión",
    raw: "Markdown para agentes",
    source: "Código fuente",
    noRelease:
      "El catálogo de documentación aún no confirma una publicación en npm. Estas guías describen el desarrollo actual.",
    fallback:
      "Esta traducción falta o está desactualizada. Se muestra la guía en inglés de la misma revisión.",
    search: "Buscar una guía",
    gallery: "Tres países. Una API de renderizado.",
    subtitle: "Arte reproducible para conjuntos de datos sintéticos.",
    allVersions: "Versiones e idiomas",
    copied: "Copiado",
    copy: "Copiar código",
    skip: "Ir al contenido",
    development: "desarrollo",
  },
};
const galleryAssets = [];
for (const version of versions) {
  const imageRef = version.release?.source || null;
  for (const [country, slug] of [
    ["us", "texas"],
    ["mx", "jalisco"],
    ["ca", "quebec"],
  ]) {
    const path = `previews/${country}/${slug}.png`;
    const bytes = readAt(path, imageRef);
    const manifest = JSON.parse(
      readAt(`previews/${country}/manifest.json`, imageRef),
    );
    const expected = manifest.items
      .find((item) => item.jurisdiction === slug)
      ?.files.find((file) => file.filename === `${slug}.png`)?.sha256;
    if (sha(bytes) !== expected)
      throw Error(`Gallery hash differs from reviewed manifest: ${path}`);
    const file = `assets/${sha(bytes).slice(0, 16)}-${slug}.png`;
    write(file, bytes);
    galleryAssets.push({
      version: version.id,
      country,
      slug,
      file,
      sha256: expected,
      source: version.source,
      width: manifest.width,
      height: manifest.height,
      seed: manifest.seed,
    });
  }
}
const pageInventory = [];
for (const version of versions)
  for (const locale of ["en", "es"]) {
    const t = texts[locale];
    const available = slugs.filter((slug) => guide(locale, slug, version.ref));
    if (!available.includes("index"))
      throw Error(`Missing overview for ${version.id}/${locale}`);
    for (const slug of available) {
      const content = guide(locale, slug, version.ref);
      content.markdown = scopedMarkdown(
        content.markdown,
        content.fallback ? "en" : locale,
        version.release,
        releases[0]?.version,
      );
      const linkOptions = {
        locale,
        version: version.id,
        ref: version.source,
        assets: galleryAssets.filter((a) => a.version === version.id),
      };
      const rewritten = rewriteMarkdown(content.markdown, (url) =>
        resolveLink(url, linkOptions),
      );
      const raw = rewriteMarkdown(content.markdown, (url) =>
        resolveLink(url, { ...linkOptions, raw: true }),
      );
      const scope = version.id === "development" ? t.dev : version.id;
      const status =
        version.id === "development" && !releases.length
          ? `<aside class="notice">${t.noRelease}</aside>`
          : "";
      const fallback = content.fallback
        ? `<aside class="notice">${t.fallback}</aside>`
        : "";
      const nav = available
        .map(
          (page) =>
            `<a href="${route(locale, version.id, page)}" ${slug === page ? 'aria-current="page"' : ""}>${labels[locale][slugs.indexOf(page)]}</a>`,
        )
        .join("");
      const versionOptions = versions
        .map((v) => {
          const exists = guide(locale, slug, v.ref);
          return `<option value="${route(locale, v.id, exists ? slug : "index")}" ${v.id === version.id ? "selected" : ""}>${v.id === "development" ? t.dev : v.id}${exists ? "" : " — overview"}</option>`;
        })
        .join("");
      const hero =
        slug === "index"
          ? `<section class="hero"><p class="eyebrow">DRAW.BACKGROUNDS</p><h1>${t.gallery}</h1><p>${t.subtitle}</p><div class="hero-images">${galleryAssets
              .filter((a) => a.version === version.id)
              .map(
                (a) =>
                  `<figure><img src="${base}/${a.file}" width="1400" height="880" alt="${a.slug}, ${a.country.toUpperCase()}, seed 42"><figcaption>${a.slug.replaceAll("-", " ")} · ${a.country.toUpperCase()}</figcaption></figure>`,
              )
              .join("")}</div></section>`
          : "";
      const title = labels[locale][slugs.indexOf(slug)];
      const path = `${locale}/${version.id}/${slug}/index.html`;
      write(
        path,
        `<!doctype html><html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} · draw.backgrounds · ${scope}</title><meta name="description" content="${escape(t.subtitle)}"><link rel="stylesheet" href="${base}/assets/site.css"><link rel="canonical" href="https://lambdawalker.github.io${route(locale, version.id, slug)}"><link rel="alternate" hreflang="${locale === "en" ? "es" : "en"}" href="https://lambdawalker.github.io${route(locale === "en" ? "es" : "en", version.id, slug)}"></head><body><a class="skip" href="#content">${t.skip}</a><header><a class="brand" href="${route(locale, version.id)}">draw<span>.</span>backgrounds</a><a href="${repository}">GitHub ↗</a></header><div class="layout"><aside class="sidebar"><p class="eyebrow">${t.scope}</p><label>${t.version}<select data-navigate>${versionOptions}</select></label><label>${t.language}<select data-navigate><option value="${route("en", version.id, slug)}" ${locale === "en" ? "selected" : ""}>English</option><option value="${route("es", version.id, slug)}" ${locale === "es" ? "selected" : ""}>Español</option></select></label><label>${t.search}<input type="search" id="search" placeholder="${t.search}"></label><nav aria-label="${escape(t.scope)}">${nav}</nav><a class="catalog-link" href="${base}/catalog.html">${t.allVersions}</a></aside><main id="content"><div class="scope">${scope} <span>· ${version.source.slice(0, 7)}</span></div>${status}${fallback}${hero}<article lang="${content.fallback ? "en" : locale}">${markdown.render(rewritten)}</article><footer><a href="${rawRoute(locale, version.id, slug)}">${t.raw}</a><a href="${repository}/blob/${version.ref || currentSha}/docs/${locale === "en" || content.fallback ? "agents" : "es"}/${slug}.md">${t.source}</a></footer></main></div><script src="${base}/assets/site.js" defer data-copy="${t.copy}" data-copied="${t.copied}"></script></body></html>`,
      );
      write(
        `${locale}/${version.id}/agents/${slug}.md`,
        `> ${t.scope}: ${scope}. Source ${version.source}. Documentation ${version.ref || "working tree"}.\n\n${content.fallback ? "> " + t.fallback + "\n\n" : ""}${raw}`,
      );
      pageInventory.push({
        locale,
        version: version.id,
        slug,
        path,
        fallback: content.fallback,
      });
    }
    if (version.release) {
      write(
        `${locale}/${version.id}/IMPORT.md`,
        `# ${locale === "es" ? "Instalación" : "Installation"} ${version.id}\n\n\`npm install ${version.release.npm.name}@${version.id}\`\n\nSource ${version.source}. Integrity ${version.release.npm.integrity}.\n`,
      );
    } else {
      write(
        `${locale}/${version.id}/IMPORT.md`,
        guide(locale, "quickstart", null)
          ? readFileSync(
              resolve(out, `${locale}/${version.id}/agents/quickstart.md`),
            )
          : readAt("IMPORT.md"),
      );
    }
  }
const destination = route("en", latest);
write(
  "index.html",
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="refresh" content="0;url=${destination}"><title>draw.backgrounds documentation</title><a href="${destination}">Open ${latest} documentation</a></html>`,
);
write(
  "catalog.html",
  `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Documentation versions</title><link rel="stylesheet" href="${base}/assets/site.css"><main><h1>Documentation versions / Versiones</h1><p>Only confirmed npm releases appear as release scopes. Development is explicit.</p>${versions.map((v) => `<section><h2>${v.id}</h2><a href="${route("en", v.id)}">English</a> · <a href="${route("es", v.id)}">Español</a> · <a href="${rawRoute("en", v.id)}">Agent Markdown</a></section>`).join("")}</main></html>`,
);
write(
  "catalog.json",
  JSON.stringify(
    {
      latest,
      versions: versions.map(({ id, source, ref }) => ({
        id,
        source,
        docsRef: ref,
      })),
      pages: pageInventory,
    },
    null,
    2,
  ),
);
write("assets/manifest.json", JSON.stringify(galleryAssets, null, 2));
write(
  "llms.txt",
  `# draw.backgrounds\n\nLatest documentation scope: ${latest}.\n\n- [Agent entry](https://lambdawalker.github.io${rawRoute("en", latest)})\n- [Spanish agent entry](https://lambdawalker.github.io${rawRoute("es", latest)})\n- [Version catalog](https://lambdawalker.github.io${base}/catalog.json)\n- [Installation](https://lambdawalker.github.io${base}/IMPORT.md)\n`,
);
write(
  "agents/index.md",
  readFileSync(resolve(out, `en/${latest}/agents/index.md`)),
);
write("IMPORT.md", readFileSync(resolve(out, `en/${latest}/IMPORT.md`)));
write(".nojekyll", "");
copyFileSync(
  resolve(import.meta.dirname, "../styles/site.css"),
  resolve(out, "assets/site.css"),
);
copyFileSync(
  resolve(import.meta.dirname, "../styles/site.js"),
  resolve(out, "assets/site.js"),
);
console.log(
  `Built ${pageInventory.length} HTML guides, matching raw Markdown, ${versions.length} version scopes, and ${galleryAssets.length} verified gallery assets.`,
);
