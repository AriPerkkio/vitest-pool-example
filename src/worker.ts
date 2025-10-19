import { init, runBaseTests } from "vitest/worker";
import { parentPort } from "node:worker_threads";

(globalThis as any).CUSTOM_POOL_RUNNING = true;

const port = parentPort;

if (!port) {
  throw new Error("Expected to be run in node:worker_threads Worker");
}

init({
  send: (response) => port.postMessage(response),
  subscribe: (callback) => port.on("message", callback),
  off: (callback) => port.off("message", callback),

  worker: {
    post: (rpcResponse) => port.postMessage(rpcResponse),
    on: (rpcListener) => port.on("message", rpcListener),
    runTests: (state) => runBaseTests("run", state),
    collectTests: (state) => runBaseTests("collect", state),
  },
});
