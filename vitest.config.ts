import { defineConfig } from "vitest/config";
import { customPool } from "./dist/index";

export default defineConfig({
  test: {
    pool: customPool({ customProperty: "b" }),
  },
});
