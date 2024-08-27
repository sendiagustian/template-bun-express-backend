import { z, ZodType } from "zod";

export class TokenValidation {
    static readonly VALID: ZodType = z.object({
        token: z.string().min(1).max(255),
        expiredAt: z.string().min(1).max(255)
    });
}
