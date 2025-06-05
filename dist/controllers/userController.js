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
exports.deleteUser = exports.updateUser = exports.getUser = void 0;
const apiResponse_1 = require("../utils/apiResponse");
const logger_1 = __importDefault(require("../utils/logger"));
const models_1 = require("../models");
const zod_1 = require("zod");
const validations_1 = require("../validations");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = res.locals;
        logger_1.default.info("Récupération de l'utilisateur...");
        const userData = yield models_1.userModel.get(user.id);
        if (!userData)
            return (0, apiResponse_1.apiResponse)(res, null, "Utilisateur Introuvable", 404);
        return (0, apiResponse_1.apiResponse)(res, userData, "Récupération avec succès");
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la récupération de l'utilisateur: " + err.message);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la récupération de l'utilisateur", 500);
    }
});
exports.getUser = getUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = validations_1.userCreationValidation.parse(req.body);
        const { user } = res.locals;
        logger_1.default.info("Mise à jour de l'utilisateur...");
        yield models_1.userModel.update(user.id, {
            username,
            email,
            password
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Mise à jour avec succès");
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la mise à jour de l'utilisateur: " + err.message);
        if (err instanceof zod_1.z.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.errors, "Formulaire Invalide", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la mise à jour de l'utilisateur", 500);
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        logger_1.default.info("Suppession de l'utilisateur...");
        yield models_1.userModel.delete(id);
        return (0, apiResponse_1.apiResponse)(res, null, "Suppession avec succès");
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la suppression de l'utilisateur: " + err.message);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la suppression de l'utilisateur", 500);
    }
});
exports.deleteUser = deleteUser;
