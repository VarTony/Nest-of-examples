import { 
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Response } from 'express';
import { BuyItemDTO, UserCreateDTO } from '../dto';

@Controller('user')
export class UserController {
    constructor( private readonly service: UserService) {}

    @Get()
    async getUsers(
      @Res() res: Response
    ): Promise<void> {
      const { result, status } = await this.service.getUsers();

      res.send({ result, status });
    }

    /**
     * Генерирует платежную транзакцию для заданого пользователя;
     * 
     * @param body 
     * @param res
     */
    @UsePipes(new ValidationPipe({transform: true}))
    @Patch('buyItem')
      async buyItem(
       @Body() body: BuyItemDTO,
       @Res() res: Response
      ): Promise<void> {
        const { id, price } = body;
        const { result, status } = await this.service.buyItems({ id, price });
    
        res.send({ result, status });
    }


    /**
     * Создает тестового пользователя
     * 
     * @param body 
     * @param res 
     */
    @UsePipes(new ValidationPipe({transform: true}))
    @Post()
      async createUser(
       @Body() body: UserCreateDTO,
       @Res() res: Response
      ): Promise<void> {
        const { balance } = body;
        const { result } = await this.service.createUser(balance);
    
        res.send({ result });
    }


    /**
     * Удаляет тестового пользователя по id
     * 
     * @param id 
     * @param res 
     */
    @UsePipes(new ValidationPipe({transform: true}))
    @Delete(':id')
      async deleteUser(
       @Param('id', ParseIntPipe) id: number,
       @Res() res: Response
      ): Promise<void> {
        const { result, status } = await this.service.deleteUser(id);
    
        res.send({ result, status });
    }

}
