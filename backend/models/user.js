const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }]
})


const User = model('User', userSchema)

module.exports = User;