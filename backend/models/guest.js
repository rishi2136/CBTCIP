const mongoose = require("mongoose");
const { Schema } = mongoose;

const guestSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  isInvited: {
    type: Boolean,
    default: false
  }
})



const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;