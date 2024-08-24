import express from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerMiddleware } from "../app/middlewares/swagger_middleware";
import { PingController } from "../controllers/ping_controller";
import { ErrorResponse } from "../app/middlewares/response/error_response";

export const publicRouter = express.Router();

// Health check endpoint
publicRouter.get("/health-check", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.status(res.statusCode).send(response);
});

// Setting up Swagger UI
publicRouter.use("/docs", swaggerUi.serve, swaggerMiddleware);
