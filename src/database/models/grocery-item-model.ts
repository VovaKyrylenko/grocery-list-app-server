import mongoose from "mongoose";
import { GroceryItemSchema } from "../schemas";
import { IGroceryItem } from "src/types";

export const GroceryItemModel = mongoose.model<IGroceryItem>(
  "Grocery",
  GroceryItemSchema
);
