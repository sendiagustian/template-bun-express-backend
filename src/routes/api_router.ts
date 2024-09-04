import express from "express";
import { UserController } from "../controllers/user_controller";
import { authMiddleware } from "../app/middlewares/auth_middleware";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// Add your routes here
apiRouter.post("/api/v1/user/create", async (req, res, next) => {
    const reqData = req.body;
    const controller: UserController = new UserController(res, next);
    const response = await controller.create(reqData);
    res.status(response.status).json(response);
});

apiRouter.get("/api/v1/user/all", async (_req, res, next) => {
    const controller: UserController = new UserController(res, next);
    const response = await controller.getAll();
    res.status(response.status).json(response);
});

apiRouter.get("/api/v1/user/:uid", async (req, res, next) => {
    const uid = req.params.uid;
    const controller: UserController = new UserController(res, next);
    const response = await controller.getById(uid);
    res.status(response.status).json(response);
});

apiRouter.put("/api/v1/user/update-data/:uid", async (req, res, next) => {
    const uid = req.params.uid;
    const reqData = req.body;
    const controller: UserController = new UserController(res, next);
    const response = await controller.updateData(uid, reqData);
    res.status(response.status).json(response);
});

apiRouter.delete("/api/v1/user/delete/:uid", async (req, res, next) => {
    const uid = req.params.uid;
    const controller: UserController = new UserController(res, next);
    const response = await controller.delete(uid);
    res.status(response.status).json(response);
});
