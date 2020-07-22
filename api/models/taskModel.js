const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    hours: {
      type: Number,
      required: true,
      trim: true,

      validate(value) {
        if (value < 1 || value > 24) {
          throw new Error("Hours must be 1-24");
        }
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Date",
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
