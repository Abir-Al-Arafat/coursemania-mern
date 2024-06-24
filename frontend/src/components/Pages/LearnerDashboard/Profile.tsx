// Profile.tsx

import React, { useEffect, useState } from "react";
import axios from "axios";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    // Replace with the correct JSONPlaceholder endpoint
    axios
      .get<UserProfile>("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        setUserProfile(response.data);
      });
  }, []);

  return (
    <div className="container mx-auto p-6">
      {userProfile ? (
        <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
          <img
            className="w-24 h-24 object-cover rounded-full mb-4"
            src={`https://i.pravatar.cc/150?u=${userProfile.id}`}
            alt={userProfile.name}
          />
          <h2 className="text-2xl font-semibold mb-2">{userProfile.name}</h2>
          <p className="text-gray-600 mb-2">{userProfile.email}</p>
          <p className="text-gray-600">User ID: {userProfile.id}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
