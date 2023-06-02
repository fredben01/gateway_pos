import IORedis from 'ioredis';

import { AppService } from './app.service';
import { Bootstrap } from './bootstrap';

let redisClient: IORedis;

export default class RedisBootstrap extends Bootstrap {
  
  initialize(): Promise<any> {
      return new Promise((resolve, reject) => {
        const redisConfig = AppService.RedisConfig;

        const client = new IORedis(redisConfig);

        client
          .on("connect", () => {
            console.log("Redis connected");
            resolve(true);
          })
          .on("error", (err) => {
            console.log("Redis error");
            reject(err);
          });

        redisClient = client;
      })
  }

  static async get(key: string) {
    return redisClient.get(key);
  }

  static async set(key: string, value: string) {
    await redisClient.set(key, value, "EX", 1000 * 60);
  }

  static async clear(prefix: string = "") {
    const keys = await redisClient.keys(`${prefix}*`);
    const pipeline = redisClient.pipeline();

    keys.forEach((key: string) => {
      pipeline.del(key);
    });
    pipeline.exec();
  }

  close(): void {
    redisClient.disconnect();
  }
}