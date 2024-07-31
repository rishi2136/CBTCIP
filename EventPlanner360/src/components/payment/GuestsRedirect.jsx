import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const GuestsRedirect = () => {
  const navigate = useNavigate();
  const [paymentInitial, setPaymentInitial] = useState({
    email: "",
    eventId: "",
  });

  const navigateLogic = (eventType) => {
    if (eventType === "wedding") {
      navigate("/confirm", {
        state: {
          email: paymentInitial.email,
          eventId: paymentInitial.eventId,
        },
      });
    } else {
      navigate(`/checkout`, {
        state: {
          email: paymentInitial.email,
          eventId: paymentInitial.eventId,
        },
      });
    }
  };

  let getEvent = useCallback(async (eventId) => {
    try {
      const res = await axios.post(
        `https://event-planner-backend-l06l.onrender.com/events/unique/` +
          eventId
      );
      const currEvent = res.data;
      if (currEvent._id) {
        navigateLogic(currEvent.eventType);
      } else {
        alert(res.data.error.message);
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message + ", Try again");
    }
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    getEvent(paymentInitial.eventId);
  };

  const handleChange = (evt) => {
    setPaymentInitial((oldData) => ({
      ...oldData,
      [evt.target.name]: evt.target.value,
    }));
  };

  return (
    <>
      <h1
        className="text-center fw-bolder my-3"
        style={{ fontSize: "48px", textDecoration: "underline" }}
      >
        Dear Guest
      </h1>
      <h1 className="text-center fw-bolder my-3">
        If You want to be the part of our event So kindly proceed to fill the
        fields listed below
      </h1>
      <form
        onSubmit={handleSubmit}
        className="col-10 col-sm-6 mx-auto my-5 bg-white "
      >
        <div className="mb-3">
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="Enter your email address"
            value={paymentInitial.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="eventId"
            id="eventId"
            className="form-control"
            value={paymentInitial.eventId}
            placeholder="Enter the Event Id"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Confirm
        </button>
      </form>
    </>
  );
};

export default GuestsRedirect;
