import mongoose from "mongoose";
import { UserSchema } from "../schemas";
import { IUser } from "src/types";

export const UserModel = mongoose.model<IUser>("User", UserSchema);
