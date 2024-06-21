import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../../Atoms/LoadingSpinner";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import Layout from "../../../Templates/Layout";

interface Review {
  id: number;
  name: string;
  email: string;
  body: string;
  rating: number;
  comment: string;
}

interface Instructor {
  id: number;
  name: string;
  avatar: string;
  description: string;
}

interface CourseDetailsProps {
  id?: string;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ id }) => {
  const [courseDetails, setCourseDetails] = useState<any>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const params = useParams();

  const handleToggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  const handleToggleCart = () => {
    setIsAddedToCart(!isAddedToCart);
  };

  const handleToggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
        const data = await response.json();
        setCourseDetails(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}/comments`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    const fetchInstructor = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/");
        const data = await response.json();
        const user = data.results[0];
        setInstructor({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          avatar: user.picture.large,
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        });
      } catch (error) {
        console.error("Error fetching instructor details:", error);
      }
    };

    const delay = setTimeout(() => {
      fetchCourseDetails();
      fetchReviews();
      fetchInstructor();
      setLoading(false);
    }, 1500);

    return () => clearTimeout(delay);
  }, [params.id]);

  const calculateAverageRating = () => {
    if (reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  return (
    <Layout>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="w-full h-64 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={`https://picsum.photos/id/${params.id}/800/400`}
              alt={courseDetails.title}
            />
          </div>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{courseDetails.title}</div>
            <p className="text-gray-700 text-base">{courseDetails.body}</p>
          </div>
          <div className="flex items-center justify-between px-6 pb-2">
            <button
              className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded flex items-center ${
                isAddedToCart
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-blue-700 hover:bg-blue-800"
              }`}
              onClick={() => handleToggleCart()}
            >
              <FaCartPlus className="text-white mr-2" />
              {isAddedToCart ? "Added to Cart" : "Add to Cart"}
            </button>
            <button
              className={`btn rounded py-3 px-4 border border-gray-300 transition-colors duration-300 ${
                isWishlist
                  ? "text-red-500 hover:text-red-600 bg-gray-100 border-red-500"
                  : "text-gray-500 hover:text-gray-600"
              }`}
              onClick={() => handleToggleWishlist()}
            >
              {isWishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
          </div>
          <div className="flex items-center justify-center px-6 pt-2 pb-3">
            <button
              className={` bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded w-full ${
                isSubscribed
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-red-700 hover:bg-red-800"
              }`}
              onClick={() => handleToggleSubscribe()}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold mb-2">Average Rating:</h2>
            <div className="flex text-yellow-400 mb-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <span
                  key={index}
                  className={
                    index < calculateAverageRating()
                      ? "text-yellow-400 cursor-pointer"
                      : "text-gray-300 cursor-pointer"
                  }
                >
                  &#9733;
                </span>
              ))}
            </div>
            {instructor && (
              <div className="flex items-center mb-4">
                <img
                  className="w-12 h-12 object-cover rounded-full mr-4"
                  src={instructor.avatar}
                  alt={instructor.name}
                />
                <div>
                  <p className="font-semibold">{instructor.name}</p>
                  <p className="text-gray-600">{instructor.description}</p>
                </div>
              </div>
            )}
            <h2 className="text-xl font-semibold mb-2">Reviews:</h2>
            <ul>
              {reviews.map((review) => (
                <li key={review.id} className="mb-2">
                  <span className="text-gray-500">{`Rating: ${review.rating}/5 - `}</span>
                  <span>{review.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CourseDetails;
