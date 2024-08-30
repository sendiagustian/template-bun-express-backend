import swaggerUi from "swagger-ui-express";
import type { SwaggerUiOptions } from "swagger-ui-express";

const swaggerUIOprions: SwaggerUiOptions = {
    swaggerOptions: {
        url: "/swagger.json",
        docExpansion: "none",
        defaultModelsExpandDepth: -1,
        defaultModelExpandDepth: -1
    }
};

export const swaggerMiddleware = swaggerUi.setup(undefined, swaggerUIOprions);
