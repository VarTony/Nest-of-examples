import { Payment } from '../repository/payment.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paymentData } from '../types';
import { User } from '@user/index';


@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment) private readonly repository: Repository<Payment>,
    ){}

    async createPayment(data: paymentData): Promise<{ result: Payment | string }> {
        let result;
        try {
            result = await this.repository.create(data);
        } catch(err) {
            console.warn(err);
            result = 'Не удалось сохранить платеж';
        }
        return { result };
    }

    
    async findTransactionsByUserId(user: User) {
        let result;
        try {
          result = await this.repository.find( { where: { userId: user.id } })
        } catch(err) {
            console.warn(err);
            result = 'Не удалось найти транзакции указанного пользователя';
        }
        return result;
    }
}
