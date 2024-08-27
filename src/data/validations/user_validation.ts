import { z, ZodType } from "zod";

export class UserValidation {
    static readonly CREATE: ZodType = z.object({
        name: z.string().min(1).max(50),
        email: z.string().min(1).max(50).email(),
        password: z.string().min(8).max(255),
        phone: z.string().min(1).max(15)
    });

    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(50).optional(),
        email: z.string().min(1).max(50).email().optional(),
        phone: z.string().min(1).max(15).optional()
    });
}
