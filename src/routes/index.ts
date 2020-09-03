
import { Router, Request, Response } from "express";
import auth from "./auth";
import userRoutes from "../modules/user/userRoutes";
import journalRoutes from "../modules/journal/journalRoutes";
const routes = Router();

routes.use("/auth", auth);
routes.use("/user", userRoutes);
routes.use("/journal", journalRoutes);

export default routes;