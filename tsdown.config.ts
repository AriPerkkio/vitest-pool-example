import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/worker.ts"],
  outDir: "dist",
  format: ["esm"],
  tsconfig: "./tsconfig.json",
  target: "esnext",
  clean: true,
  dts: true,
});
