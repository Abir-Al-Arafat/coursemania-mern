import React, { useState, useEffect } from "react";
import { FaStar, FaEdit } from "react-icons/fa";
import EditReview from "./EditReview"; 
interface Course {
  id: number;
  title: string;
  body: string;
  rating: number;
  imageUrl: string;
}

const ReviewedCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);

  useEffect(() => {
    // Using JSONPlaceholder as a sample API for course data
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        const formattedCourses: Course[] = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          body: item.body,
          rating: Math.floor(Math.random() * 5) + 1, // Generating a random rating (1-5) for demonstration
          imageUrl: `https://picsum.photos/id/${item.id}/300/200`, // Using Picsum for placeholder images
        }));
        setCourses(formattedCourses);
      })
      .catch((error) => console.error("Error fetching course data:", error));
  }, []);

  const handleEditReview = (courseId: number) => {
    setSelectedCourseId(courseId);
  };

  const handleBackToCourses = () => {
    setSelectedCourseId(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {selectedCourseId ? (
        <EditReview courseId={selectedCourseId} onClose={handleBackToCourses} />
      ) : (
        courses.map((course) => (
          <div
            key={course.id}
            className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              className="w-full h-48 object-cover"
              src={course.imageUrl}
              alt={course.title}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-700 mb-4">{course.body}</p>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FaStar
                      key={index}
                      className={
                        index < course.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <span className="ml-2">{course.rating}/5</span>
              </div>
              <button
                className="btn btn-blue"
                onClick={() => handleEditReview(course.id)}
              >
                <FaEdit className="mr-2" />
                Edit Review
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewedCourses;
