# Maintaining draw.backgrounds

- Read [the integration guide](docs/agents/index.md) for the consumer API and [installation](IMPORT.md) for dependency choices.
- Update the relevant examples and integration contracts when changing public behavior. Label development guidance and link historical consumers to the exact Git tag.
- Preserve deterministic seed behavior unless a change is intentional. Keep SVG and Canvas coverage for every jurisdiction, and use the actual renderers to create documentation images.
- Render candidates separately from the reviewed gallery. Inspect affected images and update reviewed assets and their manifests together. CI validates the gallery without accepting new baselines.
- Keep release tags immutable. New stable tags use `vX.Y.Z`, match `package.json`, and point to a commit on `main`. A source tag does not establish npm availability.
- See [the release runbook](docs/RELEASING.md) for commands, visual review, and release recovery.
