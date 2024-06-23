import React, { useState } from "react";

interface Review {
  id: number;
  rating: number;
  comment: string;
}

interface EditReviewProps {
  courseId: number;
  onClose: () => void;
}

const EditReview: React.FC<EditReviewProps> = ({ courseId, onClose }) => {
  const [courseDetails, setCourseDetails] = useState({
    title: "Course Title",
    body: "Course Description",
    reviews: [
      { id: 1, rating: 4, comment: "Great course!" },
      { id: 2, rating: 5, comment: "Excellent content!" },
      // Add more reviews as needed
    ],
  });

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const averageRating = () => {
    const totalRating = courseDetails.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / courseDetails.reviews.length || 0;
  };

  const handleEditReview = (review: Review) => {
    setEditingReview(review);
  };

  const handleDeleteReview = (reviewId: number) => {
    const reviewToDelete = courseDetails.reviews.find(
      (review) => review.id === reviewId
    );
  
    if (reviewToDelete) {
      setEditingReview(reviewToDelete);
      setShowDeleteModal(true);
    }
  };
  

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = () => {
    if (editingReview) {
      const updatedReviews = courseDetails.reviews.filter(
        (review) => review.id !== editingReview?.id
      );
  
      setCourseDetails({ ...courseDetails, reviews: updatedReviews });
      setEditingReview(null);
      setShowDeleteModal(false);
    }
  };

  const handleRatingChange = (rating: number) => {
    if (editingReview) {
      setEditingReview({ ...editingReview, rating });
    }
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editingReview) {
      setEditingReview({ ...editingReview, comment: event.target.value });
    }
  };

  const handleReviewSubmit = () => {
    if (editingReview) {
      // Update the reviews array with the edited review
      const updatedReviews = courseDetails.reviews.map((review) =>
        review.id === editingReview.id ? editingReview : review
      );

      setCourseDetails({ ...courseDetails, reviews: updatedReviews });
      setEditingReview(null);
    }
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto mt-8">
      <button className="btn btn-gray mb-4" onClick={onClose}>
        Back to Courses
      </button>
      <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex w-full">
          <img
            className="w-1/3 h-48 object-cover"
            src={`https://picsum.photos/id/${courseId}/600/300`}
            alt={courseDetails.title}
          />
          <div className="p-4 w-2/3">
            <h3 className="text-lg font-semibold mb-2">{courseDetails.title}</h3>
            <p className="text-gray-700 mb-4">{courseDetails.body}</p>
            <h4 className="text-lg font-semibold mb-2">Average Rating:</h4>
            <div className="flex items-center">
              {/* Display average rating stars */}
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < averageRating()
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <span className="ml-2">{averageRating().toFixed(1)}/5</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 w-full">
        <h4 className="text-lg font-semibold mb-2">Reviews:</h4>
        <ul>
          {courseDetails.reviews.map((review, index) => (
            <li key={review.id} className="mb-2 relative">
              {index === 0 && (
                <div className="absolute top-0 right-0 flex items-center space-x-2">
                  <button
                    onClick={() => handleEditReview(review)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
              <span className="text-gray-500">{`Rating: ${review.rating}/5 - `}</span>
              <span>{review.comment}</span>
            </li>
          ))}
        </ul>
      </div>
      {editingReview && !showDeleteModal && (
  <div className="mt-4">
    <h4 className="text-lg font-semibold mb-2">Edit Review:</h4>
    <div className="flex items-center">
      {/* Display rating stars for editing */}
      <div className="flex text-yellow-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <span
            key={index}
            className={
              index < editingReview.rating
                ? "text-yellow-400 cursor-pointer"
                : "text-gray-300 cursor-pointer"
            }
            onClick={() => handleRatingChange(index + 1)}
          >
            &#9733;
          </span>
        ))}
      </div>
      <input
        type="text"
        value={editingReview.comment}
        onChange={handleCommentChange}
        className="ml-2 border p-2 rounded"
      />
      <button
        onClick={handleReviewSubmit}
        className="ml-2 bg-blue-700 text-white py-2 px-4 rounded"
      >
        Submit
      </button>
      <button
        onClick={() => setEditingReview(null)}
        className="ml-2 bg-gray-300 text-gray-700 py-2 px-4 rounded"
      >
        Cancel
      </button>
    </div>
  </div>
)}

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md">
            <p>Are you sure?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
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

export default EditReview;
