import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "../../styles/Payment.css";

const PaymentSuccess = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    //get the query string part of url
    const queryString = window.location.search;
    //create an obj to work with query a parameter
    const urlParams = new URLSearchParams(queryString);
    //retrive the value of the session_id from the query parameter
    const sessionId = urlParams.get("session_id");

    fetch(`http://localhost:3001/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <div className="paid_page">
        <h1
          className=" my-5 fw-bolder text-center"
          style={{ fontSize: "56px" }}
        >
          Thank for connecting with us
        </h1>
        <section id="success">
          <div className="card col-md-8 col-10 thanks_card mx-auto p-5">
            <div className="card-body">
              <p className="card-text fw-semibold">
                We appreciate your presence over here! A confirmation email will
                be sent to &nbsp;
                {customerEmail}. If you have any questions, please email &nbsp;
                <a href="mailto:random@example.com">random@example.com</a>.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return null;
};

export default PaymentSuccess;
