const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    groupName: { type: String, required: true },
    groupMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    groupExpensesId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GroupExpense",
    },
    groupOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
