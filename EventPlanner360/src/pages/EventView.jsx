import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import BudgetTracker from "../components/eventView/BudgetTracker";
import GuestsList from "../components/eventView/GuestsList";
import Vendors from "../components/eventView/Vendors";
import DueStatus from "../components/utils/DueStatus";
import SharePopUp from "../components/utils/SharePopUp";
import { eventActions } from "../store/eventSlice";

const EventView = () => {
  const [eachEvent, setEachEvent] = useState({
    _id: "",
    title: "",
    dueDate: "",
    location: "",
    budget: 0,
    price: "",
    description: "",
    eventType: "",
    vendors: [],
    guests: [],
    createdAt: [],
    __v: 0,
  });
  let dispatch = useDispatch();
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  let [addVendors, setAddVendors] = useState([]);
  let [exist, setExist] = useState(false);
  let [isShare, setIsShare] = useState(false);

  //fetch data with the given user id
  useEffect(() => {
    const fetchSingleEvent = async () => {
      let res = await axios.post(
        `https://event-planner-backend-l06l.onrender.com/events/unique/${eventId}`
      );
      setEachEvent(res.data);
    };
    fetchSingleEvent();
  }, [eachEvent]);

  const handleDashboradRedirect = () => {
    navigate("/dashboard");
  };

  //to update vendor list in the backend
  let handleAddList = async (Id) => {
    let res = await axios.put(
      `https://event-planner-backend-l06l.onrender.com/events/${Id}`,
      {
        vendors: addVendors,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const updatedEvent = res.data;
    dispatch(eventActions.addVendorsList({ updatedEvent }));
    setAddVendors([]);
  };

  let handleVendors = (newVendor) => {
    if (
      addVendors.indexOf(newVendor) !== -1 ||
      eachEvent.vendors.indexOf(newVendor) !== -1
    ) {
      setExist(true);
      return;
    }

    setAddVendors((list) => [...list, newVendor]);
  };

  return (
    <div>
      {/* popup when vendor already in the added list */}
      {exist && (
        <div
          className="alert alert-warning alert-dismissible fade show col-8 mx-auto"
          role="alert"
        >
          <strong>Vendor already in the list</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setExist(false)}
          ></button>
        </div>
      )}
      {/* persoanlize card data */}
      <div
        className="card col-10 col-md-8 my-3 mx-auto fw-bolder text-center rounded-2 p-4 event_card"
        key={eachEvent._id}
      >
        <h1 className="card-title bg-dark text-light rounded-top-2 py-2">
          {eachEvent.title}
          <DueStatus dueDate={eachEvent.dueDate} size={16} />
        </h1>
        <span className="badge text-bg-info m-1">
          Category: {eachEvent.eventType}
        </span>
        <span className="badge text-bg-info m-1">
          Event ID: {eachEvent._id}
        </span>
        <span className="badge text-bg-info m-1">
          Ticket Price: {eachEvent.price}
        </span>
        <span className="badge text-bg-info m-1">
          Confirm Guest:{" "}
          {eachEvent.guests.filter((guest) => guest.isInvited === true).length}
        </span>
        <h4 className="card-text">
          <span className="text-info">DueDate: </span>
          {eachEvent.dueDate}
        </h4>
        <h4 className="card-text">
          {" "}
          <span className="text-info">Location: </span>
          {eachEvent.location}
        </h4>
        <h4 className="card-text">
          {" "}
          <span className="text-info">Description: </span>
          {eachEvent.description}
        </h4>
        <ul className="d-flex flex-wrap ">
          {eachEvent.vendors.map((el, idx) => (
            <li key={idx} className="mx-2">
              <h3 className="badge text-bg-dark">{el}</h3>
            </li>
          ))}
          {addVendors.map((el, idx) => (
            <li key={idx} className="mx-2">
              <h3 className="badge text-bg-dark">{el}</h3>
            </li>
          ))}
        </ul>
        <div className="d-flex flex-wrap justify-content-evenly " id="card_btn">
          <button
            className="btn btn-outline-primary col-lg-5 col-10 m-1"
            onClick={() => handleAddList(eachEvent._id)}
          >
            Save Changes
          </button>
          <button
            className="btn btn-outline-dark  col-lg-5 col-10 m-1"
            onClick={handleDashboradRedirect}
          >
            Back to Home
          </button>

          <button
            className="btn btn-outline-primary col-lg-5 col-10 m-1"
            onClick={() => setIsShare(true)}
          >
            Share &nbsp;<i className="fa-solid fa-share"></i>
          </button>
        </div>
      </div>
      <hr />
      {/* Listed vendor option to added */}
      <Vendors handleClick={handleVendors} />

      <hr />
      {/* View and Added guests */}
      {eachEvent._id !== "" && <GuestsList myEvent={eachEvent} />}

      <hr />
      {/* calcuate the whole budget */}
      {eachEvent._id !== "" && <BudgetTracker myEvent={eachEvent} />}

      {isShare === true ? (
        <SharePopUp setIsShare={setIsShare} isShare={isShare}></SharePopUp>
      ) : (
        ""
      )}
    </div>
  );
};
export default EventView;
