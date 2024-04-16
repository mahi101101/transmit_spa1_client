import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Components/Pages/Home/Home";
import { Header } from "./Components/Layout/Header/Header";
import NotFound from "./Components/Pages/Not Found/NotFound";
import SignUp from "./Components/User/SignUp";
import Login from "./Components/User/Login";
import Profile from "./Components/User/Profile";
import { ToastContainer } from "react-toastify";
import Logout from "./Components/User/Logout";
import ResetPassword from "./Components/User/ResetPassword";
import ForgotPassword from "./Components/User/ForgotPassword";
import Redirect from "./Components/Pages/Redirect/Redirect";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/redirect" element={<Redirect />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset" element={<ResetPassword />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
