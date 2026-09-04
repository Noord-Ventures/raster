import { transformSync } from "@babel/core";
import { defineConfig } from "vitest/config";

function stylexTest() {
  return {
    name: "stylex-test",
    enforce: "pre" as const,
    transform(code: string, id: string) {
      if (!id.includes("/packages/react/src/") || !/\.[jt]sx?$/.test(id)) return;
      if (!code.includes("stylex")) return;
      const result = transformSync(code, {
        filename: id,
        babelrc: false,
        configFile: false,
        parserOpts: { plugins: ["typescript", "jsx"] },
        plugins: [
          [
            "@stylexjs/babel-plugin",
            {
              dev: true,
              runtimeInjection: true,
              unstable_moduleResolution: { type: "commonJS" },
            },
          ],
        ],
      });
      return result?.code ?? code;
    },
  };
}

export default defineConfig({
  plugins: [stylexTest()],
  test: {
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"],
  },
});
