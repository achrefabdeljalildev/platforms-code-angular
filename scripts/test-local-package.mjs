import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const consumer = join(root, "examples/local-consumer");
const manifest = JSON.parse(
  readFileSync(join(root, "src/package.json"), "utf8"),
);
const archive = join(root, "dist", `${manifest.name}-${manifest.version}.tgz`);
const npmCli = process.env.npm_execpath;
assert.ok(npmCli, "Run this check with npm run test:local.");

function npm(args) {
  execFileSync(process.execPath, [npmCli, ...args], {
    cwd: consumer,
    stdio: "inherit",
  });
}

function filesIn(directory, relative = "") {
  return readdirSync(join(directory, relative)).flatMap((name) => {
    const path = join(relative, name);
    return statSync(join(directory, path)).isDirectory()
      ? filesIn(directory, path)
      : [path];
  });
}

npm(["install", archive, "--no-audit", "--no-fund"]);
const consumerManifest = JSON.parse(
  readFileSync(join(consumer, "package.json"), "utf8"),
);
assert.ok(
  !consumerManifest.dependencies["avatar-workspace"],
  "The consumer must not depend on the source workspace.",
);
const built = join(root, "dist/platforms-ui");
const installed = join(consumer, "node_modules/platforms-ui");
const files = [
  "fesm2022/platforms-ui.mjs",
  "styles.css",
  ...filesIn(join(built, "assets")).map((path) => join("assets", path)),
];
for (const file of files) {
  assert.deepEqual(
    readFileSync(join(installed, file)),
    readFileSync(join(built, file)),
    `Installed package is stale: ${file}`,
  );
}
console.log(
  `Verified ${files.length} installed bundle, stylesheet, and asset files against the package build.`,
);
npm(["run", "build"]);
