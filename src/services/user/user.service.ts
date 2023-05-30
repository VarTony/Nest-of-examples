import { User } from 'src/entities/user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuyItemDTO } from 'src/dto/user';
import { Repository, Connection } from 'typeorm';
import { Payment } from '@entities/payment.entity';
import { PaymentService } from '..';
// import { PaymentService } from '@services/index';


@Injectable()
export class UserService {
    @Inject(PaymentService)
    private readonly paymentService: PaymentService;

    constructor(
        @InjectRepository(User) private readonly repository: Repository<User>,
        private readonly connection: Connection
    ){}

    async getUser(id: number): Promise< { answer: string, user: any } > {
        console.log('id: ', id);
        try {
            const user = await this.repository.findOne({ where: { id: 1 } });
            return { answer: 'Ok',  user };
        } catch(err) { 
            console.warn(err);
            const customer = { answer: 'Something is wrong', user: null }; 
            return customer;
        }
    }


    async createUser(balance: number) {
        const result = await this.repository.create({ balance });
        const users = await this.repository.find().then(res => res)

        console.log()
        return { result, users };
    }

    async deleteUser(id: number) {
        await this.repository.delete({ id });
        return { result: 'ok' };
    }


    async buyItems (data: BuyItemDTO) {
        const { id, price } = data;
        const { user } = await this.getUser(data.id);

        if(user !== null) {
            user.balance = user.balance - data.price;

            if(user.balance < 0) return { result: ` Недостачно средств: ${ user.balance }` }
            const errors = [];
            const payment = await this.paymentService.createPayment({ userId: id, action: 'buy', amount: price })

            const queryRunner = this.connection.createQueryRunner(); 
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                await queryRunner.manager.save(user);
                await queryRunner.manager.getMongoRepository(Payment).save(payment);
            } catch(err) {
                console.error(err);
                errors.push(err);
                await queryRunner.rollbackTransaction();
            } finally {
                await queryRunner.release();
            }
            
            return { result: errors.length === 0 
                ? 'Транзакция прошла успешно.'
                : 'Транзакция не удалась, что-то пошло не так.'
             }
        } else return { result: `Пользователь не найден, id : ${ data.id }` }
    }
    

}
