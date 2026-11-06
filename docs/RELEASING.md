# Tag releases and review rendered backgrounds

## Release a new version

1. Choose an unused stable version. Update `version` in `package.json` and run `npm install --package-lock-only`. Include the relevant API and example changes in the same review.
2. Confirm the intended distribution license and merge the release commit into `main`.
3. Tag the exact merged commit with `vX.Y.Z` matching `package.json`. For example, for an unused `0.1.0`:

   ```sh
   git fetch origin main
   git tag -a v0.1.0 origin/main -m "Release v0.1.0"
   git push origin refs/tags/v0.1.0
   ```

4. Watch [Publish npm package](https://github.com/lambdawalker/draw.backgrounds/actions/workflows/publish-npm.yml). It checks that the tagged source belongs to `main`, validates the tag and version, tests the source, and installs both public entry points from the same tarball it will publish.
5. Confirm the public version with `npm view @lambdawalker/draw-backgrounds@0.1.0 dist.integrity`. Use the requested version in that command. [Installation](../IMPORT.md) is the consumer entry point. Historical docs live at their original Git tags.

The legacy `v0.0.1` tag predates this workflow and points to a manifest declaring `0.1.0`. It remains a source-install option. New release tags must match the manifest. Keep release tags immutable. Push one release tag at a time.

## Set up npm authentication and retry safely

For an existing npm package, configure [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/) for repository `lambdawalker/draw.backgrounds` and workflow filename `publish-npm.yml`. The publishing job uses OIDC. If the package does not yet exist and npm requires a first upload before configuring trust, bootstrap with the verified tarball from that tag and a maintainer account authorized for the scope. Download the `npm-release` artifact from the verified tag run, then use `npm login` and `npm publish ./<verified-tarball>.tgz --access public`. Configure trust and rerun the failed publishing job.

If publishing or registry confirmation fails, check the exact version before retrying. The workflow accepts an already public version only if its tarball integrity matches. A conflicting integrity requires reconciliation. Rerun the failed job on the same tag after fixing permissions or a transient registry issue. A corrected source revision needs a new version and tag. GitHub may replace a pending publication job when releases overlap, so rerun the affected tag if needed.

## Reproduce and review visual evidence

`npm test` compares both renderers for all 95 jurisdictions at seed 42 and 420 × 264, checks that generated images are usable, and exercises seed variation. It also compares Texas, Jalisco, and Quebec against reviewed SVG hashes and checks their gallery files against the manifests. The other jurisdictions have renderer parity coverage.

```sh
npm ci
npm run previews -- /tmp/draw-background-candidates
```

The preview generator uses seed 42 and 1400 × 880, with a SHA-256 manifest per country. Open the contact sheets and relevant individual renders. Check linework, clipping, recognizable motifs, and space for overlaid content. To update the [reviewed gallery](../previews/README.md), copy the intentionally accepted outputs and matching manifest entries into `previews/` in a reviewed commit. Record the candidate source revision in the review. CI does not update reviewed assets. The manual [Check background renders](https://github.com/lambdawalker/draw.backgrounds/actions/workflows/visual-checks.yml) workflow uploads candidates independently of publishing.
