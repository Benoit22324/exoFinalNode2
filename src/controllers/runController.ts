import { Request, Response } from "express";
import logger from "../utils/logger";
import { apiResponse } from "../utils/apiResponse";
import { runModel } from "../models";
import { z } from "zod";
import { runCreationValidation } from "../validations";

export const getRun = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        logger.info("Récupération de la Run...");

        const run = await runModel.get(id);
        if (!run) return apiResponse(res, null, "Run Introuvables", 404);

        return apiResponse(res, run, "Récupération avec succès");
    } catch (err: any) {
        logger.error("Erreur lors de la récupération de la Run: " + err.message);

        return apiResponse(res, null, "Erreur lors de la récupération de la Run", 500);
    }
}

export const addRun = async (req: Request, res: Response) => {
    try {
        const { result, quizId } = runCreationValidation.parse(req.body);
        const { user } = res.locals;

        logger.info("Création de la Run...");

        await runModel.create({
            result,
            userId: user.id,
            quizId
        })

        return apiResponse(res, null, "Création de la Run avec succès", 201)
    } catch(err: any) {
        logger.error("Erreur lors de l'ajout de la Run: ", err.message);

        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400)

        return apiResponse(res, null, "Erreur lors de l'ajout de la Run", 500)
    }
}

export const updateRun = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { result, quizId } = runCreationValidation.parse(req.body);
        const { user } = res.locals;

        logger.info(`Mise à jour de la Run ${id}...`);

        await runModel.update(id, user.id, {
            result,
            userId: user.id,
            quizId
        })

        return apiResponse(res, null, "Mise à jour de la Run avec succès", 201)
    } catch(err: any) {
        logger.error("Erreur lors de la mise à jour de la Run: ", err.message);

        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400)

        return apiResponse(res, null, "Erreur lors de la mise à jour de la Run", 500)
    }
}

export const deleteRun = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        logger.info("Suppression de la Run...");

        await runModel.delete(id);

        return apiResponse(res, null, "Suppression avec succès", 201);
    } catch (err: any) {
        logger.error("Erreur lors de la suppression de la Run: " + err.message);

        return apiResponse(res, null, "Erreur lors de la suppression de la Run", 500);
    }
}