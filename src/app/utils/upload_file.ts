import multer from "multer";
import fs from "fs-extra";

const rootDir = process.env.FILE_STORE_PATH || "/files-storage";
export const maxFileSize = 1024 * 1024 * 20; // 20 MB
export const maxFiles = 3;

const storage = multer.diskStorage({
    destination: (req, _file, cb) => {
        const path = `${import.meta.dir.replace("/src/app/utils", "")}${rootDir}/${req.query.dirPath}`;
        fs.mkdirsSync(path);
        cb(null, path);
    },
    filename: (_req, file, cb) => {
        cb(null, file.originalname.replace(/\s/g, "_"));
    }
});

const limits = {
    fileSize: maxFileSize,
    files: maxFiles
};

export const uploadSingleFile = multer({ storage, limits }).single("file");
export const uploadMultipleFiles = multer({ storage, limits }).array("files");
