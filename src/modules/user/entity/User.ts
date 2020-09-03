import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Order } from "../../../modules/order/entity/Order";
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: number;

    @Column()
    age: number;

    @Column()
    password: string;

    @OneToMany(type => Order, order => order.user)
    orders: Order[];
}
