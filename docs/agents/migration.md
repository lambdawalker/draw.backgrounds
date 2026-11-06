# Migration and version scope

<!-- publication-status:start -->
**Development (`main`).** These canonical guides describe current source, not a confirmed npm release. The initial known historical source boundary is Git tag `v0.0.1`, whose package manifest says `0.1.0`. Do not equate these identities, move the tag, or infer registry publication. Use its [immutable tagged README](https://github.com/lambdawalker/draw.backgrounds/blob/v0.0.1/README.md) for historical behavior. These newly authored guides are not presented as documentation that existed at that tag.
<!-- publication-status:end -->

## Select and upgrade deliberately

1. Record the installed Git selector or registry version and resolved commit, plus lockfile and native runtime.
2. Read [IMPORT.md](../../IMPORT.md) for availability and check the target source API before copying its examples.
3. Import SVG and catalogs from the package root, Canvas from `/canvas`. Replace deep implementation imports; no stability is promised for them.
4. Preserve explicit country, seed and dimensions. Regenerate representative outputs with both renderers used by your application.
5. Compare SVG hashes within the same source and decoded raster pixels under a pinned toolchain. Review visual changes before accepting new dataset baselines.

## Existing US integrations

`render('texas')` still defaults to US and `states` remains the US-only catalog. To add Mexico or Canada, choose `jurisdictionsByCountry[country]` and pass `country` explicitly. Do not replace `states` with `countries`: one contains jurisdiction slugs, the other country codes.

Legacy CLI calls without `--country` keep flat US output and version-1 manifests. Explicit country selection creates country subdirectories and version-2 manifests with country and jurisdiction fields. Update readers to inspect manifest version and preserve relative paths instead of assuming one flat directory. This describes current compatibility behavior, not an exhaustive historical changelog.

## Documentation and translations

English files in `docs/agents/` are canonical. Spanish guides in `docs/es/` preserve executable code and API identifiers. `docs/translations.json` records the SHA-256 of each reviewed English source. A changed source hash requires translation review, not automatic marker refresh. Historical API, installation, examples and translated content must stay pinned to their own source identity; if a translation is absent or stale, show an explicit notice and the same-scope English guide.
