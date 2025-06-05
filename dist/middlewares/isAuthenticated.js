"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const apiResponse_1 = require("../utils/apiResponse");
const isAuthenticated = (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken)
        (0, apiResponse_1.apiResponse)(res, null, "Vous n'êtes pas connecté", 401);
    try {
        const verification = jsonwebtoken_1.default.verify(accessToken, env_1.env.JWT_SECRET);
        res.locals.user = verification;
        next();
    }
    catch (err) {
        (0, apiResponse_1.apiResponse)(res, null, "Token Invalide", 401);
    }
};
exports.isAuthenticated = isAuthenticated;
