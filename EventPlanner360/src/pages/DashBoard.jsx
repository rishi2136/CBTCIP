import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EventCreationForm from "../components/dashboard/EventCreationForm";
import EventList from "../components/dashboard/EventList";
import Schedule from "../components/dashboard/Schedule";
import "../styles/App.css";
// import { eventActions } from "../store/eventSlice";
import axios from "axios";
import { eventActions } from "../store/eventSlice";

function DashBoard() {
  const dispatch = useDispatch();
  const eventList = useSelector((store) => store.events.data) || [];
  const [username, setUsername] = useState("");

  const fetchData = useCallback(async () => {
    let userId = localStorage.getItem("userId") || undefined;
    const res = await axios.get(`http://localhost:3001/events/` + userId);
    dispatch(eventActions.initEvents(res.data));
    if (localStorage.getItem("token") !== null) {
      const currUser = localStorage.getItem("name") || "";
      setUsername(currUser);
    }
  }, [eventList]);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <h1 className="text-center my-3 fw-bolder" style={{ fontSize: "36px" }}>
        Welcome to DashBoard &nbsp;
        <span className="text-warning">{username}</span>
      </h1>
      <EventCreationForm />
      <EventList eventList={eventList} />
      {eventList.length !== 0 && <Schedule eventList={eventList} />}
    </>
  );
}

export default DashBoard;
