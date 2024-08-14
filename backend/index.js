const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT;
const moment = require('moment');
const session = require('express-session');
const connectDB = require("./database");
const bodyParser = require('body-parser')
const authenticateRoutes = require("./controllers/user")
const paymentRoutes = require("./controllers/payment");
const eventRoutes = require("./controllers/event");



connectDB()
  .then(() => console.log("Connect to DB"))
  .catch(err => console.log(err));

const options = {
  secret: process.env.SESSION_SECRET,
  path: '/',
  httpOnly: true,
  secure: false,
  resave: false,
  saveUninitialized: false,
  maxAge: 1000 * 30
}

app.use(session(options));
app.use(cors()); //for the client the server data connectivity
app.use(express.urlencoded({ extended: true })); //allow parse of complex payload from the client side form 
app.use(bodyParser.json());


app.use("/", paymentRoutes)
app.use("/", authenticateRoutes)
app.use("/events", eventRoutes)

// error handling middleware
app.use((err, req, res, next) => {
  console.log(err.name);

  if (err.name === "ValidationError") {
    res.json({ error: { message: "Enter the valid eventId" } });
  } else if (err.name === "CastError") {
    res.json({ error: { message: "Wrong eventId you need to enter again!" } });
  }
  else {
    res.json({ error: { message: "Something want wrong, Try Again" } });
  }
  next()
})

app.listen(port, (req, res) => {
  console.log(`Server is listening at ${port}`)
})



