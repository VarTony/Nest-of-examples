import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER  } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ItemService {
  
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache
  ) {}


  async getItemsFromCache(keys: Array<string>) {
    let result;
    try {
      result = await Promise.all(keys.map(async key =>  (await this.cacheService.get(key))))
    } catch(err) {
      console.error(err);
      result = 'Somethimg is wrong';
    }
    return { result };
  }

  async getAllItems(): Promise<any> {
    const api: string = process.env.EXTERAL_ITEMS_API;
    console.log(api);
    
    let keys: any = await this.cacheService.get('keys')
        .catch(err => console.error(err));

    if(keys) return await this.getItemsFromCache(keys);

    console.log(1111);
    const items = await this.httpService
     .get(api)
     .toPromise()
     .then(res => res.data)
     .catch(err => console.error(err));

        keys = Object.keys(items);
        this.cacheService.set('keys', keys);

        keys.forEach(key => {
            this.cacheService.set(key, items[key]).catch(err => console.log(err));
        });
        return { result: items };
  }


}