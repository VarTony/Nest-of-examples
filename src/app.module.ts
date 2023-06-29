import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DbConnection, RedisModule } from '@connections/index';
import { 
  UserModule,
  ItemModule,
  PaymentModule,
  TransactionModule,
  NewsModule,
  AuthModule
} from '@entities/index';
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
