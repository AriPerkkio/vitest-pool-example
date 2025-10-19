import type { PoolRuntimeInitializer } from "vitest/node";
import { CustomOptions, CustomPoolRuntime } from "./pool-runtime";

export function customPool(
  customOptions: CustomOptions,
): PoolRuntimeInitializer {
  return {
    runtime: "custom-pool",
    create: (options) => new CustomPoolRuntime(options, customOptions),
  };
}
