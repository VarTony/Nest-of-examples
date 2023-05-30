import { User } from 'src/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyItemDTO } from 'src/dto/user';
import { Repository, Connection } from 'typeorm';
import { Payment } from '@entities/payment.entity';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
        private readonly connection: Connection
    ){}


    /**
     * Берет пользователя по id из базы данных.
     * 
     * @param id 
     * @returns 
     */
    async getUser(id: number): Promise< { result: any, status: number } > {
        let result, status;
        try {
            const user = await this.repository.findOne({ where: { id: 1 } });
            result = user;
            status = 200;
        } catch(err) { 
            console.warn(err);
            result = 'Something is wrong';
            status = 400; 
        }
        return { result, status }
    }

    /**
     * Берет всех пользователей из базы данных.
     *
     * @returns 
     */
        async getUsers(): Promise< { result: any, status: number } > {
            let result, status;
            try {
                const users = await this.repository.find();
                result = users;
                status = 200;
            } catch(err) { 
                console.warn(err);
                result = 'Something is wrong';
                status = 400; 
            }
            return { result, status }
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
        status = 200;
        result = user;
    } catch(err) {
        console.warn(err);
        result = 'Что-то пошло не так';
        status = 400;
    }
        return { result };
    }

    
    /**
     * Удаляет тестового пользователя по id
     * 
     * @param id 
     * @returns 
     */
    async deleteUser(id: number) {
        let result, status;
        try {
            const deleted = await this.repository.delete({ id });
            result = deleted;
            status = 'Ok';
        } catch(err) {
            console.warn(err);
            result = 'Что-то пошло не так';
            status = 400;
        }
        
        return { result, status };
    }


    /**
     * Обработка платежной транзакции пользователя;
     * 
     * @param data 
     * @returns 
     */
    async buyItems (data: BuyItemDTO) {
        let result, status;
        const { id, price } = data;
        const user = (await this.getUser(data.id)).result;

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
                await queryRunner.rollbackTransaction();
                result = 'Транзакция не удалась, что-то пошло не так.';
                status = 400;
            } finally {
                await queryRunner.release();
                result = 'Транзакция прошла успешно.';
                status = 200;
            }   
            return { result, status };
        } else  { 
            result = `Пользователь не найден, id : ${ data.id }`;
            status = 400;

            return { result, status };
        }
    }
}
