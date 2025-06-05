"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNotAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const apiResponse_1 = require("../utils/apiResponse");
const isNotAuthenticated = (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) {
        next();
        return;
    }
    try {
        jsonwebtoken_1.default.verify(accessToken, env_1.env.JWT_SECRET);
        return (0, apiResponse_1.apiResponse)(res, null, "Vous êtes déjà connecté", 401);
    }
    catch (err) {
        next();
    }
};
exports.isNotAuthenticated = isNotAuthenticated;
