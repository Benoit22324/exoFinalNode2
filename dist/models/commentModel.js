"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentModel = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pool_1 = require("../config/pool");
const schemas_1 = require("../schemas");
const logger_1 = __importDefault(require("../utils/logger"));
exports.commentModel = {
    getAllByUser: (userId) => {
        try {
            return pool_1.db.query.comments.findMany({
                where: (0, drizzle_orm_1.eq)(schemas_1.comments.authorId, userId),
                columns: {
                    id: true,
                    content: true
                }
            });
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la récupération des Commentaires: ", err.message);
            return [];
        }
    },
    create: (comment) => {
        try {
            return pool_1.db.insert(schemas_1.comments).values(comment);
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la création du Commentaire: ", err.message);
            throw new Error("Le Commentaire n'a pas pu être créer");
        }
    },
    update: (id, authorId, comment) => {
        try {
            return pool_1.db.update(schemas_1.comments).set(comment).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schemas_1.comments.id, id), (0, drizzle_orm_1.eq)(schemas_1.comments.authorId, authorId)));
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la mise à jour du Commentaire: ", err.message);
            throw new Error("Le Commentaire n'a pas pu être mise à jour");
        }
    },
    delete: (id) => {
        try {
            return pool_1.db.delete(schemas_1.comments).where((0, drizzle_orm_1.eq)(schemas_1.comments.id, id));
        }
        catch (err) {
            logger_1.default.error("Erreur lors de la suppression du Commentaire: ", err.message);
            throw new Error("Le Commentaire n'a pas pu être supprimé");
        }
    }
};
