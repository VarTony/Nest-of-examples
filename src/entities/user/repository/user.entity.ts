import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payment } from "@payment/index";

@Entity('user')
export class User {
    // @OneToMany(_ => Payment, payment => payment.userId)
    @PrimaryGeneratedColumn()
    id: number;
    
    // @Column({ name: 'email', type: 'varchar' })
    // email: string;

    // @Column({ name: 'password', type: 'varchar' })
    // password: string;

    // @Column({ name: 'salt', type: 'varchar' })
    // salt: string;

    @Column({name: 'balance', type: 'numeric' })
    balance: number;
}

