import React, { useState } from "react";

const ComplaintsBox = () => {
  const [activeTab, setActiveTab] = useState("allComplaints");

  const renderComplaints = () => {
    switch (activeTab) {
      case "allComplaints":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">All Complaints</h2>
            <ul>
              <li className="p-4 bg-gray-100 rounded-lg shadow-md mb-2">
                <h3 className="font-medium text-blue-800">Complaint #1</h3>
                <p className="text-gray-600">Water leakage in Room 201</p>
              </li>
              <li className="p-4 bg-gray-100 rounded-lg shadow-md mb-2">
                <h3 className="font-medium text-blue-800">Complaint #2</h3>
                <p className="text-gray-600">Broken window in Room 305</p>
              </li>
            </ul>
          </div>
        );
      case "pendingComplaints":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">Pending Complaints</h2>
            <ul>
              <li className="p-4 bg-gray-100 rounded-lg shadow-md mb-2">
                <h3 className="font-medium text-yellow-500">Complaint #2</h3>
                <p className="text-gray-600">Broken window in Room 305</p>
              </li>
            </ul>
          </div>
        );
      case "resolvedComplaints":
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">Resolved Complaints</h2>
            <ul>
              <li className="p-4 bg-gray-100 rounded-lg shadow-md mb-2">
                <h3 className="font-medium text-green-600">Complaint #1</h3>
                <p className="text-gray-600">Water leakage in Room 201</p>
              </li>
            </ul>
          </div>
        );
      default:
        return <div>No complaints to display.</div>;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Complaints Box</h1>
      {/* Tabs */}
      <div className="flex space-x-4 border-b mb-6">
        <button
          className={`pb-2 px-4 font-semibold ${
            activeTab === "allComplaints"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("allComplaints")}
        >
          All Complaints
        </button>
        <button
          className={`pb-2 px-4 font-semibold ${
            activeTab === "pendingComplaints"
              ? "border-b-2 border-yellow-500 text-yellow-500"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("pendingComplaints")}
        >
          Pending Complaints
        </button>
        <button
          className={`pb-2 px-4 font-semibold ${
            activeTab === "resolvedComplaints"
              ? "border-b-2 border-green-500 text-green-500"
              : "text-gray-500 hover:text-gray-700"
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
