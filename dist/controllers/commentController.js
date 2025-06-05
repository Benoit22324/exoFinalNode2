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
exports.deleteComment = exports.updateComment = exports.addComment = exports.getCommentsByUser = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const apiResponse_1 = require("../utils/apiResponse");
const models_1 = require("../models");
const zod_1 = require("zod");
const validations_1 = require("../validations");
const getCommentsByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        logger_1.default.info("Récupération des Commentaires...");
        const comments = yield models_1.commentModel.getAllByUser(userId);
        return (0, apiResponse_1.apiResponse)(res, comments, "Récupération avec succès");
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la récupération des Commentaires: " + err.message);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la récupération des Commentaires", 500);
    }
});
exports.getCommentsByUser = getCommentsByUser;
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { quizId } = req.params;
        const { content } = validations_1.commentCreationValidation.parse(req.body);
        const { user } = res.locals;
        logger_1.default.info("Création du Commentaire...");
        yield models_1.commentModel.create({
            content: content,
            authorId: user.id,
            quizId
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Création du Commentaire avec succès", 201);
    }
    catch (err) {
        logger_1.default.error("Erreur lors de l'ajout du Commentaire: ", err.message);
        if (err instanceof zod_1.z.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.errors, "Formulaire Invalide", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de l'ajout du Commentaire", 500);
    }
});
exports.addComment = addComment;
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { content } = validations_1.commentCreationValidation.parse(req.body);
        const { user } = res.locals;
        logger_1.default.info(`Mise à jour du Commentaire ${id}...`);
        yield models_1.commentModel.update(id, user.id, {
            content
        });
        return (0, apiResponse_1.apiResponse)(res, null, "Mise à jour du Commentaire avec succès", 201);
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la mise à jour du Commentaire: ", err.message);
        if (err instanceof zod_1.z.ZodError)
            return (0, apiResponse_1.apiResponse)(res, err.errors, "Formulaire Invalide", 400);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la mise à jour du Commentaire", 500);
    }
});
exports.updateComment = updateComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        logger_1.default.info("Suppression du Commentaire...");
        yield models_1.commentModel.delete(id);
        return (0, apiResponse_1.apiResponse)(res, null, "Suppression avec succès", 201);
    }
    catch (err) {
        logger_1.default.error("Erreur lors de la suppression du Commentaire: " + err.message);
        return (0, apiResponse_1.apiResponse)(res, null, "Erreur lors de la suppression du Commentaire", 500);
    }
});
exports.deleteComment = deleteComment;
