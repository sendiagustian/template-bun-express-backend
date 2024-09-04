import { web } from "./app/configs/web";
import { logger } from "./app/utils/logging";

const port = process.env.PORT || 8000;
const base = process.env.BASE_URL || "http://127.0.0.1";

// FOR RUN SERVER
// bun run dev

// FOR BUILD
// bun run build
web.listen(port, async () => {
    logger.info(`Server is running on ${base}:${port}/api/docs`);
});
