import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import { errorMiddleware } from "../middlewares/error_middleware";
import { publicRouter } from "../../routes/public_router";
import { apiRouter } from "../../routes/api_router";
import { ErrorResponse } from "../middlewares/response/error_response";

export const web: Application = express();

// Add middleware to the web
web.use(express.json()); // Parse JSON body
web.use(morgan("tiny")); // Log all requests
web.use(cors({ origin: "*" })); // Allow all origins
web.use(express.static("swagger")); // Serve the docs folder for swagger

web.use((_, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

publicRouter.use((_, res) => {
    const response: ErrorResponse = {
        status: 404,
        errors: "Url not found"
    };

    res.status(404).send(response);
});

// Add public router to the web
web.use(publicRouter);

// Add api router to the web
web.use(apiRouter);

// Add error middleware to the web
web.use(errorMiddleware);
