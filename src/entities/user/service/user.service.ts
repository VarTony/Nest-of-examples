import { User } from '../repository/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyItemDTO } from '@user/dto';
import { Repository, Connection } from 'typeorm';
import { Payment } from '@payment/index';


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
    async getUser(id: number): Promise< { result: any } > {
        let result;
        try {
            const user = await this.repository.findOne({ where: { id } });
            result = user;
        } catch(err) { 
            console.warn(err);
            result = 'Что-то пошло не так';
        }
        return { result }
    }


    /**
     * Берет всех пользователей из базы данных.
     *
     * @returns 
     */
    async getUsers(): Promise< { result: any } > {
        let result;
        try {
            const users = await this.repository.find();
            result = users;
        } catch(err) { 
            console.warn(err);
            result = 'Что-то пошло не так';
        }
        return { result }
    }


    /**
     * Создает нового пользователя с заданым балансом.
     *  Для удобства тестирования.
     * @param balance 
     * @returns 
     */
    async createUser(balance: number): Promise<{ result }> {
    let result;
    try {
        const user = await this.repository.create({ balance });
        await this.repository.save(user);
        result = user;
    } catch(err) {
        console.warn(err);
        result = 'Что-то пошло не так';
    }
        return { result };
    }

    
    /**
     * Удаляет тестового пользователя по id.
     * 
     * @param id 
     * @returns 
     */
    async deleteUser(id: number) {
        let result;
        try {
            const deleted = await this.repository.delete({ id });
            result = deleted;
        } catch(err) {
            console.warn(err);
            result = 'Что-то пошло не так';
        }
        return { result };
    }


    /**
     * Обработка платежной транзакции пользователя.
     * (Внутрений вспомогательный метод.)
     * 
     * @param amount 
     * @param user 
     * @returns 
     */
    private async createTransaction(amount, user) {
        const queryRunner = this.connection.createQueryRunner(); 
        let result, status;    

        const paymentMap: {} = { userId: user.id, action: 'buy', amount };
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


    /**
     * Обработка платежа.
     * 
     * @param data 
     * @returns 
     */
    async buyItems (data: BuyItemDTO): Promise<{ result }> {
        let result;
        const { id, price } = data;
        const user = (await this.getUser(id)).result;

        if(user !== null) {
            user.balance = user.balance - data.price;
            if(user.balance < 0) return { result: ` Недостачно средств: ${ user.balance }` };
            result = await this.createTransaction(price, user);
        } else result = `Пользователь не найден, id : ${ data.id }`;

        return { result };
    }
}
