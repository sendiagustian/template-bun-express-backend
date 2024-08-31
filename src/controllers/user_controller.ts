import { Body, Delete, Get, OperationId, Path, Post, Put, Route, Security, Tags } from "tsoa";
import type { DataResponse } from "../app/middlewares/response/data_response";
import type { UserModel } from "../data/models/user_model";
import type { ErrorResponse } from "../app/middlewares/response/error_response";
import { UserService } from "../services/user_service";
import type { Response } from "express";
import { erroHandle } from "../app/utils/error";
import type { UserCreateRequest, UserUpdateRequest } from "../data/requests/user_request";

@Tags("User Management")
@Route("/api/v1/user")
export class UserController {
    private res: Response;

    constructor(res: Response) {
        this.res = res;
    }

    @OperationId("createUser")
    @Post("/create")
    @Security("X-API-TOKEN")
    public async create(@Body() reqData: UserCreateRequest): Promise<DataResponse<string> | ErrorResponse> {
        try {
            const data = await UserService.create(reqData);
            const response: DataResponse<string> = {
                status: this.res.statusCode,
                data: data
            };

            return response;
        } catch (error) {
            return erroHandle(error);
        }
    }

    @OperationId("getUser")
    @Get("/all")
    @Security("X-API-TOKEN")
    public async getAll(): Promise<DataResponse<Array<UserModel>> | ErrorResponse> {
        try {
            const data = await UserService.gets();
            const response: DataResponse<Array<UserModel>> = {
                status: this.res.statusCode,
                data: data
            };

            return response;
        } catch (error) {
            return erroHandle(error);
        }
    }

    @OperationId("getUserById")
    @Get("/{uid}")
    @Security("X-API-TOKEN")
    public async getById(@Path("uid") uid: string): Promise<DataResponse<UserModel> | ErrorResponse> {
        try {
            const data = await UserService.getByUid(uid);
            const response: DataResponse<UserModel> = {
                status: this.res.statusCode,
                data: data
            };

            return response;
        } catch (error) {
            return erroHandle(error);
        }
    }

    @OperationId("updateUser")
    @Put("update-data/{uid}")
    @Security("X-API-TOKEN")
    public async updateData(
        @Path("uid") uid: string,
        @Body() reqData: UserUpdateRequest
    ): Promise<DataResponse<string> | ErrorResponse> {
        try {
            const data = await UserService.updateData(uid, reqData);
            const response: DataResponse<string> = {
                status: this.res.statusCode,
                data: data
            };

            return response;
        } catch (error) {
            return erroHandle(error);
        }
    }

    @OperationId("deleteUser")
    @Delete("/delete/{uid}")
    @Security("X-API-TOKEN")
    public async delete(@Path("uid") uid: string): Promise<DataResponse<string> | ErrorResponse> {
        try {
            const data = await UserService.delete(uid);
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
