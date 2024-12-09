import React, { useState } from "react";
import { FaRegClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const ComplaintsBox = () => {
  const [activeTab, setActiveTab] = useState("allComplaints");

  // Render complaints based on activeTab
  const renderComplaints = () => {
    switch (activeTab) {
      case "allComplaints":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">All Complaints</h2>
            <ul>
              <li className="p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105">
                <h3 className="font-medium text-blue-800 flex items-center">
                  <FaExclamationTriangle className="mr-2 text-yellow-500" />
                  Complaint #1
                </h3>
                <p className="text-gray-600">Water leakage in Room 201</p>
                <p className="text-sm text-gray-500">Submitted on: 2023-11-01</p>
              </li>
              <li className="p-4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105">
                <h3 className="font-medium text-blue-800 flex items-center">
                  <FaRegClock className="mr-2 text-yellow-500" />
                  Complaint #2
                </h3>
                <p className="text-gray-600">Broken window in Room 305</p>
                <p className="text-sm text-gray-500">Submitted on: 2023-11-03</p>
              </li>
            </ul>
          </div>
        );
      case "pendingComplaints":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">Pending Complaints</h2>
            <ul>
              <li className="p-4 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105">
                <h3 className="font-medium text-yellow-600 flex items-center">
                  <FaRegClock className="mr-2" />
                  Complaint #2
                </h3>
                <p className="text-gray-600">Broken window in Room 305</p>
                <p className="text-sm text-gray-500">Submitted on: 2023-11-03</p>
              </li>
            </ul>
          </div>
        );
      case "resolvedComplaints":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">Resolved Complaints</h2>
            <ul>
              <li className="p-4 bg-gradient-to-r from-green-100 to-green-50 rounded-lg shadow-md mb-4 transition-transform transform hover:scale-105">
                <h3 className="font-medium text-green-600 flex items-center">
                  <FaCheckCircle className="mr-2" />
                  Complaint #1
                </h3>
                <p className="text-gray-600">Water leakage in Room 201</p>
                <p className="text-sm text-gray-500">Resolved on: 2023-11-05</p>
              </li>
            </ul>
          </div>
        );
      default:
        return <div>No complaints to display.</div>;
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-xl max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        User Complaints Box
      </h1>
      {/* Tabs */}
      <div className="flex justify-center space-x-6 border-b pb-4 mb-8">
        <button
          className={`px-6 py-2 font-semibold text-sm rounded-lg ${
            activeTab === "allComplaints"
              ? "bg-blue-500 text-white"
              : "text-gray-500 hover:bg-blue-100"
          }`}
          onClick={() => setActiveTab("allComplaints")}
        >
          All Complaints
        </button>
        <button
          className={`px-6 py-2 font-semibold text-sm rounded-lg ${
            activeTab === "pendingComplaints"
              ? "bg-yellow-500 text-white"
              : "text-gray-500 hover:bg-yellow-100"
          }`}
          onClick={() => setActiveTab("pendingComplaints")}
        >
          Pending Complaints
        </button>
        <button
          className={`px-6 py-2 font-semibold text-sm rounded-lg ${
            activeTab === "resolvedComplaints"
              ? "bg-green-500 text-white"
              : "text-gray-500 hover:bg-green-100"
          }`}
          onClick={() => setActiveTab("resolvedComplaints")}
        >
          Resolved Complaints
        </button>
      </div>

      {/* Complaints Content */}
      {renderComplaints()}
    </div>
  );
};

export default ComplaintsBox;
