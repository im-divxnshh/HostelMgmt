import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { firestore } from "../../utils/firebaseConfig";
import { collection, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [newOccupant, setNewOccupant] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Fetch rooms from Firestore
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomCollection = await getDocs(collection(firestore, "rooms"));
        setRooms(
          roomCollection.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Error fetching rooms:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch rooms!",
        });
      }
    };

    fetchRooms();
  }, []);

  const handleAddRoom = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add Room",
      html:
        '<input id="room-number" class="swal2-input" placeholder="Room Number">' +
        '<select id="room-type" class="swal2-input">' +
        '<option value="Single">Single</option>' +
        '<option value="Double">Double</option>' +
        "</select>",
      focusConfirm: false,
      preConfirm: () => {
        const number = document.getElementById("room-number").value;
        const type = document.getElementById("room-type").value;
        return { number, type };
      },
    });

    if (formValues) {
      try {
        const roomId = `room-${rooms.length + 1}`;
        const newRoom = {
          name: formValues.number,
          type: formValues.type,
          status: "Available",
          occupants: [],
        };

        await setDoc(doc(firestore, "rooms", roomId), newRoom);
        setRooms([...rooms, { id: roomId, ...newRoom }]);
        Swal.fire({
          icon: "success",
          title: "Room Added",
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          position: "top-right",
        });
      } catch (error) {
        console.error("Error adding room:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add room!",
        });
      }
    }
  };

  const handleAddOccupant = async (roomId) => {
    if (!newOccupant) return Swal.fire({ icon: "error", text: "Please enter an occupant name." });

    try {
      const roomRef = doc(firestore, "rooms", roomId);
      const updatedRooms = rooms.map((room) => {
        if (room.id === roomId) {
          const updatedRoom = {
            ...room,
            status: "Occupied",
            occupants: [...room.occupants, newOccupant],
          };
          updateDoc(roomRef, updatedRoom);
          return updatedRoom;
        }
        return room;
      });

      setRooms(updatedRooms);
      setNewOccupant("");
      setSelectedRoom(null);
    } catch (error) {
      console.error("Error adding occupant:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add occupant!",
      });
    }
  };

  const handleRemoveOccupant = () =>{
    
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-5">
        Hostel Room Management System
      </h1>

      <div className="flex justify-between mb-5">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          onClick={handleAddRoom}
        >
          Add Room <i className="ml-2 fas fa-plus"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-300"
          >
            <h2 className="text-xl font-semibold text-gray-700">
              {room.name} ({room.type})
            </h2>
            <p
              className={`text-sm mt-1 mb-3 font-medium ${
                room.status === "Available" ? "text-green-500" : "text-red-500"
              }`}
            >
              Status: {room.status}
            </p>

            <ul className="list-disc ml-5 text-gray-600">
              {room.occupants.map((occupant, index) => (
                <li key={index} className="flex justify-between">
                  {occupant}
                  <button
                    className="text-red-500 hover:underline text-sm"
                    onClick={() => handleRemoveOccupant(room.id, occupant)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            {selectedRoom === room.id ? (
              <div className="mt-3">
                <input
                  type="text"
                  value={newOccupant}
                  onChange={(e) => setNewOccupant(e.target.value)}
                  placeholder="Enter occupant name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                  className="mt-2 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                  onClick={() => handleAddOccupant(room.id)}
                >
                  Add Occupant
                </button>
              </div>
            ) : (
              <button
                className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                onClick={() => setSelectedRoom(room.id)}
              >
                {room.status === "Available" ? "Add Occupant" : "Manage Occupants"}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRooms;
