import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsNumberString, Min, isPositive } from "class-validator";

export class BuyItemDTO { 
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
}