import React, { useState } from "react";
import {
  FaUsers,
  FaBed,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  FaClipboardList,
  FaShieldAlt,
  FaTachometerAlt,
} from "react-icons/fa";

import AddStudent from "../../components/adminComps/addStudent";
import ManageRoom from "../../components/adminComps/manageRoom";
import Booking from "../../components/adminComps/booking";
import EmergencySafety from "../../components/adminComps/emergency";
import Rules from "../../components/adminComps/rules";
import Fees from "../../components/adminComps/fees";

function AdminDashboard() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return (
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-wide">
              Dashboard Overview
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Total Students */}
              <div className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105">
                <FaUsers className="text-5xl mb-4 opacity-90" />
                <h2 className="text-2xl font-bold">Total Students</h2>
                <p className="text-4xl font-extrabold mt-2">120</p>
                <p className="text-sm mt-2">Currently living in the hostel.</p>
              </div>

              {/* Total Rooms */}
              <div className="bg-gradient-to-br from-green-500 to-teal-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105">
                <FaBed className="text-5xl mb-4 opacity-90" />
                <h2 className="text-2xl font-bold">Total Rooms</h2>
                <p className="text-4xl font-extrabold mt-2">50</p>
                <p className="text-sm mt-2">Available rooms for booking.</p>
              </div>

              {/* Bookings Today */}
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105">
                <FaCalendarAlt className="text-5xl mb-4 opacity-90" />
                <h2 className="text-2xl font-bold">Bookings Today</h2>
                <p className="text-4xl font-extrabold mt-2">15</p>
                <p className="text-sm mt-2">New bookings for today.</p>
              </div>
            </div>
          </div>
        );
      case "students":
        return <AddStudent />;
      case "booking":
        return <Booking />;
      case "rooms":
        return <ManageRoom />;
      case "fees":
        return <Fees />;
      case "rules":
        return <Rules />;
      case "emergency":
        return <EmergencySafety />;
      default:
        return <p>Select a valid menu option.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-300 flex">
      {/* Sidebar */}
      <div className="w-72 bg-gradient-to-br from-indigo-700 to-purple-700 text-white p-6 shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Hostel Admin</h2>
        </div>
        <ul>
          <li className="mb-4">
            <button
              onClick={() => setActiveItem("dashboard")}
              className={`flex items-center text-lg p-3 rounded-lg transition-all ${
                activeItem === "dashboard"
                  ? "bg-white text-indigo-700 shadow-md"
                  : "hover:bg-indigo-600"
              }`}
            >
              <FaTachometerAlt className="mr-3" />
              Dashboard
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => setActiveItem("students")}
              className={`flex items-center text-lg p-3 rounded-lg transition-all ${
                activeItem === "students"
                  ? "bg-white text-indigo-700 shadow-md"
                  : "hover:bg-indigo-600"
              }`}
            >
              <FaUsers className="mr-3" />
              Add Students
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => setActiveItem("booking")}
              className={`flex items-center text-lg p-3 rounded-lg transition-all ${
                activeItem === "booking"
                  ? "bg-white text-indigo-700 shadow-md"
                  : "hover:bg-indigo-600"
              }`}
            >
              <FaCalendarAlt className="mr-3" />
              Booking & Reservation
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => setActiveItem("rooms")}
              className={`flex items-center text-lg p-3 rounded-lg transition-all ${
                activeItem === "rooms"
                  ? "bg-white text-indigo-700 shadow-md"
                  : "hover:bg-indigo-600"
              }`}
            >
              <FaBed className="mr-3" />
              Manage Rooms
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => setActiveItem("fees")}
              className={`flex items-center text-lg p-3 rounded-lg transition-all ${
                activeItem === "fees"
                  ? "bg-white text-indigo-700 shadow-md"
                  : "hover:bg-indigo-600"
              }`}
            >
              <FaMoneyCheckAlt className="mr-3" />
              Fees Management
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => setActiveItem("rules")}
              className={`flex items-center text-lg p-3 rounded-lg transition-all ${
                activeItem === "rules"
                  ? "bg-white text-indigo-700 shadow-md"
                  : "hover:bg-indigo-600"
              }`}
            >
              <FaClipboardList className="mr-3" />
              Rules
            </button>
          </li>
          <li className="mb-4">
            <button
              onClick={() => setActiveItem("emergency")}
              className={`flex items-center text-lg p-3 rounded-lg transition-all ${
                activeItem === "emergency"
                  ? "bg-white text-indigo-700 shadow-md"
                  : "hover:bg-indigo-600"
              }`}
            >
              <FaShieldAlt className="mr-3" />
              Emergency & Safety
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;
