import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '../repository/payment.entity';
import { PaymentService } from '../service/payment.service';

@Module({
    imports: [ TypeOrmModule.forFeature([ Payment ]) ],
    providers: [ PaymentService ]
})
export class PaymentModule {}
