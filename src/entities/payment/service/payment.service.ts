import { Payment } from '../repository/payment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment) private readonly repository: Repository<Payment>,
    ){}

    async createPayment(data: any): Promise<Payment[]> {
        return await this.repository.create(data);
    }
}
