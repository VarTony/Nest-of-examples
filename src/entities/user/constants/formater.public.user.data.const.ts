import { PublicUserData } from "@user/types";
import { User } from "../repository";
import { rolesDispatcherByRoleId } from "./roles.dispatcher.by.roleId.const";


/**
 * Формирует пользовательские данные доступные для публичного чтения
 * 
 * @param users 
 * @returns PublicUserData[]
 */
const formaterPublicUserData = (users: User[]): PublicUserData[] => {
    const publicData: PublicUserData[] = users.map(user => {
        const { id, active, login, balance, email, roleId } = user;
        return { 
            id, active, login, balance, email,
            role: rolesDispatcherByRoleId(roleId as 1 | 2 | 3 | 4) };
    });
    return publicData;
}

export { formaterPublicUserData };