const mongoose = require("mongoose");

const dateSchema = new mongoose.Schema({
  dateString: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  totalHours: {
    type: Number,
    required: true,
    default: 24,
  },
});

dateSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "owner",
});

dateSchema.statics.findByDateString = async (dateString) => {
  const date = await Date.findOne({ dateString });

  if (!date) {
    throw new Error("User not exist");
  }

  return date;
};

const Date = mongoose.model("Date", dateSchema);

module.exports = Date;
