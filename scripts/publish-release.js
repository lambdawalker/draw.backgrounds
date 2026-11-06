import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { setTimeout } from "node:timers/promises";
import { spawnSync } from "node:child_process";

const { name, version } = JSON.parse(readFileSync("package.json", "utf8"));
const tarball = process.argv[2];
const integrity =
  "sha512-" +
  createHash("sha512").update(readFileSync(tarball)).digest("base64");
const url = `https://registry.npmjs.org/${encodeURIComponent(name)}`;

async function registry() {
  const response = await fetch(url, {
    headers: { accept: "application/vnd.npm.install-v1+json" },
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  if (response.status === 404) return null;
  if (!response.ok)
    throw new Error(`npm registry returned HTTP ${response.status}`);
  return response.json();
}

function confirmed(record) {
  const published = record?.versions?.[version];
  if (!published) return false;
  if (published.dist?.integrity !== integrity) {
    throw new Error(
      `${name}@${version} exists with a different tarball. Reconcile the existing publication before retrying.`,
    );
  }
  return true;
}

const before = await registry();
if (confirmed(before)) {
  console.log(
    `${name}@${version} is already available with matching integrity.`,
  );
} else {
  const latest = before?.["dist-tags"]?.latest;
  if (latest) {
    const proposed = version.split(".");
    const current = latest.split(/[+-]/, 1)[0].split(".");
    const difference = proposed
      .map((part, index) => BigInt(part) - BigInt(current[index]))
      .find((delta) => delta !== 0n);
    if (difference < 0n)
      throw new Error(
        `Refusing to replace npm latest (${latest}) with ${version}.`,
      );
  }
  const publish = spawnSync(
    process.execPath,
    [process.env.npm_execpath, "publish", tarball, "--access", "public"],
    { stdio: "inherit" },
  );
  if (publish.error) throw publish.error;

  // Even if npm reported an error, the registry may have accepted the upload.
  for (let attempt = 0; attempt < 12; attempt++) {
    let record;
    try {
      record = await registry();
    } catch (error) {
      console.warn(error.message);
    }
    if (confirmed(record)) {
      console.log(
        `Confirmed ${name}@${version} on npm with matching integrity.`,
      );
      process.exit(0);
    }
    if (attempt < 11) await setTimeout(5_000);
  }
  throw new Error(
    `Could not confirm ${name}@${version} on npm. Check registry availability and trusted publisher setup before retrying this tag.`,
  );
}
