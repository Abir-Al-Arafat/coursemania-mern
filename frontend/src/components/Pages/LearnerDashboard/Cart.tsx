// Cart.tsx

import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface Course {
  id: number;
  title: string;
  body: string;
  imageUrl: string;
}

const Cart: React.FC = () => {
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
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleToggleWishlist = (courseId: number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(courseId)
        ? prevWishlist.filter((id) => id !== courseId)
        : [...prevWishlist, courseId]
    );
  };

  const handleRemoveFromCart = (course: Course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleConfirmRemoveFromCart = (confirmed: boolean) => {
    if (confirmed && selectedCourse) {
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.id !== selectedCourse.id)
      );
    }

    setSelectedCourse(null);
    setShowModal(false);
  };

  return (
    <div className="flex flex-wrap justify-center p-4">
      {courses.map((course) => (
        <div
          key={course.id}
          className="max-w-sm m-4 bg-white shadow-md rounded-md overflow-hidden"
        >
          <img
            className="w-full h-48 object-cover"
            src={course.imageUrl}
            alt={course.title}
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-gray-600 mt-2">{course.body}</p>
            <div className="flex justify-between items-center mt-4">
              <button
                className={`text-red-500 hover:text-red-600 mr-4 flex items-center focus:outline-none`}
                onClick={() => handleRemoveFromCart(course)}
              >
                Remove from Cart
              </button>
              <button
                className={`text-red-500 hover:text-red-600 flex items-center focus:outline-none`}
                onClick={() => handleToggleWishlist(course.id)}
              >
                {wishlist.includes(course.id) ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </div>
        </div>
      ))}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p>
              Are you sure you want to remove {selectedCourse?.title} from the
              cart?
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
                onClick={() => handleConfirmRemoveFromCart(true)}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                onClick={() => handleConfirmRemoveFromCart(false)}
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

export default Cart;
