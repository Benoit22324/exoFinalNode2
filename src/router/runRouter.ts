import { Router } from "express";
import { isAuthenticated } from "../middlewares";
import { addRun, deleteRun, getRun, updateRun } from "../controllers";

const runRouter = Router();

runRouter.get("/:id", getRun);
runRouter.post("/", isAuthenticated, addRun);
runRouter.put("/:id", isAuthenticated, updateRun);
runRouter.delete("/:id", isAuthenticated, deleteRun);

export default runRouter