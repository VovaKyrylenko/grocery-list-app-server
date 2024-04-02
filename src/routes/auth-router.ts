import express from "express";
import { register, login } from "src/controllers/";

export const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
