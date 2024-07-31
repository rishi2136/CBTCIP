import { useNavigate } from "react-router-dom";

const LogOutBtn = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    navigate("/event");
  };

  return (
    <button
      onClick={handleLogout}
      className="logout_btn nav-link text-decoration-none text-white"
    >
      Logout
    </button>
  );
};

export default LogOutBtn;
