import { Request, Response } from "express";
import logger from "../utils/logger";
import { apiResponse } from "../utils/apiResponse";
import { partModel } from "../models";
import { partCreationValidation, partUpdateValidation } from "../validations";
import { z } from "zod";

export const getQuizPart = async (req: Request, res: Response) => {
    try {
        const { id, index } = req.params;

        logger.info("Récupération du Part...");

        const part = await partModel.get(id, parseInt(index));
        if (!part) return apiResponse(res, null, "Part Introuvable", 404);

        return apiResponse(res, part, "Récupération avec succès");
    } catch (err: any) {
        logger.error("Erreur lors de la récupération du Part: " + err.message);
        return apiResponse(res, null, "Erreur lors de la récupération du Part", 500);
    }
}

export const addQuizPart = async (req: Request, res: Response) => {
    try {
        const { quizId } = req.params;
        const { question, answer, correctAnswer, index } = partCreationValidation.parse(req.body);

        logger.info("Création du Quiz Part...");

        await partModel.create({
            question,
            answer,
            correctAnswer,
            quizIndex: index,
            quizId
        });

        return apiResponse(res, null, "Création avec succès", 201);
    } catch (err: any) {
        logger.error("Erreur lors de la création du Part: " + err.message);

        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400)

        return apiResponse(res, null, "Erreur lors de la création du Part", 500);
    }
}

export const updateQuizPart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { question, answer, correctAnswer, index, quizId } = partUpdateValidation.parse(req.body);

        logger.info("Mise à jour du Quiz Part...");

        await partModel.update(id, {
            question,
            answer,
            correctAnswer,
            quizIndex: index,
            quizId: quizId
        });

        return apiResponse(res, null, "Mise à jour avec succès", 201);
    } catch (err: any) {
        logger.error("Erreur lors de la mise à jour du Part: " + err.message);

        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400)

        return apiResponse(res, null, "Erreur lors de la mise à jour du Part", 500);
    }
}

export const deleteQuizPart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        logger.info("Suppression du Quiz Part...");

        await partModel.delete(id);

        return apiResponse(res, null, "Suppression avec succès", 201);
    } catch (err: any) {
        logger.error("Erreur lors de la suppression du Part: " + err.message);

        return apiResponse(res, null, "Erreur lors de la suppression du Part", 500);
    }
}