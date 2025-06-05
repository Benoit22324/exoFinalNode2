"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partUpdateValidation = exports.partCreationValidation = void 0;
const zod_1 = require("zod");
exports.partCreationValidation = zod_1.z.object({
    question: zod_1.z.string().trim()
        .min(10, { message: "La question doit faire au minimum 10 charactères" }),
    answer: zod_1.z.string().trim()
        .min(10, { message: "Les réponses doit faire au minimum 10 charactères" }),
    correctAnswer: zod_1.z.string().trim()
        .min(6, { message: "La bonne réponse doit faire au minimum 6 charactères" }),
    index: zod_1.z.number()
});
exports.partUpdateValidation = zod_1.z.object({
    question: zod_1.z.string().trim()
        .min(10, { message: "La question doit faire au minimum 10 charactères" }),
    answer: zod_1.z.string().trim()
        .min(10, { message: "Les réponses doit faire au minimum 10 charactères" }),
    correctAnswer: zod_1.z.string().trim()
        .min(6, { message: "La bonne réponse doit faire au minimum 6 charactères" }),
    index: zod_1.z.number(),
    quizId: zod_1.z.string().trim()
});
