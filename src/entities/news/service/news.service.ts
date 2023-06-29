import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { News } from '../repository/news.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News) private readonly repository: Repository<News>
    ) {}


}
