import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '@payment/index';
import { User } from '@user/index';
import { TransactionService } from '../service/transaction.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ User, Payment ]) ],
    providers: [ TransactionService ],
    exports: [ TransactionService ]
})
export class TransactionModule {}
