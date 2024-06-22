import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface EditLearnerParams extends Record<string, string | undefined> {
  id: any;
}

interface IEditUser {
  title?: string;
}

const EditLearner: React.FC<IEditUser> = ({ title }) => {
  const navigate = useNavigate();
  const { id } = useParams<EditLearnerParams>();

  // Mock learner data, replace with actual API call
  const learnerData = {
    id: parseInt(id, 10),
    name: "John Doe",
    email: "john@example.com",
    imageUrl: "https://placekitten.com/50/50",
  };

  // State to hold edited user data
  const [editedUserData, setEditedUserData] = useState({
    name: learnerData.name,
    email: learnerData.email,
  });

  const handleUpdate = () => {
    // Implement update logic here
    toast.success("Successfully updated user details");
    navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {title ? title : `Edit User`}
      </h2>

      <div className="mb-6 p-4 border rounded-md flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={learnerData.imageUrl}
            alt={learnerData.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 className="text-lg font-semibold">{learnerData.name}</h3>
            <p className="text-gray-600">{learnerData.email}</p>
          </div>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 text-gray-600">Name</label>
          <input
            type="text"
            name="name"
            value={editedUserData.name}
            onChange={handleInputChange}
            className="border rounded-md p-2 mb-2"
          />
          <label className="mb-2 text-gray-600">Email</label>
          <input
            type="text"
            name="email"
            value={editedUserData.email}
            onChange={handleInputChange}
            className="border rounded-md p-2"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Update
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>

      {/* ToastContainer for displaying toasts */}
      <ToastContainer />
    </div>
  );
};

export default EditLearner;
