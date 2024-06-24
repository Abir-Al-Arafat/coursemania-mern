// Wishlist.tsx

import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Course {
  id: number;
  title: string;
  body: string;
  imageUrl: string;
}

const Wishlist: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    // Fetch data from the API (JSONPlaceholder for demonstration purposes)
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        const formattedCourses: Course[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          body: item.body,
          imageUrl: `https://picsum.photos/id/${item.id}/300/200`, // Use picsum.photos for placeholder images
        }));
        setCourses(formattedCourses);
        // Simulate all courses being initially selected in the wishlist
        setWishlist(formattedCourses.map((course) => course.id));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleToggleWishlist = (courseId: number) => {
    setSelectedCourse(courses.find((course) => course.id === courseId) || null);
    setShowModal(true);
  };

  const handleRemoveCourse = () => {
    if (selectedCourse) {
      setWishlist((prevWishlist) =>
        prevWishlist.filter((id) => id !== selectedCourse.id)
      );
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== selectedCourse.id)
      );
    }
    setShowModal(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <img
            className="w-full h-48 object-cover"
            src={course.imageUrl}
            alt={course.title}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{course.title}</div>
            <p className="text-gray-700 text-base">{course.body}</p>
          </div>
          <div className="flex justify-between px-6 py-4">
            <button
              className={`btn ${
                wishlist.includes(course.id) ? "text-red-500" : "text-gray-500"
              }`}
              onClick={() => handleToggleWishlist(course.id)}
            >
              {wishlist.includes(course.id) ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
        </div>
      ))}
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 max-w-md rounded-md shadow-md">
            <p>
              Are you sure you want to remove this course from the wishlist?
            </p>
            <div className="flex justify-end mt-4">
              <button
                className="btn btn-red mr-2"
                onClick={() => handleRemoveCourse()}
              >
                Yes
              </button>
              <button
                className="btn btn-gray"
                onClick={() => setShowModal(false)}
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

export default Wishlist;
