const mongoose = require("mongoose");

const PersonalExpenseSchema = new mongoose.Schema(
  {
    expenseDescription: { type: String, required: true },
    expenseAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const PersonalExpense = mongoose.model(
  "PersonalExpense",
  PersonalExpenseSchema
);

module.exports = PersonalExpense;
