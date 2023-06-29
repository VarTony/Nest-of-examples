import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '@user/index';
import { Payment } from '@payment/index';

@Injectable()
export class TransactionService {

    constructor(
        private readonly connection: Connection
    ){}
    
    
    /**
     * Обработка платежной транзакции пользователя.
     * (Внутрений вспомогательный метод.)
     * 
     * @param amount 
     * @param user 
     * @returns 
     */    
    async createPaymentTransaction(amount: number, user: User) {
            const queryRunner = this.connection.createQueryRunner(); 
            let result, status;    
        
            type paymentData = {userId: number, action: 'buy' | 'sell', amount: number };
                
            const paymentMap: paymentData = { userId: user.id, action: 'buy', amount };
            await queryRunner.connect();
            await queryRunner.startTransaction();
        
            try {
                await queryRunner.manager.save(user);
                const payment = await queryRunner.manager.getRepository(Payment).create(paymentMap)
                await queryRunner.manager.getRepository(Payment).save(payment);
                await queryRunner.commitTransaction();
            } catch(err) {
                    console.error(err);
                    await queryRunner.rollbackTransaction();
                    result = 'Транзакция не удалась, что-то пошло не так.';
                } finally {
                    await queryRunner.release();
                    result = 'Транзакция прошла успешно.';
                }   
                    return { result, status };
            } 
}
