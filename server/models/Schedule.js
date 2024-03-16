import { Schema, model, syncIndexes } from "mongoose";

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    bg: {
      type: Object,
      default: { background: "#007BFF", color: "#fff",value:"Primary" },
    },
    text: { type: String },
    order: { type: Number, default: 1 },
    time: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model("Schedule", schema);
