import React, { useState } from "react";
import {
  FaUser,
  FaColumns,
  FaBook,
  FaClipboard,
  FaTasks,
  FaCheckDouble,
} from "react-icons/fa";

import { logoOne } from "../../../assets";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  selectedOption: string;
  handleOptionClick: (option: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedOption,
  handleOptionClick,
}) => {
  const [isAssessmentsOpen, setIsAssessmentsOpen] = useState<boolean>(false);

  const handleToggleAssessments = () => {
    setIsAssessmentsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 w-64 min-h-screen">
      <NavLink to="/">
      <img src={logoOne} alt="logo" className="mx-auto mt-5 w-[124px] h-[32px]" />
      </NavLink>
      <div className="p-4 text-white font-bold text-xl">
        Instructor Dashboard
      </div>
      <div>
        <SidebarOption
          icon={<FaUser />}
          label="Profile"
          isSelected={selectedOption === "Profile"}
          onClick={() => handleOptionClick("Profile")}
        />
        <SidebarOption
          icon={<FaColumns />}
          label="Dashboard"
          isSelected={selectedOption === "Dashboard"}
          onClick={() => handleOptionClick("Dashboard")}
        />
        <SidebarOption
          icon={<FaBook />}
          label="Courses"
          isSelected={selectedOption === "Courses"}
          onClick={() => handleOptionClick("Courses")}
        />
        <SidebarOption
          icon={<FaClipboard />}
          label="Quizzes"
          isSelected={selectedOption === "Quizzes"}
          onClick={() => handleOptionClick("Quizzes")}
        />
        <SidebarOption
          icon={<FaTasks />}
          label="Assignments"
          isSelected={selectedOption === "Assignments"}
          onClick={() => handleOptionClick("Assignments")}
        />
        <div className="ml-4">
          <SidebarOption
            icon={<FaCheckDouble />}
            label="Check Assessments"
            isSelected={selectedOption === "Check Assessments"}
            onClick={() => {
              handleOptionClick("Check Assessments");
              handleToggleAssessments();
            }}
          />
          <div className={`pl-4 ${isAssessmentsOpen ? "block" : "hidden"}`}>
            <SidebarOption
              icon={<FaClipboard />}
              label="Check Quizzes"
              isSelected={selectedOption === "Check Quizzes"}
              onClick={() => handleOptionClick("Check Quizzes")}
            />
            <SidebarOption
              icon={<FaTasks />}
              label="Check Assignments"
              isSelected={selectedOption === "Check Assignments"}
              onClick={() => handleOptionClick("Check Assignments")}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

interface SidebarOptionProps {
  icon: React.ReactNode;
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const SidebarOption: React.FC<SidebarOptionProps> = ({
  icon,
  label,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`flex items-center p-3 cursor-pointer hover:bg-gray-700 ${
        isSelected ? "bg-gray-700" : ""
      }`}
      onClick={onClick}
    >
      <div className="text-white mr-3">{icon}</div>
      <div className="text-white">{label}</div>
    </div>
  );
};

export default Sidebar;
