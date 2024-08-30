import type { Response } from "express";
import { Body, OperationId, Post, Route, Tags } from "tsoa";
import { type DataResponse } from "../app/middlewares/response/data_response";
import { AuthService } from "../services/atuh_service";
import { erroHandle } from "../app/utils/error";
import type { AuthLoginRequest, AuthRegisterRequest } from "../data/requests/auth_request";
import type { ErrorResponse } from "../app/middlewares/response/error_response";
import type { AuthView } from "../data/models/views/auth_view";

@Tags("Authentication")
@Route("/api/v1/auth")
export class AuthController {
    private res: Response;

    constructor(res: Response) {
        this.res = res;
    }

    @OperationId("registerUser")
    @Post("/register")
    public async register(@Body() reqBody: AuthRegisterRequest): Promise<DataResponse<string> | ErrorResponse> {
        try {
            const data = await AuthService.register(reqBody);
            const response: DataResponse<string> = {
                status: this.res.statusCode,
                data: data
            };

            return response;
        } catch (error) {
            return erroHandle(error);
        }
    }

    @OperationId("loginUser")
    @Post("/login")
    public async login(@Body() reqBody: AuthLoginRequest): Promise<DataResponse<AuthView> | ErrorResponse> {
        try {
            const data = await AuthService.login(reqBody);
            const response: DataResponse<AuthView> = {
                status: this.res.statusCode,
                data: data
            };

            return response;
        } catch (error) {
            return erroHandle(error);
        }
    }
}
