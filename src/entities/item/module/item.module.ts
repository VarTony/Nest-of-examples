import { Module } from '@nestjs/common';
import { ItemService } from '@item/service/item.service';
import { ItemController } from '@item/controller/item.controller';
import { HttpModule, HttpService } from '@nestjs/axios';


@Module({
    imports: [ HttpModule ],
    controllers: [ ItemController ],
    providers: [ ItemService ]
})
export class ItemModule {}
