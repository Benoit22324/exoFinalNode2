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
exports.deleteRun = exports.updateRun = exports.addRun = exports.getRun = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const apiResponse_1 = require("../utils/apiResponse");
const models_1 = require("../models");
const zod_1 = require("zod");
const validations_1 = require("../validations");
const getRun = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        logger_1.default.info("Récupération de la Run...");
        const run = yield models_1.runModel.get(id);
        if (!run)
            return (0, apiResponse_1.apiResponse)(res, null, "Run Introuvables", 404);
        return (0, apiResponse_1.apiResponse)(res, run, "Récupération avec succès");
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la récupération de la Run: " + err.message);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la récupération de la Run", 500);
    }
});
exports.getRun = getRun;
const addRun = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { result, quizId } = validations_1.runCreationValidation.parse(req.body);
        const { user } = res.locals;
        logger_1.default.info("Création de la Run...");
        yield models_1.runModel.create({
            result,
            userId: user.id,
            quizId
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Création de la Run avec succès", 201);
    }
    catch (err) {
        logger_1.default.error("Erreur lors de l'ajout de la Run: ", err.message);
        if (err instanceof zod_1.z.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.errors, "Formulaire Invalide", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de l'ajout de la Run", 500);
    }
});
exports.addRun = addRun;
const updateRun = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { result, quizId } = validations_1.runCreationValidation.parse(req.body);
        const { user } = res.locals;
        logger_1.default.info(`Mise à jour de la Run ${id}...`);
        yield models_1.runModel.update(id, user.id, {
            result,
            userId: user.id,
            quizId
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Mise à jour de la Run avec succès", 201);
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la mise à jour de la Run: ", err.message);
        if (err instanceof zod_1.z.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.errors, "Formulaire Invalide", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la mise à jour de la Run", 500);
    }
});
exports.updateRun = updateRun;
const deleteRun = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        logger_1.default.info("Suppression de la Run...");
        yield models_1.runModel.delete(id);
        return (0, apiResponse_1.apiResponse)(res, null, "Suppression avec succès", 201);
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la suppression de la Run: " + err.message);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la suppression de la Run", 500);
    }
});
exports.deleteRun = deleteRun;
