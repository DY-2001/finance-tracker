const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    groupName: { type: String, required: true },
    groupExpensesId: { type: mongoose.Schema.Types.ObjectId, ref: "Expense" },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
