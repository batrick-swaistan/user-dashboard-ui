import { Skeleton } from "primereact/skeleton";
import React from "react";

const RectangleSkeleton = () => {
  return (
    <div className="mt-6">
      <Skeleton width="100%" height="8rem"></Skeleton>
    </div>
  );
};

export default RectangleSkeleton;
