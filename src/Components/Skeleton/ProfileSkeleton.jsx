import { Skeleton } from "primereact/skeleton";
import React from "react";

const ProfileSkeleton = () => {
  return (
    <div>
      <div className="flex flex-column gap-2 align-items-center">
        <Skeleton width="8rem" height="8rem" borderRadius="50%"></Skeleton>
        <Skeleton width="12rem" height="2rem"></Skeleton>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
