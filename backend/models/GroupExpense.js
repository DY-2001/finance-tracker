const mongoose = require("mongoose");

const GroupExpenseSchema = new mongoose.Schema(
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
    amountPaidBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const GroupExpense = mongoose.model("GroupExpense", GroupExpenseSchema);

module.exports = GroupExpense;
