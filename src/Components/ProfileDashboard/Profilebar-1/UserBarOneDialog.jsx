import React, { useRef, useState } from "react";
import QuillEditor from "../../Editor/QuillEditor";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Avatar } from "primereact/avatar";
import UserApi from "../../Api/UserApi";

const UserBarOneDialog = ({ data, setData, handleCloseDialog }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const [updatedFirstName, setUpdatedFirstName] = useState(
    data?.firstName || ""
  );
  const [updatedLastName, setUpdatedLastName] = useState(data?.lastName || "");
  const [position, setPosition] = useState(data?.position || "");

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
    if (data) {
      setData((prevData) => ({
        ...prevData,
        profile: null,
      }));
      setPreviewUrl(objectUrl);
    }
  };

  const handleUpdateProfile = () => {
    console.log(updatedFirstName, updatedLastName, position);

    const formData = new FormData();

    formData.append("userId", userId);
    formData.append("firstName", updatedFirstName);
    formData.append("lastName", updatedLastName);
    formData.append("position", position);
    formData.append("image", profilePic);

    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    UserApi.updateUserProfile(formData, config)
      .then((res) => {
        handleCloseDialog();
        setData(res.data.userData);
      })
      .catch((err) => {
        console.error(err.message);
      });
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
              {data?.profile ? (
                <Avatar
                  image={`${process.env.REACT_APP_SERVER_URL}/${data?.profile}`}
                  size="xlarge"
                  shape="circle"
                />
              ) : previewUrl ? (
                <Avatar image={previewUrl} size="xlarge" shape="circle" />
              ) : (
                <Avatar
                  label={`${data?.firstName.charAt(0)}`}
                  size="xlarge"
                  shape="circle"
                />
              )}
            </span>
          </div>
          <div className="profile-buttons-update flex flex-column justify-content-center gap-3">
            {" "}
            <div className="update-remove flex flex-row gap-2">
              <small
                className="cursor-pointer update"
                onClick={triggerFileInput}
                style={{ color: "green" }}
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
                  setData((prevData) => ({
                    ...prevData,
                    profile: null,
                  }));
                }}
                style={{ color: "red" }}
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
