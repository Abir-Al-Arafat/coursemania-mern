// Sidebar.tsx

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiUser, FiBarChart2, FiLayers, FiUsers } from "react-icons/fi";

interface SidebarOptionProps {
  icon: React.ReactNode;
  title: string;
  path: string;
}

const SidebarOption: React.FC<SidebarOptionProps> = ({ icon, title, path }) => {
  return (
    <Link to={path} className="flex items-center p-4 space-x-4 text-gray-300">
      <span>{icon}</span>
      <span>{title}</span>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [isSubscriptionOpen, setSubscriptionOpen] = useState(false);
  const [isPublishCoursesOpen, setPublishCoursesOpen] = useState(false);
  const [isUsersOpen, setUsersOpen] = useState(false);

  const toggleSubscription = () => setSubscriptionOpen(!isSubscriptionOpen);
  const togglePublishCourses = () =>
    setPublishCoursesOpen(!isPublishCoursesOpen);
  const toggleUsers = () => setUsersOpen(!isUsersOpen);

  return (
    <nav className="bg-gray-800 text-gray-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition-transform duration-300 ease-in-out z-50">
      <SidebarOption
        icon={<FiUser />}
        title="Profile"
        path="/admin/dashboard/user/profile"
      />
      <SidebarOption
        icon={<FiBarChart2 />}
        title="Dashboard"
        path="/admin/dashboard"
      />
      <div>
        <div
          onClick={toggleSubscription}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center">
            <span className="mr-2">{isSubscriptionOpen ? "👇" : "👉"}</span>
            <span>Subscription</span>
          </div>
        </div>
        {isSubscriptionOpen && (
          <div className="ml-6 space-y-2">
            <SidebarOption
              icon={<FiLayers />}
              title="Pending"
              path="/admin/dashboard/user/subscription/pending"
            />
            <SidebarOption
              icon={<FiLayers />}
              title="Accepted"
              path="/admin/dashboard/user/subscription/accepted"
            />
            <SidebarOption
              icon={<FiLayers />}
              title="Rejected"
              path="/admin/dashboard/user/subscription/rejected"
            />
          </div>
        )}
      </div>
      <div>
        <div
          onClick={togglePublishCourses}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center">
            <span className="mr-2">{isPublishCoursesOpen ? "👇" : "👉"}</span>
            <span>Publish Courses</span>
          </div>
        </div>
        {isPublishCoursesOpen && (
          <div className="ml-6 space-y-2">
            <SidebarOption
              icon={<FiLayers />}
              title="Pending"
              path="/admin/dashboard/user/publish-courses/pending"
            />
            <SidebarOption
              icon={<FiLayers />}
              title="Accepted"
              path="/admin/dashboard/user/publish-courses/accepted"
            />
            <SidebarOption
              icon={<FiLayers />}
              title="Rejected"
              path="/admin/dashboard/user/publish-courses/rejected"
            />
          </div>
        )}
      </div>
      <div>
        <div
          onClick={toggleUsers}
          className="flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center">
            <span className="mr-2">{isUsersOpen ? "👇" : "👉"}</span>
            <span>Users</span>
          </div>
        </div>
        {isUsersOpen && (
          <div className="ml-6 space-y-2">
            <SidebarOption
              icon={<FiUsers />}
              title="Learners"
              path="/admin/dashboard/user/users/learners"
            />
            <SidebarOption
              icon={<FiUsers />}
              title="Instructors"
              path="/admin/dashboard/user/users/instructors"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;
