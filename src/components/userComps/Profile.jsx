import React, { useState, useEffect } from 'react';
import { auth, firestore } from '../../utils/firebaseConfig'; // Import Firebase config
import { doc, getDoc } from 'firebase/firestore'; // Use Firestore methods

const StudentProfile = () => {
  const [studentData, setStudentData] = useState(null); // State to store student data
  const [selectedSection, setSelectedSection] = useState('general'); // Active section for profile details
  const [loading, setLoading] = useState(true); // Loading state to handle data fetching
  const [error, setError] = useState(null); // State to store error messages

  // Function to fetch student data from Firestore
  const fetchStudentData = async () => {
    try {
      const user = auth.currentUser; // Get the currently authenticated user
      if (user) {
        const userId = user.uid; // Get user UID
        const userRef = doc(firestore, 'users', userId); // Firestore reference for the user data
        const snapshot = await getDoc(userRef); // Fetch data from Firestore

        if (snapshot.exists()) {
          setStudentData(snapshot.data()); // Set student data in state
          console.log(snapshot.data()); // Log the fetched data for debugging
        } else {
          setError('No data available');
        }
      } else {
        setError('No user is signed in');
      }
    } catch (error) {
      setError('Error fetching student data: ' + error.message); // Set error message
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  };

  // UseEffect to fetch student data once when the component mounts
  useEffect(() => {
    fetchStudentData();
  }, []);

  // Function to render the selected section
  const renderSection = (section) => {
    if (loading) return <p>Loading...</p>; // Show loading until data is fetched
    if (error) return <p>{error}</p>; // Show error if any

    if (!studentData) {
      return <p>No student data available.</p>; // If student data is null or undefined
    }

    switch (section) {
      case 'general':
        return (
          <div className="profile-section-content">
            <h2>General Information</h2>
            <p><strong>Name:</strong> {studentData.name || 'N/A'}</p>
            <p><strong>Student ID:</strong> {studentData.studentId || 'N/A'}</p>
            <p><strong>Email:</strong> {studentData.email || 'N/A'}</p>
            <p><strong>Mobile:</strong> {studentData.mobile || 'N/A'}</p>
            <p><strong>Parent Name:</strong> {studentData.parentName || 'N/A'}</p>
            <p><strong>Parent Contact:</strong> {studentData.parentContact || 'N/A'}</p>
          </div>
        );
      case 'academic':
        return (
          <div className="profile-section-content">
            <h2>Academic Details</h2>
            <p><strong>Department:</strong> {studentData.dept || 'N/A'}</p>
          </div>
        );
      case 'room':
        return (
          <div className="profile-section-content">
            <h2>Room Details</h2>
            <p><strong>Hostel Name:</strong> {studentData.hostelName || 'N/A'}</p>
            <p><strong>Room Number:</strong> {studentData.roomNumber || 'N/A'}</p>
            <p><strong>Floor:</strong> {studentData.floor || 'N/A'}</p>
            <p><strong>Room Type:</strong> {studentData.roomType || 'N/A'}</p>
            <p><strong>Occupants:</strong> {studentData.occupants || 'N/A'}</p>
          </div>
        );
      default:
        return <div className="profile-section-content">Please select a section to view.</div>;
    }
  };

  return (
    <div className="student-profile-container">
      <h1>Student Profile</h1>
      
      {/* Navigation buttons for sections */}
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

      {/* Scoped CSS for styling */}
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
