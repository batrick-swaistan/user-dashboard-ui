import React from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";

const BioGoalDialog = ({
  dialog,
  data,
  setData,
  handleUpdateBio,
  handleUpdateGoal,
  handleDialogClose,
}) => {
  const characterLimit = 155;

  const handleChange = (e) => {
    if (characterLimit - e.target.value.length >= 0) {
      setData(e.target.value);
    }
  };

  return (
    <div>
      <div className="bio flex flex-column gap-3 ">
        <InputTextarea
          autoResize
          value={data}
          onChange={handleChange}
          rows={5}
          cols={60}
          placeholder={`Enter your ${dialog === "goal" ? "goal" : "bio"}`}
        />
        <small className="mt-2">
          {data?.length > 0 ? `${characterLimit - data?.length}` : 0}{" "}
          Remaining
        </small>
        <span className="text-right">
          <Button
            label="update"
            onClick={() => {
              dialog === "goal" ? handleUpdateGoal() : handleUpdateBio();
              handleDialogClose();
            }}
          />
        </span>
      </div>
    </div>
  );
};

export default BioGoalDialog;
