import type { Request, Response, NextFunction } from "express";
import { Body, OperationId, Post, Route, Security, Tags } from "tsoa";
import { type DataResponse } from "../app/middlewares/response/data_response";
import { UserService } from "../services/user_service";
import { type CreateUserRequest } from "../data/requests/user_request";
import { Validation } from "../app/utils/validation";
import { UserValidation } from "../data/validations/user_validation";
import { errorHandle } from "../app/utils/error";

@Tags("User")
@Route("/api/v1/user")
export class UserController {
    private res: Response;
    private next: NextFunction;

    constructor(res: Response, next: NextFunction) {
        this.res = res;
        this.next = next;
    }

    @OperationId("registerUser")
    @Post("/register")
    @Security("X-API-TOKEN")
    public async register(@Body() reqBody: CreateUserRequest) {
        try {
            const data = await UserService.register(reqBody);
            const response: DataResponse<string> = {
                status: this.res.statusCode,
                data: data
            };

            return response;
        } catch (e) {
            return errorHandle(e, this.res);
        }
    }
}
