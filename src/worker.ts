import { init, runBaseTests, setupEnvironment } from "vitest/worker";
import { parentPort } from "node:worker_threads";

(globalThis as any).CUSTOM_POOL_RUNNING = true;

const port = parentPort;

if (!port) {
  throw new Error("Expected to be run in node:worker_threads Worker");
}

init({
  post: (rpcResponse) => port.postMessage(rpcResponse),
  on: (rpcListener) => port.on("message", rpcListener),
  off: (callback) => port.off("message", callback),
  teardown: () => port.removeAllListeners(),
  runTests: (state, traces) => runBaseTests("run", state, traces),
  collectTests: (state, traces) => runBaseTests("collect", state, traces),
  setup: setupEnvironment,
});
