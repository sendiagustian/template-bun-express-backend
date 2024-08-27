import express from "express";
import { PingController } from "../controllers/ping_controller";

export const publicRouter = express.Router();

// Health check endpoint
publicRouter.get("/health-check", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.status(res.statusCode).send(response);
});
