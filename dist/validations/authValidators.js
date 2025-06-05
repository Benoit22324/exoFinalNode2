"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLoginValidation = void 0;
const zod_1 = require("zod");
exports.authLoginValidation = zod_1.z.object({
    email: zod_1.z.string().trim()
        .email({ message: "Email Invalide" }),
    password: zod_1.z.string().trim()
        .min(8, { message: "Votre mot de passe doit faire au moins 8 charactères" })
        .regex(/[0-9]/, { message: "Votre mot de passe doit contenir au moins un chiffre" })
        .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: "Votre mot de passe doit contenir au moins un caractère spécial" })
});
