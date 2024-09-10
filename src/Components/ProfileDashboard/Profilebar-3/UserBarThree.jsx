import React, { useState } from "react";
import "./UserBarThree.scss";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ProjectDialog from "./ProjectDialog";
import EditProjectDialog from "./EditProjectDialog";
import RectangleSkeleton from "../../Skeleton/RectangleSkeleton";

const UserBarThree = ({ data, setData, loading }) => {
  const [visible, setVisible] = useState(false);
  const [dialog, SetDialog] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  console.log(data?.projects?.length);

  const handleDialogClose = () => {
    setVisible(false);
    SetDialog("");
  };

  return (
    <>
      <div className="user-bar-3 flex-1 mx-2 ">
        {loading ? (
          <div className="mx-4">
            <RectangleSkeleton />
          </div>
        ) : (
          <>
            <div className="user-project-section ">
              <div className="project-title flex flex-row align-items-center justify-content-between">
                <h2>Projects</h2>

                {(data?.projects && data?.projects?.length < 2) ? (
                  <>
                    <span
                      className="add-icon flex flex-column align-items-center justify-content-center cursor-pointer"
                      onClick={() => {
                        setVisible(true);
                        SetDialog("add-project");
                      }}
                    >
                      <i className="pi pi-plus"></i>
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>

              {data?.projects?.length > 0 ? (
                <>
                  {data?.projects?.map((project, index) => (
                    <>
                      <div className="project-details">
                        <div className="project-title flex flex-row align-items-center justify-content-between">
                          <h3 >{project.title}</h3>

                          <span
                            className="edit-icon cursor-pointer 1 flex flex-column justify-content-center align-items-center"
                            onClick={() => {
                              setSelectedProject(project);
                              setVisible(true);
                              SetDialog("edit-project");
                            }}
                          >
                            <i className="pi pi-pencil "></i>
                          </span>
                        </div>
                        <span className="project-description">
                          {project.description}
                        </span>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                <>
                  <span className="no-project-content">
                    Please share details about up to 2 of your projects,
                    including a brief description, the technologies used, and
                    your role in each. Highlight any challenges you faced and
                    how you overcame them. This information helps us appreciate
                    your expertise and the value you've brought to your
                    projects.
                  </span>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="userbartwo-dialog">
        <Dialog
          header="Projects"
          visible={visible}
          style={{ width: "38vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
            SetDialog("");
          }}
          draggable={false}
        >
          <>
            {dialog === "add-project" && (
              <ProjectDialog
                data={data}
                setData={setData}
                handleDialogClose={handleDialogClose}
              />
            )}

            {dialog === "edit-project" && (
              <EditProjectDialog
                data={selectedProject}
                setData={setData}
                handleDialogClose={handleDialogClose}
              />
            )}
          </>
        </Dialog>
      </div>
    </>
  );
};

export default UserBarThree;
