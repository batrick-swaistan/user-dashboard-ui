import React from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const BioGoalDialog = ({
  dialog,
  data,
  setData,
  handleUpdateBio,
  handleUpdateGoal,
}) => {
  return (
    <div>
      <div className="bio flex flex-column gap-3 ">
        <InputTextarea
          autoResize
          value={data}
          onChange={(e) => setData(e.target.value)}
          rows={5}
          cols={60}
          placeholder={`Enter your ${dialog === "goal" ? "goal" : "bio"}`}
        />
        <span className="text-right">
          <Button
            label="update"
            onClick={() => {
              dialog === "goal" ? handleUpdateGoal() : handleUpdateBio();
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default BioGoalDialog;
