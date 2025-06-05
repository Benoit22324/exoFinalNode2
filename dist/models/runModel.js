"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runModel = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const logger_1 = __importDefault(require("../utils/logger"));
const schemas_1 = require("../schemas");
exports.runModel = {
    get: (id) => {
        try {
            return pool_1.db.query.runs.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.runs.id, id),
                columns: {
                    id: true,
                    result: true,
                    createdAt: true
                },
                with: {
                    quiz: {
                        columns: {
                            id: true,
                            title: true
                        }
                    }
                }
            });
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la récupération de la Run: ", err.message);
            throw new Error("La Run n'a pas pu être récupéré");
        }
    },
    create: (run) => {
        try {
            return pool_1.db.insert(schemas_1.runs).values(run);
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la création de la Run: ", err.message);
            throw new Error("La Run n'a pas pu être créer");
        }
    },
    update: (id, userId, run) => {
        try {
            return pool_1.db.update(schemas_1.runs).set(run).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.runs.id, id), (0, drizzle_orm_1.eq)(schemas_1.runs.userId, userId)));
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la mise à jour de la Run: ", err.message);
            throw new Error("La Run n'a pas pu être mise à jour");
        }
    },
    delete: (id) => {
        try {
            return pool_1.db.delete(schemas_1.runs).where((0, drizzle_orm_1.eq)(schemas_1.runs.id, id));
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la suppression de la Run: ", err.message);
            throw new Error("La Run n'a pas pu être supprimé");
        }
    }
};
