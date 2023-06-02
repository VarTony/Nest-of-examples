import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "@payment/index";

@Entity('user')
export class User {
    // @OneToMany(_ => Payment, payment => payment.userId)
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'balance', type: 'numeric' })
    balance: number;
}