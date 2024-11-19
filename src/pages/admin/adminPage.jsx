import React, { useState } from 'react';

// Sidebar Component
const Sidebar = ({ onSectionChange }) => {
  return (
    <div className="sidebar w-64 bg-blue-800 text-white h-screen p-6 fixed top-0 left-0 shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-8">Admin Panel</h2>
      <ul className="space-y-4">
        <li onClick={() => onSectionChange('analytics')} className="flex items-center cursor-pointer p-3 hover:bg-blue-700 rounded-lg">
          <i className="fas fa-chart-line mr-3 text-xl"></i>
          <span className="text-lg">Analytics</span>
        </li>
        <li onClick={() => onSectionChange('user-management')} className="flex items-center cursor-pointer p-3 hover:bg-blue-700 rounded-lg">
          <i className="fas fa-users mr-3 text-xl"></i>
          <span className="text-lg">User Management</span>
        </li>
        <li onClick={() => onSectionChange('settings')} className="flex items-center cursor-pointer p-3 hover:bg-blue-700 rounded-lg">
          <i className="fas fa-cogs mr-3 text-xl"></i>
          <span className="text-lg">Settings</span>
        </li>
      </ul>
    </div>
  );
};

// User Management Component
const UserManagement = () => {
  return (
    <div className="section p-6 bg-white rounded-lg shadow-md mt-4">
      <h3 className="text-2xl font-semibold mb-6">User Management</h3>
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Name</th>
            <th className="border-b px-4 py-2 text-left">Email</th>
            <th className="border-b px-4 py-2 text-left">Status</th>
            <th className="border-b px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-b px-4 py-2">John Doe</td>
            <td className="border-b px-4 py-2">johndoe@example.com</td>
            <td className="border-b px-4 py-2">Active</td>
            <td className="border-b px-4 py-2"><button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Edit</button></td>
          </tr>
          <tr>
            <td className="border-b px-4 py-2">Jane Smith</td>
            <td className="border-b px-4 py-2">janesmith@example.com</td>
            <td className="border-b px-4 py-2">Inactive</td>
            <td className="border-b px-4 py-2"><button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

// Analytics Component
const Analytics = () => {
  return (
    <div className="section p-6 bg-white rounded-lg shadow-md mt-4">
      <h3 className="text-2xl font-semibold mb-6">Analytics Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="analytics-card p-6 bg-blue-100 rounded-lg shadow-md text-center">
          <h4 className="text-xl font-semibold mb-2">Total Users</h4>
          <p className="text-3xl font-bold">1,250</p>
        </div>
        <div className="analytics-card p-6 bg-blue-100 rounded-lg shadow-md text-center">
          <h4 className="text-xl font-semibold mb-2">Total Revenue</h4>
          <p className="text-3xl font-bold">$25,000</p>
        </div>
        <div className="analytics-card p-6 bg-blue-100 rounded-lg shadow-md text-center">
          <h4 className="text-xl font-semibold mb-2">New Signups</h4>
          <p className="text-3xl font-bold">300</p>
        </div>
      </div>
    </div>
  );
};

// Settings Component
const Settings = () => {
  return (
    <div className="section p-6 bg-white rounded-lg shadow-md mt-4">
      <h3 className="text-2xl font-semibold mb-6">Settings</h3>
      <p>Manage the app settings here...</p>
    </div>
  );
};

// Admin Dashboard Component (Main App)
const AdminDB = () => {
  const [activeSection, setActiveSection] = useState('analytics'); // Default section is 'analytics'

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'user-management':
        return <UserManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Analytics />;
    }
  };

  return (
    <div className="admin-dashboard flex">
      <Sidebar onSectionChange={handleSectionChange} />
      <div className="admin-dashboard-content flex-1 ml-64 p-6">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDB;
