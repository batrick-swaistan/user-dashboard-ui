import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import UserApi from "../../Api/UserApi";

const ProjectDialog = ({ data, setData, handleDialogClose }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpdateProject = () => {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const payload = {
      userId: userId,
      title: title,
      description: description,
    };

    UserApi.updateUserProject(payload, config)
      .then((res) => {
        setData((prevData) => ({
          ...prevData,
          projects: [...prevData.projects, res.data.projectData],
        }));
        handleDialogClose();
      })
      .catch((err) => {
        console.error(err.message);
      });

    console.log(payload);
  };

  const characterLimit = 255;

  const handleChange = (e) => {
    if (characterLimit - e.target.value.length >= 0) {
      setDescription(e.target.value);
    }
  };
  return (
    <div className="project-dialog">
      <div className="project-content flex flex-column gap-3">
        <div className="card flex flex-column gap-2 justify-content-center">
          <label htmlFor="title">Title</label>
          <InputText
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="card flex flex-column gap-2  justify-content-center">
          <label htmlFor="description">Description</label>

          <InputTextarea
            id="description"
            value={description}
            onChange={handleChange}
            rows={5}
            cols={30}
          />

          <small className="mt-2">
            {description?.length > 0
              ? `${characterLimit - description?.length}`
              : 255}{" "}
            Remaining
          </small>
        </div>

        <span className="text-right">
          <Button label="Update" onClick={handleUpdateProject} />
        </span>
      </div>
    </div>
  );
};

export default ProjectDialog;
