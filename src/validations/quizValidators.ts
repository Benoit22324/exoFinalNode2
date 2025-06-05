import { z } from "zod";

export const quizCreationValidation = z.object({
    title: z.string().trim()
        .min(6, { message: "Le titre doit contenir au minimum 6 charactères" })
        .max(100, { message: "Le titre ne peux pas dépasser 100 charactères" }),
    difficulty: z.string().trim()
        .min(1, { message: "La difficulté doit contenir au moins 1 charactère" })
})