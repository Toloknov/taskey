import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    googleId: { type: String },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    image: { type: String },
    password: { type: String },
    isActivated: { type: String, default: false },
    activationLink: { type: String },
    workInterval: { type: Number, default: 25 },
    breakInterval: { type: Number, default: 5 },
    intervalCount: { type: Number, default: 7 },
  },
  {
    timestamps: true,
  }
);

export default model("User", schema);
