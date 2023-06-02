import { Controller, Get, Res } from '@nestjs/common';
import { ItemService } from '../service/item.service';
import { Response } from 'express';

@Controller('item')
export class ItemController {

  constructor( private readonly service: ItemService) {}

  @Get()
    async getItems(
     @Res() res: Response
    ): Promise<void> {
      const { result, status } = await this.service.getItems();
  
      res.send({ result, status });
    }
}
