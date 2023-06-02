import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
// import { User, Payment } from 'src/oldStructure/repositories/index';
import { DbConnection, RedisModule } from '@connections/index';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule, ItemModule } from '@entities/index';
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
    // TypeOrmModule.forFeature([ User, Payment ]),
    HttpModule,
    DbConnection,
    RedisModule,
    ItemModule,
    UserModule
  ]
})
export class AppModule {}
