import React, { useState } from "react";
import "./UserBarOne.scss";
import { Card } from "primereact/card";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import UserBarOneDialog from "./UserBarOneDialog";
import UserBarDialog2 from "./UserBarDialog2";

const UserBarOne = () => {
  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState("");
  return (
    <>
      <div
        className="user-bar-1 flex-1 mx-2 p-3 flex flex-column justify-content-center gap-4"
        id="userbar-1"
      >
        <div className="user-profile-avatar flex flex-column align-items-center ">
          <Avatar
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          className="mb-2"
          size="xlarge"
          shape="circle"
        />

          {/* <Avatar label="B" className="mb-2" size="xlarge" shape="circle" /> */}

          <div className="flex flex-row align-items-center gap-3">
            <div>
              <h2 className="user-name m-0">Batrick Swaistan</h2>
              <span className="user-title mt-1">Junior Software Developer</span>
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
        <div className="user-bio-data">
          <Card className="shadow-2 user-bio-card">
            <div className="user-card flex flex-column gap-1">
            <div className="my-profile flex flex-row align-items-center justify-content-between">
              <h2 className="m-0">My Profile</h2>
              <span className="edit-icon cursor-pointer 1 flex flex-column justify-content-center align-items-center">
                <i className="pi pi-pencil "></i>
              </span>
            </div>
            <div className="age mt-3">
              <span className="font-bold">Age:</span> 24
            </div>
            <div className="user-location">
              <span className="font-bold">Location:</span> Kanyakumari
            </div>
            <div className="user-company">
              <span className="font-bold">Company:</span> Althi Solutions
            </div>
            <div className="user-follow mt-3 flex flex-column gap-1">
              <span className="font-bold my-2">Follow me on:</span>

              <div className="follow-linkedin">
                <span>
                  <i className="pi pi-linkedin"></i>
                </span>{" "}
                Batrick Swaistan
              </div>

              <div className="follow-github">
                <span>
                  {" "}
                  <i className="pi pi-github"></i>
                </span>{" "}
                Batrick Swaistan
              </div>

              <div className="follow-instagram">
                <span>
                  {" "}
                  <i className="pi pi-instagram"></i>
                </span>{" "}
                Batrick Swaistan
              </div>

              <div className="follow-twitter">
                <span>
                  {" "}
                  <i className="pi pi-twitter"></i>
                </span>{" "}
                Batrick Swaistan
              </div>
            </div>
          </div>

            {/* <div className="no-card-details">
              <div className="no-card-content flex flex-column align-items-center justify-content-center gap-3 ">
                <span className="no-card-subject text-center">
                  Please share your personal information including your age,
                  location, phone number, company, and social media links. This
                  helps us offer personalized content, localized services, and
                  stay connected with you across platforms.
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
            </div> */}
          </Card>
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
            {dialog === "your-profile" && <UserBarOneDialog />}
            {dialog === "your-info" && <UserBarDialog2 />}
          </>
        </Dialog>
      </div>
    </>
  );
};

export default UserBarOne;
