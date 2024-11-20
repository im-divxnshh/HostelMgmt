import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-600 text-white p-4">
        <div className="flex justify-center items-center mb-8">
          <h2 className="text-3xl font-bold">Hostel Admin</h2>
        </div>
        <ul>
          <li className="mb-6">
            <a href="#" className="flex items-center text-lg hover:bg-indigo-700 p-2 rounded">
              <i className="fas fa-tachometer-alt mr-3"></i> Dashboard
            </a>
          </li>
          <li className="mb-6">
            <a href="#" className="flex items-center text-lg hover:bg-indigo-700 p-2 rounded">
              <i className="fas fa-users mr-3"></i> Students
            </a>
          </li>
          <li className="mb-6">
            <a href="#" className="flex items-center text-lg hover:bg-indigo-700 p-2 rounded">
              <i className="fas fa-bed mr-3"></i> Rooms
            </a>
          </li>
          <li className="mb-6">
            <a href="#" className="flex items-center text-lg hover:bg-indigo-700 p-2 rounded">
              <i className="fas fa-calendar-alt mr-3"></i> Booking
            </a>
          </li>
          <li className="mb-6">
            <a href="#" className="flex items-center text-lg hover:bg-indigo-700 p-2 rounded">
              <i className="fas fa-cogs mr-3"></i> Settings
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
        
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Students Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Students</h2>
            <p className="text-4xl font-bold text-indigo-600">120</p>
            <p className="text-gray-500 mt-2">Currently living in the hostel.</p>
          </div>
          
          {/* Rooms Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Total Rooms</h2>
            <p className="text-4xl font-bold text-indigo-600">50</p>
            <p className="text-gray-500 mt-2">Available rooms for booking.</p>
          </div>

          {/* Bookings Card */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Bookings Today</h2>
            <p className="text-4xl font-bold text-indigo-600">15</p>
            <p className="text-gray-500 mt-2">New bookings for today.</p>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-6 mt-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Activities</h2>
          <ul className="space-y-4">
            <li className="flex justify-between">
              <span className="text-gray-700">New Student Registration</span>
              <span className="text-gray-500">10 mins ago</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">Room Booking</span>
              <span className="text-gray-500">1 hour ago</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">Maintenance Request</span>
              <span className="text-gray-500">2 hours ago</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-700">Payment Received</span>
              <span className="text-gray-500">4 hours ago</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
