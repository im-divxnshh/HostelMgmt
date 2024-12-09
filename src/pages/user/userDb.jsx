import React, { useState } from "react";
import { FaUsers, FaMoneyBillWave, FaClipboardList, FaBell, FaBook, FaUtensils, FaRegCheckCircle, FaExclamationCircle } from "react-icons/fa";
import StudentProfile from "../../components/userComps/Profile";
import FeeManagement from "../../components/userComps/feesManagement";
import HostelRules from "../../components/userComps/hostelRules";
import Complaints from "../../components/userComps/complaints";
import Attendance from "../../components/userComps/attendance";
import Mess from "../../components/userComps/mess";

const UserDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPageContent = () => {
    switch (activePage) {
      case "students":
        return <div><StudentProfile /></div>;
      case "feeManagement":
        return <div><FeeManagement /></div>;
      case "hostelRules":
        return <div><HostelRules /></div>;
      case "attendance":
        return <div><Attendance / ></div>;
      case "mess":
        return <div><Mess /></div>;
      case "complaints":
        return <div><Complaints /></div>;
      case "dashboard":
      default:
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg shadow-md transform hover:scale-105 transition">
                <h3 className="text-sm font-medium">Total Students</h3>
                <p className="text-3xl font-semibold">150</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-lg shadow-md transform hover:scale-105 transition">
                <h3 className="text-sm font-medium">Rooms Occupied</h3>
                <p className="text-3xl font-semibold">120</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-yellow-500 to-orange-600 text-white rounded-lg shadow-md transform hover:scale-105 transition">
                <h3 className="text-sm font-medium">Pending Payments</h3>
                <p className="text-3xl font-semibold">$3,200</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-lg shadow-md transform hover:scale-105 transition">
                <h3 className="text-sm font-medium">Maintenance Requests</h3>
                <p className="text-3xl font-semibold">8</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Hostel Management</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("dashboard")}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-lg transition ${
                  activePage === "dashboard" ? "bg-blue-700" : "hover:bg-gray-700"
                }`}
              >
                <FaClipboardList />
                <span>Dashboard</span>
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("students")}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-lg transition ${
                  activePage === "students" ? "bg-blue-700" : "hover:bg-gray-700"
                }`}
              >
                <FaUsers />
                <span>Students</span>
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("mess")}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-lg transition ${
                  activePage === "mess" ? "bg-blue-700" : "hover:bg-gray-700"
                }`}
              >
                <FaUtensils />
                <span>Mess</span>
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("complaints")}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-lg transition ${
                  activePage === "complaints" ? "bg-blue-700" : "hover:bg-gray-700"
                }`}
              >
                <FaExclamationCircle />
                <span>Complaints</span>
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("feeManagement")}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-lg transition ${
                  activePage === "feeManagement" ? "bg-blue-700" : "hover:bg-gray-700"
                }`}
              >
                <FaMoneyBillWave />
                <span>Fee Management</span>
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("hostelRules")}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-lg transition ${
                  activePage === "hostelRules" ? "bg-blue-700" : "hover:bg-gray-700"
                }`}
              >
                <FaBook />
                <span>Hostel Rules</span>
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActivePage("attendance")}
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left rounded-lg transition ${
                  activePage === "attendance" ? "bg-blue-700" : "hover:bg-gray-700"
                }`}
              >
                <FaRegCheckCircle />
                <span>Attendance</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between pb-6 mb-6 border-b border-gray-300">
          <h1 className="text-3xl font-bold text-gray-700">{activePage === "dashboard" ? "Dashboard" : activePage}</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
              <FaBell />
            </button>
          </div>
        </header>

        {/* Page Content */}
        {renderPageContent()}
      </div>
    </div>
  );
};

export default UserDashboard;
