import { web } from "./app/configs/web";
import { logger } from "./app/utils/logging";

const PORT = process.env.PORT || 8000;

web.listen(PORT, async () => {
    logger.info(`Server is running on http://127.0.0.1:${PORT}/docs`);
});
