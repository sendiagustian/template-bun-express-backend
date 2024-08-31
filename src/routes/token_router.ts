import express from "express";
import { authMiddleware } from "../app/middlewares/auth_middleware";
import { UserController } from "../controllers/user_controller";

export const apiRouter = express.Router();

apiRouter.use(authMiddleware);

// Add your routes here
apiRouter.post("/api/v1/user/create", async (req, res) => {
    const reqData = req.body;
    const controller: UserController = new UserController(res);
    const response = await controller.create(reqData);
    res.status(response.status).json(response);
});

apiRouter.get("/api/v1/user/all", async (_req, res) => {
    const controller: UserController = new UserController(res);
    const response = await controller.getAll();
    res.status(response.status).json(response);
});

apiRouter.get("/api/v1/user/:uid", async (req, res) => {
    const uid = req.params.uid;
    const controller: UserController = new UserController(res);
    const response = await controller.getById(uid);
    res.status(response.status).json(response);
});

apiRouter.put("/api/v1/user/update-data/:uid", async (req, res) => {
    const uid = req.params.uid;
    const reqData = req.body;
    const controller: UserController = new UserController(res);
    const response = await controller.updateData(uid, reqData);
    res.status(response.status).json(response);
});

apiRouter.delete("/api/v1/user/delete/:uid", async (req, res) => {
    const uid = req.params.uid;
    const controller: UserController = new UserController(res);
    const response = await controller.delete(uid);
    res.status(response.status).json(response);
});
