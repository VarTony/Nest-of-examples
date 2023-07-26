import { User } from "../repository";

type UserRegisterData = {
    login: string,
    email: string,
    password: string,
    balance: number
};


type PublicUserData = User | {
    id: User['id'],
    login: User['login'],
    email: User['email'],
    balance: User['balance'],
    active: User['active']
};


export { UserRegisterData, PublicUserData }