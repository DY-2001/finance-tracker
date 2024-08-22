require("dotenv").config();
const express = require("express"); 
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/user", require("./routes/user-routes"))

module.exports = app;