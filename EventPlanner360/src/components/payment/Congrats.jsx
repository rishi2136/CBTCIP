import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Congrats = () => {
  const location = useLocation();
  const { guestEmail } = location.state;
  console.log(guestEmail);
  let [email, setEmail] = useState("");

  useEffect(() => {
    setEmail(guestEmail);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center flex-column congrats_page">
      <h1 className="fw-bolder text-center my-5" style={{ fontSize: "48px" }}>
        Your are confirmed for the event
      </h1>
      <div className="card col-md-8 col-10 thanks_card mx-auto p-5">
        <div className="card-body">
          <h4 className="text-center">Appreciates :</h4>
          <p className=" text-center fw-semibold card-text">
            We are delighted to receive your confirmation from
            <span className="text-info"> {email} </span>
            for the wedding event. Your presence will add joy and happiness to
            our celebration, and we look forward to sharing this special day
            with you
          </p>
        </div>
      </div>
    </div>
  );
};

export default Congrats;
