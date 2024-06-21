import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import LoadingSpinner from "../../Atoms/LoadingSpinner";
import { FaCartPlus, FaHeart, FaRegHeart } from "react-icons/fa";
import Layout from "../../Templates/Layout";
import useCourses from "../../../hooks/useCourses";
import Input from "../../Atoms/Input";
import Dropdown from "../../Atoms/Dropdown";

interface Card {
  id: number;
  title: string;
  description: string;
}

const CardComponent: React.FC<Card> = ({ id, title, description }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleToggleWishlist = () => {
    setIsWishlist(!isWishlist);
  };

  const handleToggleCart = () => {
    setIsAddedToCart(!isAddedToCart);
  };

  const handleToggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  const getAverageRating = () => {
    // Replace with your logic to calculate average rating
    const ratings = [4, 5, 3, 2, 4]; // Example ratings
    const averageRating = ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length || 0;
    return averageRating;
  };

  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <NavLink to={`/course-details/${id}`}>
        <div
          className={`w-full h-48 overflow-hidden relative ${
            imageLoaded ? "filter-none" : "filter blur-md"
          }`}
        >
          <img
            className="w-full h-full object-cover"
            src={`https://picsum.photos/id/${id}/500/300`}
            alt={title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
          <div className="flex items-center mt-2">
            Average Rating: 
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className={
                  index < Math.floor(getAverageRating())
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
      </NavLink>
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
    </div>
  );
};

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const dummyOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleOptionSelect = (selectedOption: string) => {
    console.log(`Selected option: ${selectedOption}`);
    // Add your logic here for handling the selected option
  };

  const { courses } = useCourses();
  console.log("courses", courses);

  useEffect(() => {
    // Simulating API call delay
    const delay = setTimeout(() => {
      // Fetch data from API
      // Replace the URL with your actual API endpoint
      fetch("https://jsonplaceholder.typicode.com/posts")
        .then((response) => response.json())
        .then((data) => {
          const formattedData: Card[] = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            description: item.body,
          }));
          setCards(formattedData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }, 1500);

    return () => clearTimeout(delay);
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        <div className="col-span-full flex items-center justify-center space-x-4">
          <div className="w-2/5">
            <Input
              placeholder="Search..."
              onChange={(value) => console.log(value)}
            />
          </div>
          <div>
            <Dropdown options={dummyOptions} onSelect={handleOptionSelect} />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          cards.map((card) => <CardComponent key={card.id} {...card} />)
        )}
      </div>
    </Layout>
  );
};

export default App;
