import { eq } from "drizzle-orm";
import { db } from "../config/pool";
import { users } from "../schemas";
import logger from "../utils/logger";
import { NewUser } from "../entities";

export const userModel = {
    get: (id: string) => {
        try {
            return db.query.users.findFirst({
                where: eq(users.id, id),
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
            })
        } catch(err: any) {
            logger.error("Erreur lors de la récupération de l'utilisateur: ", err.message);
            throw new Error("L'utilisateur n'a pas pu être récupéré")
        }
    },

    findCredentials: (email: string) => {
        try {
            return db.query.users.findFirst({
                where: eq(users.email, email)
            })
        } catch(err: any) {
            logger.error("Erreur lors de la récupération de l'utilisateur: ", err.message)
            throw new Error("L'utilisateur n'a pas pu être récupéré");
        }
    },

    create: (user: NewUser) => {
        try {
            return db.insert(users).values(user).returning({
                id: users.id
            })
        } catch(err: any) {
            logger.error("Erreur lors de la création de l'utilisateur: ", err.message)
            throw new Error("L'utilisateur n'a pas pu être créer")
        }
    },

    update: (id: string, user: NewUser) => {
        try {
            return db.update(users).set(user).where(
                eq(users.id, id)
            )
        } catch(err: any) {
            logger.error("Erreur lors de la mise à jour de l'utilisateur: ", err.message)
            throw new Error("L'utilisateur n'a pas pu être mise à jour")
        }
    },

    delete: (id: string) => {
        try {
            return db.delete(users).where(
                eq(users.id, id)
            )
        } catch(err: any) {
            logger.error("Erreur lors de la suppression de l'utilisateur: ", err.message)
            throw new Error("L'utilisateur' n'a pas pu être supprimé")
        }
    }
}