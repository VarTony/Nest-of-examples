import { Payment } from '../repository/payment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paymentData } from '../type';
import { User } from '@user/index';


@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment) private readonly repository: Repository<Payment>,
    ){}

    async createPayment(data: paymentData): Promise<Payment[]> {
        return await this.repository.create(data);
    }

    async findTransactionsByUserId(user: User) {
        let result;
        try {
          result = await this.repository.find( { where: { userId: user.id } })
        //   result.forEach(payment => { this.repository.delete(payment.id) })
        } catch(err) {
            console.warn(err);
            result = 'Не удалось найти транзакции указанного пользователя';
        }
        return result;
    }
}
