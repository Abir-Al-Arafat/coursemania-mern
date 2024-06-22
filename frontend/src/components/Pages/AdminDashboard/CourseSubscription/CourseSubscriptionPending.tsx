import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "../Modal";

interface Notification {
  id: number;
  personName: string;
  courseName: string;
}

interface CourseSubscriptionPendingProps {}

const CourseSubscriptionPending: React.FC<
  CourseSubscriptionPendingProps
> = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);
  const [actionResult, setActionResult] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the mock API
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        // Extract relevant data from the API response
        const data: Notification[] = response.data.map((item: any) => ({
          id: item.id,
          personName: item.title, // Use relevant fields from your API
          courseName: item.body,
        }));
        setNotifications(data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, []);

  const handleAccept = (notification: Notification) => {
    // Implement your logic for accepting the notification here
    // For demonstration purposes, just hiding the notification
    setActionResult("Successfully Accepted");
    setTimeout(() => {
      setActionResult(null);
      // You can perform additional actions here, such as making an API call
    }, 2000);
  };

  const handleReject = (notification: Notification) => {
    // For demonstration purposes, just showing a modal
    setSelectedNotification(notification);
    setShowModal(true);
  };

  const handleModalYes = () => {
    // Implement your logic for rejecting the notification here
    // For demonstration purposes, just showing a success message
    setActionResult("Request has been rejected");
    setShowModal(false);
    setTimeout(() => {
      setActionResult(null);
      // You can perform additional actions here, such as making an API call
    }, 2000);
  };

  const handleModalNo = () => {
    setShowModal(false);
  };

  return (
    <div className="mt-3">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className="flex items-center justify-between p-4 border-b-2 border-indigo-500"
        >
          <div className="w-3/4">
            <p>{`${notification.personName} has applied for ${notification.courseName}`}</p>
          </div>
          <div className="w-1/5">
            <button
              onClick={() => handleAccept(notification)}
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 w-full"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(notification)}
              className="bg-red-500 text-white px-4 py-2 rounded-md w-full mt-1"
            >
              Reject
            </button>
          </div>
        </div>
      ))}

      {showModal && (
        <Modal>
          <p>Are you sure you want to reject the request?</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleModalYes}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
            >
              Yes
            </button>
            <button
              onClick={handleModalNo}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            >
              No
            </button>
          </div>
        </Modal>
      )}

      {actionResult && (
        <div
          className={`fixed top-0 right-0 m-8 ${
            actionResult.includes("Successfully")
              ? "bg-green-500"
              : "bg-red-500"
          } text-white p-4 rounded-md shadow-md`}
        >
          {actionResult}
        </div>
      )}
    </div>
  );
};

export default CourseSubscriptionPending;
