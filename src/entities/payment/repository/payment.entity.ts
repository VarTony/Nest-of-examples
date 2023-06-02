import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/repository/user.entity";

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
    createdAt: Date;
}