import express, { type Response, type Request, type NextFunction } from "express";
import { PingController } from "../controllers/ping_controller";
import type { AuthLoginRequest, AuthRegisterRequest } from "../data/requests/auth_request";
import { AuthController } from "../controllers/auth_controller";

export const publicRouter = express.Router();

// Health check endpoint
publicRouter.get("/health-check", async (_req, res) => {
    const controller = new PingController();
    const response = await controller.getMessage();
    return res.status(res.statusCode).send(response);
});

publicRouter.post("/api/v1/auth/login", async (req: Request, res: Response, _next: NextFunction) => {
    const reqBody: AuthLoginRequest = req.body;
    const controller = new AuthController(res);
    const response = await controller.login(reqBody);
    res.status(res.statusCode).send(response);
});

publicRouter.post("/api/v1/auth/register", async (req: Request, res: Response, _next: NextFunction) => {
    const reqBody: AuthRegisterRequest = req.body;
    const controller = new AuthController(res);
    const response = await controller.register(reqBody);
    res.status(res.statusCode).send(response);
});
