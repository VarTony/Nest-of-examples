import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { News } from '../repository/news.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News) private readonly repository: Repository<News>
    ) {}

    /**
     * Сохраняет запись новости в базу
     * 
     * @param news 
     * @returns 
     */
    async createNews(news: any): Promise<string> {
        let result;
        try{
           const [ { id } ] = await this.repository.create(news);
           result = `Запись успешно сохранена ${id}.`;
        } catch(err) {
            console.warn(err);
            result = 'Не удалось сохранить запись.'
        }
        return result;
    }


    /**
     * Достает запись новости по id.
     * 
     * @param id 
     * @returns 
     */
    async getNews(id: number): Promise<News | string> {
        let result;
        try {
            result = await this.repository.findOne({ where: { id } })
        } catch(err) {
            console.warn(err);
            result = `Не удалось выгрузить запись: ${ id }`;
        }
        return result;
    }


    /**
     * Обналает данные новостной записи.
     * 
     * @param newsUpdate 
     * @returns 
     */
    async updateNews(newsUpdate: any) {
        let result;
        const { id, ...updateData } = newsUpdate;
        try{
            const existNews = await this.repository.findOne({ where: { id } });

            Object.assign(existNews, ...updateData);
            this.repository.save(existNews);
            
            result = `Запись ${ id } была изменена.`;
        } catch(err) {
            console.warn(err);
            result = `Не удалось изменить запись ${ id }.`;
        }
        return result;
    }


    /**
     * Удаляет новостную запись по id.
     * 
     * @param id 
     * @returns 
     */
    async deleteNews(id: number) {
        let result;
        try {
            // const news = await this.repository.findOne({ where: { id } });
            await this.repository.delete(id);
            result = `Запись ${ id }, удалена.`
        } catch(err) {
            console.warn(err);
            result = `Не удалось удалить запись ${ id }.`;
        }
        return result;
    }
}
