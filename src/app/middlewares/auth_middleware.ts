import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "./response/error_response";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get("X-API-TOKEN");

    if (token) {
        const valid = true;
        if (valid) {
            return next();
        } else {
            const message: string = "Incorrect authentication";
            const response: ErrorResponse = {
                status: 401,
                errors: message
            };

            return res.status(401).json(response).end();
        }
    } else {
        const message: string = "Unauthorized";
        const response: ErrorResponse = {
            status: 401,
            errors: message
        };

        return res.status(401).json(response).end();
    }
};
