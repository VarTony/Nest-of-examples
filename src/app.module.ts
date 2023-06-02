import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { User, Payment } from 'src/oldStructure/repositories/index';
import { DbConnection, RedisModule } from '@entities/connections/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from '@item/module/item.module';
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
    TypeOrmModule.forFeature([ User, Payment ]),
    HttpModule,
    DbConnection,
    RedisModule,
    ItemModule
  ]
})
export class AppModule {}
