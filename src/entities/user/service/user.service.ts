import { User } from '../repository/user.entity';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyItemDTO } from '@user/dto';
import { Repository } from 'typeorm';
import { Payment, PaymentService } from '@payment/index';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
        @Inject(PaymentService)
        private readonly paymentService: PaymentService
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
            await this.paymentService;
            await this.repository.delete({ id });
            result = `Пользователь с id:${ id } был успешно удален.`;
        } catch(err) {
            console.warn(err);
            result = 'Что-то пошло не так';
        }
        return { result };
    }
}
