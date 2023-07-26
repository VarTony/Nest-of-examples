import { User } from '../repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createPasshashAndSalt, formaterPublicUserData } from '../constants';
import { UserRegisterData, PublicUserData } from '../types';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>
    ) {}

    /**
     * Достает пользователя по id из базы данных.
     * 
     * @param id 
     * @returns 
     */
    async getById(id: number): Promise<{ result: PublicUserData | string }> {
        let result;
        try {
            const user = await this.repository.findOne({ where: { id } });
            result = formaterPublicUserData([user])[0];
        } catch(err) { 
            console.warn(err);
            result = 'Что-то пошло не так';
        }
        return { result }
    }


    /**
     * Достает всех пользователей из базы данных.
     *
     * @returns 
     */
    async getAll(): Promise<{ result: PublicUserData[] | string }> {
        let result;
        try {
            const users = await this.repository.find();
            result = formaterPublicUserData(users);
        } catch(err) { 
            console.warn(err);
            result = 'Что-то пошло не так';
        }
        return { result }
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
        return result;
    }


    /**
     * Создает нового пользователя с заданным балансом.
     * 
     * @param balance 
     * @returns 
     */
    async create(userData: UserRegisterData): Promise<{ result: string, status: boolean }> {
    let result, status;
    const { login, email, balance, password } = userData;
    try {
        if(await this._isUserExist(login, email)) {
            result = 'Пользователь с таким логином или емейлом уже существует';
            status = false;

            return { result, status };
        }
        const { passhash, salt } = await createPasshashAndSalt(password);
        const user = await this.repository.create({ 
            balance,
            login,
            email,
            passhash,
            salt,
            roleId: 3,
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
    async delete(id: number): Promise<{ result: string }> {
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
