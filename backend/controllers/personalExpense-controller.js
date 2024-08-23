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

const getPersonalExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const personalExpense = await PersonalExpense.findById(id);

    if (!personalExpense) {
      return res
        .status(404)
        .json({ success: false, message: "Personal expense not found" });
    }

    res.status(200).json({ success: true, personalExpense });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePersonalExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { expenseDescription, expenseAmount } = req.body;

    const personalExpense = await PersonalExpense.findById(id);

    personalExpense.expenseDescription = expenseDescription;
    personalExpense.expenseAmount = expenseAmount;

    await personalExpense.save();

    res.status(200).json({
      success: true,
      message: "Personal expense updated successfully",
      personalExpense,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPersonalExpense,
  //   getAllPersonalExpenses,
  getPersonalExpense,
  updatePersonalExpense,
  // deletePersonalExpense,
};
