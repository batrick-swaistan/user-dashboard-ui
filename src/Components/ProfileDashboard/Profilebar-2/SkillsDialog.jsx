import React, { useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Slider } from "primereact/slider";
import { Button } from "primereact/button";
import "./SkillsDialog.scss";
import UserApi from "../../Api/UserApi";

const SkillsDialog = () => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const [skills, setSkills] = useState([{ skill: "", rating: 0 }]);

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index].skill = value;
    setSkills(updatedSkills);
  };

  const handleRatingChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index].rating = value;
    setSkills(updatedSkills);
  };

  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const addSkill = () => {
    if (skills.length < 5) {
      setSkills([...skills, { skill: "", rating: 0 }]);
    }
  };

  const handleUpdateSkill = () => {
    const payload = {
      userId: userId,
      skills: skills,
    };

    const config = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };

    UserApi.updateUserSkills(payload, config)
      .then((res) => {
        console.log(res.data);
        // setData((prevData) => ({ ...prevData, goal: res.data.userGoal }));
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <div className="skills-dialog">
      <div className="dialog-content gap-2">
        {skills?.map((skill, index) => (
          <div className="skills-input flex flex-row align-items-center mt-3 gap-5">
            <div className="skills-text flex flex-column">
              <InputText
                id="skill"
                placeholder="Skill"
                value={skill.skill}
                onChange={(e) => handleSkillChange(index, e.target.value)}
              />
            </div>
            <div className="skills-silder flex flex-row align-items-center gap-5">
              <Slider
                value={skill.rating}
                onChange={(e) => handleRatingChange(index, e.value)}
                className="w-14rem"
              />
              <span>{skill.rating}</span>
            </div>

            {skills.length > 1 && (
              <Button
                rounded
                icon="pi pi-trash"
                onClick={() => {
                  removeSkill(index);
                }}
              />
            )}
          </div>
        ))}

        <div className="buttons-skill flex flex-row justify-content-between">
          {skills.length < 5 && (
            <Button
              icon="pi pi-plus"
              rounded
              onClick={addSkill}
              className="mt-3"
            />
          )}

          <Button
            label="Update"
            rounded
            onClick={handleUpdateSkill}
            className="mt-3"
          />
        </div>
      </div>
    </div>
  );
};

export default SkillsDialog;
