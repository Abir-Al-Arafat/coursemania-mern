import { useState } from "react";
import { FaBell } from "react-icons/fa";

const InstructorNavbar = () => {
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

  return (
    <header className="bg-white border-b">
          <div className="container mx-auto py-4 flex justify-between items-center">
            <h1 className="text-2xl font-semibold">{selectedOption}</h1>

            {/* Circular avatar div */}
            <div className="relative flex items-center">
              {avatar && (
                <div
                  className="w-10 h-10 rounded-full overflow-hidden cursor-pointer z-50"
                //   onClick={() => handleToggleOptions()}
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
                // onClick={() => handleToggleNotifications()}
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
  )
}

export default InstructorNavbar