import React, { useState } from "react";
import "./UserBarThree.scss";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import ProjectDialog from "./ProjectDialog";

const UserBarThree = () => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="user-bar-3 flex-1 mx-2">
        <div className="user-project-section ">
          <div className="project-title flex flex-row align-items-center justify-content-between">
            <h1>Projects</h1>
            <span
              className="add-icon flex flex-column align-items-center justify-content-center cursor-pointer"
              onClick={() => {
                setVisible(true);
              }}
            >
              <i className="pi pi-plus"></i>
            </span>
          </div>
          {/* <div className="project-details">
          <div className="project-title flex flex-row align-items-center justify-content-between">
            <h2>Lumina</h2>

            <span className="edit-icon cursor-pointer 1 flex flex-column justify-content-center align-items-center">
              <i className="pi pi-pencil "></i>
            </span>
          </div>
          <span>
            Developed a personal blogging platform using the MERN stack
            (MongoDB, Express.js, React.js, Node.js). Enabled multi-user content
            creation and management in a collaborative environment. Implemented
            real-time updates and notifications with Socket.IO. Integrated
            Editor.js for advanced content editing and Redis for efficient
            caching. Enhanced UI/UX with PrimeReact and PrimeFlex for a
            responsive design.
          </span>
        </div>
        <div className="project-details">
          <div className="project-title flex flex-row align-items-center justify-content-between">
            <h2>Lumina</h2>

            <span className="edit-icon cursor-pointer 1 flex flex-column justify-content-center align-items-center">
              <i className="pi pi-pencil "></i>
            </span>
          </div>
          <span>
            Developed a personal blogging platform using the MERN stack
            (MongoDB, Express.js, React.js, Node.js). Enabled multi-user content
            creation and management in a collaborative environment. Implemented
            real-time updates and notifications with Socket.IO. Integrated
            Editor.js for advanced content editing and Redis for efficient
            caching. Enhanced UI/UX with PrimeReact and PrimeFlex for a
            responsive design.
          </span>
        </div> */}

          <span className="no-project-content">
            Please share details about up to 2 of your projects, including a
            brief description, the technologies used, and your role in each.
            Highlight any challenges you faced and how you overcame them. This
            information helps us appreciate your expertise and the value you've
            brought to your projects.
          </span>
        </div>
      </div>

      <div className="userbartwo-dialog">
        <Dialog
          header="Projects"
          visible={visible}
          style={{ width: "38vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
          draggable={false}
        >
          <>
            <ProjectDialog />
          </>
        </Dialog>
      </div>
    </>
  );
};

export default UserBarThree;
