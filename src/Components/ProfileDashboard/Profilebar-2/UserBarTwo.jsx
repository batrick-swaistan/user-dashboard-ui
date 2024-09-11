import React, { useEffect, useState } from "react";
import "./UserBarTwo.scss";
import { ProgressBar } from "primereact/progressbar";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import SkillsDialog from "./SkillsDialog";
import BioGoalDialog from "./BioGoalDialog";
import UserApi from "../../Api/UserApi";
import RectangleSkeleton from "../../Skeleton/RectangleSkeleton";

const UserBarTwo = ({ data, setData, loading }) => {
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
        setData((prevData) => ({ ...prevData, bio: res.data.userBio }));
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
      <div className="user-bar-2 flex-1 mx-2 flex flex-column justify-content-center">
        <div className="user-about">
          {loading ? (
            <>
              <RectangleSkeleton />
            </>
          ) : (
            <>
              <div className="user-bio mb-3">
                <div className="my-bio flex flex-row align-items-center justify-content-between">
                  <h2 className="m-0">Bio</h2>

                  <span
                    className="edit-icon cursor-pointer 1 flex flex-column justify-content-center align-items-center"
                    onClick={() => {
                      setVisible(true);
                      setDialog("bio");
                    }}
                  >
                    <i
                      className={`pi ${data?.bio ? "pi-pencil" : "pi-plus"}`}
                    ></i>
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
                        Please provide a brief bio that includes key details
                        about your background, interests, and relevant
                        experiences. 
                      </span>
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {loading ? (
            <>
              <RectangleSkeleton />
            </>
          ) : (
            <>
              <div className="user-skills mb-3">
                <div className="skill-title flex flex-row align-items-center justify-content-between">
                  <h2 className="m-0">Skills</h2>
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
                      Please provide a brief overview of your key skills. This
                      will help us understand your areas of expertise and how
                      your strengths align with our needs.
                    </span>
                  </>
                )}
              </div>
            </>
          )}

          {loading ? (
            <>
              <RectangleSkeleton />
            </>
          ) : (
            <>
              {" "}
              <div className="user-goals">
                <div className="goal-title flex flex-row align-items-center justify-content-between ">
                  <h2 className="m-0">Goals</h2>
                  <span
                    className="edit-icon cursor-pointer 1 flex flex-column justify-content-center align-items-center"
                    onClick={() => {
                      setVisible(true);
                      setDialog("goal");
                    }}
                  >
                    <i
                      className={`pi ${data?.goal ? "pi-pencil" : "pi-plus"}`}
                    ></i>
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
                        Please share your goals briefly. This helps us
                        understand your aspirations and how we can support you
                        in achieving them.
                      </span>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="userbartwo-dialog">
        <Dialog
          header="My Info"
          visible={visible}
          style={{ width: "45vw" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
            setDialog("");
            setBio("");
            setGoal("");
          }}
          draggable={false}
          className="dialog-bar-two"
        >
          <>
            {dialog === "skills" && (
              <SkillsDialog
                data={data}
                setData={setData}
                handleDialogClose={handleDialogClose}
              />
            )}

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
