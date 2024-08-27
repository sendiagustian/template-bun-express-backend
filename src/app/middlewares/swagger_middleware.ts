import swaggerUi from "swagger-ui-express";
import { SwaggerUiOptions } from "swagger-ui-express";

const swaggerUIOprions: SwaggerUiOptions = {
    swaggerOptions: {
        url: "/swagger.json",
        docExpansion: "none",
        defaultModelsExpandDepth: -1,
        defaultModelExpandDepth: -1
        // requestInterceptor: (req: Request) => {
        //     req.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, proxy-revalidate";
        //     req.headers["Pragma"] = "no-cache";
        //     req.headers["Expires"] = "0";
        //     return req;
        // }
    }
};

export const swaggerMiddleware = swaggerUi.setup(undefined, swaggerUIOprions);
