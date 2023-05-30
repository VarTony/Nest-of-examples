import { User } from 'src/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyItemDTO } from 'src/dto/user';
import { Repository, Connection } from 'typeorm';
import { Payment } from '@entities/payment.entity';
import { PaymentService } from '@services/index';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
        private readonly connection: Connection
    ){}


    /**
     *  Берет пользователя по id из базы данных.
     * @param id 
     * @returns 
     */
    async getUser(id: number): Promise< { answer: string, user: any } > {
        console.log('id: ', id);
        try {
            const user = await this.repository.findOne({ where: { id: 1 } });
            return { answer: 'Ok',  user };
        } catch(err) { 
            console.warn(err);
            const customer = { answer: 'Something is wrong', user: null }; 
            return customer;
        }
    }

    /**
     * Создает нового пользователя с заданым балансом.
     *  Для удобства тестирования
     * @param balance 
     * @returns 
     */
    async createUser(balance: number) {
    let result, status; 

    try {
        const user = await this.repository.create({ balance });
        await this.repository.save(user);
        status = 'Ok';
        result = user;

    } catch(err) {
        console.warn(err);
        result = 'Что-то пошло не так';
        status = 'Bad';
    }
        return { result };
    }


    async deleteUser(id: number) {
        const result = await this.repository.delete({ id });
        
        return { result,  };
    }


    async buyItems (data: BuyItemDTO) {
        const { id, price } = data;
        const { user } = await this.getUser(data.id);

        if(user !== null) {
            user.balance = user.balance - data.price;

            if(user.balance < 0) return { result: ` Недостачно средств: ${ user.balance }` }
            const errors = [];
            const paymentMap: {} = { userId: id, action: 'buy', amount: price };

            const queryRunner = this.connection.createQueryRunner(); 
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                await queryRunner.manager.save(user);
                const payment = await queryRunner.manager.getRepository(Payment).create(paymentMap)
                await queryRunner.manager.getRepository(Payment).save(payment);
            } catch(err) {
                console.error(err);
                errors.push(err);
                await queryRunner.rollbackTransaction();
            } finally {
                await queryRunner.release();
            }
            
            return { result: errors.length === 0 
                ? 'Транзакция прошла успешно.'
                : 'Транзакция не удалась, что-то пошло не так.'
             }
        } else return { result: `Пользователь не найден, id : ${ data.id }` }
    }
    

}
