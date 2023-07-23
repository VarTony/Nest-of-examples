import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/repository/user.entity";


@Entity('news')
export class News {
    @OneToMany(_ => User, user => user.roleId)
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'header', type: 'varchar', length: 100 })
    header: string;

    @Column({ name: 'body', type: 'varchar' })
    body: string;

    @ManyToMany(_ => User, user => user.id)
    @Column({ name: 'created_by', type: 'numeric' })
    createdBy: number;

    @Column({ name: 'allow_to_read', type: 'numeric', default: 3 })
    allowToRead: number;

    @Column({ name: 'allow_to_write', type: 'numeric', default: 2 })
    allowToWrite: number;

    @CreateDateColumn()
    createdAt: Date;
}