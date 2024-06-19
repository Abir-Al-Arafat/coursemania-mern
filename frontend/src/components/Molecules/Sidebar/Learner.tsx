import React from "react";
import { logoOne } from "../../../assets";
import { Link, NavLink } from "react-router-dom";

interface SidebarProps {
  onOptionClick?: (option: string) => void;
}

const LearnerSidebar: React.FC<SidebarProps> = ({ onOptionClick }) => {
  const options = [
    {label: "Profile", url: "/learner/profile" },
    {label: "Enrolled Courses", url: "/learner/enrolled" },
    {label: "Pending Subscriptions", url: "/learner/pending" },
    {label: "Rejected Subscriptions", url: "/learner/rejected" },
    {label: "Cart", url: "/learner/cart" },
    {label: "Wishlist", url: "/learner/wishlist" },
    {label: "Reviewed Courses", url: "/learner/reviewed" },
  ];

  return (
    <nav className="flex-shrink-0 min-w-[250px] bg-gray-800 h-screen fixed z-10">
      <NavLink to="/">
        <img src={logoOne} alt="logo" className="mx-auto w-[124px] h-[32px]" />
      </NavLink>
      <div className="flex flex-col items-center pt-20">
        {options.map((option) => (
          <Link to={option.url}
            key={option.url}
            // onClick={() => onOptionClick(option)}
            className="px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 w-full text-center"
          >
            {option.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default LearnerSidebar;
