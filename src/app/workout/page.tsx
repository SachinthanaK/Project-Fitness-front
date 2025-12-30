"use client";
import React, { Suspense } from "react";
import WorkoutContent from "./WorkoutContent";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WorkoutContent />
    </Suspense>
  );
};

export default page;
