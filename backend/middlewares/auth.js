require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    req.user = verified;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = auth;
