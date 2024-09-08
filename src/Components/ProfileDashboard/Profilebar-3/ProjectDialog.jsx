import React, { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const ProjectDialog = () => {
  const [project, setProject] = useState([
    {
      title: "",
      description: "",
    },
  ]);

  const handleProjectTitleChange = (index, value) => {
    const updatedProjects = [...project];
    updatedProjects[index].title = value;
    setProject(updatedProjects);
  };

  const handleProjectDescriptionChange = (index, value) => {
    const updatedProjects = [...project];
    updatedProjects[index].description = value;
    setProject(updatedProjects);
  };

  const handleUpdatePassword = () => {
    console.log(project);
  };
  return (
    <div className="project-dialog">
      <div className="project-content flex flex-column gap-3">
        {project?.map((project, index) => (
          <div>
            <div className="card flex flex-column gap-2 justify-content-center">
              <label htmlFor="title">Title</label>
              <InputText
                id="title"
                value={project.title}
                onChange={(e) =>
                  handleProjectTitleChange(index, e.target.value)
                }
              />
            </div>

            <div className="card flex flex-column gap-2  justify-content-center">
              <label htmlFor="description">Description</label>

              <InputTextarea
                id="description"
                value={project.description}
                onChange={(e) =>
                  handleProjectDescriptionChange(index, e.target.value)
                }
                rows={5}
                cols={30}
              />
            </div>
          </div>
        ))}
        <span className="text-right">
          <Button label="Update" onClick={handleUpdatePassword} />
        </span>
      </div>
    </div>
  );
};

export default ProjectDialog;
