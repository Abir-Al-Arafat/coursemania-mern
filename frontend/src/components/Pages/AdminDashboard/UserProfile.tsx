// UserProfile.tsx

import React, { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch user data from the API (JSONPlaceholder for demonstration purposes)
    fetch("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      {user ? (
        <>
          <div className="flex items-center justify-center">
            <img
              src={`https://i.pravatar.cc/150?u=${user.id}`} // Using pravatar for a random user image
              alt={user.name}
              className="w-20 h-20 rounded-full"
            />
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">@{user.username}</p>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Phone:</span> {user.phone}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Website:</span> {user.website}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Address:</span>{" "}
              {`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
            </p>
          </div>
        </>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
