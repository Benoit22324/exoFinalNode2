import { and, eq } from "drizzle-orm";
import { db } from "../config/pool";
import logger from "../utils/logger";
import { runs } from "../schemas";
import { NewRun } from "../entities";

export const runModel = {
    get: (id: string) => {
        try {
            return db.query.runs.findFirst({
                where: eq(runs.id, id),
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
            })
        } catch(err: any) {
            logger.error("Erreur lors de la récupération de la Run: ", err.message);
            throw new Error("La Run n'a pas pu être récupéré")
        }
    },

    create: (run: NewRun) => {
        try {
            return db.insert(runs).values(run)
        } catch(err: any) {
            logger.error("Erreur lors de la création de la Run: ", err.message)
            throw new Error("La Run n'a pas pu être créer")
        }
    },

    update: (id: string, userId: string, run: NewRun) => {
        try {
            return db.update(runs).set(run).where(
                and(
                    eq(runs.id, id),
                    eq(runs.userId, userId)
                )
            )
        } catch(err: any) {
            logger.error("Erreur lors de la mise à jour de la Run: ", err.message)
            throw new Error("La Run n'a pas pu être mise à jour")
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(runs).where(
                eq(runs.id, id)
            )
        } catch(err: any) {
            logger.error("Erreur lors de la suppression de la Run: ", err.message)
            throw new Error("La Run n'a pas pu être supprimé")
        }
    }
}