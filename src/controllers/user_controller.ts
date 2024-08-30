import type { Response } from "express";
import { Body, OperationId, Post, Route, Security, Tags } from "tsoa";
import { type DataResponse } from "../app/middlewares/response/data_response";
import { UserService } from "../services/user_service";
import { type CreateUserRequest } from "../data/requests/user_request";
import { erroHandle } from "../app/utils/error";

@Tags("User")
@Route("/api/v1/user")
export class UserController {
    private res: Response;

    constructor(res: Response) {
        this.res = res;
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
        } catch (error) {
            return erroHandle(error);
        }
    }
}
