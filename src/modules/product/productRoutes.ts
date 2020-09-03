import * as express from "express";

import { ProductController } from "./controller/productController";

var productRouter = express.Router();

// route middleware that will happen on every request
productRouter.use(function (req, res, next) {

    // log each request to the console
    console.log("common user router middleware", req.method, req.url);

    // continue doing what we were doing and go to the route
    next();
});

productRouter.get('/', async function (req, res) {
    const users = await ProductController.products();
    res.send(users);
});




export { productRouter };