import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { apiResponse } from "../utils/apiResponse";

export const isNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        next();
        return
    }

    try {
        jwt.verify(accessToken, env.JWT_SECRET);

        return apiResponse(res, null, "Vous êtes déjà connecté", 401)
    } catch(err) {
        next();
    }
}