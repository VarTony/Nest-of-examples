import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(_ => User, user => user.id)
    @Column({ name: 'user_id', type: 'int' })
    userId: number;

    @Column({ name: 'action', type: 'varchar' })
    action: 'buy' | 'sell';

    @Column({ name: 'amount', type: 'numeric' })
    amount: number;

    @CreateDateColumn()
    // @Column({ name:, type: 'TimeStamp' })
    createdAt: Date;
}