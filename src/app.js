const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const errorMiddleware = require("./middlewares/error.middleware");

class App {
    constructor() {
        this.instance = express();
        this.#registerMiddlewares();
        this.#registerRoutes();
        this.#registerErrorHandler();
    }

    #registerMiddlewares() {
        this.instance.use(express.json());
        this.instance.use(cookieParser());
    }

    #registerRoutes() {
        this.instance.use("/api/auth", authRouter);
    }

    #registerErrorHandler() {
        // must be registered last so it catches errors from all routes above
        this.instance.use(errorMiddleware);
    }
}

module.exports = new App().instance;
