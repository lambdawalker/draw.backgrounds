# Install draw-backgrounds

Requires Node.js 22 or newer for Node integrations. The package uses ESM. The root SVG entry point also works in browser bundlers.

## Install from a Git tag

GitHub currently has the historical source tag `v0.0.1`. Its package manifest declares `0.1.0`. npm resolves the Git selector using the tag and reports the installed version from that manifest.

```sh
npm install "github:lambdawalker/draw.backgrounds#v0.0.1"
```

For a later source snapshot, substitute the exact tag you reviewed. Use the README at that tag for version-matched API examples. [Tagged README for v0.0.1](https://github.com/lambdawalker/draw.backgrounds/blob/v0.0.1/README.md)

## Install from npm

Check the public registry for an available version. A Git tag does not establish npm availability.

```sh
npm view @lambdawalker/draw-backgrounds dist-tags --json
```

Once the registry confirms a release, install the published package or pin its confirmed version.

```sh
npm install @lambdawalker/draw-backgrounds
```

Use `--omit=optional` on either install command for SVG-only use. Canvas requires a compatible native `@napi-rs/canvas` binary. See the [development integration guide](docs/agents/index.md) for API contracts and troubleshooting.
