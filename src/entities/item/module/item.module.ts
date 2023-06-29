import { Module } from '@nestjs/common';
import { ItemController, ItemService } from '@item/index';
import { HttpModule } from '@nestjs/axios';
import { User, UserService } from '@user/index';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment, PaymentService } from '@payment/index';
import { TransactionService } from '@transaction/index';



@Module({
    imports: [ HttpModule, TypeOrmModule.forFeature([ User, Payment ]) ], // Payment
    controllers: [ ItemController ],
    providers: [ ItemService, UserService, TransactionService, PaymentService ]  //PaymentService
})
export class ItemModule {}
