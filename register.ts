// noinspection SpellCheckingInspection

import { readFileSync } from 'fs';
import Redis, { Redis as IRedis, RedisKey } from 'ioredis';

export interface ExtendedRedis extends IRedis {
  zaddTs: (key: RedisKey, member: string | number | Buffer) => Promise<number>;
  zismember: (
    key: RedisKey,
    member: string | number | Buffer
  ) => Promise<1 | null>;
  zremrangebyscoreTs: (
    key: RedisKey,
    timestamp: string | number
  ) => Promise<number>;
}

const luaDir = './scripts';

const scripts: { name: string; numberOfKeys: number }[] = [
  { name: 'zaddTs', numberOfKeys: 1 },
  { name: 'zismember', numberOfKeys: 1 },
  { name: 'zremrangebyscoreTs', numberOfKeys: 1 },
];

(async() => {
  // @ts-ignore
  const redisClient: ExtendedRedis = new Redis();

  scripts.forEach((script) => {
    redisClient.defineCommand(script.name, {
      lua: readFileSync(`${luaDir}/${script.name}.lua`, 'utf8'),
      numberOfKeys: script.numberOfKeys,
    });
  });
})();
