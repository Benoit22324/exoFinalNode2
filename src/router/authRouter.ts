import { Router } from "express";
import { authLogin, authLogout, authRegister } from "../controllers";
import { isAuthenticated, isNotAuthenticated } from "../middlewares";

const authRouter = Router();

authRouter.get("/logout", isAuthenticated, authLogout);
authRouter.post("/login", isNotAuthenticated, authLogin);
authRouter.post("/register", isNotAuthenticated, authRegister);

export default authRouter