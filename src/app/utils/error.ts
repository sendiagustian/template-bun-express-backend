import { ZodError } from "zod";
import type { ErrorResponse } from "../middlewares/response/error_response";
import multer from "multer";
import { maxFiles, maxFileSize } from "./upload_file";
import type { NextFunction } from "express";

export class ThrowError extends Error {
    constructor(
        public status: number,
        public message: string
    ) {
        super(message);
        status;
    }
}

export const erroHandle = (error: any, next: NextFunction): ErrorResponse => {
    if (error instanceof ZodError) {
        // Handle ZodError here
        const message = error.issues.map((issue) => `${issue.message} in field ${issue.path.join(".")}`).join(" & ");

        const errorResponse: ErrorResponse = {
            status: 400,
            errors: message
        };

        return errorResponse;
    } else if (error instanceof ThrowError) {
        const message = error.message;

        const errorResponse: ErrorResponse = {
            status: error.status,
            errors: message
        };

        return errorResponse;
    } else if (error instanceof multer.MulterError) {
        const maxSize = maxFileSize / (1024 * 1024);
        if (error.code === "LIMIT_FILE_SIZE") {
            const errorResponse: ErrorResponse = {
                status: 400,
                errors: `File size is too large, maximum file size is ${maxSize} MB`
            };
            return errorResponse;
        } else if (error.code === "LIMIT_UNEXPECTED_FILE") {
            const errorResponse: ErrorResponse = {
                status: 400,
                errors: `Maximum files that can be uploaded is ${maxFiles}`
            };
            return errorResponse;
        } else {
            const errorResponse: ErrorResponse = {
                status: 500,
                errors: error.message
            };
            return errorResponse;
        }
    } else {
        throw next(error);
    }
};
