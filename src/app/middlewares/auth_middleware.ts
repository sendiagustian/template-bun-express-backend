import type { Request, Response, NextFunction } from "express";
import type { ErrorResponse } from "./response/error_response";
import { TokenService } from "../../services/token_service";
import { isExpiredToken, type TokenModel } from "../../data/models/token_model";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.get("X-API-TOKEN");

    if (token) {
        const validToken: TokenModel = await TokenService.findToken(token);
        const tokenActive: boolean = validToken.expiredAt !== null ? !isExpiredToken(validToken.expiredAt) : true;

        if (validToken) {
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
