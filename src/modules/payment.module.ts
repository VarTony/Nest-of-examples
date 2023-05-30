import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from '@entities/payment.entity';
import { PaymentService } from '@services/index';

@Module({
    imports: [ TypeOrmModule.forFeature([ Payment ]) ],
    providers: [ PaymentService ],
    exports: [ PaymentService ]

})
export class PaymentModule {}