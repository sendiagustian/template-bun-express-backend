import cors from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import express, { type Application } from "express";
import { publicRouter } from "../../routes/public_router";
import { apiRouter } from "../../routes/api_router";
import { swaggerMiddleware } from "../middlewares/swagger_middleware";
import { errorMiddleware } from "../middlewares/error_middleware";
import { fileRouter } from "../../routes/file_router";

export const web: Application = express();

// Add middleware to the web
web.use(express.json()); // Parse JSON body
web.use(morgan("tiny")); // Log all requests
web.use(cors({ origin: "*" })); // Allow all origins
web.use(express.urlencoded({ extended: true })); // Parse URL-encoded body

// Serve static resources
web.use(express.static("docs")); // Serve the docs folder for swagger
web.use("/files-storage", express.static("files-storage")); // Serve the files-storage folder for static files

// Middleware to disable caching
web.use((_, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    next();
});

// Setting up Swagger UI
web.use("/api/docs", swaggerUi.serve, swaggerMiddleware);

// Add public router to the web
web.use(publicRouter);

// Add api router to the web
web.use(apiRouter);

// Add file router to the web
web.use(fileRouter);

web.use(errorMiddleware);
