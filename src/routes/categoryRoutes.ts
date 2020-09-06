import { Router } from "express";
import categoryController from "../controllers/categoryController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const categoryRoutes = Router();


//Get all journals
categoryRoutes.get("/", [checkJwt, checkRole(["ADMIN"])], categoryController.listAll);



export default categoryRoutes;