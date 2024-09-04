import { OperationId, Post, Query, Route, Security, Tags, UploadedFile } from "tsoa";
import type { DataResponse } from "../app/middlewares/response/data_response";
import type { ErrorResponse } from "../app/middlewares/response/error_response";
import { erroHandle } from "../app/utils/error";
import type { FileStorageModel } from "../data/models/file_storage_model";
import type { NextFunction, Response } from "express";
import { FileStorageService } from "../services/file_storage_service";

@Tags("Upload File")
@Route("/api/v1/upload-file")
export class FileStorageController {
    private res: Response;
    private next: NextFunction;

    constructor(res: Response, next: NextFunction) {
        this.res = res;
        this.next = next;
    }

    @OperationId("uploadFile")
    @Post("/")
    @Security("X-API-TOKEN")
    public async uploadFile(
        @Query() dirPath: string,
        @UploadedFile("file") file: Express.Multer.File
    ): Promise<DataResponse<FileStorageModel> | ErrorResponse> {
        const reqData = {
            dirPath: dirPath,
            file: file
        };

        try {
            const data = await FileStorageService.uploadFile(reqData);
            const response: DataResponse<FileStorageModel> = {
                status: this.res.statusCode,
                data: data
            };

            return response;
        } catch (error) {
            return erroHandle(error, this.next);
        }
    }
}
