const express = require("express");
const app = express();
const port = 3014;
const Event = require("../models/event");
const Guest = require("../models/guest");
const User = require("../models/user");
const mongoose = require('mongoose');
require("dotenv").config({ path: "../.env" });


const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_ATLAS_URI);
}

connectDB()
  .then(() => console.log("Connect to DB"))
  .catch(err => console.log(err));

app.get("/data", async (req, res) => {
  try {
    res.send("I am reset page");
  } catch (err) {
    res.send(err);
  }

})



app.get('/reset', async (req, res) => {
  try {
    const guests = await Guest.deleteMany({});
    const events = await Event.deleteMany({});
    const users = await User.deleteMany({});
    console.log("All guests", guests);
    console.log("All events", events);
    console.log("All users", users);
    res.sendFile(__dirname + "/reset.html");
  } catch (err) {
    res.send(err).status(404);
  }
})



app.listen(port, (req, res) => {
  console.log(`Server is listening at ${port}`)
})
