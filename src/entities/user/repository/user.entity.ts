import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "@entities/payment/repository/payment.entity";

@Entity('user')
export class User {
    // @OneToMany(_ => Payment, payment => payment.userId)
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'balance', type: 'numeric' })
    balance: number;
}