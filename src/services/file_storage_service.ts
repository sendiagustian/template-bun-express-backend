import type { FileStorageModel } from "../data/models/file_storage_model";
import type { FileStorageRequest } from "../data/requests/file_storage_request";

export class FileStorageService {
    static async uploadFile(reqData: FileStorageRequest): Promise<FileStorageModel> {
        const dirPath = reqData.dirPath;
        const file = reqData.file;

        let urlFile;

        if (import.meta.env.MODE === "production") {
            urlFile = `${process.env.BASE_URL}/files-storage/${dirPath}/${file.filename}`;
        } else {
            urlFile = `${process.env.BASE_URL}:${process.env.PORT}/files-storage/${dirPath}/${file.filename}`;
        }

        const response = {
            dirPath: dirPath,
            url: urlFile
        };

        return response;
    }
}
