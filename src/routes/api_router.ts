import express, { type NextFunction, type Request, type Response } from "express";
import { authMiddleware } from "../app/middlewares/auth_middleware";
import type { CreateUserRequest } from "../data/requests/user_request";
import { UserController } from "../controllers/user_controller";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// Add your routes here
apiRouter.post("/api/v1/user/register", async (req: Request, res: Response, _next: NextFunction) => {
    const reqBody: CreateUserRequest = req.body;
    const controller = new UserController(res);
    const response = await controller.register(reqBody);
    res.status(res.statusCode).send(response);
});
