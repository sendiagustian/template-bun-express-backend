import type { Request, Response, NextFunction } from "express";
import type { ErrorResponse } from "./response/error_response";
import { isExpiredAuthToken } from "../../data/models/token_model";
import { AuthService } from "../../services/atuh_service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get("X-API-TOKEN");

    if (token) {
        const validToken = await AuthService.findToken(token);

        if (validToken) {
            const tokenActive: boolean =
                validToken?.expiredAt !== null ? !isExpiredAuthToken(validToken?.expiredAt) : true;

            if (tokenActive) {
                return next();
            } else {
                const message: string = "Token expired";
                const response: ErrorResponse = {
                    status: 401,
                    errors: message
                };

                return res.status(401).json(response).end();
            }
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
