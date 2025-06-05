"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
const logger_1 = __importDefault(require("../utils/logger"));
exports.userModel = {
    get: (id) => {
        try {
            return pool_1.db.query.users.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.users.id, id),
                columns: {
                    id: true,
                    username: true,
                    createdAt: true
                },
                with: {
                    runs: {
                        columns: {
                            id: true,
                            result: true
                        }
                    }
                }
            });
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la récupération de l'utilisateur: ", err.message);
            throw new Error("L'utilisateur n'a pas pu être récupéré");
        }
    },
    findCredentials: (email) => {
        try {
            return pool_1.db.query.users.findFirst({
                where: (0, drizzle_orm_1.eq)(schemas_1.users.email, email)
            });
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la récupération de l'utilisateur: ", err.message);
            throw new Error("L'utilisateur n'a pas pu être récupéré");
        }
    },
    create: (user) => {
        try {
            return pool_1.db.insert(schemas_1.users).values(user).returning({
                id: schemas_1.users.id
            });
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la création de l'utilisateur: ", err.message);
            throw new Error("L'utilisateur n'a pas pu être créer");
        }
    },
    update: (id, user) => {
        try {
            return pool_1.db.update(schemas_1.users).set(user).where((0, drizzle_orm_1.eq)(schemas_1.users.id, id));
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la mise à jour de l'utilisateur: ", err.message);
            throw new Error("L'utilisateur n'a pas pu être mise à jour");
        }
    },
    delete: (id) => {
        try {
            return pool_1.db.delete(schemas_1.users).where((0, drizzle_orm_1.eq)(schemas_1.users.id, id));
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la suppression de l'utilisateur: ", err.message);
            throw new Error("L'utilisateur' n'a pas pu être supprimé");
        }
    }
};
