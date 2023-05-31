import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UserController, ItemController } from '@controllers/index';
import { UserService, ItemService, PaymentService } from '@services/index' 
import { User, Payment } from '@entities/index';
import { DbConnection, RedisModule } from '@modules/index';
import { TypeOrmModule } from '@nestjs/typeorm';
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
    RedisModule
  ],
  controllers: [ ItemController, UserController ],
  providers: [ ItemService, PaymentService, UserService ]
})
export class AppModule {}
