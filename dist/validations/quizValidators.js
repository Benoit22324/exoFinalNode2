"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizCreationValidation = void 0;
const zod_1 = require("zod");
exports.quizCreationValidation = zod_1.z.object({
    title: zod_1.z.string().trim()
        .min(6, { message: "Le titre doit contenir au minimum 6 charactères" })
        .max(100, { message: "Le titre ne peux pas dépasser 100 charactères" }),
    difficulty: zod_1.z.string().trim()
        .min(1, { message: "La difficulté doit contenir au moins 1 charactère" })
});
