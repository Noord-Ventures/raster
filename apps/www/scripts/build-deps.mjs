// Builds everything the site needs from workspace sources, without
// shelling out to a package manager: deploy environments only need Node
// and an installed node_modules. Runs the core build (components → css →
// registry → dist), the react build, then copies the registry and fonts
// into public/.
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repo = (p) => fileURLToPath(new URL(`../../../${p}`, import.meta.url));
const run = (cmd, cwd) => {
  console.log(`[build-deps] ${cmd}  (${cwd})`);
  execSync(cmd, { cwd: repo(cwd), stdio: "inherit" });
};

run("node --experimental-strip-types scripts/build-components.mjs", "packages/core");
run("node --experimental-strip-types scripts/build.mjs", "packages/core");
run("node --experimental-strip-types scripts/build-registry.mjs", "packages/core");
run("./node_modules/.bin/tsup", "packages/core");
run("node scripts/build.mjs", "packages/react");
run("node scripts/copy-registry.mjs", "apps/www");
