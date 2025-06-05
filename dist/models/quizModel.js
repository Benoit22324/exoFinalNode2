"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizModel = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
const logger_1 = __importDefault(require("../utils/logger"));
exports.quizModel = {
    getAll: () => {
        try {
            return pool_1.db.select({
                id: schemas_1.quizs.id,
                title: schemas_1.quizs.title,
                authorId: schemas_1.quizs.authorId
            }).from(schemas_1.quizs);
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la récupération des Quizs: ", err.message);
            return [];
        }
    },
    get: (id) => {
        try {
            return pool_1.db.query.quizs.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.quizs.id, id),
                columns: {
                    id: true,
                    title: true,
                    difficulty: true,
                    createdAt: true
                },
                with: {
                    user: {
                        columns: {
                            id: true,
                            username: true
                        }
                    },
                    comments: {
                        columns: {
                            id: true,
                            content: true,
                        },
                        with: {
                            user: {
                                columns: {
                                    id: true,
                                    username: true
                                }
                            }
                        }
                    },
                    parts: {
                        columns: {
                            id: true,
                            question: true
                        }
                    }
                }
            });
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la récupération du Quiz: ", err.message);
            throw new Error("Le Quiz n'a pas pu être récupéré");
        }
    },
    create: (quiz) => {
        try {
            return pool_1.db.insert(schemas_1.quizs).values(quiz);
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la création du Quiz: ", err.message);
            throw new Error("Le Quiz n'a pas pu être créer");
        }
    },
    update: (id, authorId, quiz) => {
        try {
            return pool_1.db.update(schemas_1.quizs).set(quiz).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.quizs.id, id), (0, drizzle_orm_1.eq)(schemas_1.quizs.authorId, authorId)));
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la mise à jour du Quiz: ", err.message);
            throw new Error("Le Quiz n'a pas pu être mise à jour");
        }
    },
    delete: (id, authorId) => {
        try {
            return pool_1.db.delete(schemas_1.quizs).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.quizs.id, id), (0, drizzle_orm_1.eq)(schemas_1.quizs.authorId, authorId)));
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la suppression du Quiz: ", err.message);
            throw new Error("Le Quiz n'a pas pu être supprimé");
        }
    }
};
