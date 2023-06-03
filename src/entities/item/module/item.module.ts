import { Module } from '@nestjs/common';
import { ItemController, ItemService } from '@item/index';
import { HttpModule } from '@nestjs/axios';


@Module({
    imports: [ HttpModule ],
    controllers: [ ItemController ],
    providers: [ ItemService ]
})
export class ItemModule {}
