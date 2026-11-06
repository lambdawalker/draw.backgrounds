import { readFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync("package.json", "utf8"));
const tag = process.argv[2];
const stableTag = /^v(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$/;

if (!stableTag.test(tag ?? "") || tag !== `v${version}`) {
  throw new Error(
    `Expected stable release tag v${version}, received ${tag ?? "(none)"}`,
  );
}
console.log(`Verified release identity ${tag}`);
