import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../controller/user.controller';
import { User } from '../repository/user.entity';
import { UserService } from '../service/user.service';
import { Payment, PaymentService } from '@payment/index';

@Module({ 
    imports: [ TypeOrmModule.forFeature([ User, Payment ]) ],
    controllers: [ UserController ],
    providers: [ UserService, PaymentService ],
    exports: [ UserService ]
 })
export class UserModule {}
