import { Router } from "express";
import UserController from "../controllers/userController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const userRoutes = Router();
//Get all users
userRoutes.get("/", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

// Get one user
userRoutes.get(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.getOneById
);

//Create a new user
userRoutes.post("/", UserController.newUser);

//Edit one user
userRoutes.patch(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.editUser
);

//Delete one user
userRoutes.delete(
    "/:id([0-9]+)",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.deleteUser
);

export default userRoutes;