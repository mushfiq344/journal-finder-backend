import * as express from "express";

import { OrderController } from "./controller/orderController";

var orderRouter = express.Router();

// route middleware that will happen on every request
orderRouter.use(function (req, res, next) {

    // log each request to the console
    console.log("common order router middleware", req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

orderRouter.get('/', async function (req, res) {
    const users = await OrderController.orders();
    res.send(users);
});



export { orderRouter };