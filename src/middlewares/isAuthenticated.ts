import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { apiResponse } from "../utils/apiResponse";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = req.cookies;

    if (!accessToken) apiResponse(res, null, "Vous n'êtes pas connecté", 401)

    try {
        const verification = jwt.verify(accessToken, env.JWT_SECRET);
        res.locals.user = verification;
        next();
    } catch(err) {
        apiResponse(res, null, "Token Invalide", 401)
    }
}