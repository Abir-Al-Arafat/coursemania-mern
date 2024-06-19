import React, { useState } from "react";
import {
  FaUser,
  FaColumns,
  FaBook,
  FaClipboard,
} from "react-icons/fa";

import { logoOne } from "../../../assets";
import { Link, NavLink } from "react-router-dom";

  interface SidebarOptionProps {
    icon: React.ReactNode;
    label: string;
    // isSelected: boolean;
    // onClick: () => void;
    url: string;
  }
  
  const SidebarOption: React.FC<SidebarOptionProps> = ({
    icon,
    label,
    // isSelected,
    // onClick,
    url
  }) => {
    return (
      <Link
        to={url}
        className={`flex items-center p-3 cursor-pointer hover:bg-gray-700`}
        // onClick={onClick}
      >
        <div className="text-white mr-3">{icon}</div>
        <div className="text-white">{label}</div>
      </Link>
    );
  };
  

const InstructorSidebar: React.FC = () => {
    
  const [isAssessmentsOpen, setIsAssessmentsOpen] = useState<boolean>(false);

  const handleToggleAssessments = () => {
    setIsAssessmentsOpen((prev) => !prev);
  };
  const options = [
    { 
      label: "Profile", 
      url: "/instructor/profile",
      icon: <FaUser />
    },
    { 
      label: "Dashboard", 
      url: "/instructor/dashboard",
      icon: <FaColumns />
    },
    { 
      label: "Courses", 
      url: "/instructor/courses",
      icon: <FaBook />
    },
    { 
      label: "Quizzes", 
      url: "/instructor/quizzes",
      icon: <FaClipboard />
    },
    { 
      label: "Assignments", 
      url: "/instructor/cart",
      icon: <FaUser />
    },
  ];
//   const [isAssessmentsOpen, setIsAssessmentsOpen] = useState<boolean>(false);

//   const handleToggleAssessments = () => {
//     setIsAssessmentsOpen((prev) => !prev);
//   };

  return (
    <nav className="bg-gray-800 w-64 min-h-screen">
      <NavLink to="/">
        <img src={logoOne} alt="logo" className="mx-auto mt-5 w-[124px] h-[32px]" />
      </NavLink>
      <div className="p-4 text-white font-bold text-xl">
        Instructor Dashboard
      </div>
      <div>
        {options.map((element)=>{
          return (
            <SidebarOption
              icon={element.icon}
              label={element.label}
              url={element.url}
            />
          )
        })}
      </div>
    </nav>
  );
};
// const SidebarOption: React.FC<SidebarOptionProps> = ({
//   icon,
//   label,
//   isSelected,
//   onClick,
// }) => {
//   return (
//     <div
//       className={`flex items-center p-3 cursor-pointer hover:bg-gray-700 ${
//         isSelected ? "bg-gray-700" : ""
//       }`}
//       onClick={onClick}
//     >
//       <div className="text-white mr-3">{icon}</div>
//       <div className="text-white">{label}</div>
//     </div>
//   );
// };

export default InstructorSidebar;
