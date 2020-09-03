
import { Router, Request, Response } from "express";
import auth from "./auth";
import userRoutes from "../modules/user/userRoutes";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", userRoutes);

export default routes;