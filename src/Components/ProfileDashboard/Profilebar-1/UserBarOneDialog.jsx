import React, { useRef, useState } from "react";
import QuillEditor from "../../Editor/QuillEditor";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";

const UserBarOneDialog = () => {
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [position, setPosition] = useState("");

  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const fileInputRef = useRef(null);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    // console.log(event.target.files[0].objectURL);
    const file = event.target.files[0];
    setProfilePic(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    // if (userDetails) {
    //   setUserDetails((prevData) => ({
    //     ...prevData,
    //     profile: null,
    //   }));
    //   setPreviewUrl(objectUrl);
    // }
  };

  const handleUpdateProfile = () => {
    console.log(updatedFirstName, updatedLastName, position);
  };
  return (
    <div className="info-content flex flex-column gap-5 h-full p-4">
      <div className="profile-photo flex flex-column gap-2">
        <div className="photo-content-label flex flex-column gap-2">
          <span className="profile-photo-label">Photo</span>
        </div>
        <div className="profile-photo-section flex flex-row  gap-3">
          <div className="profile-avatar">
            <span className="avatar">
              {/* {userDetails?.profile ? (
                <Avatar
                //   image={`${process.env.REACT_APP_IMAGE_URL}/${userDetails.profile}`}
                  size="xlarge"
                  shape="circle"
                />
              ) : previewUrl ? (
                <Avatar image={previewUrl} size="xlarge" shape="circle" />
              ) : (
                <Avatar
                  label={`${
                    userData?.name
                      ? userData?.name?.charAt(0)
                      : userData?.firstname?.charAt(0)
                  }`}
                  size="xlarge"
                  shape="circle"
                />
              )} */}
            </span>
          </div>
          <div className="profile-buttons-update flex flex-column justify-content-center gap-3">
            {" "}
            <div className="update-remove flex flex-row gap-2">
              <small
                className="cursor-pointer update"
                onClick={triggerFileInput}
              >
                Update
              </small>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <small
                className="cursor-pointer remove"
                onClick={() => {
                  setPreviewUrl(null);
                  setProfilePic(null);
                }}
              >
                Remove
              </small>
            </div>
            <div className="">
              <small>
                Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per
                side.
              </small>
            </div>
          </div>
        </div>
      </div>
      <div className="profile-user-details flex  flex-column gap-2 ">
        <div className="username-label ">
          <span>Name </span>
        </div>
        <div className="profile-userdetails-input flex flex-row gap-2">
          <div className="update-firstname flex-1 card flex w-full">
            <InputText
              value={updatedFirstName}
              onChange={(e) => setUpdatedFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full"
            />
          </div>
          <div className="update-lastname card flex w-full flex-1">
            <InputText
              value={updatedLastName}
              onChange={(e) => setUpdatedLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full"
            />
          </div>
        </div>
      </div>
      <div className="profile-user-bio flex  flex-column gap-2 ">
        <div className="user-bio-label ">
          <span>Position </span>
        </div>
        <div className="position-textarea  flex flex-column w-full gap-2">
          <div className="update-bio card flex w-full ">
            <InputText
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Your position"
              className="w-full"
            />{" "}
          </div>
          <div className="update-button card flex justify-content-end  ">
            <Button
              label="Update"
              className="profile-up-btn"
              onClick={handleUpdateProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBarOneDialog;
