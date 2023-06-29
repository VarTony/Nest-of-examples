import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/repository/user.entity";


@Entity('role')
export class Role {
    @OneToMany(_ => User, user => user.roleId)
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'role', type: 'varchar', unique: true })
    role: 'admin' | 'user' | 'moderator' | 'test';

    @Column({ name: 'rank', type: 'numeric', unique: true })
    rank: 1 | 2 | 3;
}