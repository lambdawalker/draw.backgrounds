# Maintain the documentation

The current English consumer contract is authored in `docs/agents/`. Spanish guides live in `docs/es/`. The website builds these sources; HTML is generated, not separately authored. `IMPORT.md` remains the repository installation entry point. Development is explicit and never proves npm availability.

## Build and review

From the repository root:

```sh
npm ci
node examples/render-svg.mjs
node examples/render-canvas.mjs
npm --prefix sites ci
node scripts/documentation-history.js check
npm --prefix sites run check
```

Run `npm --prefix sites run preview` after building to inspect `http://localhost:4321/draw.backgrounds/`. The site uses a small Markdown-based static builder with locked site-only dependencies; consumer imports do not load website code.

The site output is `sites/dist/`. The build assembles the complete catalog from a clean output directory, including HTML, version-scoped Markdown, agent discovery and shared media. Historical Markdown is read from Git as data using the current builder. No historical scripts or dependencies are executed. Keep full Git history and tags available (`git fetch origin main --tags`); missing historical revisions are errors, never a fallback to Development.

Review the production output on desktop and a narrow viewport before merging layout changes. Review the canonical guide and the matching Spanish translation together. Translation provenance must describe the actual reviewed canonical content; do not refresh hashes to hide an untranslated change. Missing or stale translations must remain explicit and fall back to canonical content from the same documentation revision.

## Initial history boundary

`docs/releases/catalog.json` starts with no confirmed npm releases. A manifest version, Git tag, source install, or successful documentation build is not publication evidence. The legacy `v0.0.1` source tag declares package version `0.1.0`; it is not a matching npm release and cannot be admitted by the stable confirmation command. Development is the default until a confirmed stable release is merged into the catalog.

Each stable catalog entry records `version`, `tag`, immutable `source` and `docsRef` commit SHAs, exact `npm.name`, `npm.version`, `npm.integrity`, and the successful `publishRun` ID. Both commits must be retained ancestors of `origin/main`; the tag must still resolve to `source`. The catalog is durable Git history. Workflow artifacts are transport and evidence during confirmation, never the storage used to retain published documentation. Every deployment rebuilds every cataloged version. Latest is selected numerically by semantic version, so an older recovery cannot replace a newer release.

## Confirm after package publication

The existing **Publish npm package** workflow owns publication and checks the exact tarball. The **Documentation** workflow runs after a successful publication, checks out current `main`, independently verifies the run and the public registry, and proposes a catalog PR. It does not publish packages or move release tags.

The confirmation command:

1. Verifies the stable tag matches the tagged package manifest and points into retained `main` history.
2. Uses the GitHub API to require a successful `publish-npm.yml` tag-push run for this repository, exact tag and source SHA.
3. Downloads only that run's `npm-release` artifact, reads its package manifest as data, and computes its SHA-512 integrity.
4. Requires the public npm record for that exact package version to match the same integrity.
5. Preserves every earlier catalog entry and rejects conflicting release identities.

The followup uploads `confirmed-documentation-catalog` for recovery and opens or updates a `docs/confirm-vX.Y.Z` PR. Review and merge the catalog PR to activate the release documentation. Publication alone does not switch the documentation root; the durable catalog merge does. Merge conflicts between concurrent confirmations require rerunning confirmation against fresh `main`, preserving both records. A rerun of an already recorded identical release is a no-op.

For a missed followup, use **Documentation → Run workflow** on `main` with `release_tag` and `publish_run`, or run locally with authenticated GitHub CLI and read access to Actions artifacts:

```sh
git fetch origin main --tags
node scripts/documentation-history.js confirm v1.2.3 123456789
node scripts/documentation-history.js check
npm --prefix sites run check
```

Replace the example tag and run ID with the actual publication. The command changes only the local catalog; review and merge it. If the original artifact expired, rerun the original trusted tag publication workflow. Its existing integrity check accepts an already published identical package; use the resulting successful run as fresh evidence. If registry metadata, source identity or integrity disagrees, stop and reconcile it; do not fabricate a catalog entry or edit the old tag.

For a release whose original source predates the complete manuals, first review the current manual against that old API and merge the documentation correction. Pass its **already retained main commit SHA** as a third argument:

```sh
node scripts/documentation-history.js confirm v1.2.3 123456789 FULL_RETAINED_DOCS_COMMIT_SHA
```

A later correction to an existing release is a separately reviewed edit to its `docsRef` after the corrected documentation commit has landed on `main`. Preserve `source`, tag and npm identity. Never pin a PR-only SHA that squash merging can discard. Explain the correction in the PR; the site exposes the distinct source and documentation identities.

## GitHub configuration and deployment

Enable GitHub Pages with **GitHub Actions** as its source. The site is served under the repository project path `/draw.backgrounds/`; retain that base in generated links and assets. Configure any desired approval rules on the `github-pages` environment. The build job requires only repository read permission; the deploy job uses `pages: write` and `id-token: write`.

For automatic confirmation PRs, enable **Settings → Actions → General → Workflow permissions → Allow GitHub Actions to create and approve pull requests**. The confirmation job requests `contents: write`, `pull-requests: write`, and `actions: read`. It creates a reviewable branch; it does not merge it. If repository policy blocks bot PR creation, the workflow fails visibly after preserving the catalog artifact. A maintainer can apply the proposed entry to fresh `main`, preserve other entries, run the checks, and create the PR manually.

GitHub suppresses some events generated with `GITHUB_TOKEN`, so bot-created PRs may not trigger normal PR checks. Run the commands above before approval. A human merge to `main` triggers the complete site build and deployment; dispatch **Documentation** on `main` if needed. PRs build preview artifacts without deployment permissions. A successful package workflow only proposes confirmation; it cannot directly deploy unmerged metadata. The deployment checks that its source is still current `main`, including after an environment approval delay. Failed publication, failed confirmation, and failed documentation validation never activate an available release.

No Pages deployment, npm publication, Git tag, or remote change is performed by local documentation checks.
