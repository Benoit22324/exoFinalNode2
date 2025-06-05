"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCreationValidation = void 0;
const zod_1 = require("zod");
exports.runCreationValidation = zod_1.z.object({
    result: zod_1.z.number(),
    quizId: zod_1.z.string().trim()
});
