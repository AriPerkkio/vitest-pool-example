import { resolve } from "node:path";
import { Worker } from "node:worker_threads";
import type { WorkerRequest, PoolWorker, PoolOptions } from "vitest/node";

export interface CustomOptions {
  customProperty: "a" | "b";
}

export class CustomPoolWorker implements PoolWorker {
  name = "custom-pool";
  private thread?: Worker;
  readonly execArgv: string[];
  readonly env: Record<string, string>;
  private customOptions: CustomOptions;

  constructor(options: PoolOptions, customOptions: CustomOptions) {
    this.env = options.env;
    this.execArgv = options.execArgv;
    this.customOptions = customOptions;
  }

  async start(): Promise<void> {
    this.thread ||= new Worker(resolve(import.meta.dirname, "./worker.js"), {
      env: this.env,
      execArgv: this.execArgv,
    });
  }

  async stop(): Promise<void> {
    await this.thread?.terminate();
    this.thread = undefined;
  }

  send(message: WorkerRequest): void {
    this.thread?.postMessage(message);
  }

  on(event: string, callback: (arg: any) => void): void {
    this.thread?.on(event, callback);
  }

  off(event: string, callback: (arg: any) => void): void {
    this.thread?.off(event, callback);
  }

  deserialize(data: unknown) {
    return data;
  }
}
