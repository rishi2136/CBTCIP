const express = require("express");
const router = express.Router();
require("dotenv").config({ path: "../.env" })
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Event = require("../models/event");
const Guest = require("../models/guest");

const YOUR_DOMAIN = 'https://event-planner-frontend-6837.onrender.com';
// const YOUR_DOMAIN = 'http://localhost:3001/event';

router.post('/create-checkout-session', async (req, res) => {
  const { email: guestEmail, eventId } = req.body;

  const currEvent = await Event.findById(eventId);

  //make another route to set custom pricing
  const price = await stripe.prices.create({
    currency: 'inr',
    //unit_amount is in cent
    unit_amount: 100 * currEvent.price,
    product_data: {
      name: currEvent.title,
    },
  });

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      mode: 'payment',
      return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`
    })
    const updateGuest = await Guest.findOneAndUpdate({ email: guestEmail }, { isInvited: true }, { new: true });
    res.json({ clientSecret: session.client_secret });
  } catch (e) {
    console.log(e);
  }
})


router.get('/session-status', async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  console.log("Payment success");
  res.json({
    status: session.status,
    customer_email: session.customer_details.email
  });
})

module.exports = router;