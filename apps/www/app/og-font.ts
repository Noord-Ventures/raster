import { readFileSync } from "node:fs";
import { join } from "node:path";

function font(name: string) {
  const bytes = readFileSync(join(process.cwd(), "app", name));
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

export const ogFonts = [
  { name: "Inter", data: font("Inter-Regular.ttf"), weight: 400 as const, style: "normal" as const },
  // Satori accepts weights in 100-step buckets; this file's outlines are instantiated at 580.
  { name: "Inter", data: font("Inter-580.ttf"), weight: 600 as const, style: "normal" as const },
];
