# Rendered gallery

<!-- publication-status:start -->
**Scope: Development (`main`).** These guides describe the source checkout. Read [installation](../../IMPORT.md) for confirmed publication status and choose documentation matching your exact dependency source.
<!-- publication-status:end -->

These are actual renderer outputs, not mockups or photographs. All three scenarios use seed 42 and proportional dimensions. Images contain no language-dependent text and are shared across translations. They demonstrate composition, not credential validity or model-training performance.

## United States · Texas

![Procedural Texas background with regional linework](../../previews/us/texas.png)

Select `render('texas', { country: 'us', seed: 42 })`. The country catalog contains 50 US states.

## Mexico · Jalisco

![Procedural Jalisco background with regional motifs](../../previews/mx/jalisco.png)

Select `render('jalisco', { country: 'mx', seed: 42 })`. Pass `mx` explicitly; the default is US. The catalog contains 32 Mexican federal entities.

## Canada · Quebec

![Procedural Quebec background with regional motifs](../../previews/ca/quebec.png)

Select `render('quebec', { country: 'ca', seed: 42 })`. The catalog contains 13 Canadian provinces and territories.

Run the [SVG and Canvas examples](recipes.md) to create these jurisdiction scenarios locally. The curated gallery and its source/configuration hashes are maintained separately from generated candidates; changing artwork requires visual review before accepting new baselines. See [limitations](limitations.md) before using images in a dataset.
