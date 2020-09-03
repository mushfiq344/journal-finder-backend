import { getRepository } from "typeorm";
import { Product } from "../entity/Product";
export class ProductController {


    static products = async () => {
        const products = await getRepository(Product).find();
        return products;

    }

}