import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";

import { Journal } from "../entity/Journal";
import config from "../config/config";
import { User } from "../entity/User";
import * as path from "path"
import * as formidable from "formidable";
import { Category } from "../entity/Category";
class CategoryController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const categoryRepository = getRepository(Category);
        const categories = await categoryRepository.find();

        //Send the journals
        res.status(200).send(categories);
    };

};

export default CategoryController;