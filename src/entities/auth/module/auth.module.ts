import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserService } from '@user/index';
import { AuthService } from '..';
import { Payment, PaymentService } from '@payment/index';

@Module({
    imports: [ TypeOrmModule.forFeature([ User, Payment ]) ],
    providers: [ UserService, AuthService, PaymentService ]
})
export class AuthModule {}
