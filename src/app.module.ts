import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { UserController, ItemController } from '@controllers/index';
import { UserService, ItemService, PaymentService } from '@services/index' 
import { User, Payment } from '@entities/index';
import { 
  DbConnection,
  PaymentModule,
  RedisModule,
} from '@modules/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@modules/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../config/.env', '../config/develop.env'],
      isGlobal: true
    }),
    TypeOrmModule.forFeature([ User, Payment ]),
    HttpModule,
    DbConnection,
    RedisModule,
    PaymentModule,
    UserModule
  ],
  controllers: [ ItemController ],
  providers: [ ItemService ]
})
export class AppModule {}
