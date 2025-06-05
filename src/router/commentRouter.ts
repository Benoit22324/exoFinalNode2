import { Router } from "express";
import { isAuthenticated } from "../middlewares";
import { addComment, deleteComment, getCommentsByUser, updateComment } from "../controllers";

const commentRouter = Router();

commentRouter.get("/:userId", getCommentsByUser);
commentRouter.post("/:quizId", isAuthenticated, addComment);
commentRouter.put("/:id", isAuthenticated, updateComment);
commentRouter.delete("/:id", isAuthenticated, deleteComment);

export default commentRouter