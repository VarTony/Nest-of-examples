import { UserController } from '@controllers/index';
import { User } from '@entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService, UserService } from '@services/index';

@Module({
    imports: [ TypeOrmModule.forFeature([ User ]), PaymentService ], // PaymentService
    controllers: [ UserController ],
    providers: [ UserService ]

})
export class UserModule {}
