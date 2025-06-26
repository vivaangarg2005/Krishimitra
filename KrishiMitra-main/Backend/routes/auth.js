const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
  const {
    fullName,
    dob,
    aadhar,
    username,
    password,
    phone,
    email,
    address,
    language,
    farmingSkill,
    otherSkill,
    kyf,
    landSize,
    annualIncome,
    interestedInSchemes
  } = req.body;

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      dob,
      aadhar,
      username,
      password: hashedPassword,
      phone,
      email,
      address,
      language,
      farmingSkill,
      otherSkill,
      kyf,
      landSize,
      annualIncome,
      interestedInSchemes
    });

    const savedUser = await newUser.save();
    res.status(201).json({ msg: "User registered successfully", id: savedUser._id });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter both username and password" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
