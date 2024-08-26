require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const {
  createGroup,
  updateGroup,
  deleteGroup,
  leaveGroup,
  addUserToGroup,
  removeUserFromGroup,
  addGroupExpense,
  deleteGroupExpense,
  updateGroupExpense,
  getAllGroupUsers,
  getAllGroupExpenses,
} = require("../controllers/group-controller");

router.use(auth);

router.post("/createGroup", createGroup);
router.put("/updateGroup/:id", updateGroup);
router.delete("/deleteGroup/:id", deleteGroup);
router.post("/leaveGroup/:id", leaveGroup);
router.post("/addUserToGroup", addUserToGroup);
router.post("/removeUserFromGroup", removeUserFromGroup);
router.post("/addGroupExpense", addGroupExpense);
router.delete("/deleteGroupExpense", deleteGroupExpense);
router.put("/updateGroupExpense", updateGroupExpense);
router.get("/getAllGroupUsers", getAllGroupUsers);
router.get("/getAllGroupExpenses", getAllGroupExpenses);

router.get("/get");

module.exports = router;
