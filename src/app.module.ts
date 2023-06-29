import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { DbConnection, RedisModule } from '@connections/index';
import { UserModule, ItemModule, PaymentModule } from '@entities/index';
import { TransactionModule, TransactionService } from '@transaction/index';
import { NewsService } from './entities/news/service/news.service';
import { NewsModule } from './entities/news/module/news.module';
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
    NewsModule
  ]
})
export class AppModule {}
