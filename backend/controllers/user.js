const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config({ path: "../.env" })
const User = require("../models/user");
const { Error } = require("mongoose");




//SignUp route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    //if user already exist in the DB
    if (existingUser) {
      return res.json({ message: 'User already exist, You need to login' });
    }
    //hashing the plain or simple password
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    //generate the token for begin the user signIn in the session
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.json({ userId: newUser._id, token, name: newUser.name });
  } catch (err) {
    console.log(err.name)
    res.status(500).json({ message: 'Something went wrong' });
  }
})


//SignIn route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    //If the user not signUp not in the DB
    if (!existingUser) {
      return res.json({ message: 'You need to signup first' });
    }

    //validate or compare the password string using bcrypt objects method 
    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    //if wrong credentials
    if (!isValidPassword) {
      console.log("I am form the credential department");
      return res.json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    res.json({ userId: existingUser._id, token, name: existingUser.name });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong' });
  }

})


// Logout route
router.post('/logout', (req, res) => {
  // Handle logout logic on the client-side by destroying the token
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;



