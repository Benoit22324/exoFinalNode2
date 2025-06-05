import { Request, Response } from "express";
import { apiResponse } from "../utils/apiResponse";
import logger from "../utils/logger";
import { userModel } from "../models";
import { z } from "zod";
import { userCreationValidation } from "../validations";

export const getUser = async (req: Request, res: Response) => {
    try {
        const { user } = res.locals;

        logger.info("Récupération de l'utilisateur...");

        const userData = await userModel.get(user.id);
        if (!userData) return apiResponse(res, null, "Utilisateur Introuvable", 404);

        return apiResponse(res, userData, "Récupération avec succès");
    } catch (err: any) {
        logger.error("Erreur lors de la récupération de l'utilisateur: " + err.message);

        return apiResponse(res, null, "Erreur lors de la récupération de l'utilisateur", 500);
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = userCreationValidation.parse(req.body);
        const { user } = res.locals;

        logger.info("Mise à jour de l'utilisateur...");

        await userModel.update(user.id, {
            username,
            email,
            password
        });

        return apiResponse(res, null, "Mise à jour avec succès");
    } catch (err: any) {
        logger.error("Erreur lors de la mise à jour de l'utilisateur: " + err.message);

        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur lors de la mise à jour de l'utilisateur", 500);
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        logger.info("Suppession de l'utilisateur...");

        await userModel.delete(id);

        return apiResponse(res, null, "Suppession avec succès");
    } catch (err: any) {
        logger.error("Erreur lors de la suppression de l'utilisateur: " + err.message);

        return apiResponse(res, null, "Erreur lors de la suppression de l'utilisateur", 500);
    }
}