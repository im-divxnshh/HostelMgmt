import React, { useState } from "react";

const Rules = () => {
  // State for notification and violations tracking
  const [notification, setNotification] = useState("");
  const [violations, setViolations] = useState(0);

  // Rules data
  const rules = [
    "Hostel gates close at 9:00 PM. Late entry is strictly prohibited.",
    "Visitors are allowed only during visiting hours with prior permission.",
    "Maintain cleanliness in your room and common areas.",
    "No loud music or noise after 10:00 PM to ensure everyone gets proper rest.",
    "Cooking inside the rooms is not allowed. Use the common pantry area.",
    "Alcohol, smoking, or any illegal activities are strictly prohibited.",
    "Always inform the warden if you are leaving the hostel premises.",
    "Follow proper waste segregation and recycling practices.",
  ];

  // Handle rule violation
  const handleViolation = () => {
    setViolations(violations + 1);
    setNotification("Violation registered! Please adhere to the rules.");
  };

  // Handle reset violation
  const handleResetViolation = () => {
    setViolations(0);
    setNotification("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 to-blue-300 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white text-center py-6">
          <h1 className="text-3xl font-bold uppercase">Hostel Rules & Regulations</h1>
          <p className="text-sm mt-2">Ensuring a safe, clean, and disciplined environment</p>
        </div>

        {/* Notification Section */}
        {notification && (
          <div className="bg-red-100 text-red-600 p-4 my-4 rounded-lg shadow-md">
            <p>{notification}</p>
          </div>
        )}

        {/* Rules List */}
        <div className="p-6">
          <ul className="space-y-4">
            {rules.map((rule, index) => (
              <li
                key={index}
                className="flex items-start space-x-3 bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white flex items-center justify-center rounded-full font-bold">
                  {index + 1}
                </span>
                <p className="text-gray-800">{rule}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Violation Tracker */}
        <div className="p-6 mt-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Violation Tracker</h2>
          <p className="text-sm text-gray-500 mt-2">
            Track the number of violations registered. Please adhere to the rules to avoid penalties.
          </p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-lg font-bold text-red-600">Violations: {violations}</p>
            <button
              onClick={handleViolation}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Register Violation
            </button>
            {violations > 0 && (
              <button
                onClick={handleResetViolation}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Reset Violations
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 text-center py-4 mt-6">
          <p className="text-sm text-gray-500">
            Please adhere to these rules to maintain a safe and respectful environment for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Rules;
