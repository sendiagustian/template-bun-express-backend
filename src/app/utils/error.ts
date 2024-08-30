import { ZodError } from "zod";
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

export const erroHandle = (error: any) => {
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
    } else {
        // Re-throw other errors for the error middleware
        throw error;
    }
};
