const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event");
const Guest = require("../models/guest");
const CustomError = require("../utils/CustomError")

//fetch all event from db
router.get("/:userId", async (req, res) => {
  let { userId } = req.params;
  if (userId === 'undefined') {
    return res.json([]);
  }
  try {
    const currUser = await User.findById(userId);
    //searching for the events that created by user with the given userId
    const userEventList = await Event.find({ _id: { $in: currUser.createdEvents } }).populate('guests');
    res.json(userEventList);

  } catch (error) {
    res.json({ message: "Error encounter unable to fetch data" });
  }
})

//to confirm the presence of guest enable invited in guest db
router.post("/guest/confirmed", async (req, res) => {
  const { email: guestEmail, eventId } = req.body;

  const updateGuest = await Guest.findOneAndUpdate({ email: guestEmail }, { isInvited: true }, { new: true });

  res.json(updateGuest)
})


//to see unique events 
router.post("/unique/:eventId", async (req, res, next) => {
  const { eventId } = req.params;
  try {
    let event = await Event.findById(eventId).populate('guests');
    if (!event) {
      return next(new CustomError("You entered the wrong Event Id", 401));
    }
    res.json(event);
  } catch (err) {
    next(err);
  }
})

//create new event in db
router.post('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (userId === 'undefined') {
    return res.json({ error: { message: "You need to login into the account" } });
  }
  const { newEvent } = req.body

  try {

    let currUser = await User.findById(userId);
    if (!currUser) {

      return res.json({ message: "User not exist in the database" });
    }

    const insertedEvent = new Event(newEvent);
    const savedEvent = await insertedEvent.save();
    currUser.createdEvents.push(savedEvent._id);
    currUser = await currUser.save();
    console.log(savedEvent);
    res.json(savedEvent);
  } catch (err) {
    res.json(err);
    // res.json({ message: err.message });
  }
})




//modify the event , add vendors and guests or modify the dueDate
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oldEvent = await Event.findById(id)
    let { vendors } = req.body;
    const modifiedEvent = await Event.findByIdAndUpdate(id, { vendors: [...oldEvent.vendors, ...vendors] }, { new: true, runValidators: true }).populate('guests');
    res.json(modifiedEvent);
  } catch (err) {
    console.log(err);
    res.json({ message: "encounter an error during updation" });
  }
})

//to get the list of associated guests
router.get("/:id/guests", async (req, res) => {
  let { id } = req.params;
  try {
    const events = await Event.findById(id).populate('guests');;
    if (!events) {
      res.json({ message: "Event not created yet" });
    }
    return res.json(events);
  } catch (error) {
    res.json({ message: "Error encounter unable to fetch data" });
  }
})


//to delete the event
router.delete('/:eventId/user/:userId', async (req, res) => {
  try {
    const { eventId, userId } = req.params;
    let { createdEvents } = await User.findById(userId)
    const modifiedData = createdEvents.filter(el => JSON.parse(JSON.stringify(el)) !== eventId);
    const currUser = await User.findByIdAndUpdate(userId, { createdEvents: modifiedData }, { new: true });
    const response = await Event.findByIdAndDelete(eventId);
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ message: "Something went wrong!" });
  }
})


//to add the guest list
router.put('/:id/guests', async (req, res) => {
  try {
    const { id } = req.params;
    let { guests } = req.body;
    let allGuests = await Guest.insertMany(guests);
    let guestIdList = [];
    allGuests.forEach((guest) => guestIdList.push(guest.id));
    const oldEvent = await Event.findById(id);
    const modifiedEvent = await Event.findByIdAndUpdate(id, { guests: [...oldEvent.guests, ...guestIdList] }, { new: true, runValidators: true }).populate('guests');
    res.json(modifiedEvent);
  } catch (err) {
    console.log(err);
    res.json({ message: "Your guest not add to list something went wrong" }).status(404);
  }
})




module.exports = router;