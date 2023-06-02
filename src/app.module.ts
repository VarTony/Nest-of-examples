import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DbConnection, RedisModule } from '@connections/index';
import { UserModule, ItemModule, PaymentModule } from '@entities/index';
const path = require('path');


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ 
        path.join(__dirname, '../config/.env'), 
        path.join(__dirname, '../config/develop.env') 
    ],
      isGlobal: true
    }),
    HttpModule,
    DbConnection,
    RedisModule,
    ItemModule,
    UserModule,
    PaymentModule
  ]
})
export class AppModule {}
