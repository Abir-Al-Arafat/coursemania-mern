// AvatarOptions.tsx

import React from "react";

const AvatarOptions: React.FC = () => {
  return (
    <div className="absolute top-12 right-0 w-40 bg-white p-2 rounded-md shadow-md">
      <ul>
        <li className="cursor-pointer">Account</li>
        <li className="cursor-pointer">Log Out</li>
      </ul>
    </div>
  );
};

export default AvatarOptions;
