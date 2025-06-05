import { Router } from "express";
import quizRouter from "./quizRouter";
import partRouter from "./partRouter";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import commentRouter from "./commentRouter";
import runRouter from "./runRouter";

const router = Router();

router.use("/quiz", quizRouter);
router.use("/part", partRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/comment", commentRouter);
router.use("/run", runRouter);

export default router;