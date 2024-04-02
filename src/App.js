import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { Home } from "./Components/Pages/Home/Home";
import { Header } from "./Components/Layout/Header/Header";
import NotFound from "./Components/Pages/Not Found/NotFound";
import SignUp from "./Components/User/SignUp";
import Login from "./Components/User/Login";
import Profile from "./Components/User/Profile";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
