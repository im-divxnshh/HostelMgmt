import React, { useState } from "react";

const AttendanceTable = () => {
  const [activeTab, setActiveTab] = useState("allDays");

  // Sample attendance data
  const attendanceData = [
    { date: "2023-11-20", status: "Present" },
    { date: "2023-11-21", status: "Absent" },
    { date: "2023-11-22", status: "Present" },
    { date: "2023-11-23", status: "Present" },
    { date: "2023-11-24", status: "Absent" },
  ];

  // Function to filter data based on the active tab
  const renderAttendanceData = () => {
    switch (activeTab) {
      case "present":
        return attendanceData.filter((record) => record.status === "Present");
      case "absent":
        return attendanceData.filter((record) => record.status === "Absent");
      default:
        return attendanceData;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Attendance Information
      </h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 border-b pb-4 mb-6">
        <button
          className={`px-4 py-2 font-semibold text-sm rounded-lg ${
            activeTab === "allDays"
              ? "bg-blue-500 text-white"
              : "text-gray-500 hover:bg-blue-100"
          }`}
          onClick={() => setActiveTab("allDays")}
        >
          All Days
        </button>
        <button
          className={`px-4 py-2 font-semibold text-sm rounded-lg ${
            activeTab === "present"
              ? "bg-green-500 text-white"
              : "text-gray-500 hover:bg-green-100"
          }`}
          onClick={() => setActiveTab("present")}
        >
          Present
        </button>
        <button
          className={`px-4 py-2 font-semibold text-sm rounded-lg ${
            activeTab === "absent"
              ? "bg-red-500 text-white"
              : "text-gray-500 hover:bg-red-100"
          }`}
          onClick={() => setActiveTab("absent")}
        >
          Absent
        </button>
      </div>

      {/* Attendance Table */}
      <table className="min-w-full table-auto bg-gray-100 rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">
              Date
            </th>
            <th className="py-3 px-4 text-left text-gray-700 font-semibold">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {renderAttendanceData().map((record, index) => (
            <tr
              key={index}
              className={`${
                record.status === "Present" ? "bg-green-100" : "bg-red-100"
              } border-b`}
            >
              <td className="py-2 px-4">{record.date}</td>
              <td
                className={`py-2 px-4 font-medium ${
                  record.status === "Present" ? "text-green-700" : "text-red-700"
                }`}
              >
                {record.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <p className="text-sm text-gray-500 mt-4 text-center">
        Showing {activeTab === "allDays"
          ? "all attendance records"
          : `${activeTab} days`}{" "}
        for the student.
      </p>
    </div>
  );
};

export default AttendanceTable;
