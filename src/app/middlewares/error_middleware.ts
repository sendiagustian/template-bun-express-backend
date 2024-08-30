import type { Request, Response, NextFunction } from "express";
import type { ErrorResponse } from "./response/error_response";

export const errorMiddleware = (error: Error, _: Request, res: Response, __: NextFunction) => {
    const message: string = error.message;

    const response: ErrorResponse = {
        status: 500,
        errors: message
    };

    return res.status(500).json(response);
};
