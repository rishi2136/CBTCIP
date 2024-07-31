import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { eventActions } from "../../store/eventSlice";
import DueStatus from "../utils/DueStatus";

const EventItem = ({ eachEvent }) => {
  const navigate = useNavigate();

  let eventId = eachEvent._id;
  const dispatch = useDispatch();

  const handleManageClick = () => {
    navigate(`/view/${eventId}`);
  };

  const handleDeleteClick = async (eventId) => {
    const userId = localStorage.getItem("userId") || undefined;

    let res = await axios.delete(
      `https://event-planner-backend-l06l.onrender.com/events/${eventId}/user/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const deletedEvent = res.data;
    if (deletedEvent.message) {
      window.confirm("error", deletedEvent.message);
    }

    dispatch(eventActions.delEvent({ id: deletedEvent._id }));
  };

  const daysLeftOver = Math.ceil(
    (new Date(eachEvent.dueDate).getTime() - new Date(Date.now()).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const shortText =
    eachEvent.description && eachEvent.description.slice(0, 40) + "...";
  return (
    <div className="card col-10 col-sm-8 col-lg-5 m-3 fw-bolder text-center rounded-2 p-4 ">
      <p
        className="card-title rounded-2 py-2"
        style={{
          backgroundColor: daysLeftOver <= 0 ? "red" : "black",
          color: daysLeftOver <= 0 ? "black" : "white",
        }}
      >
        {eachEvent.title}
        <DueStatus dueDate={eachEvent.dueDate} />

        {daysLeftOver <= 0 && <span>&#x1F514;</span>}
      </p>
      <span className="badge text-bg-info  m-1">
        Category: {eachEvent.eventType}
      </span>
      <span className="badge text-bg-info  m-1">
        Ticket Price: {eachEvent.price}
      </span>
      <span className="badge text-bg-info m-1">
        Confirm Guest:{" "}
        {eachEvent.guests >= 0 &&
          eachEvent.guests.filter((guest) => guest.isInvited === true).length}
      </span>
      <p className="card-text">
        {" "}
        <span className="text-info">DueDate: </span>
        {eachEvent.dueDate}
      </p>
      <p className="card-text">
        {" "}
        <span className="text-info">Location: </span>
        {eachEvent.location}
      </p>

      <p className="card-text">
        <span className="text-info">Description: </span>
        {shortText}
      </p>

      <button
        onClick={handleManageClick}
        className="btn btn-outline-dark"
        type="button"
      >
        Manage
      </button>

      <button
        className="btn btn-outline-danger my-2"
        type="button"
        onClick={() => handleDeleteClick(eachEvent._id)}
      >
        Delete
      </button>
    </div>
  );
};

export default EventItem;
