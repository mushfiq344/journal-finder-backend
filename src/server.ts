// import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import "reflect-metadata";
import * as helmet from "helmet";
import * as cors from "cors";


import userRoutes from './modules/user/userRoutes';
import { orderRouter } from './modules/order/orderRoutes';
import { productRouter } from './modules/product/productRoutes';


import routes from "./routes/index";
import config from "./config/config";

createConnection().then(async connection => {


    // apply the routes to our application
    // create express app
    const app = express();
    // Call midlewares
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json());
    app.use(bodyParser.json());
    //setting middleware
    //__dirname gives the folder root of the current file
    app.use(express.static(__dirname + '/../public')); //Serves resources from public folder


    app.use("/", routes);
    // app.use('/user', userRoutes);
    // app.use('/order', orderRouter);
    // app.use('/product', productRouter);
    // start express server

    app.listen(config.PORT, (err) => {
        if (err) console.error('❌ Unable to connect the server: ', err);
        console.log(`🌍 Server listening on port ` + config.PORT);
    });
    //http://localhost:3000/user
    //http://localhost:3000/user/27/orders
}).catch(error => console.log(error));
