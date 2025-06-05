import { z } from "zod";

export const commentCreationValidation = z.object({
    content: z.string().trim()
        .min(8, { message: "Le commentaire doit contenir au moins 8 charactères" })
})