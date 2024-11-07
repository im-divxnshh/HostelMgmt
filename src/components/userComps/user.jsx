import React from 'react';
import { Avatar, Card, CardContent, Typography, Button, Divider } from '@mui/material';
import { AccountCircle, Settings, ExitToApp } from '@mui/icons-material';

function UserDashboard() {
  // Simulated user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/150',
    bio: 'Web Developer based in New York. Passionate about coding and technology.',
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white p-6">
        {/* Profile Section */}
        <div className="flex items-center space-x-4 mb-10">
          <Avatar alt={user.name} src={user.avatar} sx={{ width: 60, height: 60 }} />
          <div>
            <Typography variant="h6">{user.name}</Typography>
            <Typography variant="body2">{user.email}</Typography>
          </div>
        </div>

        {/* Sidebar Links */}
        <div className="space-y-4">
          <Button fullWidth startIcon={<AccountCircle />} variant="text" className="text-white">
            Profile
          </Button>
          <Button fullWidth startIcon={<Settings />} variant="text" className="text-white">
            Settings
          </Button>
          <Button fullWidth startIcon={<ExitToApp />} variant="text" className="text-white">
            Logout
          </Button>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="text-gray-700">
            Dashboard
          </Typography>
        </div>

        {/* User Info Card */}
        <Card className="mb-6">
          <CardContent>
            <Typography variant="h5" className="font-bold mb-2">
              Personal Info
            </Typography>
            <Divider />
            <div className="mt-4">
              <Typography variant="body1" className="text-gray-800">
                <strong>Name:</strong> {user.name}
              </Typography>
              <Typography variant="body1" className="text-gray-800">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" className="text-gray-800 mt-2">
                <strong>Bio:</strong> {user.bio}
              </Typography>
            </div>
          </CardContent>
        </Card>

        {/* Settings Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Typography variant="h6" className="font-semibold text-gray-800 mb-4">
            Settings
          </Typography>
          <div className="space-y-4">
            <Button fullWidth variant="outlined" color="primary">
              Update Profile
            </Button>
            <Button fullWidth variant="outlined" color="secondary">
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
