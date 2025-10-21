import type { PoolRunnerInitializer } from "vitest/node";
import { CustomOptions, CustomPoolWorker } from "./pool-worker";

export function customPool(
  customOptions: CustomOptions,
): PoolRunnerInitializer {
  return {
    name: "custom-pool",
    createPoolWorker: (options) => new CustomPoolWorker(options, customOptions),
  };
}
