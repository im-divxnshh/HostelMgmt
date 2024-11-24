import React, { useState } from "react";

const EmergencySafety = () => {
  const [contacts, setContacts] = useState([
    { name: "Fire Department", number: "101" },
    { name: "Police Station", number: "100" },
    { name: "Ambulance", number: "102" },
  ]);

  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [protocols, setProtocols] = useState([
    "Ensure all fire exits are clear.",
    "Conduct fire drills every 3 months.",
    "Provide first-aid kits on every floor.",
  ]);
  const [newProtocol, setNewProtocol] = useState("");

  const addContact = () => {
    if (newContact.name && newContact.number) {
      setContacts([...contacts, newContact]);
      setNewContact({ name: "", number: "" });
    }
  };

  const deleteContact = (index) => {
    setContacts(contacts.filter((_, i) => i !== index));
  };

  const addProtocol = () => {
    if (newProtocol.trim() !== "") {
      setProtocols([...protocols, newProtocol]);
      setNewProtocol("");
    }
  };

  const deleteProtocol = (index) => {
    setProtocols(protocols.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Emergency & Safety Management</h1>

      {/* Emergency Contacts Section */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Emergency Contacts</h2>
        <ul className="space-y-3">
          {contacts.map((contact, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow"
            >
              <div>
                <p className="font-semibold text-gray-800">{contact.name}</p>
                <p className="text-gray-600">{contact.number}</p>
              </div>
              <button
                onClick={() => deleteContact(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="flex mt-4 space-x-4">
          <input
            type="text"
            placeholder="Contact Name"
            value={newContact.name}
            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={newContact.number}
            onChange={(e) => setNewContact({ ...newContact, number: e.target.value })}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />
          <button
            onClick={addContact}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Add Contact
          </button>
        </div>
      </section>

      {/* Safety Protocols Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Safety Protocols</h2>
        <ul className="space-y-3">
          {protocols.map((protocol, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow"
            >
              <p className="flex-1 text-gray-800">{protocol}</p>
              <button
                onClick={() => deleteProtocol(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className="flex mt-4 space-x-4">
          <input
            type="text"
            placeholder="New Safety Protocol"
            value={newProtocol}
            onChange={(e) => setNewProtocol(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
          />
          <button
            onClick={addProtocol}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600"
          >
            Add Protocol
          </button>
        </div>
      </section>
    </div>
  );
};

export default EmergencySafety;
