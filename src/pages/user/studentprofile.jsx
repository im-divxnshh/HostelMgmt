import React, { useState } from 'react';

// Style added directly inside the component
const StudentProfile = () => {
  // Example student data
  const studentData = {
    name: 'John Doe',
    studentId: 'S123456',
    email: 'johndoe@example.com',
    age: 20,
    Department: 'Computer Science',
    year: 'Sophomore',
  };

  // State to manage which section to display
  const [selectedSection, setSelectedSection] = useState('general');

  // Switch-case for rendering profile sections
  const renderSection = (section) => {
    switch (section) {
      case 'general':
        return (
          <div className="section-content">
            <h2>General Information</h2>
            <p><strong>Name:</strong> {studentData.name}</p>
            <p><strong>Student ID:</strong> {studentData.studentId}</p>
            <p><strong>Email:</strong> {studentData.email}</p>
          </div>
        );
      case 'academic':
        return (
          <div className="section-content">
            <h2>Academic Details</h2>
            <p><strong>Department:</strong> {studentData.Department}</p>
            <p><strong>Year:</strong> {studentData.year}</p>
            <p><strong>Age:</strong> {studentData.age}</p>
          </div>
        );
      default:
        return <div className="section-content">Please select a section to view.</div>;
    }
  };

  return (
    <div className="profile-container">
      <h1>Student Profile</h1>
      
      {/* Navigation */}
      <div className="button-container">
        <button 
          onClick={() => setSelectedSection('general')}
          className={selectedSection === 'general' ? 'active' : ''}
        >
          General Information
        </button>
        <button 
          onClick={() => setSelectedSection('academic')}
          className={selectedSection === 'academic' ? 'active' : ''}
        >
          Academic Details
        </button>
      </div>
      
      {/* Render selected section */}
      {renderSection(selectedSection)}

      {/* Inline Styles */}
      <style>
        {`
          .profile-container {
            font-family: 'Arial', sans-serif;
            background-color: #f9f9f9;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            background-color: #fff;
          }

          h1 {
            text-align: center;
            color: #333;
            font-size: 2.5em;
            margin-bottom: 20px;
          }

          .button-container {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
          }

          button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 1.1em;
            transition: background-color 0.3s ease;
            width: 180px;
          }

          button:hover {
            background-color: #45a049;
          }

          button.active {
            background-color: #333;
            color: white;
          }

          .section-content {
            padding: 20px;
            background-color: #f4f4f4;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
          }

          section h2 {
            font-size: 1.8em;
            color: #333;
            margin-bottom: 10px;
          }

          section p {
            font-size: 1.1em;
            color: #555;
            margin: 5px 0;
          }

          strong {
            font-weight: bold;
          }
        `}
      </style>
    </div>
  );
};

export default StudentProfile;
