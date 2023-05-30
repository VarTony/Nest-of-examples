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


  private async getItemsFromCache(keys: Array<string>) {
    let result, status;
    try {
      result = await Promise.all(keys.map(async key =>  (await this.cacheService.get(key))));
      status = 200;
    } catch(err) {
      console.error(err);
      result = 'Что-то пошло не так';
      status = 400;
    }
    return { result, status };
  }

  async getItems(): Promise<any> {
    let result,status; 
    const api: string = process.env.EXTERAL_ITEMS_API;
    
    let keys: any = await this.cacheService.get('keys')
        .catch(err => console.error(err));

    if(keys) return (await this.getItemsFromCache(keys));

    try {
    const items = await this.httpService
     .get(api)
     .toPromise()
     .then(res => res.data);
     
     keys = Object.keys(items);
     this.cacheService.set('keys', keys);

     keys.forEach(key => this.cacheService.set(key, items[key])
      .catch(err => console.log(err)));

      result = items;
      status = 200;
    } catch(err) {
      console.warn(err);
      result = 'Что-то пошло не так';
      status = 400;
    }
    return { result, status };
  }


}