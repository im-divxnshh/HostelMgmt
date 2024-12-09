import React, { useState } from "react";

const ManageRoom = () => {
  // Room types and statuses
  const roomStatuses = ["Available", "Occupied", "Under Maintenance"];

  // State for room management
  const [rooms, setRooms] = useState([
    { id: 1, type: "Single", status: "Available", allocatedTo: "" },
    { id: 2, type: "Double", status: "Occupied", allocatedTo: "Student A" },
    { id: 3, type: "Triple", status: "Under Maintenance", allocatedTo: "" },
    { id: 4, type: "Dormitory", status: "Available", allocatedTo: "" },
  ]);

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allocatedStudent, setAllocatedStudent] = useState("");

  // Handle room allocation
  const handleRoomAllocation = (roomId) => {
    if (!allocatedStudent) {
      alert("Please enter the student's name to allocate the room.");
      return;
    }
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId
          ? { ...room, status: "Occupied", allocatedTo: allocatedStudent }
          : room
      )
    );
    setAllocatedStudent(""); // Clear input after allocation
  };

  // Handle room status change
  const handleRoomStatusChange = (roomId, status) => {
    setRooms((prevRooms) =>
      prevRooms.map((room) =>
        room.id === roomId ? { ...room, status } : room
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-yellow-300 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-yellow-600 text-white text-center py-6">
          <h1 className="text-3xl font-bold uppercase">Room Management</h1>
          <p className="text-sm mt-2">Allocate rooms and manage room statuses</p>
        </div>

        {/* Room Allocation Form */}
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Allocate Room</h2>
          <p className="text-sm text-gray-500 mt-2">Select a room to allocate to a student.</p>
          <div className="mt-4">
            <input
              type="text"
              value={allocatedStudent}
              onChange={(e) => setAllocatedStudent(e.target.value)}
              placeholder="Enter student name"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full mt-2"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`p-4 rounded-lg shadow-md bg-${
                  room.status === "Available"
                    ? "green-100"
                    : room.status === "Occupied"
                    ? "red-100"
                    : "yellow-100"
                } hover:scale-105 transition-transform`}
              >
                <h3 className="text-lg font-semibold text-gray-800">Room {room.id}</h3>
                <p className="text-gray-500">Type: {room.type}</p>
                <p className="text-gray-500">Status: {room.status}</p>
                {room.status === "Available" && (
                  <button
                    onClick={() => handleRoomAllocation(room.id)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Allocate Room
                  </button>
                )}
                {room.status === "Occupied" && <p className="mt-2 text-red-600">Allocated to: {room.allocatedTo}</p>}
                {room.status === "Under Maintenance" && (
                  <button
                    onClick={() => handleRoomStatusChange(room.id, "Available")}
                    className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
                  >
                    Mark as Available
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Room Status Tracker */}
        <div className="p-6 mt-6 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-700">Room Status Tracker</h2>
          <p className="text-sm text-gray-500 mt-2">
            Change room status to keep track of room availability.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`p-4 rounded-lg shadow-md bg-${
                  room.status === "Available"
                    ? "green-100"
                    : room.status === "Occupied"
                    ? "red-100"
                    : "yellow-100"
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-800">Room {room.id}</h3>
                <p className="text-gray-500">Type: {room.type}</p>
                <p className="text-gray-500">Status: {room.status}</p>
                <div className="mt-4">
                  <select
                    value={room.status}
                    onChange={(e) => handleRoomStatusChange(room.id, e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg w-full"
                  >
                    {roomStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRoom;
