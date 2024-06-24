import React from "react";
import { logoOne } from "../../../assets";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  onOptionClick: (option: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onOptionClick }) => {
  const options = [
    "Profile",
    "Enrolled Courses",
    "Pending Subscriptions",
    "Rejected Subscriptions",
    "Cart",
    "Wishlist",
    "Reviewed Courses",
  ];

  return (
    <nav className="flex-shrink-0 w-64 bg-gray-800">
      <NavLink to="/">
      <img src={logoOne} alt="logo" className="mx-auto mt-5 w-[124px] h-[32px]" />
      </NavLink>
      <div className="h-full flex flex-col items-center mt-20">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onOptionClick(option)}
            className="px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 w-full"
          >
            {option}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
