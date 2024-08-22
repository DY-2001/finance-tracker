require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/user", require("./routes/user-routes"));
app.use("/personalExpense", require("./routes/personalExpense-routes"));
app.use("/group", require("./routes/group-routes"));

module.exports = app;
