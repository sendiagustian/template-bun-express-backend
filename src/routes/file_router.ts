import express from "express";
import { FileStorageController } from "../controllers/file_storage_controller";
import { uploadSingleFile } from "../app/utils/upload_file";
import { authMiddleware } from "../app/middlewares/auth_middleware";
import { erroHandle } from "../app/utils/error";

export const fileRouter = express.Router();

fileRouter.use(authMiddleware);

fileRouter.post("/api/v1/upload-file", (req, res, next) => {
    uploadSingleFile(req, res, async (err) => {
        if (err) {
            const response = erroHandle(err, next);
            res.status(response.status).json(response);
        }

        const dirPath = req.query.dirPath as string;
        const formData = req.file as Express.Multer.File;

        const controller: FileStorageController = new FileStorageController(res, next);
        const response = await controller.uploadFile(dirPath, formData);
        res.status(response.status).json(response);
    });
});
