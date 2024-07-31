import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./components/auth/LogIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import CheckoutForm from "./components/payment/CheckoutForm.jsx";
import PaymentSuccess from "./components/payment/PaymentSuccess.jsx";
import ErrorPage from "./components/utils/ErrorPage.jsx";
// import "./index.css";
import Confirm from "./components/payment/Confirm.jsx";
import Congrats from "./components/payment/Congrats.jsx";
import GuestsRedirect from "./components/payment/GuestsRedirect.jsx";
import App from "./pages/App.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import EventView from "./pages/EventView.jsx";
import Home from "./pages/Home.jsx";
import store from "./store/combinedSlice.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/view/:id",
        element: <EventView />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
    ],
  },
  {
    path: "/guest/redirect",
    element: <GuestsRedirect />,
  },
  {
    path: "/checkout",
    element: <CheckoutForm />,
  },
  {
    path: "/return",
    element: <PaymentSuccess />,
  },
  {
    path: "/congrats",
    element: <Congrats />,
  },
  {
    path: "/confirm",
    element: <Confirm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
