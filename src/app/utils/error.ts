import { ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";
import type { ErrorResponse } from "../middlewares/response/error_response";

export class ThrowError extends Error {
    constructor(
        public status: number,
        public message: string
    ) {
        super(message);
        status;
    }
}

export const errorHandle = (error: any, res: Response) => {
    if (error instanceof ZodError) {
        const message: string = error.errors
            .map((issue) => `${issue.message} in field ${issue.path.join(".")}`)
            .join(" & ");

        const response: ErrorResponse = {
            status: 400,
            errors: message,
            details: error.errors.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message
            }))
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
