import React from "react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white p-6">
        <h2 className="text-2xl font-semibold mb-6">Hostel Management</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a href="#dashboard" className="hover:text-blue-300">Dashboard</a>
            </li>
            <li className="mb-4">
              <a href="#students" className="hover:text-blue-300">Students</a>
            </li>
            <li className="mb-4">
              <a href="#rooms" className="hover:text-blue-300">Rooms</a>
            </li>
            <li className="mb-4">
              <a href="#finances" className="hover:text-blue-300">Finances</a>
            </li>
            <li className="mb-4">
              <a href="#maintenance" className="hover:text-blue-300">Maintenance</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Top Navbar */}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-600">Total Students</h3>
            <p className="text-2xl font-semibold text-blue-500">150</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-600">Rooms Occupied</h3>
            <p className="text-2xl font-semibold text-blue-500">120</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-600">Pending Payments</h3>
            <p className="text-2xl font-semibold text-blue-500">$3,200</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-600">Maintenance Requests</h3>
            <p className="text-2xl font-semibold text-blue-500">8</p>
          </div>
        </div>

        {/* Recent Activity & Requests */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activities</h2>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>John Doe checked in</span>
                <span className="text-gray-500 text-sm">2 hrs ago</span>
              </li>
              <li className="flex justify-between">
                <span>Room 301 maintenance resolved</span>
                <span className="text-gray-500 text-sm">1 day ago</span>
              </li>
              <li className="flex justify-between">
                <span>Jane Smith payment pending</span>
                <span className="text-gray-500 text-sm">3 days ago</span>
              </li>
            </ul>
          </div>

          {/* Maintenance Requests */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Maintenance Requests</h2>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>Room 102 - Broken AC</span>
                <span className="text-gray-500 text-sm">Pending</span>
              </li>
              <li className="flex justify-between">
                <span>Room 305 - Leaky faucet</span>
                <span className="text-gray-500 text-sm">In Progress</span>
              </li>
              <li className="flex justify-between">
                <span>Room 402 - Broken window</span>
                <span className="text-gray-500 text-sm">Completed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
