import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import express, { Application } from "express";
import { publicRouter } from "../../routes/public_router";
import { apiRouter } from "../../routes/api_router";
import { swaggerMiddleware } from "../middlewares/swagger_middleware";

export const web: Application = express();

// Add middleware to the web
web.use(express.json()); // Parse JSON body
web.use(morgan("tiny")); // Log all requests
web.use(cors({ origin: "*" })); // Allow all origins
web.use(express.static("swagger")); // Serve the docs folder for swagger

// Middleware to disable caching
web.use((_, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

// Setting up Swagger UI
publicRouter.use("/docs", swaggerUi.serve, swaggerMiddleware);

// Add public router to the web
web.use(publicRouter);

// Add api router to the web
web.use(apiRouter);
