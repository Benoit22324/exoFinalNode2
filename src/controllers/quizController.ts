import { Request, Response } from "express";
import logger from "../utils/logger";
import { apiResponse } from "../utils/apiResponse";
import { quizModel } from "../models";
import { z } from "zod";
import { quizCreationValidation } from "../validations";

export const getAllQuizs = async (req: Request, res: Response) => {
    try {
        logger.info("Récupération des Quizs...");

        const quizs = await quizModel.getAll();

        return apiResponse(res, quizs, "Récupération avec succès");
    } catch (err: any) {
        logger.error("Erreur lors de la récupération des Quizs: " + err.message);

        return apiResponse(res, null, "Erreur lors de la récupération des Quiz", 500);
    }
}

export const getQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        logger.info("Récupération du Quiz...");

        const quiz = await quizModel.get(id);
        if (!quiz) return apiResponse(res, null, "Quiz Introuvable", 404);

        return apiResponse(res, quiz, "Récupération avec succès");
    } catch(err: any) {
        logger.error("Erreur lors de la récupération du Quiz: ", err.message);

        return apiResponse(res, null, "Erreur lors de la récupération du Quiz", 500);
    }
}

export const addQuiz = async (req: Request, res: Response) => {
    try {
        const { title, difficulty } = quizCreationValidation.parse(req.body);
        const { user } = res.locals;

        logger.info("Création du Quiz...");

        await quizModel.create({
            title,
            difficulty,
            authorId: user.id
        })

        return apiResponse(res, null, "Création du Quiz avec succès", 201)
    } catch(err: any) {
        logger.error("Erreur lors de l'ajout du Quiz: ", err.message);

        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400)

        return apiResponse(res, null, "Erreur lors de l'ajout du Quiz", 500)
    }
}

export const updateQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, difficulty } = quizCreationValidation.parse(req.body);
        const { user } = res.locals;

        logger.info(`Mise à jour du Quiz ${id}...`);

        await quizModel.update(id, user.id, {
            title,
            difficulty,
            authorId: user.id
        })

        return apiResponse(res, null, "Mise à jour du Quiz avec succès", 201)
    } catch(err: any) {
        logger.error("Erreur lors de la mise à jour du Quiz: ", err.message);

        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400)

        return apiResponse(res, null, "Erreur lors de la mise à jour du Quiz", 500)
    }
}

export const deleteQuiz = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { user } = res.locals;

        logger.info(`Suppression du Quiz ${id}...`);

        await quizModel.delete(id, user.id);

        return apiResponse(res, null, "Suppression du Quiz avec succès", 201)
    } catch(err: any) {
        logger.error("Erreur lors de la suppression du Quiz: ", err.message);

        return apiResponse(res, null, "Erreur lors de la suppression du Quiz", 500)
    }
}