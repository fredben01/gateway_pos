import serverBoostrap from "./boostrap/server.boostrap";
import Application from "./app";
import { Bootstrap } from "./boostrap/bootstrap";

const serverBootstrap:Bootstrap = new serverBoostrap(Application);

(async () => {
  await serverBootstrap.initialize();
  console.log("Server started successfully");
})();