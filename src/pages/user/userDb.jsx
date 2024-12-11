import React, { useState, useEffect } from "react";
import { 
  FaUsers, 
  FaMoneyBillWave, 
  FaClipboardList, 
  FaBell, 
  FaBook, 
  FaUtensils, 
  FaRegCheckCircle, 
  FaExclamationCircle 
} from "react-icons/fa";
import StudentProfile from "../../components/userComps/Profile";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../utils/firebaseConfig";
import FeeManagement from "../../components/userComps/feesManagement";
import HostelRules from "../../components/userComps/hostelRules";
import Complaints from "../../components/userComps/complaints";
import Attendance from "../../components/userComps/attendance";
import Mess from "../../components/userComps/mess";
import Dashboard from "../../components/userComps/dashboard";

const UserDashboard = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [userUID, setUserUID] = useState("");
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Logged-in user's UID:", user.uid);
        setUserUID(user.uid);

        // Fetch additional user details from Firestore
        try {
          const userDocRef = doc(firestore, "users", user.uid); // Adjust collection name if needed
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log("User Data from Firestore:", userData);
            setUserName(userData.name || "User");
          } else {
            console.error("No user document found in Firestore!");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      } else {
        console.log("No user logged in.");
        setUserUID("");
        setUserName("");
        navigate("/user-login"); // Redirect to login if no user is logged in
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User logged out.");
        navigate("/user-login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };


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
           
              
           <Dashboard/>
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
          <h1 className="text-3xl font-bold text-gray-700">
            {userName ? `Welcome, ${userName}` : "User Dashboard"}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
              <FaBell />
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
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
