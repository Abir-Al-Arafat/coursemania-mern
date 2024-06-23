import React, { useState } from "react";

import LandingPage from './LandingPage'; 
import Curriculum from './Curriculum'; 
import Status from './Status'; 

const CourseDetailsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Landing Page");

  return (
    <div className="container mx-auto mt-8">
      {/* Tab bar */}
      <div className="flex">
        <TabButton
          tabName="Landing Page"
          isSelected={selectedTab === "Landing Page"}
          onClick={() => setSelectedTab("Landing Page")}
        />
        <TabButton
          tabName="Curriculum"
          isSelected={selectedTab === "Curriculum"}
          onClick={() => setSelectedTab("Curriculum")}
        />
        <TabButton
          tabName="Status"
          isSelected={selectedTab === "Status"}
          onClick={() => setSelectedTab("Status")}
        />
      </div>

      {/* Render selected tab content */}
      <div className="mt-4">
        {selectedTab === "Landing Page" && <LandingPage />}
        {selectedTab === "Curriculum" && <Curriculum />}
        {selectedTab === "Status" && <Status />}
      </div>
    </div>
  );
};

interface TabButtonProps {
  tabName: string;
  isSelected: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  tabName,
  isSelected,
  onClick,
}) => {
  return (
    <button
      className={`flex-1 py-2 px-4 border-b-2 ${
        isSelected ? "border-blue-500" : "border-transparent"
      } focus:outline-none hover:border-blue-500`}
      onClick={onClick}
    >
      {tabName}
    </button>
  );
};

export default CourseDetailsPage;
