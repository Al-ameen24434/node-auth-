const express = require("express");
const { registerUser, loginUser } = require("../controllers/auth-controller");
const router = express.Router();

// Sample route for user registration
router.post("/register", registerUser);

// Sample route for user login
router.post("/login", loginUser);

module.exports = router;
