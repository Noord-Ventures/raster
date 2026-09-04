// Copy what the server reads at runtime next to dist/index.js: the registry
// snapshot (items, CSS, docs markdown) and props.json. The executable stays
// small; nothing reaches back into the workspace at runtime.
import { copyFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const at = (p) => fileURLToPath(new URL(p, import.meta.url));
mkdirSync(at("../dist/registry"), { recursive: true });
copyFileSync(at("../../../registry/bundle.json"), at("../dist/registry/bundle.json"));
console.log("copied registry snapshot → dist/registry/bundle.json");
copyFileSync(at("../../core/props/props.json"), at("../dist/props.json"));
console.log("copied props.json → dist/props.json");
