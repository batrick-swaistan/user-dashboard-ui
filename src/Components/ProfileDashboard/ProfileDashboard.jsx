import React, { createContext, useEffect, useRef, useState } from "react";
import "./ProfileDashboard.scss";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import UserBarOne from "./Profilebar-1/UserBarOne";
import UserBarTwo from "./Profilebar-2/UserBarTwo";
import UserBarThree from "./Profilebar-3/UserBarThree";
import UserApi from "../Api/UserApi";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
import { Toast } from "primereact/toast";


const UserContext = createContext();


const ProfileDashboard = () => {
  const [userData, setUserData] = useState({});
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate("");
  const toast = useRef(null);

  const reject = () => {
    toast.current.show({
      severity: "info",
      summary: "Rejected",
      detail:
        "All good! Your data is secured and here to stay for a long time. ",
      life: 3000,
    });
  };

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
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }, [userId]);

  const handleDeleteUser = () => {
    confirmDialog({
      message: "Are you sure you want to delete?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept,
      reject,
    });
  };

  const accept = () => {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      params: {
        userId: userId,
      },
    };

    UserApi.deleteUser(config)
      .then((res) => {
        navigate("/");
        localStorage.clear();
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const logout = () => {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    UserApi.logout(userData.email, config)
      .then((res) => {
        localStorage.clear();
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="user-profile-dashboard" id="dashboard">
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="dashboard-main flex flex-column justify-content-center align-items-center">
        <div className="dashboard-content flex flex-column justify-content-center">
          <div className="dashboard-title flex flex-row justify-content-between align-items-center">
            {accessToken ? (
              <>
                <h1 className="m-0 p-4 title">
                  Welcome {userData?.firstName} {userData?.lastName}
                </h1>
                <div className="log-del">
                  <span
                    className="delete p-4 cursor-pointer"
                    onClick={() => {
                      handleDeleteUser();
                    }}
                  >
                    <span className="mr-2 select-none">Delete my data</span>
                    <i className="pi pi-trash"></i>
                  </span>
                  <span
                    className="logout p-4 cursor-pointer"
                    onClick={() => {
                      logout();
                    }}
                  >
                    <span className="mr-2 select-none">Logout</span>
                    <i className="pi pi-power-off"></i>
                  </span>
                </div>
              </>
            ) : (
              <>
                <Skeleton width="17rem" height="2rem" />
                <Skeleton width="17rem" height="2rem" />
              </>
            )}
          </div>
          <div className="user-profile-details flex flex-row  justify-content-between">
            <>
              <UserBarOne
                data={userData}
                setData={setUserData}
                loading={loading}
              />
              <UserBarTwo
                data={userData}
                setData={setUserData}
                loading={loading}
              />
              <UserBarThree
                data={userData}
                setData={setUserData}
                loading={loading}
              />
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;
