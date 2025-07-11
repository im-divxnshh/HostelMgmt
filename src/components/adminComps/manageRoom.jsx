import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { firestore } from "../../utils/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);

  // Fetch rooms and their occupants
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomSnapshot = await getDocs(collection(firestore, "rooms"));
        const roomList = [];

        for (const roomDoc of roomSnapshot.docs) {
          const roomData = roomDoc.data();
          const studentDetails = [];

          if (roomData.studentsAssigned?.length > 0) {
            for (const studentId of roomData.studentsAssigned) {
              const studentRef = doc(firestore, "users", studentId);
              const studentSnap = await getDoc(studentRef);

              studentDetails.push({
                id: studentId,
                name: studentSnap.exists() ? studentSnap.data().name || "Unnamed" : "Unknown User",
              });
            }
          }

          roomList.push({
            id: roomDoc.id,
            ...roomData,
            occupants: studentDetails,
          });
        }

        setRooms(roomList);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        Swal.fire("Error", "Failed to fetch rooms!", "error");
      }
    };

    fetchRooms();
  }, []);

  // Add Room
  const handleAddRoom = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Add Room",
      html: `
        <input id="room-number" class="swal2-input" placeholder="Room Number" />
        <select id="room-type" class="swal2-input">
          <option value="" disabled selected>Select Room Type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
        <input id="section" class="swal2-input" placeholder="Section" />
        <input id="floor" class="swal2-input" placeholder="Floor" type="number" min="0" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const number = document.getElementById("room-number").value.trim();
        const type = document.getElementById("room-type").value;
        const section = document.getElementById("section").value.trim();
        const floor = parseInt(document.getElementById("floor").value.trim(), 10);

        if (!number || !type || !section || isNaN(floor)) {
          Swal.showValidationMessage("All fields are required.");
          return false;
        }

        if (rooms.some(r => r.name === number)) {
          Swal.showValidationMessage("Room number already exists.");
          return false;
        }

        return { number, type, section, floor };
      },
    });

    if (formValues) {
      try {
        const roomId = `room-${Date.now()}`;
        const newRoom = {
          name: formValues.number,
          type: formValues.type,
          section: formValues.section,
          floor: formValues.floor,
          studentsAssigned: [],
        };

        await setDoc(doc(firestore, "rooms", roomId), newRoom);
        setRooms(prev => [...prev, { id: roomId, ...newRoom, occupants: [] }]);

        Swal.fire("Success", "Room added successfully!", "success");
      } catch (error) {
        console.error("Add error:", error);
        Swal.fire("Error", "Failed to add room!", "error");
      }
    }
  };

  // Edit Room
  const handleEditRoom = async (room) => {
    const { value: updatedValues } = await Swal.fire({
      title: "Edit Room",
      html: `
        <input id="edit-number" class="swal2-input" value="${room.name}" placeholder="Room Number" />
        <select id="edit-type" class="swal2-input">
          <option value="Single" ${room.type === "Single" ? "selected" : ""}>Single</option>
          <option value="Double" ${room.type === "Double" ? "selected" : ""}>Double</option>
          <option value="Suite" ${room.type === "Suite" ? "selected" : ""}>Suite</option>
        </select>
        <input id="edit-section" class="swal2-input" value="${room.section}" placeholder="Section" />
        <input id="edit-floor" class="swal2-input" type="number" min="0" value="${room.floor}" placeholder="Floor" />
      `,
      focusConfirm: false,
      preConfirm: () => {
        const name = document.getElementById("edit-number").value.trim();
        const type = document.getElementById("edit-type").value;
        const section = document.getElementById("edit-section").value.trim();
        const floor = parseInt(document.getElementById("edit-floor").value.trim(), 10);

        if (!name || !type || !section || isNaN(floor)) {
          Swal.showValidationMessage("All fields are required.");
          return false;
        }

        if (rooms.some(r => r.name === name && r.id !== room.id)) {
          Swal.showValidationMessage("Room number already exists.");
          return false;
        }

        return { name, type, section, floor };
      },
    });

    if (updatedValues) {
      try {
        await updateDoc(doc(firestore, "rooms", room.id), {
          name: updatedValues.name,
          type: updatedValues.type,
          section: updatedValues.section,
          floor: updatedValues.floor,
        });

        setRooms(prev =>
          prev.map(r => (r.id === room.id ? { ...r, ...updatedValues } : r))
        );

        Swal.fire("Updated", "Room details updated!", "success");
      } catch (error) {
        console.error("Update error:", error);
        Swal.fire("Error", "Failed to update room!", "error");
      }
    }
  };

  // Delete Room
  const handleDeleteRoom = async (roomId) => {
    const confirm = await Swal.fire({
      title: "Delete Room?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteDoc(doc(firestore, "rooms", roomId));
        setRooms(prev => prev.filter(room => room.id !== roomId));

        Swal.fire("Deleted!", "Room has been deleted.", "success");
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire("Error", "Failed to delete room!", "error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-5">
        🏨 Hostel Room Management System
      </h1>

      <div className="flex justify-end mb-5">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleAddRoom}
        >
          Add Room <i className="ml-2 fas fa-plus" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white shadow rounded-lg p-4 border border-gray-200 relative"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              Room {room.name} ({room.type})
            </h2>
            <p className="text-gray-600">
              Section: <span className="font-medium">{room.section}</span>
            </p>
            <p className="text-gray-600 mb-2">
              Floor: <span className="font-medium">{room.floor}</span>
            </p>

            <div className="bg-gray-50 p-3 rounded-md border text-sm">
              <h3 className="font-semibold text-gray-700 mb-1">Occupants:</h3>
              {room.occupants?.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {room.occupants.map((user) => (
                    <li key={user.id}>{user.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No occupants</p>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                onClick={() => handleEditRoom(room)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                onClick={() => handleDeleteRoom(room.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRooms;
