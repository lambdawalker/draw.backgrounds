# US background rendering benchmark

The median total draw time for all 50 state backgrounds was **48.16 s with SVG + Sharp** and **4.99 s with Canvas 2D**, a **9.65× speedup**. Canvas had the lower median in **50 of 50 states**.

| Draw time summed across 50 states | SVG + Sharp | Canvas 2D |
| --- | ---: | ---: |
| Median | 48.16 s | 4.99 s |
| p95 | 52.61 s | 7.28 s |

Measured at **1400 × 880** on linux x64, INTEL(R) XEON(R) PLATINUM 8573C, Node v24.22.1, Sharp 0.34.5 (librsvg 2.61.2), and @napi-rs/canvas 1.0.0. Each state used 1 warm-up seed and 5 measured seeds (43–47). Each batch total is the sum of the 50 draw times for one seed. With 5 samples, nearest-rank p95 is the slowest sample.

SVG draw includes generation, serialization, and Sharp rasterization to RGBA. Canvas draw includes surface creation, drawing, and copying RGBA pixels into an owned buffer. Both outputs use the same Sharp PNG encoder, timed separately. Raster output may vary slightly because the two engines apply antialiasing and compositing differently. The parity test checks the mean absolute RGBA difference across all 50 state designs.

```sh
npm ci
npm run benchmark:us -- --samples 5 --warmup 1 --json us-benchmark.json
```

## Per-state timings

Times are milliseconds. Speedup is SVG draw median divided by Canvas draw median.

