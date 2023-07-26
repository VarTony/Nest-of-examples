import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "@user/index";

@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToMany(_ => User, user => user.id)
    @Column({ name: 'user_id', type: 'int' })
    userId: number;

    @Column({ name: 'action', type: 'varchar' })
    action: 'buy' | 'sell';

    @Column({ name: 'amount', type: 'numeric' })
    amount: number;

    @CreateDateColumn()
    createdAt: Date;
}