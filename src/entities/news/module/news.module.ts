import { Module } from '@nestjs/common';
import { NewsController } from '../controller/news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from '../repository/news.entity';
import { NewsService } from '../service/news.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ News ]) ],
  controllers: [ NewsController ],
  providers: [ NewsService ]
})
export class NewsModule {}
