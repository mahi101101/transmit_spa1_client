import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Components/Pages/Home/Home";
import { Header } from "./Components/Layout/Header/Header";
import NotFound from "./Components/Pages/Not Found/NotFound";
import SignUp from "./Components/User/SignUp";
import Login from "./Components/User/Login";
import Profile from "./Components/User/Profile";
import { ToastContainer } from "react-toastify";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const token = localStorage.getItem("token");
alert(token)
  useEffect(() => {
    if (token !== null) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Header authenticated={authenticated} />
        <Routes>
          <Route path="/" element={<Home authenticated={authenticated}/>} />
          <Route path="/signup" element={<SignUp authenticated={authenticated}/>} />
          <Route path="/login" element={<Login authenticated={authenticated}/>} />
          <Route path="/user/profile" element={<Profile authenticated={authenticated}/>} />
          <Route path="/*" element={<NotFound authenticated={authenticated}/>} />
        </Routes>
      </Router>
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
