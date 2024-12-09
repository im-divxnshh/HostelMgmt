import React, { useState, useEffect } from "react";
import { firestore } from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const Rules = () => {
  const [rules, setRules] = useState([]); // State for rules
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [notification, setNotification] = useState(""); // Notification state
  const [violations, setViolations] = useState(0); // Violations tracker

  // Fetch rules from Firestore
  useEffect(() => {
    const fetchRules = async () => {
      try {
        const rulesCollection = collection(firestore, "hostelRules"); // Access the "hostelRules" collection
        const snapshot = await getDocs(rulesCollection); // Get all documents
        const fetchedRules = snapshot.docs.map((doc) => doc.data().rule); // Extract the "rule" field
        setRules(fetchedRules);
      } catch (err) {
        setError("Failed to load rules. Please try again later.");
        console.error("Error fetching rules:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRules();
  }, []);

  // Handle rule violation
  const handleViolation = () => {
    setViolations(violations + 1);
    setNotification("Violation registered! Please adhere to the rules.");
  };

  // Handle reset violation
  const handleResetViolation = () => {
    setViolations(0);
    setNotification("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-200 to-blue-300 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white text-center py-6">
          <h1 className="text-3xl font-bold uppercase">Hostel Rules & Regulations</h1>
          <p className="text-sm mt-2">Ensuring a safe, clean, and disciplined environment</p>
        </div>

        {/* Notification Section */}
        {notification && (
          <div className="bg-red-100 text-red-600 p-4 my-4 rounded-lg shadow-md">
            <p>{notification}</p>
          </div>
        )}

        {/* Rules List */}
        <div className="p-6">
          {loading ? (
            <p className="text-gray-500 text-center">Loading rules...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <ul className="space-y-4">
              {rules.map((rule, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3 bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition"
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white flex items-center justify-center rounded-full font-bold">
                    {index + 1}
                  </span>
                  <p className="text-gray-800">{rule}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        

      
      </div>
    </div>
  );
};

export default Rules;
