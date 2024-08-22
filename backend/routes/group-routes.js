require("dotenv").config();
const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

router.use(auth);

module.exports = router;
