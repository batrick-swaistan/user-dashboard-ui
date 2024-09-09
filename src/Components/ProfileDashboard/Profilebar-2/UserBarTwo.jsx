import React, { useEffect, useState } from "react";
import "./UserBarTwo.scss";
import { ProgressBar } from "primereact/progressbar";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import SkillsDialog from "./SkillsDialog";
import BioGoalDialog from "./BioGoalDialog";
import UserApi from "../../Api/UserApi";

const UserBarTwo = ({ data, setData }) => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const [bio, setBio] = useState("");
  const [goal, setGoal] = useState("");
  const [visible, setVisible] = useState(false);
  const [dialog, setDialog] = useState("");

  useEffect(() => {
    setBio(data?.bio);
    setGoal(data?.goal);
  }, [data]);

  // console.log(bio);

  const handleDialogClose = () => {
    setVisible(false);
  };

  const handleUpdateBio = () => {
    // console.log(bio);
    const payload = {
      userId: userId,
      bio: bio,
    };

    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    UserApi.updateUserBio(payload, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleUpdateGoal = () => {
    const payload = {
      userId: userId,
      goal: goal,
    };

    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    UserApi.updateUserGoal(payload, config)
      .then((res) => {
        console.log(res.data);
        setData((prevData) => ({ ...prevData, goal: res.data.userGoal }));
      })
      .catch((err) => {
        console.error(err.message);
      });
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
                <i className={`pi ${data?.bio ? "pi-pencil" : "pi-plus"}`}></i>
              </span>
            </div>

            {data?.bio ? (
              <>
                <span className="bio-content">{data?.bio}</span>
              </>
            ) : (
              <>
                <div className="no-bio-content">
                  <span>
                    Please provide a brief bio that includes key details about
                    your background, interests, and relevant experiences.
                    Mention your education, professional journey, skills,
                    hobbies, and any notable achievements or projects you're
                    proud of. This helps others understand your unique
                    perspective and what drives you.
                  </span>
                </div>
              </>
            )}
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
                <i
                  className={`pi ${data?.skills ? "pi-pencil" : "pi-plus"}`}
                ></i>
              </span>
            </div>

            {data?.skills ? (
              <>
                <div className="skills flex flex-column gap-2">
                  {data?.skills.map((skill, index) => (
                    <div
                      className="skill-details flex flex-column gap-2"
                      key={index}
                    >
                      <span>{skill.skill}</span>
                      <span>
                        {" "}
                        <ProgressBar value={skill.rating}></ProgressBar>
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <span className="skill-no-content">
                  Please provide a brief overview of your key skills. This will
                  help us understand your areas of expertise and how your
                  strengths align with our needs. By highlighting your skills,
                  we can better appreciate what you bring to the table and
                  explore how your capabilities fit with potential
                  opportunities.
                </span>
              </>
            )}
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
                <i className={`pi ${data?.goal ? "pi-pencil" : "pi-plus"}`}></i>
              </span>
            </div>

            {data?.goal ? (
              <>
                <div className="goal-content">{data?.goal}</div>
              </>
            ) : (
              <>
                <div className="no-goal-content flex flex-column gap-2 align-items-center justify-content-center">
                  <span>
                    Please share your goals briefly. This helps us understand
                    your aspirations and how we can support you in achieving
                    them.
                  </span>
                </div>
              </>
            )}
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
                handleDialogClose={handleDialogClose}
              />
            )}
            {dialog === "goal" && (
              <BioGoalDialog
                dialog={"goal"}
                data={goal}
                setData={setGoal}
                handleUpdateGoal={handleUpdateGoal}
                handleDialogClose={handleDialogClose}
              />
            )}
          </>
        </Dialog>
      </div>
    </>
  );
};

export default UserBarTwo;
