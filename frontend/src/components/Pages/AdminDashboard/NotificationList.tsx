// NotificationList.tsx

import React from "react";

interface NotificationListProps {
  onItemClick: () => void;
  onClose: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  onItemClick,
  onClose,
}) => {
  return (
    <div className="absolute top-12 right-0 w-64 bg-white p-4 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-2">Notifications</h3>
      <ul>
        <li onClick={onItemClick} className="cursor-pointer">
          Notification 1
        </li>
        <li onClick={onItemClick} className="cursor-pointer">
          Notification 2
        </li>
        <li onClick={onItemClick} className="cursor-pointer">
          Notification 3
        </li>
      </ul>
      <button
        onClick={onClose}
        className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
      >
        Close
      </button>
    </div>
  );
};

export default NotificationList;
