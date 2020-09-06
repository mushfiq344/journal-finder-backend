
import { Router, Request, Response } from "express";
import auth from "./auth";
import userRoutes from "./userRoutes";
import journalRoutes from "./journalRoutes";
import categoryRoutes from "./categoryRoutes";
const routes = Router();

routes.use("/auth", auth);
routes.use("/user", userRoutes);
routes.use("/journal", journalRoutes);
routes.use("/category", categoryRoutes);
export default routes;