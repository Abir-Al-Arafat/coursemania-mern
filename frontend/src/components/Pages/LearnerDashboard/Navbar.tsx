import React, { useState, useEffect } from "react";
import { FaBell } from "react-icons/fa";

interface NavbarProps {
  navTitle: string | null;
}

const Navbar: React.FC<NavbarProps> = ({ navTitle }) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [isNotificationsVisible, setIsNotificationsVisible] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<string[]>([
    "Notification 1",
    "Notification 2",
    "Notification 3",
  ]);

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
  };

  const handleNotificationClick = () => {
    // Handle the notification click logic
    setUnreadNotifications((prev) => Math.max(0, prev - 1));
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          {navTitle ? navTitle : `Dashboard`}
        </h1>

        {/* Circular avatar div */}
        <div className="relative flex items-center mr-5">
          {avatar && (
            <div
              className="w-10 h-10 rounded-full overflow-hidden cursor-pointer z-50 transition duration-300 ease-in-out hover:bg-gray-200"
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
            className="relative w-10 h-10 rounded-full overflow-hidden cursor-pointer ml-4 z-50 transition duration-300 ease-in-out hover:bg-gray-200"
            onClick={() => handleToggleNotifications()}
          >
            <div className="w-full h-full flex items-center justify-center">
              {unreadNotifications ? (
                <span className="text-xs text-white bg-red-500 rounded-full p-1 absolute -mt-2 -mr-2">
                  {unreadNotifications}
                </span>
              ) : null}

              <FaBell className="w-6 h-6" />
            </div>
          </div>

          {/* Notifications dropdown */}
          {isNotificationsVisible && (
            <div className="absolute top-12 right-0 bg-white border border-gray-200 p-2 rounded shadow">
              <ul className="space-y-2">
                {notifications.map((notification, index) => (
                  <li
                    key={index}
                    className="cursor-pointer transition duration-300 ease-in-out hover:bg-gray-200 py-2 px-4 rounded-md"
                    onClick={() => handleNotificationClick()}
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
  );
};

export default Navbar;
