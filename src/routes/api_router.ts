import express from "express";
import { authMiddleware } from "../app/middlewares/auth_middleware";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// Add your routes here
