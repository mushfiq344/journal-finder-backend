import { Router } from "express";
import JournalController from "./controller/journalController";
import { checkJwt } from "../../middlewares/checkJwt";
import { checkRole } from "../../middlewares/checkRole";

const journalRoutes = Router();

//Create a new journal post
journalRoutes.post("/", [checkJwt], JournalController.newJournal);


export default journalRoutes;