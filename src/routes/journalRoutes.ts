import { Router } from "express";
import JournalController from "../controllers/journalController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const journalRoutes = Router();


//Get all journals
journalRoutes.get("/", [checkJwt, checkRole(["ADMIN"])], JournalController.listAll);

// Get one journal
journalRoutes.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    JournalController.getOneById
);


//Create a new journal post
journalRoutes.post("/", [checkJwt], JournalController.newJournal);


export default journalRoutes;