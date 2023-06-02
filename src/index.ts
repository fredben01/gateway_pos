import serverBoostrap from "./boostrap/server.boostrap";
import Application from "./app";
import { Bootstrap } from "./boostrap/bootstrap";
import RedisBootstrap from './boostrap/redis.bootstrap';

const serverBootstrap:Bootstrap = new serverBoostrap(Application);
const redisBootstrap: Bootstrap = new RedisBootstrap();

(async () => {
  await serverBootstrap.initialize();
  await redisBootstrap.initialize();
  console.log("Server started successfully");
})();