import express from "express";
import cors from "cors";
import { env } from "./config/env";
import cookieParser from "cookie-parser";
import router from "./router";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(env.PORT, () => console.log("Serveur allumé !"));