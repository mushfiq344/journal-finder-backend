import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "../../user/entity/User";
@Entity()
export class Journal {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    link: string;

    @ManyToOne(type => User, user => user.journals)
    user: User;
}
