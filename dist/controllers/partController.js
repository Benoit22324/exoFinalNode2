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
exports.deleteQuizPart = exports.updateQuizPart = exports.addQuizPart = exports.getQuizPart = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const apiResponse_1 = require("../utils/apiResponse");
const models_1 = require("../models");
const validations_1 = require("../validations");
const zod_1 = require("zod");
const getQuizPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, index } = req.params;
        logger_1.default.info("Récupération du Part...");
        const part = yield models_1.partModel.get(id, parseInt(index));
        if (!part)
            return (0, apiResponse_1.apiResponse)(res, null, "Part Introuvable", 404);
        return (0, apiResponse_1.apiResponse)(res, part, "Récupération avec succès");
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la récupération du Part: " + err.message);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la récupération du Part", 500);
    }
});
exports.getQuizPart = getQuizPart;
const addQuizPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quizId } = req.params;
        const { question, answer, correctAnswer, index } = validations_1.partCreationValidation.parse(req.body);
        logger_1.default.info("Création du Quiz Part...");
        yield models_1.partModel.create({
            question,
            answer,
            correctAnswer,
            quizIndex: index,
            quizId
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Création avec succès", 201);
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la création du Part: " + err.message);
        if (err instanceof zod_1.z.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.errors, "Formulaire Invalide", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la création du Part", 500);
    }
});
exports.addQuizPart = addQuizPart;
const updateQuizPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { question, answer, correctAnswer, index, quizId } = validations_1.partUpdateValidation.parse(req.body);
        logger_1.default.info("Mise à jour du Quiz Part...");
        yield models_1.partModel.update(id, {
            question,
            answer,
            correctAnswer,
            quizIndex: index,
            quizId: quizId
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Mise à jour avec succès", 201);
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la mise à jour du Part: " + err.message);
        if (err instanceof zod_1.z.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.errors, "Formulaire Invalide", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la mise à jour du Part", 500);
    }
});
exports.updateQuizPart = updateQuizPart;
const deleteQuizPart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        logger_1.default.info("Suppression du Quiz Part...");
        yield models_1.partModel.delete(id);
        return (0, apiResponse_1.apiResponse)(res, null, "Suppression avec succès", 201);
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la suppression du Part: " + err.message);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la suppression du Part", 500);
    }
});
exports.deleteQuizPart = deleteQuizPart;
