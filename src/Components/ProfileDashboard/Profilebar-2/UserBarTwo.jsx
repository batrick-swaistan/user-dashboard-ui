import React, { useState } from "react";
import "./UserBarTwo.scss";
import { ProgressBar } from "primereact/progressbar";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import SkillsDialog from "./SkillsDialog";
import BioGoalDialog from "./BioGoalDialog";

const UserBarTwo = () => {
  const [bio, setBio] = useState("");
  const [goal, setGoal] = useState("");
  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState("");

  const handleUpdateBio = () => {
    console.log(bio);
  };

  const handleUpdateGoal = () => {
    console.log(goal);
  };

  return (
    <>
      <div className="user-bar-2 flex-1 mx-2">
        <div className="user-about">
          <div className="user-bio">
            <div className="my-bio flex flex-row align-items-center justify-content-between">
              <h1>Bio</h1>

              <span
                className="edit-icon cursor-pointer 1 flex flex-column justify-content-center align-items-center"
                onClick={() => {
                  setVisible(true);
                  setDialog("bio");
                }}
              >
                <i className="pi pi-pencil "></i>
              </span>
            </div>
            {/* <span className="bio-content">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequuntur fuga, repellat repudiandae commodi praesentium sapiente
            tempora quibusdam quae nam voluptates ratione molestiae eveniet,
            accusantium perferendis, blanditiis esse libero? Beatae, earum.
          </span> */}

            <div className="no-bio-content">
              <span>
                Please provide a brief bio that includes key details about your
                background, interests, and relevant experiences. Mention your
                education, professional journey, skills, hobbies, and any
                notable achievements or projects you're proud of. This helps
                others understand your unique perspective and what drives you.
              </span>
            </div>
          </div>
          <div className="user-skills">
            <div className="skill-title flex flex-row align-items-center justify-content-between">
              <h1>Skills</h1>
              <span
                className="edit-icon cursor-pointer 1 flex flex-column justify-content-center align-items-center"
                onClick={() => {
                  setVisible(true);
                  setDialog("skills");
                }}
              >
                <i className="pi pi-pencil "></i>
              </span>
            </div>
            <div className="skills flex flex-column gap-2">
              <div className="skill-details flex flex-column gap-2">
                <span>Coding</span>
                <span>
                  {" "}
                  <ProgressBar value={70}></ProgressBar>
                </span>
              </div>
              <div className="skill-details flex flex-column gap-2">
                <span>Problem Solving</span>
                <span>
                  {" "}
                  <ProgressBar value={50}></ProgressBar>
                </span>
              </div>
              <div className="skill-details flex flex-column gap-2">
                <span>Gcp</span>
                <span>
                  {" "}
                  <ProgressBar value={50}></ProgressBar>
                </span>
              </div>
              <div className="skill-details flex flex-column gap-2">
                <span>Javascript</span>
                <span>
                  {" "}
                  <ProgressBar value={50}></ProgressBar>
                </span>
              </div>
              <div className="skill-details flex flex-column gap-2">
                <span>SQL</span>
                <span>
                  {" "}
                  <ProgressBar value={50}></ProgressBar>
                </span>
              </div>
            </div>
            {/* <span className="skill-no-content">
              Please provide a brief overview of your key skills. This will help
              us understand your areas of expertise and how your strengths align
              with our needs. By highlighting your skills, we can better
              appreciate what you bring to the table and explore how your
              capabilities fit with potential opportunities.
            </span> */}
          </div>

          <div className="user-goals">
            <div className="goal-title flex flex-row align-items-center justify-content-between ">
              <h1>Goals</h1>
              <span
                className="edit-icon cursor-pointer 1 flex flex-column justify-content-center align-items-center"
                onClick={() => {
                  setVisible(true);
                  setDialog("goal");
                }}
              >
                <i className="pi pi-pencil "></i>
              </span>
            </div>
            {/* <div className="goal-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            molestias officiis ad. Pariatur dignissimos quis quibusdam
            perspiciatis consectetur a autem dicta, incidunt
          </div> */}

            <div className="no-goal-content flex flex-column gap-2 align-items-center justify-content-center">
              <span>
                Please share your goals briefly. This helps us understand your
                aspirations and how we can support you in achieving them.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="userbartwo-dialog">
        <Dialog
          header="My Info"
          visible={visible}
          style={{ width: "38vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
            setDialog("");
            setBio("");
            setGoal("");
          }}
          draggable={false}
        >
          <>
            {dialog === "skills" && <SkillsDialog />}

            {dialog === "bio" && (
              <BioGoalDialog
                data={bio}
                setData={setBio}
                handleUpdateBio={handleUpdateBio}
              />
            )}
            {dialog === "goal" && (
              <BioGoalDialog
                dialog={"goal"}
                data={goal}
                setData={setGoal}
                handleUpdateGoal={handleUpdateGoal}
              />
            )}
          </>
        </Dialog>
      </div>
    </>
  );
};

export default UserBarTwo;
