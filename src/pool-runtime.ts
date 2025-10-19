import { resolve } from "node:path";
import { Worker } from "node:worker_threads";
import { BaseRuntime } from "vitest/node";
import type { WorkerRequest, PoolRuntime } from "vitest/node";

export interface CustomOptions {
  customProperty: "a" | "b";
}

export class CustomPoolRuntime extends BaseRuntime implements PoolRuntime {
  name = "custom-pool";
  private thread?: Worker;
  private customOptions: CustomOptions;

  constructor(options: PoolRuntime["options"], customOptions: CustomOptions) {
    super(options);
    this.customOptions = customOptions;
  }

  async start(options: Parameters<PoolRuntime["start"]>[0]): Promise<void> {
    this.thread ||= new Worker(
      resolve(import.meta.dirname, "./worker.js"),
      options,
    );
    await super.start(options);
  }

  async stop(): Promise<void> {
    await super.stop();
    await this.thread?.terminate();
    this.thread = undefined;
  }

  postMessage(message: WorkerRequest): void {
    this.thread?.postMessage(message);
  }

  onWorker(event: string, callback: (arg: any) => void): void {
    this.thread?.on(event, callback);
  }

  offWorker(event: string, callback: (arg: any) => void): void {
    this.thread?.off(event, callback);
  }
}
