import serverBoostrap from "./boostrap/server.boostrap";
import Application from "./app";

const serverBootstrap = new serverBoostrap(Application);

(async () => {
  await serverBootstrap.initialize();
  console.log("Server started successfully");
})();