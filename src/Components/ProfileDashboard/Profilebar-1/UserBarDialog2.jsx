import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState, useEffect } from "react";
import UserApi from "../../Api/UserApi";

const UserBarDialog2 = ({ data, setData, handleCloseDialog }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  console.log(data);

  const [userInfo, setUserInfo] = useState({
    age: data?.userInfo?.age || "",
    location: data?.userInfo?.location || "",
    company: data?.userInfo?.company || "",
  });

  const [socialLink, setSocialLink] = useState({
    linkedin: data?.social?.linkedin || "",
    github: data?.social?.github || "",
    instagram: data?.social?.instagram || "",
    twitter: data?.social?.twitter || "",
  });

  const handleSocialInputChange = (e) => {
    const { name, value } = e.target;

    setSocialLink({
      ...socialLink,
      [name]: value,
    });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const updateInfo = () => {
    const payload = {
      userId: userId,
      userInfo: userInfo,
      socialLinks: socialLink,
    };

    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    UserApi.updateUserInfo(payload, config)
      .then((res) => {
        console.log(res.data);
        handleCloseDialog();
        setData((prevData) => ({
          ...prevData,
          userInfo: res.data.userData.userInfo,
          social: res.data.userData.social,
        }));
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  return (
    <div className="my-info">
      <div className="info-details flex flex-column gap-2">
        <div className="age p-inputgroup flex-1">
          <span className="p-inputgroup-addon">Age</span>
          <InputText
            placeholder="Enter your age"
            name="age"
            type="number"
            max={2}
            value={userInfo.age}
            onChange={handleUserInputChange}
          />
        </div>
        <div className="location p-inputgroup flex-1">
          <span className="p-inputgroup-addon">Location</span>
          <InputText
            placeholder="Enter your location"
            name="location"
            value={userInfo.location}
            onChange={handleUserInputChange}
          />
        </div>
        <div className="company p-inputgroup flex-1">
          <span className="p-inputgroup-addon">Company</span>
          <InputText
            placeholder="Enter your company"
            name="company"
            value={userInfo.company}
            onChange={handleUserInputChange}
          />
        </div>
      </div>

      <div className="social-media flex flex-column gap-2">
        <div>
          <h2>Add Social Media Links:</h2>
        </div>
        <div className="linkedin p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-linkedin"></i>
          </span>
          <InputText
            placeholder="Enter your linkedIn url"
            name="linkedin"
            value={socialLink.linkedin}
            onChange={handleSocialInputChange}
          />
        </div>
        <div className="githu p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-github"></i>
          </span>
          <InputText
            placeholder="Enter your Github url"
            name="github"
            value={socialLink.github}
            onChange={handleSocialInputChange}
          />
        </div>
        <div className="instagram p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            {" "}
            <i className="pi pi-instagram"></i>
          </span>
          <InputText
            placeholder="Enter your Instagram url"
            name="instagram"
            value={socialLink.instagram}
            onChange={handleSocialInputChange}
          />
        </div>
        <div className="twitter p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            {" "}
            <i className="pi pi-twitter"></i>
          </span>
          <InputText
            placeholder="Enter your Twitter url"
            name="twitter"
            value={socialLink.twitter}
            onChange={handleSocialInputChange}
          />
        </div>
      </div>

      <div className="mt-3 flex flex-row justify-content-end">
        <Button label="Update" onClick={updateInfo} />
      </div>
    </div>
  );
};

export default UserBarDialog2;
