const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    expenseLimit: {
      startDate: { type: Date, default: Date.now },
      endDate: { type: Date },
      limit: { type: Number },
      amountSpent: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
