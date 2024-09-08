import React from "react";
import "./ProfileDashboard.scss";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import UserBarOne from "./Profilebar-1/UserBarOne";
import UserBarTwo from "./Profilebar-2/UserBarTwo";
import UserBarThree from "./Profilebar-3/UserBarThree";

const ProfileDashboard = () => {
  return (
    <div className="user-profile-dashboard" id="dashboard">
      <div className="dashboard-main flex flex-column justify-content-center align-items-center">
        <div className="dashboard-content flex flex-column justify-content-center">
          <div className="dashboard-title">
            <h1 className="m-0 p-4">Welcome Batrick Swaistan</h1>
          </div>
          <div className="user-profile-details flex flex-row  justify-content-between">
            <UserBarOne />
            <UserBarTwo />
            <UserBarThree />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
