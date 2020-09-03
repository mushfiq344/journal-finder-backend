import { getRepository } from "typeorm";
import { User } from "../entity/User";

export class UserController {
    static users = async () => {
        const users = await getRepository(User).find();
        return users;
    }

    static user = async (id: string) => {
        const user = await getRepository(User)
            .createQueryBuilder("user")
            .where("user.id = :id", { id: id })
            .getOne()
        return user;

    }

    static userOrder = async (id: string) => {
        const user = await getRepository(User)
            .createQueryBuilder("user")
            .innerJoinAndSelect("user.orders", "order")
            .where("user.id = :id", { id: id })
            .select(["user.id", "user.firstName"])
            .addSelect(['order.id', 'order.address'])
            .getOne();

        return user;
    }

}