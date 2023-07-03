import { IsEmail, IsNotEmpty, IsNumber, IsString, Length, isString, isStrongPassword } from "class-validator";

export class UserCreateDTO { 
    @IsNotEmpty()
    @IsString()
    @Length(1, 50)
    login: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @IsString()
    @Length(7, 25)
    password: string;

    @IsNotEmpty()
    @IsNumber()
    balance: number;
}