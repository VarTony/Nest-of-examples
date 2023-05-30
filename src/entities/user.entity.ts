import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "src/entities/payment.entity";

@Entity('user')
export class User {
    @OneToMany(_ => Payment, payment => payment.userId)
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'balance', type: 'numeric' })
    balance: number;
}