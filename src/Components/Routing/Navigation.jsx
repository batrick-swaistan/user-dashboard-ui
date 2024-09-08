import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "../Authentication/Signup/Signup";
import Login from "../Authentication/Login/Login";
import ProfileDashboard from "../ProfileDashboard/ProfileDashboard";

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Signup />} />
        <Route index element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/dashboard" element={<ProfileDashboard />}></Route>
      </Routes>
    </div>
  );
};

const Navigation = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

export default Navigation;
