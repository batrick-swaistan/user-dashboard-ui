import React, { useState } from "react";
import UserApi from "../../Api/UserApi";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const EditProjectDialog = ({
  selectedProject,
  data,
  setData,
  handleDialogClose,
}) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");

  console.log(selectedProject);

  const [title, setTitle] = useState(selectedProject?.title || "");
  const [description, setDescription] = useState(
    selectedProject?.description || ""
  );

  const handleUpdateProject = () => {
    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    const payload = {
      userId: userId,
      projectId: selectedProject.projectId,
      title: title,
      description: description,
    };

    UserApi.updateUserProject(payload, config)
      .then((res) => {
        handleDialogClose();
        setData((prevData) => ({
          ...prevData,
          projects: [
            ...prevData.projects.filter(
              (proj) => proj.projectId !== res.data.projectData.projectId
            ),
            res.data.projectData,
          ],
        }));
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
            {characterLimit - description.length} Remaining
          </small>
        </div>

        <span className="text-right">
          <Button label="Update" onClick={handleUpdateProject} />
        </span>
      </div>
    </div>
  );
};

export default EditProjectDialog;
