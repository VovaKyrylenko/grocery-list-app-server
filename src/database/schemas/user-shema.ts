import { Schema } from "mongoose";

export const UserSchema: Schema = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
