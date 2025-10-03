const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    //extract user data from req.body
    const { username, email, password, role } = req.body;

    //check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newUser.save();
    if (newUser) {
      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User registration failed",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "some error has occured try again later",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    //extract user data from req.body
    const { username, password } = req.body;
    //check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    //generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    //send success response
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "some error try again later",
    });
  }
};

module.exports = { registerUser, loginUser };
