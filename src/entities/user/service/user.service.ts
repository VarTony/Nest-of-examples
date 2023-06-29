import { User } from '../repository/user.entity';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyItemDTO } from '@user/dto';
import { Repository } from 'typeorm';
import { PaymentService } from '@payment/index';
import * as crypto from 'node:crypto';


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
    async getUsers(): Promise< { result: User } > {
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
     * 
     * @param balance 
     * @returns 
     */
    async createUser(userData: any): Promise<{ result }> {
    let result;
    const { email, balance, password } = userData;
    try {
        const salt = await crypto.createHash('sha256')
            .update(Date.now().toString() + Math.random().toString())
            .digest('hex')
        
        const passhash = await crypto.createHash('sha512')
            .update(`${ password }.${ salt }`)
            .digest('hex');

        const user = await this.repository.create({ 
            balance,
            email: email,
            password: passhash,
            salt,
            roleId: 3,
            active: true
        });

        await this.repository.save(user);
        result = user;
    } catch(err) {
        console.warn(err);
        result = 'Что-то пошло не так';
    }
        return { result };
    }

    
    /**
     * Деактивирует тестового пользователя по id.
     * 
     * @param id 
     * @returns 
     */
    async deleteUser(id: number) {
        let result;
        try {
            const user = await this.repository.findOne({ where: { id } })
            // const payments = await this.paymentService.findTransactionsByUserId(user);
            // console.log(payments);
            // await this.repository.delete({ id });
            // await this.repository.update({ })
            result = `Пользователь с id:${ id } был успешно удален.`;
        } catch(err) {
            console.warn(err);
            result = 'Что-то пошло не так';
        }
        return { result };
    }
}
