import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { NewsService } from '../service/news.service';

@Controller('news')
export class NewsController {
    constructor(private readonly service: NewsService) {}


    /**
     * Находит пользователя по id.
     * 
     * @param id 
     * @param res 
     */
    @Get(':id')
    async getNewsById(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response
    ): Promise<void> {
        const result = this.service.getNews(id);
        res.send({ result })
    }


    /**
     * Создает новостную запись
     * 
     * @param res 
     */
    @Post()
    async postNews(
    @Body() body: any,
     @Res() res: Response
    ): Promise<void> {
        const result = this.service.createNews(body);
        res.send({ result });
    }


    /**
     * Обновляет данные в новостной записи.
     * 
     * @param body 
     * @param res 
     */
    @Patch()
    async updateNews(
        @Body() body: any,
        @Res() res: Response
    ) {
        // const { data } = body;
        const result = await this.service.updateNews(body);
        res.send({ result })
    }
}
