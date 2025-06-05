import { z } from "zod";

export const runCreationValidation = z.object({
    result: z.number(),
    quizId: z.string().trim()
})