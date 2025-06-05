"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreationValidation = void 0;
const zod_1 = require("zod");
exports.userCreationValidation = zod_1.z.object({
    username: zod_1.z.string().trim()
        .min(4, { message: "La question doit faire au minimum 4 charactères" }),
    email: zod_1.z.string().trim()
        .email({ message: "Email Invalide" }),
    password: zod_1.z.string().trim()
        .min(8, { message: "Votre mot de passe doit faire au moins 8 charactères" })
        .regex(/[0-9]/, { message: "Votre mot de passe doit contenir au moins un chiffre" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Votre mot de passe doit contenir au moins un caractère spécial" })
});
