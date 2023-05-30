import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class BuyItemDTO { 
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    price: number;
}