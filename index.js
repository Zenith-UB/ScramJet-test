// 1. Clear out any previous broken service worker scopes
const registrations = await navigator.serviceWorker.getRegistrations();
for (let registration of registrations) {
  await registration.unregister();
}

// 2. Register the service worker at the standard local scope
await navigator.serviceWorker.register("./sw.js");

// 3. FIX: Strip the duplicate folder string so bare-mux doesn't multiply paths
const connection = new BareMux.BareMuxConnection("/ScramJet-test/");
await connection.setTransport("./baremux/index.js", [{ wisp: "wss://wisp.mercurywork.shop/" }]);

console.log("Bare-Mux linked to Mercury Workshop Wisp server successfully!");
