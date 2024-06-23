import React, { useState, useEffect } from "react";

import {
  FaUser,
  FaBell,
  FaClipboard,
  FaBook,
  FaEdit,
  FaList,
} from "react-icons/fa";
import MainSection from "./MainSection";
import Sidebar from "./Sidebar";

const InstructorDashboard: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("Profile");
  const [isOptionsVisible, setIsOptionsVisible] = useState<boolean>(false);
  const [isNotificationsVisible, setIsNotificationsVisible] =
    useState<boolean>(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([
    "Notification 1",
    "Notification 2",
    "Notification 3",
  ]);
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const [unreadNotifications, setUnreadNotifications] = useState<number>(3);

  useEffect(() => {
    // Replace the URL with your actual API endpoint for user data
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((data) => {
        // Check if the data contains an 'avatar' property
        const userAvatar = data?.avatar || "https://via.placeholder.com/150"; // Placeholder URL
        setAvatar(userAvatar);
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  const handleToggleOptions = () => {
    setIsOptionsVisible((prev) => !prev);
    setIsNotificationsVisible(false); // Close notifications when options are opened
  };

  const handleToggleNotifications = () => {
    setIsNotificationsVisible((prev) => !prev);
    setIsOptionsVisible(false); // Close options when notifications are opened
    setUnreadNotifications(0); // Mark all notifications as read
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsOptionsVisible(false);
    setIsNotificationsVisible(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <div className="flex h-screen bg-gray-100"> */}
      {/* <div className="flex flex-col items-center mt-8"> */}
      {/* <button
            className="p-2 text-gray-700 hover:text-blue-500"
            onClick={() => handleSelectOption("Profile")}
          >
            <FaUser />
          </button>
          <button
            className="p-2 text-gray-700 hover:text-blue-500"
            onClick={() => handleSelectOption("Dashboard")}
          >
            <FaClipboard />
          </button>
          <button
            className="p-2 text-gray-700 hover:text-blue-500"
            onClick={() => handleSelectOption("Courses")}
          >
            <FaBook />
          </button>
          <button
            className="p-2 text-gray-700 hover:text-blue-500"
            onClick={() => handleSelectOption("Check Assessments")}
          >
            <FaList />
          </button> */}

      <Sidebar
        selectedOption={selectedOption}
        handleOptionClick={handleOptionClick}
      />
      {/* </div> */}
      {/* </div> */}

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        {/* Navbar */}
        <header className="bg-white border-b">
          <div className="container mx-auto py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold">{selectedOption}</h1>

            {/* Circular avatar div */}
            <div className="relative flex items-center">
              {avatar && (
                <div
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer z-50"
                  onClick={() => handleToggleOptions()}
                >
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center center" }}
                  />
                </div>
              )}

              {/* Options dropdown */}
              {isOptionsVisible && (
                <div className="absolute top-12 right-0 bg-white border border-gray-200 p-2 rounded shadow">
                  <ul className="space-y-2">
                    <li className="cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800 py-2 px-4 rounded-md">
                      Account
                    </li>
                    <li className="cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800 py-2 px-4 rounded-md">
                      Logout
                    </li>
                  </ul>
                </div>
              )}

              {/* Notification button */}
              <div
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer ml-4 z-50 relative"
                onClick={() => handleToggleNotifications()}
              >
                <FaBell className="w-full h-full object-cover" />
                {unreadNotifications > 0 && (
                  <div className="bg-red-500 text-white text-xs font-semibold absolute top-0 right-0 rounded-full p-1">
                    {unreadNotifications}
                  </div>
                )}
              </div>

              {/* Notifications dropdown */}
              {isNotificationsVisible && (
                <div className="absolute top-12 right-0 bg-white border border-gray-200 p-2 rounded shadow">
                  <ul className="space-y-2">
                    {notifications.map((notification, index) => (
                      <li
                        key={index}
                        className="cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800 py-2 px-4 rounded-md"
                        onClick={() =>
                          setUnreadNotifications((prev) => prev - 1)
                        }
                      >
                        {notification}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Section */}
        <MainSection selectedOption={selectedOption} />
      </div>
    </div>
  );
};

export default InstructorDashboard;
