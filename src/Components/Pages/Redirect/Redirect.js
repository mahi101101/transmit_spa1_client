import React, { useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Authentication";
import Loader from "../../Loader/Loader";
const Redirect = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const urlParams = new URLSearchParams(window.location.search);
  const status = urlParams.get("status");
  const navigate = useNavigate();

  if (status != "200") {
    toast.error("Something went wrong", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/login");
  } else {
    const jsonData = urlParams.get("data");
    console.log(jsonData);
    localStorage.setItem("token", jsonData);
  }

  useEffect(() => {
    if (authenticated) {
      toast.success("User Logged in", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(gotoHome, 1000);
    }
  }, [authenticated]);

  const gotoHome = () => {
    navigate("/");
  };

  return (
    <React.Fragment>
      <div className="position-absolute top-50 start-50 translate-middle">
        <Loader />
      </div>
      <ToastContainer />;
    </React.Fragment>
  );
};

export default Redirect;
