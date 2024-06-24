// Dashboard.tsx

import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Profile from "./Profile";
import EnrolledCourses from "./EnrolledCourses";
import PendingSubscriptions from "./PendingSubscriptions";
import RejectedSubscriptions from "./RejectedSubscriptions";
import Cart from "./Cart";
import Wishlist from "./WishList";
import ReviewedCourses from "./ReviewedCourses";

const Dashboard: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar onOptionClick={handleOptionClick} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar navTitle={selectedOption} />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          {/* Conditionally render the Profile component based on the selected option */}
          {selectedOption === "Profile" && <Profile />}
          {selectedOption === "Enrolled Courses" && <EnrolledCourses />}
          {selectedOption === "Pending Subscriptions" && (
            <PendingSubscriptions />
          )}
          {selectedOption === "Rejected Subscriptions" && (
            <RejectedSubscriptions />
          )}
          {selectedOption === "Cart" && <Cart />}
          {selectedOption === "Wishlist" && <Wishlist />}
          {selectedOption === "Reviewed Courses" && <ReviewedCourses />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
