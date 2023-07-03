import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@user/index';
import { AuthService } from '..';
import { Payment } from '@payment/index';
import { JwtService } from '@nestjs/jwt';

@Module({
    imports: [ TypeOrmModule.forFeature([ User, Payment ]) ],
    providers: [ JwtService, AuthService ]
})
export class AuthModule {}