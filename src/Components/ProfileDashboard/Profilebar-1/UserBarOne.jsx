import React, { useState } from "react";
import "./UserBarOne.scss";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import UserBarOneDialog from "./UserBarOneDialog";
import UserBarDialog2 from "./UserBarDialog2";
import ProfileSkeleton from "../../Skeleton/ProfileSkeleton";
import CardSkeleton from "../../Skeleton/CardSkeleton";

const UserBarOne = ({ data, setData, loading }) => {
  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState("");

  const handleCloseDialog = () => {
    setVisible(false);
  };
  return (
    <>
      <div
        className="user-bar-1 flex-1 mx-2 p-3 flex flex-column justify-content-center gap-4"
        id="userbar-1"
      >
        {loading ? (
          <>
            <ProfileSkeleton />
          </>
        ) : (
          <>
            <div className="user-profile-avatar flex flex-column align-items-center ">
              {data?.profile ? (
                <>
                  <Avatar
                    image={`${process.env.REACT_APP_SERVER_URL}/${data?.profile}`}
                    className="mb-2"
                    size="xlarge"
                    shape="circle"
                  />
                </>
              ) : (
                <>
                  <Avatar
                    label={`${data?.firstName?.charAt(0)}`}
                    className="mb-2"
                    size="xlarge"
                    shape="circle"
                  />
                </>
              )}

              {/* <Avatar label="B" className="mb-2" size="xlarge" shape="circle" /> */}

              <div className="flex flex-row align-items-center gap-3">
                <div className="flex flex-column align-items-center ">
                  <h2 className="user-name m-0">
                    {" "}
                    {data?.firstName} {data?.lastName}
                  </h2>
                  <span className="user-title mt-1">{data?.position}</span>
                </div>
                <span
                  className="edit cursor-pointer flex flex-column align-items-center justify-content-center"
                  onClick={() => {
                    setVisible(true);
                    setDialog("your-profile");
                  }}
                >
                  <i className="pi pi-pencil"></i>
                </span>
              </div>

              {/* <span className="user-breif mt-3 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          incidunt soluta autem nulla neque rerum? Modi quae
        </span> */}
            </div>
          </>
        )}

        <div className="user-bio-data">
          {loading ? (
            <>
              <CardSkeleton />
            </>
          ) : (
            <>
              <Card className="shadow-2 user-bio-card">
                {data?.userInfo && data?.social ? (
                  <>
                    <div className="user-card flex flex-column gap-1">
                      <div className="my-profile flex flex-row align-items-center justify-content-between">
                        <h2 className="m-0">My Profile</h2>
                        <span
                          className="edit-icon cursor-pointer 1 flex flex-column justify-content-center align-items-center"
                          onClick={() => {
                            setVisible(true);
                            setDialog("your-info");
                          }}
                        >
                          <i className="pi pi-pencil "></i>
                        </span>
                      </div>
                      <div className="age mt-3">
                        <span className="font-bold">Age:</span>{" "}
                        {data?.userInfo?.age}
                      </div>
                      <div className="user-location ">
                        <span className="font-bold">Location:</span>{" "}
                        {data?.userInfo?.location}
                      </div>
                      <div className="user-company">
                        <span className="font-bold">Company:</span>{" "}
                        {data?.userInfo?.company}
                      </div>
                      <div className="user-follow mt-3 flex flex-column gap-1">
                        <span className="font-bold my-2">Follow me on:</span>

                        <div className="follow-linkedin flex flex-row gap-3">
                          <span className="flex flex-column justify-content-center">
                            <i className="pi pi-linkedin"></i>
                          </span>{" "}
                          <a href={`${data?.social?.linkedin}`} target="_blank">
                            LinkedIn
                          </a>
                        </div>

                        <div className="follow-github flex flex-row gap-3">
                          <span className="flex flex-column justify-content-center">
                            {" "}
                            <i className="pi pi-github"></i>
                          </span>{" "}
                          <a href={`${data?.social?.github}`} target="_blank">
                            Github
                          </a>
                        </div>

                        <div className="follow-instagram flex flex-row gap-3">
                          <span className="flex flex-column justify-content-center">
                            {" "}
                            <i className="pi pi-instagram"></i>
                          </span>{" "}
                          <a
                            href={`${data?.social?.instagram}`}
                            target="_blank"
                          >
                            Instagram
                          </a>
                        </div>

                        <div className="follow-twitter flex flex-row gap-3">
                          <span className="flex flex-column justify-content-center">
                            {" "}
                            <i className="pi pi-twitter"></i>
                          </span>{" "}
                          <a href={`${data?.social?.twitter}`} target="_blank">
                            X
                          </a>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="no-card-details">
                      <div className="no-card-content flex flex-column align-items-center justify-content-center gap-3 ">
                        <span className="no-card-subject text-center">
                          Please share your personal information including your
                          age, location, phone number, company, and social media
                          links. This helps us offer personalized content,
                          localized services, and stay connected with you across
                          platforms.
                        </span>
                        <Button
                          label="Add Info"
                          icon="pi pi-plus"
                          iconPos="right"
                          onClick={() => {
                            setVisible(true);
                            setDialog("your-info");
                          }}
                        />
                      </div>
                    </div>
                  </>
                )}
              </Card>
            </>
          )}
        </div>
      </div>

      <div className="dialog">
        <Dialog
          header="My Profile"
          visible={visible}
          style={{ width: "35vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
            setDialog("");
          }}
          draggable={false}
        >
          <>
            {dialog === "your-profile" && (
              <UserBarOneDialog
                handleCloseDialog={handleCloseDialog}
                data={data}
                setData={setData}
              />
            )}
            {dialog === "your-info" && (
              <UserBarDialog2
                data={data}
                setData={setData}
                handleCloseDialog={handleCloseDialog}
              />
            )}
          </>
        </Dialog>
      </div>
    </>
  );
};

export default UserBarOne;
