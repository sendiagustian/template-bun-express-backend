import { z, ZodType } from "zod";

export class AuthValidation {
    static readonly REGISTER: ZodType = z.object({
        name: z.string().min(1).max(50),
        email: z.string().min(1).max(50).email(),
        password: z.string().min(8),
        phone: z.string().min(9)
    });

    static readonly LOGIN: ZodType = z.object({
        email: z.string().min(1).max(50).email(),
        password: z.string().min(8)
    });
}
