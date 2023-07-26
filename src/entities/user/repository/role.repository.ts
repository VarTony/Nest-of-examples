import { Column, Entity, Generated, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.repository";


@Entity('role')
export class Role {
    @OneToMany(_ => User, user => user.roleId)
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'role', type: 'varchar', unique: true })
    role: 'ADMIN' | 'USER' | 'MODERATOR' | 'TEST';

    @Column({ name: 'rank', type: 'int' })
    rank: 1 | 2 | 3;
}