import { IsNotEmpty, IsNumber } from "class-validator";

export class UserCreateDTO { 
    @IsNotEmpty()
    @IsNumber()
    balance: number;
}