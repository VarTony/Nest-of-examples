import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DbConnection, RedisModule } from '@connections/index';
import { UserModule, ItemModule, PaymentModule } from '@entities/index';
import { TransactionModule } from '@transaction/index';
import { NewsModule } from '@news/index';
import { AuthModule } from './entities/auth/module/auth.module';
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
    PaymentModule,
    TransactionModule,
    NewsModule,
    AuthModule
  ]
})
export class AppModule {}
