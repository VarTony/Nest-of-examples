import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class BuyItemDTO { 
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    price: number;
}