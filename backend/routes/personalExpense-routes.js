require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  createPersonalExpense,
  // getAllPersonalExpenses,
  // getPersonalExpense,
  // updatePersonalExpense,
  // deletePersonalExpense,
} = require("../controllers/personalExpense-controller");

router.use(auth);

router.post("/createPersonalExpense", createPersonalExpense);
// router.get("/getAllPersonalExpenses", getAllPersonalExpenses);
// router.get("/getPersonalExpense/:id", getPersonalExpense);
// router.put("/updatePersonalExpense/:id", updatePersonalExpense);
// router.delete("/deletePersonalExpense/:id", deletePersonalExpense);

module.exports = router;
