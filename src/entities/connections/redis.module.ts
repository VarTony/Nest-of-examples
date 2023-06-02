import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
// import { redisStore } from 'cache-manager-redis-store';
const redisStore = require('cache-manager-redis-store').redisStore;

@Module({
    imports: [
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            username: process.env.REDIS_USER,
            password: process.env.REDIS_PASS,
            ttl: Number(process.env.REDIS_TTL)
         })
    ]
})
export class RedisModule {}