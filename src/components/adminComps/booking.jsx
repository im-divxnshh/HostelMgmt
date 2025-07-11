import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../utils/firebaseConfig";

const ROOM_CAPACITY = { single: 1, double: 2, suite: 4 };

const RoomBooking = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    dept: "",
    dob: "",
    email: "",
    mobile: "",
    parentName: "",
    parentContact: "",
    fees: "",
    roomType: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    additionalNotes: "",
  });

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(firestore, "users"));
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setStudents(list);
      setFilteredStudents(list);
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredStudents(
        students.filter((s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredStudents(students);
    }
  }, [searchQuery, students]);

  const handleStudentSelect = async (id) => {
    setSelectedStudentId(id);
    setSearchQuery("");

    const docSnap = await getDoc(doc(firestore, "users", id));
    if (docSnap.exists()) {
      const data = docSnap.data();
      setFormData((prev) => ({
        ...prev,
        name: data.name || "",
        age: data.age || "",
        dept: data.dept || "",
        dob: data.dob || "",
        email: data.email || "",
        mobile: data.mobile || "",
        parentName: data.parentName || "",
        parentContact: data.parentContact || "",
        fees: data.fees || "",
        additionalNotes: data.additionalNotes || "",
      }));
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      if (!formData.roomType) return setAvailableRooms([]);

      const snapshot = await getDocs(collection(firestore, "rooms"));
      const rooms = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((room) => {
          const assigned = room.studentsAssigned?.length || 0;
          return (
            room.type === formData.roomType &&
            assigned < ROOM_CAPACITY[formData.roomType]
          );
        });
      setAvailableRooms(rooms);
    };
    fetchRooms();
  }, [formData.roomType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudentId || !formData.roomNumber) {
      return Swal.fire("Missing Information", "Please select student and room", "warning");
    }

    const roomRef = doc(firestore, "rooms", formData.roomNumber);
    const roomSnap = await getDoc(roomRef);
    const roomData = roomSnap.data();
    const assigned = roomData.studentsAssigned || [];

    if (assigned.length >= ROOM_CAPACITY[formData.roomType]) {
      return Swal.fire("Room Full", "Choose another room", "error");
    }

    await setDoc(
      doc(firestore, "users", selectedStudentId, "roomAlloted", formData.roomNumber),
      {
        roomType: formData.roomType,
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        additionalNotes: formData.additionalNotes,
      }
    );

    await updateDoc(roomRef, {
      studentsAssigned: [...assigned, selectedStudentId],
    });

    Swal.fire("Success", "Room Booked Successfully", "success");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-xl rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">
        🏨 Room Booking System
      </h2>

      {/* Student Search */}
      <div className="mb-6 relative">
        <label className="block text-lg font-medium text-gray-700 mb-1">
          Search Student
        </label>
        <input
          type="text"
          placeholder="Enter student name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
        />
        {searchQuery && (
          <ul className="absolute z-10 bg-white border w-full rounded-md mt-1 max-h-60 overflow-y-auto shadow-md">
            {filteredStudents.map((s) => (
              <li
                key={s.id}
                onClick={() => handleStudentSelect(s.id)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "name", label: "Name" },
          { name: "age", label: "Age" },
          { name: "dept", label: "Department" },
          { name: "dob", label: "Date of Birth", type: "date" },
          { name: "email", label: "Email" },
          { name: "mobile", label: "Mobile" },
          { name: "parentName", label: "Parent Name" },
          { name: "parentContact", label: "Parent Contact" },
          { name: "fees", label: "Fees" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="block text-gray-700 font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        ))}

        {/* Room Type */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Room Type</label>
          <select
            name="roomType"
            value={formData.roomType}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">-- Select Type --</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>
        </div>

        {/* Room Number */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Room Number</label>
          <select
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">-- Select Room --</option>
            {availableRooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} ({room.studentsAssigned?.length || 0}/
                {ROOM_CAPACITY[room.type]})
              </option>
            ))}
          </select>
        </div>

        {/* Check-in / out */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Check-in Date</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Check-out Date</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Notes */}
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-medium mb-1">Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
          >
            🚀 Book Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default RoomBooking;
