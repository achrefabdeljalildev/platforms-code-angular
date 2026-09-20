import { ngPackagr } from "ng-packagr";
import { cp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const stagedAssets = new URL("../src/.package-assets/", import.meta.url);
process.chdir(projectRoot);

try {
  await rm(stagedAssets, { recursive: true, force: true });
  await cp(new URL("../public/assets/", import.meta.url), stagedAssets, {
    recursive: true,
  });
  await ngPackagr()
    .forProject("src/ng-package.json")
    .withTsConfig("tsconfig.lib.json")
    .build();
} finally {
  await rm(stagedAssets, { recursive: true, force: true });
}
