import React, { useState } from "react";

const HostelRooms = () => {
  // State to manage room data
  const [rooms, setRooms] = useState([
    { id: 1, type: "One-Seater", status: "Available", occupant: null },
    { id: 2, type: "Two-Seater", status: "Booked", occupant: "John Doe" },
    { id: 3, type: "One-Seater", status: "Booked", occupant: "Jane Smith" },
    { id: 4, type: "Two-Seater", status: "Available", occupant: null },
    { id: 5, type: "Three-Seater", status: "Available", occupant: null },
  ]);

  // State for filtering
  const [filter, setFilter] = useState("all");

  // Filtered rooms based on the selected filter
  const filteredRooms = rooms.filter((room) => {
    if (filter === "all") return true;
    return room.status.toLowerCase() === filter;
  });

  // Function to handle room status update
  const toggleRoomStatus = (roomId) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId
          ? {
              ...room,
              status: room.status === "Available" ? "Booked" : "Available",
              occupant: room.status === "Available" ? "New Occupant" : null,
            }
          : room
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Hostel Room Management</h1>

        {/* Filters */}
        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded ${
              filter === "all" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            All Rooms
          </button>
          <button
            onClick={() => setFilter("available")}
            className={`px-4 py-2 rounded ${
              filter === "available"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            Available Rooms
          </button>
          <button
            onClick={() => setFilter("booked")}
            className={`px-4 py-2 rounded ${
              filter === "booked" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
          >
            Booked Rooms
          </button>
        </div>

        {/* Room List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-700">
                Room #{room.id}
              </h2>
              <p className="text-gray-600">Type: {room.type}</p>
              <p
                className={`mt-2 font-medium ${
                  room.status === "Available" ? "text-green-500" : "text-red-500"
                }`}
              >
                Status: {room.status}
              </p>
              {room.occupant && (
                <p className="text-gray-600 mt-1">Occupant: {room.occupant}</p>
              )}

              {/* Action Button */}
              <button
                onClick={() => toggleRoomStatus(room.id)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {room.status === "Available" ? "Book Room" : "Mark as Available"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostelRooms;
