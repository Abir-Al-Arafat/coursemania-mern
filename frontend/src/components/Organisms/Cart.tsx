import React, { useState } from "react";
import { FaShoppingCart, FaTimes } from "react-icons/fa";

interface CartItem {
  id: number;
  name: string;
  price: number;
}

const Cart: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  //   const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const dummyCartItems: CartItem[] = [
    { id: 1, name: "Item 1", price: 20 },
    { id: 2, name: "Item 2", price: 15 },
    { id: 3, name: "Item 3", price: 30 },
  ];

  const [cartItems, setCartItems] = useState<CartItem[]>(dummyCartItems);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + 1, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="relative">
      <button
        className="text-white hover:text-gray-500 p-2 focus:outline-none"
        onClick={handleToggleSidebar}
      >
        <FaShoppingCart size={24} />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {getTotalItems()}
          </span>
        )}
      </button>

      {isSidebarOpen && (
        <div className="z-50 fixed top-0 right-0 h-full bg-white w-64 overflow-y-auto shadow-lg transition-transform transform duration-300 ease-in-out">
          <div className="flex justify-end p-4">
            <button
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={handleToggleSidebar}
            >
              <FaTimes size={20} />
            </button>
          </div>

          <ul className="px-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-2"
              >
                <span>{item.name}</span>
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between px-4 py-2 border-t">
            <span>Total Items:</span>
            <span>{getTotalItems()}</span>
          </div>

          <div className="flex justify-between px-4 py-2">
            <span>Total Price:</span>
            <span>${getTotalPrice()}</span>
          </div>

          <div className="flex justify-center p-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
