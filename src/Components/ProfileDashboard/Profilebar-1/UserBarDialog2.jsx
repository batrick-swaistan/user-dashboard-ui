import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

const UserBarDialog2 = () => {
  const [userInfo, setUserInfo] = useState({
    age: "",
    location: "",
    company: "",
  });
  const [socialLink, setSocialLink] = useState({
    linkedin: "",
    github: "",
    instagram: "",
    twitter: "",
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
    console.log(userInfo, socialLink);
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
            onChange={handleUserInputChange}
          />
        </div>
        <div className="location p-inputgroup flex-1">
          <span className="p-inputgroup-addon">Location</span>
          <InputText
            placeholder="Enter your location"
            name="location"
            onChange={handleUserInputChange}
          />
        </div>
        <div className="company p-inputgroup flex-1">
          <span className="p-inputgroup-addon">Company</span>
          <InputText
            placeholder="Enter your company"
            name="company"
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
