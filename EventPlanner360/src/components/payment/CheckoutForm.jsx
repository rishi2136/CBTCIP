import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/Payment.css";
import InviteCard from "./InviteCard";

// loadStripe --> asyncLy load stripe script & init stripe object
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const location = useLocation();
  const guest = location.state;
  let [resObj, setResObj] = useState({});

  const fetchClientSecret = useCallback(async () => {
    let res = await axios.post(
      "http://localhost:3001/create-checkout-session",
      guest
    );
    setResObj(res.data);
  }, []);

  useEffect(() => {
    fetchClientSecret();
  }, []);

  let options = resObj;

  return (
    <div id="checkout" className="py-5 mx-auto">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <h1 className="text-center">
          <b>Pay with the Card</b>
        </h1>
        <InviteCard eventId={guest.eventId} />
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
