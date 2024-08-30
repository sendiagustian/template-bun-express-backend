import { z, ZodType } from "zod";

export class UserValidation {
    static readonly UPDATE: ZodType = z.object({
        name: z.string().min(1).max(50).optional(),
        email: z.string().min(1).max(50).email().optional(),
        phone: z.string().min(1).max(15).optional()
    });
}
