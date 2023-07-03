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
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret } from '@auth/constants';
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
    JwtModule.register({
      global: true,
      secret: jwtSecret,
      signOptions: { expiresIn: '180s' }
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
