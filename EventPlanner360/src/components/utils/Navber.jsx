import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/webapp_logo.png";
import LogOutBtn from "../auth/LogOutBtn";

const Navber = () => {
  const [isLogIn, setIsLogIn] = useState(
    localStorage.getItem("token") !== null ? true : false
  );
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  let token = localStorage.getItem("token");

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const currUser = localStorage.getItem("name") || "";
      setUsername(currUser);
      setIsLogIn(true);
    } else {
      setIsLogIn(false);
    }
  }, [token]);

  return (
    <ul className="nav justify-content-evenly align-items-center sticky-top  py-3 my_nav">
      <Link to="/">
        <img src={logo} alt="company_logo" style={{ width: "100px" }} />
      </Link>

      {!isLogIn && (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              SignUp
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </>
      )}

      {isLogIn && (
        <>
          <li className="nav-item">
            <Link className="nav-link" to={"/dashboard"}>
              Dashboard
            </Link>
          </li>
          <li className="nav-item ">
            <LogOutBtn />
          </li>
          <li className="nav-item">
            <i className="fa-regular fa-user text-white my-3 mx-2"></i>
            <span className="text-white fw-bolder" style={{ fontSize: "12px" }}>
              {username.toUpperCase()}
            </span>
          </li>
        </>
      )}

      <li className="nav-item">
        <Link className="nav-link" to="/guest/redirect">
          Buy Ticket
        </Link>
      </li>
    </ul>
  );
};

export default Navber;
