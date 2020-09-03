import * as express from "express";
import { NextFunction, Request, Response } from "express";
import { UserController } from "./controller/userController";
import { checkJwt } from "../../middlewares/checkJwt";
var userRouter = express.Router();

// route middleware that will happen on every request
userRouter.use((req: Request, res: Response, next: NextFunction) => {

    // log each request to the console
    console.log("common user router middleware new", req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

userRouter.get('/', [checkJwt], async (req: Request, res: Response) => {
    const users = await UserController.users();
    res.send({ message: "this is journal finder hi" });
});

userRouter.get('/:id', async (req: Request, res: Response) => {
    const user = await UserController.user(req.params.id);
    res.send(user);

});

userRouter.get('/:id/orders', async (req: Request, res: Response) => {
    const user = await UserController.userOrder(req.params.id);
    res.send(user);

});



export { userRouter };