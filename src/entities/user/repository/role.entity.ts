import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity('role')
export class Role {
    @OneToMany(_ => User, user => user.roleId)
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'role', type: 'varchar' })
    role: 'admin' | 'user' | 'moderator' | 'test';
}