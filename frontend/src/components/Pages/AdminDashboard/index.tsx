// AdminDashboard.tsx

import React, { useState } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./SidebarOption";
import UserProfile from "./UserProfile";
import UserDashboard from "./UserDashboard";
import CourseSubscription from "./CourseSubscription/CourseSubscription";
import PublishCourses from "./PublishCourses/PublishCourses";
import Users from "./Users";
import CourseSubscriptionAccepted from "./CourseSubscription/CourseSubscriptionAccepted";
import CourseSubscriptionPending from "./CourseSubscription/CourseSubscriptionPending";
import CourseSubscriptionRejected from "./CourseSubscription/CourseSubscriptionRejected";

import PublishCoursesPending from "./PublishCourses/PublishCoursesPending";

import PublishCoursesAccepted from "./PublishCourses/PublishCoursesAccepted";

import PublishCoursesRejected from "./PublishCourses/PublishCoursesRejected";

import Learners from "./Users/Learners";
import Instructors from "./Users/Instructors";
import EditLearner from "./Users/EditLearner";

const AdminDashboard: React.FC = () => {
  const match = useMatch("/admin/dashboard/*");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const notifications = ["Notification 1", "Notification 2", "Notification 3"];

  //   const handleNotificationClick = () => {
  //     // Handle notification click logic here
  //     console.log("Notification clicked");
  //   };

  //   const handleAvatarClick = () => {
  //     // Handle avatar click logic here
  //     console.log("Avatar clicked");
  //   };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar navTitle={selectedOption} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {match && (
            <Routes>
              <Route index element={<UserDashboard />} />
              <Route path="user/profile" element={<UserProfile />} />
              <Route
                path="user/subscription/*"
                element={<CourseSubscription />}
              />
              <Route
                path="user/subscription/pending"
                element={<CourseSubscriptionPending />}
              />
              <Route
                path="user/subscription/accepted"
                element={<CourseSubscriptionAccepted />}
              />
              <Route
                path="user/subscription/rejected"
                element={<CourseSubscriptionRejected />}
              />

              <Route
                path="user/publish-courses/*"
                element={<PublishCourses />}
              />
              <Route
                path="user/publish-courses/pending"
                element={<PublishCoursesPending />}
              />
              <Route
                path="user/publish-courses/accepted"
                element={<PublishCoursesAccepted />}
              />
              <Route
                path="user/publish-courses/rejected"
                element={<PublishCoursesRejected />}
              />

              <Route path="user/users/*" element={<Users />} />

              <Route path="user/users/learners" element={<Learners />} />

              <Route
                path="user/users/learners/*"
                element={<EditLearner title="Learner" />}
              />

              <Route path="user/users/instructors" element={<Instructors />} />

              <Route
                path="user/users/instructors/*"
                element={<EditLearner title="Instructor" />}
              />
            </Routes>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
