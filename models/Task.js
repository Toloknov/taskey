import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    task: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    priority: {
      type: Object,
      default: { background: "#1e1e1d", color: "#5d5d5b",value:"Select priority" },
    },
    dateCompletion: { type: String, required: true },
    todoTask: {
      type: String,
      enum: [
        "today",
        "tomorrow",
        "on this week",
        "on next week",
        "later",
        "completed",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Task", schema);
