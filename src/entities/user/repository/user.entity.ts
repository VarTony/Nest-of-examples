import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(_ => Role, role => role.id)
    @Column({ name: 'role_id', type: 'varchar' })
    roleId: number;

    @Column({ name: 'active', type: 'boolean' })
    active: boolean;
    
    @Column({ name: 'login', type: 'varchar', length: 25 })
    login: string;

    @Column({ name: 'email', type: 'varchar', length: 50 })
    email: string;

    @Column({ name: 'passhash', type: 'varchar' })
    passhash: string;

    @Column({ name: 'salt', type: 'varchar' })
    salt: string;

    @Column({name: 'balance', type: 'numeric' })
    balance: number;

    @CreateDateColumn()
    createdA: Date;
}

