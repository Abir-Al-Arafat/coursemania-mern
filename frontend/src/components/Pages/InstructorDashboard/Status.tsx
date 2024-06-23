import React, { useState } from "react";

const StatusPage: React.FC = () => {
  const [showApplyConfirmation, setShowApplyConfirmation] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");

  const handleApply = () => {
    // Here you can perform any logic needed before showing the success message
    // For now, let's just set a timeout to simulate an asynchronous action
    setShowApplyConfirmation(false);
    setTimeout(() => {
      setShowSuccessMessage(true);
    }, 1000);
  };

  return (
    <div className="container mx-auto mt-8 text-center">
      {showSuccessMessage ? (
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold text-green-500 mb-4">Successfully Applied!</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-12 h-12 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      ) : (
        <>
          <p className="text-xl mb-4">
            You have not applied for publishing the course yet.
            <br />
            Do you want to apply for publishing your course?
          </p>
          {showApplyConfirmation ? (
            <>
              <textarea
                className="border rounded p-2 mb-4 w-full"
                placeholder="Tell us why"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleApply}
              >
                Apply
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowApplyConfirmation(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setShowApplyConfirmation(true)}
            >
              Apply for Publishing
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default StatusPage;
