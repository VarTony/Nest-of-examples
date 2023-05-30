import { Body, Controller, Get, ParseIntPipe, Patch, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '@services/index';
import { Response } from 'express';
import { BuyItemDTO, UserCreateDTO } from '@dto/user';

@Controller('user')
export class UserController {
    constructor( private readonly service: UserService) {}

    @UsePipes(new ValidationPipe({transform: true}))
    @Patch('buyItem')
      async buyItem(
       @Body() body: BuyItemDTO,
       @Res() res: Response
      ): Promise<void> {
        const { id, price } = body;
        console.log(typeof id, price);
        const { result } = await this.service.buyItems({ id, price });
    
        res.send({ result });
    }

    @UsePipes(new ValidationPipe({transform: true}))
    @Patch('createUser')
      async createUser(
       @Body() body: UserCreateDTO,
       @Res() res: Response
      ): Promise<void> {
        const { balance } = body;
        const { result, users } = await this.service.createUser(balance);
    
        res.send({ result, users });
    }

}
