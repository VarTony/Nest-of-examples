import { Body, Controller, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from '..';
import { Response } from 'express';
import { AuthUserDTO } from '@auth/DTOs';

@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) {}

    @UsePipes(new ValidationPipe({ transform: true }))
    @Post()
    async singInUser(
        @Body() body: AuthUserDTO,
        @Res() res: Response
    ): Promise<void> {
        const { login, email, password } = body;
        
        const result = await this.service.singIn({ login, email }, password);
        res.send({ result });
    }
}
