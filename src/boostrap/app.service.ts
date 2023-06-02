import yenv from 'yenv';

const env = yenv();
export interface IRedisConfig {
  host: string;
  port: number;
  password: string;
  maxRetriesPerRequest: number;
}

export class AppService {
  static get PORT():number {
    return +env.PORT || 4000;
  }

  static get RedisConfig(): IRedisConfig {
    return {
      host: env.REDIS_HOST || 'localhost',
      port: +env.REDIS_PORT || 6379,
      password: env.REDIS_PASS || "",
      maxRetriesPerRequest: 5,
    }
  }
}