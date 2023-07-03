import { 
  Controller,
  Get,
  Patch,
  Req,
  Res,
  Body,
  ValidationPipe,
  UsePipes 
} from '@nestjs/common';
import { ItemService } from '../service/item.service';
import { Response } from 'express';
import { BuyItemDTO } from '@user/dto';

@Controller('item')
export class ItemController {

  constructor(private readonly service: ItemService) {}

  /**
   * Отдает все товары;
   * 
   * @param res 
   */
  @Get('all')
    async getItems(
     @Res() res: Response
    ): Promise<void> {
      const { result } = await this.service.getItems();
  
      res.send({ result });
    }


    /**
     * Генерирует платежную транзакцию для заданого пользователя;
     * 
     * @param body 
     * @param res
     */
      @UsePipes(new ValidationPipe({ transform: true }))
      @Patch('buy')
      async buyItem(
       @Body() body: BuyItemDTO,
       @Res() res: Response
      ): Promise<void> {
        const { id, price } = body;
        const { result } = await this.service.buyItems({ id, price });
        
        res.send({ result });
      }
}
