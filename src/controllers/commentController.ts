import { Request, Response } from "express";
import logger from "../utils/logger";
import { apiResponse } from "../utils/apiResponse";
import { commentModel } from "../models";
import { z } from "zod";
import { commentCreationValidation } from "../validations";

export const getCommentsByUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        logger.info("Récupération des Commentaires...");

        const comments = await commentModel.getAllByUser(userId);

        return apiResponse(res, comments, "Récupération avec succès");
    } catch (err: any) {
        logger.error("Erreur lors de la récupération des Commentaires: " + err.message);

        return apiResponse(res, null, "Erreur lors de la récupération des Commentaires", 500);
    }
}

export const addComment = async (req: Request, res: Response) => {
    try {
        const { quizId } = req.params;
        const { content } = commentCreationValidation.parse(req.body);
        const { user } = res.locals;

        logger.info("Création du Commentaire...");

        await commentModel.create({
            content: content,
            authorId: user.id,
            quizId
        })

        return apiResponse(res, null, "Création du Commentaire avec succès", 201)
    } catch(err: any) {
        logger.error("Erreur lors de l'ajout du Commentaire: ", err.message);

        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400)

        return apiResponse(res, null, "Erreur lors de l'ajout du Commentaire", 500)
    }
}

export const updateComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = commentCreationValidation.parse(req.body);
        const { user } = res.locals;

        logger.info(`Mise à jour du Commentaire ${id}...`);

        await commentModel.update(id, user.id, {
            content
        })

        return apiResponse(res, null, "Mise à jour du Commentaire avec succès", 201)
    } catch(err: any) {
        logger.error("Erreur lors de la mise à jour du Commentaire: ", err.message);

        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400)

        return apiResponse(res, null, "Erreur lors de la mise à jour du Commentaire", 500)
    }
}

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        logger.info("Suppression du Commentaire...");

        await commentModel.delete(id);

        return apiResponse(res, null, "Suppression avec succès", 201);
    } catch (err: any) {
        logger.error("Erreur lors de la suppression du Commentaire: " + err.message);

        return apiResponse(res, null, "Erreur lors de la suppression du Commentaire", 500);
    }
}