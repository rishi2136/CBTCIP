import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import InviteCard from "./InviteCard";

const Confirm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const guest = location.state;

  const handleClick = async () => {
    await axios.post(
      "https://event-planner-backend-l06l.onrender.com/events/guest/confirmed",
      guest
    );

    navigate("/congrats", { state: { guestEmail: guest.email } });
  };

  return (
    <center>
      <h1 className=" fw-bolder my-3" style={{ fontSize: "48px" }}>
        You need to confirm your presence in the wedding ceremony{" "}
      </h1>
      <InviteCard eventId={guest.eventId} />
      <button
        className="btn btn-success rounded-pill py-2 px-5 "
        onClick={handleClick}
        style={{ fontSize: "48px" }}
      >
        Confirm
      </button>
    </center>
  );
};

export default Confirm;
