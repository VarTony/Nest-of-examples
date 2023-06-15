import { Payment } from '../repository/payment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paymentData } from '../type';


@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment) private readonly repository: Repository<Payment>,
    ){}

    async createPayment(data: paymentData): Promise<Payment[]> {
        return await this.repository.create(data);
    }
}
