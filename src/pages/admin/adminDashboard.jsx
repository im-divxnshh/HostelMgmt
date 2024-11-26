import React, { useState } from "react";

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
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Students</h2>
                <p className="text-4xl font-bold text-indigo-600">120</p>
                <p className="text-gray-500 mt-2">Currently living in the hostel.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Rooms</h2>
                <p className="text-4xl font-bold text-indigo-600">50</p>
                <p className="text-gray-500 mt-2">Available rooms for booking.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bookings Today</h2>
                <p className="text-4xl font-bold text-indigo-600">15</p>
                <p className="text-gray-500 mt-2">New bookings for today.</p>
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
      case"fees":
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
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-indigo-600 text-white p-4">
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-3xl font-bold">Hostel Admin</h2>
        </div>
        <ul>
          <li className="mb-6">
            <button
              onClick={() => setActiveItem("dashboard")}
              className={`flex items-center text-lg hover:bg-indigo-700 p-2 rounded ${
                activeItem === "dashboard" ? "bg-indigo-700" : ""
              }`}
            >
              <i className="fas fa-tachometer-alt mr-3"></i> Dashboard
            </button>
          </li>
          <li className="mb-6">
            <button
              onClick={() => setActiveItem("students")}
              className={`flex items-center text-lg hover:bg-indigo-700 p-2 rounded ${
                activeItem === "students" ? "bg-indigo-700" : ""
              }`}
            >
              <i className="fas fa-users mr-3"></i>Add Students
            </button>
          </li>
          <li className="mb-6">
            <button
              onClick={() => setActiveItem("booking")}
              className={`flex items-center text-lg hover:bg-indigo-700 p-2 rounded ${
                activeItem === "booking" ? "bg-indigo-700" : ""
              }`}
            >
              <i className="fas fa-calendar-alt mr-3"></i> Booking and reservation
            </button>
          </li>
          <li className="mb-6">
            <button
              onClick={() => setActiveItem("rooms")}
              className={`flex items-center text-lg hover:bg-indigo-700 p-2 rounded ${
                activeItem === "rooms" ? "bg-indigo-700" : ""
              }`}
            >
              <i className="fas fa-bed mr-3"></i> Manage Rooms
            </button>
          </li>
          <li className="mb-6">
            <button
              onClick={() => setActiveItem("fees")}
              className={`flex items-center text-lg hover:bg-indigo-700 p-2 rounded ${
                activeItem === "fees" ? "bg-indigo-700" : ""
              }`}
            >
              <i className="fas fa-calendar-alt mr-3"></i> Fees Management
            </button>
          </li>
          <li className="mb-6">
            <button
              onClick={() => setActiveItem("rules")}
              className={`flex items-center text-lg hover:bg-indigo-700 p-2 rounded ${
                activeItem === "rules" ? "bg-indigo-700" : ""
              }`}
            >
              <i className="fas fa-calendar-alt mr-3"></i> Rules and Regulations
            </button>
          </li>
          <li className="mb-6">
            <button
              onClick={() => setActiveItem("emergency")}
              className={`flex items-center text-lg hover:bg-indigo-700 p-2 rounded ${
                activeItem === "emergency" ? "bg-indigo-700" : ""
              }`}
            >
              <i className="fas fa-shield-alt mr-3"></i> Emergency & Safety
            </button>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-6">{renderContent()}</div>
    </div>
  );
}

export default AdminDashboard;
