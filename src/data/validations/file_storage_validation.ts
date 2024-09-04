import { z, ZodType } from "zod";

export class FileStorageValidation {
    static readonly UPLOAD: ZodType = z.object({
        dirPath: z.string().min(1).max(50)
    });
}
