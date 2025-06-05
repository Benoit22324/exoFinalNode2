"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partModel = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
const logger_1 = __importDefault(require("../utils/logger"));
exports.partModel = {
    get: (id, index) => {
        try {
            return pool_1.db.query.parts.findFirst({
                where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.parts.quizIndex, index), (0, drizzle_orm_1.eq)(schemas_1.parts.quizId, id)),
                columns: {
                    id: true,
                    question: true,
                    answer: true,
                    correctAnswer: true
                }
            });
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la récupération du Part: ", err.message);
            throw new Error("Le Part n'a pas pu être récupéré");
        }
    },
    create: (part) => {
        try {
            return pool_1.db.insert(schemas_1.parts).values(part);
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la création du Part: ", err.message);
            throw new Error("Le Part n'a pas pu être créer");
        }
    },
    update: (id, part) => {
        try {
            return pool_1.db.update(schemas_1.parts).set(part).where((0, drizzle_orm_1.eq)(schemas_1.parts.id, id));
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la mise à jour du Part: ", err.message);
            throw new Error("Le Part n'a pas pu être mise à jour");
        }
    },
    delete: (id) => {
        try {
            return pool_1.db.delete(schemas_1.parts).where((0, drizzle_orm_1.eq)(schemas_1.parts.id, id));
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la suppression du Part: ", err.message);
            throw new Error("Le Part n'a pas pu être supprimé");
        }
    }
};
