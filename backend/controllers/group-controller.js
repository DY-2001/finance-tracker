const Group = require("../models/group");

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
    const { groupName, groupId } = req.body;
    const group = await Group.findById(groupId);

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

module.exports = {
  createGroup,
  updateGroup,
  deleteGroup,
  addUserToGroup,
  removeUserFromGroup,
  addGroupExpense,
  deleteGroupExpense,
  updateGroupExpense,
  getAllGroupUsers,
  getAllGroupExpenses,
};
