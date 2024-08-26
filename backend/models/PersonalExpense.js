const mongoose = require("mongoose");

const PersonalExpenseSchema = new mongoose.Schema(
  {
    expenseDescription: { type: String, required: true },
    expenseAmount: { type: Number, required: true },
    groupExpenseDetails: {
      isGroupExpenseConnected: { type: Boolean, default: false },
      groupExpenseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "GroupExpense",
      },
    },
    userConnected: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const PersonalExpense = mongoose.model(
  "PersonalExpense",
  PersonalExpenseSchema
);

module.exports = PersonalExpense;
