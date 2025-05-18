const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/", async (req, res) => {
  res.send("I am an user");
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //check if user already exusts
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      token,
      user: { id: user._id, email: user.email, username: user.username },
      msg: "Logged in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});

//signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser)
      return res.status(400).json({ msg: "User already exist" });

    const user = new User({
      email,
      username,
      password,
    });
    await user.save();
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(201).json({
      token,
      user: { id: user._id, username: user.username },
      msg: "User created and logged in successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
