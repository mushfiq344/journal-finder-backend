import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import * as jwt from "jsonwebtoken";

import { Journal } from "../entity/Journal";
import config from "../../../config/config";
import { User } from "../../user/entity/User";
import * as path from "path"
import * as formidable from "formidable";
class JournalController {


    static newJournal = async (req: Request, res: Response) => {


        var form = new formidable.IncomingForm();
        let formData = {};

        form.on('field', function (field, value) {
            console.log(field + ":" + value)
            formData[field] = value

        })
        form.on('fileBegin', function (name, file) {
            try {
                console.log(name)
                let time = Date.now();
                file.path = config.publicPath + "uploads/" + time + '.' + path.extname(file.name);
                formData[name] = config.localHost + "uploads/" + time + '.' + path.extname(file.name);
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
            try {
                let user = await userRepository.findOneOrFail(id);
                let journal = new Journal();
                journal.title = formData["title"]
                journal.link = formData["journal"]
                journal.user = user;
                await journalRepository.save(journal);
            } catch (error) {
                res.status(404).send("User not found");
            }
            res.status(201).send("Journal uploaded");
        });
        form.parse(req);

    };
};

export default JournalController;