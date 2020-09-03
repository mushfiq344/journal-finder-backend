import { getRepository } from "typeorm";
import { Order } from "../entity/Order";
export class OrderController {


    static async orders() {
        const user = await getRepository(Order)
            .createQueryBuilder("order")
            .leftJoinAndSelect("order.user", "user")
            .select(["order.id"])
            .addSelect(["user.id", "user.firstName"])
            .getMany();

        return user;

    }

}