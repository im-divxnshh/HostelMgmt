import React, { useState } from 'react';

const HostelRules = () => {
  // State to manage the list of rules
  const [rules, setRules] = useState([
    "Lights out by 10:30 PM.",
    "Visitors are allowed only during designated visiting hours.",
    "Maintain cleanliness in the rooms and common areas.",
    "Strictly no smoking or alcohol consumption on hostel premises.",
    "Always carry your hostel ID card.",
  ]);

  const [newRule, setNewRule] = useState('');

  // Function to handle adding a new rule
  const addRule = () => {
    if (newRule.trim() === '') {
      alert('Rule cannot be empty!');
      return;
    }
    setRules([...rules, newRule]);
    setNewRule('');
  };

  // Function to handle deleting a rule
  const deleteRule = (index) => {
    if (window.confirm('Are you sure you want to delete this rule?')) {
      const updatedRules = rules.filter((_, i) => i !== index);
      setRules(updatedRules);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">Hostel Rules</h1>

      {/* Display Rules */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Current Rules</h2>
        {rules.length === 0 ? (
          <p className="text-gray-500">No rules found. Add some!</p>
        ) : (
          <ul className="list-disc pl-6">
            {rules.map((rule, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <span className="text-gray-700">{rule}</span>
                <button
                  onClick={() => deleteRule(index)}
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
