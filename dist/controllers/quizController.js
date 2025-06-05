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
exports.deleteQuiz = exports.updateQuiz = exports.addQuiz = exports.getQuiz = exports.getAllQuizs = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const apiResponse_1 = require("../utils/apiResponse");
const models_1 = require("../models");
const zod_1 = require("zod");
const validations_1 = require("../validations");
const getAllQuizs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        logger_1.default.info("Récupération des Quizs...");
        const quizs = yield models_1.quizModel.getAll();
        return (0, apiResponse_1.apiResponse)(res, quizs, "Récupération avec succès");
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la récupération des Quizs: " + err.message);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la récupération des Quiz", 500);
    }
});
exports.getAllQuizs = getAllQuizs;
const getQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        logger_1.default.info("Récupération du Quiz...");
        const quiz = yield models_1.quizModel.get(id);
        if (!quiz)
            return (0, apiResponse_1.apiResponse)(res, null, "Quiz Introuvable", 404);
        return (0, apiResponse_1.apiResponse)(res, quiz, "Récupération avec succès");
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la récupération du Quiz: ", err.message);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la récupération du Quiz", 500);
    }
});
exports.getQuiz = getQuiz;
const addQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, difficulty } = validations_1.quizCreationValidation.parse(req.body);
        const { user } = res.locals;
        logger_1.default.info("Création du Quiz...");
        yield models_1.quizModel.create({
            title,
            difficulty,
            authorId: user.id
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Création du Quiz avec succès", 201);
    }
    catch (err) {
        logger_1.default.error("Erreur lors de l'ajout du Quiz: ", err.message);
        if (err instanceof zod_1.z.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.errors, "Formulaire Invalide", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de l'ajout du Quiz", 500);
    }
});
exports.addQuiz = addQuiz;
const updateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, difficulty } = validations_1.quizCreationValidation.parse(req.body);
        const { user } = res.locals;
        logger_1.default.info(`Mise à jour du Quiz ${id}...`);
        yield models_1.quizModel.update(id, user.id, {
            title,
            difficulty,
            authorId: user.id
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Mise à jour du Quiz avec succès", 201);
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la mise à jour du Quiz: ", err.message);
        if (err instanceof zod_1.z.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.errors, "Formulaire Invalide", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la mise à jour du Quiz", 500);
    }
});
exports.updateQuiz = updateQuiz;
const deleteQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { user } = res.locals;
        logger_1.default.info(`Suppression du Quiz ${id}...`);
        yield models_1.quizModel.delete(id, user.id);
        return (0, apiResponse_1.apiResponse)(res, null, "Suppression du Quiz avec succès", 201);
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la suppression du Quiz: ", err.message);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la suppression du Quiz", 500);
    }
});
exports.deleteQuiz = deleteQuiz;
