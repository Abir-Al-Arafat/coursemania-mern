import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PendingCourse {
  userId: number;
  userName: string;
  courseId: number;
  courseName: string;
  courseDescription: string;
  category: string;
}

const PublishCoursesPending: React.FC = () => {
  const [pendingCourses, setPendingCourses] = useState<PendingCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<PendingCourse | null>(
    null
  );
  const [confirmationAction, setConfirmationAction] = useState<
    "accept" | "reject" | null
  >(null);

  useEffect(() => {
    // Fetch data from JSONPlaceholder API for demonstration purposes
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        // Mock data formatting, replace with actual data structure from your API
        const formattedData: PendingCourse[] = data.map((item: any) => ({
          userId: item.userId,
          //   userName: item.user.name, // Replace with actual field from your API
          courseId: item.id,
          courseName: item.title,
          courseDescription: item.body,
          category: "Example Category", // Replace with actual field from your API
        }));

        setPendingCourses(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching pending courses:", error);
      });
  }, []);

  const handleAccept = (course: PendingCourse) => {
    setSelectedCourse(course);
    setConfirmationAction("accept");
  };

  const handleReject = (course: PendingCourse) => {
    setSelectedCourse(course);
    setConfirmationAction("reject");
  };

  const handleConfirmAction = (confirmed: boolean) => {
    if (confirmed && selectedCourse && confirmationAction) {
      // Logic for accepting or rejecting the course (delete from the list, show toast)
      setPendingCourses((prevCourses) =>
        prevCourses.filter(
          (course) => course.courseId !== selectedCourse.courseId
        )
      );

      if (confirmationAction === "accept") {
        toast.success("Request has been accepted successfully");
      } else {
        toast.error("Request has been rejected");
      }
    }

    setSelectedCourse(null);
    setConfirmationAction(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Publish Courses - Pending</h2>

      {pendingCourses.map((course) => (
        <div
          key={course.courseId}
          className="mb-6 p-4 border rounded-md flex items-center justify-between"
        >
          <div>
            <p>{`${course.userName} has applied for publishing a course`}</p>
            <h3 className="text-lg font-semibold">{course.courseName}</h3>
            <p className="text-gray-600 mt-2">{course.courseDescription}</p>
            <p className="text-blue-500 mt-2">{`Category: ${course.category}`}</p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handleAccept(course)}
              className="text-green-500 hover:text-green-600 mr-2"
            >
              Accept
            </button>
            <button
              onClick={() => handleReject(course)}
              className="text-red-500 hover:text-red-600"
            >
              Reject
            </button>
          </div>
        </div>
      ))}

      {pendingCourses.length === 0 && (
        <p className="text-gray-500">No pending courses at the moment.</p>
      )}

      {/* ToastContainer for displaying toasts */}
      <ToastContainer />

      {/* Confirmation modal */}
      {selectedCourse && confirmationAction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p>{`Are you sure you want to ${confirmationAction} ${selectedCourse.courseName}?`}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleConfirmAction(true)}
                className={`bg-${
                  confirmationAction === "accept" ? "green" : "red"
                }-500 text-white px-4 py-2 rounded-md`}
              >
                Yes
              </button>
              <button
                onClick={() => handleConfirmAction(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublishCoursesPending;
