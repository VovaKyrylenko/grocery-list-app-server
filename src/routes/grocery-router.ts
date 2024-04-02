import express from "express";
import {
  getUserGroceries,
  addGrocery,
  updateGrocery,
  deleteGrocery,
} from "src/controllers/";
import { JWTService } from "src/services";

export const groceryRouter = express.Router();

groceryRouter.use(JWTService.verifyToken);

groceryRouter.get("/user/:userId", getUserGroceries);
groceryRouter.post("/:userId", addGrocery);
groceryRouter.put("/:groceryId", updateGrocery);
groceryRouter.delete("/:groceryId", deleteGrocery);
