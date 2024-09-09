import React, { useEffect, useState } from "react";
import "./ProfileDashboard.scss";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { ProgressBar } from "primereact/progressbar";
import UserBarOne from "./Profilebar-1/UserBarOne";
import UserBarTwo from "./Profilebar-2/UserBarTwo";
import UserBarThree from "./Profilebar-3/UserBarThree";
import UserApi from "../Api/UserApi";

const ProfileDashboard = () => {
  const [userData, setUserData] = useState({});
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        userId: userId,
      },
    };

    UserApi.getUserData(config)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.userData);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [userId]);
  return (
    <div className="user-profile-dashboard" id="dashboard">
      <div className="dashboard-main flex flex-column justify-content-center align-items-center">
        <div className="dashboard-content flex flex-column justify-content-center">
          <div className="dashboard-title">
            <h1 className="m-0 p-4">
              Welcome {userData?.firstName} {userData?.lastName}
            </h1>
          </div>
          <div className="user-profile-details flex flex-row  justify-content-between">
            <UserBarOne data={userData} setData={setUserData} />
            <UserBarTwo data={userData} setData={setUserData} />
            <UserBarThree data={userData} setData={setUserData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
