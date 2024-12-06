import React, { useState } from "react";
import { firestore } from "../../utils/firebaseConfig"; // Adjust path as needed
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const HostelRules = () => {
  const [rules, setRules] = useState([]);
  const [newRule, setNewRule] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch existing rules from Firestore
  const fetchRules = async () => {
    try {
      setLoading(true);
      const rulesCollection = collection(firestore, "hostelRules");
      const querySnapshot = await getDocs(rulesCollection);
      const fetchedRules = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        rule: doc.data().rule,
      }));
      setRules(fetchedRules);
    } catch (error) {
      console.error("Error fetching rules:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new rule to Firestore
  const addRule = async () => {
    if (newRule.trim() === "") {
      alert("Rule cannot be empty!");
      return;
    }
    try {
      const rulesCollection = collection(firestore, "hostelRules");
      const docRef = await addDoc(rulesCollection, { rule: newRule });
      setRules([...rules, { id: docRef.id, rule: newRule }]); // Update local state
      setNewRule("");
      alert("Rule added successfully!");
    } catch (error) {
      console.error("Error adding rule:", error);
    }
  };

  // Delete a rule from Firestore
  const deleteRule = async (id) => {
    if (window.confirm("Are you sure you want to delete this rule?")) {
      try {
        const docRef = doc(firestore, "hostelRules", id);
        await deleteDoc(docRef);
        setRules(rules.filter((rule) => rule.id !== id)); // Update local state
        alert("Rule deleted successfully!");
      } catch (error) {
        console.error("Error deleting rule:", error);
      }
    }
  };

  // Load rules when the component mounts
  React.useEffect(() => {
    fetchRules();
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Hostel Rules</h1>

      {/* Display Rules */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Rules</h2>
        {loading ? (
          <p className="text-gray-500">Loading rules...</p>
        ) : rules.length === 0 ? (
          <p className="text-gray-500">No rules found. Add some!</p>
        ) : (
          <ul className="list-disc pl-6">
            {rules.map((rule) => (
              <li key={rule.id} className="mb-2 flex justify-between items-center">
                <span className="text-gray-700">{rule.rule}</span>
                <button
                  onClick={() => deleteRule(rule.id)}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add New Rule */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add a New Rule</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Enter new rule"
            value={newRule}
            onChange={(e) => setNewRule(e.target.value)}
            className="p-2 w-full border border-gray-300 rounded-md mr-4"
          />
          <button
            onClick={addRule}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Add Rule
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostelRules;