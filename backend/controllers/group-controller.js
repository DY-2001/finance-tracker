const Group = require("../models/group");
const GroupExpense = require("../models/GroupExpense");
const PersonalExpense = require("../models/personalExpense");
const User = require("../models/user");

const createGroup = async (req, res) => {
  try {
    const { groupName } = req.body;
    const group = new Group({
      groupName,
      groupOwn: req.user.userId,
    });

    await group.save();

    res
      .status(201)
      .json({ success: true, message: "Group created successfully", group });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { groupName } = req.body;

    const group = await Group.findById(id);
    if (!group) {
      res.status(404).json({ success: false, message: "Group not exist!" });
      return;
    }
    if (group.groupOwner != user.userId) {
      res.status(401).json({ success: false, message: "Unauthorized Error" });
      return;
    }

    group.groupName = groupName;

    await group.save();

    res
      .status(200)
      .json({ success: true, message: "Group updated successfully!", group });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const group = Group.findOneAndDelete({
      _id: id,
      groupOwner: userId,
    });

    if (!group) {
      res.status(404).json({ success: false, message: "Group not exist!" });
      return;
    }

    await GroupExpense.deleteMany({ _id: { $in: group.groupExpensesId } });

    res
      .status(200)
      .json({ success: true, message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const leaveGroup = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const group = await Group.findByIdAndUpdate(
      id,
      { $pull: { groupMembers: userId } },
      { new: true }
    );

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Left group successfully", group });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addUserToGroup = async (req, res) => {
  try {
    const { userAddedId } = req.body;
    const { userId } = req.user;
    const { id } = req.params;

    const group = await Group.findById(id);

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found!" });
    }

    if (group.groupOwner.toString() !== userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access!" });
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { $push: { groupMembers: userAddedId } },
      { new: true }
    );

    if (!updatedGroup) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found!" });
    }

    res.status(200).json({
      success: true,
      message: "User added successfully!",
      group: updatedGroup,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeUserFromGroup = async (req, res) => {
  try {
    const { userRemovedId } = req.body;
    const { userId } = req.user;
    const { id } = req.params;

    const group = await findById(id);

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not exist!" });
    }

    if (group.groupOwner != userId) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access!" });
    }

    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { $pull: { groupMembers: userRemovedId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "User removed successfully!",
      group: updatedGroup,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addGroupExpense = async (req, res) => {
  try {
    const {
      expenseAmount,
      expenseDescription,
      expenseDistribution,
      amountPaidBy,
    } = req.body;
    const { userId } = req.user;

    const { id } = req.params;
    const group = await Group.findById(id);

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group does not exist!" });
    }

    const groupMembers = group.groupMembers;
    if (!groupMembers.includes(userId)) {
      return res
        .status(401)
        .json({ success: false, messsage: "Unauthorized Access!" });
    }

    const groupExpense = new GroupExpense({
      expenseDescription,
      expenseAmount,
      expenseDistribution,
      amountPaidBy,
    });
    await groupExpense.save();

    group.groupExpensesId.push(groupExpense._id);
    await group.save();

    const expensesToInsert = expenseDistribution.map(({ amount }) => ({
      expenseDescription,
      expenseAmount: amount,
    }));
    const insertedExpenses = await PersonalExpense.insertMany(expensesToInsert);

    const bulkUpdates = expenseDistribution.map(({ userId }, index) => ({
      updateOne: {
        filter: { _id: userId },
        update: { $push: { personalExpenses: insertedExpenses[index]._id } },
      },
    }));

    await User.bulkWrite(bulkUpdates);

    res.status(200).json({
      success: true,
      message: "Expense created successfully!",
      groupExpense,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteGroupExpense = async (req, res) => {
  const { id } = req.params;
  const { groupId } = req.body;
  const { userId } = req.user;

  const groupExpense = await GroupExpense.findById(id);

  if (!groupExpense) {
    return res
      .status(404)
      .json({ success: false, message: "Expense does not exist" });
  }

  if (groupExpense.amountPaidBy != userId) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Access!" });
  }

  await GroupExpense.deleteOne(id);

  const group = await Group.findByIdAndUpdate(
    groupId,
    { $pull: { groupExpensesId: id } },
    { new: true }
  );

  res
    .status(200)
    .json({ success: true, message: "Expense delete successfully!", group });
};

const getAllGroupUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id).populate("groupMembers");

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found!" });
    }

    res.status(200).json({ success: true, groupMembers: group.groupMembers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllGroupExpenses = async (req, res) => {
  try {
    const { id } = req.params;
    const group = await Group.findById(id).populate("groupExpensesId");

    if (!group) {
      return res
        .status(404)
        .json({ success: false, message: "Group not found!" });
    }

    res
      .status(200)
      .json({ success: true, groupExpenses: group.groupExpensesId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createGroup,
  updateGroup,
  deleteGroup,
  leaveGroup,
  addUserToGroup,
  removeUserFromGroup,
  addGroupExpense,
  deleteGroupExpense,
  // updateGroupExpense,
  getAllGroupUsers,
  getAllGroupExpenses,
};
