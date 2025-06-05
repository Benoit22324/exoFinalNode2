"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentCreationValidation = void 0;
const zod_1 = require("zod");
exports.commentCreationValidation = zod_1.z.object({
    content: zod_1.z.string().trim()
        .min(8, { message: "Le commentaire doit contenir au moins 8 charactères" })
});
