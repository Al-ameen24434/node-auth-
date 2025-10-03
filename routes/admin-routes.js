const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {
  const { username, userId, role } = req.userInfo;

  res.json({
    message: "Welcome to the Admin Route!",
    user: {
      userId,
      username,
      role,
    },
  });
});

module.exports = router;
