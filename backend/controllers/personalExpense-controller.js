const PersonalExpense = require("../models/personalExpense");
const User = require("../models/user");

const createPersonalExpense = async (req, res) => {
  try {
    const { expenseDescription, expenseAmount } = req.body;
    const personalExpense = new PersonalExpense({
      expenseDescription,
      expenseAmount,
    });

    await personalExpense.save();

    const { userId } = req.user;
    const user = await User.findById(userId);
    user.personalExpenses.push(personalExpense._id);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Personal expense created successfully",
      personalExpense,
    });
  } catch (error) {
    res.state(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPersonalExpense,
//   getAllPersonalExpenses,
//   getPersonalExpense,
//   updatePersonalExpense,
//   deletePersonalExpense,
};
