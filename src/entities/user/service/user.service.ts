import { User } from '../repository/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'node:crypto';
import { userRegisterData } from '@user/types';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>
    ) {}


    /**
     * Берет пользователя по id из базы данных.
     * 
     * @param id 
     * @returns 
     */
    async getById(id: number): Promise< { result: any } > {
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
    async getAll(): Promise< { result: User[] | string } > {
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
     * Формирует структуру для хранения пароля в бд
     * 
     * @param password 
     * @returns 
     */
    private async _createPasshash(password: string): Promise<{ salt: string, passhash: string }> {
        const salt = await crypto.createHash('sha256')
        .update(Date.now().toString() + Math.random().toString())
        .digest('hex');
    
        const passhash = await crypto.createHash('sha512')
            .update(`${ password }.${ salt }`)
            .digest('hex');

        return { passhash, salt };
    }


    /**
     * Предикат существования пользователя с указанным емейлом или логином
     * 
     * @param login 
     * @param email 
     * @returns 
     */
    private async _isUserExist(login: string, email: string): Promise<boolean> {
        let result;
        try {
            const user = await this.repository.findOne({ where: [ { login }, { email } ]});
            result = Boolean(user); 
        } catch(err) {
            console.warn(err);
            result = 'Произошла ошибка при проверки логина и емайла на уникальность'
            err.reason = result;
        }
        console.log(result);
        return result;
    }


    /**
     * Создает нового пользователя с заданым балансом.
     * 
     * @param balance 
     * @returns 
     */
    async create(userData: userRegisterData): Promise<{ result: string, status: boolean }> {
    let result, status;
    const { login, email, balance, password } = userData;
    try {
        if(await this._isUserExist(login, email)) {
            result = 'Пользователь с таким логином или емейлом уже существует';
            status = false;

            return { result, status };
        }
        const { passhash, salt } = await this._createPasshash(password);
        const user = await this.repository.create({ 
            balance,
            login,
            email,
            passhash,
            salt,
            roleId: 3, //'747a8b0f-9c01-4c02-a8b9-69f20f439c7a'
            active: true
        });
        await this.repository.save(user);
        result = `Пользователь ${ login } был успешно создан`;
        status = true;
    } catch(err) {
        console.warn(err);
        result = err.reason ?? 'Что-то пошло не так';
        status = false;
    }
     return { result, status };
    }
    

    /**
     * Деактивирует пользователя по id.
     * 
     * @param id 
     * @returns 
     */
    async delete(id: number) {
        let result;
        try {
            const user = await this.repository.findOne({ where: { id } });
            user.active = false;
            await this.repository.save(user);
            result = `Пользователь с id:${ id } был успешно удален.`;
        } catch(err) {
            console.warn(err);
            result = 'Что-то пошло не так';
        }
        return { result };
    }
}
