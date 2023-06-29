import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(_ => Role, role => role.id)
    @Column({ name: 'role_id', type: 'numeric' })
    roleId: number;

    @Column({ name: 'active', type: 'boolean' })
    active: boolean;
    
    @Column({ name: 'email', type: 'varchar' })
    email: string;

    @Column({ name: 'password', type: 'varchar' })
    password: string;

    @Column({ name: 'salt', type: 'varchar' })
    salt: string;

    @Column({name: 'balance', type: 'numeric' })
    balance: number;

    @CreateDateColumn()
    createdA: Date;
}

