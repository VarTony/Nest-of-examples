import { Payment } from 'src/entities/payment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
    constructor(
        // @InjectRepository(Payment) private readonly repository: Repository<Payment>,
    ){}

    // async createPayment(data: any): Promise<Payment[]> {
    //     return await this.repository.create(data);
    // }

    async createPayment(data: any): Promise<any> {}
}