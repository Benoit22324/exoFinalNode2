import { z } from "zod";

export const partCreationValidation = z.object({
    question: z.string().trim()
        .min(10, { message: "La question doit faire au minimum 10 charactères" }),
    answer: z.string().trim()
        .min(10, { message: "Les réponses doit faire au minimum 10 charactères" }),
    correctAnswer: z.string().trim()
        .min(6, { message: "La bonne réponse doit faire au minimum 6 charactères" }),
    index: z.number()
})

export const partUpdateValidation = z.object({
    question: z.string().trim()
        .min(10, { message: "La question doit faire au minimum 10 charactères" }),
    answer: z.string().trim()
        .min(10, { message: "Les réponses doit faire au minimum 10 charactères" }),
    correctAnswer: z.string().trim()
        .min(6, { message: "La bonne réponse doit faire au minimum 6 charactères" }),
    index: z.number(),
    quizId: z.string().trim()
})