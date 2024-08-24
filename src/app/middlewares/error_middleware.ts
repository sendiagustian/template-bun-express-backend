import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ErrorResponse } from "./response/error_response";

export class ThrowError extends Error {
    constructor(
        public status: number,
        public message: string
    ) {
        super(message);
        status;
    }
}

export const errorMiddleware = (error: Error, req: Request, res: Response, __: NextFunction): void => {
    if (error instanceof ZodError) {
        const message: string = error.issues
            .map((issue) => {
                return `${issue.message} in field ${issue.path.join(".")}`;
            })
            .join(" & ");

        const response: ErrorResponse = {
            status: 400,
            errors: message
        };

        res.status(400).json(response);
    } else if (error instanceof ThrowError) {
        const message: string = error.message;

        const response: ErrorResponse = {
            status: error.status,
            errors: message
        };

        res.status(error.status).json(response);
    } else {
        const message: string = error.message;

        const response: ErrorResponse = {
            status: 500,
            errors: message
        };

        res.status(500).json(response);
    }
};
