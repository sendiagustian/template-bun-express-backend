import type { DataResponse } from "../src/app/middlewares/response/data_response";
import { Services } from "../src/app/constants/services";
import { describe, expect, test } from "bun:test";
import { fetchData } from "../src/app/utils/fetch";
import type { UserModel } from "../src/data/models/user_model";

describe("fetch", () => {
    test("get user service", async () => {
        const endPoint: string = "/api/v1/user/all";
        const url = `${Services.userService}${endPoint}`;

        const response = await fetchData<DataResponse<Array<UserModel>>>(url, {
            method: "GET",
            headers: { "X-API-TOKEN": "test" }
        });

        expect(response).toBeDefined();
        expect(response.data).toBeInstanceOf(Array<UserModel>);
    });
});
