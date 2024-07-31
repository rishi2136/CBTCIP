// import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Outlet } from "react-router-dom";
import Footer from "../components/utils/Footer";
import Navber from "../components/utils/Navber";
// import { fetchData } from "../store/eventSlice";

function App() {
  return (
    <>
      <Navber />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
