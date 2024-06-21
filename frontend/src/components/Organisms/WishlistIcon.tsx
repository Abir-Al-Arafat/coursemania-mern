import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface WishlistIconProps {
  items: string[];
  onRemove: (item: string) => void;
}

const WishlistIcon: React.FC<WishlistIconProps> = ({ items, onRemove }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Wishlist icon */}
      <button
        className={`flex items-center justify-center relative ${
          items.length > 0 ? "text-white" : "text-red-500"
        }`}
        onClick={toggleSidebar}
      >
        {items.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {items.length}
          </span>
        )}
        <div
          className={`bg-transparent border rounded-full p-2 hover:bg-red-500 hover:text-white transition-all`}
        >
          {items.length > 0 ? <FaHeart /> : <FaRegHeart />}
        </div>
      </button>

      {/* Wishlist sidebar */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 h-full bg-white w-64 p-4 transition-all transform translate-x-0 z-50">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Wishlist</h2>
            <button onClick={toggleSidebar} className="text-gray-500">
              &#10005;
            </button>
          </div>
          <ul>
            {items.map((item, index) => (
              <li key={index} className="mb-2 flex justify-between">
                <span>{item}</span>
                <button onClick={() => onRemove(item)} className="text-red-500">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WishlistIcon;
