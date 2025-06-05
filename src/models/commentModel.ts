import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { comments } from "../schemas";
import logger from "../utils/logger";
import { NewComment } from "../entities";

export const commentModel = {
    getAllByUser: (userId: string) => {
        try {
            return db.query.comments.findMany({
                where: eq(comments.authorId, userId),
                columns: {
                    id: true,
                    content: true
                }
            })
        } catch(err: any) {
            logger.error("Erreur lors de la récupération des Commentaires: ", err.message);
            return []
        }
    },

    create: (comment: NewComment) => {
        try {
            return db.insert(comments).values(comment)
        } catch(err: any) {
            logger.error("Erreur lors de la création du Commentaire: ", err.message)
            throw new Error("Le Commentaire n'a pas pu être créer")
        }
    },

    update: (id: string, authorId: string, comment: NewComment) => {
        try {
            return db.update(comments).set(comment).where(
                and(
                    eq(comments.id, id),
                    eq(comments.authorId, authorId)
                )
            )
        } catch(err: any) {
            logger.error("Erreur lors de la mise à jour du Commentaire: ", err.message)
            throw new Error("Le Commentaire n'a pas pu être mise à jour")
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(comments).where(
                eq(comments.id, id)
            )
        } catch(err: any) {
            logger.error("Erreur lors de la suppression du Commentaire: ", err.message)
            throw new Error("Le Commentaire n'a pas pu être supprimé")
        }
    }
}