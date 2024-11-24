import React, { useState } from "react";

const HostelRules = () => {
  const [rules, setRules] = useState([
    "Keep your rooms clean at all times.",
    "No loud music or noise after 10 PM.",
    "Visitors are not allowed after 8 PM.",
  ]);
  const [newRule, setNewRule] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const addRule = () => {
    if (newRule.trim() !== "") {
      setRules([...rules, newRule]);
      setNewRule("");
    }
  };

  const deleteRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const startEditRule = (index) => {
    setEditIndex(index);
    setEditText(rules[index]);
  };

  const saveEditRule = () => {
    const updatedRules = [...rules];
    updatedRules[editIndex] = editText;
    setRules(updatedRules);
    setEditIndex(null);
    setEditText("");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Hostel Rules</h1>
      <ul className="space-y-2 mb-4">
        {rules.map((rule, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-md shadow-sm"
          >
            {editIndex === index ? (
              <div className="flex-1 mr-4">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </div>
            ) : (
              <span className="flex-1">{rule}</span>
            )}
            <div className="flex space-x-2">
              {editIndex === index ? (
                <button
                  onClick={saveEditRule}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => startEditRule(index)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => deleteRule(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex space-x-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Add a new rule..."
          value={newRule}
          onChange={(e) => setNewRule(e.target.value)}
        />
        <button
          onClick={addRule}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default HostelRules;
