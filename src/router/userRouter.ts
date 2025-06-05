import { Router } from "express";
import { isAuthenticated } from "../middlewares";
import { deleteUser, getUser, updateUser } from "../controllers";

const userRouter = Router();

userRouter.get("/", isAuthenticated, getUser);
userRouter.put("/", isAuthenticated, updateUser);
userRouter.delete("/:id", isAuthenticated, deleteUser);

export default userRouter