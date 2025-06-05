"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLogout = exports.authRegister = exports.authLogin = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../utils/logger"));
const apiResponse_1 = require("../utils/apiResponse");
const models_1 = require("../models");
const env_1 = require("../config/env");
const validations_1 = require("../validations");
const zod_1 = require("zod");
const authLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = validations_1.authLoginValidation.parse(req.body);
        const user = yield models_1.userModel.findCredentials(email);
        if (!user)
            return (0, apiResponse_1.apiResponse)(res, null, "Identifiants Invalides", 400);
        const passwordVerif = yield argon2_1.default.verify(user.password, password);
        if (!passwordVerif)
            return (0, apiResponse_1.apiResponse)(res, null, "Identifiants Invalides", 400);
        const accessToken = jsonwebtoken_1.default.sign({ id: user.id }, env_1.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'strict',
            secure: env_1.env.NODE_ENV === "prod"
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Vous êtes connecté");
    }
    catch (err) {
        logger_1.default.error(`Erreur lors de la connexion de l'utilisateur: ${err.message}`);
        if (err instanceof zod_1.z.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.errors, "Formulaire Invalide", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur Serveur", 500);
    }
});
exports.authLogin = authLogin;
const authRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = validations_1.userCreationValidation.parse(req.body);
        const emailExist = yield models_1.userModel.findCredentials(email);
        if (emailExist)
            return (0, apiResponse_1.apiResponse)(res, null, "Email déjà utilisé", 400);
        const hashPass = yield argon2_1.default.hash(password);
        if (!hashPass)
            return (0, apiResponse_1.apiResponse)(res, null, "Problème lors du l'hashage", 500);
        const [newUser] = yield models_1.userModel.create({ username, email, password: hashPass });
        if (!newUser)
            return (0, apiResponse_1.apiResponse)(res, null, "Problème lors de la création du compte", 500);
        return (0, apiResponse_1.apiResponse)(res, null, "Le compte a bien été inscrit");
    }
    catch (err) {
        logger_1.default.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`);
        if (err instanceof zod_1.z.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.errors, "Formulaire Invalide", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur Serveur", 500);
    }
});
exports.authRegister = authRegister;
const authLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("accessToken");
        return (0, apiResponse_1.apiResponse)(res, null, "Déconnexion réussi");
    }
    catch (err) {
        logger_1.default.error(`Erreur lors de l'inscription de l'utilisateur: ${err.message}`);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur Serveur", 500);
    }
});
exports.authLogout = authLogout;
