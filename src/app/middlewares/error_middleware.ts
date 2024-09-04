import type { Request, Response, NextFunction } from "express";
import type { ErrorResponse } from "./response/error_response";

export const errorMiddleware = (_error: Error, _: Request, res: Response, __: NextFunction) => {
    const response: ErrorResponse = {
        status: 500,
        errors: "Internal server error"
    };

    res.status(500).json(response);
};
