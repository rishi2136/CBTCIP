const mongoose = require("mongoose");
const { Schema } = mongoose;
const moment = require('moment');
const Guest = require("./guest");
const now = moment();

const eventSchema = new Schema({
  title: {
    type: String, required: true
  },
  dueDate: {
    type: String, required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  description: {
    type: String
  },
  eventType: {
    type: String,
    enum: ["wedding", "professional", "party"],
    required: true
  },
  budget: {
    type: Number,
    required: [true, "budget is missing or required"],  //for custom validation error message
    min: [25000, "Minimun allow budget is 25000"],
  },
  vendors: {
    type: Array,
  },
  guests: [{
    type: Schema.Types.ObjectId,
    ref: 'Guest'
  }],
  createdAt: {
    type: Array,
    default: [now.format('Do MMM YYYY'), now.format('h:mm:ss a')]// Store the current date as a Date object
  },
})

//delete all associted guest on deleting the event 
eventSchema.post('findOneAndDelete', async (event) => {
  if (event)
    await Guest.deleteMany({ _id: { $in: event.guests } })
})

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;