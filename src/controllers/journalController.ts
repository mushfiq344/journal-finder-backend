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
import { Link } from "../entity/Link"
class JournalController {

    static listAll = async (req: Request, res: Response) => {
        //Get users from database
        const journalRepository = getRepository(Journal);
        const journals = await journalRepository.find({ relations: ["categories", "links"] });

        //Send the journals
        res.status(200).send(journals);
    };

    static getOneById = async (req: Request, res: Response) => {
        //Get the ID from the url
        const id: number = req.params.id;

        //Get the user from database
        const journalRepository = getRepository(Journal);
        try {
            const journal = await journalRepository.findOneOrFail(id, { relations: ["categories", "links"] });
            res.status(200).send(journal)
        } catch (error) {
            res.status(404).send("User not found");
        }
    };

    static newJournal = async (req: Request, res: Response) => {


        var form = new formidable.IncomingForm();
        let formData = {};
        let fileLinks = [];
        let fileNames = [];
        form.on('field', function (field, value) {
            if (field === 'genres' && value != "") {
                formData['genres'] = value.split(",")
            } else if (field === 'genres' && value === "") {
                formData['genres'] = []
            } else {
                formData[field] = value
            }
            console.log(field + ":" + value)


        })
        form.on('fileBegin', function (name, file) {

            console.log("file filed name:", name)
            try {
                if (name === 'journals[]') {
                    console.log("file:", file)
                    let time = Date.now();
                    file.path = config.publicPath + "uploads/" + time + path.extname(file.name);
                    fileLinks.push(config.localHost + "uploads/" + time + path.extname(file.name));
                    fileNames.push(file.name)
                }
            } catch (error) {
                res.status(401).send(error);
            }


        });
        form.on('file', function (name, file) {

        })
        form.on('end', async function () {

            let { id } = formData['user_id'];
            //Get the user from database
            const userRepository = getRepository(User);
            let journalRepository = getRepository(Journal);
            const categoryRepository = getRepository(Category);
            const linkRepository = getRepository(Link);

            try {
                // inserting the categories
                let categoryIds = formData['genres']
                let categories = []
                for (let i = 0; i < categoryIds.length; i++) {
                    let category = await categoryRepository.findOneOrFail(categoryIds[i]);
                    categories.push(category);
                }



                let user = await userRepository.findOneOrFail(id);
                let journal = new Journal();
                journal.title = formData["title"]
                journal.user = user;
                journal.categories = categories;
                await journalRepository.save(journal);

                //inserting the links of the files
                for (let i = 0; i < fileLinks.length; i++) {
                    let link = new Link();
                    link.link = fileLinks[i]
                    link.journal = journal
                    link.name = fileNames[i]
                    await linkRepository.save(link);
                }

                res.status(201).send("Journal uploaded");
            } catch (error) {
                res.status(404).send("User not found");
            }

        });
        form.parse(req);

    };
};

export default JournalController;