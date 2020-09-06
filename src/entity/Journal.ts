import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from "./User";
import { Category } from "./Category";
import { Link } from "./Link";
@Entity()
export class Journal {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;


    @ManyToOne(type => User, user => user.journals)
    user: User;

    @ManyToMany(type => Category)
    @JoinTable()
    categories: Category[];

    @OneToMany(type => Link, link => link.journal)
    links: Link[];

}
