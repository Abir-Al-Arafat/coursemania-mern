import React from "react";
import { useNavigate } from "react-router-dom";

interface Learner {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
}

const learnersData: Learner[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    imageUrl: "https://placekitten.com/50/50",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    imageUrl: "https://placekitten.com/50/51",
  },
  // Add more learner data as needed
];

const Learners: React.FC = () => {
  const navigate = useNavigate();

  const handleEdit = (learnerId: number) => {
    navigate(`edit-learner/${learnerId}`);
  };

  const handleDelete = (learnerId: number) => {
    // Implement delete logic here
    console.log(`Deleting learner with ID: ${learnerId}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Learners</h2>

      {learnersData.map((learner) => (
        <div
          key={learner.id}
          className="mb-6 p-4 border rounded-md flex items-center justify-between"
        >
          <div className="flex items-center">
            <img
              src={learner.imageUrl}
              alt={learner.name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">{learner.name}</h3>
              <p className="text-gray-600">{learner.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => handleEdit(learner.id)}
              className="text-blue-500 hover:text-blue-600 mr-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(learner.id)}
              className="text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {learnersData.length === 0 && (
        <p className="text-gray-500">No learners available.</p>
      )}
    </div>
  );
};

export default Learners;
