import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import { quizs } from "../schemas";
import logger from "../utils/logger"
import { NewQuiz } from "../entities";

export const quizModel = {
    getAll: () => {
        try {
            return db.select({
                id: quizs.id,
                title: quizs.title,
                authorId: quizs.authorId
            }).from(quizs)
        } catch(err: any) {
            logger.error("Erreur lors de la récupération des Quizs: ", err.message);
            return []
        }
    },

    get: (id: string) => {
        try {
            return db.query.quizs.findFirst({
                where: eq(quizs.id, id),
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
            })
        } catch(err: any) {
            logger.error("Erreur lors de la récupération du Quiz: ", err.message)
            throw new Error("Le Quiz n'a pas pu être récupéré")
        }
    },

    create: (quiz: NewQuiz) => {
        try {
            return db.insert(quizs).values(quiz)
        } catch(err: any) {
            logger.error("Erreur lors de la création du Quiz: ", err.message)
            throw new Error("Le Quiz n'a pas pu être créer")
        }
    },

    update: (id: string, authorId: string, quiz: NewQuiz) => {
        try {
            return db.update(quizs).set(quiz).where(
                and(
                    eq(quizs.id, id),
                    eq(quizs.authorId, authorId)
                )
            )
        } catch(err: any) {
            logger.error("Erreur lors de la mise à jour du Quiz: ", err.message)
            throw new Error("Le Quiz n'a pas pu être mise à jour")
        }
    },

    delete: (id: string, authorId: string) => {
        try {
            return db.delete(quizs).where(
                and(
                    eq(quizs.id, id),
                    eq(quizs.authorId, authorId)
                )
            )
        } catch(err: any) {
            logger.error("Erreur lors de la suppression du Quiz: ", err.message)
            throw new Error("Le Quiz n'a pas pu être supprimé")
        }
    }
}