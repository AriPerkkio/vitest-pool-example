import { test, expect } from "vitest";

test("runs in custom pool", () => {
  expect((globalThis as any).CUSTOM_POOL_RUNNING).toBe(true);
});
