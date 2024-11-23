import React, { useState } from "react";
import StudentProfile from "../../pages/user/studentprofile";
import FeeManagement from "../../pages/user/FeeManagement";
import HostelRules from "../../pages/user/HostelRules";
import Complaints from "../../pages/user/Complaints";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPageContent = () => {
    switch (activePage) {
      case "students":
        return <StudentProfile />;
      case "feeManagement":
        return <FeeManagement />;
      case "hostelRules":
        return <HostelRules />;
      case "attendance":
        return <div>Attendance and Notification Page Content</div>;
      case "complaints":
        return <Complaints />;
      case "dashboard":
      default:
        return (
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Dashboard cards */}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Hostel Management</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("dashboard")}
                className="hover:text-blue-300 text-left"
              >
                Dashboard
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("students")}
                className="hover:text-blue-300 text-left"
              >
                Students
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("complaints")}
                className="hover:text-blue-300 text-left"
              >
                Complaints
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("feeManagement")}
                className="hover:text-blue-300 text-left"
              >
                Fee Management
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("hostelRules")}
                className="hover:text-blue-300 text-left"
              >
                Hostel Rules
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("attendance")}
                className="hover:text-blue-300 text-left"
              >
                Attendance and Notification
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 p-8">
        <header className="flex items-center justify-between pb-6 mb-6 border-b border-gray-200">
          <h1 className="text-3xl font-semibold text-gray-700">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-200 p-2 rounded-full">🔔</button>
            <img
              className="w-8 h-8 rounded-full"
              src="https://via.placeholder.com/150"
              alt="Profile"
            />
          </div>
        </header>
        {renderPageContent()}
      </div>
    </div>
  );
};

export default Dashboard;
