import { Request, Response } from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import logger from "../utils/logger";
import { apiResponse } from "../utils/apiResponse";
import { userModel } from "../models";
import { env } from "../config/env";
import { authLoginValidation, userCreationValidation } from "../validations";
import { z } from "zod";

export const authLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = authLoginValidation.parse(req.body);

        const user = await userModel.findCredentials(email);
        if (!user) return apiResponse(res, null, "Identifiants Invalides", 400);

        const passwordVerif = await argon2.verify(user.password, password);
        if(!passwordVerif) return apiResponse(res, null, "Identifiants Invalides", 400);

        const accessToken = jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: '1h' })

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: env.NODE_ENV === "prod"
        });
        return apiResponse(res, null, "Vous êtes connecté");
    } catch (err: any) {
        logger.error(`Erreur lors de la connexion de l'utilisateur: ${err.message}`);

        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur Serveur", 500);
    }
}

export const authRegister = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = userCreationValidation.parse(req.body);

        const emailExist = await userModel.findCredentials(email);
        if (emailExist) return apiResponse(res, null, "Email déjà utilisé", 400);

        const hashPass = await argon2.hash(password);
        if (!hashPass) return apiResponse(res, null, "Problème lors du l'hashage", 500);

        const [newUser] = await userModel.create({ username, email, password: hashPass });
        if (!newUser) return apiResponse(res, null, "Problème lors de la création du compte", 500);

        return apiResponse(res, null, "Le compte a bien été inscrit");
    } catch (err: any) {
        logger.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`);

        if (err instanceof z.ZodError) return apiResponse(res, err.errors, "Formulaire Invalide", 400);

        return apiResponse(res, null, "Erreur Serveur", 500);
    }
}

export const authLogout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("accessToken");

        return apiResponse(res, null, "Déconnexion réussi");
    } catch (err: any) {
        logger.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`);

        return apiResponse(res, null, "Erreur Serveur", 500);
    }
}