import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Journal } from "./Journal";

@Entity()
export class Link {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    link: string;

    @Column()
    name: string;

    @ManyToOne(type => Journal, journal => journal.links)
    journal: Journal;


}
