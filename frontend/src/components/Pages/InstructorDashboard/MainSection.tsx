import React from "react";
// import { Switch, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Quizzes from "./Quizzes";
import Assignments from "./Assignments";
import Profile from "./Profile";
import CheckAssessments from "./CheckAssessments";

const MainSection: React.FC<{ selectedOption: string }> = ({
  selectedOption,
}) => {
  return (
    <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
      {selectedOption === "Dashboard" && <Dashboard />}
      {selectedOption === "Courses" && <Courses />}
      {selectedOption === "Quizzes" && <Quizzes />}
      {selectedOption === "Assignments" && <Assignments />}
      {selectedOption === "Profile" && <Profile />}
      {selectedOption === "Check Assessments" && <CheckAssessments />}
    </div>
  );
};

export default MainSection;
