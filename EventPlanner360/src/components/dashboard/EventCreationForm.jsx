import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { eventActions } from "../../store/eventSlice";

const EventCreationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [newEvent, setNewEvent] = useState({
    title: "",
    dueDate: "",
    location: "",
    budget: "",
    eventType: "",
    price: "",
    vendors: [],
    guests: [],
  });

  let handleSumbit = async (evt) => {
    evt.preventDefault();
    let userId = localStorage.getItem("userId") || undefined;
    try {
      //send data to the server to save in the database
      let res = await axios.post(
        `https://event-planner-backend-l06l.onrender.com/events/` + userId,
        {
          newEvent,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let addedEvent = res.data;
      if (addedEvent.error) {
        alert(addedEvent.error.message);
        navigate("/event/user/login");
      }
      dispatch(eventActions.addEvent(addedEvent));
    } catch (err) {
      console.log(err);
      alert(err.message);
    }

    setNewEvent({
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
  };

  const handleChange = (evt) => {
    setNewEvent({ ...newEvent, [evt.target.name]: evt.target.value });
  };

  return (
    <>
      <form
        method="get"
        onSubmit={handleSumbit}
        id="event_creation_form"
        className="needs-validation"
      >
        <div className="card col-10 col-sm-8 mx-auto form_inner_container">
          <div className="card-header ">
            <h2 className="text-center">Create Your Event Now!</h2>
          </div>

          <div className="form-floating m-3">
            <input
              type="text"
              className="form-control"
              name="title"
              id="floatingInput"
              value={newEvent.title}
              onChange={handleChange}
              placeholder="event title"
              required
            />
            <label htmlFor="floatingInput">Event Title</label>
          </div>

          <div className="d-flex justify-content-around m-3 fw-semibold bg-dark text-white  py-3 rounded-1">
            <div className="form-check ">
              <input
                className="form-check-input"
                type="radio"
                name="eventType"
                id="inlineRadio1"
                onChange={handleChange}
                value="wedding"
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Wedding
              </label>
            </div>
            <div className="form-check ">
              <input
                className="form-check-input"
                type="radio"
                name="eventType"
                id="inlineRadio2"
                onChange={handleChange}
                value="professional"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Professional
              </label>
            </div>
            <div className="form-check ">
              <input
                className="form-check-input"
                type="radio"
                name="eventType"
                id="inlineRadio3"
                onChange={handleChange}
                value="party"
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Party
              </label>
            </div>
          </div>
          <div className="form-floating m-3">
            <input
              type="text"
              className="form-control"
              id="price"
              name="price"
              placeholder="event due date"
              value={newEvent.price}
              onChange={handleChange}
              required
            />
            <label htmlFor="price">Ticket Price</label>
          </div>
          <div className="form-floating m-3">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              style={{ height: "100px" }}
              name="description"
              value={newEvent.description}
              onChange={handleChange}
              minLength={10}
              maxLength={120}
            ></textarea>
            <label htmlFor="floatingTextarea">Event Details</label>
          </div>
          <div className="form-floating m-3">
            <input
              type="date"
              className="form-control"
              id="floatingInput"
              name="dueDate"
              placeholder="event due date"
              value={newEvent.dueDate}
              onChange={handleChange}
              required
            />
            <label htmlFor="floatingInput">Event DueDate</label>
          </div>
          <div className="form-floating m-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="location"
              value={newEvent.location}
              onChange={handleChange}
              placeholder="event location"
              required
            />
            <label htmlFor="floatingInput">Event Location</label>
          </div>
          <div className="form-floating m-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="budget"
              value={newEvent.budget}
              onChange={handleChange}
              placeholder="event allowed budget"
              required
            />
            <label htmlFor="floatingInput">Allowed Budget:</label>
          </div>
        </div>
        <button className="btn btn-dark fw-bolder  mx-auto d-block mt-3 col-8 col-md-5 py-3">
          Create New Event
        </button>
      </form>
    </>
  );
};

export default EventCreationForm;
