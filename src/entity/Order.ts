import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
@Entity()
export class Order {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    address: string;



    @Column()
    age: number;

    @ManyToOne(type => User, user => user.orders)
    user: User;
}
