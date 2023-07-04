import { 
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { Response } from 'express';
import { UserCreateDTO } from '../dto';


@Controller('user')
export class UserController {
    constructor(
      private readonly service: UserService
      ) {}


    /**
     * Достает всех созданных пользователей.
     *  
     * @param res 
     */
    @Get()
    async getUsers(
      @Res() res: Response
    ): Promise<void> {
      const { result } = await this.service.getUsers();

      res.send({ result });
    }


    /**
     * Создает тестового пользователя.
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
        const { login, password } = body;
        const { result, status } = await this.service.createUser(body);
        status 
          ? res.send({login, password}).redirect('auth/singIn')    // { login, password }
          : res.send({ result });
    }


    /**
     * Удаляет тестового пользователя по id.
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
        const { result } = await this.service.deleteUser(id);
    
        res.send({ result });
    }
}
