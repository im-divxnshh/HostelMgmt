import React, { useState } from 'react';

const StudentProfile = () => {
  // Example student data
  const studentData = {
    name: 'John Doe',
    studentId: 'S123456',
    email: 'johndoe@example.com',
    age: 20,
    Department: 'Computer Science',
    year: 'Sophomore',
    roomDetails: {
      roomNumber: 'A-101',
      hostelName: 'Maple Residence',
      bedNumber: 'B-12',
    },
  };

  // State to manage which section to display
  const [selectedSection, setSelectedSection] = useState('general');

  // Switch-case for rendering profile sections
  const renderSection = (section) => {
    switch (section) {
      case 'general':
        return (
          <div className="profile-section-content">
            <h2>General Information</h2>
            <p><strong>Name:</strong> {studentData.name}</p>
            <p><strong>Student ID:</strong> {studentData.studentId}</p>
            <p><strong>Email:</strong> {studentData.email}</p>
          </div>
        );
      case 'academic':
        return (
          <div className="profile-section-content">
            <h2>Academic Details</h2>
            <p><strong>Department:</strong> {studentData.Department}</p>
            <p><strong>Year:</strong> {studentData.year}</p>
            <p><strong>Age:</strong> {studentData.age}</p>
          </div>
        );
      case 'room':
        return (
          <div className="profile-section-content">
            <h2>Room Details</h2>
            <p><strong>Room Number:</strong> {studentData.roomDetails.roomNumber}</p>
            <p><strong>Hostel Name:</strong> {studentData.roomDetails.hostelName}</p>
            <p><strong>Bed Number:</strong> {studentData.roomDetails.bedNumber}</p>
          </div>
        );
      default:
        return <div className="profile-section-content">Please select a section to view.</div>;
    }
  };

  return (
    <div className="student-profile-container">
      <h1>Student Profile</h1>
      
      {/* Navigation */}
      <div className="profile-button-container">
        <button 
          onClick={() => setSelectedSection('general')}
          className={selectedSection === 'general' ? 'profile-active' : ''}
        >
          General Information
        </button>
        <button 
          onClick={() => setSelectedSection('academic')}
          className={selectedSection === 'academic' ? 'profile-active' : ''}
        >
          Academic Details
        </button>
        <button 
          onClick={() => setSelectedSection('room')}
          className={selectedSection === 'room' ? 'profile-active' : ''}
        >
          Room Details
        </button>
      </div>
      
      {/* Render selected section */}
      {renderSection(selectedSection)}

      {/* Scoped CSS */}
      <style>
        {`
          .student-profile-container {
            font-family: 'Roboto', sans-serif;
            background: linear-gradient(135deg, #74ebd5, #ACB6E5);
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            border-radius: 15px;
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            color: #333;
          }

          .student-profile-container h1 {
            text-align: center;
            color: #fff;
            font-size: 2.8em;
            margin-bottom: 20px;
            text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
          }

          .profile-button-container {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-bottom: 20px;
          }

          .profile-button-container button {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            font-size: 1.2em;
            font-weight: bold;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          }

          .profile-button-container button:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
          }

          .profile-button-container button.profile-active {
            background: linear-gradient(135deg, #FF6A88, #FF99AC);
            color: white;
          }

          .profile-section-content {
            background: #ffffff;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
          }

          .profile-section-content h2 {
            font-size: 1.8em;
            color: #333;
            margin-bottom: 10px;
          }

          .profile-section-content p {
            font-size: 1.1em;
            color: #555;
            margin: 5px 0;
          }

          .profile-section-content strong {
            font-weight: bold;
            color: #333;
          }
        `}
      </style>
    </div>
  );
};

export default StudentProfile;
