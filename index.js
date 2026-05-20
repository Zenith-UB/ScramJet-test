import { ScramjetController } from "./scram/scramjet.all.js";

// 1. Initialize the Scramjet Interception Layer
const scramjet = new ScramjetController({
  files: {
    wasm: "./scram/scramjet.wasm.wasm",
    all: "./scram/scramjet.all.js",
    sync: "./scram/scramjet.sync.js",
  }
});

await scramjet.init();

// 2. Clear out old service workers and register natively
const regs = await navigator.serviceWorker.getRegistrations();
for (let r of regs) await r.unregister();
await navigator.serviceWorker.register("./sw.js");

// 3. Connect Bare-Mux using the official native Wisp protocol
const connection = new BareMux.BareMuxConnection("/ScramJet-test/baremux/worker.js");
await connection.setTransport("./baremux/index.js", [{ wisp: "wss://wisp.mercurywork.shop/" }]);

console.log("Proxy framework successfully initialized!");
