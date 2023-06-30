import { Inject, Injectable } from '@nestjs/common';
import { User, UserService } from '@user/index';
import * as crypto from 'node:crypto';
import { access } from 'node:fs';

type userInfo = {
    id?: number, 
    login?: string, 
    email?: string,
    password: string
} 

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService)
        private readonly userService: UserService
    ) {}


    /**
     * Основной метод аутентификации.
     * 
     * @param usersInfo  
     * @returns 
     */
    async singIn(usersInfo: userInfo): Promise<any | string> {
        let result;
        const { access, msg } = await this._passChecker(usersInfo);
        
        if(access) result = 1;
        else result = msg ? msg : 'Неверный логин или пароль';

        return result;
    }


    /**
     * Внутрений метод для проверки паролей.
     * 
     * @param usersInfo 
     * @returns 
     */
    async _passChecker(usersInfo: userInfo): Promise<{ access: boolean | null, msg: string | null }> {
        let result;
        try{
            const user = (await this.userService.getUser(usersInfo)).result;
            const passhash = await crypto.createHash('sha512')
             .update(`${ usersInfo.password }.${ user.salt }`)
             .digest('hex');

             result = { access: passhash === user.password, msg: null };
        } catch(err) {
            console.warn(err);
            result = { 
                access: null,
                msg: 'Не удалось авторизировать пользователя по внутреним причиным' 
            }
        }
        return result;
    }
}
