import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  let handleClick = () => {
    if (!localStorage.getItem("token")) {
      alert("you need to login first");
      navigate("/event/user/login");
      return;
    }
    navigate("/event/dashboard");
  };
  return (
    <div className="hero">
      <button className="home_main_btn" onClick={handleClick}>
        Start Now
      </button>
    </div>
  );
};

export default Home;
