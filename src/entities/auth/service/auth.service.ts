import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserService } from '@user/index';
import * as crypto from 'node:crypto';
import { Repository } from 'typeorm';
import { logUserData, passData } from '../types';

@Injectable()
export class AuthService {
    constructor(
        @Inject(UserService)
        @InjectRepository(User) private readonly userRepo: Repository<User>,
        private readonly jwtService: JwtService
    ) {}


    /**
     * Основной метод аутентификации.
     * 
     * @param usersInfo  
     * @returns 
     */
    async singIn(logUserData: logUserData, password: string): Promise<any | string> {
        let result;
        try {
            const user = await this._getUserByAuthData(logUserData);
            const { salt, roleId, passhash } = user;
            const isCorrectPass = await this._passChecker({ password, salt, passhash });
        
            if(isCorrectPass) {
                const payload = { 
                    exp: (Date.now() + 180000),
                    roles: roleId,
                    iss: 'auth service'
                }
                result = await this.jwtService.signAsync(payload);
            }
            else result = 'Неверный логин или пароль';
        } catch(err) {
            console.warn(err);
            result = 'Аутентификация: ';
        }
        return result;
    }


    /*
     * Находит пользователя по логину или емейлу.
     * 
     * @param authData 
     */
    private async _getUserByAuthData(logUserData: logUserData): Promise<User|null> {
        let result;
        try {
            const user = await this.userRepo.findOne({ where: { ...logUserData } });
            result = user;
        } catch(err) {
            console.warn(err);
            err.reason = 'Внутреняя ошибка при поиске пользователя для аутентификации';
            result = null;
        }
        return result;
    }


    /**
     * Внутрений метод для проверки паролей.
     * 
     * @param usersInfo 
     * @returns 
     */
    private async _passChecker(passData: passData): Promise<boolean|null> {
        let result;
        try{
            const passhash = await crypto.createHash('sha512')
             .update(`${ passData.password }.${ passData.salt }`)
             .digest('hex');

             result = passhash === passData.passhash;
        } catch(err) {
            console.warn(err);
            err.reason = 'Аутентификация: внутреняя ошибка при проверке пароля';
            result = null;
        }
        return result;
    }
}
