import axios from "axios";
import { useEffect, useState } from "react";
import DueStatus from "../utils/DueStatus";

const InviteCard = ({ eventId }) => {
  const [currEvent, setCurrEvent] = useState({
    title: "",
    dueDate: "",
    location: "",
    budget: "",
    eventType: "",
    description: "",
    price: "",
    vendors: [],
    guests: [],
  });

  useEffect(() => {
    const fetchSingleEvent = async () => {
      try {
        let res = await axios.post(
          `http://localhost:3001/events/unique/${eventId}`
        );
        setCurrEvent(res.data);
      } catch (err) {
        console.log(err);
        return;
      }
    };
    fetchSingleEvent();
  }, [currEvent]);

  return (
    <div
      className="card col-10 col-md-8 my-3 mx-auto fw-bolder text-center rounded-2 p-4 event_card"
      key={currEvent._id}
    >
      <h1 className="card-title bg-dark text-light rounded-top-2 py-2">
        {currEvent.title}
        <DueStatus dueDate={currEvent.dueDate} size={16} />
      </h1>
      <h4 className="card-text">
        <span className="text-info">DueDate: </span>
        {currEvent.dueDate}
      </h4>
      <h4 className="card-text">
        <span className="text-info">Location: </span>
        {currEvent.location}
      </h4>
      <h6 className="card-text">
        <span className="text-info">Description: </span>
        {currEvent.description}
      </h6>
    </div>
  );
};

export default InviteCard;
