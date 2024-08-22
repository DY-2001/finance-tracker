const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    expenseDescription: { type: String, required: true },
    expenseAmount: { type: Number, required: true },
    expenseDistribution: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        amount: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
