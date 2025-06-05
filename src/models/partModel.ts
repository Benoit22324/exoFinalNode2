import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { NewPart } from "../entities";
import { parts } from "../schemas";
import logger from "../utils/logger";

export const partModel = {
    get: (id: string, index: number) => {
        try {
            return db.query.parts.findFirst({
                where: and(
                    eq(parts.quizIndex, index),
                    eq(parts.quizId, id)
                ),
                columns: {
                    id: true,
                    question: true,
                    answer: true,
                    correctAnswer: true
                }
            })
        } catch(err: any) {
            logger.error("Erreur lors de la récupération du Part: ", err.message)
            throw new Error("Le Part n'a pas pu être récupéré")
        }
    },

    create: (part: NewPart) => {
        try {
            return db.insert(parts).values(part)
        } catch(err: any) {
            logger.error("Erreur lors de la création du Part: ", err.message)
            throw new Error("Le Part n'a pas pu être créer")
        }
    },

    update: (id: string, part: NewPart) => {
        try {
            return db.update(parts).set(part).where(
                eq(parts.id, id)
            )
        } catch(err: any) {
            logger.error("Erreur lors de la mise à jour du Part: ", err.message)
            throw new Error("Le Part n'a pas pu être mise à jour")
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(parts).where(
                eq(parts.id, id)
            )
        } catch(err: any) {
            logger.error("Erreur lors de la suppression du Part: ", err.message)
            throw new Error("Le Part n'a pas pu être supprimé")
        }
    }
}