import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER  } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Connection } from 'typeorm';
import { Payment, PaymentService } from '@payment/index';
import { BuyItemDTO } from '@user/dto';
import { User, UserService } from '@user/index';
import { TransactionService } from '@transaction/index';

@Injectable()
export class ItemService {
  
  constructor(
    private readonly httpService: HttpService,
    // private readonly connection: Connection,
    private readonly user: UserService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
    // @Inject(PaymentService) private readonly paymentService: PaymentService
    @Inject( TransactionService ) private readonly transactionService: TransactionService
  ) {}


  /**
   * Кеширует данные
   * (Внутрений вспомогательный метод.)
   * 
   * @param data 
   */
  private async _cacheData(data: any) {
    const keys: string[] = Object.keys(data);
    this.cacheService.set('keys', keys);

    keys.forEach(key => this.cacheService.set(key, data[key])
     .catch(err => console.log(err)));
  }


  /**
   * Достает объекты из кеша.
   * (Внутрений вспомогательный метод.)
   * 
   * @param keys 
   * @returns 
   */
  private async getItemsFromCache(keys: string[]): Promise<{ result }> {
    let result;
    try {
      result = await Promise.all(keys.map(async key => (await this.cacheService.get(key))));
    } catch(err) {
      console.error(err);
      result = 'Что-то пошло не так';
    }
    return { result };
  }


  /**
   * Достает данные из внешнего api
   * 
   * @returns 
   */
  async getItems(): Promise<any> {
    let result; 
    const api = process.env.EXTERAL_API;
    let keys: any = await this.cacheService.get('keys')
        .catch(err => console.error(err));

    if(keys) return (await this.getItemsFromCache(keys));

    try {
      const items = await this.httpService
       .get(api)
       .toPromise()
       .then(res => res.data); 
      this._cacheData(items);
      result = items;
    } catch(err) {
      console.warn(err);
      result = 'Что-то пошло не так';
    }
    return { result };
  }


    /**
     * Обработка платежа.
     * 
     * @param data 
     * @returns 
     */
    async buyItems (data: BuyItemDTO): Promise<{ result }> {
        let result;
        const { id, price } = data;
        const user = (await this.user.getUser(id)).result;

        if(user !== null) {
            user.balance = user.balance - data.price;
            if(user.balance < 0) return { result: ` Недостачно средств: ${ user.balance }` };
            result = await this.transactionService.createPaymentTransaction(price, user);
        } else result = `Пользователь не найден, id : ${ data.id }`;

        return { result };
    }
}