| State | SVG generation median | SVG draw median | SVG draw p95 | Canvas draw median | Canvas draw p95 | Speedup | SVG PNG encoding median | Canvas PNG encoding median |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| alabama | 64.7 | 789.3 | 1638.5 | 84.7 | 119.1 | 9.32× | 77.7 | 89.4 |
| alaska | 139.6 | 3090.8 | 4229.7 | 184.8 | 203.1 | 16.73× | 120.9 | 135.6 |
| arizona | 75.7 | 1031.0 | 1455.6 | 157.4 | 285.3 | 6.55× | 120.0 | 125.7 |
| arkansas | 63.2 | 1741.9 | 2451.4 | 78.9 | 85.8 | 22.08× | 97.3 | 100.9 |
| california | 50.5 | 872.8 | 917.3 | 76.9 | 124.8 | 11.35× | 93.3 | 104.9 |
| colorado | 76.4 | 1982.2 | 2188.4 | 151.7 | 155.7 | 13.07× | 80.4 | 79.2 |
| connecticut | 41.8 | 1412.1 | 1482.6 | 79.5 | 98.0 | 17.75× | 81.3 | 90.4 |
| delaware | 40.2 | 625.0 | 703.6 | 73.2 | 75.4 | 8.54× | 89.8 | 87.6 |
| florida | 48.1 | 998.8 | 1320.0 | 111.6 | 214.8 | 8.95× | 136.8 | 137.8 |
| georgia | 48.1 | 1997.2 | 4136.2 | 124.6 | 1027.6 | 16.03× | 127.4 | 152.1 |
| hawaii | 41.5 | 587.8 | 834.3 | 85.9 | 127.7 | 6.84× | 89.8 | 118.0 |
| idaho | 72.0 | 2256.6 | 2386.0 | 155.4 | 186.8 | 14.52× | 127.1 | 138.5 |
| illinois | 77.0 | 1565.7 | 1754.3 | 102.5 | 108.7 | 15.28× | 107.8 | 117.2 |
| indiana | 33.6 | 566.1 | 589.8 | 61.3 | 79.4 | 9.23× | 68.1 | 76.0 |
| iowa | 32.3 | 934.4 | 959.2 | 59.8 | 64.6 | 15.63× | 69.2 | 74.7 |
| kansas | 21.9 | 362.6 | 415.3 | 48.5 | 53.8 | 7.48× | 66.4 | 66.3 |
| kentucky | 6.3 | 358.4 | 426.4 | 25.0 | 50.9 | 14.34× | 53.2 | 56.4 |
| louisiana | 52.8 | 1716.0 | 1781.1 | 80.7 | 99.1 | 21.27× | 110.4 | 114.2 |
| maine | 18.1 | 334.1 | 417.2 | 38.2 | 45.9 | 8.76× | 88.5 | 101.0 |
| maryland | 17.4 | 363.9 | 400.3 | 36.3 | 40.8 | 10.03× | 101.7 | 96.4 |
| massachusetts | 13.6 | 279.7 | 307.6 | 26.3 | 36.3 | 10.65× | 83.7 | 91.8 |
| michigan | 50.1 | 589.9 | 672.1 | 75.9 | 79.0 | 7.78× | 113.4 | 97.2 |
| minnesota | 4.5 | 164.1 | 198.8 | 26.1 | 58.4 | 6.30× | 50.3 | 54.4 |
| mississippi | 22.5 | 476.0 | 511.3 | 33.1 | 38.7 | 14.39× | 92.3 | 91.4 |
| missouri | 66.3 | 495.3 | 639.3 | 78.2 | 84.8 | 6.34× | 93.8 | 87.3 |
| montana | 35.6 | 789.4 | 897.4 | 143.2 | 197.7 | 5.51× | 82.5 | 83.8 |
| nebraska | 66.0 | 996.4 | 1196.1 | 136.8 | 202.8 | 7.28× | 100.7 | 111.1 |
| nevada | 74.4 | 856.3 | 959.6 | 113.7 | 152.4 | 7.53× | 93.4 | 91.9 |
| new-hampshire | 72.8 | 716.9 | 822.6 | 114.8 | 145.0 | 6.24× | 106.7 | 105.6 |
| new-jersey | 26.8 | 606.7 | 638.2 | 70.4 | 126.4 | 8.62× | 93.5 | 95.5 |
| new-mexico | 63.1 | 910.0 | 1718.4 | 352.9 | 615.7 | 2.58× | 112.4 | 222.2 |
| new-york | 83.8 | 640.7 | 754.9 | 106.4 | 173.3 | 6.02× | 106.0 | 117.3 |
| north-carolina | 52.8 | 852.7 | 994.5 | 100.5 | 122.3 | 8.48× | 95.2 | 91.7 |
| north-dakota | 45.2 | 740.8 | 797.7 | 93.5 | 107.0 | 7.92× | 90.1 | 108.7 |
| ohio | 50.9 | 471.8 | 593.3 | 84.5 | 101.1 | 5.58× | 104.9 | 95.3 |
| oklahoma | 29.5 | 393.9 | 461.5 | 64.6 | 107.7 | 6.09× | 92.4 | 87.1 |
| oregon | 58.3 | 934.8 | 1275.0 | 128.7 | 133.2 | 7.26× | 93.2 | 94.8 |
| pennsylvania | 88.6 | 800.4 | 857.7 | 117.1 | 155.1 | 6.83× | 100.1 | 110.5 |
| rhode-island | 8.3 | 163.2 | 172.4 | 26.0 | 26.6 | 6.29× | 41.5 | 44.1 |
| south-carolina | 49.3 | 392.4 | 1493.0 | 90.6 | 144.1 | 4.33× | 82.2 | 102.2 |
| south-dakota | 51.3 | 1020.4 | 1360.6 | 108.1 | 151.7 | 9.44× | 92.7 | 172.9 |
| tennessee | 108.9 | 2189.5 | 3491.2 | 173.5 | 965.2 | 12.62× | 134.0 | 164.6 |
| texas | 56.4 | 570.8 | 1071.4 | 86.6 | 121.8 | 6.60× | 123.5 | 130.9 |
| utah | 33.2 | 2098.5 | 2283.1 | 103.4 | 125.0 | 20.30× | 93.8 | 81.4 |
| vermont | 48.5 | 553.3 | 693.1 | 101.8 | 104.3 | 5.43× | 70.4 | 80.5 |
| virginia | 39.0 | 418.2 | 481.3 | 49.0 | 51.5 | 8.53× | 68.8 | 68.7 |
| washington | 60.9 | 2267.0 | 2806.6 | 152.6 | 223.0 | 14.85× | 151.4 | 249.1 |
| west-virginia | 36.5 | 353.6 | 409.7 | 58.3 | 88.7 | 6.07× | 60.4 | 71.8 |
| wisconsin | 37.7 | 503.5 | 577.0 | 81.0 | 205.3 | 6.22× | 123.9 | 115.9 |
| wyoming | 47.4 | 1711.6 | 1842.8 | 108.2 | 311.9 | 15.83× | 128.3 | 121.1 |
